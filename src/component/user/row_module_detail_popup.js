import React from 'react'

class row_module_detail_popup extends React.Component{
    render(){
        return(
            <tr onClick={() => this.props.rowClick(this.props.moduleId)} className="tr-selectable">
                <td style={{width: "20px"}}>
                    <i class="fa fa-clipboard" style={{fontSize: "16px", color: "rgb(212, 174, 43)"}}></i> 
                </td>
                <td className="main-border-bottom">
                    <span className="bold" style={{fontSize: "12px"}}>{this.props.moduleName}</span><br/>
                    <span className="second-font-color">{this.props.projectName}</span>
                </td>
                <td className="main-border-bottom" style={{width: "40px", textAlign: "right"}}>
                    {
                        (this.props.countBugs > 0)
                        ?
                            <i class="fa fa-exclamation-triangle" style={{color: "red", fontSize: "12px", marginRight: "5px"}}></i>
                        : 
                            ""
                    }
                    {
                        (this.props.countDoc > 0)
                        ?
                            <i class="fa fa-file" style={{color: "rgb(212, 174, 43)", fontSize: "12px", marginRight: "5px"}}></i>
                        :
                            ""
                    }
                </td>
            </tr>
        )
    }
}

export default row_module_detail_popup