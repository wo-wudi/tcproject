import Vue from "vue";
import VueRouter from "vue-router";
import Error from "../views/error";

Vue.use(VueRouter);

const routes = [
  {
    path: "/404",
    component: Error,
    name: "404",
  },
  {
    path: "*",
    redirect: "/404",
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/index.vue"),
  },
  {
    path: "/ulog",
    component: () =>
      import(/* webpackChunkName: "ulog" */ "../views/user/user_log.vue"),
  },
  {
    path: "/ureg",
    component: () =>
      import(/* webpackChunkName: "ureg" */ "../views/user/user_reg.vue"),
  },
  {
    path: "/alog",
    component: () =>
      import(/* webpackChunkName: "alog" */ "../views/admin/admin_log.vue"),
  },
  {
    path: "/areg",
    component: () =>
      import(/* webpackChunkName: "areg" */ "../views/admin/admin_reg.vue"),
  },
  {
    path: "/ayhq",
    component: () =>
      import(/* webpackChunkName: "ayhq" */ "../views/admin/admin_yhq.vue"),
    redirect: "/ahl",
    children: [
      {
        path: "/ahl",
        component: () =>
          import(/* webpackChunkName: "ahl" */ "../views/admin/admin_hl.vue"),
      },
      {
        path: "/azx",
        component: () =>
          import(/* webpackChunkName: "azx" */ "../views/admin/admin_zx.vue"),
      },
      {
        path: "/aty",
        component: () =>
          import(/* webpackChunkName: "aty" */ "../views/admin/admin_ty.vue"),
      },
      {
        path: "/asp",
        component: () =>
          import(/* webpackChunkName: "asp" */ "../views/admin/admin_sp.vue"),
      },
      {
        path: "/ajy",
        component: () =>
          import(/* webpackChunkName: "ajy" */ "../views/admin/admin_jy.vue"),
      },
      {
        path: "/ahd",
        component: () =>
          import(/* webpackChunkName: "ahd" */ "../views/admin/admin_hd.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
