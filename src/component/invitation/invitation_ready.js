import React, { Component, Fragment } from 'react'
import { getCookieUserId, popUpAlert, convertDate_dd_MMM_yyy } from '../../function/function'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faCalendarAlt, faUsers } from '@fortawesome/free-solid-svg-icons'
import { ApiFetch } from '../apiFetch'
import { baseUrl } from '../../const/const'
import Fetch from '../../function/fetchApi'

class invitation_ready extends Component{

    constructor(){
        super()
        this.state = {
            dataInvitation: {},
            dataMember: []
        }

        this.base = React.createRef()
        this.accept = this.accept.bind(this)
    }

    componentDidMount(){
        this.setState({
            dataInvitation : this.props.data.viewInvitation,
            dataMember: this.props.data.dataProjectTeamList
        })
    }

    accept(){
        let dt = this.state.dataInvitation
        let form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("conf", dt.invitationCode)
        form.append("projectId", dt.projectId)

        let fetch = new Fetch()
        fetch.post("/accept_invitation", form).then(result => {
            if(result == "success"){
                window.location = "/project/"+dt.projectId
            }else if(result == "not found"){
                popUpAlert("Invitation is not found")
            }
        })
    }

    render(){

        const members = this.state.dataMember.map(dt => {
            let initial = ""
            let name = dt.userName.split(" ")
            
            initial += name[0].substr(0, 1)
            initial += (name[1] != null && name[1] != "") ? name[1].substr(0, 1) : ""
            initial = initial.toUpperCase()

            let initialBase = <div style={{position: "absolute", marginTop: "11px", fontSize: "15px", width: "40px", textAlign: "center"}}>{initial}</div>
            let picProfile = <div className="main-color" 
                                  style={{width: "40px", 
                                            height: "40px",
                                            background: "url("+baseUrl+"/pic_profile/"+dt.picProfile+") no-repeat center",
                                            backgroundSize: "cover", 
                                            borderRadius: "100%",}}/>
            let view = (dt.picProfile == null) ? initialBase : picProfile

            return <div className="main-color" 
                        style={{width: "40px", 
                                height: "40px",
                                color: "#FFF", 
                                borderRadius: "100%",
                                marginRight: "5px",
                                textAlign: "center", 
                                display: "inline-block"}}>{view}</div>
        })

        return(
            <Fragment>
                <div ref={this.base} 
                    id="inv-rdy-bs" 
                    className="main-border shadow" 
                    style={{background: "#FFF", borderRadius: "5px", width: "300px", margin: "auto", marginTop: "40px", padding: "10px"}}>
                    <div className="bold" style={{padding: "10px", fontSize: "25px", textAlign: "center"}}>
                        Invitation
                    </div>
                    <div style={{padding: "10px", fontSize: "12px"}}>
                        <div className="bold">Hi, i am {this.state.dataInvitation.userNameInviting}</div>
                        I want invite you to colaborating in menej for project
                        <div className="second-background-grs main-border" style={{padding: "10px", marginTop: "10px", borderRadius: "3px", overflow: "hidden"}}>
                            <FontAwesomeIcon icon={faFolder} style={{color: 'rgb(212, 174, 43)', fontSize: "25px", float: "left"}}/>
                            <div style={{float: "left", marginLeft: "10px"}}>
                                <div className="bold" style={{fontSize: "12px", marginTop: "5px"}}>
                                    {this.state.dataInvitation.projectName}
                                </div>
                                <div className="second-font-color" style={{fontSize: "11px", marginTop: "3px"}}>
                                    <FontAwesomeIcon icon={faCalendarAlt}/> {convertDate_dd_MMM_yyy(this.state.dataInvitation.createdDate)}
                                </div>
                            </div>
                        </div>
                        <div style={{marginTop: "15px", overflow: "hidden", textAlign: "center"}}>
                            <div className="second-font-color bold"><FontAwesomeIcon icon={faUsers}/>&nbsp;&nbsp;Current member</div>
                            <div style={{marginTop: "10px", textAlign: "center"}}>

                                {
                                    (this.state.dataMember.length > 0)
                                    ?
                                        members
                                    :
                                        <div className="second-font-color" style={{width: "180px", margin: "auto", fontSize: "11px"}}>
                                            This project not have any member currently
                                        </div>
                                }
                            
                            </div>
                        </div>
                        <div style={{marginTop: "20px"}}>
                            <button onClick={this.accept} className="bold main-border" style={styleButtonAcc}>Accept</button>
                        </div>
                        <div className="second-font-color" style={{textAlign: "center", fontSize: "11px", padding: "10px", marginTop: "10px"}}>
                            Click accept for approvement invitation, this invitation will be expired in 3 hours
                        </div>
                    </div>
                </div>
            </Fragment>
            
        )
    }
}

const styleButtonAcc = {width: "100%", 
                        fontSize: "12px", 
                        padding: "10px", 
                        color: "#3f96aa", 
                        background: "#EEE", 
                        border: "1px solid #3f96aa"}

export default invitation_ready