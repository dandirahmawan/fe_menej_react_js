import React from 'react'
import Logo from '../images/menej_fff.png'
import {Spinner} from '../component/spinner'

class start_page extends React.Component{
    render(){
        return(
            <div className='main-color' 
                style={{height: "100%", width: "100%", position: "fixed", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                <img src={Logo}></img>
                <div style={{color: "#FFF", fontSize: "12px", marginTop: "10px", opacity: "0.5", display: "flex", alignItems: "center"}}>
                    <Spinner style={{width: "14px", marginTop: "2px"}}/>&nbsp;
                    Please wait...
                </div>
            </div>
        )
    }
}

export default start_page