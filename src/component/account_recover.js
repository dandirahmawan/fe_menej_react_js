import React from 'react'
import Logo from '../images/menej_285e8e.png'
import Image from '../images/warn_alert_inf.png'
import ReactDom from 'react-dom'
import {SpinnerButton, Spinner} from "./spinner";
import {baseUrl} from '../const/const'
import {Link} from "react-router-dom";
import {popUpAlert} from "../function/function";

class account_recover extends React.Component{

    constructor(){
        super()
        this.state = {
            code : null,
            isValid : false,
            isLoad : true
        }

        this.submit = this.submit.bind(this)
        this.password = React.createRef()
        this.repeatPassword = React.createRef()
    }

    componentDidMount(){
        let href = window.location.href
        var get = href.lastIndexOf("?")
        var get = href.substring(parseInt(get) + 1, href.length)
        let codeGet = get.split("=")[1]
        this.setState({
            code : codeGet
        })

        let form = new FormData()
        form.append("r_code", codeGet)
        fetch(baseUrl+"/recover_account?r_code="+codeGet).then(res => res.text())
            .then(result => {
                if(result == 1){
                    this.setState({
                        isValid: true,
                        isLoad: false
                    })
                }else{
                    this.setState({
                        isValid: false,
                        isLoad: false
                    })
                }
            })
    }

    submit(e){
        let pass = this.password.current.value
        let rePass = this.repeatPassword.current.value

        if(pass == 0 || rePass == 0){
            popUpAlert("Password and confirm password must be filled")
        }else{
            if(pass != rePass){
                popUpAlert("Confirm password not match")
            }else{
                if(pass.length < 8){
                    popUpAlert("Minimum password is 8 letter")
                }else{
                    this.formSubmit(pass, rePass)
                }
            }
        }
    }

    formSubmit(pass, passConfirm){
        let form = new FormData()
        form.append("pass", pass)
        form.append("pass_confirm", passConfirm)
        form.append("r_code", this.state.code)
        fetch(baseUrl+"/submit_forget_password", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == "success") {
                window.location = "/login"
            }else{
                popUpAlert("Change password failed")
            }
        })
    }

    render(){
        return(
            <React.Fragment>
                <div style={{textAlign: "center", marginTop: "100px"}}><img src={Logo}/></div>
                {
                    (this.state.isLoad)
                    ?
                        <div style={{textAlign: "center"}}>
                            <Spinner size="25px" style={{marginTop: "100px"}}/>
                            <span className="bold second-font-color" style={{fontSize: "12px"}}>Loading request</span>
                        </div>
                    :
                        (this.state.isValid)
                        ?
                            <div style={{textAlign: "center"}}>
                                <div className="bold-black" style={{textAlign: "center", fontSize: "16px", width: "275px", margin: "auto", marginTop: "15px", marginBottom: "10px"}}>
                                    Change Password
                                </div>
                                <input type='password'
                                       ref={this.password}
                                       placeholder="password"
                                       style={{padding: "10px", fontSize: "12px", marginBottom: "10px", width: "250px"}}/><br/>
                                <input type='password'
                                       ref={this.repeatPassword}
                                       placeholder='confirm password'
                                       style={{padding: "10px", fontSize: "12px", marginBottom: "5px", width: "250px"}}/>
                                <div className="regular-font second-font-color" style={{textAlign: "left", fontSize: "11px", width: "275px",  margin: "auto", marginTop: "10px", marginBottom: "5px"}}>
                                    Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.
                                </div>
                                <button className='btn-primary bold' onClick={this.submit} style={{fontSize: "12px", marginTop: "10px", width: "150px", padding: "10px"}}>Reset</button>
                            </div>
                        :
                            <div style={{width: "275px", textAlign: "center", margin: "auto"}}>
                                <img style={{marginTop: "10px"}} src={Image}/><br/>
                                <span className="bold second-font-color" style={{fontSize: '12px'}}>
                                Request link to change password is expired or not available
                                </span>
                            </div>
                }
            </React.Fragment>
        )
    }
}

export default account_recover