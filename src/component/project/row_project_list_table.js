import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFolder, faKey, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { getCookieUserId } from '../../function/function'
import {Link} from 'react-router-dom'

class row_project_list_table extends React.Component{
    
    constructor(){
        super()
        this.linkClick = React.createRef()
        this.rowClick = this.rowClick.bind(this)
    }

    rowClick(e){
        this.linkClick.current.click()
        e.stopPropagation()
    }

    linkClickProject(e){
        e.stopPropagation()
    }

    render(){

        const nameLink = this.props.id
        const toLink = "/project/"+nameLink

        return(
            <tr onClick={this.rowClick} onContextMenu={(e) => this.props.contextMenu(e, this.props.pic, this.props.id)} className="tr-selectable">
                <td className="tb-project" style={{width: "30px", fontSize: "14px"}}>
                    <FontAwesomeIcon icon={faFolder} style={{fontSize: "20px", color: "#d4ae2b"}}/>
                    {
                        (this.props.pic == getCookieUserId())
                        ?
                            <FontAwesomeIcon icon={faKey} style={{fontSize: "15px", color: "#000", position: "absolute", marginLeft: "-10px", marginTop: "7px"}}/>
                        : ""
                    }
                </td>
                <td className="bold tb-project">
                    <Link onClick={this.linkClickProject} to={toLink}>
                        <a ref={this.linkClick}>{this.props.name}</a>
                    </Link>
                </td>
                <td className="tb-project">{this.props.picName}</td>
                <td className="tb-project"><span className="bold">{this.props.countModule}</span> module</td>
                <td className="tb-project"><span className="bold">{this.props.countBugs}</span> bugs</td>
                <td className="tb-project"><span className="bold">{this.props.countTeam}</span> member</td>
                <td className="tb-project">12/01/2020</td>
            </tr>
        )
    }
}

export default row_project_list_table