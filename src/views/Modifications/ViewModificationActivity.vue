<template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">View Modification Activity</h1>
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

        <div class="d-flex justify-content-between align-items-center" style="width: 90%; margin: auto;">
            <div class="new-data">
                <p style="text-align: center;font-weight: bolder; font-size: larger; text-decoration: underline;">New Data</p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">id:<span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ attributes.id }}</span> </p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Site Code: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ attributes.site_code  }}</span></p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Site Name: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ attributes.site_name }}</span></p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Subcontractor: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ attributes.subcontractor}}</span></p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Project: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ attributes.requester }}</span></p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Requester: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ attributes.request_date }}</span></p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Request Date: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ attributes.project }}</span></p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Finish Date: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ attributes.finish_date }}</span></p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Action: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ attributes.action }}</span></p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Materials: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ attributes.materials }}</span></p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Status: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ attributes.status }}</span></p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Cost: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ attributes.cost }}</span></p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Activity Date: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ attributes.created_at }}</span></p>
            </div>
            <div class="old-data" v-if="oldData">
                <p style="text-align: center;font-weight: bolder; font-size: larger; text-decoration: underline;">Old Data</p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">id:<span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ oldData.id }}</span> </p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Site Code: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ oldData.site_code  }}</span></p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Site Name: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ oldData.site_name }}</span></p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Subcontractor: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ oldData.subcontractor}}</span></p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Project: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ oldData.requester }}</span></p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Requester: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ oldData.request_date }}</span></p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Request Date: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ oldData.project }}</span></p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Finish Date: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ oldData.finish_date }}</span></p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Action: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ oldData.action }}</span></p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Materials: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ oldData.materials }}</span></p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Status: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ oldData.status }}</span></p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Cost: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ oldData.cost }}</span></p>
                <p style="text-decoration: underline; font-size: large; font-weight: 700;">Activity Date: <span style="font-size: medium; font-weight: 200; text-decoration: none;">{{ oldData.created_at }}</span></p>
            </div>
        </div>



       


    </main>
</template>

<script>
import { onMounted, ref, reactive } from 'vue';
import Users from "../../Api/Users";
import { useRouter } from 'vue-router';
import Activities from '../../Api/Activities';
export default {
    name: "ViewModificationActivity",
    props: {
        id: String
    },
    setup(props) {

        var data = ref([]);
        var attributes = ref([])
        var oldData = ref([]);

        onMounted(() => {
            retrieveModificationActivityData()

        })



        function retrieveModificationActivityData() {
            Activities.retrieveModificationActivityData(props.id).then((response) => {
                data.value = response.data.activity;
                attributes.value = response.data.activity.properties.attributes

                if (response.data.activity.properties.old) {
                    oldData.value = response.data.activity.properties.old
                   
                }



            })

        }


        return { retrieveModificationActivityData, data, attributes, oldData }
    }
}
</script>

<style lang="scss" scoped></style>