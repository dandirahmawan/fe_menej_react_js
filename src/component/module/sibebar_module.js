import { faBullseye, faChevronDown, faClipboard, faCog, faFile, faInfoCircle, faPaperclip, faPlus, faUserCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment } from 'react'
import {plusCircleLight as Plus} from '../svg-icon'
import {connect} from 'react-redux'
import ItemUserListMember from './item_user_list_member'
import PopupConfirmation from '../popup_confirmation'
import { ApiFetch } from '../apiFetch'
import AddMember from './add_member'
import EditProject from './edit_project'
import {check_circle as CheckCircle} from '../icon/icon'
import { getCookieUserId } from '../../function/function'
import {popUpAlert} from '../../function/function'

class sidebar_module extends React.Component{

    constructor(){
        super()

        this.state = {
            popup: null
        }

        this.sideBar = React.createRef()
        this.deleteMember = this.deleteMember.bind(this)
        this.hidePopUp = this.hidePopUp.bind(this)
        this.commitDeleteMember = this.commitDeleteMember.bind(this)
        this.addMember = this.addMember.bind(this)
        this.editProject = this.editProject.bind(this)
        this.refreshModule = this.refreshModule.bind(this)
        this.deleteProject = this.deleteProject.bind(this)
        this.commitDeleteProject = this.commitDeleteProject.bind(this)
    }

    componentDidMount(){
        let elm = this.sideBar.current
        let setHeight = window.innerHeight - 60
        elm.style.height = setHeight+"px"
        // console.log(this.props.dataProject[0])
    }

    menuClick(accordName){
        let classAccord = document.getElementsByClassName("accord-bs")
        for(let i = 0;i<classAccord.length;i++){
            let accordName1 = classAccord[i].getAttribute("accord-name")
            
            if(accordName1 == accordName){
                classAccord[i].style.display = "block"
            }
        }
    }

    deleteMember(userId, userName){
        let text = "Are you sure, you want delete <span class='bold'>"+userName+"</span> as a member from the project?"
        this.setState({
            popup: <PopupConfirmation titleConfirmation="Delete member"
                                    hidePopUp={this.hidePopUp}
                                    textPopup={text}
                                    yesAction={() => this.commitDeleteMember(userId)}/>
        })
    }

    hidePopUp(){
        this.setState({
            popup: null
        })
    }

    commitDeleteMember(userId){
        let form = new FormData()
        form.append("userDelete", userId)
        form.append("projectId", this.props.projectId)
        ApiFetch("/delete_member", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == "success"){
                this.props.deleteMember(userId)
                this.setState({
                    popup: null
                })
            }
        })
    }

    addMember(){
        this.setState({
            popup: <AddMember cancel={this.hidePopUp} 
                            dataTeam={this.props.dataTeam}
                            projectId={this.props.projectId}/>
        })
    }

    editProject(){
        this.setState({
            popup: <EditProject dataProject={this.props.dataProject[0]}
                                dataTeam={this.props.dataTeam}
                                deleteProject={this.deleteProject}
                                editDataProject={() => alert("dandi")}
                                refreshModule={this.refreshModule}
                                cancel={this.hidePopUp}/>
        })
    }

    deleteProject(){
        this.setState({
            popup: <PopupConfirmation titleConfirmation="Delete project"
                                    hidePopUp={this.hidePopUp}
                                    textPopup={"Are you sure, you want delete project <span class='bold'>"+this.props.dataProject[0].projectName+"</span>"}
                                    yesAction={this.commitDeleteProject}/>
        })
    }

    commitDeleteProject(){
        let form = new FormData()
        form.append("projectId", this.props.projectId)
        form.append("userId", getCookieUserId())
        ApiFetch("/delete_project", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == "success"){
                this.props.deleteProject()
            }else{
                this.setState({
                    popup: ""
                })
                popUpAlert(result);
            }
        })
    }

    refreshModule(){
        this.props.refreshModule()
        this.hidePopUp()
    }

    render(){

        const dataCollection = this.props.dataCollection.map(dt => {
            return <a onClick={(e) => this.props.tabMenu(e, dt.tabId)} style={{textDecoration: "none", color: "#000"}}>
                        <div className="tr-selectable" style={{paddingLeft: "30px", paddingTop: "10px", paddingBottom: "10px", background: "#f3f2f1"}}>
                            <FontAwesomeIcon className="second-font-color" icon={faBullseye}/>&nbsp;&nbsp;&nbsp;
                            {dt.tabName}
                        </div> 
                    </a>
        })

        const dataStatus = this.props.dataStatus.map(dt => {
            return <div className="regular-font" 
                        style={{fontSize: "11px", 
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

        const dataTeam = this.props.dataTeam.map(dt => {
            return <div style={{padding: "10px", paddingLeft: "25px"}}>
                        <ItemUserListMember picProfile={null}
                                    deleteMember={this.deleteMember}
                                    setPermition={this.props.setPermition}
                                    userId={dt.userId}
                                    emailUser={dt.emailUser}
                                    userName={dt.userName}/>
                    </div>
        })

        return(
            <Fragment>
                {this.state.popup}

                <div ref={this.sideBar} className="second-background-grs" 
                style={{width: "250px", position: "fixed", height: "100%", zIndex: "1", overflowY: "auto", borderRight: "1px solid #dcdcdc"}}>
                    <div style={{background: "#f3f2f1", padding: "10px", borderBottom: "1px solid #dcdcdc"}}>
                        <div style={{overflow: "hidden", padding: "5px"}}>
                            <a id="btn-edit-project" onClick={this.editProject}>
                                <em className="fa fa-edit second-font-color" style={{float: "right", fontSize: "15px", marginTop: "4px"}}>&nbsp;</em>
                            </a>
                            
                            <em class="fa fa-folder" style={{float: "left", fontSize: "20px", marginTop: "4px", color: "rgb(212, 174, 43)"}}>&nbsp;</em>
                            
                            <div style={{float: "left", fontSize: "12px", marginLeft: "5px"}}>
                                <span className="bold" style={{fontSize: "12px"}}>
                                    {this.props.dataProject[0].projectName}
                                </span><br/>
                                <span className="second-font-color" style={{fontSize: "10px"}}>
                                    {this.props.dataProject[0].createdDate}
                                </span>
                            </div>
                        </div>
                        <div style={{overflow: "hidden", padding: "5px"}}>
                            <em className="fa fa-user-circle" style={{float: "left", fontSize: "20px", marginTop: "4px"}}>&nbsp;</em>
                            <div style={{float: "left", fontSize: "12px", marginLeft: "5px"}}>
                                <span style={{fontSize: "10px", color: "#949494"}}>Project Manager :</span><br/>
                                <span className="bold" style={{fontSize: "12px"}}>
                                    {this.props.dataProject[0].picName}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <a onClick={this.props.moduleClick} style={{textDecoration: "none", color: "#000"}}>
                        <div className="tr-selectable-menu" style={{fontSize: "12px", padding: "10px", borderBottom: "1px solid #dcdcdc"}}>
                            <div style={{width: "100%"}}>
                                {/* <FontAwesomeIcon icon={faClipboard}/> */}
                                <CheckCircle style={{fontSize: "13px"}}/>&nbsp;&nbsp;&nbsp;Task list
                            </div>
                        </div>
                    </a>
                    <a onClick={this.props.documentFileClick} style={{textDecoration: "none", color: "#000"}}>
                        <div className="tr-selectable-menu" style={{fontSize: "12px", padding: "10px", borderBottom: "1px solid #dcdcdc"}}>
                            <div style={{width: "100%"}}>
                                <FontAwesomeIcon icon={faPaperclip}/>&nbsp;&nbsp;&nbsp;&nbsp;Attachment
                            </div>
                        </div>
                    </a>

                    <div style={{borderBottom: "1px solid #dcdcdc"}}>
                        <a style={{textDecoration: "none", color: "#000"}}>
                            <div onClick={() => this.menuClick("member-project")} className="tr-selectable-menu" style={{fontSize: "12px", padding: "10px"}}>
                                <div style={{width: "100%", display: "flex"}}>
                                    <FontAwesomeIcon icon={faChevronDown}/>
                                    <div style={{width: "100%", marginLeft: "10px"}}>Project Member</div>
                                    {/* <a onClick={this.props.manageMember} className="tooltip"> */}
                                    <a onClick={this.addMember} className="tooltip">
                                        <Plus style={{fontSize: "13px"}}/>
                                        {/* <FontAwesomeIcon icon={faUserCog}/> */}
                                        {/* <div className="tooltiptext" style={{position: "fixed"}}>Manage Member</div> */}
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div accord-name="member-project" className="accord-bs" style={{marginBottom: "10px", display: "none"}}>
                            {dataTeam}
                        </div>
                    </div>
                        
                    <div style={{borderBottom: "1px solid #dcdcdc", display: "none"}}>
                        <a style={{textDecoration: "none", color: "#000"}}>
                            <div onClick={() => this.menuClick("status")} className="tr-selectable-menu" style={{fontSize: "12px", padding: "10px"}}>
                                <div style={{width: "100%", display: "flex"}}>
                                    <FontAwesomeIcon icon={faChevronDown}/>
                                    <div style={{width: "100%", marginLeft: "10px"}}>Status Module</div>
                                    <a onClick={this.props.manageStatus} className="tooltip">
                                        <FontAwesomeIcon icon={faCog}/>
                                        {/* <div className="tooltiptext" style={{position: "fixed"}}>Manage Status</div> */}
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div accord-name="status" className="accord-bs bold" style={{paddingLeft: "0px", fontSize: "12px", display: "none"}}>
                            <div style={{overflow: "hidden", padding: "10px", paddingLeft: "30px"}}>
                                {dataStatus}
                            </div>
                        </div>
                    </div>
                    
                    <div style={{borderBottom: "1px solid #dcdcdc"}}>
                        <a style={{textDecoration: "none", color: "#000"}}>
                            <div onClick={() => this.menuClick("collection")} className="tr-selectable-menu" style={{fontSize: "12px", padding: "10px"}}>
                                <div style={{width: "100%", display: "flex"}}>
                                    <FontAwesomeIcon icon={faChevronDown}/>
                                    <div style={{width: "100%", marginLeft: "10px"}}>Collection</div>
                                    <a onClick={this.props.newCollection} className="tooltip">
                                        <Plus style={{fontSize: "13px"}}/>
                                        {/* <div className="tooltiptext" style={{position: "fixed"}}>New collection</div> */}
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div accord-name="collection" className="accord-bs bold" style={{paddingLeft: "0px", fontSize: "12px", display: "none"}}>
                            {
                                (dataCollection != "")
                                ?
                                    dataCollection
                                :
                                    <div className="regular-font second-font-color" style={{padding: "15px", textAlign: "center"}}>
                                        <FontAwesomeIcon icon={faInfoCircle}/>&nbsp;
                                        Data collection not found
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        dataTeam : state.dataTeam
    }
}

export default connect(mapStateToProps) (sidebar_module)