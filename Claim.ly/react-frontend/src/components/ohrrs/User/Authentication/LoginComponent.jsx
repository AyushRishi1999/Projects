import React, { Component } from "react";
import { Link } from 'react-router-dom';

import AuthenticationService from "../../../../api/services/AuthenticationService";

class LoginComponent extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : '',
            user : null,
            hasLoginFailed : false,
            showSuccessMessage : false,
            register : false,
            
            userName : '',
            token : ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.LoginClicked = this.LoginClicked.bind(this);
    }

    //handleChange is used for handling the data change events of email & password field 
    handleChange(event)
    {
        console.log(event.target.name)
        this.setState({[event.target.name] : event.target.value})
    }

    LoginClicked()
    {
        let authenticateUser = {username:this.state.email, password:this.state.password}

        AuthenticationService.authenticateUserJwt(authenticateUser)
            .then(response => {

                this.setState({user : response.data})
                console.log(this.state.user)

                this.setState({userName : response.data.username})
                this.setState({token : response.data.jwtAuthToken})

                // if(this.state.userName == null)
                // {
                //     this.setState({ hasLoginFailed: true })
                //     this.setState({ showSuccessMessage: false });
                //     this.props.navigate("/login")
                // }
                // else
                // {
                    AuthenticationService.registerSuccessfulLoginForJwt(JSON.stringify(this.state.user));
                    this.props.navigate(`/home/${this.state.userName}`);
                    this.setState({hasLoginFailed : false})
                //}   
            })
            .catch(res=> {
                    this.setState({ hasLoginFailed: true })
                    this.setState({ showSuccessMessage: false });
                    this.props.navigate("/login")
            })
    }

    render() 
    {
        console.log('render') 

        return (
            <div className="loginComponent">
                <section className="vh-100" style={{ backgroundColor: '#9A616D' }}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-xl-10">
                                <div className="card" style={{ borderRadius: '1rem' }}>
                                    <div className="row g-0">
                                        <div className="col-md-6 col-lg-5 d-none d-md-block">
                                            <img src="./img/login.jpg" alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                                        </div>
                                        <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                            <div className="card-body p-4 p-lg-5 text-black">
                                                <form>
                                                    <div>
                                                        {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                                                        {this.state.showSuccessMessage && <div>Login Successful</div>}
                                                    </div>
                                                    
                                                    {/* <div>
                                                        <img className="center" src="./img/logo.png" name="login__logo" alt="Atlantis Logo"/> <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }} > Claim.ly </i>
                                                    </div> */}
                                            
                                                    <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
                                                    <div className="form-outline mb-4">
                                                        <input type="email" id="email" name="email" className="form-control form-control-lg" placeholder="example@xyzmail.com" value={this.state.email} onChange={this.handleChange} required />
                                                    </div>
                                                    <div className="form-outline mb-4">
                                                        <input type="password" id="password" name="password" className="form-control form-control-lg" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                                                    </div>
                                                    <div className="pt-1 mb-4">
                                                        <button className="btn btn-lg btn-block btn-primary" type="button" onClick={this.LoginClicked}>Login</button>
                                                    </div>
                                                    <a className="small text-muted" href="#!">Forgot password?</a>
                                                    <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <Link to="/registration">Register</Link> </p>
                                                    <a href="#!" className="small text-muted">Terms of use.</a>
                                                    <a href="#!" className="small text-muted">Privacy policy</a>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default LoginComponent;