import React from 'react'

class row_module_detail extends React.Component{

    dateToString(date){
        var date = new Date(date)
        return date.toLocaleDateString("id-ID");
    }

    render(){
        return(
            <tr onClick={() => this.props.rowClick(this.props.moduleId)} className="tr-module-data tr-selectable">
                <td style={{width: "20px"}}>
                    <span style={{fontSize: "14px", color: "#d4ae2b"}}><i class="fa fa-clipboard"></i></span>
                </td>
                <td>{this.props.moduleName}</td>
                <td style={{width: "100px"}}>{this.dateToString(this.props.dueDate)}</td>
            </tr>
        )
    }
}

export default row_module_detail