
<template>
    <router-view></router-view>

    <UnauthenticatedToast></UnauthenticatedToast>
    <NetworkErrorToast></NetworkErrorToast>
    <SpinnerPage :display-spinner="display"></SpinnerPage>
    <Toast position="center" :breakpoints="{ '480px': { 'width': '80%', 'margin': 'auto' } }" />
    <ConfirmDialog >
      

    </ConfirmDialog>
</template>

<script>
import UnauthenticatedToast from "./components/Helpers/UnauthenticatedToast.vue";
import NetworkErrorToast from "./components/Helpers/NetworkErrorToast.vue";
import SpinnerPage from "./components/Helpers/SpinnerPage.vue";
import { useStore } from 'vuex'
import { useRoute,useRouter } from "vue-router";
import { computed, watch } from "vue";
import signUp from "./Api/signUp";


export default {

    components: {
        UnauthenticatedToast,
        NetworkErrorToast,
        SpinnerPage,
        
    },

    setup() {
        const store = useStore();
        const route=useRoute();
        const islogin = computed(() => {
            return store.getters.isLogin
        })
        const display = computed(() => {
            return store.state.displaySpinnerPage
        })

      


        watch(
            route, () => {
                if (islogin.value!=null) {
                   
                   
                    signUp.userAbilities().then((response) => {
                        
                       
                    })

                }


            }







        )




        return {
            display, islogin
        }

    },

}

</script>

<style lang="scss" scoped></style>
