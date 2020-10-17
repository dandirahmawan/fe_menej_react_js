import React from 'react'

class row_bugs_profile extends React.Component{

    constructor(){
        super()
        this.moduleClick = this.moduleClick.bind(this)
    }

    moduleClick(e){
        this.props.moduleClick(e, this.props.moduleId)
    }

    convertDate(date){
        var d = new Date(date)
        var dt = d.toLocaleDateString("id-ID");
        return dt
    }

    render(){
        return(
            <tr valign="top">
                <td style={{width: "20px"}}>
                    <i class="fa fa-exclamation-triangle" style={{color: "red"}}></i>
                </td>
                <td style={{paddingRight: "50px", width: "350px"}}>
                    {this.props.note}
                    {/* <div className="bold" style={{fontSize: "11px", marginTop: "3px"}}>
                        <a className="second-font-color">close</a>&nbsp;&nbsp;&nbsp;<a className="second-font-color">delete</a>
                    </div> */}
                </td>
                <td><a>{this.props.projectName}</a></td>
                <td><a onClick={(e) => this.moduleClick(e)}>{this.props.module}</a></td>
                <td style={{width: "100px"}}>
                    {this.convertDate(this.props.createDate)}
                </td>
                <td style={{fontSize: "14px", width: "50px"}}>
                    <a>
                        <i class="fa fa-trash tooltip" style={{color: "black"}}>
                            <span className="tooltiptext">delete bugs</span>
                        </i>
                    </a>&nbsp;
                    <a>
                        <i class="fa fa-check-circle tooltip" style={{color: "green"}}>
                            <span className="tooltiptext">close bugs</span>
                        </i>
                    </a>
                </td>
            </tr>
        )
    }
}

export default row_bugs_profile