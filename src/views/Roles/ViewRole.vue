<template>
  <h1 class="h2">View Role</h1>

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
   
  </div>
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
