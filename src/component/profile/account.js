import React from 'react'
import {getCookieUserId, getCookieSessionId} from '../../function/function'
import {baseUrl} from '../../const/const'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faExclamationCircle, faTintSlash} from '@fortawesome/free-solid-svg-icons'

class account extends React.Component{

    constructor(){
        super()
        this.state = {
            infoAlertCgPass: "",
            infoAlertCgEmail: ""
        }
        this.refNewEmail = React.createRef()
        this.refPassNewEmail = React.createRef()
        this.refInputNewPass = React.createRef()
        this.refInputRepeatNewPass = React.createRef()
        this.refInputOldPass = React.createRef()
        this.submitChangePassword = this.submitChangePassword.bind(this)
        this.submitChangeEmail = this.submitChangeEmail.bind(this)
    }

    changeEmail(){
        var a = document.getElementById("bs-frm-cg-eml")
        var b = document.getElementById("bs-frm-cg-pass")
        a.style.display = "block"   
        b.style.display = "none"
    }

    submitChangeEmail(){
        let newEmail = this.refNewEmail.current.value
        let password = this.refPassNewEmail.current.value

        if(newEmail === "" || newEmail === undefined){
            this.setState({
                infoAlertCgEmail: "New email is empty"
            })
            return false
        }

        if(password === "" || password === undefined){
            this.setState({
                infoAlertCgEmail: "Password is empty"
            })
            return false
        }

        let form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("email", newEmail)
        form.append("password", password)
        if(newEmail !== "" && newEmail !== undefined){
            fetch(baseUrl+"/change_email", {
                method: "POST",
                body: form
            }).then(res => res.text())
                .then(result => {
                    if(result == 2){
                        this.setState({
                            infoAlertCgEmail: "Password is wrong"
                        })
                        return false
                    }else{
                        window.location.reload()
                    }
                })
        }
    }

    changePassword(){
        var a = document.getElementById("bs-frm-cg-pass")
        var b = document.getElementById("bs-frm-cg-eml")
        a.style.display = "block"
        b.style.display = "none"   
    }

    submitChangePassword(e){     
        let newPass = this.refInputNewPass.current.value
        let newRepPass = this.refInputRepeatNewPass.current.value
        let oldPass = this.refInputOldPass.current.value

        if(newPass === ""){
            this.setState({
                infoAlertCgPass: "New password is empty"
            })
            return false
        }

        if(newPass !== newRepPass){
            this.setState({
                infoAlertCgPass: "Repeat password not match"
            })
            return false
        }

        this.setState({
            infoAlertCgPass: ""
        })

        var thisElm = e.target
        thisElm.style.opacity = "0.5"
        thisElm.innerText = "Processing.."
        // window.location.reload()
        let form = new FormData();
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("password", oldPass)
        form.append("newPass", newPass)
        fetch(baseUrl+"/change_password", {
            method: "POST",
            body: form
        }).then(res => res.text())
            .then(result => {
                if(result === "2"){
                    this.setState({
                        infoAlertCgPass: "Password is wrong"
                    })
                    thisElm.style.opacity = "1"
                    thisElm.innerText = "Submit"
                }else{
                    window.location.reload()
                }
            })
    }

    render(){
        return(
            <React.Fragment>
                <table>
                    <tbody>
                        <tr>
                            <td className="bold second-font-color" style={{width: "150px"}}>Name</td>
                            <td className="bold">{this.props.userName}</td>
                        </tr>
                        <tr>
                            <td className="bold second-font-color">Email</td>
                            <td className="bold">{this.props.userEmail}</td>
                        </tr>
                        <tr>
                            <td className="bold second-font-color">Joined</td>
                            <td className="bold">12 january 2019</td>
                        </tr>
                    </tbody>
                </table>
                <div className="main-border-top" style={{width: "50%", marginTop: "20px"}}>
                    <div style={{padding: "5px"}}>
                        <a onClick={this.changeEmail} className="bold" style={{fontSize: "12px"}}>
                             Change email
                        </a>
                        <div id="bs-frm-cg-eml" style={{padding: "5px", marginTop: "5px", borderLeft: "#dcdbdb 2px solid", display: "none"}}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td/>
                                        <td>
                                            {
                                                (this.state.infoAlertCgEmail != "")
                                                    ?
                                                    <div className="bold" style={{color: "red"}}>
                                                        <FontAwesomeIcon icon={faExclamationCircle}/> {this.state.infoAlertCgEmail}
                                                    </div>
                                                    :
                                                    ""
                                            }

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="bold second-font-color">New email</td>
                                        <td><input ref={this.refNewEmail} type="text" style={{padding: "5px"}} placeholder="new email"></input></td>
                                    </tr>
                                    <tr>
                                        <td className="bold second-font-color">Password</td>
                                        <td><input ref={this.refPassNewEmail} type="password" style={{padding: "5px"} }placeholder="password"></input></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><button onClick={this.submitChangeEmail} className="btn-primary">Submit</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>    
                    </div>
                    <div style={{padding: "5px"}}>
                        <a onClick={this.changePassword} className="bold" style={{fontSize: "12px"}}>
                            Change password
                        </a>
                        <div id="bs-frm-cg-pass" style={{padding: "5px", marginTop: "5px", borderLeft: "#dcdbdb 2px solid", display: "none"}}>
                            <table>
                                <tbody>
                                <tr>
                                        <td/>
                                        <td>
                                            {
                                                (this.state.infoAlertCgPass != "")
                                                ?
                                                    <div className="bold" style={{color: "red"}}>
                                                        <FontAwesomeIcon icon={faExclamationCircle}/> {this.state.infoAlertCgPass}
                                                    </div>
                                                :
                                                    ""
                                            }
                                            
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="bold second-font-color">New Password</td>
                                        <td><input ref={this.refInputNewPass} type="password" style={{padding: "5px"}} placeholder="new password"></input></td>
                                    </tr>
                                    <tr>
                                        <td className="bold second-font-color">Repeat New Password</td>
                                        <td><input ref={this.refInputRepeatNewPass} type="password" style={{padding: "5px"}} placeholder="repeat password"></input></td>
                                    </tr>
                                    <tr>
                                        <td className="bold second-font-color">Password</td>
                                        <td><input ref={this.refInputOldPass} type="password" style={{padding: "5px"}} placeholder="old password"></input></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <button onClick={this.submitChangePassword} className="btn-primary">Submit</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>        
                    </div>
                </div>
               
            </React.Fragment>
        )
    }
}

export default account