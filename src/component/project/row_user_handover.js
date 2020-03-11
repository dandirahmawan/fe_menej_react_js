import React from 'react'

class row_user_handover extends React.Component{
    render(){
        return(
            <tr>
                <td>
                    {this.props.isSelected}
                    {
                        (this.props.isSelected)
                        ?
                            <input checked onClick={() => this.props.selected(this.props.userId)} type="checkbox"/>
                        :
                            <input onClick={() => this.props.selected(this.props.userId)} type="checkbox"/>
                    }

                </td>
                <td>
                    <div className="main-border" style={{background: "#CCC", width: "30px", height: "30px", borderRadius: "15px"}}/>
                </td>
                <td>
                    <span className="bold">{this.props.userName}</span><br/>
                    {this.props.userEmail}
                </td>
            </tr>
        )
    }
}

export default row_user_handover