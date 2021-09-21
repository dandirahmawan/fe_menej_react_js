import React from 'react'

class pop_confirm_delete_bugs extends React.Component{
    render(){
        return(
            <div style={{position: "fixed", zIndex: "1"}}>
                <div className="main-border" style={{background: "#FFF",width: "200px", height: "auto", borderRadius: "3px", marginLeft: "150px", marginTop: "-55px"}}>
                    <div className="bold" style={{padding: "5px", fontSize: "12px"}}>Close bugs</div>
                    <div style={{padding: "5px", fontSize: "12px"}}>
                        Are you sure, you want close bugs
                    </div>
                    <div style={{padding: "5px", fontSize: "12px", textAlign: "right"}}>
                        <button onClick={this.props.yesConfirm} className="bold main-font-color" style={{background: "none"}}>Yes</button>
                        <button onClick={this.props.hideConfirm} className="bold second-font-color" style={{background: "none"}}>No</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default pop_confirm_delete_bugs