import jwt_decode from 'jwt-decode';

export const setAndDecodeToken = (token) => {
    const user = jwt_decode(token);
    
    localStorage.setItem('token', token);

    return user;
};