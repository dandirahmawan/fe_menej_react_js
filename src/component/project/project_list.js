import React from 'react'
import {Link} from 'react-router-dom'
import { getCookieUserId } from '../../function/function'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faKey } from '@fortawesome/free-solid-svg-icons'

class project_list extends React.Component{
    render(){

        const nameLink = this.props.id
        const toLink = "/project/"+nameLink

        return(
            <Link to={toLink}>
                <div id='fold_project' onContextMenu={(e) => this.props.contextMenu(e, this.props.pic, this.props.id)} style={{float:'left', width: '100px', height: '120px', cursor: 'pointer', marginRight: "30px", marginBottom: "30px", marginTop: "20px"}}>
                    <FontAwesomeIcon icon={faFolder} style={{color: "#d4ae2b", fontSize: "100px"}}/>
                    {
                        (this.props.pic == getCookieUserId()) 
                        ?
                            <div className="tooltip" style={{position: "absolute", width: "20px", height: "20px", marginTop: "-45px", marginLeft: "15px"}}>
                                <FontAwesomeIcon icon={faKey} className="tooltip"></FontAwesomeIcon>
                                <span className="tooltiptext">You are project manager</span>
                            </div>
                        :
                            ""
                    }
        
                    <div className='bold' style={{fontSize: '12px', textAlign: 'center'}}>{this.props.name}</div>
                </div>
            </Link>
        )
    }
}

export default project_list