import React, { Component } from 'react'

class context_menu_module extends Component{

    base = React.createRef()
    handleClickOutside = this.handleClickOutside.bind(this)

    componentDidMount() {
        document.addEventListener('mouseup', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.base.current && !this.base.current.contains(event.target)) {
            this.props.hide()
        }
    }

    render(){
        return(
            <div className="main-border shadow"
                ref={this.base}
                style={{position: "fixed", 
                        width: "150px", 
                        background: "#FFF",
                        borderRadius: "3px",
                        zIndex: "1",
                        left: this.props.left+"px",
                        top: this.props.top+"px"}}>

                <a onClick={() => this.props.viewDetail(this.props.moduleId)} style={{textDecoration: "none"}}>
                    <div className="menu-item" style={{padding: "5px", fontSize: "12px", paddingLeft: "10px", paddingRight: "10px"}}>
                        View detail
                    </div>
                </a>
                <a onClick={() => this.props.delete(this.props.moduleId)} style={{textDecoration: "none"}}>
                    <div className="menu-item" style={{padding: "5px", fontSize: "12px", paddingLeft: "10px", paddingRight: "10px"}}>
                        Delete
                    </div>
                </a>
            </div>
        )
    }
}

export default context_menu_module