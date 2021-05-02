//引入mysql连接池模块
const pool = require("../pool");
const express = require("express");
//创建路由器对象
const admin = express.Router();
//创建接口
//1.登录模块
admin.post("/a1/login", (req, res) => {
  let _aname = req.body.aname;
  let _apwd = req.body.apwd;
  let _acode = req.body.acode;
  let sql =
    "select aname,apwd,acode from yhq_admin where aname=? and apwd=MD5(?) and acode=?";
  pool.query(sql, [_aname, _apwd, _acode], (err, result) => {
    if (err) throw err;
    if (result.length > 0) res.send({ res: result, user: req.cookies });
    else res.send("0");
  });
});
//2.注册用户
admin.post("/a1/reg", (req, res) => {
  let _aname = req.body.aname;
  let _apwd = req.body.apwd;
  let sql = "insert yhq_admin(aname,apwd) values(?,MD5(?))";
  pool.query(sql, [_aname, _apwd], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) res.send("1");
    else res.send("0");
  });
});
//3.1.按编号查询汇率券
admin.get("/a1/search", (req, res) => {
  let _hid = req.query.hid;
  let sql = "select hid,hprice,hmoney,hrmb from yhq_hl where hid=?";
  pool.query(sql, [_hid], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
//3.2.按编号查询专享券
admin.get("/a2/search", (req, res) => {
  let _zid = req.query.zid;
  let sql = "select zid,zprice,zname,zdl from yhq_zx where zid=?";
  pool.query(sql, [_zid], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
//3.3.按编号查询通用券
admin.get("/a3/search", (req, res) => {
  let _tid = req.query.tid;
  let sql =
    "select tid,tprice,tname,tenglish,tmoney,tuse from yhq_ty where tid=?";
  pool.query(sql, [_tid], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
//3.4.按编号查询商铺券
admin.get("/a4/search", (req, res) => {
  let _sid = req.query.sid;
  let sql = "select sid,sprice,sname,soldprice from yhq_sp where sid=?";
  pool.query(sql, [_sid], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
//3.5.按编号查询境外券
admin.get("/a5/search", (req, res) => {
  let _jid = req.query.jid;
  let sql = "select jid,jprice,username from yhq_jy where jid=?";
  pool.query(sql, [_jid], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
//4.1.根据hid删除优惠券
admin.get("/a1/del", (req, res) => {
  let _hid = req.query.hid;
  let sql = "delete from yhq_hl where hid=?";
  pool.query(sql, [_hid], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) res.send("1");
    else res.send("0");
  });
});
//4.2.根据zid删除专享券
admin.get("/a2/del", (req, res) => {
  let _zid = req.query.zid;
  let sql = "delete from yhq_zx where zid=?";
  pool.query(sql, [_zid], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) res.send("1");
    else res.send("0");
  });
});
//4.3.根据tid删除通用券
admin.get("/a3/del", (req, res) => {
  let _tid = req.query.tid;
  let sql = "delete from yhq_ty where tid=?";
  pool.query(sql, [_tid], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) res.send("1");
    else res.send("0");
  });
});
//4.4.根据sid删除专享券
admin.get("/a4/del", (req, res) => {
  let _sid = req.query.sid;
  let sql = "delete from yhq_sp where sid=?";
  pool.query(sql, [_sid], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) res.send("1");
    else res.send("0");
  });
});
//4.5 根据jid删除境外券
admin.get("/a5/del", (req, res) => {
  let _jid = req.query.jid;
  let sql = "delete from yhq_jy where jid=?";
  pool.query(sql, [_jid], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) res.send("1");
    else res.send("0");
  });
});
//5.1.根据hid修改优惠券信息
admin.post("/a1/update", (req, res) => {
  let _hid = req.body.hid;
  let obj = req.body;
  let sql = "update yhq_hl set? where hid=?";
  pool.query(sql, [obj, _hid], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) res.send("1");
    else res.send("0");
  });
});
//5.2.根据zid修改专享券信息
admin.post("/a2/update", (req, res) => {
  let _zid = req.body.zid;
  let obj = req.body;
  let sql = "update yhq_zx set? where zid=?";
  pool.query(sql, [obj, _zid], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) res.send("1");
    else res.send("0");
  });
});
//5.3.根据tid修改通用券信息
admin.post("/a3/update", (req, res) => {
  let _tid = req.body.tid;
  let obj = req.body;
  let sql = "update yhq_ty set? where tid=?";
  pool.query(sql, [obj, _tid], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) res.send("1");
    else res.send("0");
  });
});
//5.4.根据sid修改商铺券信息
admin.post("/a4/update", (req, res) => {
  let _sid = req.body.sid;
  let obj = req.body;
  let sql = "update yhq_sp set? where sid=?";
  pool.query(sql, [obj, _sid], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) res.send("1");
    else res.send("0");
  });
});
//6.1.新增汇率券
admin.post("/a1/add", (req, res) => {
  let obj = req.body;
  let sql = "insert into yhq_hl set?";
  pool.query(sql, [obj], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) res.send("1");
    else res.send("0");
  });
});
//6.2.新增专享券
admin.post("/a2/add", (req, res) => {
  let zname = req.body.zname;
  let zprice = req.body.zprice;
  let zdl = req.body.zdl;
  let openid = req.body.openid;
  let sql = "insert yhq_zx(zname,zprice,zdl,openid) values(?,?,?,?)";
  pool.query(sql, [zname, zprice, zdl, openid], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) res.send("1");
    else res.send("0");
  });
});
//6.3.新增通用券
admin.post("/a3/add", (req, res) => {
  let obj = req.body;
  let sql = "insert into yhq_ty set?";
  pool.query(sql, [obj], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) res.send("1");
    else res.send("0");
  });
});
//6.4.新增商铺券
admin.post("/a4/add", (req, res) => {
  let obj = req.body;
  let sql = "insert into yhq_sp set?";
  pool.query(sql, [obj], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) res.send("1");
    else res.send("0");
  });
});
//7.1查找汇率券
admin.get("/g1/gethl", (req, res) => {
  let sql = "select hid,hprice,hmoney,hrmb from yhq_hl";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) res.send({ code: 200, res: result });
    else res.send({ res: 0 });
  });
});
//7.2查找专享券
admin.get("/g2/getzx", (req, res) => {
  let sql = "select zid,zname,zprice,zdl,zchoice,openid from yhq_zx";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) res.send({ code: 200, res: result });
    else res.send({ res: 0 });
  });
});
//7.3查找通用券
admin.get("/g3/getty", (req, res) => {
  let sql = " select tid,tname,tenglish,tprice,tmoney,tuse from yhq_ty";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) res.send({ code: 200, res: result });
    else res.send({ res: 0 });
  });
});
//7.4查找商铺券
admin.get("/g4/getsp", (req, res) => {
  let sql = "select sid,sname,sprice,soldprice from yhq_sp";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) res.send({ code: 200, res: result });
    else res.send({ res: 0 });
  });
});
//7.5查找境外券
admin.get("/g5/getjy", (req, res) => {
  let sql = "select jid,jprice,username from yhq_jy";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) res.send({ code: 200, res: result });
    else res.send({ res: 0 });
  });
});
//7.6查找灰度发布的新券的领取情况
admin.get("/g6/gethd", (req, res) => {
  let sql =
    "select zname,count(zxid) as count from yhq_choicezx,yhq_zx where zxid=zid and openid=1 group by zxid;";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) res.send(result);
    else res.send("0");
  });
});
//导出路由器对象
module.exports = admin;
