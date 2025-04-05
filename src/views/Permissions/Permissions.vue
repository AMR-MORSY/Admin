<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Permissions</h1>
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

    <div>
      <div class="d-flex w-75 m-auto justify-content-between align-items-center" >
        <button class="btn btn-danger  my-5" @click="deletePermission">Delete</button>
        <button class="btn btn-danger  my-5" @click="createPermission">Create</button>

      </div>
   

      <DataTable :value="permissions" paginator :rows="5" v-model:filters="filters" filterDisplay="row" stripedRows
        @rowSelect="selectPermission()" v-model:selection="selectedPermission" selectionMode="single"
        tableStyle="max-width: 50rem" showGridlines>
        <Column field="id" header="id"> </Column>
        <Column field="name" header="Name">
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by name" />
          </template>
        </Column>

      </DataTable>


    </div>



  </main>
</template>

<script>
import { onMounted, ref } from "vue";
import Users from "../../Api/Users";
import { useRouter } from "vue-router";
// import { FilterMatchMode } from 'primevue/api';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
    
export default {
  name: "Persmissions",
  setup() {
    let permissions = ref([]);
    let permissionId = ref();
    const filters = ref({

      name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

    });
    const selectedPermission = ref();
    const confirm = useConfirm();
    const toast = useToast();


    const router = useRouter();

    onMounted(() => {
      getPermissions()
    })
    function createPermission()
    {
      router.push(({path:"/dashboard/createpermission"}))
    }

    function selectPermission() {
      permissionId.value = selectedPermission.value.id;

    }
    function deletePermission() {
      confirm.require({

        header: 'Are you sure?',
        message: 'Please confirm to proceed.',
        position: "center",
        accept: () => {
          // confirm.close();
          Users.deletePermission(permissionId.value).then((response) => {
            console.log(response)

            toast.add({
              severity: "success",
              summary: "Success Message",
              detail: " Deleted Successfully",
              life: 3000,
            });

            router.push({ path: "/dashboard/permissions" });

          }).catch((error) => {
            console.log(error)
            if (error.response.status == 422) {
              if (error.response.data.errors.id) {
                let serverError = error.response.data.errors.id;
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
        },
        reject: () => {
          // confirm.close();

        }
      });
    }

    function getPermissions() {
      Users.retrievePermissions().then((response) => {
        console.log(response)
        permissions.value = response.data.permissions;


      })


    }


    return { permissions, deletePermission, selectedPermission, filters, permissionId, selectPermission,createPermission }
  }
}
</script>

<style lang="scss" scoped></style>