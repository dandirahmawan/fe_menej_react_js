import React from 'react'
import Project from './project_list'
import PopInfo from './info_project'
import PopRename from './rename_project'
import Cm from '../contextMenuProject'
import {setDataProject, renameDataProject, deleteProject, setTitleHader}  from '../../redux/action'
import {connect} from 'react-redux'
import PopupConfirmation from '../popup_confirmation'
import {popUpAlert, getCookieUserId, getCookieSessionId} from '../../function/function'
import {baseUrl} from '../../const/const'
import ProjectListTable from './project_list_table'
import { faBorderAll, faFolder, faPlus, faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import New from '../create_project'
import Handover from './handover'

class project extends React.Component{
    constructor(){
        super()
        this.state = {
            data:[],
            dataSelected:"",
            cMenu:"",
            projectId:"",
            projectName:"",
            infoPop:"",
            listView: false,
            isBorder: false
        }
        this.contextMn = this.contextMn.bind(this)
        this.contextMnRemove = this.contextMnRemove.bind(this)
        this.cmenuItemDismiss = this.cmenuItemDismiss.bind(this)
        this.cmenuItemInfo = this.cmenuItemInfo.bind(this)
        this.cmenuItemRename = this.cmenuItemRename.bind(this)
        this.cmenuItemDelete = this.cmenuItemDelete.bind(this)
        this.cmenuItemHandover = this.cmenuItemHandover.bind(this)
        this.hidePopUp = this.hidePopUp.bind(this)
        this.commitRename = this.commitRename.bind(this)
        this.commitDelete = this.commitDelete.bind(this)
        this.newProject = this.newProject.bind(this)
        this.showBorder = this.showBorder.bind(this)
        this.hideBorder = this.hideBorder.bind(this)
        this.listView = this.listView.bind(this)
    }

    componentDidMount(){
        var isLoad = this.props.location.load
        // if(isLoad !== undefined)

        var userId = getCookieUserId()
        var sessionId = getCookieSessionId()

        this.props.setTitelHeader("Project")
        var form = new FormData()
        form.append("userId", userId)
        form.append("sessionId", sessionId)

        fetch(baseUrl+"/list_project",{
            method: "POST",
            body: form
        })
        .then(res => res.json())
        .then((result) => {
            this.props.setDataProject(result)
        })
    }

    contextMn(e, pic, projectId){
        var tg = e.target
        var id = tg.getAttribute("id")
        if(id == null){
            tg = e.target.parentElement
        }

        var data = projectId
        
        this.props.dataProject.map(dt => {
            if(data == dt.projectId){
                this.setState({
                    projectId: data,
                    projectName: dt.projectName
                })
            }
        })

        var key = (pic == getCookieUserId()) ? "key" : ""
        e.preventDefault()
        var x = e.clientX
        var y = e.clientY
        this.setState({
            cMenu : <Cm clickAction={this.cmenuItemDismiss} 
                        mover={this.mouseOver} 
                        clickRename={this.cmenuItemRename} 
                        clickDelete={this.cmenuItemDelete} 
                        clickHandover={this.cmenuItemHandover} 
                        clickInfo={this.cmenuItemInfo}  
                        xp={x} 
                        yp={y}
                        isKey={key}/>
        })
    }

    commitRename(name){
        var id = this.state.projectId
        this.props.renameProject(id, name)
    }

    cmenuItemInfo(){
        this.contextMnRemove();
        var pn = ''
        var cb = ''
        var cd = ''
        var pic = ''
        var countBugs = ''
        var countTeam = ''
        var countModule = ''
        this.props.dataProject.map(dt => {
            if(dt.projectId == this.state.projectId){
                pn = dt.projectName
                pic = dt.picName
                cb = dt.userName
                cd = dt.createdDate
                countBugs = dt.countBugs
                countTeam = dt.countTeam
                countModule = dt.countModule
            }
        })

        this.setState({
            infoPop : <PopInfo 
                            hide={this.hidePopUp}
                            name={pn}
                            pic={pic}
                            createdBy={cb}
                            createdDate={cd}
                            countBugs={countBugs}
                            countTeam={countTeam}
                            countModule={countModule}
                        />
        })
    }

    cmenuItemDelete(){
        this.contextMnRemove();
        this.setState({ 
            infoPop: <PopupConfirmation textPopup="Are you sure, you want delete this project ?" titleConfirmation="Delete project" hidePopUp={this.hidePopUp} yesAction={this.commitDelete}/>
        })
    }

    cmenuItemRename(){
        this.contextMnRemove();
        this.setState({ 
            infoPop: <PopRename commit={this.commitRename} name={this.state.projectName} hide={this.hidePopUp}/>
        })
    }

    cmenuItemHandover(){
        this.contextMnRemove()
        this.setState({
            infoPop: <Handover projectId={this.state.projectId} cancel={this.hidePopUp}/>
        })
    }

    contextMnRemove(){
        this.setState({
            cMenu : ""
        })
    }

    cmenuItemDismiss(){
        this.contextMnRemove()
    }

    newProject(){
        this.setState({
            infoPop: <New hidePopUp={this.hidePopUp}/>
        })
    }

    showBorder(){
        this.setState({
            isBorder: true
        })
    }

    hideBorder(){
        this.setState({
            isBorder: false
        })
    }

    hidePopUp(){
        this.setState({
            infoPop: ""
        })
    }

    commitDelete(){
        var formData = new FormData()
        formData.append("userId", getCookieUserId())
        formData.append("projectId", this.state.projectId)
        fetch(baseUrl+"/delete_project",{
            method:"POST",
            body:formData
        }).then(res => res.text()).then((result) => {
            if(result == 'success'){
                this.props.deleteProject(this.state.projectId)
                this.setState({
                    infoPop: ""
                })
                popUpAlert("Project has been delete", "success")
            }
        })
    }

    listView(){
        this.setState({
            listView: !this.state.listView
        })
    }

    render(){

        // const projectList = this.props.dataProject.map(dt => (dt.isDelete != 'Y') ? <Project contextMenu={this.contextMn} id={dt.projectId} name={dt.projectName} createdBy={dt.createdBy} pic={dt.pic}/> : '')
        const projectList = this.props.dataProject.map(dt => {
            if(dt.isDelete != 'Y') {
                return <Project contextMenu={this.contextMn} id={dt.projectId} name={dt.projectName} createdBy={dt.createdBy} pic={dt.pic}/>
            }
        })

        return(
            <div id='main-base-data'>
                {this.props.menuProject}
                {this.state.cMenu}
                {this.state.infoPop}
                <div className="bold main-border-bottom" style={{paddingTop: "10px", paddingBottom: "10px", width: "80%"}}>
                    List project
                    
                    {
                        (this.state.listView)
                        ?
                            <button onClick={this.listView} class="bold main-font-color main-border-right" style={{float: "right", background: "none", fontSize: "12px"}}> 
                                <FontAwesomeIcon icon={faFolder}/> Folder View
                            </button>
                        :
                            <button onClick={this.listView} class="bold main-font-color main-border-right" style={{float: "right", background: "none", fontSize: "12px"}}> 
                                <FontAwesomeIcon icon={faList}/> List View
                            </button>
                    }
                    
                    {
                        (this.state.listView)
                        ?
                            (!this.state.isBorder)
                            ?
                                <button onClick={this.showBorder} class="bold main-font-color" style={{float: "right", background: "none", fontSize: "12px"}}> 
                                    <FontAwesomeIcon icon={faBorderAll}/> Show border
                                </button>
                            :
                                <button onClick={this.hideBorder} class="bold main-font-color" style={{float: "right", background: "none", fontSize: "12px"}}> 
                                    <FontAwesomeIcon icon={faBorderAll}/> Hide border
                                </button>
                        :  ""
                    }
                    <button onClick={this.newProject} class="bold main-font-color main-border-right" style={{float: "right", background: "none", fontSize: "12px"}}> 
                        <FontAwesomeIcon icon={faPlus}/> New Project
                    </button>
                </div>

                {
                    (this.state.listView)
                    ?
                        <ProjectListTable 
                            deleteProject={this.props.deleteProject} 
                            isBorder={this.state.isBorder}
                            contextMenu={this.contextMn}/>
                    :
                        <div style={{width: "90%"}}>{projectList}</div>
                }
               
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        dataProject : state.dataProject,
        titleHeader : state.titleHeader
    }
}

const mapDispatchToProps = dispatch => {
    return{
        deleteProject : (id) => dispatch(deleteProject(id)),
        setDataProject : (a) => dispatch(setDataProject(a)),
        setTitelHeader : (a) => dispatch(setTitleHader(a)),
        renameProject : (param, data) => dispatch(renameDataProject(param, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(project)