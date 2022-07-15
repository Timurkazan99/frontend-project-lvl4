import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    username: Yup.string().required('required'),
    password: Yup.string().required('required')
});

export const ChannelSchema = (channels) => {
    return Yup.object().shape({
        channelName: Yup.string().notOneOf(channels, 'alreadyExist').required('required'),
    })
};

export const SignupSchema = Yup.object({
    username: Yup.string()
        .min(3, 'lengthUsername')
        .max(20, 'lengthUsername')
        .required('required'),
    password: Yup.string()
        .min(6, 'minPassword')
        .required('required'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'samePassword')
        .required('required')
});


