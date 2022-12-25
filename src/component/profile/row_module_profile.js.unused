import React from 'react'

class row_module_profile extends React.Component{

    colorStatus(a){
        var v = ""
        if(a == "P"){
            v = "#cea827"
        }else{
            v = "#4eab2f"
        }
        return v
    }

    convertDate(date){
        var d = new Date(date)
        var dt = d.toLocaleDateString("id-ID");
        return dt
    }

    render(){
        return(
            <tr onClick={() => this.props.rowClick(this.props.moduleId)} className="tr-module-data tr-selectable" >
                <td style={{width: "20px"}}>
                    <span style={{fontSize: "14px", color: "#d4ae2b"}}><i class="fa fa-clipboard"></i></span>
                </td>
                <td className="bold">
                    {this.props.moduleName}
                </td>
                <td>
                    {this.props.projectName}
                </td>
                <td>
                    {this.convertDate(this.props.dueDate)}
                </td>
                <td className="bold" style={{color: this.colorStatus(this.props.status)}}>
                    {
                        (this.props.status == "P")
                        ?
                            "On Progress"
                        :
                            "Close"
                    }
                </td>
                <td>
                    {
                        (this.props.countBugs > 0)
                        ?
                            <a onClick={(e) => this.props.bugsClick(e, this.props.moduleId)}>
                                <i style={{color: "red", fontSize: "14px", marginRight: "5px"}} class="fa fa-exclamation-triangle tooltip"><span class="tooltiptext">this module have some bugs</span></i>
                            </a>
                        :
                            ""
                    }
                    {
                        (this.props.countDocFile > 0)
                        ?
                            <a onClick={(e) => this.props.docFileClick(e, this.props.moduleId)}>
                                <i style={{color: "#d4ae2b", fontSize: "14px"}} class="fa fa-file tooltip"><span class="tooltiptext">this module have some document file</span></i> 
                            </a>
                        :
                            ""
                    }
                </td>
            </tr>
        )
    }
}

export default row_module_profile