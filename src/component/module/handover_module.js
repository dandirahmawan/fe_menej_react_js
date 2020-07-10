import React from 'react'
import ReactDom from 'react-dom'
import {getCookieSessionId, getCookieUserId, popCenterPosition, popUpAlert} from "../../function/function"
import Row from './row_handover_module'
import RowTo from './row_handover_module_to'
import {ApiFetch} from '../apiFetch'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClipboard} from '@fortawesome/free-solid-svg-icons'
import {baseUrl} from "../../const/const";
import {SpinnerButton, Spinner} from "../spinner";

class handover_module extends React.Component{

    constructor(){
        super()
        this.state = {
            dataUserFrom: [],
            dataUserTo: [],
            isLoad: true
        }

        this.baseHandover = React.createRef()
        this.selectFromUser = this.selectFromUser.bind(this)
        this.selectToUser = this.selectToUser.bind(this)
        this.submitHandover = this.submitHandover.bind(this)
    }

    componentDidMount(){
        popCenterPosition("bs-handover-module")

        let form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("projectId", this.props.projectId)

        ApiFetch("/user_handover", {
            method: "POST",
            body: form
        }).then(res => res.json())
        .then(result => {
            this.baseHandover.current.style.display = "block"
            this.setState({
                dataUserFrom: result,
                dataUserTo: result,
                isLoad: false
            })
        })
    }

    selectFromUser(userId){
        const newData = this.state.dataUserFrom.map(dt => {
            if(dt.userId == userId){
                if(dt.isSelectedFrom){
                    dt.isSelectedFrom = false
                }else{
                    dt.isSelectedFrom = true
                }
            }
            return dt
        })
        this.setState({
            dataUserFrom : newData
        })
    }

    selectToUser(userId){
        const newData = this.state.dataUserTo.map(dt => {
            if(dt.userId == userId){
                dt.isSelected = true
            }else{
                dt.isSelected = false
            }
            return dt
        })

        this.setState({
            dataUserTo : newData
        })
    }

    submitHandover(e){
        let from = []
        let to = null

        this.state.dataUserFrom.map(dt => {
            if(dt.isSelectedFrom){
                from.push(dt.userId)
            }
        })

        this.state.dataUserTo.map(dt => {
            if(dt.isSelected){
                to = dt.userId
            }
        })

        if(from.length == 0){
            popUpAlert("No source user selected");
            return false
        }

        if(to == null){
            popUpAlert("No target user selected");
            return false
        }

        ReactDom.render(<SpinnerButton size="15px"/>, e.target)
        e.target.style.opacity = 0.5

        let form = new FormData()
        form.append("user_f", from)
        form.append("user_t", to)
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("projectId", this.props.projectId)

        ApiFetch("/handover_module", {
            method: "POST",
            body: form
        }).then(res => res.text())
            .then(result => {
                if(result == ""){
                    this.props.cancel()
                    this.props.refreshModule()
                }
            })
    }

    render(){

        const data = this.state.dataUserFrom.map(dt => {
            console.log(dt.isMember+" "+dt.userStatus+" "+dt.hasModule)
            if((dt.userStatus == 'N' && dt.hasModule == 'Y') 
                || dt.userStatus != 'N')
                // || (dt.isMember != 'N' && dt.hasModule == 'Y'))
            {
                return <Row userId={dt.userId}
                            userName={dt.userName}
                            picProfile={dt.picProfile}
                            hasModule={dt.hasModule}
                            userStatus={dt.userStatus}
                            isMember={dt.isMember}
                            select={this.selectFromUser}
                            userEmail={dt.emailUser}/>
            }
        })

        const data2 = this.state.dataUserFrom.map(dt => {
            if(dt.userStatus != "N" && dt.isMember != "N") {
                return <RowTo userId={dt.userId}
                              userName={dt.userName}
                              picProfile={dt.picProfile}
                              select={this.selectToUser}
                              isSelected={dt.isSelected}
                              userEmail={dt.emailUser}/>
            }
        })

        return(
            <React.Fragment>
                <div className="block"/>
                <div id="bs-handover-module" className="pop" style={{width: "600px", background: "#FFF"}}>
                    <div className="bold" style={{padding: "10px", fontSize: "14px"}}>
                        Handover module
                    </div>

                    {
                        (this.state.isLoad)
                        ?
                            <div style={{textAlign: "center", height: "300px"}}>
                                <Spinner size="25px"/>
                                <span className="second-font-color bold" style={{fontSize: "12px"}}>Loading..</span>
                            </div>
                        :
                            ""
                    }

                    <div ref={this.baseHandover} style={{height: "300px", paddingRight: "10px", paddingLeft: "10px", display: "none"}}>
                        <div className="main-border" style={{width: "280px", height: "300px", float: "left", overflowY: "scroll", overflowX: "hidden"}}>
                            <div className="main-border-bottom second-background-grs bold" style={{padding: "5px", fontSize: "12px", position: "fixed", width: "270px"}}>
                                Source user
                            </div>
                            <table style={{width: "280px", marginTop: "25px"}}>
                                <tbody>
                                    {data}
                                </tbody>
                            </table>
                        </div>
                        <div className="main-border" style={{width: "280px", height: "300px", float: "right", overflowY: "scroll", overflowX: "hidden"}}>
                            <div className="main-border-bottom second-background-grs bold" style={{padding: "5px", fontSize: "12px", position: "fixed", width: "270px"}}>
                                Target user
                            </div>
                            <table style={{marginTop: "25px", width: "280px"}}>
                                <tbody>
                                    {data2}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div style={{textAlign: "right", padding: "10px"}}>
                        <button onClick={this.submitHandover} className="btn-primary" style={{marginRight: "10px"}}>Submit</button>
                        <button onClick={this.props.cancel} className="btn-secondary">Cancel</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default handover_module