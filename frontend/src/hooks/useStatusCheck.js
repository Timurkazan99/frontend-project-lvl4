import { useRollbar } from '@rollbar/react';
import useToast from './useToast';

export default function useStatusCheck() {
  const { networkError } = useToast();
  const rollbar = useRollbar();

  return (response) => {
    if (response.status !== 'ok') {
      networkError();
      rollbar.error('Websocket Error', response.status);
    }
  };
}
