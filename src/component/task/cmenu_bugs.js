import React from 'react'

class cmenu_bugs extends React.Component{
    render(){
        
        const style = {
            left: this.props.left+"px",
            top: this.props.top+"px",
            position: "fixed",
            zIndex: "2"
        }
        
        return(
            <div style={style}>
                <div className="main-border bold" style={{background: "#FFF", width: "100px", borderRadius: "5px", overflow: "hidden"}}>
                    <div className="list-item" style={{padding: "7px", fontSize: "12px"}}>
                        <a style={{textDecoration: "none"}}>Close</a>
                    </div>
                    <a onClick={this.props.deleteBugs} style={{textDecoration: "none"}}>
                        <div className="list-item" style={{padding: "7px", fontSize: "12px"}}>
                        Delete</div>
                    </a>
                    <div className="list-item" style={{padding: "7px", fontSize: "12px"}}>
                        <a style={{textDecoration: "none"}}>Dismiss</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default cmenu_bugs