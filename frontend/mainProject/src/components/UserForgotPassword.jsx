import React from 'react';
import { Link } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import ForgotPassword from '../assets/forgotpassword.jpg'

function UserForgotPassword() {
  return (
    <MDBContainer className='my-5'>
      <MDBCard>

        <MDBRow className='g-0 d-flex align-items-center'>

          <MDBCol md='4'>
            <MDBCardImage src={ForgotPassword} alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
          </MDBCol>

          <MDBCol md='8'>

            <MDBCardBody>

              <MDBCol col='6'>
                  <label htmlFor='password' className='form-label mb-1'>Enter your Email ID</label>
                  <MDBInput id='email' type='email' wrapperClass='mb-4' />
              </MDBCol>
              <MDBCol col='6'>
                  <label htmlFor='password' className='form-label mb-1'>Enter your previus Password</label>
                  <MDBInput id='form22' type='password' wrapperClass='mb-4' />
              </MDBCol>
              <MDBCol col='6'>
                  <label htmlFor='password' className='form-label mb-1'>Enter your new Password</label>
                  <MDBInput id='form2' type='password' wrapperClass='mb-4' />
              </MDBCol>
              <MDBCol col='6'>
                  <label htmlFor='password' className='form-label mb-1'>Re-Enter your new Password</label>
                  <MDBInput id='form21' type='password' wrapperClass='mb-4' />
                </MDBCol>

                <Link to="/user-login">
                <MDBBtn className="mb-4 w-100">Save</MDBBtn>
              </Link>

            </MDBCardBody>

          </MDBCol>

        </MDBRow>

      </MDBCard>
    </MDBContainer>
  )
}

export default UserForgotPassword
