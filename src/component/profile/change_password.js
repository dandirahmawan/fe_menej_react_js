import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import {SpinnerButton} from '../spinner'
import ReactDom from 'react-dom'
import Fetch from '../../function/fetchApi'
import { getCookieUserId } from '../../function/function'

class change_password extends React.Component{

    alertInfoCgPass = React.createRef()
    newPass = React.createRef()
    confPass = React.createRef()
    currPass = React.createRef()
    submit = this.submit.bind(this)

    submit(e){
        let pass = this.newPass.current.value
        let conf = this.confPass.current.value
        let curr = this.currPass.current.value
        this.alertInfoCgPass.current.style.display = "none"

        if(pass == 0 || conf == 0 || curr == 0){
            this.alertInfoCgPass.current.style.display = "block"
            this.alertInfoCgPass.current.style.background = "#c36363"
            this.alertInfoCgPass.current.innerHTML = "Make sure all data is filled"
            return false
        }
        if(pass != conf){
            this.alertInfoCgPass.current.style.display = "block"
            this.alertInfoCgPass.current.style.background = "#c36363"
            this.alertInfoCgPass.current.innerHTML = "Repeat password doesn't match"
            return false
        }

        e.target.setAttribute("class", "btn-primary-clicked")
        ReactDom.render(<SpinnerButton size="15px"/>, e.target)

        let form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("newPass", pass)
        form.append("password", curr)
        
        let t = e.target
        let fetch = new Fetch()
        fetch.post("/change_password", form).then(result => {
            if(result == 2){
                this.alertInfoCgPass.current.style.display = "block"
                this.alertInfoCgPass.current.style.background = "#c36363"
                this.alertInfoCgPass.current.innerHTML = "Current password is not valid"
                t.setAttribute("class", "btn-primary")
                ReactDom.render("submit", t)
            }else{
                window.location.reload()
            }
        })
    }

    render(){
        return(
            <Fragment>
                <div ref={this.alertInfoCgPass} 
                    style={{color: "#FFF", 
                            fontSize: "11px", 
                            padding: "10px",
                            display: "none", 
                            textAlign: "center", 
                            borderRadius: "3px", 
                            marginLeft: '10px', 
                            marginRight: "10px", 
                            marginBottom: "5px"}}/>

                <table style={{fontSize: "12px"}}>
                    <tr>
                        <td className="bold" style={{textAlign: "right"}}>New password</td>
                        <td><input type="password" ref={this.newPass} placeholder="insert password" style={{padding: "7px", marginLeft: "5px"}}/></td>
                    </tr> 
                    <tr>
                        <td className="bold" style={{textAlign: "right"}}>Repeat password</td>
                        <td><input type="password" ref={this.confPass} placeholder="repeat password" style={{padding: "7px", marginLeft: "5px"}}/></td>
                    </tr>   
                    <tr>
                        <td className="bold" style={{textAlign: "right"}}>Current password</td>
                        <td>
                            <input type="password" ref={this.currPass} placeholder="current password" style={{padding: "7px", marginLeft: "5px"}}/>
                        </td>
                    </tr>
                    <tr>
                        <td/>
                        <td><button onClick={this.submit} className="btn-primary" style={{fontSize: "11px", marginLeft: "5px", width: "100px"}}>Submit</button></td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <div className="second-font-color main-border-top" style={{fontSize: "14px", display: "flex", padding: "10px", paddingBottom: "0px"}}>
                                <FontAwesomeIcon icon={faInfoCircle} style={{marginRight: "5px"}}/>
                                <div style={{fontSize: "11px"}}>Menej will be reloaded when change password is successfully</div>
                            </div>
                        </td>    
                    </tr>     
                </table>
            </Fragment>
        )
    }
}

export default change_password