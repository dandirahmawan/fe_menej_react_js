import React from 'react'
import { getCookieUserId } from '../../function/function'

class permitionItem extends React.Component{
    
    constructor(){
        super()
        this.isPermit = this.isPermit.bind(this)
    }

    isPermit(permitionCode){
        var idx = this.props.listPermittion.indexOf(permitionCode)
        return idx
    }
    
    render(){
        return(
            <tr valign="top">
                <td>
                    {
                        (this.isPermit(this.props.permitionCode) >= 0 || this.props.pic == getCookieUserId()) 
                        ?
                            <i class="fa fa-check-circle" style={{color: "green", fontSize: "14px"}}></i>
                        :
                            <i class="fa fa-times-circle" style={{color: "red", fontSize: "14px"}}></i>
                    }
                </td>
                <td className="bold" style={{paddingRight: "50px"}}>{this.props.permitionName}</td>
                <td>{this.props.permitionDescription}</td>
            </tr>
        )
    }
}

export default permitionItem