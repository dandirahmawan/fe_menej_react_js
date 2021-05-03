import React from 'react'
import Triangle from '../images/triangle.png'
import {Link} from 'react-router-dom'

class popup_profile extends React.Component{

    constructor() {
        super();
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.hidePopUp = this.hidePopUp.bind(this)
        this.profile = this.profile.bind(this)
    }

    componentDidMount() {
        document.addEventListener('mouseup', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.hidePopUp()
        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    hidePopUp(){
        this.props.hidePopUp()
    }

    profile(){
        this.props.hidePopUp()
        this.props.seeProfile()
    }

    render(){
        return(
            <div ref={this.setWrapperRef} className="main-border shadow popup-doc-hide" style={{width: "230px", height: "auto", background: "#FFF", position: "fixed", right: "14px", top: "55px", padding: "10px", borderRadius: "5px"}}>
                <img src={Triangle} style={{width: "15px", height: "12px", float: "right", marginTop: "-22px"}}></img>
                <div className="second-border-bottom" style={{overflow: "hidden", paddingBottom: "10px", marginBottom: "5px"}}>
                    <div className="main-color bold" style={{height: "25px", width: "35px", borderRadius: "18px", float: "left", color: "#FFF", textAlign: "center", paddingTop: "10px", fontSize: "12px"}}>DR</div>
                    
                    <div style={{marginLeft: "40px", fontSize: "12px", wordBreak: "break-word", paddingTop: "3px"}}>
                        <span className="bold">{this.props.name}</span><br></br>
                        <span style={{fontSize: "11px"}}>{this.props.email}</span>
                    </div>
                </div>

                {/* <Link to="/profile"><a onClick={this.hidePopUp} className="bold" style={{fontSize: "12px"}}>Profile</a></Link><br/> */}
                <a onClick={this.profile} className="bold" style={{fontSize: "12px"}}>Profile</a><br/>
                <a href="/logout" className="bold" style={{fontSize: "12px"}}>Log out</a>

            </div>
        )
    }
}

export default popup_profile