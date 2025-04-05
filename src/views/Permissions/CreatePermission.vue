<template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Create Role</h1>
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
            <form @submit.prevent="submitPermissionForm">
                <div class="row">

                    <div class="col-md-6">
                        <div class="input-group ">
                            <span class="input-group-text" id="pass">

                                Name

                            </span>
                            <input class="form-control " v-model.trim="permissionForm.name"
                                :class="{ 'is-invalid': v$.name.$errors.length }" type="text" />

                        </div>
                        <div v-if="v$.name.$errors">
                            <div style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
                                v-for="error in v$.name.$errors">
                                {{ error.$message }}</div>
                        </div>
                    </div>


                    <div class="col-md-6">
                        <button class="btn btn-danger mt-2" type="submit"> <font-awesome-icon
                                icon="fa-solid fa-pen-to-square" />Save</button>
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
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, maxLength, minLength } from '@vuelidate/validators';
import { useToast } from 'primevue/usetoast';

export default {
    name: "CreatePermission",
    setup() {
        const toast = useToast();


        const nameReg = helpers.regex(/^[a-zA-Z]{3,}[a-zA-Z_-]*$/);

        const permissionForm = reactive({

            name: "",


        })

        const rules = {
            name: {
                required: helpers.withMessage('permission name required', required),
                nameReg: helpers.withMessage('char. may include(_-)', nameReg),
                maxLength: helpers.withMessage('30 char. max', maxLength(30)),
                minLength: helpers.withMessage('at least 3 char', minLength(3))

            },


        }

        async function submitPermissionForm() {
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) return
            Users.createNewPermission(permissionForm).then((response) => {

                toast.add({
                    severity: "success",
                    summary: "Success Message",
                    detail: " Created Successfully",
                    life: 2000,
                });

                router.push({ path: "/dashboard/permissions" })


            }).catch((error) => {
                console.log(error)
                if (error.response.status == 422) {
                    if (error.response.data.errors.name) {
                        let serverError = error.response.data.errors.name;
                        serverError.forEach((element) => {
                            toast.add({
                                severity: "error",
                                summary: "Error Message",
                                detail: element,
                                life: 3000,
                            });

                        })
                    }
                }
            })

        }

        const v$ = useVuelidate(rules, permissionForm);

        const router = useRouter();

        return {
            v$, permissionForm, submitPermissionForm

        }



    }
}
</script>

<style lang="scss" scoped></style>