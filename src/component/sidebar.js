import React from  'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import CreateProject from './project/create_project'
import {faFolder, faPlusCircle, faCalendarAlt, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { getCookieSessionId, getCookieUserId } from '../function/function'
import { ApiFetch } from './apiFetch'
import {setDataProject} from '../redux/action'
import { Spinner } from './spinner'
import Fetch from '../function/fetchApi'

const mapStateToProps = state => {
    return{
        menuProject : state.dataProject
    }
}

const mapDispatchToProject = dispatch => {
    return{
        setDataProject : (dataProject) => dispatch(setDataProject(dataProject))
    }
}

class sidebar extends React.Component{
    
    constructor(){
        super();
        this.state = {
            isCollpase: false,
            createProjectPop:"",
            projectSelected: null,
            isLoad: true
        }
        this.collapseAction = this.collapseAction.bind(this)
        this.createProject = this.createProject.bind(this)
        this.hidePopUp = this.hidePopUp.bind(this)
        this.selectProject = this.selectProject.bind(this)
    }

    collapseAction(){
        this.setState({
            isCollpase: true
        })
    }

    componentDidMount(){
        let elm = document.getElementById("sidebar")
        let setHeight = elm.offsetHeight - 63
        elm.style.height = setHeight+"px"

        var userId = getCookieUserId()
        var sessionId = getCookieSessionId()

        let path = window.location.pathname
        let paths = path.split("/")


        var form = new FormData()
        form.append("userId", userId)
        form.append("sessionId", sessionId)

        var header = new Headers()
        header.append("sessionId", getCookieSessionId())
        header.append("userId", getCookieUserId());

        let fetch = new Fetch()
        fetch.post("/list_project", form).then(result => {
            try {
                let projectId = 0
                if(paths[1] == "project") projectId = paths[2]
                
                this.props.setDataProject(result)
                this.setState({
                    projectSelected: projectId,
                    isLoad: false
                })
            } catch (error) {
                
            }
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

    selectProject(projectId){
        this.setState({
            projectSelected: projectId
        })
    }

    render(){
        const dataProject = this.props.menuProject.map(dt => {
            const toLink = "/project/"+dt.projectId
            let classBase = (dt.projectId == this.state.projectSelected) 
                            ? 
                                "tr-selectable-project tr-selectable-project-selected" 
                            : 
                                "tr-selectable-project"
           
            return <Link to={toLink} style={{textDecoration: "none"}}>
                        <div onClick={() => this.selectProject(dt.projectId)} className={classBase} style={{overflow: "hidden", paddingLeft: "10px", paddingRight: "10px", paddingTop: "5px", paddingBottom: "5px", cursor: "pointer"}}>
                                <div style={{width: "35px"}}>
                                    <FontAwesomeIcon icon={faFolder} style={{color: "#d4ae2b", fontSize: "35px"}}/>
                                </div>
                                <div style={{marginLeft: "45px", marginTop: "-29px"}}>
                                    <div className="bold" style={{fontSize: "12px"}}>{dt.projectName}</div>
                                    <div className="second-font-color bold" style={{fontSize: "10px"}}>
                                        <FontAwesomeIcon icon={faCalendarAlt}/> {dt.createdDate}
                                    </div>
                                </div>
                            </div>
                        </Link>
        })

        return(
            <React.Fragment>
                {this.state.createProjectPop}
                <div id="sidebar" className='sidebar main-border-right'>
                    <div>
                        <div className="bold second-font-color main-border-bottom" style={{fontSize: "12px", padding: "10px", paddingTop: "10px", overflow: "hidden"}}>
                            <FontAwesomeIcon icon={faFolder} style={{color: "#d4ae2b"}}/>&nbsp;
                            List project
                            <button onClick={this.createProject} className="main-border-left" style={{float: "right", background: "none"}}>
                                <FontAwesomeIcon className="main-font-color" icon={faPlusCircle}/>
                            </button>
                        </div>
                    </div>
                    <div id="base-data-project">
                        {
                            (this.state.isLoad)
                            ?
                                <React.Fragment>
                                    <Spinner size="20px"/>
                                    <div className="second-font-colot bold" style={{textAlign: "center", fontSize: "11px"}}>Loading..</div>
                                </React.Fragment>
                            :   ""
                                
                        }
                        {
                            (this.props.menuProject.length > 0 && !this.state.isLoad)
                            ?
                                dataProject
                            :
                                <div className="second-font-color" style={{textAlign: "center", fontSize: "12px", padding: "20px"}}>
                                    <FontAwesomeIcon icon={faFolder} style={{fontSize: "20px"}}/><br/>
                                    <span className="bold">No data to display</span>
                                    <div style={{fontSize: "11px"}}>
                                        The project wthin you as a team will be display here, you can add or create new project with click 
                                        &nbsp;<FontAwesomeIcon icon={faPlusCircle}/> above
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProject)(sidebar)