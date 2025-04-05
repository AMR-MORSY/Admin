<!-- <template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Create Role</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group me-2">
                    <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
                </div>
                <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
                    <span data-feather="calendar" class="align-text-bottom"></span>
                    This week
                </button>
            </div>
        </div>

        <div class="container">
            <form @submit.prevent="submitRollForm">
                <div class="row">

                    <div class="col-md-6">
                        <div class="input-group ">
                            <span class="input-group-text" id="pass">

                                Name

                            </span>
                            <input class="form-control " v-model.trim="rolleForm.name"
                                :class="{ 'is-invalid': v$.name.$errors.length }" type="text" />

                        </div>
                        <div v-if="v$.name.$errors">
                            <div style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
                                v-for="error in v$.name.$errors">
                                {{ error.$message }}</div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card  d-flex mt-3 justify-content-center">
                            <MultiSelect v-model="rolleForm.selectedRollPermissions" optionValue="name" display="chip"
                                :options="permissions" optionLabel="name" filter
                                placeholder="Permissions assigned to the role" :maxSelectedLabels="100"
                                :class="{ 'p-invalid': v$.selectedRollPermissions.$errors.length }" />
                        </div>
                        <div v-if="v$.selectedRollPermissions.$errors">
                            <div style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
                                v-for="error in v$.selectedRollPermissions.$errors">
                                {{ error.$message }}</div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <button class="btn btn-danger mt-2" type="submit"> <font-awesome-icon
                                icon="fa-solid fa-pen-to-square" />Create</button>
                    </div>

                </div>
            </form>
        </div>
    </main>
</template> -->

<template>
  <h1 class="h2">Create Role</h1>
  <div class="w-full bg-white mt-4 p-9">
    <form @submit.prevent="submitRollForm">
      <div class="flex flex-col items-center">
        <label class="block">
          <span class="text-sm text-gray-700">Name</span>
          <InputText
            v-model.trim="roleForm.name"
            type="name"
            :invalid="v$.name.$errors.length > 0"
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

        <label class="block w-full">
          <span class="text-sm text-gray-700 block">Permissions</span>
          <MultiSelect
            v-model="roleForm.selectedRollPermissions"
            optionValue="name"
          :invalid="v$.selectedRollPermissions.$errors.length>0"
            :options="permissions"
            optionLabel="name"
            filter
            placeholder="Permissions assigned to the role"
            :maxSelectedLabels="100"
            class=" w-full"
          />
        </label>

        <div class="w-full mt-12 flex justify-center">
          <Button
            type="submit"
            label="Submit"
            severity="danger"
            class="block"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import Users from "../../Api/Users";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, maxLength, minLength } from "@vuelidate/validators";
import { useToast } from "primevue/usetoast";

const permissions = ref([]);
 const toast = useToast();
const router = useRouter();

const roleForm = reactive({
  name: "",
  selectedRollPermissions: "",
});

onMounted(() => {
  retrievePermissions();
});

const nameReg = helpers.regex(/^[a-zA-Z]{3,}[a-zA-Z_-]*$/);

const rules = {
  name: {
    required: helpers.withMessage("Rolle name required", required),
    nameReg: helpers.withMessage("char. may include(_-)", nameReg),
    maxLength: helpers.withMessage("30 char. max", maxLength(30)),
    minLength: helpers.withMessage("at least 3 char", minLength(3)),
  },
  selectedRollPermissions: {
    required: helpers.withMessage("at least one permission", required),
  }, // Matches state.lastName
};

const retrievePermissions = () => {
  Users.retrievePermissions().then((response) => {
    permissions.value = response.data.permissions;
  });
};

const v$ = useVuelidate(rules, roleForm);

const submitRollForm = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
  Users.createNewRole(roleForm)
    .then((response) => {
        toast.add({
          severity: "success",
          summary: "Success Message",
          detail: " Created Successfully",
          life: 2000,
        });

      router.push({ path: "/roles" });
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
};
</script>
