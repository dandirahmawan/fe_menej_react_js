import { faCalendarAlt, faFolder } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

class card_list extends React.Component{
    render(){
        const toLink = "/project/"+this.props.projectId
        return(
            
                <Link to={toLink} style={{textDecoration: "none", color: "#000"}}>
                    <div className="main-border shadow-thin" 
                        style={{padding: "10px", borderRadius: "3px", marginBottom: "10px", background: "#FFF", overflow: "hidden"}}>
                        <div style={{width: "35px"}}>
                            <FontAwesomeIcon icon={faFolder} style={{color: "#d4ae2b", fontSize: "35px"}}/>
                        </div>
                        <div style={{marginLeft: "45px", marginTop: "-29px"}}>
                            <div className="bold" style={{fontSize: "12px"}}>{this.props.projectName}</div>
                            <div className="second-font-color bold" style={{fontSize: "10px"}}>
                                <FontAwesomeIcon icon={faCalendarAlt}/> {this.props.createdDate}
                            </div>
                        </div>
                    </div>
                </Link>
        )
    }
}

export default card_list