import React from 'react'

class card_view_user extends React.Component{
    render(){
        return(
            <div className="main-border" style={{padding: "5px", borderRadius: "3px", background: "#FFF", width: "300px", height: "150px", float: "left", marginRight: "10px", marginBottom: "10px"}}>
                <div>
                    <div style={{width: "40px", height: "40px", borderRadius: "20px", background: "#CCC"}}></div>
                    <div style={{marginLeft: "50px", marginTop: "-35px"}}>
                        <div className="bold" style={{fontSize: "14px"}}>Dandi Rahmawan</div>
                        <div style={{fontSize: "12px"}}>dandirahmawan95@gmail.com</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default card_view_user