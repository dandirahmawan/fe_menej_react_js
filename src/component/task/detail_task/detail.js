import React from 'react'
import ReactDom from 'react-dom'
import TaskInfo from './task_info'
import BugsModule from './cheklists_task'
import DocFileModule from './attachment_task'
import {getCookieUserId, getCookieSessionId, popUpAlert, convertDate_dd_mmm_yyy} from '../../../function/function'
import {ApiFetch} from '../../apiFetch'
import {connect} from 'react-redux'
import {updateDataModuleBugs, 
        updateDataModuleDocFile, 
        updateDataModule, 
        appendDataBugs, 
        appendDataDocFile, 
        deleteDataDocFile, 
        setDataLabelModule, 
        updateDataChecklist,
        setDataModule} from '../../../redux/action'
import {Spinner, SpinnerButton} from '../../spinner'
import { baseUrl } from '../../../const/const'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faSave } from '@fortawesome/free-solid-svg-icons'

class detail extends React.Component{
    interval = null

    constructor(){
        super()
        this.state = {
            dataBugs: [],
            dataDocFile: [],
            dataPermition: [],
            projectId:"",
            moduleId:"",
            moduleName: "",
            userId:"",
            emailUser:"",
            userName:"",
            descriptionModule: "",
            moduleStatus: "",
            dueDate:"",
            createdDate:"",
            updatedDate: "",
            miDisplay:"",
            mbDisplay:"none",
            dfmDisplay: "none",
            mainBaseHeight: "",
            sectionId:"",
            sectionIdLast:"",
            pic:"",
            picProject:"",
            documentFileUploadData:"",
            isLoad: true,
            modulePermition: false,
            progressBar: null,
            dataLabelModule: [],
            dataLabelModuleToUpdate: [],
            assignedModules: []
        }
        
        this.btnSaveChange = React.createRef()
        this.baseProgressBar = React.createRef()
        this.uploadedFileIndicator = React.createRef()
        this.navDetail = this.navDetail.bind(this)
        this.changeNameModul = this.changeNameModul.bind(this)
        this.changeUserSelected = this.changeUserSelected.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
        this.changeDesc = this.changeDesc.bind(this)
        this.commitModule = this.commitModule.bind(this)
        this.changeDate = this.changeDate.bind(this)
        this.commitChecklist = this.commitChecklist.bind(this)
        this.documentFileUpload = this.documentFileUpload.bind(this)
        this.commitDocFileUpload = this.commitDocFileUpload.bind(this)
        this.deleteDocFile = this.deleteDocFile.bind(this)
        this.deleteBugs = this.deleteBugs.bind(this)
        // this.closeBugs = this.closeBugs.bind(this)
        // this.uncloseBugs = this.uncloseBugs.bind(this)
        this.commitEditBugs = this.commitEditBugs.bind(this)
        this.setRef = this.setRef.bind(this)
        this.close = this.close.bind(this)
        this.readDataLabel = this.readDataLabel.bind(this)
        this.changeLabelModule = this.changeLabelModule.bind(this)
        this.setBtnPrimarySaveActive = this.setBtnPrimarySaveActive.bind(this)
        this.selectLabelModule = this.selectLabelModule.bind(this)
        this.checkingBugs = this.checkingBugs.bind(this)
        this.assignedModulesAct = this.assignedModulesAct.bind(this)
        this.commitAssignedModule = this.commitAssignedModule.bind(this)
        this.changeSection = this.changeSection.bind(this)
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

        //paramater for set which tab will be default open
        var discloseTab = (this.props.tabParameter === undefined) ? "info" : this.props.tabParameter
        var miDisplay = (discloseTab != "bugs" && discloseTab != "doc_file") ? "block" : "none"
        var mbDisplay = (discloseTab == "bugs") ? "block" : "none"
        var dfmDisplay = (discloseTab == "doc_file") ? "block" : "none"

        var navigationDetailClass = document.getElementsByClassName("nav-dtl");
        for(var i = 0;i<navigationDetailClass.length;i++){
            if(discloseTab == navigationDetailClass[i].getAttribute("nav-for")){
                navigationDetailClass[i].setAttribute("class", "bold main-color nav-dtl")
            }else{
                navigationDetailClass[i].setAttribute("class", "second-font-color nav-dtl")
            }
        }
        
        var form = new FormData()
        form.append("moduleId",  this.props.modulId)
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("projectId", this.props.projectId)

        ApiFetch("/detail_module", {
            method: "POST",
            body: form
        }).then(res => res.json())
        .then(result => {
            var dm = result.dataModule
            result.permitionProject.map(dt => {
                if(dt.permitionCode == 1 && dt.isChecked == "Y"){
                    this.setState({
                        modulePermition: true
                    })
                }
            })

            /*set data label*/
            let dataLabel = []
            if(this.props.dataLabelModule.length > 0){
                dataLabel = this.props.dataLabelModule
            }else{
                dataLabel = result.labelModules
            }
            // if(this.props.dataLabelModule)

            this.setState({
                dataBugs: result.bugs,
                dataDocFile: result.documentFile,
                dataPermition: result.permitionProject,
                dataStatus: result.dataStatus,
                isLoad: false,
                projectId: dm.projectId,
                moduleId: dm.modulId,
                moduleName : dm.modulName,
                descriptionModule : dm.description,
                userId: dm.userId,
                emailUser: dm.emailUser,
                userName: dm.userName,
                moduleStatus: dm.modulStatus,
                pic: dm.pic,
                dueDate: this.dateInputConvert(dm.endDate),
                createdDate: this.dateInputConvert(dm.createdDate),
                updatedDate: this.dateInputConvert(dm.updatedDate),
                picProject: dm.pic,
                miDisplay: miDisplay,
                mbDisplay: mbDisplay,
                dfmDisplay: dfmDisplay,
                sectionId: dm.sectionId,
                sectionIdLast: dm.sectionId,
                dataLabelModule: dataLabel,
                dataLabelModuleToUpdate: result.labelModules,
                assignedModules: result.assignedModules
            })
        })

        let bs = document.getElementById("detail-modul-base")
        let offTop = bs.offsetTop

        var hd = document.getElementById("header-dtl")
        var h1 = hd.offsetHeight

        var maxHeight = window.innerHeight - (parseInt(h1) + offTop)
        var mbd = document.getElementById("main-base-detail")
        mbd.style.marginTop = h1+"px"
        mbd.style.maxHeight = maxHeight+"px"

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
        this.setBtnPrimarySaveActive()
    }

    changeUserSelected(ue, ui, un){
        this.setState({
            userId: ui,
            emailUser: ue,
            userName: un
        })
        this.setBtnPrimarySaveActive()
    }

    changeStatus(idStatus){
        var status = idStatus
        this.setState({
            moduleStatus: status
        })
        this.setBtnPrimarySaveActive()
    }

    changeSection(id){
        var section = id
        this.setState({
            sectionId: section
        })
        this.setBtnPrimarySaveActive()
    }

    changeDesc(e){
        this.setState({
            descriptionModule: e.target.value
        })
        this.setBtnPrimarySaveActive()
    }

    changeDate(e){
        this.setState({
            dueDate: e.target.value
        })
        this.setBtnPrimarySaveActive()
    }

    setBtnPrimarySaveActive(){
        this.btnSaveChange.current.setAttribute("class", "btn-primary bold")
        this.btnSaveChange.current.onclick = this.commitModule
        this.btnSaveChange.current.disabled = false
    }

    changeLabelModule(data){
        this.setBtnPrimarySaveActive()
    }

    commitModule(e){
        let t = e.target
        ReactDom.render(<SpinnerButton size="15px"/>, t)
        t.style.opacity = 0.5

        /*create data checklist parameter*/
        let dataCheckilst = []
        this.state.dataBugs.map(dt => {
            let jsonObjectChecklist = {}
            jsonObjectChecklist.bugsId = dt.bugsId
            jsonObjectChecklist.status = dt.bugStatus
            dataCheckilst.push(jsonObjectChecklist)
        })

        var form = new FormData()
        form.append("date", this.state.dueDate)
        form.append("moduleId",this.state.moduleId)
        form.append("status", this.state.moduleStatus)
        form.append("desc", this.state.descriptionModule)
        form.append("moduleName", this.state.moduleName)
        form.append("section", this.state.sectionId)
        form.append("labelModule", JSON.stringify(this.state.dataLabelModuleToUpdate))
        form.append("checklist", JSON.stringify(dataCheckilst))
        form.append("assigned", JSON.stringify(this.state.assignedModules))

        ApiFetch("/update_module", {
            method: "POST",
            body: form
        }).then(res => res.text())
        .then(result => {
            if(result == 'success'){
                if(this.state.sectionId != this.state.sectionIdLast){
                    let newData = ""
                    let arr = []
                    
                    this.props.dataModule.map(dt => {
                        let i = 0
                        if(dt.id == this.state.sectionIdLast){
                            dt.sectionModule.map(dtt => {
                                i++
                                let sp = i - 1
                                if(dtt.modulId == this.state.moduleId){
                                    console.log("splice no = "+sp)
                                    dtt.modulName = this.state.moduleName
                                    dtt.modulStatus = this.state.moduleStatus
                                    dtt.description = this.state.descriptionModule
                                    dtt.sectionId = this.state.sectionId
                                    dtt.endDate = this.state.dueDate
                                    newData = dtt
                                    dt.sectionModule.splice(sp, 1)
                                }
                            })
                            return dt
                        }
                    })
                    
                    this.props.dataModule.map(dt => {
                        if(dt.id == this.state.sectionId){
                            dt.sectionModule.push(newData)
                        }
                        return dt
                    }) 
                    
                    this.props.dataModule.map(dt => {
                        arr.push(dt)
                    })
                    this.props.setDataModule(arr)

                    this.setState({
                        sectionIdLast: this.state.sectionId
                    })
                }else{
                    this.props.updateDataModule(this.state.moduleId, this.state.moduleName, this.state.moduleStatus, 
                        this.state.userId, this.state.userName, this.state.emailUser, this.state.descriptionModule, 
                        this.state.dueDate, this.state.sectionId)
                    
                    this.setState({
                        infoPop: ""
                    })
                    
                    /*change data redux*/
                    this.props.setDataLabelModule(this.state.dataLabelModule)
                    this.commitAssignedModule()
                    this.props.updateDataChecklist(dataCheckilst, this.state.moduleId)
                }
                
                
                popUpAlert("Module successfully update", "success")
                ReactDom.render("Save change", t)
                t.style.opacity = 1
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

    commitChecklist(btn, bugsText){
        var form = new FormData()
        form.append("projectId", this.state.projectId)
        form.append("moduleId", this.state.moduleId)
        form.append("bugs", bugsText)
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())

        ApiFetch("/add_bugs", {
            method: "POST",
            body: form
        }).then(res => res.json())
        .then(result => {
            /*set new data bugs*/
            this.state.dataBugs.push(result)
            
            /*set param to state*/
            let arrDataChecklist = []
            this.state.dataBugs.map(dt => {
                arrDataChecklist.push(dt)
            })
            
            this.props.updateDataModuleBugs(this.state.moduleId, "add")
            this.setState({
                dataBugs: arrDataChecklist
            })

            ReactDom.render("Send", btn)
            this.props.appendDataBugs(result)
        })
    }

    documentFileUpload(e){
        var file = e.target.files[0]
        this.setState({
            documentFileUploadData: file
        })
    }

    consume(stream, total = 0) {
        while (stream.state === "readable") {
          var data = stream.read()
          total += data.byteLength;
        //   console.log("received " + data.byteLength + " bytes (" + total + " bytes in total).")
        }
        if (stream.state === "waiting") {
          stream.ready.then(() => this.consume(stream, total))
        }
        return stream.closed
    }

    commitDocFileUpload(descFile, bs64, ort, fileName){
        let progressBar = this.baseProgressBar.current
        progressBar.style.display = "flex"

        var bottom = -10;
        var si = setInterval(
            () => {
                bottom++
                var bottom2 = bottom * 2
                progressBar.style.bottom = bottom2+"px"
                if(bottom > 10){
                    clearInterval(si)
                }
            },
            5 
        )

        this.uploadedFileIndicator.current.style.display = "none"
        this.state.progressBar.parentElement.style.display = "block"

        let form = new FormData()
        let file = (bs64 == "") ? this.state.documentFileUploadData : ""
        form.append('file', file)
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append('projectId', this.state.projectId)
        form.append('moduleId', this.state.moduleId)
        form.append('descFile', descFile)
        form.append('base64', bs64)
        form.append('fileName', fileName)
        form.append('ort', ort)
        
        const xhr = new XMLHttpRequest()
        xhr.upload.onprogress = (e) => {
            const done = e.position || e.loaded
            const total = e.totalSize || e.total
            const perc = (Math.floor(done / total * 1000) / 10)
            
            //set width progress bar
            if(perc >= 100){
                this.state.progressBar.style.width = "100%"
            }else{
                this.state.progressBar.style.width = perc+"%"
            }
        }

        xhr.onreadystatechange = (e) => {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var result = JSON.parse(xhr.responseText)
                var newState = this.state.dataDocFile.concat(result)
                
                // progressBar.style.display = "none"
                this.uploadedFileIndicator.current.style.display = "block"
                this.state.progressBar.parentElement.style.display = "none"
                this.setState({
                    dataDocFile : newState,
                    documentFileUploadData : ""
                })
                this.props.appendDataDocFile(result)
                
                /*hide progress base upload when upload finish*/
                setTimeout(() => {
                    progressBar.style.display = "none"
                    progressBar.style.bottom = "-10px"
                }, 2500)
            }
        }

        xhr.open('POST', baseUrl+'/document_file')
        xhr.setRequestHeader("userId", getCookieUserId())
        xhr.setRequestHeader("sessionId", getCookieSessionId())
        xhr.send(form)
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

        ApiFetch("/delete_document_file", {
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
                this.props.deleteDataDocFile(mi, pi, fileName, userId)
            }

           var row = document.getElementsByClassName("row-doc-file")
           for(var i = 0;i<row.length;i++){
                row[i].style.opacity = "1"
           }

        })
    }

    deleteBugs(bugsId){
        var mi = this.state.moduleId
        var pi = this.state.projectId

        const newData = this.state.dataBugs.map(dt => {
            if(dt.modulId === mi && dt.projectId === pi && dt.bugsId === bugsId){
                dt.isDelete = "Y"
                this.props.updateDataModuleBugs(this.state.moduleId, "delete")
            }
            return dt
        })

        this.setState({
            dataBugs: newData
        })
    }

    // closeBugs(bugsId){
    //     let mi = this.state.moduleId
    //     let pi = this.state.projectId
    //     const newData = this.state.dataBugs.map(dt => {
    //         if(dt.modulId == mi && dt.projectId == pi && dt.bugsId == bugsId){
    //             dt.bugStatus = "C"
    //         }
    //         return dt
    //     })
    //     this.setState({
    //         dataBugs: newData
    //     })
    //     this.props.closeBugsModule(mi)
    // }

    // uncloseBugs(bugsId){
    //     let mi = this.state.moduleId
    //     let pi = this.state.projectId
    //     const newData = this.state.dataBugs.map(dt => {
    //         if(dt.modulId == mi && dt.projectId == pi && dt.bugsId == bugsId){
    //            dt.bugStatus = "P"
    //         }
    //         return dt
    //     })
    //     this.setState({
    //         dataBugs: newData
    //     })
    //     this.props.uncloseBugsModule(mi)
    // }

    commitEditBugs(bugsId, textBugs){
        this.state.dataBugs.map(dt => {
            if(dt.bugsId == bugsId){
                dt.note = textBugs
            }
            return dt
        })
    }

    setRef(e){
        this.state.progressBar = e
    }

    close(){
        clearInterval(this.interval)
        this.props.close()
    }

    readDataLabel(moduleId){
        let data = []
        this.props.dataLabelModule.map(dt => {
            if(moduleId == dt.moduleId){
                data.push(dt)
            }
        })
        return data
    }

    selectLabelModule(dataJson){
        this.setBtnPrimarySaveActive()    
        let dataToUpdate = []
        for(let i = 0;i<dataJson.length;i++){
            let data = dataJson[i]
            if(data.moduleId == this.state.moduleId){
                dataToUpdate.push(data)
            }
        }

        this.setState({
            dataLabelModule: dataJson,
            dataLabelModuleToUpdate: dataToUpdate
        })
    }

    checkingBugs(bugsId){
        this.setState(prev => {
            const newData = prev.dataBugs.map(dt => {
                if(dt.bugsId == bugsId){
                    let sts = (dt.bugStatus == "C") ? "P" : "C"
                    dt.bugStatus = sts
                }
                return dt
            })

            return{
                dataBugs: newData
            }
        })
        
        this.setBtnPrimarySaveActive() 
    }

    assignedModulesAct(data){
        this.setState({
            assignedModules : data
        })
        this.setBtnPrimarySaveActive()
    }

    commitAssignedModule(){
        let idxArrRemove = []
        for(let i = 0;i<this.props.assignedModuleRdx.length;i++){
            let dt = this.props.assignedModuleRdx[i]
            if(dt.moduleId == this.state.moduleId){
                idxArrRemove.push(i)
            }
        }
        
        for (var i = idxArrRemove.length -1; i >= 0; i--){
            this.props.assignedModuleRdx.splice(idxArrRemove[i], 1)
        }

        /*append new data assigned*/
        let data = this.state.assignedModules
        data.map(dt => {
            this.props.assignedModuleRdx.push(dt)
        })
    }

    render(){
        return(
            <React.Fragment>
                <div onClick={this.props.hide} className="block" style={{zIndex: "10001"}}></div>
                <div id="detail-modul-base" style={{width: "650px", minHeight: "400px", background: "#FFF", position: "fixed", zIndex: "10002"}}> 
                    <div id="header-dtl" className="main-border-bottom" style={{position: "fixed", width: "650px"}}>
                        <div style={{padding: "20px", background: "#FFF"}}>
                            <i style={{fontSize: "18px", color: "#d4ae2b"}} className="fas fa-clipboard"></i>
                            &nbsp;&nbsp;
                            <span className='bold' style={{fontSize: "18px"}}>{this.state.moduleName}</span>
                            
                            <button onClick={this.close} style={{float: "right", color: "#a2a2a2", padding: "4px", fontSize: "12px", background: "none"}}>
                                <i class="fa fa-times"></i>
                            </button>
                            <button ref={this.btnSaveChange} className="btn-secondary bold" disabled style={{fontSize: "10px", padding: "4px", float: "right", marginRight: '10px'}}>
                                {/* <FontAwesomeIcon icon={faSave}/>  */}
                                Save change
                            </button>

                            <div style={{paddingLeft: "26px"}}>
                                <div className="second-font-color bold" style={{fontSize: "10px"}}>
                                    <FontAwesomeIcon icon={faCalendarAlt}/> {convertDate_dd_mmm_yyy(this.state.dueDate)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="main-base-detail" className="scrollbar" style={{overflowY: "scroll"}}>
                        {
                            (this.state.isLoad)
                            ?
                                <Spinner size="25px" textLoader="Loading..."/>
                            :
                                <React.Fragment>
                                    <div id='mi-base' style={{display: this.state.miDisplay}}>
                                        <TaskInfo
                                            moduleName={this.state.moduleName}
                                            moduleId={this.state.moduleId}
                                            userId={this.state.userId}
                                            emailUser={this.state.emailUser}
                                            userName={this.state.userName}
                                            description={this.state.descriptionModule}
                                            moduleStatus={this.state.moduleStatus}
                                            dueDate={this.state.dueDate}
                                            projectId={this.state.projectId}
                                            createdDate={this.state.createdDate}
                                            updatedDate={this.state.updatedDate}
                                            pic={this.state.pic}
                                            mainHeight={this.state.mainBaseHeight}
                                            modulePermition={this.state.modulePermition}
                                            dataStatus={this.state.dataStatus}
                                            dataLabelModule={this.state.dataLabelModule}
                                            assignedModules={this.state.assignedModules}
                                            sectionId={this.state.sectionId}
                                            assignedModuleAct={this.assignedModulesAct}
                                            //action button
                                            changeName={this.changeNameModul}
                                            changeUserSelected={this.changeUserSelected}
                                            changeStatus={this.changeStatus}
                                            changeSection={this.changeSection}
                                            changeDesc={this.changeDesc}
                                            commitModule={this.commitModule}
                                            changeDate={this.changeDate}
                                            changeLabelModule={this.changeLabelModule}
                                            selectLabelModule={this.selectLabelModule}
                                        />
                                    </div>
                                    <div id='mb-base'>
                                        <BugsModule
                                            mainHeight={this.state.mainBaseHeight}
                                            dataBugs={this.state.dataBugs}
                                            commitChecklist={this.commitChecklist}
                                            deleteBugs={this.deleteBugs}
                                            moduleId={this.state.moduleId}
                                            dataPermition={this.state.dataPermition}
                                            picProject={this.state.picProject}
                                            // closeBugs={this.closeBugs}
                                            // uncloseBugs={this.uncloseBugs}
                                            commitEditBugs={this.commitEditBugs}
                                            checkingBugs={this.checkingBugs}
                                        />
                                    </div>
                                    <div id='mdf-base'>
                                        <DocFileModule
                                            mainHeight={this.state.mainBaseHeight}
                                            dataDocFile={this.state.dataDocFile}
                                            documentFileUpload={this.documentFileUpload}
                                            commitDocFileUpload={this.commitDocFileUpload}
                                            deleteDocFile={this.deleteDocFile}
                                            picProject={this.state.picProject}
                                            dataPermition={this.state.dataPermition}
                                            bindProgressBar={this.setRef}
                                            uploadedFileIndicator={this.uploadedFileIndicator}
                                            baseProgressBar={this.baseProgressBar}
                                        />
                                    </div>
                                </React.Fragment>
                        }
                        
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        updateDataModuleBugs: (moduleId, type) => dispatch(updateDataModuleBugs(moduleId, type)),
        updateDataModuleDocFile: (moduleId, type) => dispatch(updateDataModuleDocFile(moduleId, type)),
        updateDataModule: (moduleId, moduleName, moduleStatus, userId, userName, emailUser, desciptionModule, dueDate, section) => dispatch(updateDataModule(moduleId, moduleName, moduleStatus, userId, userName, emailUser, desciptionModule, dueDate, section)),
        appendDataBugs: (jsonObjectBugs) => dispatch(appendDataBugs(jsonObjectBugs)),
        appendDataDocFile: (jsonObject) => dispatch(appendDataDocFile(jsonObject)),
        deleteDataDocFile: (mi, pi, fn, ui) => dispatch(deleteDataDocFile(mi, pi, fn, ui)),
        updateDataChecklist: (data, moduleId) => dispatch(updateDataChecklist(data, moduleId)),
        setDataModule: (data) => dispatch(setDataModule(data)), 
        // closeBugsModule: (moduleId) => dispatch(updateDataModuleBugsClose(moduleId)),
        // uncloseBugsModule: (moduleId) => dispatch(updateDataModuleBugsUnclose(moduleId)),
        setDataLabelModule: (data) => dispatch(setDataLabelModule(data))
    }
}

const mapStateToProps = state => {
    return{
        dataModuleRedux : state.dataModule,
        dataLabelModule : state.dataLabelsModule,
        dataLabel       : state.dataLabels,
        assignedModuleRdx : state.assignedModules,
        dataModule : state.dataModule
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (detail)