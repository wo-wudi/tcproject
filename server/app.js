var createError = require("http-errors");
var express = require("express");
var path = require("path");
//引入cookieParser模块
var cookieParser = require("cookie-parser");
//引入compression模块
// const socketIO = require("socket.io");
//引入compression模块
const compression = require("compression");
var logger = require("morgan");
// const http = require("http");

//加载cors模块
const cors = require("cors");
//加载socket.io模块

//引入路由对象
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");

var app = express();
// const server = http.createServer(app);
// const io = socketIO(server, {
//   cors: {
//     origin: "*",
//   },
// });
// io.on("connection", (socket) => {
//   console.log("user connected");
//   socket.on("hello", (data) => {
//     console.log(`收到客户端的消息：${data}`);
//   });
// });
//跨域处理
app.use(
  cors({
    origin: ["http://localhost:8080", "http://127.0.0.1:12321"],
    credentials: true,
  })
);

// app.get("/", (req, res) => {
//   io.emit("message", "服务端向客户端推送消息...");
//   res.writeHead(200, { "Content-type": "text/plain" });
//   res.end();
// });

//开启Gzip打包
app.use(compression());
// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

//不强缓存
app.all("*", function (req, res, next) {
  // res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  // res.setHeader(
  //   "Access-Control-Allow-Headers",
  //   "X-Requested-With,content-type, Authorization"
  // );
  // res.setHeader("Content-Type", "application/json;charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");
  // const serverTime = statObj.ctime.toUTCString();
  // console.log(serverTime);
  next();
});

//挂载路由器
app.use("/index", indexRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
