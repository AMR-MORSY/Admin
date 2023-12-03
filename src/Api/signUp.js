import instances from "./Api";

export default{

     adminSignUp(data)
    {
        return instances.Api.post("admin/signUp",data);

    },
    userAbilities()
    {
        return instances.Api.get("admin/abilities");


    },
    userLogout()
    {
        return instances.Api.post("admin/logout");

    }


}