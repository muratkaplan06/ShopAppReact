import * as yup from 'yup'

const registerSchema = yup.object().shape({
  firstName: yup.string().required('please enter a name'),
  lastName: yup.string().required('required'),
  userName: yup
    .string('please enter a valid username address')
    .required('required')
    .matches(
      /[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]/,
      'must contain alphanumeric character,follow by a dot, hyphen, or underscore, negative lookahead to ensures dot, hyphen, and underscore does not appear consecutively',
    ),

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

export default registerSchema
