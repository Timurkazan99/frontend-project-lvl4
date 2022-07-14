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

export const SignupSchema = Yup.object({
    username: Yup.string()
        .min(3)
        .max(20)
        .required('Required'),
    password: Yup.string()
        .min(6)
        .required('Password is required'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});


