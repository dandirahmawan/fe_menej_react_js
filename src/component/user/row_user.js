import React from 'react'
import {baseUrl} from "../../const/const"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import {getCookieSessionId, getCookieUserId} from "../../function/function"
import PopConfirmation from '../popup_confirmation'
import {ApiFetch} from '../apiFetch'

class row_user extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            popup: null
        }

        this.commitDelete = this.commitDelete.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.hidePopup = this.hidePopup.bind(this)
    }


    commitDelete(userId){
        var form = new FormData()
        form.append("userId", userId)
        form.append("sessionId", getCookieSessionId())
        form.append("userIdLogin", getCookieUserId())

        ApiFetch("/delete_user", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            this.props.delete(this.props.userId)
        })
    }


    deleteUser(e, userId){
        this.setState({
            popup: <PopConfirmation
                titleConfirmation="Delete user"
                textPopup="Are you sure, you want delete user ?"
                hidePopUp={this.hidePopup}
                yesAction={() => this.commitDelete(userId)}/>
        })
        e.stopPropagation()
    }

    hidePopup(){
        this.setState({
            popup: null
        })
    }

    render(){
        return(
            <React.Fragment>
                {this.state.popup}
                <tr onClick={() => this.props.rowClick(this.props.userId)} className="tr-selectable" style={{paddingTop: "5px", paddingBottom: "5px"}}>
                    <td style={{width: "30px"}}>
                        <div style={{width:"25px", height: "25px", borderRadius: "5px", background: "#CCC", overflow: "hidden"}}>
                            {
                                (this.props.picProfile !== "")
                                ?
                                    <div style={{background: "url("+baseUrl+"/pic_profile/"+this.props.picProfile+") no-repeat center center / cover", width: "25px", height: "25px"}}/>
                                :
                                    ""
                            }

                        </div>
                    </td>
                    <td style={{paddingTop: "5px", paddingBottom: "5px", borderBottom: "1px solid #e6e5e5"}}>
                        <div>
                            <span className="bold">{this.props.userName}</span><br/>
                            <span className="second-font-color" style={{fontSize: "11px"}}>
                                {this.props.emailUser}
                                {/*{this.props.picProfile}*/}
                            </span>
                        </div>
                    </td>
                    <td style={{borderBottom: "1px solid #e6e5e5", fontSize: "11px"}}>
                        {/* {this.props.emailUser} */}
                        10 September 2020
                    </td>
                    <td style={{borderBottom: "1px solid #e6e5e5", fontSize: "11px"}}>{this.props.countModule} Module</td>
                    <td style={{borderBottom: "1px solid #e6e5e5", fontSize: "11px"}}>{this.props.countBugs} Bugs</td>
                    <td style={{borderBottom: "1px solid #e6e5e5", fontSize: "11px"}}>{this.props.countDocFile} Doc File</td>
                    <td style={{borderBottom: "1px solid #e6e5e5", fontSize: "11px", width: "50px"}}>
                        <button onClick={(e) => this.deleteUser(e, this.props.userId)} style={{background: "none",}}>
                            <FontAwesomeIcon className="second-font-color" style={{fontSize: "15px"}} icon={faTrashAlt}/>
                        </button>
                    </td>
                </tr>
            </React.Fragment>
        )
    }
}

export default row_user