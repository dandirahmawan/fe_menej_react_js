import React from 'react'
import {getCookieUserId} from "../../function/function";

class row_dropdown_tab_menu extends React.Component{

    firstWord(userNameLogin){
        var a = userNameLogin.split(" ")
        var b = ""
        for(var i = 0;i<a.length;i++){
            if(i<=2){
                b += a[i].substr(0, 1).toUpperCase()
            }
        }
        return b
    }

    render(){
        return(
            <div onClick={this.props.onClick} className="bold second-font-color tr-selectable"
                 style={{padding: "5px",paddingLeft: "10px", paddingRight: "10px", borderBottom: "1px solid #eaeaea", cursor: "pointer"}}>
                {
                    (this.props.createdBy != getCookieUserId())
                    ?
                        <div className="bold main-border second-background-grs"
                             style={{fontSize: "8px",padding: "3px", borderRadius: "3px", float: "right", marginTop: "-2px"}}>
                            {this.firstWord(this.props.userName)}
                        </div>
                    :
                        ""
                }
                {this.props.tabName}
            </div>
        )
    }
}

export default row_dropdown_tab_menu