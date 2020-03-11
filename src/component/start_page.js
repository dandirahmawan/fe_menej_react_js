import React from 'react'
import Logo from '../images/menej_fff.png'
import {Spinner} from '../component/spinner'

class start_page extends React.Component{
    render(){
        return(
            <div className='main-color' style={{height: "100%", width: "100%", position: "fixed", textAlign: "center"}}>
                <img src={Logo} style={{marginTop: "100px"}}></img><br></br>
                <span style={{color: "#FFF", fontSize: "12px"}}>Starting menej, please wait...</span>
                <Spinner size="20px"/>
            </div>
        )
    }
}

export default start_page