import Vue from "vue";
import Router from "vue-router";
import { getToken } from "../utils/setToken.js";
//import Home from '../components/Home.vue'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/login",
      component: () => import("@/components/Login"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/components/Login"),
    },
    {
      path: "*",
      name: "NotFound",
      component: () => import("@/components/NotFound"),
    },
    {
      path: "/Passwd",
      name: "Passwd",
      component: () => import("@/components/Personal/Passwd"),
    },
    {
      path: "/home",
      //component:Home
      //component: () => import('@/components/Home')//路由懒加载
      component: (resolve) => require(["@/components/Home"], resolve), //异步组件加载
      children: [
        {
          path: "/Notice",
          name: "Notice",
          component: () => import("@/components/Notice"),
        },

        {
          path: "/Information",
          name: "Information",
          component: () => import("@/components/Personal/Information"),
        },

        {
          path: "/Produce",
          name: "Produce",
          component: () => import("@/components/User/Produce"),
        },
        {
          path: "/Recording",
          name: "Recording",
          component: () => import("@/components/User/Recording"),
        },
        {
          path: "/Need",
          name: "Need",
          component: () => import("@/components/Manager/Need"),
        },
        {
          path: "/Project",
          name: "Project",
          component: () => import("@/components/Expert/Project"),
        },
        {
          path: "/Situation",
          name: "Situation",
          component: () => import("@/components/Expert/Situation"),
        },
        {
          path: "/Recordings",
          name: "Recordings",
          component: () => import("@/components/Expert/Recordings"),
        },
        {
          path: "/Delivery",
          name: "Delivery",
          component: () => import("@/components/Expert/Delivery"),
        },
        {
          path: "/ProjectO",
          name: "ProjectO",
          component: () => import("@/components/Manager/Overview/ProjectO"),
        },
        {
          path: "/Approval",
          name: "Approval",
          component: () => import("@/components/User/Approval"),
        },
        {
          path: "/Detail",
          name: "Detail",
          component: () => import("@/components/User/Detail"),
        },
        {
          path: "/Produces",
          name: "Produces",
          component: () => import("@/components/Expert/Produces"),
        },
        {
          path: "/DetailE",
          name: "DetailE",
          component: () => import("@/components/Expert/DetailE"),
        },
        {
          path: "/Approves",
          name: "Approves",
          component: () => import("@/components/Expert/Approves"),
        },

        {
          path: "/SituationO",
          name: "SituationO",
          component: () => import("@/components/Manager/Overview/SituationO"),
        },
        {
          path: "/ProduceO",
          name: "ProduceO",
          component: () => import("@/components/Manager/Overview/ProduceO"),
        },
        {
          path: "/DetailO",
          name: "DetailO",
          component: () => import("@/components/Manager/Overview/DetailO"),
        },
        {
          path: "/RecordingO",
          name: "RecordingO",
          component: () => import("@/components/Manager/Overview/RecordingO"),
        },
        {
          path: "/DeliveryO",
          name: "DeliveryO",
          component: () => import("@/components/Manager/Overview/DeliveryO"),
        },
        {
          path: "/ApprovesO",
          name: "ApprovesO",
          component: () => import("@/components/Manager/ApprovesO"),
        },
        {
          path: "/EchartsDemo",
          name: "EchartsDemo",
          component: () => import("@/components/EchartsDemo"),
        },
        //二期
/*         {
          path: "/Employee",
          name: "Employee",
          component: () => import("@/components/User/Employee"),
        },
        {
          path: "/Employees",
          name: "Employees",
          component: () => import("@/components/Expert/Employees"),
        }, */
      ],
    },
  ],
  mode: "history",
});

/* 挂载路由导航守卫  */
router.beforeEach((to, from, next) => {
  //to 要访问的路径
  //from 从哪个路径跳转
  //next 表示放行
  if (to.path === "/login") return next();
  if (to.path === "/passwd") return next();
  //获取work_num
  const workNumStr = getToken("work_num");
  if (!workNumStr) return next("/login");
  next();
});
export default router;
