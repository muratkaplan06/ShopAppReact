import React from 'react'
import './Styles.css'
import RegisterSchema from './validation'
import { fetchRegister } from '../../../Api'
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

function Register() {
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
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, actions, bag) => {
      console.log(values)

      try {
        const RegisterResponse = await fetchRegister(values)
        login(RegisterResponse)
        navigate('/profile')
        console.log(RegisterResponse)
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
              <h2 className="fw-bold mb-2 text-center">Register</h2>
              <p className="text-white-50 mb-3">
                Please enter your login and password!
              </p>
              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="FirstName"
                  id="formControlLgFirstName"
                  name="firstName"
                  onChange={handleChange}
                  value={values.firstName}
                  onBlur={handleBlur('firstName')}
                  type="text"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="LastName"
                  id="formControlLgLastName"
                  name="lastName"
                  onChange={handleChange}
                  value={values.lastName}
                  onBlur={handleBlur('lastName')}
                  type="text"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="UserName"
                  id="formControlLgLastUserName"
                  name="userName"
                  onChange={handleChange}
                  value={values.userName}
                  onBlur={handleBlur('userName')}
                  type="text"
                  size="lg"
                />
                {errors.userName && touched.userName && (
                  <p className="error-message">{errors.userName}</p>
                )}
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
                  Register
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

export default Register
