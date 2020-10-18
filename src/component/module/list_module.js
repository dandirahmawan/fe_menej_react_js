import React from 'react'
import {connect} from 'react-redux'
import {setTitleHader, setDataLabelModule, setAssignedModules} from '../../redux/action'
import NotFound from '../404'
import Module from './module'
import {Spinner} from '../spinner'
import {getCookieUserId, popUpAlert, getCookieSessionId} from '../../function/function'
import {setDataModule, deleteDataModule, deleteMember, setDataLabel, setDataStatus} from '../../redux/action'
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
            notFound:false
        }
        this.hidePopUp = this.hidePopUp.bind(this)
        this.commitDeleteModule = this.commitDeleteModule.bind(this)
        this.mapingProjectData = this.mapingProjectData.bind(this)
        this.handleChangeNameModule = this.handleChangeNameModule.bind(this)
        this.commitNewModule = this.commitNewModule.bind(this)
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
            projectIdHeader: projectId,
            notFound: false
        })

        let bd = document.getElementsByTagName("body")
        bd[0].style.background = "#FFF"

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
                this.props.setDataStatus(dataStatus)
                
                this.setState({
                    dataTeam: dataTeam,
                    dataProject: dataProjectFetch,
                    permitionProject: permition,
                    dataNote: dataNote,
                    dataTab: dataTab
                    // dataStatus: dataStatus
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
        let newData = []
        for(let i = 0;i<this.props.dataModule.length;i++){
            let dt = this.props.dataModule[i]
            let idx = dataSelected.indexOf(dt.modulId)
            if(idx == -1){
                newData.push(dt)
            }
        }
        
        this.props.setDataModule(newData)
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
                let dataModule = result[0].module
                let dataAssignTo = result[0].assignTo
                
                var append = this.props.dataModule.concat(dataModule)
                this.props.setDataModule(append)
                
                dataAssignTo.map(dt => {
                    var appendAssign = this.props.assignedModules.concat(dt)
                    this.props.setAssigndeModules(appendAssign)
                })
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
        // let statusJson = status
        // let arrStatus = this.state.dataStatus
        // arrStatus.push(statusJson)
        // this.setState({
        //     dataStatus: arrStatus
        // })
    }

    /*unused function*/
    updateDataStatus(jsonData){
        // this.props.setDataStatus(jsonData)
    }

    render(){
        let listExistData = "not exist"
        this.state.dataProject.map(dt => {
            let paramId = this.props.match.params.id
            if(dt.projectId == paramId) {
                listExistData = "exists"
            }
        })

        const data =  <Module 
                            projectIdHeader = {this.state.projectIdHeader}
                            dataProject={this.state.dataProject}
                            dataTeam={this.state.dataTeam}
                            dataNote={this.state.dataNote}
                            dataTab={this.state.dataTab}
                            // dataStatus={this.state.dataStatus}
                            dataPermition={this.state.permitionProject}
                            commitDeleteModule={this.commitDeleteModule}
                            commitNewModule={this.commitNewModule}
                            commitDeleteMember={this.commitDeleteMember}
                            commitNewStatus={this.commitNewStatus}
                            // updateDataStatus={this.updateDataStatus}
                            refreshModule={this.refreshModule}
                        />

        return(
            <div id="main-base-data">
                {this.state.loader}
                {(this.state.notFound) ? <NotFound/> : ""}
                {
                    (this.state.dataProject.length > 0) 
                    ? 
                        (listExistData == "exists")
                        ?
                            data
                        :
                            <div style={{textAlign: "center", marginTop: "50px"}}>
                                <div className="bold" style={{fontSize: "24px"}}>Data project is not available anymore</div>
                                <div className="second-font-color" style={{fontSize: "13px"}}>Please select another project on existing list, or create new project</div>
                            </div>
                    : 
                        ""}
            </div> 
        )
    }
}

const mapStateToProps = state => {
    return{
        dataModule: state.dataModule,
        assignedModules: state.assignedModules
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
        setAssigndeModules : (a) => dispatch(setAssignedModules(a)),
        setDataStatus : (data) => dispatch(setDataStatus(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(list_module);