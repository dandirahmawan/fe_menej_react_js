import React from 'react'

class row_module_detail_popup extends React.Component{
    render(){
        console.log(this.props.countBugsClose, this.props.countBugs)
        return(
            <tr onClick={() => this.props.rowClick(this.props.moduleId)} className="tr-selectable">
                <td style={{width: "20px"}}>
                    <i class="fa fa-clipboard" style={{fontSize: "16px", color: "rgb(212, 174, 43)"}}></i> 
                </td>
                <td className="main-border-bottom">
                    <span className="bold" style={{fontSize: "12px"}}>{this.props.moduleName}</span><br/>
                    <span className="second-font-color" style={{fontSize: "11px"}}>{this.props.projectName}</span>
                </td>
                <td className="main-border-bottom" style={{width: "40px", textAlign: "right"}}>
                    {
                        (this.props.countBugs > 0)
                        ?
                            (this.props.countBugs > this.props.countBugsClose)
                            ?
                                <i class="fa fa-exclamation-triangle"
                                   style={{color: "red", fontSize: "12px", marginRight: "5px"}}/>
                            :
                                <i className="fa fa-exclamation-triangle"
                                   style={{color: "green", fontSize: "12px", marginRight: "5px"}}/>
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