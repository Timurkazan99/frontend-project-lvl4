import useToast from "./useToast";
import {useRollbar} from "@rollbar/react";

export default function useStatusCheck () {

    const {networkError} = useToast();
    const rollbar = useRollbar();

    return (response) => {
        if(response.status !== 'ok') {
            networkError();
            rollbar.error('Websocket Error', response.status);
        }
    }
}