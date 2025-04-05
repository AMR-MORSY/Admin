<template>
  <!-- <router-view></router-view> -->

  <!-- new code -->
  <component :is="layout">
    <router-view />
  </component>



  <UnauthenticatedToast></UnauthenticatedToast>
  <!-- <NetworkErrorToast></NetworkErrorToast> -->
  <SpinnerPage :display-spinner="display"></SpinnerPage>
  <Toast
    position="center"
    :breakpoints="{ '480px': { width: '80%', margin: 'auto' } }"
  />
  <ConfirmDialog> </ConfirmDialog>
</template>

<script setup>
import UnauthenticatedToast from "./components/Helpers/UnauthenticatedToast.vue";
import NetworkErrorToast from "./components/Helpers/NetworkErrorToast.vue";

import SpinnerPage from "./components/Helpers/SpinnerPage.vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { computed, watch } from "vue";
import signUp from "./Api/signUp";

//////////////////////////new code/////////////////////


const defaultLayout = 'default'

const { currentRoute } = useRouter()

const layout = computed(
  () => `${currentRoute.value.meta.layout || defaultLayout}-layout`,
)

const store = useStore();
const route = useRoute();
const islogin = computed(() => {
  return store.getters.isLogin;
});
const display = computed(() => {
  return store.state.displaySpinnerPage;
});

watch(route, () => {
  if (islogin.value != null) {
    signUp.userAbilities().then((response) => {});
  }
});

//         )
// export default {

//     components: {
//         UnauthenticatedToast,
//         NetworkErrorToast,
//         SpinnerPage,

//     },

//     setup() {

//         return {
//             display, islogin
//         }

//     },

// }
</script>

<style scoped></style>
