import React from 'react'
import { deviceDetect } from 'react-device-detect'
import { baseUrl } from '../const/const'

class item_user_list extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div style={{borderRadius: "15px", height: "30px", width: "30px", background: "#CCC", overflow: "hidden"}}>
                    {
                        (this.props.picProfile !== "" && this.props.picProfile !== undefined)
                        ?
                            <div style={{background: "url("+baseUrl+"/pic_profile/"+this.props.picProfile+") no-repeat center", backgroundSize: "cover", width: "30px", height: "30px"}}/>
                        :
                            ""
                    }
                </div>
                <div style={{marginLeft: "40px", marginTop: "-32px"}}>
                    <span className="bold" style={{fontSize: "12px"}}>
                        {this.props.userName}
                        {/* user name */}
                    </span>
                    <div className="reguler-font second-font-color" style={{fontSize: "11px"}}>
                        {/* emailuser@gmail.com */}
                        {this.props.emailUser}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default item_user_list