<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Roles</h1>
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

    <div class="card">
      <DataTable :value="roles" v-model:filters="filters" filterDisplay="row" @rowSelect="goToview()"
        v-model:selection="selectedRole" selectionMode="single" showGridlines class="p-datatable-sm">
        <Column field="id" header="id"> </Column>
        <Column field="name" header="Name">


          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by name" />
          </template>
        </Column>

        <Column field="view" header="">
          <template #body="slotProps">
            <span>
              <font-awesome-icon icon="fa-solid fa-eye" />View
            </span>

          </template>
        </Column>





      </DataTable>

      
    </div>



    <button class="btn btn-danger mt-5" @click="goToCreate">Create New</button>
  </main>
  
</template>

<script>
import { onMounted, ref } from "vue";
import Users from "../../../Api/Users";
import { useRouter } from "vue-router";
import { FilterMatchMode } from 'primevue/api';

export default {
  name: "Roles",
  setup() {
    let roles = ref([]);
    const filters = ref({

      name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

    });
    const selectedRole = ref();
    let roleId = ref();
    const router = useRouter();

    onMounted(() => {
      getRolles()
    })

    function getRolles() {
      Users.getRolles().then((response) => {
        console.log(response)
        roles.value = response.data.roles;


      })


    }
    function goToview() {
      roleId = selectedRole.value.id;
      router.push({ path: `/dashboard/viewrole/${roleId}` })


    }

    function goToCreate() {

      router.push({ path: `/dashboard/createrole` })


    }


    return { getRolles, roles, filters, selectedRole, roleId, goToview, goToCreate }
  }
}
</script>

<style lang="scss" scoped></style>