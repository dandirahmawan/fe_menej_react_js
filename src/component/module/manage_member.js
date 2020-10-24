import React from 'react'
import { popCenterPosition } from '../../function/function'
import PopupConfirmation from '../popup_confirmation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddMember from './add_member'
import { faUserAlt, faUsers, faCog, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { ApiFetch } from '../apiFetch'
import Permiton from './permition'
import { connect } from 'react-redux'

class add_member extends React.Component{    

    constructor(){
        super()
        this.state = {
            popup: null,
            dataTeam:[]
        }

        this.addMember = this.addMember.bind(this)
        this.blockClick = this.blockClick.bind(this)
        this.deleteMember = this.deleteMember.bind(this)
        this.commitDelete = this.commitDelete.bind(this)
        this.hidePopUp = this.hidePopUp.bind(this)
    }

    componentDidMount(){
        popCenterPosition("base-member-team-project")
        this.setState({
            dataTeam: this.props.dataTeam
        })
    }

    blockClick(){
        if(this.state.popup != null){
            let elm = document.getElementById("base-member-team-project")
            elm.style.zIndex = 1000
            this.setState({
                popup: null
            })
        }else{
            this.props.cancel()
        }
    }

    addMember(){
        let elm = document.getElementById("base-member-team-project")
        elm.style.zIndex = 999
        this.setState({
            popup: <AddMember 
                        dataTeam={this.props.dataTeam} 
                        projectId={this.props.projectId}
                        cancel={this.blockClick}/>
        })
    }

    deleteMember(userId, userName){
        let text = "Are you sure, you want delete <span class='bold'>"+userName+"</span> as a member from the project?"
        this.setState({
            popup: <PopupConfirmation titleConfirmation="Delete member"
                                    hidePopUp={this.hidePopUp}
                                    textPopup={text}
                                    yesAction={() => this.commitDelete(userId)}/>
        })
    }

    commitDelete(userId){
        let form = new FormData()
        form.append("userDelete", userId)
        form.append("projectId", this.props.projectId)
        ApiFetch("/delete_member", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == "success"){
                this.hidePopUp()
                this.props.deleteMember(userId)
                this.setState({})
            }
        })
    }

    hidePopUp(){
        this.setState({
            popup: null
        })
    }

    setMemberPermition(userId){
        let elm = document.getElementById("base-member-team-project")
         elm.style.zIndex = 999
        
         this.setState({
            popup: <Permiton dataPermition={[]}
                            cancelPermition={this.blockClick}
                            userId={userId} 
                            projectId={this.props.projectId}/>
        })
    }

    render(){

        let countMember = 0
        const dataView = this.props.dataTeam.map(dt => {
            if(dt.isDelete != "Y"){
                countMember++
                return <div className="tr-selectable" style={{overflow: "hidden"}}>
                            <div style={{padding: "10px", float: "left"}}>
                                <div style={{width: "30px", height: "30px", borderRadius: "100%", background: "#CCC", float: "left"}}></div>
                            </div>
                            
                            <div style={{overflow: "hidden", paddingTop: "10px", paddingBottom: "10px", marginRight: "10px", borderBottom: "1px solid #ebeaea"}}>
                                <div className="bold" style={{fontSize: "10px", marginTop: "10px", float: "right"}}>
                                    <a onClick={() => this.setMemberPermition(dt.userId)}><FontAwesomeIcon icon={faCog}/></a>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <a onClick={() => this.deleteMember(dt.userId, dt.userName)}><FontAwesomeIcon icon={faTrashAlt}/></a>
                                </div>

                                <div style={{float: "left", marginTop: "2px"}}>
                                    <div style={{fontSize: "12px"}}>{dt.userName}</div>
                                    <div className="bold second-font-color" style={{fontSize: "11px"}}>{dt.emailUser}</div>
                                </div>
                            </div>
                        </div>
            }
        })

        return(
            <React.Fragment>
                <div onClick={this.blockClick} className="block"></div>
                {this.state.popup}
                <div id='base-member-team-project' className="main-border" style={{background: "#FFF", position: "fixed", zIndex: "1000", borderRadius: "3px"}}>
                    <div id="main-base-add-member" style={{width: "400px", height: "350px"}}>
                        <div id="header-add-member" className="bold main-border-bottom" style={{padding: "10px", fontSize: "14px", overflow: "hidden"}}>
                            <div style={{float: "left", marginTop: "4px"}}><FontAwesomeIcon icon={faUsers}/>&nbsp;&nbsp;List member</div>
                            <button onClick={this.addMember} className="btn-primary" style={{float: "right", fontSize: "10px"}}>
                                <FontAwesomeIcon icon={faUserAlt}/>&nbsp;&nbsp;Add member
                            </button>
                        </div>
                        
                        <div class="main-add-member">
                            {
                                (countMember > 0)
                                ?
                                    dataView
                                : 
                                    <div style={{textAlign: "center", marginTop: "25px"}}>
                                        <FontAwesomeIcon className="second-font-color" icon={faUsers} style={{fontSize: "35px"}}/>
                                        <div className="second-font-color" style={{fontSize: "12px", marginTop: "10px"}}>No data to display<br/>there's no member in this project</div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        dataTeam : state.dataTeam
    }
}

export default connect(mapStateToProps) (add_member)