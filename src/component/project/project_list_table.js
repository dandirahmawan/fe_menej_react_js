import React from 'react'
import Row from './row_project_list_table'
import {connect} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBorderAll, faPlus, faList, faFolder} from '@fortawesome/free-solid-svg-icons'
import New from '../create_project'
import PopupConfirmation from '../popup_confirmation'

class project_list_table extends React.Component{

    constructor(){
        super()
        this.state = {
            popup: "",
            projectId: ""
        }

        this.thProject = React.createRef()
        this.showBorder = this.showBorder.bind(this)
        this.hideBorder = this.hideBorder.bind(this)
        this.deleteProject = this.deleteProject.bind(this)
        this.commitDelete = this.commitDelete.bind(this)
    }

    componentDidMount(){
        if(this.props.isBorder){
            this.showBorder()
        }else{
            this.hideBorder()
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.isBorder != nextProps.isBorder){
            if(nextProps.isBorder){
                this.showBorder()
            }else{
                this.hideBorder()
            }
        }
    }

    showBorder(){
        this.thProject.current.setAttribute("class", "main-border")
        this.thProject.current.style.background = "#f5f5f5"
        this.thProject.current.style.borderTop = "none"

        var elmClass2 = document.getElementsByClassName("tb-project")
        for(var i = 0;i<elmClass2.length;i++){
            var curClass = elmClass2[i].getAttribute("class")
            var setClass = curClass+" main-border"
            elmClass2[i].setAttribute("class", setClass)
        }
    }

    hideBorder(){
        this.thProject.current.setAttribute("class", "")
        this.thProject.current.style.background = "#fff"

        var elmClass2 = document.getElementsByClassName("tb-project")
        for(var i = 0;i<elmClass2.length;i++){
            var curClass = elmClass2[i].getAttribute("class")
            var setClass = curClass.replace("main-border", "")
            elmClass2[i].setAttribute("class", setClass)
        }
    }

    deleteProject(projectId){
        this.setState({
            projectId: projectId,
            popup: <PopupConfirmation 
                        titleConfirmation="Delete project"
                        textPopup="Are you sure, you want delete project ?"
                        hidePopUp={this.hidePopup}
                        yesAction={this.commitDelete}/>
        })
    }

    commitDelete(){
        var projectId = this.state.projectId
        this.props.deleteProject(projectId)
        this.setState({
            popup: ""
        })
    }

    render(){

        const data = this.props.dataProject.map(dt => {
            if(dt.isDelete != "Y"){
                return <Row id={dt.projectId} 
                        name={dt.projectName} 
                        createdBy={dt.createdBy} 
                        pic={dt.pic}
                        picName={dt.picName}
                        countBugs={dt.countBugs}
                        countModule={dt.countModule}
                        countTeam={dt.countTeam}
                        //action props
                        contextMenu={this.props.contextMenu}
                        deleteProject={this.deleteProject}
                    />
            }
        })

        return(
            <React.Fragment>
                <table style={{width: "80%", marginBottom: "150px"}}>
                    <thead  ref={this.thProject} className="th-project">
                        <th className="th-project bold second-font-color main-border-right" colSpan="2" style={{width: "400px"}}>Name</th>
                        <th className="th-project bold second-font-color main-border-right">Pic</th>
                        <th className="th-project bold second-font-color main-border-right">Module</th>
                        <th className="th-project bold second-font-color main-border-right">Bugs</th>
                        <th className="th-project bold second-font-color main-border-right">Member</th>
                        <th className="th-project bold second-font-color" colSpan="2">date</th>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        dataProject: state.dataProject
    }
}

export default connect(mapStateToProps) (project_list_table)