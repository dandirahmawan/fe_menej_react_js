import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'

class project extends React.Component{
    render(){
        return(
            <div>
                <div style={{width: "300px", margin: "auto", textAlign: "center", marginTop: "100px"}} 
                    className="second-font-color">
                    <FontAwesomeIcon style={{fontSize: "100px"}} icon={faFolder}/><br/>
                    <div style={{fontSize: "12px", lineHeight: "1.5"}}>
                        <span style={{fontSize: "14px"}} className="bold">No project selected</span><br/>
                        Select project on list project to see detail data project like module, bugs, document and file
                    </div>
                </div>
            </div>
        )
    }
}

export default project