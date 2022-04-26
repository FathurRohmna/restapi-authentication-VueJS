import { RouteRecordRaw } from "vue-router";

import routesNames from "./routesNames";
import HomePublic from "../pages/HomePublic.vue";

export const Routes: RouteRecordRaw[] = [
  {
    name: routesNames.public,
    path: '/',
    component: HomePublic
  },
  {
    name: routesNames.login,
    path: '/login',
    component: () => import('../pages/Login.vue'),
    meta: {
      anonymousOnly: true
    }
  },
  {
    name: routesNames.register,
    path: '/register',
    component: () => import('../pages/Register.vue'),
    meta: {
      anonymousOnly: true
    }
  },
  {
    name: routesNames.dashboard,
    path: '/dashboard',
    component: () => import('../pages/Dashboard.vue'),
    meta: {
      requiresAuth: true
    }
  }
]
