import React from 'react'
import { baseUrl } from '../../const/const'
import {getCookieSessionId, getCookieUserId, popUpAlert} from '../../function/function'
import {SpinnerButton} from '../spinner'
import { ApiFetch } from '../apiFetch'

class invite_user extends React.Component{

    constructor(){
        super()
        this.state = {
            buttonInnerHtml : "Send"
        }

        this.buttonCommit = React.createRef()
        this.addEmail = this.addEmail.bind(this)
        this.commitInvite = this.commitInvite.bind(this)
    }

    componentDidMount(){
        var base = document.getElementById("base-invite-user")
        var windowWidth = window.innerWidth
        var left = (windowWidth - base.offsetWidth) / 2 
        base.style.left = left+"px"
    }

    addEmail(){
        var elm = document.createElement("input")
        elm.type = "text"
        elm.style.padding = "5px"
        elm.placeholder = "email"
        elm.style.marginTop = "10px"
        elm.style.width = "220px"
        elm.setAttribute("class", "eml-inp-vl")

        var btn = document.createElement("button")
        btn.style.padding = "0px"
        btn.style.background = "none"
        btn.style.marginLeft = "5px"
        btn.onclick = this.exAddEmail
        btn.innerHTML = "<i class='fa fa-times second-font-color'></i>"

        var div = document.createElement("div")
        div.append(elm)
        div.append(btn)

        var b = document.getElementById("base-input-email")
        b.append(div)
    }

    exAddEmail(e){
        var prt = e.target.parentElement.nodeName
        var prt2 = e.target.parentElement
        if(prt == "BUTTON"){
            prt2.parentElement.remove()
        }else{
            prt2.remove()   
        }
    }

    commitInvite(){
        var arrEmail = ""
        var isReady = true
        var elm = document.getElementsByClassName("eml-inp-vl")
        for(var i = 0;i<elm.length;i++){
            var v = elm[i].value
            if(v == ""){
                elm[i].style.border = "1px solid #982929"
                isReady = false
            }else{
                elm[i].style.border = "#ccc9c9 1px solid"
                arrEmail += v+" "
            }
        }

        if(isReady){
            this.setState({
                buttonInnerHtml: <SpinnerButton size="15px"/>
            })
            this.buttonCommit.current.style.opacity = "0.5"
            this.buttonCommit.current.setAttribute("disabled", "disabled")

            var form = new FormData()
            form.append("email", arrEmail)
            form.append("userId", getCookieUserId())
            form.append("sessionId", getCookieSessionId())
            ApiFetch("/invitation", {
                method: "POST",
                body: form
            }).then(res => res.text())
            .then(result => {
                if(result == 'success'){
                    popUpAlert("Invitation has been sent", "success")
                    this.props.hidePopUp()
                }
            })
        }
    }

    render(){
        return(
            <React.Fragment>
                <div className="block"></div>
                <div id="base-invite-user" className="main-border pop" style={{background: "#FFF", width: "300px", position: "fixed", marginTop: "50px"}}>
                    <div id="main-base-invite-user" style={{height: "auto"}}>
                        <div className="main-border-bottom" style={{padding: "10px"}}>
                            <span className="bold">Invite user</span>
                        </div>
                        <div style={{padding: "10px"}}>
                            <span className="second-font-color" style={{fontSize: "12px"}}>insert email user who you want to invite</span><br/>
                            
                            <div id="base-input-email">
                                <input className="eml-inp-vl" placeholder="email" type="text" style={{padding: "5px", width: "220px", marginTop: "10px"}}></input>
                            </div>
                            
                            
                            <div className="bold" style={{marginTop: "10px", fontSize: "11px"}}>
                                <a onClick={this.addEmail}>+Add email</a>
                            </div>
                        </div>
                        <div style={{padding: "10px", textAlign: "right"}}>
                            <button ref={this.buttonCommit} onClick={this.commitInvite} style={{fontSize: "12px", minWidth: "50px"}} className="btn-primary">
                                {this.state.buttonInnerHtml}
                            </button>
                            <button onClick={this.props.hidePopUp} style={{fontSize: "12px", marginLeft: "10px"}} className="btn-secondary">Cancel</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default invite_user