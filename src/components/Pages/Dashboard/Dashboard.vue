<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Cairo Team</a>
    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
      data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <input class="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search"
      aria-label="Search">
    <div class="navbar-nav">
      <div class="nav-item text-nowrap">
        <a class="nav-link px-3" @click.prevent="logout">Sign out</a>
      </div>
    </div>
  </header>

  <div class="container-fluid">
    <div class="row">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="position-sticky pt-3 sidebar-sticky">
          <ul class="nav flex-column">
            <li class="nav-item" v-for="link in navLinks" @click.prevent="activateClass(link.index)" :key="link.index">
              <router-link :class="link.class" aria-current="page" :to="link.to">
             
                <font-awesome-icon :icon="link.icon" />

                {{ link.name }}
              </router-link>
            </li>
          
          </ul>

          <h6
            class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
            <span>Saved reports</span>
            <a class="link-secondary" href="#" aria-label="Add a new report">
              <span data-feather="plus-circle" class="align-text-bottom"></span>
            </a>
          </h6>
          <ul class="nav flex-column mb-2">
            <li class="nav-item">
              <a class="nav-link" href="#">
                <span data-feather="file-text" class="align-text-bottom"></span>
                Current month
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <span data-feather="file-text" class="align-text-bottom"></span>
                Last quarter
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <span data-feather="file-text" class="align-text-bottom"></span>
                Social engagement
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <span data-feather="file-text" class="align-text-bottom"></span>
                Year-end sale
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <router-view></router-view>



    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, watch } from 'vue';
import signUp from '../../../Api/signUp';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
export default {

  setup() {

    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const navLinks = ref([{
      "to": "/dashboard",
      "icon": "fa-solid fa-table-columns",
      "class": "nav-link",
      "index": 0,
      "name": "Dashboard"

    }, {
      "to": "/dashboard/users",
      "icon": "fa-solid fa-users",
      "class": "nav-link",
      "index": 1,
      "name": "Users"

    }, {
      "to": "/dashboard/roles",
      "icon": "fa-brands fa-critical-role",
      "class": "nav-link",
      "index": 2,
      "name": "Roles"

    }, {
      "to": "/dashboard/permissions",
      "icon": "fa-solid fa-drum",
      "class": "nav-link",
      "index": 3,
      "name": "Permissions"

    }])

    onMounted(()=>{
      activateRoute()
    })

   
    const activateRoute = () => {
      navLinks.value.forEach(element => {

        if (element.to == router.currentRoute.value.path) {
          element.class = "nav-link active";
        }
        else {
          element.class = "nav-link";

        }

      });

    }

    watch(route, activateRoute)

    const activateClass = (link_index) => {
      navLinks.value.forEach(element => {

        if (element.index == link_index) {
          element.class = "nav-link active";
        }
        else {
          element.class = "nav-link";

        }

      });

    }

    const logout = (() => {

      signUp.userLogout().then((response) => {
        store.dispatch("userData", null);
        sessionStorage.removeItem("User");

        router.push({ path: "/login" });

      })



    })


    return {
      logout, navLinks, activateClass, activateRoute
    }
  }
}
</script>

<style lang="scss" scoped>
/*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 0;
  /* rtl:raw:
  right: 0;
  */
  bottom: 0;
  /* rtl:remove */
  left: 0;
  z-index: 100;
  /* Behind the navbar */
  padding: 48px 0 0;
  /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}

.sidebar-sticky {
  height: calc(100vh - 48px);
  overflow-x: hidden;
  overflow-y: auto;
  /* Scrollable contents if viewport is shorter than content. */
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #727272;
}

.sidebar .nav-link.active {
  color: #2470dc;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar .navbar-toggler {
  top: .25rem;
  right: 1rem;
}

.navbar .form-control {
  padding: .75rem 1rem;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, .1);
  border-color: rgba(255, 255, 255, .1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
}


.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, .1);
  border: solid rgba(0, 0, 0, .15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
</style>