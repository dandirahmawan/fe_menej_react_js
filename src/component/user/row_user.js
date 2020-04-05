import React from 'react'
import {baseUrl} from "../../const/const";

class row_user extends React.Component{
    render(){
        return(
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
                <td className="bold" style={{color: "#888888", borderBottom: "1px solid #e6e5e5"}}>
                    {/* {this.props.emailUser} */}
                    10 September 2020
                </td>
                <td className="bold" style={{color: "#888888", borderBottom: "1px solid #e6e5e5"}}>10 Module</td>
                <td className="bold" style={{color: "#888888", borderBottom: "1px solid #e6e5e5"}}>10 Bugs</td>
                <td className="bold" style={{color: "#888888", borderBottom: "1px solid #e6e5e5"}}>10 Doc File</td>
            </tr>
        )
    }
}

export default row_user