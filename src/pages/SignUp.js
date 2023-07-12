import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TextInput } from 'react-materialize';
import { Button } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
  from 'mdb-react-ui-kit';

export default function SignUp() {

  const [fail, setFail] = useState(false);

  const [user, setUser] = useState ({
    username:'',
    password:'',
    phone:'',
    address:'',
    firstName:'',
    lastName:'',
  })


  const navigate = useNavigate();

  const resgister = (user) => {
    fetch('https://640c4dd9a3e07380e8f11292.mockapi.io/userDUMMY')
      .then(response => {
        if (!response.ok) {
          throw new Error('Sign up failed!');
        }
        return response.json();
      })
      .then((data) => {
        const existedUser = data.find((existed) => existed.username === user.username);
        if (existedUser) {
          throw new Error('Username already existed!')
        } else {
          return fetch('https://640c4dd9a3e07380e8f11292.mockapi.io/userDUMMY', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Error signing up');
              }
              return response.json();
            })
            .then((data) => {
              console.log('Sign up successfully: ', data);
              navigate('/login');
            })
            .catch((error) => {
              console.log('Error sign up: ', error);
              alert('Error signing up');
            });
        }
      })
      .catch((error) => {
        console.log('Error checking username: ', error);
        setFail(true);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    resgister(user);
  };

  const handleCloseFail = () => {
    setFail(false);
    window.location.reload();
  };



  return (
    <div className="signUp_box">
      <MDBContainer fluid className='p-4 mt-3  background-radial-gradient overflow-hidden'>

        <MDBRow>

          <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

            <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
              The best offer <br />
              <span style={{ color: '#D3D04F' }}>for your shopping</span>
            </h1>

            <p className='px-3' style={{ color: '#C3EDC0' }}>
              Browse, click, and shop - it's that easy with our online store. <br />
              Enjoy the convenience of doorstep delivery,  ensuring that your selected items <br />
              are promptly shipped and arrive right at your doorstep.
            </p>

          </MDBCol>

          <MDBCol md='6' className='position-relative'>

            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

            <MDBCard className='my-5 bg-glass'>
              <MDBCardBody className='p-5'>
                <form onSubmit={handleSubmit}>
                  <MDBRow>
                    <MDBCol col='6'>
                      <MDBInput
                        wrapperClass='mb-4'
                        label='First name'
                        id='form1'
                        type='text'
                        value={user.firstName}
                        onChange={(e) => setUser({...user, firstName: e.target.value})}
                        required
                      />
                    </MDBCol>

                    <MDBCol col='6'>
                      <MDBInput
                        wrapperClass='mb-4'
                        label='Last name'
                        id='form2'
                        type='text'
                        value={user.lastName}
                        onChange={(e) => setUser({...user, lastName: e.target.value})}
                        required
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Phone'
                    id='form3'
                    type='number'
                    value={user.phone}
                    onChange={(e) => setUser({...user, phone: e.target.value})}
                    required
                  />
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Address'
                    id='form3'
                    type='text'
                    value={user.address}
                    onChange={(e) => setUser({...user, address: e.target.value})}
                    required
                  />
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Username'
                    id='form3'
                    type='text'
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    required
                  />
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Password'
                    id='form4'
                    type='password'
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    required
                  />

                  <div className='d-flex justify-content-center mb-4'>
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                  </div>

                  <MDBBtn className='w-100 mb-4' size='md' style={{ backgroundColor: '#17594A' }} type='submit'>sign up</MDBBtn>
                </form>
                <p className="text-base text-[#adadad]">
                  Already have account? &nbsp;
                  <a href="/login" className="text-primary hover:underline">
                    Sign In
                  </a>
                </p>
              </MDBCardBody>
            </MDBCard>

          </MDBCol>

        </MDBRow>

      </MDBContainer>


      <Dialog
        open={fail}
        onClose={handleCloseFail}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Error signing up"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Invalid username or password!
          </DialogContentText>
        </DialogContent>
        <Button onClick={() => navigate('/login')} autoFocus>
          Login
        </Button>
        <DialogActions>
          <Button autoFocus onClick={handleCloseFail}>
            Retry sign up
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  )
}
