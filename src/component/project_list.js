import React from 'react'
import {Link} from 'react-router-dom'
import Folder from '../images/folder_grey.png'

class project_list extends React.Component{
    render(){

        const nameLink = this.props.id
        const toLink = "/project/"+nameLink

        return(
            <Link to={toLink}>
                <div id='fold_project' onContextMenu={this.props.contextMenu} data={this.props.id} style={{float:'left', width: '100px', height: '120px', cursor: 'pointer', marginRight: "30px", marginBottom: "30px", marginTop: "20px"}}>
                    <img src={Folder} style={{width: '100px', height: '100px'}}/>
                    <div className='bold' style={{fontSize: '12px', textAlign: 'center'}}>{this.props.name}</div>
                </div>
            </Link>
        )
    }
}

export default project_list