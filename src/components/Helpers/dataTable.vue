<template>
    <div class="card">
        <DataTable :value="data" tableStyle="min-width: 50rem">


            <template v-for="column in columns" :key="column.field">
                <Column :field="column.field" :header="column.header">
                    <template #body="slotProps">
                <font-awesome-icon icon="fa-solid fa-user-secret" />
                {{ slotProps.data. }}
               </template>
                  
                </Column>


            </template>
            <!-- <Column field="email" header="Email">
                <template #body="slotProps">
                    <font-awesome-icon icon="fa-solid fa-user-secret" />
                    {{ slotProps.data.email }}
                </template>

            </Column> -->


        </DataTable>


    </div>
</template>

<script>

import { ref } from 'vue';
export default {

    name: "dataTable",
    props: {
        data: Array, columns: Array
    },
    setup() {



        return {


        };
    },

}
</script>

<style lang="scss" scoped></style>