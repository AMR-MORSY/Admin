<template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">IP_traffic Activities</h1>
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
        <DataTable :data="data" v-if="data.length"></DataTable>
     
       

       
    </main>
</template>

<script>
import { onMounted, ref } from 'vue';



import Activities from '../../Api/Activities';
import DataTable from '../../components/Helpers/Activities/DataTable.vue';
import { useToast } from 'primevue/usetoast';



export default {
    name: "IP_trafic",
    setup() {
        onMounted(() => {
            getAllActivities();
        });
        var data = ref([]);
        const toast=useToast();
     
        function getAllActivities() {
            Activities.getAllIPActivities().then((response) => {
                if (response.data.message == true) {
                    data.value = response.data.activities;

                }
                else {
                    toast.add({
                        severity: "error",
                        summary: "Error Message",
                        detail: "No Activities",
                        life: 3000,
                    });


                }
            });
        }
    
     
        return {
            getAllActivities, data
        };
    },
    components: { DataTable }
}
</script>

<style lang="scss" scoped></style>