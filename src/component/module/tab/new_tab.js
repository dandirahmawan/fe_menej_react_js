import React from 'react'
import ReactDom from 'react-dom'
import {getCookieSessionId, getCookieUserId, popCenterPosition, popUpAlert} from "../../../function/function";
import {SpinnerButton} from "../../spinner";
import {baseUrl} from "../../../const/const";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe, faLock, faUser} from "@fortawesome/free-solid-svg-icons";

class new_tab extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            privacyIcon : <FontAwesomeIcon style={{float: "left", marginTop: "4px"}} icon={faLock}/>,
            privacy: "pr"
        }
        this.submit = this.submit.bind(this)
        this.inputTabName = React.createRef()
        this.privacyChange = this.privacyChange.bind(this)
    }


    componentDidMount(){
        popCenterPosition("base-new-tab")
    }

    submit(e){
        let t = e.target
        let val = this.inputTabName.current.value
        if(val != 0){
            e.target.style.opacity = 0.5
            e.target.style.minWidth = "50px"
            ReactDom.render(<SpinnerButton size="15px"/>, e.target)
            alert(this.state.privacy)
            let form = new FormData()
            form.append("userId", getCookieUserId())
            form.append("sessionId", getCookieSessionId())
            form.append("projectId", this.props.projectId)
            form.append("prv", this.state.privacy)
            form.append("tabName", val)
            fetch(baseUrl+"/new_tab", {
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
                        fetch(baseUrl+"/tab_list", {
                            method: "POST",
                            body: form
                        }).then(res => res.json()).then(result => {
                            this.props.updateDataTab(result)
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

    render(){
        return(
            <React.Fragment>
                <div className="block"/>
                <div id="base-new-tab" className="pop" style={{background: "#FFF", borderRadius: "4px", overflow: "hidden"}}>
                    <div className="bold main-border-bottom second-background-grs" style={{padding: "10px"}}>New tab</div>
                    <div style={{padding: "11px"}}>
                        <span className="bold" style={{fontSize: "10px"}}>Tab name :</span><br/>
                        <input ref={this.inputTabName} type="text" placeholder="tab name" style={{padding: "5px", width: "200px"}}/>
                    </div>
                    <div style={{padding: "11px", paddingTop: "0px"}}>
                        <span className="bold" style={{fontSize: "10px"}}>Privacy :</span><br/>
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