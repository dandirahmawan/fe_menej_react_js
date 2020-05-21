import React from 'react'
import RactDom from 'react-dom'
import {getCookieSessionId, getCookieUserId, popCenterPosition, popUpAlert} from "../../../function/function"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import {SpinnerButton} from "../../spinner";
import {baseUrl} from "../../../const/const";

class copy_tab extends React.Component{

    constructor(){
        super()
        this.cancel = this.cancel.bind(this)
        this.copy = this.copy.bind(this)
        this.inputTabName = React.createRef()
    }

    componentDidMount(){
        popCenterPosition("base-copy-tab")
    }

    cancel(){
        this.props.cancel()
    }

    copy(e){

        let v = this.inputTabName.current.value
        if(v == 0){
            popUpAlert("Tab name is empty")
            return false
        }

        e.target.style.opacity = "0.5"
        RactDom.render(<SpinnerButton size="15px"/>, e.target)
        let form = new FormData()

        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("tabName", this.inputTabName.current.value)
        form.append("confirmReplace", "N")
        form.append("tabId", this.props.tabId)
        form.append("projectId", this.props.projectId)
        fetch(baseUrl+"/copy_tab", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == 0){
                let form = new FormData()
                form.append("userId", getCookieUserId())
                form.append("sessionId", getCookieSessionId())
                form.append("projectId", this.props.projectId)
                fetch(baseUrl+"/tab_list", {
                    method: "POST",
                    body: form
                }).then(res => res.json()).then(result => {
                    this.props.updateDataTab(result)
                    this.props.cancel()
                    popUpAlert("copy tab successfully", "success")
                })
            }else if(result == 2){
                this.props.existCopy(this.inputTabName.current.value, this.props.tabId, this.props.projectId)
            }
        })
    }

    render(){
        return(
            <React.Fragment>
                <div className="block"/>
                <div className="pop" id="base-copy-tab" style={{background: "#FFF", width: "250px"}}>
                    <div className="bold main-border-bottom second-background-grs" style={{fontSize: "14px", padding: "10px"}}>Copy tab</div>
                    <div style={{padding: "10px"}}>
                        <div className="bold" style={{fontSize: "12px"}}>Tab name :</div>
                        <input ref={this.inputTabName} type="text" style={{padding: "10px"}} placeholder="tab name"/>
                        <div className="second-font-color" style={{fontSize: "11px", marginTop: "7px"}}>
                            <div style={{fontSize: "16px", color: "#6995aa"}}><FontAwesomeIcon icon={faInfoCircle}/></div>
                            <div style={{marginLeft: "22px", marginTop: "-18px"}}>if you insert existing tab name, the tab will be replace</div>
                        </div>
                    </div>
                    <div className="main-border-top" style={{padding: "10px", textAlign: "right", marginTop: "10px"}}>
                        <button onClick={this.copy} className="btn-primary" style={{fontSize: "12px"}}>Copy</button>&nbsp;
                        <button onClick={this.cancel} className="btn-secondary" style={{fontSize: "12px"}}>Cancel</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default copy_tab