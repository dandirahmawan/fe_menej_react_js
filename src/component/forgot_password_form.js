import React from 'react'
import Logo from "../images/menej_285e8e.png";
import {Link} from "react-router-dom";

class forgot_password_form extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div style={{width: "300px", margin: "auto", height: "300px", marginTop: "100px"}}>
                    <div style={{textAlign: "center", marginBottom: "2z0px"}}>
                        <img src={Logo}></img><br/>
                    </div>
                    <div className="bold">
                        <div className="bold-black" style={{textAlign: "center", fontSize: "16px", marginBottom: "10px"}}>
                            Forgot Password
                        </div>
                        <div className="regular-font second-font-color" style={{fontSize: "11px"}}>
                            Insert your email acount and we will send you a reset password link
                        </div>
                        <input ref={this.props.inputEmail}
                               className="bold" type="text"
                               placeholder="Enter your email"
                               style={{padding: "10px", width: "100%", marginTop: "10px", boxSizing: "border-box"}}/>
                        <button onClick={this.props.submit} className="btn-primary bold"
                                style={{marginTop: "10px", width: "100%", fontSize: "11px", padding: "10px"}}>
                            Send password reset
                        </button>
                        <div className="bold" style={{marginTop: '20px', textAlign: "center"}}>
                            <Link to="/login"><a style={{fontSize: "11px"}}>Back to login</a></Link><br/>
                            <Link to="/register" style={{fontSize: "11px"}}>Sign up for an account</Link>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default forgot_password_form