import React from 'react'

class info_project extends React.Component{

    constructor() {
        super();
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mouseup', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.hideInfo()
        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    render(){
        return(
            <div ref={this.setWrapperRef} className="main-border" style={{position: "absolute", width: "300px", height: "auto", background: "#FFF", zIndex: "1", borderRadius: "3px", overflow: "hidden", marginTop: "5px"}}>
                <div className="bold main-border-bottom" style={{padding: "10px", background: "#000", fontSize: "12px", color: "#FFF"}}>Info project</div>
                <div style={{paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px"}}>
                    <div className="main-border" style={{overflow: "hidden", padding: "5px", borderRadius: "5px", background: "#f5f5f5", marginTop: "5px", marginBottom: "5px"}}>
                        <em class="fa fa-user-circle" style={{float: "left", fontSize: "20px", marginTop: "4px"}}>&nbsp;</em>
                        <div style={{float: "left", fontSize: "12px", marginTop: "7px"}}>
                            <span className="bold" style={{fontSize: "13px"}}>{this.props.picName}</span>
                        </div>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td className="bold">Name</td>
                                <td>:</td>
                                <td>{this.props.projectName}</td>
                            </tr>
                            <tr>
                                <td className="bold">Create Date</td>
                                <td>:</td>
                                <td>{this.props.createDate}</td>
                            </tr>
                            {/* <tr>
                                <td className="bold">Module</td>
                                <td>:</td>
                                <td>10 Module</td>
                            </tr>
                            <tr>
                                <td className="bold">Bugs</td>
                                <td>:</td>
                                <td>10 Bugs</td>
                            </tr>
                            <tr>
                                <td className="bold">Doc File</td>
                                <td>:</td>
                                <td>10 Doc File</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default info_project