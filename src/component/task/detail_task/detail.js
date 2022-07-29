import React from 'react'
import ReactDom from 'react-dom'
import TaskInfo from './task_info'
import CheckList from './cheklists_task'
import DocFileModule from './attachment_task'
import {getCookieUserId, getCookieSessionId, popUpAlert} from '../../../function/function'
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
        setDataModule,
        appendDataModule} from '../../../redux/action'
import {Spinner, SpinnerButton} from '../../spinner'
import { baseUrl } from '../../../const/const'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faInfoCircle, faSave, faTimes, faTruckMonster } from '@fortawesome/free-solid-svg-icons'
import { check_circle as CkCIrcle } from '../../icon/icon'
import axios from 'axios'
import { fetchDataPost } from '../../../function/fetch'
import Fetch from '../../../function/fetchApi'

class detail extends React.Component{
    interval = null
    dataBugsValidation = null

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
            sectionId:"",
            sectionIdLast:"",
            pic:"",
            picProject:"",
            countBugs: 0,
            countBugsClose: 0,
            documentFileUploadData:"",
            isLoad: true,
            modulePermition: false,
            progressBar: null,
            dataLabelModule: [],
            dataLabelModuleToUpdate: [],
            assignedModules: [],
            countNewBugs: 0,
            dataStatus: []
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

        if(this.props.modulId != null){
            this.fetchDataDetail()
        }else{
            this.setState({
                isLoad: false,
                projectId: this.props.projectId,
                moduleId: null
            })
        }

        let bs = document.getElementById("detail-modul-base")
        let offTop = bs.offsetTop

        var hd = document.getElementById("header-dtl")
        var h1 = hd.offsetHeight

        var maxHeight = window.innerHeight - (parseInt(h1) + offTop + 50)
        var mbd = document.getElementById("main-base-detail")
        mbd.style.marginTop = h1+"px"
        mbd.style.maxHeight = maxHeight+"px"
    }

    fetchDataDetail = () => {
        var form = new FormData()
        form.append("moduleId",  this.props.modulId)
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("projectId", this.props.projectId)

        let fetch = new Fetch()
        fetch.post("/module/detail", form).then(result => {
            if(result) this.setDataState(result)
        })
        // fetchDataPost("/module/detail", form).then(result => {
        //     this.setDataState(result)
        // })
    }

    setDataState = (result) => {
        var dm = result.dataModule
        result.permitionProject.map(dt => {
            if(dt.permitionCode == 1 && dt.isChecked == "Y"){
                this.setState({
                    modulePermition: true
                })
            }
        })

        this.setDataBugsValidation([...result.bugs])
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
            sectionId: dm.sectionId,
            sectionIdLast: dm.sectionId,
            dataLabelModule: result.dataModule.label,
            dataLabelModuleToUpdate: result.labelModules,
            assignedModules: result.assignedModules
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
        this.unMandatory(e.target)
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
        this.unMandatory(e.target)
        this.setBtnPrimarySaveActive()
    }

    unMandatory = (e) => {
        let elm = e
        let attr = elm.getAttribute("class").split(" ")
        elm.setAttribute("class", attr)
    }

    setBtnPrimarySaveActive(){
        this.btnSaveChange.current.setAttribute("class", "btn-primary")
        this.btnSaveChange.current.style.opacity = 1
        this.btnSaveChange.current.onclick = this.commitModule
        this.btnSaveChange.current.disabled = false
    }

    changeLabelModule(data){
        this.setBtnPrimarySaveActive()
    }

    commitModule(e){
        /*create data checklist parameter*/
        let dataCheckilst = []
        this.state.dataBugs.map(dt => {
            let jsonObjectChecklist = {}
            jsonObjectChecklist.bugsId = dt.bugsId
            jsonObjectChecklist.status = dt.bugStatus
            dataCheckilst.push(jsonObjectChecklist)
        })

        /*set data module*/
        let objModule = {}
        objModule.date = this.state.dueDate
        objModule.modulId = this.state.moduleId
        objModule.status = this.state.moduleStatus
        objModule.desc = this.state.descriptionModule
        objModule.moduleName = this.state.moduleName
        objModule.section = this.state.sectionId
        objModule.projectId = this.props.projectId
        objModule.createdBy = parseInt(getCookieUserId())
        objModule.labelModule = JSON.stringify(this.state.dataLabelModuleToUpdate)
        objModule.checklist = JSON.stringify(dataCheckilst)
        objModule.assigned = JSON.stringify(this.state.assignedModules)

        /*init data param*/
        let data = {}
        data.module = objModule
        data.checklist = this.state.dataBugs

        /*validation input mandatory*/
        let isValid = this.inputValidation(this.state.moduleName, 
                                            this.state.assignedModules, 
                                            this.state.moduleStatus, 
                                            this.state.sectionId, 
                                            this.state.dueDate)
        if(!isValid) return false
        
        let t = e.target
        ReactDom.render(<SpinnerButton size="15px"/>, t)
        t.style.opacity = 0.5
        
        if(this.state.moduleId == null || this.state.moduleId == ""){
            this.excNew(data, t)
        }else{
            this.excUpdate(data, t)
        }
    }

    inputValidation = (task, assignees, status, section, dueDate) => {
        let isValid = faTruckMonster
        if(task == null || task == 0){
            let elm = document.getElementById("inf-inp-1")
            let attr = elm.getAttribute("class")
            let setAttr = attr+" mandatory"
            elm.setAttribute("class", setAttr)
            isValid = false
        }

        if(status == null || status == 0){
            let elm = document.getElementById("inf-inp-s1")
            let attr = elm.getAttribute("class")
            let setAttr = attr+" mandatory"
            elm.setAttribute("class", setAttr)
            isValid = false
        }

        if(section == null || section == 0){
            let elm = document.getElementById("inf-inp-s2")
            let attr = elm.getAttribute("class")
            let setAttr = attr+" mandatory"
            elm.setAttribute("class", setAttr)
            isValid = false
        }

        if(dueDate == null || dueDate == 0){
            let elm = document.getElementById("inf-inp-2")
            let attr = elm.getAttribute("class")
            let setAttr = attr+" mandatory"
            elm.setAttribute("class", setAttr)
            isValid = false
        }

        if(assignees.length == 0){
            let elm = document.getElementById("inp-asgn-1")
            let attr = elm.getAttribute("class")
            let setAttr = attr+" mandatory"
            elm.setAttribute("class", setAttr)
            isValid = false
        }
        return isValid
    }

    excNew = (data, t) => {
        let fetch = new Fetch()
        fetch.post("/module/new", data).then(result => {
            this.setDataState(result)
            /*tambahkan data module ke redux*/
            this.props.appendDataModule(result.dataModule)

            popUpAlert("Module successfully saved", "success")
            ReactDom.render("Save change", t)
            t.style.opacity = 1
        })

        // ApiFetch("/module/new", {
        //     method: "POST",
        //     headers: new Headers({'content-type': 'application/json'}),
        //     body: JSON.stringify(data)
        // }).then(res => res.json()).then(result => {
        //     this.setDataState(result)
        //     /*tambahkan data module ke redux*/
        //     this.props.appendDataModule(result.dataModule)

        //     popUpAlert("Module successfully saved", "success")
        //     ReactDom.render("Save change", t)
        //     t.style.opacity = 1
        // })
    }

    excUpdate = (data, t) => {
        let fetch = new Fetch()
        fetch.post("/module/update", data).then(result => {
            if(result.success){
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
                                    dtt.modulName = this.state.moduleName
                                    dtt.modulStatus = this.state.moduleStatus
                                    dtt.description = this.state.descriptionModule
                                    dtt.sectionId = this.state.sectionId
                                    dtt.endDate = this.state.dueDate
                                    
                                    /*set new data in by section id*/
                                    newData = dtt

                                    /*delete data module in section*/
                                    dt.sectionModule.splice(sp, 1)
                                }
                            })
                            return dt
                        }
                    })
                    
                    /*pass new data to array data module*/
                    this.props.dataModule.map(dt => {
                        /*set data new data module in section id*/
                        if(dt.id == this.state.sectionId){
                            dt.sectionModule.push(newData)
                        }
                        return dt
                    }) 
                    
                    this.props.dataModule.map(dt => {
                        arr.push(dt)
                    })

                    /*set data module to redux*/
                    this.props.setDataModule(arr)

                    this.setState({
                        sectionIdLast: this.state.sectionId
                    })
                }else{
                    
                    let dataModule = result.module
                    this.commitAssignedModule()
                    this.props.updateDataModule(dataModule)
                    // this.props.updateDataChecklist(dataCheckilst, this.state.moduleId, this.state.sectionId)
                    // this.props.updateDataModule(this.state.moduleId, this.state.moduleName, this.state.moduleStatus, 
                    //     this.state.userId, this.state.userName, this.state.emailUser, this.state.descriptionModule, 
                    //     this.state.dueDate, this.state.sectionId, this.state.dataLabelModuleToUpdate)

                    
                    
                    /*set state checklist for delete
                    after save change necessery*/
                    this.setState({
                        infoPop: "",
                        dataBugs: result.checklist
                    })
                }

            }

            popUpAlert("Module successfully update", "success")
            ReactDom.render("Save change", t)
            t.style.opacity = 1
        })
        // ApiFetch("/module/update", {
        //     method: "POST",
        //     // headers: new Headers({'content-type': 'application/json'}),
        //     body: JSON.stringify(data)
        // }).then(res => res.json()).then(result => {
        //     if(result.success){
        //         if(this.state.sectionId != this.state.sectionIdLast){
        //             let newData = ""
        //             let arr = []
                    
        //             this.props.dataModule.map(dt => {
        //                 let i = 0
        //                 if(dt.id == this.state.sectionIdLast){
        //                     dt.sectionModule.map(dtt => {
        //                         i++
        //                         let sp = i - 1
        //                         if(dtt.modulId == this.state.moduleId){
        //                             dtt.modulName = this.state.moduleName
        //                             dtt.modulStatus = this.state.moduleStatus
        //                             dtt.description = this.state.descriptionModule
        //                             dtt.sectionId = this.state.sectionId
        //                             dtt.endDate = this.state.dueDate
                                    
        //                             /*set new data in by section id*/
        //                             newData = dtt

        //                             /*delete data module in section*/
        //                             dt.sectionModule.splice(sp, 1)
        //                         }
        //                     })
        //                     return dt
        //                 }
        //             })
                    
        //             /*pass new data to array data module*/
        //             this.props.dataModule.map(dt => {
        //                 /*set data new data module in section id*/
        //                 if(dt.id == this.state.sectionId){
        //                     dt.sectionModule.push(newData)
        //                 }
        //                 return dt
        //             }) 
                    
        //             this.props.dataModule.map(dt => {
        //                 arr.push(dt)
        //             })

        //             /*set data module to redux*/
        //             this.props.setDataModule(arr)

        //             this.setState({
        //                 sectionIdLast: this.state.sectionId
        //             })
        //         }else{
                    
        //             let dataModule = result.module
        //             this.commitAssignedModule()
        //             this.props.updateDataModule(dataModule)
        //             // this.props.updateDataChecklist(dataCheckilst, this.state.moduleId, this.state.sectionId)
        //             // this.props.updateDataModule(this.state.moduleId, this.state.moduleName, this.state.moduleStatus, 
        //             //     this.state.userId, this.state.userName, this.state.emailUser, this.state.descriptionModule, 
        //             //     this.state.dueDate, this.state.sectionId, this.state.dataLabelModuleToUpdate)

                    
                    
        //             /*set state checklist for delete
        //             after save change necessery*/
        //             this.setState({
        //                 infoPop: "",
        //                 dataBugs: result.checklist
        //             })
        //         }

        //     }

        //     popUpAlert("Module successfully update", "success")
        //     ReactDom.render("Save change", t)
        //     t.style.opacity = 1
        // })
    }

    setDataBugsValidation = (data) => {
        // let d = new Array()
        // for(let i = 0;i<data.length;i++){
        //     console.log(data[i])
        //     d.push(data[i])
        // }

        // this.dataBugsValidation = d
        // console.log(this.dataBugsValidation)
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
    
    addChecklist = (bugsText) => {
        let countNew = parseInt(this.state.countNewBugs) + 1
        const dataBugs = [...this.state.dataBugs]
        
        /*set date*/
        let date = new Date()
        
        let dd = date.getDate()
        dd = (dd < 10) ? "0"+dd : dd

        let mm = parseInt(date.getMonth()) + 1
        mm = (mm < 10) ? "0"+mm : mm

        let yy = date.getFullYear()
        let format = yy+"-"+mm+"-"+dd

        /*set new object data checklist*/
        let obj = {}
        let newId = -Math.abs(countNew)
        obj.bugsId = newId
        obj.projectId = this.state.projectId
        obj.modulId = this.state.moduleId
        obj.note = bugsText
        obj.userId = parseInt(getCookieUserId())
        obj.isDelete = "N"
        obj.bugStatus = "P"
        obj.createDate = format

        /*add data to array*/
        dataBugs.push(obj)
        this.setState({
            dataBugs: dataBugs,
            countNewBugs: countNew
        })

        /*mengaktifkan tombol save change*/
        this.setBtnPrimarySaveActive()
    }

    commitChecklist(btn, bugsText){
        var form = new FormData()
        form.append("projectId", this.state.projectId)
        form.append("moduleId", this.state.moduleId)
        form.append("bugs", bugsText)
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())

        let fetch = new Fetch()
        fetch.post("/add_bugs", form).then(result => {
            try {
                this.state.dataBugs.push(result)
            
                /*set param to state*/
                let arrDataChecklist = []
                this.state.dataBugs.map(dt => {
                    arrDataChecklist.push(dt)
                })
                
                this.props.updateDataModuleBugs(this.state.moduleId, this.state.sectionId, "add")
                this.setState({
                    dataBugs: arrDataChecklist
                })

                ReactDom.render("Send", btn)
                this.props.appendDataBugs(result)
            } catch (error) {
                /*nothing happen*/
            }
        })
        // ApiFetch("/add_bugs", {
        //     method: "POST",
        //     body: form
        // }).then(res => res.json())
        // .then(result => {
        //     /*set new data bugs*/
        //     this.state.dataBugs.push(result)
            
        //     /*set param to state*/
        //     let arrDataChecklist = []
        //     this.state.dataBugs.map(dt => {
        //         arrDataChecklist.push(dt)
        //     })
            
        //     this.props.updateDataModuleBugs(this.state.moduleId, this.state.sectionId, "add")
        //     this.setState({
        //         dataBugs: arrDataChecklist
        //     })

        //     ReactDom.render("Send", btn)
        //     this.props.appendDataBugs(result)
        // })
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

        let fetch = new Fetch()
        fetch.post("/delete_document_file", form).then(result => {
            try {
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
            } catch (error) {
                /*nothing happen*/
            }
        })
        // ApiFetch("/delete_document_file", {
        //     method: "POST",
        //     body: form
        // }).then(res => res.text())
        // .then(result => {
        //     if(result == 1){
        //         var newState = this.state.dataDocFile
        //         this.state.dataDocFile.map(dt => {
        //             if(dt.projectId == pi && dt.modulId == mi && dt.fileName == fileName){
        //                 var idx = this.state.dataDocFile.indexOf(dt)
        //                 newState.splice(idx, 1)
        //             }
        //             return dt
        //         })

        //         this.setState({
        //             dataDocFile: newState
        //         })
        //         this.props.updateDataModuleDocFile(mi, "delete")
        //         this.props.deleteDataDocFile(mi, pi, fileName, userId)
        //     }

        //    var row = document.getElementsByClassName("row-doc-file")
        //    for(var i = 0;i<row.length;i++){
        //         row[i].style.opacity = "1"
        //    }

        // })
    }

    deleteBugs(bugsId){
        var mi = this.state.moduleId
        var pi = this.state.projectId

        let dataBugs = [...this.state.dataBugs]
        const newData = dataBugs.map(dt => {
            if(dt.modulId === mi && dt.projectId === pi && dt.bugsId === bugsId){
                dt.isDelete = "Y"
                // this.props.updateDataModuleBugs(this.state.moduleId, this.state.sectionId, "delete")
            }
            return dt
        })

        this.setState({
            dataBugs: newData
        })

        /*mengaktifkan button save change*/
        this.setBtnPrimarySaveActive()
    }

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
        // let b = JSON.stringify(this.dataBugsValidation)
        // let c = JSON.stringify(this.state.dataBugs)
        
        // console.log(b)
        // console.log(c)
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
                <div id="detail-modul-base" style={{width: "680px", minHeight: "400px", background: "#FFF", position: "fixed", zIndex: "10002"}}> 
                    <div id="header-dtl" className="main-border-bottom" style={{position: "fixed", width: "650px"}}>
                        <div style={{padding: "20px", background: "#FFF"}}>
                            {/* <i style={{fontSize: "18px", color: "#d4ae2b"}} className="fas fa-chevron-left"></i> */}
                            {/* <i style={{fontSize: "18px", color: "#CCC"}} className="fas fa-chevron-left"></i> */}
                            <CkCIrcle style={{fontSize: "16px", color: "#d4ae2b", border: "1px solid", borderRadius: "100%"}}/>
                            {/* <circle_duotone style={{fontSize: "14px", color: "#CCC", width: "100px", border: "1px solid", borderRadius: "100%"}}/> */}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {
                                (this.state.moduleId != null && this.state.moduleId != "")
                                ?
                                    <span className='bold' style={{fontSize: "18px"}}>{this.state.moduleName}</span>
                                :
                                    <span className='bold second-font-color' style={{fontSize: "18px"}}>New Task</span>
                            }
                        </div>
                    </div>

                    <div id="main-base-detail" className="scrollbar" style={{overflowY: "scroll", minHeight: "300px"}}>
                        {
                            (this.state.isLoad)
                            ?
                                <Spinner size="20px"/>
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
                                            modulePermition={this.state.modulePermition}
                                            dataStatus={this.props.dataStatus}
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
                                        <CheckList
                                            dataBugs={this.state.dataBugs}
                                            commitChecklist={this.commitChecklist}
                                            addChecklist={this.addChecklist}
                                            deleteBugs={this.deleteBugs}
                                            moduleId={this.state.moduleId}
                                            dataPermition={this.state.dataPermition}
                                            picProject={this.state.picProject}
                                            commitEditBugs={this.commitEditBugs}
                                            checkingBugs={this.checkingBugs}
                                        />
                                    </div>
                                    <div id='mdf-base'>
                                        <DocFileModule
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

                    <div id="ftr-dtl-bs" 
                        className="main-border-top" 
                        style={{width: "640px", height: "50px", background: "#FFF", display: "flex", alignItems: "center", paddingLeft: "20px", paddingRight: "20px"}}>
                        
                        <div className="second-font-color" style={{width: "100%", fontSize: '11px'}}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            &nbsp;
                            The data will be saved after clicking the save button, except upload
                        </div>
                        <div style={{width: "240px", display: "flex", justifyContent: "flex-end"}}>
                            <button className="btn-primary" style={{opacity: "0.5", display: "flex", justifyContent: "center", alignItems: "center"}} ref={this.btnSaveChange}>
                                <FontAwesomeIcon icon={faSave}/>&nbsp;&nbsp;<span style={{fontSize: "11px"}}>Save Change</span>
                            </button>
                            &nbsp;
                            <button onClick={this.close} style={{display: "flex", justifyContent: "center", alignItems: "center"}} className="btn-secondary">
                                <FontAwesomeIcon icon={faTimes}/>&nbsp;&nbsp;<span style={{fontSize: "11px"}}>Close</span>
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        updateDataModuleBugs: (moduleId, sectionId, type) => dispatch(updateDataModuleBugs(moduleId, sectionId, type)),
        updateDataModuleDocFile: (moduleId, type) => dispatch(updateDataModuleDocFile(moduleId, type)),
        // updateDataModule: (moduleId, moduleName, moduleStatus, userId, userName, emailUser, desciptionModule, dueDate, section, label) => dispatch(updateDataModule(moduleId, moduleName, moduleStatus, userId, userName, emailUser, desciptionModule, dueDate, section, label)),
        updateDataModule: (dataModule) => dispatch(updateDataModule(dataModule)),
        appendDataBugs: (jsonObjectBugs) => dispatch(appendDataBugs(jsonObjectBugs)),
        appendDataDocFile: (jsonObject) => dispatch(appendDataDocFile(jsonObject)),
        deleteDataDocFile: (mi, pi, fn, ui) => dispatch(deleteDataDocFile(mi, pi, fn, ui)),
        updateDataChecklist: (data, moduleId, sectionId) => dispatch(updateDataChecklist(data, moduleId, sectionId)),
        setDataModule: (data) => dispatch(setDataModule(data)),
        setDataLabelModule: (data) => dispatch(setDataLabelModule(data)),
        appendDataModule : (data) => dispatch(appendDataModule(data))
    }
}

const mapStateToProps = state => {
    return{
        dataModuleRedux : state.dataModule,
        dataLabelModule : state.dataLabelsModule,
        dataLabel       : state.dataLabels,
        assignedModuleRdx : state.assignedModules,
        dataModule : state.dataModule,
        dataStatus : state.dataStatus
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (detail)