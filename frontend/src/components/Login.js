import { React, useState } from 'react'
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox, MDBTypography } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom'
import './login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs' // needed for axios post to work properly
import util from 'util'
import AuthService from "../services/auth.service";
import { AuthProvider } from '../hooks/AuthProvider';

const Login = () => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    let navigate = useNavigate();

    const onUsernameChange = (event) => {
        setUserName(event.target.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        // const instance = axios.create();
        // const headers = {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        // }

        AuthService.login(username, password).then(
            () => {
                AuthProvider.login()
                console.log("here");
                navigate('/dashboard')
            //   this.props.router.navigate("/profile");
            //   window.location.reload();
            },
            error => {
                if (error)
                    this.error.message = error.toString();
            });

        // const formData = {
        //     email: username,
        //     password: password
        // }
        // instance.post('http://localhost:5000/auth/login', qs.stringify(formData), { headers: headers })
        //     .then((res) => {
        //         // get the returned jwt
        //         const token = res.data.token;
        //         // set token in local storage to the returned jwt
        //         localStorage.setItem('token', token);

        //         // TODO redirect user
        //         //redirect user to home page
        //         window.location.href = '/'
        //     })
        //     .catch((error) => {
        //         /**
        //          * @todo: fix error handling
        //          */
        //         if (error) this.error.message = error;
        //     })
    }
    return (
        <form onSubmit={onSubmit}>
            <MDBContainer fluid className="p-3 my-5 h-custom">
                <MDBRow>
                    <MDBCol col='10' md='6'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample" />
                    </MDBCol>

                    <MDBCol col='4' md='6'>

                        <div className="d-flex flex-row align-items-center justify-content-center">

                            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                            {/*     
                <MDBBtn floating size='md' tag='a' className='me-2'>
                  <MDBIcon fab icon='facebook-f' />
                </MDBBtn>
     */}
                            <a href="http://localhost:5000/auth/google">
                                <MDBBtn floating size='md' tag='a' className='me-2'>
                                    <MDBIcon fab icon='google' />
                                </MDBBtn>
                            </a>


                        </div>

                        <div className="divider d-flex align-items-center my-4 or">
                            <p className="text-center fw-bold mx-3 mb-0">Or</p>
                        </div>

                        <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' value={username} onChange={onUsernameChange} type='email' size="lg" />
                        <MDBInput wrapperClass='mb-4' label='Password' value={password} onChange={onPasswordChange} id='formControlLg' type='password' size="lg" />

                        <div className="d-flex justify-content-between mb-4">
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                            <a href="!#">Forgot password?</a>
                        </div>
                        {error !== '' ?
                            <MDBTypography id="danger-text" note noteColor='danger'>
                                <strong>{error.message}</strong>
                            </MDBTypography> : ""}
                        <div className='text-center text-md-start mt-4 pt-2'>
                            <MDBBtn className="mb-0 px-5" size='lg'>Login</MDBBtn>
                            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <Link to="/register" className="link-danger">Register</Link></p>
                        </div>

                    </MDBCol>

                </MDBRow>

            </MDBContainer>
        </form>
    );
}

export default Login;