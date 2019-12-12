import React from 'react'

class item_user_choice extends React.Component{
    render(){
        return(
            <a onClick={() => this.props.userSelected(this.props.userEmail, this.props.userId, this.props.userName)} style={{color:"#000", textDecoration: "none"}}><div className="list-item" style={{padding: "10px"}}>
                <div style={{borderRadius: "15px", height: "25px", width: "25px", background: "#CCC"}}></div>
                <div style={{marginLeft: "35px", marginTop: "-25px"}}>
                    <span className="bold">{this.props.userName}</span><br/>
                    <span className="reguler-font" style={{fontSize: "11px"}}>{this.props.userEmail}</span>
                </div>
            </div></a>
        )
    }
}

export default item_user_choice