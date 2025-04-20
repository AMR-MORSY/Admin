<template>
  <h1 class="h2">Permissions</h1>

  <div>
    <div class="flex w-75 mx-auto justify-evenly items-center">
      <Button
        class="mt-6 block"
        @click="deletePermission"
        severity="danger"
        label="Delete"
      />
      <Button
        class="mt-6 block"
        @click="createPermission"
        severity="info"
        label="Create"
      />
    
    </div>

    <div class=" w-full my-10">
      <DataTable
      :value="permissions"
      paginator
      :rows="5"
      v-model:filters="filters"
      filterDisplay="row"
      stripedRows
      @rowSelect="selectPermission()"
      v-model:selection="selectedPermission"
      selectionMode="single"
      tableStyle="max-width:vw"
      showGridlines
    >
      <Column field="id" header="id"> </Column>
      <Column field="name" header="Name">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by name"
          />
        </template>
      </Column>
    </DataTable>
    </div>
   
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Users from "../../Api/Users";
import { useRouter } from "vue-router";
//  import { FilterMatchMode } from 'primevue/api';
import { FilterMatchMode } from "@primevue/core/api";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const permissions = ref([]);
const permissionId = ref();
const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});
const selectedPermission = ref();
const confirm = useConfirm();
const toast = useToast();

const router = useRouter();

onMounted(() => {
  getPermissions();
});

const getPermissions = () => {
  Users.retrievePermissions().then((response) => {
    console.log(response);
    permissions.value = response.data.permissions;
  });
};

const createPermission = () => {
  router.push({ path: "/createpermission" });
};

const selectPermission = () => {
  permissionId.value = selectedPermission.value.id;
};
const deletePermission = () => {
  confirm.require({
    header: "Are you sure?",
    message: "Please confirm to proceed.",
    position: "center",
    accept: () => {
      // confirm.close();
      Users.deletePermission(permissionId.value)
        .then((response) => {
          console.log(response);

          toast.add({
            severity: "success",
            summary: "Success Message",
            detail: " Deleted Successfully",
            life: 3000,
          });

          router.push({ path: "/dashboard/permissions" });
        })
        .catch((error) => {
          console.log(error);
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
              });
            }
          }
        });
    },
    reject: () => {
      // confirm.close();
    },
  });
};

// export default {
//   name: "Persmissions",
//   setup() {
//     let permissions = ref([]);
//     let permissionId = ref();
//     const filters = ref({

//       name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

//     });
//     const selectedPermission = ref();
//     const confirm = useConfirm();
//     const toast = useToast();

//     const router = useRouter();

//     onMounted(() => {
//       getPermissions()
//     })
//     function createPermission()
//     {
//       router.push(({path:"/dashboard/createpermission"}))
//     }

//     function selectPermission() {
//       permissionId.value = selectedPermission.value.id;

//     }
//     function deletePermission() {
//       confirm.require({

//         header: 'Are you sure?',
//         message: 'Please confirm to proceed.',
//         position: "center",
//         accept: () => {
//           // confirm.close();
//           Users.deletePermission(permissionId.value).then((response) => {
//             console.log(response)

//             toast.add({
//               severity: "success",
//               summary: "Success Message",
//               detail: " Deleted Successfully",
//               life: 3000,
//             });

//             router.push({ path: "/dashboard/permissions" });

//           }).catch((error) => {
//             console.log(error)
//             if (error.response.status == 422) {
//               if (error.response.data.errors.id) {
//                 let serverError = error.response.data.errors.id;
//                 serverError.forEach((element) => {
//                   toast.add({
//                     severity: "error",
//                     summary: "Error Message",
//                     detail: element,
//                     life: 3000,
//                   });

//                 })
//               }
//             }
//           })
//         },
//         reject: () => {
//           // confirm.close();

//         }
//       });
//     }

//     function getPermissions() {
//       Users.retrievePermissions().then((response) => {
//         console.log(response)
//         permissions.value = response.data.permissions;

//       })

//     }

//     return { permissions, deletePermission, selectedPermission, filters, permissionId, selectPermission,createPermission }
//   }
// }
</script>

<style lang="scss" scoped></style>
