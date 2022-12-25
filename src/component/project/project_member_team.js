import React from 'react'
import { getCookieUserId } from '../../function/function'
import { baseUrl } from '../../const/const'

class project_member_team extends React.Component{
    render(){
        return(
            <div id="project-member-team" style={{float: "left", marginRight: "10px", padding: "5px", borderRadius: "5px", marginBottom: "10px", background: "#f1f1f1", border: "1px solid #e5e6e6"}}>
                <div style={{width: "25px", height: "25px", borderRadius: "15px", background: "#CCC", overflow: "hidden"}}>
                    {
                        (this.props.picProfile !== "")
                        ?
                            <div style={{background: "url("+baseUrl+"/pic_profile/"+this.props.picProfile+") no-repeat center", backgroundSize: "cover", width: "25px", height: "25px"}}/>
                        :
                            ""
                    }
                </div>
                <div className="bold" style={{marginLeft: "30px", minHeight: "20px", marginTop: "-20px", fontSize: "12px"}}>
                    {this.props.userName}&nbsp;
                    {
                        (this.props.picProject == getCookieUserId())
                        ?
                            <div id='base-set-team-member' style={{float: "right"}}>
                                {
                                    (this.props.userSet == this.props.userId) 
                                    ?
                                        <div id='popup-project-team-member' className="main-border" style={{position: "absolute", background: "#FFF", borderRadius: "5px", overflow: "hidden", width: "90px"}}>
                                            <a onClick={() => this.props.setPermition(this.props.userId)} style={{textDecoration: "none"}}>
                                                <div className='list-item' style={{padding: "5px"}}>
                                                    Permition
                                                </div>
                                            </a>
                                            <a onClick={() => this.props.deleteMember(this.props.userId, this.props.userName)} style={{textDecoration: "none"}}>
                                                <div className='list-item' style={{padding: "5px"}}>
                                                    Delete
                                                </div>
                                            </a>
                                            <a onClick={() => this.props.setTeamMember()} style={{textDecoration: "none"}}>
                                                <div className='list-item' style={{padding: "5px"}}>
                                                    Dismiss
                                                </div>
                                            </a>
                                        </div>
                                    :
                                        ""
                                }
                                <a onClick={() => this.props.setTeamMember(this.props.userId)} style={{marginLeft: "5px"}}>
                                    <i class="fa fa-ellipsis-v" style={{marginTop: "-10px"}}></i>
                                </a>
                            </div>
                        : 
                            ""
                    }
                </div>
            </div>
        )
    }
}

export default project_member_team