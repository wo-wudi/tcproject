//引入mysql连接池模块
const pool = require("../pool");
const express = require("express");
const jwt = require("jsonwebtoken");
//创建路由器对象
const index = express.Router();
//创建接口
//1.1获取汇率券
index.get("/gethl", (req, res) => {
  let sql = "select hid,hprice,hmoney,hrmb from yhq_hl";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) res.send({ code: 200, res: result });
    else res.send("0");
  });
});
//1.2.1获取所有专享券
index.get("/getzx", (req, res) => {
  let sql = "select zid,zname,zprice,zdl,zchoice,openid from yhq_zx";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) res.send({ code: 200, res: result });
    else res.send("0");
  });
});
//1.2.2获取openid为0的专享券
index.get("/getzxq", (req, res) => {
  let openid = 0;
  let sql =
    "select zid,zname,zprice,zdl,zchoice,openid from yhq_zx where openid=?";
  pool.query(sql, [openid], (err, result) => {
    if (err) throw err;
    if (result.length > 0) res.send({ code: 200, res: result });
    else res.send("0");
  });
});
//1.3获取选择了专享券的信息
index.get("/getchoicezx", (req, res) => {
  let token = req.query.token;
  let uname = "";
  jwt.verify(token, "Fizz", function (err, data) {
    if (err) console.log(err);
    uname = data.user;
  });
  let sql = "select cid,usename,zxid from yhq_choicezx where usename=?";
  pool.query(sql, [uname], (err, result) => {
    if (err) throw err;
    if (result.length > 0) res.send(result);
    else res.send("0");
  });
});
//1.4选择专享券新增已选信息
index.post("/addczx", (req, res) => {
  let token = req.body.token;
  let zxid = req.body.zxid;
  let uname = "";
  jwt.verify(token, "Fizz", function (err, data) {
    if (err) console.log(err);
    uname = data.user;
  });
  let sql = "insert yhq_choicezx(usename,zxid) values(?,?)";
  pool.query(sql, [uname, zxid], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) res.send("1");
    else res.send("0");
  });
});
//1.5获取通用券并分页
index.get("/getty", (req, res) => {
  let pagenum = parseInt(req.query.pagenum);
  let pagesize = 6;
  let offset = (pagenum - 1) * pagesize;
  let sql = "select count(tid) as count from yhq_ty";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      let length = result[0].count;
      let pagecount = Math.ceil(length / pagesize);
      sql =
        "select tid,tname,tenglish,tprice,tmoney,tuse from yhq_ty limit ?,?";
      pool.query(sql, [offset, pagesize], (err, result) => {
        if (err) throw err;
        if (result.length > 0)
          res.send({ code: 200, res: result, count: pagecount });
        else res.send("0");
      });
    }
  });
});
//1.6获取商铺券并分页
index.get("/getsp", (req, res) => {
  let pagenum = parseInt(req.query.pagenum);
  let pagesize = 2;
  let offset = (pagenum - 1) * pagesize;
  let sql = "select count(sid) as count from yhq_sp";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      let length = result[0].count;
      let pagecount = Math.ceil(length / pagesize);
      sql = "select sid,sname,sprice,soldprice from yhq_sp limit ?,?";
      pool.query(sql, [offset, pagesize], (err, result) => {
        if (err) throw err;
        if (result.length > 0)
          res.send({ code: 200, res: result, count: pagecount });
        else res.send("0");
      });
    }
  });
});
//1.7.获取境外通用券
index.get("/getjy", (req, res) => {
  let token = req.query.token;
  let uname = "";
  jwt.verify(token, "Fizz", function (err, data) {
    if (err) console.log(err);
    uname = data.user;
  });
  let sql = "select jid,jprice,username from yhq_jy where username=?";
  pool.query(sql, [uname], (err, result) => {
    if (err) throw err;
    if (result.length > 0) res.send(result);
    else res.send("0");
  });
});
//1.8.新增境外通用券
index.post("/addjy", (req, res) => {
  let token = req.body.token;
  let tprice = req.body.tprice;
  let uname = "";
  jwt.verify(token, "Fizz", function (err, data) {
    if (err) console.log(err);
    uname = data.user;
  });
  let sql = "insert yhq_jy(jprice,username) values(?,?)";
  pool.query(sql, [tprice, uname], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) res.send("1");
    else res.send("0");
  });
});
//导出路由器对象
module.exports = index;
