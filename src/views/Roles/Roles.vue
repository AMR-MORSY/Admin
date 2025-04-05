<template>
  <h1 class="h2">Edit User</h1>
  <div class="w-full bg-white mt-4 p-9">
    <DataTable
      :value="roles"
      v-model:filters="filters"
      filterDisplay="row"
      @rowSelect="goToview()"
      v-model:selection="selectedRole"
      selectionMode="single"
      showGridlines
      class="p-datatable-sm"
    >
      <Column field="id" header="id"> </Column>
      <Column field="name" header="Name">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by name"
          />
        </template>
      </Column>

      <Column field="view" header="">
        <template #body="slotProps">
          <span> <font-awesome-icon icon="fa-solid fa-eye" />View </span>
        </template>
      </Column>
    </DataTable>
  </div>

  <button class="btn btn-danger mt-5" @click="goToCreate">Create New</button>
</template>

<script>
import { onMounted, ref } from "vue";
import Users from "../../Api/Users";
import { useRouter } from "vue-router";
// import { FilterMatchMode } from 'primevue/api';

export default {
  name: "Roles",
  setup() {
    let roles = ref([]);
    const filters = ref({
      name: { value: null },
    });
    const selectedRole = ref();
    let roleId = ref();
    const router = useRouter();

    onMounted(() => {
      getRolles();
    });

    function getRolles() {
      Users.getRolles().then((response) => {
        console.log(response);
        roles.value = response.data.roles;
      });
    }
    function goToview() {
      roleId = selectedRole.value.id;
      router.push({ path: `/viewrole/${roleId}` });
    }

    function goToCreate() {
      router.push({ path: `/createrole` });
    }

    return {
      getRolles,
      roles,
      filters,
      selectedRole,
      roleId,
      goToview,
      goToCreate,
    };
  },
};
</script>

<style lang="scss" scoped></style>
