import React from 'react'

class no_data_bugs extends React.Component{
    render(){
        return(
            <tr>
                <td colSpan="3" className="second-font-color" style={{textAlign: "center", padding: "10px"}}>
                    No data to display
                </td>
            </tr>
        )
    }
}

export default no_data_bugs