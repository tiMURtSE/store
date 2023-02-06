import { $authHost } from ".";

export const fetchUserBasket = async (userId) => {
    const { data } = await $authHost.post('api/basket/', {userId});
    return data;
}

export const addDeviceInBasket = async (basketId, deviceId) => {
    const { data } = await $authHost.post('api/basket_device/', {basketId, deviceId});
    return data;
}

export const removeDeviceFromBasket = async (deviceId, basketId) => {
    const { data } = await $authHost.delete('api/basket_device/', {params: {
        deviceId,
        basketId
    }});

    return data;
}

export const fetchDeviceInBasket = async (basketId, deviceId) => {
    const { data } = await $authHost.get('/api/basket_device/', {params: {
        basketId,
        deviceId
    }});

    return data;
};

export const fetchDevicesForBasket = async (deviceId) => {
    const { data } = await $authHost.post('/api/device/my_basket/', deviceId);
    return data;
};