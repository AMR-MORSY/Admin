<!-- <template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Users</h1>
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
            <DataTable :value="users" v-model:filters="filters" filterDisplay="row" @rowSelect="goToview()" 
                v-model:selection="selectedUser" selectionMode="single" showGridlines class="p-datatable-sm">
                <Column field="id" header="id"> </Column>
                <Column field="name" header="Name"></Column>
                <Column field="email" header="Email" style="min-width: 12rem">
                    
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                            placeholder="Search by email" />
                    </template>
                </Column>
             
                <Column field="view" header="">
                    <template #body="slotProps">
                        <span >
                            <font-awesome-icon icon="fa-solid fa-eye" />View
                        </span>

                    </template>
                </Column>





            </DataTable>


        </div>


        <Pagination :data="laravelData" @pagination-change-page="retrieveUsers($event)" />

    </main>
</template> -->
<template>
  <Card class="w-full px-2">
    <template #header>
      <h1 class="text-2xl font-extrabold">Users</h1>
    </template>
    <template #content>
      <DataTable
        :value="users"
        v-model:filters="filters"
        filterDisplay="row"
        @rowSelect="goToview()"
        v-model:selection="selectedUser"
        selectionMode="single"
        showGridlines
        class="p-datatable-sm"
      >
        <Column field="id" header="id"> </Column>
        <Column field="name" header="Name"></Column>
        <Column field="email" header="Email" style="min-width: 12rem">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              placeholder="Search by email"
            />
          </template>
        </Column>

        <Column field="view" header="">
          <template #body="slotProps">
            <span> <font-awesome-icon icon="fa-solid fa-eye" />View </span>
          </template>
        </Column>
      </DataTable>

      <div class="w-full flex justify-center my-4 px-2">
      <Paginator
        :rows="perPage"
        :totalRecords="totalRecords"
        v-model:first="first"
        :rowsPerPageOptions="[5, 10, 20, 30]"
        @page="onPageChange"
      ></Paginator>
    </div>
    </template>
  </Card>
</template>

<script setup>
import { onMounted, ref } from "vue";
// import { FilterMatchMode } from 'primevue/api';

import Users from "../../Api/Users";
import { useRouter } from "vue-router";
import InputText from "primevue/inputtext";

// const laravelData = ref({});
const users = ref([]);
const selectedUser = ref();
const router = useRouter();


const totalRecords = ref(0);
const perPage = ref(5);
const first = ref(0);
const page = ref(1);
const currentPage = ref(1);


const onPageChange = (event) => {
 
  first.value = event.first;
  perPage.value = event.rows;
  page.value = Math.floor(event.first / event.rows) + 1;

  retrieveUsers();
  window.scrollTo({ top: 0, behavior: "smooth" });
};
onMounted(() => {
  retrieveUsers();
});

const filters = ref({
  email: { value: null },
});
let userId = ref();

const goToview = (e) => {
  userId = selectedUser.value.id;
  router.push({ path: `/viewuser/${userId}` });
  console.log(userId);
};

const retrieveUsers =  () => {
  Users.getUsers(page.value, perPage.value).then((response) => {
    console.log(response)
    totalRecords.value = response.data.users.total;
    currentPage.value = response.data.users.current_page;
    // laravelData.value = response.data.users;
    let usersRowData = response.data.users.data;
    usersRowData.forEach((element) => {
      element.edit = "";
      element.view = "";
    });
    users.value = usersRowData;
  });
};

</script>

<style lang="scss" scoped></style>
