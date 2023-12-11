import instances from "./Api";

export default{

    getAllModificationsActivities()
    {
        return instances.Api.get("activities/modifications")
    },
    retrieveModificationActivityData(id)
    {
        return instances.Api.get(`activities/modifications/${id}`)

    },
    getAllWANActivities()
    {
        return instances.Api.get("activities/wans")
    },
    getAllXPICActivities()
    {
        return instances.Api.get("activities/XPICS")
    },
    getAllIPActivities()
    {
        return instances.Api.get("activities/IPS")
    },
    retrieveTransmissionActivityData(id)
    {
        return instances.Api.get(`activities/Transmissions/${id}`)

    },

}