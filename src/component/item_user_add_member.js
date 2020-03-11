import React from 'react'
import {baseUrl} from '../const/const'

class item_user_add_member extends React.Component{
    render(){

        const isChecked = (this.props.userSelected == "Y") ? 
            <input type="checkbox" checked onClick={() => this.props.checkAddMember(this.props.userId)} style={{float: "left", marginTop: "6px", marginRight: "10px"}}></input> 
            : <input type="checkbox" onClick={() => this.props.checkAddMember(this.props.userId)} style={{float: "left", marginTop: "6px", marginRight: "10px"}}></input>

        return(
            <a /*onClick={() => this.props.userSelected(this.props.userEmail, this.props.userId, this.props.userName)}*/ style={{color:"#000", textDecoration: "none"}}>
            <div className="list-item" style={{padding: "10px", overflow: "hidden"}}>
                {isChecked}
                <div style={{float: "left"}}>
                    <div style={{borderRadius: "15px", height: "25px", width: "25px", background: "#CCC", overflow: "hidden"}}>
                        {
                            (this.props.picPrifile !== "")
                            ?
                                <div style={{background: "url("+baseUrl+"/pic_profile/"+this.props.picProfile+") no-repeat center", backgroundSize: "cover", width: "25px", height: "25px"}}/>
                            :
                                ""
                        }
                    </div>
                    <div style={{marginLeft: "35px", marginTop: "-30px"}}>
                        <span className="bold" style={{fontSize: "12px"}}>{this.props.userName}</span>
                        <div className="reguler-font" style={{fontSize: "11px"}}>{this.props.userEmail}</div>
                    </div>
                </div>
            </div></a>
        )
    }
}

export default item_user_add_member