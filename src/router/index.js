import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import notFound from "../components/Pages/notFound.vue";
import Permissions from "../views/Permissions/Permissions.vue";
import Roles from "../views/Roles/Roles.vue";
import Users from "../views/Users/Users.vue";
import ViewUser from "../views/Users/ViewUser.vue";
import EditUser from "../views/Users/EditUser.vue";
import ViewRole from "../views/Roles/ViewRole.vue";
import EditRole from "../views/Roles/EditRole.vue";

import CreatePermission from "../views/Permissions/CreatePermission.vue";
import CreateRole from "../views/Roles/CreateRole.vue";
import Modifications from "../views/Modifications/Modifications.vue";
import ViewModificationActivity from "../views/Modifications/ViewModificationActivity.vue";
import WAN from "../views/Transmission/WAN.vue";
import XPIC from "../views/Transmission/XPIC.vue";
import IP_trafic from "../views/Transmission/IPS.vue";
import ViewTransmissionActivity from "../views/Transmission/ViewTransmissionActivity.vue";
import SendPublicNotification from "../views/SendPublicNotification.vue";
import store from "../vuex/store";
// const routes = [
//   { path: "/", redirect: "/login" },
//   {
//     path: "/login",
//     component: Login,
//     name: "login",
//     beforeEnter: (to, from, next) => {
//       if (store.getters.isLogin) {
//         next({ name: "notFound" });
//       } else {
//         next();
//       }
//     },
//   },
//   {
//     path: "/dashboard",
//     component: Dashboard,
//     name: "Dashboard",
//     children: [
//       {
//         path: "",
//         name: "ViewDashboard",
//         component: ViewDashboard,
//         meta: { requiresAuth: true },
//       },
//       {
//         path: "permissions",
//         name: "Permissions",
//         component: Permissions,
//         meta: { requiresAuth: true },
//       },
//       {
//         path: "createpermission",
//         component: CreatePermission,
//         name: "EditPermission",
//         meta: { requiresAuth: true },
//       },

//       {
//         path: "roles",
//         name: "Roles",
//         component: Roles,
//         meta: { requiresAuth: true },
//       },
//       {
//         path: "editrole/:id",
//         component: EditRole,
//         name: "EditRole",
//         props: true,
//         meta: { requiresAuth: true },
//       },
//       {
//         path: "viewrole/:id",
//         component: ViewRole,
//         name: "ViewRole",
//         props: true,
//         meta: { requiresAuth: true },
//       },
//       {
//         path: "createrole",
//         component: CreateRole,
//         name: "CreateRole",
//         meta: { requiresAuth: true },
//       },
//       {
//         path: "edituser/:id",
//         component: EditUser,
//         name: "EditUser",
//         props: true,
//         meta: { requiresAuth: true },
//       },
//       {
//         path: "viewuser/:id",
//         component: ViewUser,
//         name: "ViewUser",
//         props: true,
//         meta: { requiresAuth: true },
//       },
//       {
//         path: "users",
//         name: "Users",
//         component: Users,
//         meta: { requiresAuth: true },
//       },
//       {
//         path: "modifications",
//         name: "Modifications",
//         component: Modifications,
//         meta: { requiresAuth: true },
//       },
//       {
//         path: "modification/activity/:id",
//         name: "ModificationActivity",
//         component: ViewModificationActivity,
//         props:true,
//         meta: { requiresAuth: true },
//       },
//       {
//         path: "wans",
//         name: "WAN",
//         component: WAN,
//         meta: { requiresAuth: true },
//       },
//       {
//         path: "xpics",
//         name: "XPIC",
//         component: XPIC,
//         meta: { requiresAuth: true },
//       },
//       {
//         path: "ip_trafic",
//         name: "IP_trafic",
//         component: IP_trafic,
//         meta: { requiresAuth: true },
//       },
//       {
//         path: "Transmission/activity/:id",
//         name: "TransmissionActivity",
//         component: ViewTransmissionActivity,
//         props:true,
//         meta: { requiresAuth: true },
//       },
//     ],
//   },
//   { path: "/:pathMatch(.*)*", component: notFound, name: "notFound" },
// ];

///////////////////////////////////////////////////new code/////////////////////////////////

const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    component: Login,
    name: "login",
    meta: { layout: "empty" },
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
    meta: { requiresAuth: true },
  },
  {
    path: "/modifications",
    name: "Modifications",
    component: Modifications,
    meta: { requiresAuth: true },
  },
  {
    path: "/modification/activity/:id",
    name: "ModificationActivity",
    component: ViewModificationActivity,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/permissions",
    name: "Permissions",
    component: Permissions,
    meta: { requiresAuth: true },
  },
  {
    path: "/createpermission",
    component: CreatePermission,
    name: "EditPermission",
    meta: { requiresAuth: true },
  },

  {
    path: "/roles",
    name: "Roles",
    component: Roles,
    meta: { requiresAuth: true },
  },
  {
    path: "/editrole/:id",
    component: EditRole,
    name: "EditRole",
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/viewrole/:id",
    component: ViewRole,
    name: "ViewRole",
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/createrole",
    component: CreateRole,
    name: "CreateRole",
    meta: { requiresAuth: true },
  },
  {
    path: "/edituser/:id",
    component: EditUser,
    name: "EditUser",
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/viewuser/:id",
    component: ViewUser,
    name: "ViewUser",
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: { requiresAuth: true },
  },
  {
    path: "/public_notification",
    name: "PublicNotification",
    component: SendPublicNotification,
    meta: { requiresAuth: true },
  },
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
