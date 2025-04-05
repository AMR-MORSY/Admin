<template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Edit Role</h1>
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
            <form @submit.prevent="submitRollForm">
                <div class="row">
                    <div class="col-md-6">
                        <div class="input-group ">
                            <span class="input-group-text" id="pass">

                                id

                            </span>
                            <input class="form-control " disabled v-model="rolleForm.id" type="text" />

                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="input-group ">
                            <span class="input-group-text" id="pass">

                                Name

                            </span>
                            <input class="form-control " disabled v-model.trim="rolleForm.name" />

                        </div>

                    </div>
                    <div class="col-md-6">
                        <div class="card  d-flex mt-3 justify-content-center">
                            <MultiSelect v-model="rolleForm.selectedRollPermissions" optionValue="name" display="chip"
                                :options="permissions" optionLabel="name" filter
                                placeholder="Permissions assigned to the role" :maxSelectedLabels="100" />
                        </div>
                    </div>


                    <div class="col-md-6">
                        <div class="card  d-flex mt-3 justify-content-center">
                            <MultiSelect v-model="rolleForm.selectedDiffPermissions" display="chip" optionValue="name"
                                optionLabel="name" :options="permissionsDiff" filter placeholder="Other Permissions"
                                :maxSelectedLabels="100" />
                        </div>

                    </div>

                    <div class="col-md-6">
                        <button class="btn btn-danger mt-2" type="submit"> <font-awesome-icon
                                icon="fa-solid fa-pen-to-square" />Update</button>
                    </div>
                    <div class="col-md-6" v-if="serverErrors.length">
                        <div v-for="error in serverErrors" :key="error"
                            style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;">
                            {{ error }}</div>


                    </div>

                </div>
            </form>
        </div>
    </main>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import Users from "../../Api/Users";
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

export default {
    name: "EditRole",
    props: {
        id: String
    },
    setup(props) {


        var permissions = ref([]);
        var permissionsDiff = ref([]);
        var serverErrors = ref([])
        const toast = useToast();


        const rolleForm = reactive({
            id: "",
            name: "",
            selectedRollPermissions: [],
            selectedDiffPermissions: [],
            rolePermissions: []
        })




        const router = useRouter();

        onMounted(() => {
            retrieveRoleData()
        })

        function goToEdit() {
            router.push({ path: `/dashboard/editrole/${props.id}` })

        }

        function retrieveRoleData() {
            Users.getRoleDataWithAllPermissions(props.id).then((response) => {
                console.log(response)
                rolleForm.id = response.data.role.id;
                rolleForm.name = response.data.role.name;

                permissions.value = response.data.permissions;

                permissionsDiff.value = response.data.permDiff;

            })

        }
        function callServer(data) {
            console.log(data);
            User.updateRole(data).then((response) => {
                toast.add({
                    severity: "success",
                    summary: "Success Message",
                    detail: " Updated Successfully",
                    life: 3000,
                });
                router.push({ path: `/dashboard/viewrole/${props.id}` })
            }).catch((error) => {
                if (error.response.status == 422) {
                  
                    let errors = error.response.data.errors;
                    if (errors.name) {
                        errors.forEach(element => {
                            serverErrors.value.push(element);

                        });



                    }
                    if (errors.rolePermissions) {
                        errors.forEach(element => {
                            serverErrors.value.push(element);

                        });
                    }
                  




                }
            })

        }


        function submitRollForm() {
            rolleForm.rolePermissions = [];
            if (rolleForm.selectedDiffPermissions.length == 0 && rolleForm.selectedRollPermissions.length == 0) {
                toast.add({
                    severity: "error",
                    summary: "Error Message",
                    detail: "Please choose at least one Permission",
                    life: 3000,
                });

            }
            else {
                if (rolleForm.selectedDiffPermissions.length > 0) {
                    rolleForm.selectedDiffPermissions.forEach((element) => {
                        rolleForm.rolePermissions.push(element);
                    })

                    callServer(rolleForm);
                }
                if (rolleForm.selectedRollPermissions.length > 0) {
                    rolleForm.selectedRollPermissions.forEach((element) => {
                        rolleForm.rolePermissions.push(element);
                    })

                    callServer(rolleForm);

                }
            }



        }


        return { callServer,retrieveRoleData, serverErrors, rolleForm, permissions, permissionsDiff, goToEdit, submitRollForm }



    }
}
</script>

<style lang="scss" scoped></style>