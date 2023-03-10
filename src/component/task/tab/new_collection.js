import React from 'react'
import ReactDom from 'react-dom'
import {getCookieSessionId, getCookieUserId, popCenterPosition, popUpAlert} from "../../../function/function";
import {SpinnerButton} from "../../spinner";
import {ApiFetch} from '../../apiFetch'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe, faLock, faUser} from "@fortawesome/free-solid-svg-icons";

class new_tab extends React.Component{

    constructor(){
        super()
        this.state = {
            privacyIcon : <FontAwesomeIcon style={{float: "left", marginTop: "4px"}} icon={faLock}/>,
            privacy: "pr",
            tabName: ""
        }
        this.submit = this.submit.bind(this)
        this.inputTabName = React.createRef()
        this.divPrevTabName = React.createRef()
        this.privacyChange = this.privacyChange.bind(this)
        this.tabNameChange = this.tabNameChange.bind(this)
    }


    componentDidMount(){
        popCenterPosition("base-new-tab")
    }

    submit(e){
        let wPreview = this.divPrevTabName.current.offsetWidth
        wPreview = parseInt(wPreview) + 25
        let t = e.target
        let val = this.inputTabName.current.value
        if(val != 0){
            e.target.style.opacity = 0.5
            e.target.style.minWidth = "50px"
            ReactDom.render(<SpinnerButton size="15px"/>, e.target)
            let form = new FormData()
            form.append("userId", getCookieUserId())
            form.append("sessionId", getCookieSessionId())
            form.append("projectId", this.props.projectId)
            form.append("prv", this.state.privacy)
            form.append("tabName", val)

            ApiFetch("/new_tab", {
                method: "POST",
                body: form
            }).then(res => res.text())
                .then(result => {
                    if(result == "exists"){
                        popUpAlert("Tab name already exists")
                        t.style.opacity = 1
                        t.style.minWidth = "0px"
                        ReactDom.render("Submit", t)
                    }else{
                        let form = new FormData()
                        form.append("userId", getCookieUserId())
                        form.append("sessionId", getCookieSessionId())
                        form.append("projectId", this.props.projectId)
                        ApiFetch("/tab_list", {
                            method: "POST",
                            body: form
                        }).then(res => res.json()).then(result => {
                            this.props.updateDataCollection(result)
                        })
                        this.props.cancel();
                    }
                })
        }
    }

    privacyChange(e){
        let icon = ""
        if(e.target.value == "pu"){
            icon = <FontAwesomeIcon style={{float: "left", marginTop: "4px"}} icon={faGlobe}/>
        }else if(e.target.value == "pr"){
            icon = <FontAwesomeIcon style={{float: "left", marginTop: "4px"}} icon={faLock}/>
        }else{
            icon = <FontAwesomeIcon style={{float: "left", marginTop: "4px"}} icon={faUser}/>
        }
        this.setState({
            privacy: e.target.value,
            privacyIcon: icon
        })
    }

    tabNameChange(e){
        let val = e.target.value
        this.setState({
            tabName: val
        })
    }

    render(){
        return(
            <React.Fragment>
                <div className="block"/>
                <div id="base-new-tab" className="pop" style={{background: "#FFF", borderRadius: "4px", overflow: "hidden"}}>
                    <div className="bold main-border-bottom second-background-grs" style={{padding: "10px", fontSize: "12px"}}>New collection</div>
                    <div style={{padding: "11px"}}>
                        <div ref={this.divPrevTabName}
                             className="bold"
                             style={{fontSize: "12px", position: "fixed", opacity: "0"}}>
                            {this.state.tabName}
                        </div>
                        <span className="bold" style={{fontSize: "11px"}}>Collection name :</span><br/>
                        <input
                            ref={this.inputTabName}
                            type="text"
                            value={this.state.tabBaseMenu}
                            placeholder="tab name"
                            onChange={this.tabNameChange}
                            style={{padding: "5px", width: "200px"}}/>
                    </div>
                    <div style={{padding: "11px", paddingTop: "0px"}}>
                        <span className="bold" style={{fontSize: "11px"}}>Privacy :</span><br/>
                        {this.state.privacyIcon}
                        <select onChange={this.privacyChange} style={{fontSize: "12px", border: "none", outline: "none"}}>
                            <option value="pr">Private</option>
                            <option value="pu">Public</option>
                        </select>
                    </div>
                    <div style={{padding: "10px", textAlign: "right"}}>
                        <button onClick={this.submit} className="btn-primary">Submit</button>&nbsp;
                        <button onClick={this.props.cancel} className="btn-secondary">Cancel</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default new_tab