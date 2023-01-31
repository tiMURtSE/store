import { $authHost } from ".";

export const fetchUserBasket = async (userId) => {
    const { data } = await $authHost.post('api/basket/', {userId});
    return data;
}

export const addDeviceInBasket = async (basketId, deviceId) => {
    const { data } = await $authHost.post('api/basket_device/', {basketId, deviceId});
    return data;
}