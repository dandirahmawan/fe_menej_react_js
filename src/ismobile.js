import React, { Component } from 'react'
import Logo from './images/menej_285e8e.png'

class Ismobile extends Component {
    render(){
        return(
            <div>
                <div style={{display: "flex", 
                            position: "fixed", 
                            height: "100%",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%"}}>
                    
                    <div className='bold second-font-color' style={{fontSize: "26px", marginTop: "20px"}}>Sorry,</div>
                    <div className='bold' style={{textAlign: "center", width: "200px", fontSize: "13px"}}>This site is not available for mobile, please open on your desktop</div>
                </div>
                <div style={{bottom: "20px", position: "fixed", width: "100%", textAlign: "center"}}>
                    <img style={{width: "50px"}} src={Logo}/>
                </div>
            </div>
        )
    }
}

export default Ismobile