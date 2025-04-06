import instances from "./Api";

export default{

     getUsers(page,per_page)
    {
        return instances.Api.get(`admin/users?page=${page}&per_page=${per_page}`);
    },
    getUserData(id)
    {
        return instances.Api.get(`admin/user/${id}`)
    },
    getUserDataWithRolesAndPermissions($id)
    {
        return instances.Api.get(`admin/userwithrollesandpermissions/${id}`)

    },
   
    getRolles()
    {
        return instances.Api.get("admin/roles");
    },
    getRoleData(id)
    {
        return instances.Api.get(`admin/role/${id}`)

    },
    getRoleDataWithAllPermissions(id)
    {
        return instances.Api.get(`admin/role/edit/${id}`)
    },
    getRolesPermissionsByRoleName(data)
    {
        return instances.Api.post('admin/roles/permissions',data)
    },
    updateRole(data)
    {
        return instances.Api.post("admin/role/update",data)
    },
    retrievePermissions()
    {
        return instances.Api.get("admin/permissions")

    },
    deletePermission(id)
    {
        return instances.Api.get(`admin/permissions/delete/${id}`)

    },
    createNewPermission(data)
    {
        return instances.Api.post("admin/permissions/create",data)

    },
    createNewRole(data)
    {
        return instances.Api.post("admin/role/create",data)

    },
    updateUserRoles(data)
    {
        return instances.Api.post("admin/user/role/update",data)
    },
    sendPublicNotification(data)
    {
        return instances.Api.post('admin/public/notification',data)
    }
   
}