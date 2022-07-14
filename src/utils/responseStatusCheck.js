export default function responseStatusCheck (response, alert) {
    if(response.status !== 'ok') {
        alert();
    }
}