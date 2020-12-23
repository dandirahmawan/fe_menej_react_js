import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faFolder, faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons'
import { getCookieSessionId, getCookieUserId } from '../../function/function'
import { ApiFetch } from '../apiFetch'
import { connect } from 'react-redux'
import { setDataProject } from '../../redux/action'
import CardList from './card_list'
import CreateProject from './create_project'

class project extends React.Component{

    state = {
        popup: null
    }

    newProject = this.newProject.bind(this)

    componentDidMount(){
        var userId = getCookieUserId()
        var sessionId = getCookieSessionId()

        let path = window.location.pathname
        let paths = path.split("/")

        let bd = document.getElementsByTagName("body")
        bd[0].style.background = "#efefef"
        
        var form = new FormData()
        form.append("userId", userId)
        form.append("sessionId", sessionId)

        var header = new Headers()
        header.append("sessionId", getCookieSessionId())
        header.append("userId", getCookieUserId());

        ApiFetch("/list_project", {
            method: "POST",
            body: form
        }).then(res => res.json()).then(result => {
            
            let projectId = 0
            if(paths[1] == "project") projectId = paths[2]
            
            this.props.setDataProject(result)
            this.setState({
                projectSelected: projectId,
                isLoad: false
            })
        })
    }

    newProject(){
        this.setState({
            popup: <CreateProject hidePopUp={() => {this.setState({popup: null})}}/>
        })
    }
    
    render(){
        const data = this.props.dataProject.map(dt => {
            return <CardList createdDate={dt.createdDate}
                        selectProject={this.selectProject} 
                        projectName={dt.projectName} 
                        projectId={dt.projectId}/>
        })

        return(
            <Fragment>
                {this.state.popup}
                <div style={{marginLeft: "0px"}}>
                    {/* <div style={{width: "300px", margin: "auto", textAlign: "center", marginTop: "100px"}} 
                        className="second-font-color">
                        <FontAwesomeIcon style={{fontSize: "100px"}} icon={faFolder}/><br/>
                        <div style={{fontSize: "12px", lineHeight: "1.5"}}>
                            <span style={{fontSize: "14px"}} className="bold">No project selected</span><br/>
                            Select project on list project to see detail data project like module, bugs, document and file
                        </div>
                    </div> */}
                    <div style={{width: "300px", margin: "auto", textAlign: "center", marginTop: "80px", display: "none"}}>
                        <FontAwesomeIcon style={{fontSize: "50px"}} className="second-font-color" icon={faFolder}/><br/>
                        <div style={{fontSize: "12px", lineHeight: "1.5", marginBottom: "10px"}}>
                            <span className="bold" style={{fontSize: "18px"}}>No project data to display</span><br/>
                            <span className="second-font-color">Please create new project and then start to manage your project in here</span>
                        </div>
                        <a onClick={this.setAssigned} style={{textDecoration: "none"}}>
                            <div style={{borderRadius: "3px", marginTop: '5px', border: '1px solid rgb(172 180 208)', width: "100px", margin: "auto"}}>
                                <div className="bold" style={{padding: "10px", textAlign: "center", fontSize: "11px"}}>
                                    <FontAwesomeIcon icon={faEdit}/> New project
                                    {/* <FontAwesomeIcon style={{fontSize: "14px"}} icon={faUserCog}/> */}
                                </div>
                            </div>
                        </a>
                        {/* <button className="btn-primary">
                            New project
                        </button> */}
                    </div>
                    
                    <div style={{width: "300px", margin: "auto", marginTop: "75px"}}>
                        <div className="main-border-bottom second-font-color" 
                            style={{fontSize: "12px", paddingBottom: "10px", marginBottom: "10px", display: "flex", alignItems: "center"}}>
                            <FontAwesomeIcon icon={faInfoCircle} style={{fontSize: "14px"}}/> 
                            <div style={{marginLeft: "10px"}}>Please select project from the list bellow</div>
                        </div>

                        {data}

                        <a onClick={this.newProject} id="btn-new-project">
                            <div className="main-color shadow" 
                                style={{width: "40px", height: "40px", borderRadius: "100%", position: "fixed", bottom: "100px", marginLeft: "330px"}}>
                                <div style={{textAlign: "center", paddingTop: "12px"}}>
                                    <FontAwesomeIcon icon={faPlus} style={{color: "#FFF"}}/>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        dataProject : state.dataProject
    }
}

const mapDispatchToProject = dispatch => {
    return{
        setDataProject : (dataProject) => dispatch(setDataProject(dataProject))
    }
}

export default connect(mapStateToProps, mapDispatchToProject) (project)