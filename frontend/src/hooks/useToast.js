import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";

export default function useToast () {
    const { t } = useTranslation('translation', { keyPrefix: 'toastText' });

    const createChannel = (name) => toast.info(`${t('sentencesStart')} ${name} ${t('sentencesAddingEnd')}`);
    const renamingChannel = (name) => toast.info(`${t('sentencesStart')} ${t('sentencesRenamingEnd')} ${name}`);
    const removeChannel = () => toast.info(`${t('sentencesStart')} ${t('sentencesRemovingEnd')}`);
    const networkError = () => toast.error(t('errorNetwork'));

    return { createChannel, renamingChannel, removeChannel, networkError};
}