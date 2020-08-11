import React from 'react'
import {baseUrl} from '../const/const'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlus, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

class item_user_add_member_selected extends React.Component{

    constructor(){
        super()
        this.btnInvite = React.createRef()
        this.invite = this.invite.bind(this)
    }

    invite(){
        this.props.invite(this.btnInvite.current, this.props.userId)
    }

    render(){

        const isChecked = (this.props.userSelected == "Y") ? 
            <input type="checkbox" checked onClick={() => this.props.checkRemoveMember(this.props.userId)} style={{float: "left", marginTop: "6px", marginRight: "10px"}}></input> 
            : <input type="checkbox" onClick={() => this.props.checkRemoveMember(this.props.userId)} style={{float: "left", marginTop: "6px", marginRight: "10px"}}></input>

        return(
            <a style={{color:"#000", textDecoration: "none"}}>
            <div className="list-item" style={{padding: "10px", overflow: "hidden"}}>
                {isChecked} 
                <div style={{float: "left"}}>
                    <div style={{borderRadius: "15px", height: "25px", width: "25px", background: "#CCC", overflow: "hidden"}}>
                        {
                            (this.props.picProfile)
                            ?
                                <div style={{background: "url("+baseUrl+"/pic_profile/"+this.props.picProfile+") no-repeat center", backgroundSize: "cover", width: "25px", height: "25px"}}/>
                            :
                                ""
                        }
                    </div>
                    <div style={{marginLeft: "35px", marginTop: "-30px"}}>
                        <span className="bold" style={{fontSize: "12px"}}>{this.props.userName}</span>
                        <div className="reguler-font" style={{fontSize: "11px"}}>{this.props.userEmail}</div>
                        <a onClick={this.props.setPermition} className="bold" style={{fontSize: "10px"}}>
                            <FontAwesomeIcon icon={faCog}/> Permition
                        </a>&nbsp;&nbsp;&nbsp;
                        {
                            (this.props.isRelated == "N")
                            ?
                                (this.props.isInvited != "Y")
                                ?
                                    <a ref={this.btnInvite} onClick={this.invite} className="bold" style={{fontSize: "10px", color: "green"}}>
                                        <FontAwesomeIcon icon={faPlus}/> Invite
                                    </a>
                                :
                                    <a onClick={this.props.cancelRequest} className="bold second-font-color" style={{fontSize: "10px"}}>
                                        <FontAwesomeIcon icon={faTimesCircle}/> Cancel request
                                    </a>
                            :
                                ""
                        }
                    </div>
                </div>
            </div></a>
        )
    }
}

export default item_user_add_member_selected