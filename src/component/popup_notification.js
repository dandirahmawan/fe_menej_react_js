import React from 'react'
import Triangle from '../images/triangle.png'

class popup_notification extends React.Component{

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
            this.props.hidePopUp()
        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    render(){
        return(
            <div ref={this.setWrapperRef} className="main-border popup-doc-hide" style={{width: "230px", height: "auto", background: "#FFF", position: "fixed", top: "55px", padding: "10px", borderRadius: "5px", right: "61px"}}>
                
                <img src={Triangle} style={{width: "15px", height: "12px", float: "right", marginTop: "-22px"}}></img>
                <div className="bold second-color" style={{textAlign: "center", padding: "30px", fontSize: "12px"}}>
                    No data notification to display
                </div>
                {/* <div className="second-border-bottom" style={{overflow: "hidden", paddingBottom: "10px", marginBottom: "5px"}}>
                    <div className="main-color bold" style={{height: "25px", width: "35px", borderRadius: "18px", float: "left", color: "#FFF", textAlign: "center", paddingTop: "10px", fontSize: "12px"}}>DR</div>
                    
                    {/* <div style={{marginLeft: "40px", fontSize: "12px", wordBreak: "break-word", paddingTop: "3px"}}>
                        <span className="bold">Dandi Rahmawan</span><br></br>
                        <span style={{fontSize: "11px"}}>dandiramawan95@gmail.com</span>
                    </div> */}
                {/* </div> */}
            </div>
        )
    }
}

export default popup_notification