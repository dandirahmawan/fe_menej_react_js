import React from 'react'

class row_module extends React.Component{

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

    trClick(){
        alert("dandi")
    }

    convertDate(date){
        var d = new Date(date)
        var dt = d.toLocaleDateString("id-ID");
        return dt
    }

    render(){
        return(
            <React.Fragment>
                {(this.props.isDelete == "N") ? 
                <tr className="tr-module-data tr-selectable" data-module={this.props.modulId} is-selected="false" onClick={this.props.selected}>
                    <td style={{width: "20px"}}>
                        {/* <input type="checkbox"></input> */}
                        <span style={{fontSize: "14px", color: "#d4ae2b"}}><i class="fa fa-clipboard"></i></span>
                    </td>
                    <td className="bold">{this.props.modulName}</td>
                    <td>{this.props.userName}</td>
                    <td>{this.convertDate(this.props.endDate)}</td>
                    <td className="bold" style={{color: this.colorStatus(this.props.modulStatus)}}>{this.moduleStatus(this.props.modulStatus)}</td>
                    <td className="bold">
                        {(this.props.countBugs > 0) ? <i style={{color: "red", fontSize: "14px"}} class="fa fa-exclamation-triangle"></i> : ""}
                        &nbsp;
                        {(this.props.countDoc > 0) ? <i style={{color: "#d4ae2b", fontSize: "14px"}} class="fa fa-file"></i> : ""}
                    </td>
                </tr> : ""}
            </React.Fragment>
            
        )
    }
}

export default row_module