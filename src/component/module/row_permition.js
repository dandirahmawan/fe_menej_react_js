import React from 'react'

class row_permition extends React.Component{
    render(){
        const checkbox = (this.props.isChecked == 'Y') 
                            ?
                                <input onClick={(e) => this.props.checkClick(e, this.props.permitionCode)} checked type="checkbox" ></input>
                            : 
                                <input onClick={(e) => this.props.checkClick(e, this.props.permitionCode)} type="checkbox" ></input>
        return(
            <tr valign="top">
                <td>
                    {checkbox}
                </td>
                <td>
                    <div className="bold">{this.props.permitionName}</div>
                    <div style={{fontSize: "11px"}}>{this.props.permitionDescription}</div>
                </td>
            </tr>
        )
    }
}

export default row_permition