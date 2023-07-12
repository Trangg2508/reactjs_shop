import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import logo from '../assets/logo.png';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
  from 'mdb-react-ui-kit';



export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const [fail, setFail] = useState(false);

  const logIn = (user) => {
    fetch('https://640c4dd9a3e07380e8f11292.mockapi.io/userDUMMY')
      .then(response => {
        if (!response.ok) {
          throw new Error('Invalid username or password!');
        }
        return response.json();
      })
      .then((data) => {
        const matchedUser = data.find(
          (userData) => userData.username === user.username && userData.password === user.password);
        if (matchedUser) {
          localStorage.setItem('token', matchedUser.username);
          navigate('/');
          window.location.reload();
        } else {
          setFail(true);
        }
      })
      .catch(error => {
        console.log('Error logging in: ', error);
        alert('Invalid username or password');
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const user = { username, password };
    logIn(user);
  };

  const handleCloseFail = () => {
    setFail(false);
    window.location.reload();
  };

  return (
    <div className="login_box">

      <MDBContainer fluid>
        <MDBRow>
          <MDBCol sm='6' >
            <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
              <div className="container mx-auto">
                <div className="w-full px-4">
                  <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]">
                    <div className="mb-5 text-center md:mb-5">
                      <a href="/" className="mx-auto inline-block max-w-[160px]">
                        <img
                          src={logo}
                          alt="logo"
                          style={{ width: '80px', height: '80px' }}
                        />
                      </a>
                    </div>
                    <form onSubmit={handleSubmit}>

                      <TextField
                        id="outlined-username-input"
                        label="Username"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        autoComplete="current-username"
                        style={{ width: '100%' }}
                        required
                      />
                      <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        style={{ width: '100%', marginTop: '20px' }}
                        autoComplete="current-password"
                        required
                      />
                      <br></br>



                      <div className="mb-5 mt-5">
                        <button
                          className="border-white w-full cursor-pointer rounded-md border py-3 px-5 text-base transition hover:bg-opacity-90"
                          type="submit"
                          style={{ backgroundColor: '#435B66', color: 'white' }}
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                    <p className="text-base text-[#adadad]">
                      Not a member yet? &nbsp;
                      <a href="/signUp" className="text-primary hover:underline">
                        Sign Up
                      </a>
                    </p>

                  </div>
                </div>
              </div>
            </section>
          </MDBCol>

          <MDBCol sm='6' className='d-none d-sm-block px-0'>
            <img src="https://img.freepik.com/vektoren-kostenlos/online-shopping-banner-vorlagen-fuer-mobile-apps-flaches-konzeptdesign_1150-34862.jpg?w=2000"
              alt="Login image" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left', marginTop: '10px', height: '100%' }} />
          </MDBCol>

        </MDBRow>

      </MDBContainer>


      <Dialog
        open={fail}
        onClose={handleCloseFail}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Error Login"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Invalid username or password!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => navigate('/register')} >
            Sign up
          </Button>
          <Button onClick={handleCloseFail} autoFocus>
            Retry login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
