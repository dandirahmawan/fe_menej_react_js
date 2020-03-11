import React from 'react'

class row_bugs_user_detail_pop extends React.Component{
    render(){
        return(
            <tr valign="top">
                <td>
                    <i class="fa fa-exclamation-triangle" style={{color: "red", fontSize: "12px", marginRight: "5px", marginTop: "3px"}}></i>
                </td>
                <td className="main-border-bottom">
                    {this.props.note}
                    <div className="second-font-color bold" style={{marginTop: "3px"}}><i class="fa fa-clipboard"></i> {this.props.moduleName}</div>
                </td>
            </tr>
        )
    }
}

export default row_bugs_user_detail_pop