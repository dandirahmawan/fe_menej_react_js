import React from 'react'

class user_item extends React.Component{
    render(){
        const styleUserItem = {
            width: "140px", 
            height: '160px', 
            marginTop:"10px", 
            background: "#FFF", 
            borderRadius: "5px", 
            float: "left", 
            marginRight: "10px", 
            padding: "10px",
        }

        const stylePicProfileList = {width: "80px", height: "80px", borderRadius: "40px", background: "#CCC", margin: "auto", marginTop: "20px"}

        return(
            <div style={styleUserItem}>
                <div style={stylePicProfileList}></div>
                <p className="bold" style={{textAlign: "center", fontSize: "12px"}}>Dandi rahmawan</p>
            </div>
        )
    }
}

export default user_item