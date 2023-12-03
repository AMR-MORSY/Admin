<template>
     <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">View Role</h1>
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

        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group ">
                        <span class="input-group-text" id="pass">

                           id

                        </span>
                        <input class="form-control " v-model="id" type="text" />

                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group ">
                        <span class="input-group-text" id="pass">

                            Name

                        </span>
                        <input class="form-control " v-model="name" type="text" />

                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card  d-flex mt-3 justify-content-center">
                        <MultiSelect    display="chip" :options="permissions" filter
                            placeholder="Permissions" :maxSelectedLabels="100"  />
                    </div>
                </div>
               
                <div class="col-md-6">
                    <button class="btn btn-danger mt-2" @click="goToEdit"> <font-awesome-icon icon="fa-solid fa-pen-to-square" />Edit</button>
                </div>

            </div>
        </div>
    </main>
   
</template>

<script>
import { onMounted, ref } from 'vue';
import User from "../../../Api/Users";
import { useRouter } from 'vue-router';
export default {
    name:"ViewRole",
    props:{
        id:String
    },
    setup (props) {
        var id = ref()
        var name = ref();
        var permissions = ref([]);
        var role = ref();
      
        const router=useRouter();

        onMounted(()=>{
            retrieveRoleData()
        })

        function goToEdit()
        {
            router.push({path:`/dashboard/editrole/${props.id}`})

        }

        function retrieveRoleData()
        {
            User.getRoleData(props.id).then((response)=>{
                console.log(response)
                id.value=response.data.role.id;
                name.value=response.data.role.name;
                let permissionsContainer=[];
                let perm=response.data.permissions;
                perm.forEach(element => {
                    permissionsContainer.push(element.name);
                    
                });
                permissions.value=permissionsContainer;
            })

        }
        

        return {retrieveRoleData,id,name,permissions,role,goToEdit}
    }
}
</script>

<style lang="scss" scoped>

</style>