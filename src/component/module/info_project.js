import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircle, faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import PopConfirmation from '../popup_confirmation'
import {ApiFetch} from '../apiFetch'
import EditStatus from './edit_status'
import MemberProject from './member_project'

class info_project extends React.Component{

    constructor() {
        super();
        this.state = {
            popup: null,
            statusDeleteId: null,
            dataTeam: []
        }
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.deleteStatus = this.deleteStatus.bind(this)
        this.hidePopup = this.hidePopup.bind(this)
        this.commitDelete = this.commitDelete.bind(this)
        this.editStatus = this.editStatus.bind(this)
        this.commitEditStatus = this.commitEditStatus.bind(this)
    }
    
    componentDidMount() {
        document.addEventListener('mouseup', this.handleClickOutside)
        this.setState({
            dataTeam: this.props.dataTeam
        })
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.hideInfo()
        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    hidePopup(){
        this.setState({
            popup: null
        })
    }

    commitDelete(){
        let form = new FormData()
        form.append("projectId", this.props.projectId)
        form.append("statusId", this.state.statusDeleteId)

        ApiFetch("/delete_status", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == "true"){
                let i = 0
                this.props.dataStatus.map(dt => {
                    if(dt.id == this.state.statusDeleteId){
                        this.props.dataStatus.splice(i, 1)
                    }
                    i++
                })
                this.hidePopup()
            }
        }  )
    }

    deleteStatus(status, id){
        let text = "Are you sure you want delete <span class='bold'>"+status+"</span> as a status? make sure that no module on this status"
        this.setState({
            statusDeleteId: id,
            popup: <PopConfirmation titleConfirmation="Delete status" 
                                    textPopup={text}
                                    yesAction={this.commitDelete}
                                    hidePopUp={this.hidePopup}/>
        })
    }

    editStatus(status, id){
        this.props.dataStatus.map(dt => {
            if(dt.id == id){
                this.setState({
                    popup: <EditStatus id={dt.id} 
                                    projectId={dt.projectId} 
                                    color={dt.color} 
                                    status={status} 
                                    updateDataStatus={this.commitEditStatus}
                                    hidePopup={this.hidePopup}/>
                })
            }
        })
    }

    commitEditStatus(statusId, statusName, color){
        this.props.updateDataStatus(statusId, statusName, color)
        this.props.hideInfo()
        this.setState({
            popup: ""
        })
    }

    render(){

        const data = this.props.dataStatus.map(dt => {
            return  <div style={{fontSize: "12px", padding: "5px"}}>
                        <FontAwesomeIcon className="test" 
                                        style={{color: dt.color}} 
                                        icon={faCircle}/>&nbsp;&nbsp;{dt.status}&nbsp;&nbsp;

                        {
                            (dt.projectId != "all")
                                ?
                                    <React.Fragment>
                                        <FontAwesomeIcon 
                                            onClick={() => this.editStatus(dt.status, dt.id)}
                                            className="test" 
                                            style={{color: "rgb(154 154 154)", fontSize: "11px"}} 
                                            icon={faEdit}/>&nbsp;
                                        <FontAwesomeIcon 
                                            onClick={() => this.deleteStatus(dt.status, dt.id)}
                                            className="test" 
                                            style={{color: "rgb(154 154 154)", fontSize: "11px"}} 
                                            icon={faTrashAlt}/>
                                    </React.Fragment>
                                :
                                    ""
                        }
                    </div>
        })

        return(
            <div ref={this.setWrapperRef} className="main-border" style={{position: "absolute", width: "300px", height: "auto", background: "#FFF", zIndex: "1000", borderRadius: "3px", overflow: "hidden", marginTop: "5px"}}>
                {this.state.popup}
                <div className="bold main-border-bottom" style={{padding: "10px", background: "#dcdcdc", fontSize: "12px", color: "#000", border: "1px solid #CCC"}}>
                    Info project
                </div>
                <div style={{paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px"}}>
                    <div className="main-border" style={{overflow: "hidden", padding: "5px", borderRadius: "5px", background: "#f5f5f5", marginTop: "5px", marginBottom: "5px"}}>
                        <em class="fa fa-user-circle" style={{float: "left", fontSize: "20px", marginTop: "4px"}}>&nbsp;</em>
                        <div style={{float: "left", fontSize: "12px"}}>
                            <span style={{fontSize: "10px", color: "#949494"}}>Project Manager :</span><br/>
                            <span className="bold" style={{fontSize: "13px"}}>{this.props.picName}</span>
                        </div>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td className="bold">Name</td>
                                <td>:</td>
                                <td>{this.props.projectName}</td>
                            </tr>
                            <tr>
                                <td className="bold">Create Date</td>
                                <td>:</td>
                                <td>{this.props.createDate}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="mamber-info-base">
                        <MemberProject
                            pic={this.props.pic}  
                            data={this.state.dataTeam} 
                            manageMember={this.props.manageMember}/>
                    </div>
                    <div>
                        <div className="second-font-color bold main-border-top" style={{fontSize: "10px", padding: "5px"}}>
                            List status
                        </div>
                        <div>
                            {data}
                            <div style={{overflow: "hidden", marginTop: "5px"}}>
                                <div style={{float: "left", width: "230px"}}>
                                    <input 
                                        type="text" placeholder="insert status" 
                                        style={{padding: "5px", fontSize: "12px", width: "100%", boxSizing: "border-box"}}/>
                                </div>
                                <button className="btn-primary" style={{float: "right", fontSize: "12px"}}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default info_project