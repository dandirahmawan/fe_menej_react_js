import React from 'react'
import ModuleInfo from './module_info'
import BugsModule from './bugs_module'
import DocFileModule from './doc_file_module'
import {getCookieUserId} from '../../function/function'
import { baseUrl } from '../../const/const'
import {connect} from 'react-redux'
import {updateDataModuleBugs, updateDataModuleDocFile, updateDataModule} from '../../redux/action'

class detail extends React.Component{

    constructor(){
        super()
        this.state = {
            dataBugs: [],
            dataDocFile: [],
            projectId:"",
            moduleId:"",
            moduleName: "",
            userId:"",
            emailUser:"",
            userName:"",
            descriptionModule: "",
            moduleStatus: "",
            dueDate:"",
            miDisplay:"",
            mbDisplay:"none",
            dfmDisplay: "none",
            mainBaseHeight: "",
            documentFileUploadData:""
        }
        this.navDetail = this.navDetail.bind(this)
        this.changeNameModul = this.changeNameModul.bind(this)
        this.changeUserSelected = this.changeUserSelected.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
        this.changeDesc = this.changeDesc.bind(this)
        this.commitModuleInfo = this.commitModuleInfo.bind(this)
        this.changeDate = this.changeDate.bind(this)
        this.commitBugs = this.commitBugs.bind(this)
        this.documentFileUpload = this.documentFileUpload.bind(this)
        this.commitDocFileUpload = this.commitDocFileUpload.bind(this)
        this.deleteDocFile = this.deleteDocFile.bind(this)
        this.deleteBugs = this.deleteBugs.bind(this)
    }
    
    componentDidMount(){
        var d = document.getElementById("detail-modul-base")
        var h = d.offsetHeight;
        var w = d.offsetWidth;
        var ww = window.innerWidth
        var wh = window.innerHeight

        var l = (ww - w) / 2
        var t = (wh - h) / 2
        d.style.top = t+"px"
        d.style.left = l+"px"

        //data json
        var dm = this.props.dataModule
        
        var form = new FormData()
        form.append("moduleId",  dm.modulId)
        fetch(baseUrl+"/detail_module", {
            method: "POST",
            body: form
        }).then(res => res.json())
        .then(result => {
            this.setState({
                dataBugs: result.bugs,
                dataDocFile: result.documentFile
            })
        })

        this.setState({
            projectId: dm.projectId,
            moduleId: dm.modulId,
            moduleName : dm.modulName,
            desciptionModule : dm.description,
            userId: dm.userId,
            emailUser: dm.emailUser,
            userName: dm.userName,
            moduleStatus: dm.modulStatus,
            dueDate: this.dateInputConvert(dm.endDate)
        })

        var hd = document.getElementById("header-dtl")
        var h1 = hd.offsetHeight

        var mbd = document.getElementById("main-base-detail")
        mbd.style.marginTop = h1+"px"

        this.setState({
            mainBaseHeight: 400 - h1
        })
        
    }

    navDetail(e){
        var t = e.currentTarget
        var p = t.parentNode
        var c = p.children
        for(var i = 0;i<c.length;i++){
            c[i].setAttribute("class", "second-font-color")
        }
        t.setAttribute("class", "bold main-color")
        var navfor = (t.getAttribute("nav-for"))

        this.setState({
            miDisplay: "none",
            mbDisplay: "none",
            dfmDisplay: "none"
        })

        if(navfor == 'info') {this.setState({miDisplay: "block"})}
        if(navfor == 'bugs') {this.setState({mbDisplay: "block"})}
        if(navfor == 'doc_file') {this.setState({dfmDisplay: "block"})}
    }

    changeNameModul(e){
        this.setState({
            moduleName: e.target.value 
        })
    }

    changeUserSelected(ue, ui, un){
        this.setState({
            userId: ui,
            emailUser: ue,
            userName: un
        })
    }

    changeStatus(e){
        var status = e.target.value
        this.setState({
            moduleStatus: status
        })
    }

    changeDesc(e){
        this.setState({
            descriptionModule: e.target.value
        })
    }

    changeDate(e){
        this.setState({
            dueDate: e.target.value
        })
    }

    commitModuleInfo(){
        var form = new FormData()
        form.append("date", this.state.dueDate)
        form.append("moduleId",this.state.moduleId)
        form.append("status", this.state.moduleStatus)
        form.append("pic", this.state.userId)
        form.append("desc", this.state.descriptionModule)
        fetch(baseUrl+"/update_module", {
            method: "POST",
            body: form
        }).then(res => res.text())
        .then(result => {
            if(result == 'success'){
                this.props.updateDataModule(this.state.moduleId, this.state.moduleName, this.state.moduleStatus, 
                    this.state.userId, this.state.userName, this.state.emailUser, this.state.descriptionModule, this.state.dueDate)
                this.setState({
                    infoPop: ""
                })
            }
        })
    }

    dateInputConvert(date){
        var d = new Date(date)
        var year = d.getFullYear()
        var date = (d.getDate() < 10) ? "0"+d.getDate() : d.getDate()

        // january is 0 not 1
        var m = parseInt(d.getMonth() + 1)
        var month = (m < 10) ? "0"+m : m

        return year+"-"+month+"-"+date
    }

    commitBugs(bugsText){
        
        var form = new FormData()
        form.append("projectId", this.state.projectId)
        form.append("moduleId", this.state.moduleId)
        form.append("bugs", bugsText)

        fetch(baseUrl+"/add_bugs", {
            method: "POST",
            body: form
        }).then(res => res.json())
        .then(result => {
            var newState = this.state.dataBugs.concat(result)
            this.props.updateDataModuleBugs(this.state.moduleId, "add")
            this.setState({
                dataBugs: newState
            })
        })
    }

    documentFileUpload(e){
        var file = e.target.files[0]
        this.setState({
            documentFileUploadData: file
        })
    }

    commitDocFileUpload(){
        var form = new FormData()
        form.append('file', this.state.documentFileUploadData)
        form.append('userId', this.state.userId)
        form.append('projectId', this.state.projectId)
        form.append('moduleId', this.state.moduleId)
        fetch(baseUrl+"/document_file",{
            method: "POST",
            body: form
        }).then(res => res.text())
        .then(result => {
            this.props.updateDataModuleDocFile(this.state.moduleId, "add")
            var result = JSON.parse(result)
            var newState = this.state.dataDocFile.concat(result)
            this.setState({
                dataDocFile: newState,
                documentFileUploadData: ""
            })
        })
    }

    deleteDocFile(fileName){
        var mi = this.state.moduleId
        var pi = this.state.projectId
        var userId = getCookieUserId()

        var form = new FormData()
        form.append("moduleId", mi)
        form.append("projectId", pi)
        form.append("fileName", fileName)
        form.append("userId", userId)

        fetch(baseUrl+"/delete_document_file", {
            method: "POST",
            body: form
        }).then(res => res.text())
        .then(result => {
            if(result == 1){
                var newState = this.state.dataDocFile
                this.state.dataDocFile.map(dt => {
                    if(dt.projectId == pi && dt.modulId == mi && dt.fileName == fileName){
                        var idx = this.state.dataDocFile.indexOf(dt)
                        newState.splice(idx, 1)
                    }
                    return dt
                })

                this.setState({
                    dataDocFile: newState
                })
                this.props.updateDataModuleDocFile(mi, "delete")
            }

           var row = document.getElementsByClassName("row-doc-file")
           for(var i = 0;i<row.length;i++){
                row[i].style.opacity = "1"
           }

        })
    }

    deleteBugs(note){
        var mi = this.state.moduleId
        var pi = this.state.projectId
        
        var newStateBugs = this.state.dataBugs
        this.state.dataBugs.map(dt => {
            if(dt.modulId == mi && dt.projectId == pi && dt.note == note){
                var idx = newStateBugs.indexOf(dt);
                newStateBugs.splice(idx, 1)
                this.setState({
                    dataBugs: newStateBugs
                })
                this.props.updateDataModuleBugs(this.state.moduleId, "delete")
            }
        })
    }

    render(){

        return(
            <React.Fragment>
                <div onClick={this.props.hide} className="block"></div>
                <div id="detail-modul-base" style={{width: "500px", height: "400px", background: "#FFF", position: "fixed", zIndex: "1000"}}> 
                    <div id="header-dtl" style={{position: "fixed", width: "500px"}}>
                        <div className='main-border-bottom' style={{padding: "10px", background: "#FFF"}}>
                            <i style={{fontSize: "14px", color: "#d4ae2b"}} class="fa fa-clipboard"></i>
                            &nbsp;&nbsp;
                            <span className='bold' style={{fontSize: "14px"}}>{this.state.moduleName}</span>
                            <a onClick={this.props.close}><i style={{float: "right", color: "#a2a2a2"}} class="fa fa-times"></i></a>
                        </div>
                        <div className="main-border-bottom" style={{padding: "5px", paddingLeft: "10px", background: "#FFF"}}>
                            <button onClick={this.navDetail} nav-for="info" id='nav-dtl' className="bold main-color" style={{marginRight: "20px", background: "none", border: "none", fontSize: "12px"}}>Info</button>
                            <button onClick={this.navDetail} nav-for="bugs" id='nav-dtl' className="second-font-color" style={{marginRight: "20px", background: "none", border: "none", fontSize: "12px"}}>Bugs</button>
                            <button onClick={this.navDetail} nav-for="doc_file" id='nav-dtl' className="second-font-color" style={{marginRight: "20px", background: "none", border: "none", fontSize: "12px"}}>Doc & file</button>
                        </div>
                    </div>

                    <div id="main-base-detail">
                        <div id='mi-base' style={{display: this.state.miDisplay}}>
                            <ModuleInfo
                                moduleName={this.state.moduleName}
                                userId={this.state.userId}
                                emailUser={this.state.emailUser}
                                userName={this.state.userName}
                                description={this.state.descriptionModule}
                                moduleStatus={this.state.moduleStatus}
                                dueDate={this.state.dueDate}
                                //action button
                                changeName={this.changeNameModul}
                                changeUserSelected={this.changeUserSelected}
                                changeStatus={this.changeStatus}
                                changeDesc={this.changeDesc}
                                commitModule={this.commitModuleInfo}
                                changeDate={this.changeDate}
                            />
                        </div>
                        <div id='mb-base' style={{display: this.state.mbDisplay}}>
                            <BugsModule
                                mainHeight={this.state.mainBaseHeight}
                                dataBugs={this.state.dataBugs}
                                commitBugs={this.commitBugs}
                                deleteBugs={this.deleteBugs}
                                moduleId={this.state.moduleId}
                            />
                        </div>
                        <div id='mdf-base' style={{display: this.state.dfmDisplay}}>
                            <DocFileModule
                                mainHeight={this.state.mainBaseHeight}
                                dataDocFile={this.state.dataDocFile}
                                documentFileUpload={this.documentFileUpload}
                                commitDocFileUpload={this.commitDocFileUpload}
                                deleteDocFile={this.deleteDocFile}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    
}

const mapDispatchToProps = dispath => {
    return{
        updateDataModuleBugs: (moduleId, type) => dispath(updateDataModuleBugs(moduleId, type)),
        updateDataModuleDocFile: (moduleId, type) => dispath(updateDataModuleDocFile(moduleId, type)),
        updateDataModule: (moduleId, moduleName, moduleStatus, userId, userName, emailUser, desciptionModule, dueDate) => dispath(updateDataModule(moduleId, moduleName, moduleStatus, userId, userName, emailUser, desciptionModule, dueDate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (detail)