import React from 'react'

class not_found_data extends React.Component{
    render(){
        return(
            <div style={{textAlign: "center", marginTop: "50px", color: "#a2a2a2"}}>
                <em style={{fontSize: "50px"}} class="fa fa-exclamation-triangle"></em>
                <p className="bold">Data not found</p>
            </div>
        )
    }
}

export default not_found_data