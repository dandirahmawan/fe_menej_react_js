import React from  'react'
import {Link} from 'react-router-dom'
import Logo from '../images/menej_fff.png'
import {connect} from 'react-redux'
import CreateProject from './create_project'

const mapStateToProps = state => {
    return{
        menuProject : state.dataProject
    }
}

class sidebar extends React.Component{
    
    constructor(){
        super();
        this.state = {
            isCollpase: false,
            menuProject: [],
            createProjectPop:""
        }
        this.collapseAction = this.collapseAction.bind(this)
        this.createProject = this.createProject.bind(this)
        this.hidePopUp = this.hidePopUp.bind(this)
    }

    collapseAction(){
        this.setState({
            isCollpase: true
        })
    }

    createProject(){
        this.setState({
            createProjectPop: <CreateProject hidePopUp={this.hidePopUp}/>
        })
    }

    hidePopUp(){
        this.setState({
            createProjectPop: ""
        })
    }

    render(){

        const menuProjectLink = this.props.menuProject.map(dt => (dt.isDelete !== 'Y') ? <Link to={"/project/"+dt.projectId}><li className="none-style-list" style={{padding: "10px",fontSize:"12px",color:"#FFF"}}>{dt.projectName}</li></Link> : '')

        return(
            <React.Fragment>
                {this.state.createProjectPop}
                <div className='sidebar main-color'>
                    <div style={{height:"60px"}}>
                        <img style={{marginTop:"12px",marginLeft: "15px"}} src={Logo}></img>
                    </div>
                    <ul style={{fontSize: '14px',marginTop:"0px"}}>
                        {/* <Link to="/dashboard"> */}
                        <a onClick={this.createProject}><li className='nav-li'>
                            <em className='fa fa-plus-circle'>&nbsp;</em>
                            Create
                        </li></a>
                        <Link to={{pathname:'/dashboard', load: 'yes'}}>
                            <li className='nav-li'>
                                <em className='fa fa-dashboard'>&nbsp;</em>
                                Dashboard
                            </li>
                        </Link>
                        <Link to={{pathname:'/users', load: 'yes'}}>
                            <li className='nav-li'>
                                <em className='fa fa-user-circle'>&nbsp;</em>
                                User
                            </li>
                        </Link>
                        <Link to={{pathname:'/project', load: 'yes'}}>
                            <li className='nav-li'>
                                <em className='fa fa-folder'>&nbsp;</em>
                                Project
                            </li>
                        </Link>
                        <ul style={{marginTop:"0px",paddingLeft:"25px"}}>
                            {menuProjectLink}
                        </ul>
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps)(sidebar)