import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import { Fragment } from 'react';

class context_menu_module extends Component{

    base = React.createRef()
    handleClickOutside = this.handleClickOutside.bind(this)

    componentDidMount() {
        document.addEventListener('mouseup', this.handleClickOutside);
        console.log(this.props)
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
                    <div className="menu-item main-border-bottom" style={{padding: "8px", fontSize: "12px", paddingLeft: "10px", paddingRight: "10px"}}>
                        View detail
                    </div>
                </a>
                {
                    (this.props.isPermitionModule)
                    ?
                        <Fragment>
                            <a onClick={() => this.props.delete(this.props.moduleId)} style={{textDecoration: "none"}}>
                                <div className="menu-item main-border-bottom" style={{padding: "8px", fontSize: "12px", paddingLeft: "10px", paddingRight: "10px"}}>
                                    Delete
                                </div>
                            </a>
                            <a onClick={() => this.props.delete(this.props.moduleId)} className="main-border-bottom" style={{textDecoration: "none"}}>
                                <div className="menu-item main-border-bottom" 
                                    style={{padding: "8px", fontSize: "12px", paddingLeft: "10px", paddingRight: "10px", display: "flex", alignItems: "center"}}>
                                    <div style={{width: "100%"}}>
                                        Status
                                    </div>
                                    <FontAwesomeIcon className="second-font-color" icon={faChevronRight}/>
                                </div>
                            </a>
                            <a onClick={() => this.props.delete(this.props.moduleId)} className="main-border-bottom" style={{textDecoration: "none"}}>
                                <div className="menu-item main-border-bottom" 
                                    style={{padding: "8px", fontSize: "12px", paddingLeft: "10px", paddingRight: "10px", display: "flex", alignItems: "center"}}>
                                    <div style={{width: "100%"}}>
                                        Section
                                    </div>
                                    <FontAwesomeIcon className="second-font-color" icon={faChevronRight}/>
                                </div>
                            </a>
                        </Fragment>
                    : 
                        ""    
                } 
            </div>
        )
    }
}

export default context_menu_module