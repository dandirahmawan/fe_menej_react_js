import React from 'react'

class row_handover_module_to extends React.Component{
    render(){
        return(
            <tr>
                <td>
                    {
                        (this.props.isSelected)
                        ?
                            <input checked onClick={() => this.props.select(this.props.userId)} type="checkbox"/>
                        :
                            <input onClick={() => this.props.select(this.props.userId)} type="checkbox"/>
                    }

                </td>
                <td>
                    <div style={{width: "30px", height: "30px", borderRadius: "15px", background: "#CCC", float: "left"}}/>
                    <div style={{marginTop: "3px", float: "left", marginLeft: "10px"}}>
                        <span className="bold">{this.props.userName}</span>
                        <div>{this.props.userEmail}</div>
                    </div>
                </td>
            </tr>
        )
    }
}

export default row_handover_module_to