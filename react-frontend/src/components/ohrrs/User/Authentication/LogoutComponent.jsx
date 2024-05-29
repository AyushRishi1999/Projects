import { Component  } from "react";

class LogoutComponent extends Component
{
    render()
    {
        return(
            <div className="container">
                <p>Thank you for using our application, your session has expired</p> <br/>
                <p>Tasks pending ???</p> <br/>
                <p>Login here</p> <button className="btn btn-primary" placeholder="Login"> </button>
            </div>
        );
    }
}

export default LogoutComponent; 