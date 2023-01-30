import { $host, $authHost } from ".";

// типы
export const createType = async (type) => {
    const { data } = await $authHost.post('/api/type', type);
    return data;
};

export const fetchTypes = async () => {
    const { data } = await $host.get('/api/type');
    return data;
};

// бренды
export const createBrand = async (brand) => {
    const { data } = await $authHost.post('/api/brand', brand);
    return data;
};

export const fetchBrands = async () => {
    const { data } = await $host.get('/api/brand');
    return data;
};

// девайсы
export const createDevice = async (brand) => {
    const { data } = await $authHost.post('/api/device', brand);
    return data;
};

export const fetchDevices = async (brandId, typeId, limit, page) => {
    const { data } = await $host.get('/api/device', {params: {
        brandId,
        typeId,
        limit,
        page
    }});
    return data;
};

export const fetchOneDevice = async (id) => {
    const { data } = await $host.get('/api/device/' + id);
    return data;
};
