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
                            <input class="form-control " v-model="rolleForm.id" disabled type="text" />

                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="input-group ">
                            <span class="input-group-text" id="pass">

                                Name

                            </span>
                            <input class="form-control " v-model.trim="rolleForm.name"
                                :class="{ 'is-invalid': v$.name.$errors.length }" type="text" />

                        </div>
                        <div v-if="v$.name.$errors">
                            <div style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
                                v-for="error in v$.name.$errors">
                                {{ error.$message }}</div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card  d-flex mt-3 justify-content-center">
                            <MultiSelect v-model="rolleForm.selectedRollPermissions" optionValue="name" display="chip"
                                :options="permissions" optionLabel="name" filter
                                placeholder="Permissions assigned to the role" :maxSelectedLabels="100"
                                :class="{ 'p-invalid': v$.selectedRollPermissions.$errors.length }" />
                        </div>
                    </div>
                    <div v-if="v$.selectedRollPermissions.$errors">
                        <div style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
                            v-for="error in v$.selectedRollPermissions.$errors">
                            {{ error.$message }}</div>
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
                    <div class="col-md-6" v-if="serverErrors">
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
import User from "../../../Api/Users";
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, maxLength, minLength } from '@vuelidate/validators'
export default {
    name: "EditRole",
    props: {
        id: String
    },
    setup(props) {


        var permissions = ref([]);
        var permissionsDiff = ref([]);
        var serverErrors = ref(null)

        const nameReg = helpers.regex(/^[a-zA-Z]{3,}[a-zA-Z_-]*$/);

        const rolleForm = reactive({
            id: "",
            name: "",
            selectedRollPermissions: "",
            selectedDiffPermissions: ""
        })

        const rules = {
            name: {
                required: helpers.withMessage('Rolle name required', required),
                nameReg: helpers.withMessage('char. may include(_-)', nameReg),
                maxLength: helpers.withMessage('30 char. max', maxLength(30)),
                minLength: helpers.withMessage('at least 3 char', minLength(3))

            },
            selectedRollPermissions: { required: helpers.withMessage('at least one permission', required) }, // Matches state.lastName


        }

        const v$ = useVuelidate(rules, rolleForm);

        const router = useRouter();

        onMounted(() => {
            retrieveRoleData()
        })

        function goToEdit() {
            router.push({ path: `/dashboard/editrole/${props.id}` })

        }

        function retrieveRoleData() {
            User.getRoleDataWithAllPermissions(props.id).then((response) => {
                console.log(response)
                rolleForm.id = response.data.role.id;
                rolleForm.name = response.data.role.name;

                permissions.value = response.data.permissions;

                permissionsDiff.value = response.data.permDiff;

            })

        }

        async function submitRollForm() {
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) return
            console.log(rolleForm);
            User.updateRole(rolleForm).then((response) => {
                console.log(response)
                router.push({ path: `/dashboard/viewrole/${props.id}` })
            }).catch((error) => {
                if (error.response.status == 422) {
                    serverErrors.value = [];
                    let errors = error.response.data.errors;
                    if (errors.name) {
                        errors.forEach(element => {
                            serverErrors.value.push(element);

                        });



                    }
                    if (errors.selectedRollPermissions) {
                        errors.forEach(element => {
                            serverErrors.value.push(element);

                        });
                    }
                    if (errors.selectedDiffPermissions) {
                        errors.forEach(element => {
                            serverErrors.value.push(element);

                        });
                    }




                }
            })

        }


        return { retrieveRoleData, serverErrors, v$, rolleForm, permissions, permissionsDiff, goToEdit, submitRollForm }



    }
}
</script>

<style lang="scss" scoped></style>