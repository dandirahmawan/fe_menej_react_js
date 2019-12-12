import React from 'react'

class row_user extends React.Component{
    render(){
        return(
            <tr onClick={() => this.props.rowClick(this.props.userName, this.props.emailUser, this.props.userId)} className="tr-selectable" style={{paddingTop: "5px", paddingBottom: "5px"}}>
                <td style={{paddingTop: "10px", paddingBottom: "10px"}}>
                    <div style={{width:"30px", height: "30px", borderRadius: "15px", background: "#CCC"}}>
                    </div>
                    <div style={{marginLeft: "35px", marginTop: "-28px"}}>
                        {this.props.userName}<br/>
                        <span className="second-font-color" style={{fontSize: "11px"}}>
                            {this.props.emailUser}
                        </span>
                    </div>
                </td>
                <td>10 Project</td>
                <td>10 Module</td>
                <td>10 Bugs</td>
                <td>
                    <span style={{color: "green"}}>
                     <i class="fa fa-check-circle"></i> Active
                    </span>
                </td>
            </tr>
        )
    }
}

export default row_user