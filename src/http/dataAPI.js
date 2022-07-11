import {$authHost} from "./index";

export const registration = async () => {
    const {data} = await $authHost.get('/api/v1/data');
    console.log(data, typeof data);
    return data;
}
