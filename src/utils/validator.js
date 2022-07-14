import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required')
});

export const ChannelSchema = (channels) => {
    return Yup.object().shape({
        channelName: Yup.string().notOneOf(channels, 'Название должно быть уникальным').required('Required'),
    })
};