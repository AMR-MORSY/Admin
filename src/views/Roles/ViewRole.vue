<template>
  <!-- <h1 class="h2">View Role</h1>

  <div class="w-full bg-white px-14 py-10">
   
        <div class="input-group">
          <span class="input-group-text" id="pass"> id </span>
          <input class="form-control" v-model="id" type="text" />
        </div>
  
     
        <div class="input-group">
          <span class="input-group-text" id="pass"> Name </span>
          <input class="form-control" v-model="name" type="text" />
        </div>
      
    
        <div class="card d-flex mt-3 justify-content-center">
          <MultiSelect
            display="chip"
            :options="permissions"
            filter
            placeholder="Permissions"
            :maxSelectedLabels="100"
          />
        </div>
      

      <div class="col-md-6">
        <button class="btn btn-danger mt-2" @click="goToEdit">
          <font-awesome-icon icon="fa-solid fa-pen-to-square" />Edit
        </button>
      </div>
   
  </div> -->
  <h1 class="text-2xl font-extrabold">View Role</h1>
  <Card>
    <template #content>
      <div class="flex justify-evenly gap-4 flex-wrap">
        <label class="block">
          <span class="text-sm text-gray-700">ID</span>
          <InputText
            v-model="id"
            type="name"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          />
        </label>
        <label class="block">
          <span class="text-sm text-gray-700">Role</span>
          <InputText
            v-model="name"
            type="email"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          />
        </label>

        <Button severity="danger" class="block" @click="goToEdit"><font-awesome-icon icon="fa-solid fa-pen-to-square" />EDIT</Button>
      </div>
      <label class="block w-2/3 xl:w-1/3 mx-auto">
        <MultiSelect
          :options="permissions"
          filter
          placeholder="Permissions"
          :maxSelectedLabels="100"
          class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
        />
      </label>
    </template>
  </Card>
</template>

<script>
import { onMounted, ref } from "vue";
import Users from "../../Api/Users";
import { useRouter } from "vue-router";
export default {
  name: "ViewRole",
  props: {
    id: String,
  },
  setup(props) {
    var id = ref();
    var name = ref();
    var permissions = ref([]);
    var role = ref();

    const router = useRouter();

    onMounted(() => {
      retrieveRoleData();
    });

    function goToEdit() {
      router.push({ path: `/editrole/${props.id}` });
    }

    function retrieveRoleData() {
      Users.getRoleData(props.id).then((response) => {
        console.log(response);
        id.value = response.data.role.id;
        name.value = response.data.role.name;
        let permissionsContainer = [];
        let perm = response.data.permissions;
        perm.forEach((element) => {
          permissionsContainer.push(element.name);
        });
        permissions.value = permissionsContainer;
      });
    }

    return { retrieveRoleData, id, name, permissions, role, goToEdit };
  },
};
</script>

<style lang="scss" scoped></style>
