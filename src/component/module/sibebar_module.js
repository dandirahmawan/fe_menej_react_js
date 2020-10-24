import { faBullseye, faChevronDown, faClipboard, faCog, faFile, faInfoCircle, faPlus, faUserCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment } from 'react'
import ItemUser from '../item_user_list'
import {plusCircleLight as Plus} from '../svg-icon'
import {connect} from 'react-redux'
import ItemUserListMember from './item_user_list_member'
import PopupConfirmation from '../popup_confirmation'
import { ApiFetch } from '../apiFetch'
import AddMember from './add_member'
import { Add } from '@material-ui/icons'

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
    }

    componentDidMount(){
        let elm = this.sideBar.current
        let setHeight = window.innerHeight - 60
        elm.style.height = setHeight+"px"
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
                                    userId={dt.userId}
                                    emailUser={dt.emailUser}
                                    userName={dt.userName}/>
                    </div>
        })

        return(
            <Fragment>
                {this.state.popup}

                <div ref={this.sideBar} className="main-border-right second-background-grs" 
                style={{width: "250px", position: "fixed", height: "100%", zIndex: "1", overflowY: "auto"}}>
                    <div className="main-border-bottom" style={{background: "#f3f2f1", padding: "10px"}}>
                        <div style={{overflow: "hidden", padding: "5px"}}>
                            <a id="btn-edit-project" onClick={this.editProject}>
                                <em className="fa fa-edit second-font-color" style={{float: "right", fontSize: "15px", marginTop: "4px"}}>&nbsp;</em>
                            </a>
                            
                            <em class="fa fa-folder" style={{float: "left", fontSize: "20px", marginTop: "4px", color: "rgb(212, 174, 43)"}}>&nbsp;</em>
                            
                            <div style={{float: "left", fontSize: "12px", marginLeft: "5px"}}>
                                <span className="bold" style={{fontSize: "12px"}}>
                                    Project name
                                </span><br/>
                                <span className="second-font-color" style={{fontSize: "10px"}}>
                                    12 Jan 2020
                                </span>
                            </div>
                        </div>
                        <div style={{overflow: "hidden", padding: "5px"}}>
                            <em className="fa fa-user-circle" style={{float: "left", fontSize: "20px", marginTop: "4px"}}>&nbsp;</em>
                            <div style={{float: "left", fontSize: "12px", marginLeft: "5px"}}>
                                <span style={{fontSize: "10px", color: "#949494"}}>Project Manager :</span><br/>
                                <span className="bold" style={{fontSize: "12px"}}>Project manager</span>
                            </div>
                        </div>
                    </div>
                    
                    <a onClick={this.props.moduleClick} style={{textDecoration: "none", color: "#000"}}>
                        <div className="main-border-bottom tr-selectable-menu" style={{fontSize: "12px", padding: "10px"}}>
                            <div style={{width: "100%"}}>
                                <FontAwesomeIcon icon={faClipboard}/>&nbsp;&nbsp;&nbsp;&nbsp;Module
                            </div>
                        </div>
                    </a>
                    <a onClick={this.props.documentFileClick} style={{textDecoration: "none", color: "#000"}}>
                        <div className="main-border-bottom tr-selectable-menu" style={{fontSize: "12px", padding: "10px"}}>
                            <div style={{width: "100%"}}>
                                <FontAwesomeIcon icon={faFile}/>&nbsp;&nbsp;&nbsp;&nbsp;Document & File
                            </div>
                        </div>
                    </a>

                    <div className="main-border-bottom">
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
                        
                    <div className="main-border-bottom">
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
                    
                    <div className="main-border-bottom">
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