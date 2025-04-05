<!-- <template> -->
<!-- <div class="container">

        <Card class="form-container">

            <template #content>


                <p class=" text-center" style="color:  #673EE6 ; font-size: 1.5rem; font-weight: 700;">
                    Sign in
                </p>

                <form @submit.prevent="submitLoginForm" novalidate>

                    <div class="my-3">

                        <div class="input-group ">
                            <span class="input-group-text" id="email">

                                Email

                            </span>

                            <input class="form-control " :class="{ 'is-invalid': v$.email.$errors.length }" type="text"
                                v-model.trim="state.email" aria-describedby="email" />



                        </div>
                        <div v-if="v$.email.$errors">
                            <div style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
                                v-for="error in v$.email.$errors">
                                {{ error.$message }}</div>
                        </div>
                    </div>



                    <div class="input-group ">
                        <span class="input-group-text" id="pass">

                            Password

                        </span>
                        <input class="form-control " :class="{ 'is-invalid': v$.password.$errors.length }" type="password"
                            v-model.trim="state.password" aria-describedby="pass" />

                    </div>
                    <div v-if="v$.password.$errors">
                        <div style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
                            v-for="error in v$.password.$errors">
                            {{ error.$message }}</div>
                    </div>





                    <button class="btn  w-100 mt-3" type="submit">Sign in</button>


                </form>







            </template>



        </Card>


    </div> -->

<!-- </template> -->

<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <svg
          class="w-10 h-10"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
            fill="#4C51BF"
            stroke="#4C51BF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
            fill="white"
          />
        </svg>
        <span class="text-2xl font-semibold text-gray-700">Cairo Team</span>
      </div>

      <form class="mt-4" @submit.prevent="submitLoginForm" novalidate>
        <label class="block">
          <span class="text-sm text-gray-700">Email</span>
          <InputText
            v-model="state.email"
            type="email"
            :invalid="v$.password.$errors.length > 0"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          />
        </label>
        <div v-if="v$.email.$errors">
          <div
            style="
              color: red;
              font-size: 0.7rem;
              padding-left: 3px;
              padding-top: 3px;
            "
            v-for="error in v$.email.$errors"
          >
            {{ error.$message }}
          </div>
        </div>

        <label class="block mt-3">
          <span class="text-sm text-gray-700">Password</span>
          <InputText
            v-model="state.password"
            type="password"
            :invalid="v$.password.$errors.length>0"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          />
        </label>
        <div v-if="v$.password.$errors">
          <div
            style="
              color: red;
              font-size: 0.7rem;
              padding-left: 3px;
              padding-top: 3px;
            "
            v-for="error in v$.password.$errors"
          >
            {{ error.$message }}
          </div>
        </div>

        <div class="flex items-center justify-between mt-4">
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="text-indigo-600 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
              />
              <!-- <span class="mx-2 text-sm text-gray-600">Remember me</span> -->
            </label>
          </div>

          <div>
            <a
              class="block text-sm text-indigo-700 fontme hover:underline"
              href="#"
              >Forgot your password?</a
            >
          </div>
        </div>

        <div class="mt-6">
          <button
            type="submit"
            class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { reactive } from "vue";
import signUp from "../Api/signUp";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";

export default {
  name: "Login",
  setup() {
    const state = reactive({
      email: "",
      password: "",
    });
    const rules = {
      email: {
        required: helpers.withMessage("Email is required", required),
        email: helpers.withMessage("please enter a valid email address", email),
      },
      password: {
        required: helpers.withMessage("Password is required", required),
      }, // Matches state.lastName
    };
    const toast = useToast();

    const v$ = useVuelidate(rules, state);
    const store = useStore();
    const router = useRouter();
    async function submitLoginForm() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;
      signUp
        .adminSignUp(state)
        .then((response) => {
          console.log(response);
          if (response.data.message == "User loged in successfully") {
            sessionStorage.setItem(
              "User",
              JSON.stringify(response.data.user_data)
            );
            store.dispatch("userData", response.data.user_data);

            router.push({
              path: "/dashboard",
            });
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error);
            if (error.response.status == 422) {
              if (error.response.data.errors) {
                let errors = error.response.data.errors;
                if (errors.email) {
                  errors.email.forEach((element) => {
                    toast.add({
                      severity: "error",
                      summary: "Error Message",
                      detail: element,
                      life: 3000,
                    });
                  });
                }
                if (errors.password) {
                  errors.password.forEach((element) => {
                    toast.add({
                      severity: "error",
                      summary: "Error Message",
                      detail: element,
                      life: 3000,
                    });
                  });
                }
              } else if (error.response.data.message) {
                toast.add({
                  severity: "error",
                  summary: "Error Message",
                  detail: error.response.data.message,
                  life: 3000,
                });
              }
            } else if (error.response.status == 402) {
              toast.add({
                severity: "error",
                summary: "Error Message",
                detail: error.response.data.message,
                life: 3000,
              });
            }
          }
        });
    }

    return {
      state,
      v$,
      submitLoginForm,
    };
  },
};
</script>

<style scoped>
/* .container {
  height: 100vh !important;

  .form-container {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px !important;
    max-width: 300px;

    button {
      background-color: #673ee6;
      border: unset;
      color: white;
    }

    .links {
      font-size: clamp(13px, 2vw, 15px);
    }
  }
} */
</style>
