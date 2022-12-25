import React from "react";
import { Component } from "react";

class UnconfirmedPopup extends Component {
    render(){
        return(
            <div className="block" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div style={{background: "#FFF", width: "400px", borderRadius: "4px"}}>
                    <div className="bold" style={{textAlign: "center", paddingTop: "20px", fontSize: "18px"}}>Confirm Your Email</div>
                    <div className="bold second-font-color" style={{textAlign: "center", padding: "20px 30px", fontSize: "14px"}}>
                        Your email is not confirmed yet. Please confirm your email in 24 hours<br/>
                        <div className="regular-font" style={{fontSize: "12px", marginTop: "10px"}}>
                            Did not get email confirmation ?<br/><a style={{textDecoration: "underline"}}>resend</a> or <a style={{textDecoration: "underline"}}>change</a> email
                        </div>
                    </div>
                    <div style={{textAlign: "center", marginBottom: "20px"}}>
                    <button className="btn-primary bold" style={{width: "100px", margin: "auto"}}>OK</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default UnconfirmedPopup