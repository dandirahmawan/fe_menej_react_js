import React from 'react'

class row_row_module extends React.Component{
    
    moduleStatus(a){
        var v = ""
        if(a == 'P'){
            v = "On Progress"
        }else{
            v = "Closed"
        }
        return v
    }

    colorStatus(a){
        var v = ""
        if(a == "P"){
            v = "#cea827"
        }else{
            v = "#4eab2f"
        }
        return v
    }

    render(){
        return(
            <tr data-module={this.props.modulId} is-selected="false" onClick={this.props.selected}>
                <td style={{width: "20px"}}>
                    <span style={{fontSize: "14px", color: "#d4ae2b"}}><i class="fa fa-clipboard"></i></span>
                </td>
                <td className="bold">{this.props.modulName}</td>
                <td>Dandi rahmawan</td>
                <td>{this.props.endDate}</td>
                <td className="bold" style={{color: this.colorStatus(this.props.modulStatus)}}>{this.moduleStatus(this.props.modulStatus)}</td>
                <td className="bold">
                    <i style={{color: "red", fontSize: "14px"}} class="fa fa-exclamation-triangle"></i>
                    &nbsp;<i style={{color: "#d4ae2b", fontSize: "14px"}} class="fa fa-file"></i>
                </td>
            </tr>
        )
    }
}

export default row_row_module