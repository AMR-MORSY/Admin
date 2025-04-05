

<template>
    <h1 class=" text-2xl font-extrabold">View User</h1>
  <Card>
  
    <template #content>
      <div class="flex justify-evenly gap-4 flex-wrap">
        <label class="block">
          <span class="text-sm text-gray-700">Name</span>
          <InputText
            v-model="name"
            type="name"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          />
        </label>
        <label class="block">
          <span class="text-sm text-gray-700">Email</span>
          <InputText
            v-model="email"
            type="email"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          />
        </label>
        
        <Button severity="danger" class="block" @click="goToEdit">
          <font-awesome-icon icon="fa-solid fa-pen-to-square" />
          EDIT
        </Button>
      </div>
      <label class="block w-2/3 xl:w-1/3 mx-auto">
         
          <MultiSelect
            v-model="selectedRoles"
            optionValue="name"
            optionLabel="name"
            display="chip"
            :options="roles"
            filter
            placeholder="Roles"
            :maxSelectedLabels="100"
            @change="onChangeselectedUserRoles"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          />
        </label>
        <OrderList v-model="selectedUserRolesMenue" dataKey="id" breakpoint="575px" pt:pcListbox:root="w-full sm:w-56" v-if="selectedUserRolesMenue.length>0">
            <template #option="{ option }">
                {{ option.name }}
            </template>
        </OrderList>
    </template>
  </Card>
</template>
<script setup>
import { onMounted, ref } from "vue";

import { useRouter } from "vue-router";
import Users from "../../Api/Users";
import DataTable from "../../components/Helpers/Activities/DataTable.vue";

const props = defineProps(["id"]);
var name = ref();
var email = ref();
var permissions = ref([]);
var roles = ref([]);
var selectedPermissions = ref([]);
var selectedRoles = ref([]);
var selectedUserRolesMenue = ref([]);
var userActivities = ref([]);
const router = useRouter();

onMounted(() => {
  getUserData();
});

const getUserData = () => {
  Users.getUserData(props.id).then((response) => {
   
    email.value = response.data.user.user.email;
    name.value = response.data.user.user.name;
    permissions.value = response.data.user.permissions;
    roles.value = response.data.user.user_roles;
    userActivities.value = response.data.user.user_activities;
  });
};
const onChangeselectedUserRoles = () => {
  let data = {
    roles: selectedRoles.value,
  };
  selectedUserRolesMenue.value = [];

  Users.getRolesPermissionsByRoleName(data).then((response) => {
   
    selectedUserRolesMenue.value=response.data.permissions[0]

   
  });
};
const goToEdit = () => {
  router.push({ path: `/edituser/${props.id}` });
};

</script>

<style lang="scss" scoped></style>
