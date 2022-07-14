import {$host} from "./index";

export const registration = async (username, password) => {
    const {data} = await $host.post('/api/v1/signup', {username, password});
    localStorage.setItem('token', data.token);
    return data;
}

export const login = async (username, password) => {
    const {data} = await $host.post('/api/v1/login',{username, password});
    localStorage.setItem('token', data.token);
    return data;
}