<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <h1 class="h2">Create Permission</h1>
    <div class="max-w-full">
      <form
        @submit.prevent="submitPermissionForm"
        class="max-w-96 sm:max-w-full mx-auto py-11 bg-white"
      >
        <div class="flex flex-col w-2/3 mx-auto flex-wrap">
    
            <label class="block">
              <span class="text-sm text-gray-700">Name</span>
              <InputText
                v-model.trim="permissionForm.name"
                :invalid="v$.name.$errors.length"
                class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
              />
            </label>
            <div v-if="v$.name.$errors">
              <div
                style="
                  color: red;
                  font-size: 0.7rem;
                  padding-left: 3px;
                  padding-top: 3px;
                "
                v-for="error in v$.name.$errors"
              >
                {{ error.$message }}
              </div>
            </div>
         

          <Button label=" Save" severity="info" class="block mt-10" type="submit" />
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import Users from "../../Api/Users";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, maxLength, minLength } from "@vuelidate/validators";
import { useToast } from "primevue/usetoast";
import InputText from "primevue/inputtext";

export default {
  name: "CreatePermission",
  setup() {
    const toast = useToast();

    const nameReg = helpers.regex(/^[a-zA-Z]{3,}[a-zA-Z_-]*$/);

    const permissionForm = reactive({
      name: "",
    });

    const rules = {
      name: {
        required: helpers.withMessage("permission name required", required),
        nameReg: helpers.withMessage("char. may include(_-)", nameReg),
        maxLength: helpers.withMessage("30 char. max", maxLength(30)),
        minLength: helpers.withMessage("at least 3 char", minLength(3)),
      },
    };

    async function submitPermissionForm() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;
      Users.createNewPermission(permissionForm)
        .then((response) => {
          toast.add({
            severity: "success",
            summary: "Success Message",
            detail: " Created Successfully",
            life: 2000,
          });

          router.push({ path: "/permissions" });
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 422) {
            if (error.response.data.errors.name) {
              let serverError = error.response.data.errors.name;
              serverError.forEach((element) => {
                toast.add({
                  severity: "error",
                  summary: "Error Message",
                  detail: element,
                  life: 3000,
                });
              });
            }
          }
        });
    }

    const v$ = useVuelidate(rules, permissionForm);

    const router = useRouter();

    return {
      v$,
      permissionForm,
      submitPermissionForm,
    };
  },
};
</script>

<style lang="scss" scoped></style>
