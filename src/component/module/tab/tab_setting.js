import React from 'react'
import ReactDom from 'react-dom'
import Triangle from "../../../images/triangle.png"
import {SpinnerButton} from "../../spinner"
import {faGlobe, faLock, faUser} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {baseUrl} from "../../../const/const";
import {getCookieSessionId, getCookieUserId} from "../../../function/function";

class tab_setting extends React.Component{

    constructor(){
        super()
        this.state = {
            tabName: null,
            privacy: null,
            iconPrivacy: null
        }
        this.submit = this.submit.bind(this)
        this.privacyChange = this.privacyChange.bind(this)
        this.changeTabNameHandler = this.changeTabNameHandler.bind(this)
    }

    componentDidMount(){
        let icon = ""
        if(this.props.privacy == "pu"){
            icon = <FontAwesomeIcon style={{float: "left", marginTop: "4px"}} icon={faGlobe}/>
        }else if(this.props.privacy == "pr" || this.props.privacy == null){
            icon = <FontAwesomeIcon style={{float: "left", marginTop: "4px"}} icon={faLock}/>
        }else{
            icon = <FontAwesomeIcon style={{float: "left", marginTop: "4px"}} icon={faUser}/>
        }
        this.setState({
            tabName : this.props.tabName,
            privacy : (this.props.privacy == null) ? "pr" : this.props.privacy,
            iconPrivacy : icon
        })
    }

    submit(e){
        ReactDom.render(<SpinnerButton size="15px"/>, e.target)
        e.target.style.opacity = 0.4

        let form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("tabName", this.state.tabName)
        form.append("prv", this.state.privacy)
        form.append("tabId", this.props.tabId)
        fetch(baseUrl+"/edit_tab", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == "") {
                this.props.editTab(this.state.tabName, this.state.privacy)
                this.props.cancel()
            }
        })
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
            iconPrivacy: icon
        })
    }

    changeTabNameHandler(e){
        let val = e.target.value
        this.setState({
            tabName: val
        })
    }

    render(){
        return(
            <React.Fragment>
                <div id="tab-setting-base"
                     className="main-border"
                     style={{position: "absolute",
                                background: "#FFF",
                                width: "220px", borderRadius: "3px",
                                marginTop: "30px", marginLeft: "-80px"}}>
                    <div style={{width: "15px", marginTop: "-15px", marginLeft: "110px"}}>
                        <img src={Triangle} style={{height: "12px"}}></img>
                    </div>
                    <div className="bold main-border-bottom" style={{fontSize: "12px", padding: "5px", paddingLeft: "10px", paddingRight: "10px"}}>Setting</div>
                    <div style={{padding: "10px", paddingLeft: "10px", paddingRight: "10px"}}>
                        <div className="bold" style={{fontSize: "11px", marginBottom: "3px"}}>Tab name :</div>
                        <input onChange={this.changeTabNameHandler}
                               type="text"
                               value={this.state.tabName}
                               placeholder="tab name"
                               style={{padding: "5px", marginBottom: "10px"}}
                        />
                        <div className="bold" style={{fontSize: "11px", marginBottom: "3px"}}>Privacy :</div>
                        <div style={{overflow: "hidden"}}>
                            {this.state.iconPrivacy}
                            <select onChange={this.privacyChange}
                                    value={this.state.privacy}
                                    style={{fontSize: "12px", float: "left", border: "none", outline: "none"}}>
                                <option value="pr">Private</option>
                                <option value="pu">Public</option>
                                <option value="us">Users</option>
                            </select>
                        </div>
                    </div>
                    <div className="bold main-border-top" style={{fontSize: "12px", padding: "5px", paddingLeft: "10px", paddingRight: "10px", textAlign: "right"}}>
                        <button onClick={this.submit} className="btn-primary"
                                style={{fontSize: "12px", marginRight: "5px"}}>
                            Submit
                        </button>
                        <button onClick={this.props.cancel}
                                className="btn-secondary"
                                style={{fontSize: "12px"}}>
                            Cancel
                        </button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default tab_setting