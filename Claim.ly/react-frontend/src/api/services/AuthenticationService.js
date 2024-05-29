import axios from "axios";
import { Navigate } from "react-router-dom";
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService 
{
    authenticateUserJwt(authenticateUser)
    {
        return axios.post("http://localhost:8001/authorization/login", authenticateUser);
    }

    registerSuccessfulLoginForJwt(user)
    {
        console.log('registerSuccessfulLogin');
        window.sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, user);
        //this.setupAxiosInterceptors(this.createJWTToken(JSON.parse(window.sessionStorage.getItem('authenticatedUser')).jwtAuthToken));
    }

    registerSuccessfulRegistration()
    {
        console.log('Registration Successful');
    }

    logout()
    {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        Navigate("/logout");
    }

    isUserLoggedIn()
    {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user===null)
            return false;
        return true;
    }

    getLoggedInUserName()
    {
        let checkIfUserIsLoggedIn = this.isUserLoggedIn();
        if(checkIfUserIsLoggedIn)
            return sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME).username;
        else
            return null;
    }
}

export default new AuthenticationService();