import React from  'react'
import {Link} from 'react-router-dom'
import Logo from '../images/menej_fff.png'
import {connect} from 'react-redux'
import CreateProject from './create_project'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

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

    bars(){
        let elm = document.getElementById("main-base-data-wrapper")
        elm.style.marginLeft = "0px"

        let elm2 = document.getElementById("sidebar")
        elm2.style.marginLeft = "-"+elm2.offsetWidth+"px"

        let elm3 = document.getElementById("main-header")
        elm3.style.marginLeft = "0px"

        let btn = document.getElementById("btn-sb-togle")
        btn.style.display = "block"
    }

    render(){

        const menuProjectLink = this.props.menuProject.map(dt => (dt.isDelete !== 'Y') ? <Link to={"/project/"+dt.projectId}><li className="none-style-list" style={{padding: "10px",fontSize:"12px",color:"#FFF"}}>{dt.projectName}</li></Link> : '')

        return(
            <React.Fragment>
                {this.state.createProjectPop}
                <div id="sidebar" className='sidebar main-color'>
                    <div style={{height:"60px"}}>
                        <img style={{marginTop:"12px",marginLeft: "15px"}} src={Logo}></img>
                        <button
                            onClick={this.bars}
                            style={{float: "right",
                                    background: "none",
                                    color: "#FFF",
                                    marginTop: "20px",
                                    fontSize: "16px"}}>
                            <FontAwesomeIcon icon={faBars}/>
                        </button>
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