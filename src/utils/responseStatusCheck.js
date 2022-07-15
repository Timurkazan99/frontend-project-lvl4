export default function responseStatusCheck (response) {
    if(response.status !== 'ok') {
        console.log(response.status);
    }
}