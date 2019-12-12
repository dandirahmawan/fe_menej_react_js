import React from 'react'

class header_module extends React.Component{
    render(){
        return(
            <div className="main-border-bottom" style={{overflow:"hidden"}}>
                <div className="bold" style={{paddingTop: "20px", paddingBottom: "20px", marginRight: "50px", float: "left", overflow: "hidden"}}>
                    <div style={{height: "35px", width: "35px", background: "#CCC", borderRadius: "18px"}}></div>
                    <div style={{marginLeft: "50px", marginTop: "-36px", minHeight: "35px"}}>
                        <span className="second-font-color" style={{fontSize: "11px"}}>Project manager</span><br/>
                        <span>{this.props.projectManager}</span>
                    </div>
                </div>
                <div className="bold" style={{paddingTop: "20px", paddingBottom: "20px", marginRight: "20px", float: "left"}}>
                    <span className="second-font-color" style={{fontSize: "11px"}}>Project name</span><br/>
                    <span>{this.props.projectName}</span>
                </div>
                <div className="bold" style={{paddingTop: "20px", paddingBottom: "20px", marginRight: "20px", float: "left", textAlign: "center"}}>
                    <span className="second-font-color" style={{fontSize: "11px"}}>Module</span><br/>
                    <span className="bold">{this.props.countModule}</span>
                </div>
                <div className="bold" style={{paddingTop: "20px", paddingBottom: "20px", marginRight: "20px", float: "left", textAlign: "center"}}>
                    <span className="second-font-color" style={{fontSize: "11px"}}>Bugs</span><br/>
                    <span className="bold">{this.props.countBugs}</span>
                </div>
                <div className="bold" style={{paddingTop: "20px", paddingBottom: "20px", marginRight: "20px", float: "left", textAlign: "center"}}>
                    <span className="second-font-color" style={{fontSize: "11px"}}>Member</span><br/>
                    <span className="bold">{this.props.countMember}</span>
                </div>
                <div className="bold" style={{paddingTop: "20px", paddingBottom: "20px", marginRight: "20px", float: "left", textAlign: "center"}}>
                    <span className="second-font-color" style={{fontSize: "11px"}}>Perentage</span><br/>
                    <span className="bold">{this.props.percentage}</span>
                </div>
            </div>
        )
    }
}

export default header_module