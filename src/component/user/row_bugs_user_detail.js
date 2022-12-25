import React from 'react'

class row_bugs extends React.Component{

    convertDate(date){
        var d = new Date(date)
        return d.toLocaleDateString("id-ID")
    }

    render(){
        return(
            <tr className='tr-selectable'>
                <td valign="top" style={{width: "20px", paddingTop: "7px"}}>
                    <i class="fa fa-exclamation-triangle" style={{color: "red"}}></i>
                </td>
                <td valign="top" style={{width: "65%", paddingRight: "10px"}}>
                    {this.props.note}
                </td>
                <td valign="top" className='second-font-color'>
                    {this.convertDate(this.props.date)}
                </td>
            </tr>
        )
    }
}

export default row_bugs