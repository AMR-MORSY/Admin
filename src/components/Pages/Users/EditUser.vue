<template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Edit User</h1>
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
            <form @submit.prevent="submitUserForm">
                <div class="row">
                    <div class="col-md-6">
                        <div class="input-group ">
                            <span class="input-group-text" id="pass">

                                Name

                            </span>
                            <input class="form-control " disabled v-model="userForm.name" type="text" />

                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="input-group ">
                            <span class="input-group-text" id="pass">

                                Email

                            </span>
                            <input class="form-control " disabled v-model="userForm.email" type="text" />

                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card  d-flex mt-3 justify-content-center">
                            <span>Available roles</span>
                            <MultiSelect v-model="userForm.selectedAvailableRoles" display="chip" :options="availableRoles"
                                filter optionValue="name" optionLabel="name" :maxSelectedLabels="1"
                                @change="onChangeselectedAvailableRoles($event)" />
                        </div>

                        <div v-if="selectedAvailableRolesMenue.length">
                            <div v-for="menue in selectedAvailableRolesMenue" :key="menue">
                                <p style="font-weight: 700; text-decoration: underline;">{{ menue.label }}</p>
                                <div class=" d-flex justify-content-evenly ">
                                    <Chip :label="men.name" v-for="men in menue.tags" :key="men"
                                        style="display: block; min-width: 80px; text-align: center;" />

                                </div>

                            </div>

                        </div>

                    </div>
                    <div class="col-md-6">
                        <div class="card  d-flex mt-3 justify-content-center">
                            <span>User given roles</span>
                            <MultiSelect v-model="userForm.selectedUserRoles" optionValue="name" optionLabel="name"
                                display="chip" :options="roles" filter :maxSelectedLabels="100"
                                @change="onChangeselectedUserRoles" />
                        </div>
                        <div v-if="selectedUserRolesMenue.length">
                            <div v-for="menue in selectedUserRolesMenue" :key="menue">
                                <p style="font-weight: 700; text-decoration: underline;">{{ menue.label }}</p>
                                <div class=" d-flex justify-content-evenly ">
                                    <Chip :label="men.name" v-for="men in menue.tags" :key="men"
                                        style="display: block; min-width: 80px; text-align: center;padding: 10px 10px;" />

                                </div>

                            </div>

                        </div>
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-danger mt-2" type="submit"> <font-awesome-icon
                                icon="fa-solid fa-pen-to-square" />Update</button>
                    </div>

                </div>
            </form>
        </div>
    </main>
</template>

<script>

import { onMounted, ref, reactive } from 'vue';
import Users from "../../../Api/Users";
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';


export default {
    name: "EditUser",

    props: {
        id: String
    },

    setup(props) {
        var userForm = reactive({
            id: "",
            email: "",
            name: "",
            selectedAvailableRoles: [],
            selectedUserRoles: [],
            roles:[]
        })

        var roles = ref([]);
        var availableRoles = ref([]);

        var selectedAvailableRolesMenue = ref([]);
        var selectedUserRolesMenue = ref([]);
        const router = useRouter();
        const toast=useToast();

        onMounted(() => {
            getUserData();
        })






        function getUserData() {

            Users.getUserData(props.id).then((response) => {
                console.log(response);
                userForm.email = response.data.user.user.email;
                userForm.name = response.data.user.user.name;
                userForm.id = response.data.user.user.id;
                roles.value = response.data.user.user_roles;
                availableRoles.value = response.data.user.roles_diff;


            })


        }
        function onChangeselectedAvailableRoles() {

            let data = {
                "roles": userForm.selectedAvailableRoles
            }
            selectedAvailableRolesMenue.value = [];

            Users.getRolesPermissionsByRoleName(data).then((response) => {
                console.log(response);




                for (var i = 0; i < userForm.selectedAvailableRoles.length; i++) {
                    let item = {
                        "label": userForm.selectedAvailableRoles[i],
                        "tags": response.data.permissions[i]
                    };
                    selectedAvailableRolesMenue.value.push(item);

                }
            })

        }
        function onChangeselectedUserRoles() {
            let data = {
                "roles": userForm.selectedUserRoles
            }
            selectedUserRolesMenue.value = [];

            Users.getRolesPermissionsByRoleName(data).then((response) => {
                console.log(response)





                for (var i = 0; i < userForm.selectedUserRoles.length; i++) {
                    let item = {
                        "label": userForm.selectedUserRoles,
                        "tags": response.data.permissions[i]
                    };
                    selectedUserRolesMenue.value.push(item);

                }
            })



        }
        function callServer(data) {
          
            Users.updateUserRoles(data).then((response)=>{
                toast.add({
                                severity: "Success",
                                summary: "Success Message",
                                detail:"Updated Successfully",
                                life: 3000,
                            });

                router.push({path:"/dashboard/users"});
            })

        }
        function submitUserForm() {
            userForm.roles=[];
          
            if (userForm.selectedAvailableRoles.length == 0 && userForm.selectedUserRoles == 0) {
                toast.add({
                                severity: "error",
                                summary: "Error Message",
                                detail: "Please choose at least one Role",
                                life: 3000,
                            });

            }
            else {
                if (userForm.selectedAvailableRoles.length > 0) {
                    userForm.selectedAvailableRoles.forEach((element) => {
                        userForm.roles.push(element);
                    })
                   
                    callServer(userForm);
                }
                if(userForm.selectedUserRoles.length > 0)
                {
                    userForm.selectedUserRoles.forEach((element) => {
                       userForm.roles.push(element);
                    })
                   
                    callServer(userForm);

                }
            }
            
        }







        return { callServer, submitUserForm, selectedAvailableRolesMenue, selectedUserRolesMenue, getUserData, onChangeselectedUserRoles, onChangeselectedAvailableRoles, availableRoles, roles, userForm }
    }
}
</script>

<style lang="scss" scoped></style>