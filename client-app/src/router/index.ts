import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { Routes } from "./routes";

import { store } from "../store";
import routesNames from "./routesNames";

const isAuthenticated = store.getters['user/getAuthenticatedStatus']

export const router = createRouter({
  history: createWebHistory(),
  routes: Routes
})

const requiresAuthGuard = (to: RouteRecordRaw, from: RouteRecordRaw, next: Function): boolean => {
  if (to.meta?.requiresAuth) {
    const isLoggedIn = !!isAuthenticated

    if (!isLoggedIn) {
      next({
        name: routesNames.login,
        query: { redirect: to.path }
      })
    } else {
      next()
    }
    return true
  }
  return false
}

const anonymousOnlyGuard = (to: RouteRecordRaw, from: RouteRecordRaw, next: Function): boolean => {
  if (to.meta?.anonymousOnly) {
    const isAnonymous = !isAuthenticated

    if (!isAnonymous) {
      next({
        name: routesNames.dashboard,
      })
    } else {
      next()
    }
    return true
  }
  return false
}

router.beforeEach(async (to: any, from: any, next: any) => {
  await store.dispatch('user/GET_USER_DATA')

  if (requiresAuthGuard(to, from, next)) {
    return
  }
  if (anonymousOnlyGuard(to, from, next)) {
    return
  }

  next()
})
