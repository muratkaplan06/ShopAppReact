import React from 'react'
import LoginSchema from './validation'
import { fetchLogin } from '../../../Api'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  //MDBIcon,
  //MDBCheckbox,
} from 'mdb-react-ui-kit'
import { useFormik } from 'formik'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, actions, bag) => {
      console.log(values)

      try {
        const LoginResponse = await fetchLogin(values)
        login(LoginResponse)
        navigate('/Profile')
        console.log(LoginResponse)
      } catch (e) {
        bag.setErrors({ general: e.response.data.message })
      }
      await new Promise((r) => setTimeout(r, 1000))
      actions.resetForm()
    },
  })
  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: '1rem', maxWidth: '500px' }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <h2 className="fw-bold mb-2 text-center">Login</h2>
              <p className="text-white-50 mb-3">
                Please enter your login and password!
              </p>
              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Email address"
                  id="formControlLgEmail"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur('email')}
                  type="email"
                  size="lg"
                />
                {errors.email && touched.email && (
                  <p className="error-message">{errors.email}</p>
                )}
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Password"
                  id="formControlLgPassword"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  onBlur={handleBlur('password')}
                  type="password"
                  size="lg"
                />
                {errors.password && touched.password && (
                  <p className="error-message">{errors.password}</p>
                )}

                {/* <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                className="mb-4"
                label="Remember password"
              /> */}

                <MDBBtn size="lg" type="submit" disabled={isSubmitting}>
                  Login
                </MDBBtn>
              </form>
              <hr className="my-4" />

              {/* <MDBBtn
                className="mb-2 w-100"
                size="lg"
                style={{ backgroundColor: '#dd4b39' }}
              >
                <MDBIcon fab icon="google" className="mx-2" />
                Sign in with google
              </MDBBtn> */}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default Login
