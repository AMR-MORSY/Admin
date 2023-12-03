<template>
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
</template>

<script>
import { onMounted, ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';

import Users from "../../../Api/Users";
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';

export default {
    name: "Users",
    setup() {
        onMounted(() => {
            retrieveUsers();
        });
        const laravelData = ref({});
        const users = ref([]);
        const selectedUser = ref();
        const filters = ref({
            
            email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
           
        });
        let userId = ref();
        const router = useRouter();
        const goToview = (e) => {
            userId = selectedUser.value.id;
            router.push({path:`/dashboard/viewuser/${userId}`})
            console.log(userId)
        };
       
        const retrieveUsers = async (page) => {
            Users.getUsers(page).then((response) => {
                laravelData.value = response.data.users;
                let usersRowData = response.data.users.data;
                usersRowData.forEach((element) => {
                    element.edit = "";
                    element.view = "";
                });
                users.value = usersRowData;
            });
        };
        return {
            retrieveUsers, users, laravelData, goToview, selectedUser, userId, filters
        };
    },
    components: { InputText }
}
</script>

<style lang="scss" scoped></style>