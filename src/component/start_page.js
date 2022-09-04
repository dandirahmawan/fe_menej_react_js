import React from 'react'
import Logo from '../images/menej_fff.png'
import {Spinner} from '../component/spinner'

class start_page extends React.Component{
    render(){
        return(
            <div className='main-color' 
                style={{height: "100%", width: "100%", position: "fixed", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                <img src={Logo}></img><br></br>
                <div style={{color: "#FFF", marginTop: "-15px", fontSize: "12px"}}>Starting menej, please wait...</div>
                <Spinner size="20px"/>
            </div>
        )
    }
}

export default start_page