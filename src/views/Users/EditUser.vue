
<template>
  <h1 class="h2">Edit User</h1>
  <div class="w-full bg-white mt-4 p-9">
    <form @submit.prevent="submitUserForm">
      <div class="w-full flex flex-wrap justify-evenly gap-1">
        <label class="block">
          <span class="text-sm text-gray-700">Name</span>
          <InputText
            v-model="userForm.name"
            type="name"
            disabled
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          />
        </label>
        <label class="block">
          <span class="text-sm text-gray-700">Name</span>
          <InputText
            v-model="userForm.email"
            type="name"
            disabled
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          />
        </label>
        <label class="block">
          <span class="text-sm text-gray-700 block">Other Available Roles</span>
          <MultiSelect
            v-model="userForm.selectedAvailableRoles"
          
            placeholder="AvailableRoles"
            :options="availableRoles"
            filter
            optionValue="name"
            optionLabel="name"
            :maxSelectedLabels="1"
          />
        
        </label>

        <label class="block">
          <span class="text-sm text-gray-700 block">User Given Roles</span>
          <MultiSelect
            v-model="userForm.selectedUserRoles"
            optionValue="name"
            optionLabel="name"
           
            :options="roles"
            placeholder="User Given Roles"
            filter
            :maxSelectedLabels="100"
          />
        
        </label>
      </div>
      <div class="flex flex-col items-center mt-9">
        <OrderList
          v-model="permissionsAssignedToRole"
          dataKey="id"
          breakpoint="575px"
          pt:pcListbox:root="w-full sm:w-56"
        >
          <template #option="{ option }">
            {{ option.name }}
          </template>
        </OrderList>
        <Button
          @click.prevent="getPermissionsAssignedToRole"
          label="GET PERMISSIONS"
          severity="danger"
        />
      </div>

      <div class=" flex justify-center w-full mt-16">
        <Button label="Update" type="submit" class=" block" severity="info"/>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import Users from "../../Api/Users";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

const router = useRouter();
const toast = useToast();
const props = defineProps(["id"]);
const userForm = reactive({
  id: "",
  email: "",
  name: "",
  selectedAvailableRoles: [],
  selectedUserRoles: [],
  roles: [],
});

const roles = ref([]);
const availableRoles = ref([]);

const permissionsAssignedToRole = ref([]);

onMounted(() => {
  getUserData();
});

function getUserData() {
  Users.getUserData(props.id).then((response) => {
    console.log(response);
    userForm.email = response.data.user.user.email;
    userForm.name = response.data.user.user.name;
    userForm.id = response.data.user.user.id;
    roles.value = response.data.user.user_roles;
    availableRoles.value = response.data.user.roles_diff;
  });
}

const gatherSelectedRoles = () => {
  var totalRoles = [];
 
  if (userForm.selectedUserRoles.length > 0) {
    userForm.selectedUserRoles.forEach((element) => {
      totalRoles.push(element);
    });
  }
  if (userForm.selectedAvailableRoles.length > 0) {
    userForm.selectedAvailableRoles.forEach((element) => {
      totalRoles.push(element);
    });
  }
  return totalRoles;
};
const getPermissionsAssignedToRole = () => {
  var totalRoles = [];

  totalRoles = gatherSelectedRoles();

  if (totalRoles.length > 0) {
    let data = {
      roles: totalRoles,
    };
    permissionsAssignedToRole.value = [];

    Users.getRolesPermissionsByRoleName(data).then((response) => {
      console.log(response);
      var permissions = response.data.permissions;

      permissions.forEach((element) => {
        element.forEach((ele) => {
          permissionsAssignedToRole.value.push(ele);
        });
      });
    });
  } else {
    toast.add({
      severity: "error",
      summary: "Error Message",

      detail: "Please select a Role",
      life: 4000,
    });
  }

  
};

const callServer = (data) => {
  Users.updateUserRoles(data).then((response) => {
    toast.add({
      severity: "success",
      summary: "Success Message",
      detail: "Updated Successfully",
      life: 3000,
    });

    router.push({ path: `/viewuser/${props.id}` });
  });
};
const submitUserForm = () => {
  

  var totalRoles = [];

  totalRoles = gatherSelectedRoles();

  if (totalRoles.length > 0) {
    userForm.roles = totalRoles;
    callServer(userForm);
  } else {
    toast.add({
      severity: "error",
      summary: "Error Message",
      detail: "Please choose at least one Role",
      life: 3000,
    });
  }
};

</script>

<style lang="scss" scoped></style>
