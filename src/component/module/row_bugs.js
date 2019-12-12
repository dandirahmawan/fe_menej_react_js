import React from 'react'

class row_bugs extends React.Component{
    render(){
        return(
            <tr className='tr-selectable' onContextMenu={(e) => this.props.ctxMenu(e, this.props.bugsText)}>
                <td valign="top" style={{width: "20px", paddingTop: "7px"}}>
                    <i class="fa fa-exclamation-triangle" style={{color: "red"}}></i>
                </td>
                <td valign="top" style={{width: "65%", paddingRight: "10px"}}>
                    {this.props.bugsText}
                </td>
                <td valign="top" className='second-font-color'>01 january 2019</td>
            </tr>
        )
    }
}

export default row_bugs