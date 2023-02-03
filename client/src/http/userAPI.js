import { $host, $authHost } from './index.js';

// функции для авторизации, регистрации и проверки токена на валидность
export const registration = async (email, password) => {
    const response = await $host.post('api/user/registration', {email, password, role: 'ADMIN'});
    
    return response.data;
}

export const login = async (email, password) => {
    const response = await $host.post('api/user/login', {email, password});
    
    return response.data;
}

export const getUserData = async () => {
    const response = await $authHost.get('/api/user/auth');

    return response.data;
}