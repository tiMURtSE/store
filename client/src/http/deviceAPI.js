import { $host, $authHost } from ".";

// типы
export const createType = async (type) => {
    const response = await $authHost.post('/api/type', type);
    
    return response.data;
};

export const fetchAllTypes = async () => {
    const response = await $host.get('/api/type');

    return response.data;
};

// бренды
export const createBrand = async (brand) => {
    const response = await $authHost.post('/api/brand', brand);

    return response.data;
};

export const fetchAllBrands = async () => {
    const response = await $host.get('/api/brand');

    return response.data;
};

// девайсы
export const createDevice = async (brand) => {
    const response = await $authHost.post('/api/device', brand);

    return response.data;
};

export const fetchOneDevice = async (id) => {
    const response = await $host.get('/api/device/' + id);
    
    return response.data;
};

export const fetchAllDevices = async (brandId, typeId, limit, page) => {
    const response = await $host.get('/api/device', {params: {
        brandId,
        typeId,
        limit,
        page
    }});

    return response.data;
};