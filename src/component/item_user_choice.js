import React from 'react'
import {baseUrl} from '../const/const'

class item_user_choice extends React.Component{
    render(){
        return(
            <a /*onClick={() => this.props.userSelected(this.props.userEmail, this.props.userId, this.props.userName)}*/ style={{color:"#000", textDecoration: "none"}}>
            <div className="list-item" style={{padding: "10px"}}>
                <input type="checkbox" onClick={() => this.props.select(this.props.userId)} style={{marginTop: "6px", float: "left"}}/>
                <div style={{borderRadius: "100%", height: "25px", width: "25px", background: "#CCC", overflow: "hidden", marginLeft: "25px"}}>
                    {
                        (this.props.picProfile !== "" && this.props.picProfile !== undefined)
                        ?
                            <div style={{background: "url("+baseUrl+"/pic_profile/"+this.props.picProfile+") no-repeat center", backgroundSize: "cover", width: "25px", height: "25px"}}/>
                        :
                            ""
                    }
                </div>
                <div style={{marginLeft: "60px", marginTop: "-25px"}}>
                    <span className="bold">{this.props.userName}</span><br/>
                    <span className="reguler-font" style={{fontSize: "11px"}}>{this.props.userEmail}</span>
                </div>
            </div></a>
        )
    }
}

export default item_user_choice