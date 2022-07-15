export default function responseStatusCheck (response, toast) {
    if(response.status !== 'ok') {
        toast();
    }
}