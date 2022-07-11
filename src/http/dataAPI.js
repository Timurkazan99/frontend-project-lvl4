import {$authHost} from "./index";

export const fetchData = async () => {
    const {data} = await $authHost.get('/api/v1/data');
    console.log(data, typeof data);
    return data;
}
