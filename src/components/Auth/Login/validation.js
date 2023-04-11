import * as yup from 'yup'

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('please enter a valid email address')
    .required('required'),
  password: yup
    .string()
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[^\w]/, 'Password requires a symbol')
    .matches(/[0-9]/, 'Password requires a number')
    .min(8, 'Must a password have a minimum of 8 characters'),
})

export default LoginSchema
