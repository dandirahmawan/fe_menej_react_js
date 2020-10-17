import React from 'react'

class not_found_data extends React.Component{
    render(){
        return(
            <div id="page-not-found-base" style={{textAlign: "center", marginTop: "30px", height: "300px"}}>
                {/* <em style={{fontSize: "40px", color: "#ff9900"}} class="fa fa-exclamation-triangle"></em> */}
                <div className="bold" style={{fontSize: "24px"}}>Sorry, this page isn't available.</div>
                <div style={{fontSize: "12px", marginTop: "5px"}}>We could not find the data you are looking for. <a href='/project' className="bold">Back to menej</a></div>
            </div>
        )
    }
}

export default not_found_data