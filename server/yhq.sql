#设计客户端连接服务器端的编码
set names utf8;
#丢弃数据库如果存在
drop database if exists yhq;
#创建数据库，设计编码
create database yhq charset=utf8;
#进入数据库
use yhq;
#丢弃表如果存在
drop table if exists yhq_user;
#创建用户信息表
create table yhq_user(
  uid int unsigned primary key auto_increment,
  uname varchar(12) NOT NULL comment '用户名',
  upwd varchar(64) NOT NULL comment '密码',
  phone char(11) NOT NULL comment '手机号'
);
insert into yhq_user values(1,'aa','e10adc3949ba59abbe56e057f20f883e',13514565678);
insert into yhq_user values(2,'bb','e10adc3949ba59abbe56e057f20f883e',13514565678);
insert into yhq_user values(3,'cc','e10adc3949ba59abbe56e057f20f883e',13514565678);
insert into yhq_user values(4,'dd','e10adc3949ba59abbe56e057f20f883e',13514565678);
insert into yhq_user values(5,'ee','e10adc3949ba59abbe56e057f20f883e',13514565678);
insert into yhq_user values(6,'ff','e10adc3949ba59abbe56e057f20f883e',13514565678);
#丢弃表如果存在
drop table if exists yhq_admin;
#创建管理员信息表
create table yhq_admin(
  aid int unsigned primary key auto_increment,
  aname varchar(12) NOT NULL comment '管理员登录名',
  apwd varchar(64) NOT NULL comment '管理员登录密码',
  acode int default 58246 comment '管理员登录码'
);
insert into yhq_admin values(1,'ranran','e10adc3949ba59abbe56e057f20f883e',default);
#丢弃表如果存在
drop table if exists yhq_hl;
#创建超优汇率券表
create table yhq_hl(
  hid int unsigned primary key auto_increment,
  hprice varchar(16) NOT NULL comment '币值',
  hmoney varchar(36) NOT NULL comment '汇率',
  hrmb varchar(24) NOT NULL comment '市场价'
);
insert into yhq_hl values(1,'100港币','85.41人民币','85.80人民币');
insert into yhq_hl values(2,'1000港币','855.13人民币','855.59人民币');
#丢弃表如果存在
drop table if exists yhq_zx;
#创建商店专享券表
create table yhq_zx(
  zid int unsigned primary key auto_increment,
  zname varchar(24) NOT NULL comment '店铺名称',
  zprice varchar(8) NOT NULL comment '专享价格',
  zdl varchar(16) NOT NULL  comment '有效期',
  zchoice int unsigned NOT NULL default 0 comment '未领取',
  openid int unsigned NOT NULL default 0 comment '新券标识'
);
insert into yhq_zx values(1,'屈臣氏','20元','21天内有效',default,default);
insert into yhq_zx values(2,'香奈儿','30元','24天内有效',default,default);
insert into yhq_zx values(3,'热风','50元','18天内有效',default,1);
insert into yhq_zx values(4,'H&M','70元','16天内有效',default,1);
insert into yhq_zx values(5,'名创优品','80元','10天内有效',default,1);
insert into yhq_zx values(6,'耐克','10元','28天内有效',default,1);
insert into yhq_zx values(7,'阿迪达斯','50元','14天内有效',default,1);
#丢弃表如果存在
drop table if exists yhq_choicezx;
create table yhq_choicezx(
  cid int unsigned primary key auto_increment,
  usename varchar(12) comment '用户名',
  zxid int unsigned NOT NULL comment '外键,专享券id'
);
#丢弃表如果存在
drop table if exists yhq_jy;
#创建境外通用券表
create table yhq_jy(
  jid int unsigned primary key auto_increment,
  jprice int unsigned NOT NULL comment '价格',
  username varchar(12) comment '用户名'
);
#丢弃表如果存在
drop table if exists yhq_ty;
#创建全场通用券,新品折扣券，精美礼品券表
create table yhq_ty(
  tid int unsigned primary key auto_increment,
  tname varchar(12) NOT NULL comment '优惠券类别',
  tenglish varchar(16) NOT NULL comment '英文',
  tprice int unsigned comment '价格或折扣',
  tmoney varchar(4) comment '币种或折',
  tuse varchar(16) NOT NULL comment '使用条件'
);
insert into yhq_ty values(1,'全场通用券','Petit Bateau',20,'港币','满100港币可用');
insert into yhq_ty values(2,'新品折扣券','Hallmork Babies',8,'折','满500港币可用');
insert into yhq_ty values(3,'精美礼品券','Designer Trend',0,'','满300港币可用');
insert into yhq_ty values(4,'全场通用券','Petit Bateau',40,'港币','满150港币可用');
insert into yhq_ty values(5,'新品折扣券','Hallmork Babies',9,'折','满100港币可用');
insert into yhq_ty values(6,'精美礼品券','Designer Trend',0,'','满200港币可用');
insert into yhq_ty values(7,'全场通用券','Petit Bateau',20,'港币','满100港币可用');
insert into yhq_ty values(8,'新品折扣券','Hallmork Babies',8,'折','满500港币可用');
insert into yhq_ty values(9,'精美礼品券','Designer Trend',0,'','满300港币可用');
insert into yhq_ty values(10,'全场通用券','Petit Bateau',40,'港币','满150港币可用');
insert into yhq_ty values(11,'新品折扣券','Hallmork Babies',9,'折','满100港币可用');
insert into yhq_ty values(12,'精美礼品券','Designer Trend',0,'','满200港币可用');
insert into yhq_ty values(13,'全场通用券','Petit Bateau',20,'港币','满100港币可用');
insert into yhq_ty values(14,'新品折扣券','Hallmork Babies',8,'折','满500港币可用');
insert into yhq_ty values(15,'精美礼品券','Designer Trend',0,'','满300港币可用');
insert into yhq_ty values(16,'全场通用券','Petit Bateau',40,'港币','满150港币可用');
insert into yhq_ty values(17,'新品折扣券','Hallmork Babies',9,'折','满100港币可用');
insert into yhq_ty values(18,'精美礼品券','Designer Trend',0,'','满200港币可用');
#丢弃表如果存在
drop table if exists yhq_sp;
#创建商品券表
create table yhq_sp(
  sid int unsigned primary key auto_increment,
  sname varchar(12) NOT NULL comment '商品名称',
  sprice int unsigned comment '商品价格',
  soldprice int unsigned comment '商品原价'
);
insert into yhq_sp values(1,'桌上吸尘器',80,85);
insert into yhq_sp values(2,'扫地机器人',90,92);
insert into yhq_sp values(3,'窗户清洁剂',43,48);
insert into yhq_sp values(4,'桌上吸尘器',80,85);
insert into yhq_sp values(5,'扫地机器人',90,92);
insert into yhq_sp values(6,'窗户清洁剂',43,48);
insert into yhq_sp values(7,'桌上吸尘器',80,85);
insert into yhq_sp values(8,'扫地机器人',90,92);