import React from 'react'
import {connect} from 'react-redux'
import {setTitleHader, setDataLabelModule, setAssignedModules} from '../../redux/action'
import {baseUrl} from '../../const/const'
import NotFound from '../404'
import Module from './module'
import {Spinner} from '../spinner'
import {getCookieUserId, popUpAlert, getCookieSessionId} from '../../function/function'
import {setDataModule, deleteDataModule, deleteMember, setDataLabel} from '../../redux/action'
import {ApiFetch} from '../apiFetch'

class list_module extends React.Component{

    constructor(){
        super()
        this.state = {
            dataProject: [],
            dataTeam:[],
            permitionProject:[],
            loader:"",
            projectIdHeader:"",
            dataTab:[],
            dataNote:[],
            dataStatus:[],
            notFound:false
        }
        this.hidePopUp = this.hidePopUp.bind(this)
        this.commitDeleteModule = this.commitDeleteModule.bind(this)
        this.mapingProjectData = this.mapingProjectData.bind(this)
        this.handleChangeNameModule = this.handleChangeNameModule.bind(this)
        this.commitNewModule = this.commitNewModule.bind(this)
        this.commitDeleteModule = this.commitDeleteModule.bind(this)
        this.updateDataDocumentFile = this.updateDataDocumentFile.bind(this)
        this.commitDeleteMember = this.commitDeleteMember.bind(this)
        this.refreshModule = this.refreshModule.bind(this)
        this.commitNewStatus = this.commitNewStatus.bind(this)
        this.updateDataStatus = this.updateDataStatus.bind(this)
    }

    componentDidMount(){
        document.addEventListener('keydown', this.deleteModuleDel);
        this.props.setTitleHeader("Module")
        this.fetchData(getCookieUserId(), this.props.match.params.id)
    }

    componentWillReceiveProps(nextProps){
        nextProps.setTitleHeader("Module")
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.setState({dataProject : []})
            this.fetchData(getCookieUserId(), nextProps.match.params.id)
        }
    }

    fetchData(userId, projectId){
        this.setState({
            loader: <Spinner textLoader="Load data.."/>,
            projectIdHeader: projectId
        })

        var formData = new FormData();
        formData.append("projectId", projectId)
        formData.append("userId", userId)
        formData.append("sessionId", getCookieSessionId())
        ApiFetch("/data_module", {
            method : "POST",
            body: formData
        }).then(res => res.json())
        .then((result) => {
            if(result.length > 0){
                this.setState({loader: ""})
                var dataProjectFetch = result[0]['dataProject']
                var dataModule = result[0]['dataModule']
                var dataTeam = result[0]['dataProjectTeam']
                var permition  = result[0]['permitionProjects']
                var dataNote = result[0]['note']
                var dataTab = result[0]['tabs']
                var dataStatus = result[0]['statusModules']
                var dataLabel = result[0]['labelsList']
                var dataLabelModule = result[0]['labelModulelist']
                var assignedModules = result[0]['assignedModules']
                
                if(dataProjectFetch === undefined || dataProjectFetch.length == 0){
                    this.setState({notFound: true})
                }

                if(dataProjectFetch === undefined) return false
                
                this.props.setDataModule(dataModule)
                this.props.setDataLabels(dataLabel)
                this.props.setDataLabelsModule(dataLabelModule)
                this.props.setAssigndeModules(assignedModules)
                
                this.setState({
                    dataTeam: dataTeam,
                    dataProject: dataProjectFetch,
                    permitionProject: permition,
                    dataNote: dataNote,
                    dataTab: dataTab,
                    dataStatus: dataStatus
                })
            }
        })
    }

    refreshModule(){
        this.fetchData(getCookieUserId(), this.props.match.params.id)
    }

    mapingProjectData(idProject){
        this.props.projectData.map(dt => {
            if(dt.projectId == idProject){
                this.setState({
                    projectId: dt.projectId,
                    projectName: dt.projectName,
                    countModule: dt.countModule,
                    countBugs: dt.countBugs,
                    countMember: dt.countTeam,
                    projectManager: dt.picName
                })
            }
        })
    }
    

    hidePopUp(){
        this.setState({
            infoPop: ""
        })
    }

    commitDeleteModule(dataSelected){
        console.log(dataSelected)
        for(var i = 0;i<dataSelected.length;i++){
            this.props.deleteDataModule(dataSelected[i])
        }
    }

    handleChangeNameModule(e){
        var v = e.target.value
        this.setState({
            newModulName: v
        })
    }

    commitNewModule(userId, mouleName, dueDate, description, pi, status){
        var userLogin = getCookieUserId()
        var form = new FormData()
        form.append("userId", userId)
        form.append("userLogin", userLogin)
        form.append("moduleName", mouleName)
        form.append("dueDate", dueDate)
        form.append("description", description)
        form.append("projectId", pi)
        form.append("status", status)

        var isReady = false
        this.props.dataModule.map(dt => {
            if(dt.modulName == mouleName){
                isReady = true
            }
        })

        if(!isReady){
            ApiFetch("/insert_module", {
                method: "POST",
                body:form
            }).then(res => res.json())
            .then((result) => {
                var append = this.props.dataModule.concat(result[0])
                this.props.setDataModule(append)
            })
        }else{
            popUpAlert("Module name already exists", "warning")
        }
        
    }

    updateDataDocumentFile(type, moduleId){
        this.setState(prevState => {
            prevState.data.map(dt => {
                if(dt.modulId == moduleId){
                    if(type == "add"){
                        dt.countDoc = parseInt(dt.countDoc) + 1
                    }else{
                        dt.countDoc = dt.countDoc - 1
                    }
                }
            })

            return{
                data: prevState.data
            }
        })
    }

    commitDeleteMember(userId){
        this.props.deleteMember(userId)
    }

    commitNewStatus(status){
        let statusJson = status
        let arrStatus = this.state.dataStatus
        arrStatus.push(statusJson)
        console.log(arrStatus)
        this.setState({
            dataStatus: arrStatus
        })
    }

    updateDataStatus(jsonData){
        this.setState({
            dataStatus: jsonData
        })
    }

    render(){

        const data =  <Module 
                            projectIdHeader = {this.state.projectIdHeader}
                            dataProject={this.state.dataProject}  
                            dataModule={this.props.dataModule}
                            dataTeam={this.state.dataTeam}
                            dataNote={this.state.dataNote}
                            dataTab={this.state.dataTab}
                            dataStatus={this.state.dataStatus}
                            dataPermition={this.state.permitionProject}
                            commitDeleteModule={this.commitDeleteModule}
                            commitNewModule={this.commitNewModule}
                            commitDeleteModule={this.commitDeleteModule}
                            commitDeleteMember={this.commitDeleteMember}
                            commitNewStatus={this.commitNewStatus}
                            updateDataStatus={this.updateDataStatus}
                            refreshModule={this.refreshModule}
                        />

        return(
            <div id="main-base-data" style={{marginBottom: "100px"}}>
                {this.state.loader}
                {(this.state.notFound) ? <NotFound/> : ""}
                {(this.state.dataProject.length > 0) ? data : ""}
            </div> 
        )
    }
}

const mapStateToProps = state =>{
    return{
        projectData : state.dataProject,
        dataModule : state.dataModule,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setTitleHeader : (a) => dispatch(setTitleHader(a)),
        setDataModule : (a) => dispatch(setDataModule(a)),
        deleteDataModule : (a) => dispatch(deleteDataModule(a)),
        deleteMember : (a) => dispatch(deleteMember(a)),
        setDataLabels : (a) => dispatch(setDataLabel(a)),
        setDataLabelsModule : (a) => dispatch(setDataLabelModule(a)),
        setAssigndeModules : (a) => dispatch(setAssignedModules(a))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(list_module);