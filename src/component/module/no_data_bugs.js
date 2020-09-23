import React from 'react'

class no_data_bugs extends React.Component{
    render(){
        return(
            <tr>
                <td colSpan="3" className="font-second-color" style={{paddingTop: "20px",paddingBottom:"30px", fontSize: "14px", textAlign: "center", color: "#a2a2a2"}}>
                    <div style={{marginTop: "10px"}}>
                        {/* <span style={{fontSize: "16px"}}>
                            <i class="fa fa-exclamation-triangle" style={{fontSize: "20px"}}></i>
                        </span> */}
                        <div className="bold" style={{marginTop: "10px", fontSize: '12px'}}>No data to display</div>
                        <div style={{fontSize: "11px"}}>insert bugs and click send<br/>to create a new bugs</div>
                    </div>
                </td>
            </tr> 
        )
    }
}

export default no_data_bugs