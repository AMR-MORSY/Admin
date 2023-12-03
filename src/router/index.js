import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Pages/Login.vue";
import Dashboard from "../components/Pages/Dashboard/Dashboard.vue";
import notFound from "../components/Pages/notFound.vue";
import Permissions from "../components/Pages/Permissions/Permissions.vue";
import Roles from "../components/Pages/Roles/Roles.vue";
import Users from "../components/Pages/Users/Users.vue";
import ViewDashboard from "../components/Pages/Dashboard/ViewDashboard.vue";
import ViewUser from "../components/Pages/Users/ViewUser.vue";
import EditUser from "../components/Pages/Users/EditUser.vue";
import ViewRole from "../components/Pages/Roles/ViewRole.vue";
import EditRole from "../components/Pages/Roles/EditRole.vue";

import CreatePermission from "../components/Pages/Permissions/CreatePermission.vue";
import CreateRole from "../components/Pages/Roles/CreateRole.vue";
import store from "../vuex/store";
const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    component: Login,
    name: "login",
    beforeEnter: (to, from, next) => {
      if (store.getters.isLogin) {
        next({ name: "notFound" });
      } else {
        next();
      }
    },
  },
  {
    path: "/dashboard",
    component: Dashboard,
    name: "Dashboard",
    children: [
      {
        path: "",
        name: "ViewDashboard",
        component: ViewDashboard,
        meta: { requiresAuth: true },
      },
      {
        path: "permissions",
        name: "Permissions",
        component: Permissions,
        meta: { requiresAuth: true },
      },
      {
        path: "createpermission",
        component: CreatePermission,
        name: "EditPermission",
        meta: { requiresAuth: true },
      },

      {
        path: "roles",
        name: "Roles",
        component: Roles,
        meta: { requiresAuth: true },
      },
      {
        path: "editrole/:id",
        component: EditRole,
        name: "EditRole",
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "viewrole/:id",
        component: ViewRole,
        name: "ViewRole",
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "createrole",
        component: CreateRole,
        name: "CreateRole",
        meta: { requiresAuth: true },
      },
      {
        path: "edituser/:id",
        component: EditUser,
        name: "EditUser",
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "viewuser/:id",
        component: ViewUser,
        name: "ViewUser",
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "users",
        name: "Users",
        component: Users,
        meta: { requiresAuth: true },
      },
    ],
  },
  { path: "/:pathMatch(.*)*", component: notFound, name: "notFound" },
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isLogin) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
