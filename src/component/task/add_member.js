import React, { Fragment } from 'react'
import ReactDom from 'react-dom'
import { popCenterPosition, popUpAlert, getCookieUserId } from '../../function/function'
import { SpinnerButton } from '../spinner'
import { ApiFetch } from '../apiFetch'

class add_member extends React.Component{

    constructor(){
        super()
        this.inputEmail = React.createRef()
        this.sendRequest = this.sendRequest.bind(this)
        this.cancel = this.cancel.bind(this)
    }

    componentDidMount(){
        popCenterPosition("pop-bs-add-member")
    }

    sendRequest(e){
        let input = this.inputEmail.current
        let val = input.value
        
        let isReady = false
        this.props.dataTeam.map(dt => {
            if(dt.emailUser == val){
                isReady = true
            }
        })

        if(isReady){
            popUpAlert("Email is ready in this team")
            return false
        }
    
        if(val == 0){
            popUpAlert("Email is empty")
        }else{
            e.target.style.opacity = 0.5
            e.target.style.minWidth = "50px"
            ReactDom.render(<SpinnerButton size="12px"/>, e.target)

            let form = new FormData()
            form.append("userId", getCookieUserId())
            form.append("email", val)
            form.append("projectId", this.props.projectId)
            ApiFetch("/invitation", {
                method: "POST",
                body: form
            }).then(res => res.text()).then(result => {
                if(result == "success"){
                    popUpAlert("invitation has been sent", "success")
                    this.cancel()
                }
            }) 
        }
    }

    cancel(){
        this.props.hide()
    }

    render(){
        return(
           <Fragment>
               <div className="block" onClick={this.props.hide}></div>
                <div id="pop-bs-add-member" className="pop" style={{padding: "10px", borderRadius: "3px", width: "300px", background: "#FFF"}}>
                    <div className="bold" style={{fontSize: "12px"}}>Add member</div>
                    <input ref={this.inputEmail} 
                        placeholder="insert email" 
                        type="text" 
                        style={{padding: "7px", marginTop: "10px", width: "100%", boxSizing: "border-box"}}/>
                    <div style={{fontSize: "11px", marginTop: "3px", color: "#8d8d8d"}}>
                        Insert email and we will send the request invitaion
                    </div>
                    <div style={{marginTop: "15px", textAlign: "right"}}>
                        <button onClick={this.sendRequest} className="btn-primary" style={{fontSize: "11px"}}>Send request</button>
                        <button onClick={this.cancel} className="btn-secondary" style={{fontSize: "11px", marginLeft: "10px"}}>Cancel</button>
                    </div>
                </div>
           </Fragment>
        )
    }
}

export default add_member