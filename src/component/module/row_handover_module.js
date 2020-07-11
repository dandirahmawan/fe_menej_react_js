import React from 'react'
import {baseUrl} from "../../const/const";

class row_handover_module extends React.Component{
    render(){
        return(
            <tr>
                <td>
                    <input onClick={() => this.props.select(this.props.userId)} type="checkbox"/>
                </td>
                <td>
                    <div style={{width: "30px", height: "30px", borderRadius: "15px", background: "#CCC", float: "left", overflow: "hidden"}}>
                        <div style={{background: "url("+baseUrl+"/pic_profile/"+this.props.picProfile+") center / cover no-repeat",
                            height: "30px",
                            width: "30px"}}/>
                    </div>
                    <div style={{marginTop: "3px", float: "left", marginLeft: "10px"}}>
                        <span className="bold">{this.props.userName}</span>&nbsp;
                        {
                            (this.props.userStatus == "N" || this.props.isMember == "N")
                                ? <i className="fa fa-exclamation-circle tooltip" style={{color: "red"}}/> : ""
                        }
                        <div>{this.props.userEmail}</div>
                    </div>
                </td>
            </tr>
        )
    }
}

export default row_handover_module