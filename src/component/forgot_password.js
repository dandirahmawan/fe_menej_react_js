import React from 'react'
import Logo from '../images/menej_285e8e.png'
import {Link} from "react-router-dom";
import {popUpAlert} from "../function/function";
import {baseUrl} from "../const/const";
import Form from './forgot_password_form'
import CheckList from '../images/success_alt_inf.png'

class forgot_password extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isSent : false
        }
        this.inputEmail = React.createRef()
        this.submit = this.submit.bind(this)
        this.input = this.input.bind(this)
    }

    componentDidMount(){
        // let href = window.location.href
        // alert(href)
        //
        // let form = new FormData()
        // form.append("r_code", null)
    }

    input(){
        this.setState({
            isSent: false
        })
    }

    submit(e){
        let val = this.inputEmail.current.value
        if(val == 0){
            popUpAlert("Email is empty")
        }else{
            let tgt = e.target
            tgt.setAttribute("class", "btn-primary-clicked")
            tgt.innerText = "Sending request..."

            let form = new FormData()
            form.append("email", val)
            fetch(baseUrl+"/recover_account", {
                method: "POST",
                body: form
            }).then(res => res.json()).then(result => {
                if(result.length <= 0){
                    popUpAlert("Email not registered")
                    tgt.setAttribute("class", "btn-primary")
                    tgt.innerText = "Send password reset"
                }else{
                    this.setState({
                        isSent : true
                    })
                }
            })
        }
    }

    render(){
        return(
            <React.Fragment>
                {
                    (!this.state.isSent)
                        ?
                        <Form submit={this.submit} inputEmail={this.inputEmail}/>
                        :
                        <div style={{marginTop: "100px"}}>
                            <div style={{textAlign: "center", marginBottom: "20px"}}>
                                <img src={Logo}></img><br/>
                            </div>
                            <div style={{textAlign: "center", marginBottom: "10px"}}>
                                <img src={CheckList}></img><br/>
                            </div>
                            <div className="bold second-font-color main-border-bottom"
                                 style={{fontSize: "12px", textAlign: "center", width: "300px", margin: "auto", paddingBottom: "20px"}}>
                                Change request to change password successfully<br/>
                                open your email and click reset password button to change your password
                            </div>
                            <div style={{textAlign: "center", marginTop: "15px"}}>
                                <a onClick={this.input} className="bold" style={{margin: "auto", fontSize: "12px"}}>Input email</a>
                            </div>
                        </div>
                }
            </React.Fragment>
        )
    }
}

export default forgot_password