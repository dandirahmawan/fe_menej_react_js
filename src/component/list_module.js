import React from 'react'
import {connect} from 'react-redux'
import {setTitleHader} from '../redux/action'
import {baseUrl} from '../const/const'
import NotFound from './404'
import Module from './module/module'
import {Spinner} from './spinner'
import {getCookieUserId} from '../function/function'
import {setDataModule} from '../redux/action'

class list_module extends React.Component{

    constructor(){
        super()
        this.state = {
            // data: [],
            dataProject: [],
            dataTeam:[],
            loader:"",
            projectIdHeader:"",
            notFound:false
        }
        this.hidePopUp = this.hidePopUp.bind(this)
        this.commitDeleteModule = this.commitDeleteModule.bind(this)
        this.mapingProjectData = this.mapingProjectData.bind(this)
        this.handleChangeNameModule = this.handleChangeNameModule.bind(this)
        this.commitNewModule = this.commitNewModule.bind(this)
        this.commitDeleteModule = this.commitDeleteModule.bind(this)
        this.updateDataModule = this.updateDataModule.bind(this)
        this.updateDataDocumentFile = this.updateDataDocumentFile.bind(this)
    }

    componentDidMount(){
        document.addEventListener('keydown', this.deleteModuleDel);
        this.props.setTitleHeader("Module")
        this.props.setDataModule("ayo lah")
        this.fetchData(1, this.props.match.params.id)
    }

    componentWillReceiveProps(nextProps){
        nextProps.setTitleHeader("Module")
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.setState({dataProject : []})
            this.fetchData(1, nextProps.match.params.id)
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
        fetch(baseUrl+"/data_module", {
            method : "POST",
            body: formData
        }).then(res => res.json())
        .then((result) => {
            this.setState({loader: ""})
            var dataProjectFetch = result[0]['dataProject']
            var dataModule = result[0]['dataModule']
            var dataTeam = result[0]['dataProjectTeam']
            
            if(dataProjectFetch === undefined || dataProjectFetch.length == 0){
                this.setState({notFound: true})
            }

            if(dataProjectFetch === undefined) return false

            this.props.setDataModule(dataModule)
            
            this.setState({
                // data: dataModule,
                dataTeam: dataTeam,
                dataProject: dataProjectFetch
            })
        })
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
        var userId = getCookieUserId()
        var form = new FormData()
        form.append("userId", userId)
        form.append("proposalId", dataSelected)
        fetch(baseUrl+"/delete_module", {
            method: "POST",
            body: form
        })

        var prevState = [...this.state.data]
        prevState.map(dt => {
            var idx = dataSelected.indexOf(dt.modulId)
            if(idx != -1){
                dt.isTrash = "Y"
            }
        })
    }

    handleChangeNameModule(e){
        var v = e.target.value
        this.setState({
            newModulName: v
        })
    }

    commitNewModule(userId, projectName, dueDate, description, pi){
        var userLogin = getCookieUserId()
        var form = new FormData()
        form.append("userId", userId)
        form.append("userLogin", userLogin)
        form.append("moduleName", projectName)
        form.append("dueDate", dueDate)
        form.append("description", description)
        form.append("projectId", pi)

        fetch(baseUrl+"/insert_module", {
            method: "POST",
            body:form
        }).then(res => res.json())
        .then((result) => {
            var append = this.state.data.concat(result[0])
            this.setState({
                data: append
            })
        })
    }

    updateDataModule(moduleId, moduleName, moduleStatus, userId, userName, emailUser, desciptionModule, dueDate){
        this.setState(prevState => {
            prevState.data.map(dt => {
                if(dt.modulId == moduleId){
                    dt.modulName = moduleName
                    dt.modulStatus = moduleStatus
                    dt.userId = userId
                    dt.description = desciptionModule
                    dt.userName = userName
                    dt.endDate = new Date(dueDate)
                }
            })

            return{
                data: prevState.data
            }
        })
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

    render(){

        const data =  <Module 
                        projectIdHeader = {this.state.projectIdHeader}
                        dataProject={this.state.dataProject}  
                        dataModule={this.props.dataModule}
                        dataTeam={this.state.dataTeam}
                        updateDataModule={this.updateDataModule}
                        commitDeleteModule={this.commitDeleteModule}
                        commitNewModule={this.commitNewModule}
                        commitDeleteModule={this.commitDeleteModule}/>

        return(
            <div id="main-base-data">
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
        dataModule : state.dataModule
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setTitleHeader : (a) => dispatch(setTitleHader(a)),
        setDataModule : (a) => dispatch(setDataModule(a)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(list_module);