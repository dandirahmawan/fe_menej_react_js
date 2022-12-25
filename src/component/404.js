import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import React from 'react'

class not_found_data extends React.Component{
    render(){
        return(
            <div id="page-not-found-base" style={{textAlign: "center", marginTop: "80px", height: "300px"}}>
                {/* <em style={{fontSize: "40px", color: "#ff9900"}} class="fa fa-exclamation-triangle"></em> */}
                <div className="bold" style={{fontSize: "24px"}}>Sorry, this page isn't available.</div>
                <div style={{fontSize: "12px", marginTop: "5px", marginBottom: "20px"}}>We could not find the data you are looking for. Please select another project existing by click button bellow{/*<a href='/project' className="bold">Back to menej</a>*/}</div>
                <Link to="/project">
                    <div className="btn-primary-otl main-font-color main-border" style={{padding: "10px", display: "inline-block"}}>
                        <FontAwesomeIcon style={{fontSize: "16px", color: "#d4ae2b"}} icon={faFolder}/><br/>
                        <span className="bold" style={{fontSize: "11px"}}>
                            Select project
                        </span>
                    </div>
                </Link>
            </div>
        )
    }
}

export default not_found_data