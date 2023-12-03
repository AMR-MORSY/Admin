<template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">View User</h1>
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

                            Name

                        </span>
                        <input class="form-control " disabled v-model="name" type="text" />

                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group ">
                        <span class="input-group-text" id="pass">

                            Email

                        </span>
                        <input class="form-control " disabled v-model="email" type="text" />

                    </div>
                </div>

                <div class="col-md-6">
                    <div class="card  d-flex mt-3 justify-content-center">
                        <MultiSelect v-model="selectedRoles" optionValue="name" optionLabel="name" display="chip"
                            :options="roles" filter placeholder="Roles" :maxSelectedLabels="100"
                            @change="onChangeselectedUserRoles" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mt-2" v-if="selectedUserRolesMenue.length">
                        <div v-for="menue in selectedUserRolesMenue" :key="menue">
                            <p style="font-weight: 700; text-decoration: underline;">{{ menue.label }}</p>
                            <div class="d-flex justify-content-evenly">
                                <Chip :label="men.name" v-for="men in menue.tags" :key="men"
                                    style="display: block; min-width: 80px; text-align: center;padding: 10px 10px;" />

                            </div>

                        </div>

                    </div>
                </div>
                <div class="col-md-6">
                    <button class="btn btn-danger mt-2" @click="goToEdit"> <font-awesome-icon
                            icon="fa-solid fa-pen-to-square" />Edit</button>
                </div>

            </div>
        </div>
    </main>
</template>

<script>
import { onMounted, ref } from 'vue';
import User from "../../../Api/Users";
import { useRouter } from 'vue-router';
import Users from "../../../Api/Users";


export default {
    name: "ViewUser",
    props: {
        id: String
    },
    setup(props) {
        var name = ref()
        var email = ref();
        var permissions = ref([]);
        var roles = ref([]);
        var selectedPermissions = ref([]);
        var selectedRoles = ref([]);
        var selectedUserRolesMenue = ref([])
        const router = useRouter();

        onMounted(() => {
            getUserData();
        })

        function getUserData() {

            Users.getUserData(props.id).then((response) => {
                console.log(response);
                email.value = response.data.user.user.email;
                name.value = response.data.user.user.name;
                permissions.value = response.data.user.permissions;
                // selectedPermissions.value=permissions.value
                roles.value = response.data.user.user_roles;
                // selectedRoles.value=roles.value

            })


        }
        function onChangeselectedUserRoles() {
            let data = {
                "roles": selectedRoles.value
            }
            selectedUserRolesMenue.value = [];

            Users.getRolesPermissionsByRoleName(data).then((response) => {
                console.log(response);




                for (var i = 0; i < selectedRoles.value.length; i++) {
                    let item = {
                        "label": selectedRoles.value[i],
                        "tags": response.data.permissions[i]
                    };
                    selectedUserRolesMenue.value.push(item);

                }
            })

        }
        const goToEdit = () => {
            router.push({ path: `/dashboard/edituser/${props.id}` })

        }


        return { selectedUserRolesMenue, onChangeselectedUserRoles, getUserData, name, email, permissions, roles, selectedPermissions, selectedRoles, goToEdit }
    }
}
</script>

<style lang="scss" scoped></style>