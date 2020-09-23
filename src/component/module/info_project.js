import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCog} from '@fortawesome/free-solid-svg-icons'
import PopConfirmation from '../popup_confirmation'
import {ApiFetch} from '../apiFetch'
import EditStatus from './edit_status'
import MemberProject from './member_project'
import { getCookieUserId } from '../../function/function'
import ManageStatus from './manage_status'
import EditProject from './edit_project'

class info_project extends React.Component{

    constructor() {
        super();
        this.state = {
            popup: null,
            dataStatus: [],
            statusDeleteId: null,
            dataTeam: [],
            isPermitionModule: false
        }
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.deleteStatus = this.deleteStatus.bind(this)
        this.hidePopup = this.hidePopup.bind(this)
        this.commitDelete = this.commitDelete.bind(this)
        this.editStatus = this.editStatus.bind(this)
        this.commitEditStatus = this.commitEditStatus.bind(this)
        this.manageStatus = this.manageStatus.bind(this)
        this.updateDataStatus = this.updateDataStatus.bind(this)
        this.editProject = this.editProject.bind(this)
        this.refreshModule = this.refreshModule.bind(this)
    }
    
    componentDidMount() {
        document.addEventListener('mouseup', this.handleClickOutside)
        console.log(this.props.dataTeam)
        this.setState({
            dataTeam: this.props.dataTeam,
            dataStatus: this.props.dataStatus
        })

        this.props.dataPermition.map(dt => {
            if(dt.permitionCode == 1 && dt.isChecked == 'Y'){
                this.state.isPermitionModule = true
            }            
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

    commitEditStatus(jsonData){
        this.props.updateDataStatus(jsonData)
        this.props.hideInfo()
        this.setState({
            popup: ""
        })
    }

    manageStatus(){
        this.setState({
            popup: <ManageStatus dataStatus={this.props.dataStatus} 
                                projectId={this.props.dataProject.projectId}
                                updateDataStatus={this.updateDataStatus} 
                                cancel={this.hidePopup}/>
        })
    }

    updateDataStatus(jsonData){
        this.props.updateDataStatus(jsonData)
        this.setState({
            dataStatus: jsonData
        })
    }

    editProject(){
        this.setState({
            popup: <EditProject dataProject = {this.props.dataProject}
                                dataTeam={this.state.dataTeam} 
                                refreshModule = {this.refreshModule} 
                                cancel={this.hidePopup}/>
        })
    }

    refreshModule(){
        this.props.refreshModule()
        this.props.hideInfo()
        this.setState({
            popup: null
        })
    }

    render(){

        const data = this.state.dataStatus.map(dt => {
            return  <div style={{fontSize: "11px", 
                                padding: "5px", 
                                background: dt.color, 
                                float: "left", 
                                borderRadius: "3px", 
                                marginRight: "5px",
                                color: "#FFF", 
                                marginBottom: "5px"}}>
                        {dt.status}
                    </div>
        })

        return(
            <div ref={this.setWrapperRef} className="main-border" style={{position: "absolute", width: "300px", height: "auto", background: "#FFF", zIndex: "1000", borderRadius: "3px", overflow: "hidden", marginTop: "5px"}}>
                {this.state.popup}
                <div className="bold main-border-bottom" style={{padding: "10px", background: "#dcdcdc", fontSize: "12px", color: "#000", border: "1px solid #CCC"}}>
                    Info project
                </div>
                <div style={{paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px", marginTop: "5px"}}>
                    <div className="main-border" style={{background: "#f5f5f5", borderRadius: "5px"}}>
                        <div style={{overflow: "hidden", padding: "5px"}}>
                            {
                                (getCookieUserId() == this.props.dataProject.pic)
                                ?
                                    <a id="btn-edit-project" onClick={this.editProject}>
                                        <em className="fa fa-edit second-font-color" style={{float: "right", fontSize: "15px", marginTop: "4px"}}>&nbsp;</em>
                                    </a>
                                : ""
                            }
                            
                            
                            <em class="fa fa-folder" style={{float: "left", fontSize: "20px", marginTop: "4px", color: "rgb(212, 174, 43)"}}>&nbsp;</em>
                            
                            <div style={{float: "left", fontSize: "12px", marginLeft: "5px"}}>
                                <span className="bold" style={{fontSize: "12px"}}>{this.props.dataProject.projectName}</span><br/>
                                <span className="second-font-color" style={{fontSize: "10px"}}>{this.props.dataProject.createdDate}</span>
                            </div>
                        </div>
                        <div style={{overflow: "hidden", padding: "5px"}}>
                            <em className="fa fa-user-circle" style={{float: "left", fontSize: "20px", marginTop: "4px"}}>&nbsp;</em>
                            <div style={{float: "left", fontSize: "12px", marginLeft: "5px"}}>
                                <span style={{fontSize: "10px", color: "#949494"}}>Project Manager :</span><br/>
                                <span className="bold" style={{fontSize: "12px"}}>{this.props.dataProject.picName}</span>
                            </div>
                        </div>
                    </div>
                    <div id="mamber-info-base">
                        <MemberProject
                            pic={this.props.dataProject.pic}  
                            data={this.state.dataTeam}
                            dataPermition={this.props.dataPermition} 
                            manageMember={this.props.manageMember}/>
                    </div>
                    <div>
                        <div className="second-font-color bold main-border-top" style={{fontSize: "10px", padding: "5px"}}>
                            Status module
                            {
                                (this.props.dataProject.pic == getCookieUserId() || this.state.isPermitionModule)
                                ?
                                    <a onClick={this.manageStatus} style={{float: "right"}}><FontAwesomeIcon icon={faCog}/> Manage</a>
                                : ""
                            }
                        </div>
                        <div style={{padding: "5px", overflow: "hidden"}}>
                            {data}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default info_project