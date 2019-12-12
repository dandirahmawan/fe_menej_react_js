import React from 'react'

class project_member_team extends React.Component{
    render(){
        return(
            <div style={{float: "left", marginRight: "10px", padding: "5px", borderRadius: "5px", marginBottom: "10px", background: "#f1f1f1", border: "1px solid #e5e6e6"}}>
                <div style={{width: "25px", height: "25px", borderRadius: "15px", background: "#CCC"}}></div>
                <div className="bold" style={{marginLeft: "30px", minHeight: "20px", marginTop: "-20px", fontSize: "12px"}}>
                    {this.props.userName}
                </div>
            </div>
        )
    }
}

export default project_member_team