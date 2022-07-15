import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import filter from 'leo-profanity';
import App from './App';
import resources from "./locales";

const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    payload: {
        environment: 'production',
    },
    captureUncaught: true,
    captureUnhandledRejections: true,
};

const Init = async () => {
    const i18n = i18next.createInstance();
    await i18n
        .use(initReactI18next)
        .init({
            fallbackLng: 'ru',
            lng: 'ru',
            resources,
            debug: true,
            react: {
                useSuspense: false,
            }
        });

    console.log('token', process.env.REACT_APP_ROLLBAR_TOKEN);
    filter.clearList();
    filter.add(filter.getDictionary('ru'));
    filter.add(filter.getDictionary('en'));
    return (
        <RollbarProvider config={rollbarConfig}>
            <ErrorBoundary>
                <I18nextProvider i18n={i18n}>
                    <App />
                </I18nextProvider>
            </ErrorBoundary>
        </RollbarProvider>
    );
};

export default Init;