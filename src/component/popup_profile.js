import React from 'react'
import Triangle from '../images/triangle.png'

class popup_profile extends React.Component{
    render(){
        return(
            <div className="main-border popup-doc-hide" style={{width: "230px", height: "auto", background: "#FFF", position: "fixed", right: "10px", top: "55px", padding: "10px", borderRadius: "5px"}}>
                
                <img src={Triangle} style={{width: "15px", height: "12px", float: "right", marginTop: "-22px"}}></img>
                <div className="second-border-bottom" style={{overflow: "hidden", paddingBottom: "10px", marginBottom: "5px"}}>
                    <div className="main-color bold" style={{height: "25px", width: "35px", borderRadius: "18px", float: "left", color: "#FFF", textAlign: "center", paddingTop: "10px", fontSize: "12px"}}>DR</div>
                    
                    <div style={{marginLeft: "40px", fontSize: "12px", wordBreak: "break-word", paddingTop: "3px"}}>
                        <span className="bold">Dandi Rahmawan</span><br></br>
                        <span style={{fontSize: "11px"}}>dandiramawan95@gmail.com</span>
                    </div>
                </div>

                <a className="bold" style={{fontSize: "12px"}}>Profile</a><br/>
                <a onClick={this.props.logout} className="bold" style={{fontSize: "12px"}}>Log out</a>

            </div>
        )
    }
}

export default popup_profile