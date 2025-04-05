<template>
     <!-- <div class="table-responsive-sm">
            <table class="table table-hover ">
            <thead>
                <th scope="col" style="text-align: 5px;">id</th>
                <th scope="col" style="padding-left: 5px;">Log Name</th>
                <th scope="col" style="padding-left: 5px;">Description</th>
                <th scope="col" style="padding-left: 5px;">Causer</th>
                <th scope="col" style="padding-left: 5px;">Action Time</th>
                <th scope="col" style="padding-left: 5px;"></th>
            </thead>
          
            <tbody class="table-group-divider">
                <tr v-for="row in data" :key="row.id" >
                    <th scope="row">{{ row.id }}</th>
                    <td>{{ row.log_name }}</td>
                    <td>{{ row.description }}</td>
                    <td>{{ row.causer_id }}</td>
                    <td>{{ row.created_at }}</td>
                    <td>
                        <span style="cursor: pointer;"  @click="goToview(row.id,row.log_name)">
                            <font-awesome-icon icon="fa-solid fa-eye" />View
                        </span>
                    </td>
                </tr>
               
            </tbody>

        </table>

        </div> -->
</template>

<script>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {

    name: "DataTable",
    props: {
        data: Array
    },
    setup(props) {
        const router = useRouter();
        function goToview(id,log_name) {
            if(log_name=="modifications")
            {
                router.push({ path: `/dashboard/modification/activity/${id}` });

            }
            else if(log_name=="XPIC"||log_name=="wan"||log_name=="IPS")
            {
                router.push({ path: `/dashboard/transmission/activity/${id}` });


            }
           
        }



        return {
            goToview


        };
    },

}
</script>

<style lang="scss" scoped></style>