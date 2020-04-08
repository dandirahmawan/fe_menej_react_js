import React from 'react'
import HeaderModule from './header_module'
import RowModule from './row_module'
import NewModule from './new_module'
import PopupConfirmation from '../popup_confirmation'
import ProjectMember from '../project/project_member_team'
import Detail from './detail'
import AddMember from './add_member'
import Permition from './permition'
import { baseUrl } from '../../const/const'
import { getCookieUserId, getCookieSessionId } from '../../function/function'
import {connect} from 'react-redux'
import {setDataNote, selectRowModule} from '../../redux/action'
import Bugs from '../bugs/bugs'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBorderAll, faBorderNone, faHandshake, faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import DocumentFile from '../document_file/document_file'
import InfoProject from './info_project'
import HandoverModule from './handover_module'
import NewTab from './tab/new_tab'
import Tab from './tab/tab'

var ctrlClick = false
var arrSelected = []
window.addEventListener("keydown", function(event) {
    if (event.keyCode == 17) {
       ctrlClick = true
    }
})

window.addEventListener("keyup", function(event) {
    if (event.keyCode == 17) {
       ctrlClick = false
    }
})

class modulePage extends React.Component{
    
    constructor(){
        super()
        this.state = {
            dataDetail:"",
            newModulName:"",
            newDueDate:"",
            newUser:"",
            newDescitiopn:"",
            infoPop:"",
            addMember:"",
            dataTeam:[],
            dataPermition:[],
            dataTab:[],
            userIdAccess:"",
            createdByProject:"",
            userSetTeamMember:"",
            permition:"",
            appendsNote:[],
            dataNote:[],
            bugsBase:"",
            isBorder:"",
            documentFileBase:"",
            projectName:"",
            infoProjectPop:"",
            tabBase:""
        }

        this.refBugs = React.createRef()
        this.refModule = React.createRef()
        this.refDocFile = React.createRef()
        this.theadModule = React.createRef()
        this.markAllBtn = React.createRef()
        this.unMarkAllBtn = React.createRef()
        this.baseMenuTab = React.createRef()
 
        this.hidePopUp = this.hidePopUp.bind(this)
        this.deleteModule = this.deleteModule.bind(this)
        this.deleteModuleDel = this.deleteModuleDel.bind(this)
        this.commitDeleteModule = this.commitDeleteModule.bind(this)
        this.commitNewModule = this.commitNewModule.bind(this)
        this.selectedRow = this.selectedRow.bind(this)
        this.addMember = this.addMember.bind(this)
        this.cancelAddMember = this.cancelAddMember.bind(this)
        this.refreshDataTeam = this.refreshDataTeam.bind(this)
        this.deleteMember = this.deleteMember.bind(this)
        this.commitDeleteMember = this.commitDeleteMember.bind(this)
        this.setTeamMember = this.setTeamMember.bind(this)
        this.setPermition = this.setPermition.bind(this)
        this.cancelPermition = this.cancelPermition.bind(this)
        this.bugsIconClick = this.bugsIconClick.bind(this)
        this.docFileIconClick = this.docFileIconClick.bind(this)
        this.updateStateDataNote = this.updateStateDataNote.bind(this)
        this.showBorder = this.showBorder.bind(this)
        this.hideBorder = this.hideBorder.bind(this)
        this.markAll = this.markAll.bind(this)
        this.unmarkAll = this.unmarkAll.bind(this)
        this.infoProject = this.infoProject.bind(this)
        this.hideInfoProject = this.hideInfoProject.bind(this)
        this.handOver = this.handOver.bind(this)
        this.refreshModule = this.refreshModule.bind(this)
        this.selectedRow2 = this.selectedRow2.bind(this)
        this.newTab = this.newTab.bind(this)
        this.updateDataTab = this.updateDataTab.bind(this)
        this.tabMenu = this.tabMenu.bind(this)
        this.editTab = this.editTab.bind(this)
    }

    componentDidMount(){
        arrSelected = []
        this.props.dataProject.map(dt => {
            this.props.setDataNote(this.props.dataNote)
            this.setState({
                dataTeam: this.props.dataTeam,
                createdByProject: dt.createdBy,
                projectName:dt.projectName,
                dataPermition: this.props.dataPermition,
                dataNote: this.props.dataNote,
                picProject: dt.pic,
                dataTab: this.props.dataTab
            })
        })

        // let baseTabMenu = this.baseMenuTab.current
        // alert(baseTabMenu.offsetWidth);
    }

    refreshDataTeam(jsonData, userIdList){
        this.props.dataModule.map(dt => {
            var idx = userIdList.indexOf(dt.userId)
            if(idx >= 0) dt.isMember = 1
        })

        this.setState({
            dataTeam: jsonData,
            addMember: ""
        })
    }

    selectedRow(a, data){
        var t = a.target.parentElement
        if(ctrlClick){
            //no action
        }else{
            this.props.dataModule.map(dt => {
                if(dt.modulId == data){
                    this.setState({
                        infoPop: <Detail
                                    close={this.hidePopUp}
                                    modulId={dt.modulId}
                                    projectId={dt.projectId}
                                    tabParameter="info"
                                />
                    })
                }
            })
        }
    }

    selectedRow2(a, data){
        if(ctrlClick){
            this.props.dataModule.map(dt => {
                if(dt.modulId === data){
                    if(dt.isSelected){
                        var idx = arrSelected.indexOf(data)
                        arrSelected.splice(idx, 1)
                    }else{
                        arrSelected.push(data)
                    }
                    this.props.selectRowModule(data)
                }
            })
        }
    }

    updateStateDataNote(jsonObj){
        this.state.dataNote.push(jsonObj)
        this.setState({
            dataNote: this.state.dataNote
        })
    }

    mainMenu(e, tab){
        var c = document.getElementsByClassName("main-menu-module")
        for(var i = 0;i<c.length;i++){
            c[i].style.borderBottom = "none"
            c[i].setAttribute("class", "bold main-menu-module second-font-color")
        }

        var t = e.target
        t.setAttribute("class", "bold main-menu-module")
        t.style.borderBottom = "2px solid #386384"

        this.refModule.current.style.display = "none"
        this.refBugs.current.style.display = "none"
        this.refDocFile.current.style.display = "none"

        if(tab == "bugs"){

            var refCurrent = this.refBugs.current
            refCurrent.style.display = "block"
            this.setState({
                bugsBase: <Bugs projectId={this.props.projectIdHeader} 
                                pic={this.state.picProject}
                                dataPermition={this.state.dataPermition}/>
            })

        }else if(tab == "module"){

            var refCurrent = this.refModule.current
            refCurrent.style.display = "block"

        }else if(tab == "doc file"){

            var refCurrent = this.refDocFile.current
            refCurrent.style.display = "block"
            this.setState({
                documentFileBase: <DocumentFile 
                                    projectId={this.props.projectIdHeader} 
                                    pic={this.state.picProject}
                                    dataPermition={this.state.dataPermition}/>
            })
        }

        this.setState({
            tabBase: ""
        })

    }

    bugsIconClick(e, modulId){
        this.props.dataModule.map(dt => {
            if(dt.modulId == modulId){
                this.setState({
                    infoPop: <Detail 
                                close={this.hidePopUp} 
                                modulId={dt.modulId}
                                projectId={dt.projectId}
                                picProject={this.state.picProject} 
                                tabParameter="bugs" 
                            />
                })
            }
        })
        e.stopPropagation()
    }

    docFileIconClick(e, modulId){
        this.props.dataModule.map(dt => {
            if(dt.modulId == modulId){
                this.setState({
                    infoPop: <Detail 
                                close={this.hidePopUp} 
                                modulId={dt.modulId}
                                projectId={dt.projectId}
                                picProject={this.state.picProject} 
                                tabParameter="doc_file"/>
                })
            }
        })
        e.stopPropagation()
    }

    markAll(){
        this.props.dataModule.map(dt => {
            var idx = arrSelected.indexOf(dt.modulId)
            arrSelected.push(dt.modulId)
        })
        this.props.selectRowModule("all mark")
        this.unMarkAllBtn.current.style.display = "block"
        this.markAllBtn.current.style.display = "none"
    }

    unmarkAll(){
        arrSelected = []
        this.props.selectRowModule("all unmark")
        this.unMarkAllBtn.current.style.display = "none"
        this.markAllBtn.current.style.display = "block"
    }

    newModule(){
        this.setState({
            infoPop: <NewModule 
                        projectId={this.props.projectIdHeader}
                        hcName={this.handleChangeNameModule}
                        commit={this.commitNewModule}
                        hide={this.hidePopUp}/>
        })
    }

    hidePopUp(){
        this.setState({
            infoPop: ""
        })
    }

    deleteModule(){
        if(arrSelected.length > 0){
            this.setState({ 
                infoPop: <PopupConfirmation textPopup="Are you sure, you want delete this module ?" titleConfirmation="Delete module" hidePopUp={this.hidePopUp} yesAction={this.commitDeleteModule}/>
            })
        }
    }

    handOver(){
        this.setState({
            infoPop: <HandoverModule
                        projectId={this.props.projectIdHeader}
                        refreshModule={this.refreshModule}
                        cancel={this.hidePopUp}/>
        })
    }

    refreshModule(){
        this.props.refreshModule()
    }

    deleteModuleDel(event){
        if (event.keyCode == 46) {
            if(arrSelected.length > 0){
                this.setState({ 
                    infoPop: <PopupConfirmation textPopup="Are you sure, you want delete this module ?" titleConfirmation="Delete module" hidePopUp={this.hidePopUp} yesAction={this.commitDeleteModule}/>
                })
            }
        }
    }

    commitDeleteModule(){
        var userId = getCookieUserId()
        var form = new FormData()
        form.append("userId", userId)
        form.append("moduleId", arrSelected)
        fetch(baseUrl+"/delete_module", {
            method: "POST",
            body: form
        }).then(res => res.text())
        .then(result => {
            this.props.commitDeleteModule(arrSelected)
            this.setState({
                infoPop: ""
            })
        })
    }

    commitNewModule(idUser, moduleName, dueDate, description, pi){
        this.props.commitNewModule(idUser, moduleName, dueDate, description, pi)
        this.setState({
            infoPop: ""
        })
    }

    addMember(){
        this.setState({
            addMember: <AddMember 
                        projectId={this.props.projectIdHeader} 
                        cancel={this.cancelAddMember}
                        refresh={this.refreshDataTeam}
                        />
        })
    }

    cancelAddMember(){
        this.setState({
            addMember: ""
        })
    }

    deleteMember(userId, userName){
        var text = "Are you sure, you want delete "+userName+" as member in this project ?"
        this.setState({
            userSetTeamMember: '',
            userIdAccess: userId,
            infoPop: <PopupConfirmation textPopup={text} titleConfirmation="Delete member" hidePopUp={this.hidePopUp} yesAction={this.commitDeleteMember}/>
        })
    }

    setTeamMember(userId){
        this.setState({
            userSetTeamMember: userId
        })
    }

    setPermition(userId){
        this.setState({
            userSetTeamMember: "",
            permition: <Permition
                            userId={userId}
                            projectId={this.props.projectIdHeader}
                            cancelPermition={this.cancelPermition}
                        />
        })
    }

    cancelPermition(){
        this.setState({
            permition: ""
        })
    }

    commitDeleteMember(){
        var projectId = this.props.projectIdHeader
        var userId = this.state.userIdAccess

        var form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("userDelete", userId)
        form.append("projectId", projectId)

        fetch(baseUrl+"/delete_member", {
            method: "POST",
            body: form
        }).then(res => res.text())
        .then(result => {
            this.state.dataTeam.map(dt => {
                if(this.state.userIdAccess == dt.userId){
                    var idx = this.state.dataTeam.indexOf(dt)
                    this.state.dataTeam.splice(idx, 1)
                    this.setState({
                        dataTeam:  this.state.dataTeam,
                        infoPop: ""
                    })
                    this.props.commitDeleteMember(userId)
                }
            })
        })
    }

    showBorder(){
        var c = document.getElementsByClassName("tb-border-mod")
        for(var i = 0;i<c.length;i++){
            c[i].style.border = "#dcdbdb 1px solid"
        }

        var cr = this.theadModule.current
        cr.setAttribute("class", "second-background-grs main-border")
        cr.style.borderTop = "none"

        this.setState({
            isBorder: true
        })
    }

    hideBorder(){
        var c = document.getElementsByClassName("tb-border-mod")
        for(var i = 0;i<c.length;i++){
            c[i].style.border = "none"
        }

        var cr = this.theadModule.current
        cr.setAttribute("class", "")
        cr.style.borderTop = "none"

        this.setState({
            isBorder: false
        })
    }

    infoProject(){
        console.log(this.props.dataProject)
        this.props.dataProject.map(dt =>
            this.setState({
                infoProjectPop: <InfoProject 
                                    projectName={dt.projectName}
                                    createDate={dt.createdDate}
                                    picName={dt.picName}
                                    hideInfo={this.hideInfoProject}
                                    />
            })
        )
        
    }

    hideInfoProject(){
        this.setState({
            infoProjectPop: ""
        })
    }

    newTab(){
        this.setState({
            infoPop: <NewTab
                            cancel={this.hidePopUp}
                            projectId={this.props.projectIdHeader}
                            updateDataTab={this.updateDataTab}
                        />
        })
    }

    updateDataTab(jsonData){
        this.setState({
            dataTab: jsonData
        })
    }

    tabMenu(e, tabId){
        var c = document.getElementsByClassName("main-menu-module")
        for(var i = 0;i<c.length;i++){
            c[i].style.borderBottom = "none"
            c[i].setAttribute("class", "bold main-menu-module second-font-color")
        }

        var t = e.target
        t.setAttribute("class", "bold main-menu-module")
        t.style.borderBottom = "2px solid #386384"

        this.refModule.current.style.display = "none"
        this.refBugs.current.style.display = "none"
        this.refDocFile.current.style.display = "none"

        let tabName = null
        let privacy = null
        let createdBy = null
        this.state.dataTab.map(dt => {
            if(dt.tabId == tabId){
                tabName = dt.tabName
                privacy = dt.privacy
                createdBy = dt.createdBy
            }
        })

        this.setState({
            tabBase: <Tab
                        editTab={this.editTab}
                        projectId={this.props.projectIdHeader}
                        tabId={tabId}
                        createdBy={createdBy}
                        privacy={privacy}
                        tabName={tabName}/>
        })
    }

    editTab(tabId, tabName, privacy){
        const data = this.state.dataTab.map(dt => {
            if(dt.tabId == tabId){
                dt.tabName = tabName
                dt.privacy = privacy
            }
            return dt
        })

        this.setState({
            dataTab: data
        })
    }

    render(){
        
        // const dataProject = this.props.dataProject.map(dt => <HeaderModule
        //                                                         projectName     = {dt.projectName}
        //                                                         projectManager  = {dt.picName}
        //                                                         countModule     = {dt.countModule}
        //                                                         countBugs       = {dt.countBugs}
        //                                                         countMember     = {dt.countTeam}
        //                                                         percentage      = "100%"
        //                                                     />)
        
        const dataModule = this.props.dataModule.map(dt => <RowModule
                                                            detail = {this.detail}
                                                            isDelete = {dt.isTrash}
                                                            selected = {this.selectedRow}
                                                            selectedRow = {this.selectedRow2}
                                                            moduleId = {dt.modulId}
                                                            modulName = {dt.modulName}
                                                            endDate = {dt.endDate}
                                                            modulStatus = {dt.modulStatus}
                                                            countBugs = {dt.countBugs}
                                                            countBugsClose = {dt.countBugsClose}
                                                            countDoc = {dt.countDoc}
                                                            countNote = {dt.countNote}
                                                            userName = {dt.userName}
                                                            isMember = {dt.isMember}
                                                            note = {this.state.dataNote}
                                                            bugsIconClick = {this.bugsIconClick}
                                                            isSelected={dt.isSelected}
                                                            docFileIconClick = {this.docFileIconClick}
                                                            noteClick={this.noteClick}
                                                            appendsNote={this.state.appendsNote}
                                                            updateStateDataNote={this.updateStateDataNote}
                                                            isBorder={this.state.isBorder}/>)

        const dataTeamMember = this.state.dataTeam.map(dt => <ProjectMember
                                                                userName={dt.userName}
                                                                userId={dt.userId}
                                                                setTeamMember={this.setTeamMember}
                                                                setPermition={this.setPermition}
                                                                deleteMember={this.deleteMember}
                                                                picProject={this.state.picProject}
                                                                userSet={this.state.userSetTeamMember}
                                                                picProfile={dt.picProfile}
                                                            />)


        const tabMenuAdditional = this.state.dataTab.map(dt => {
            return <a onClick={(e) => this.tabMenu(e, dt.tabId)}
                      className="bold main-menu-module second-font-color"
                      style={{fontSize: "12px", marginRight: "20px", paddingBottom: "10px"}}>{dt.tabName}</a>
        })

        return(
            <React.Fragment>
                {/* {dataProject} */}
                {this.state.infoPop}
                {this.state.addMember}
                {this.state.permition}
                <div ref={this.baseMenuTab} className="main-border-bottom second-background-grs" style={{paddingTop: "10px", paddingBottom: "10px", marginLeft: "-20px", marginRight: "-10px", paddingLeft: "20px"}}>
                    <div style={{float: "left", marginRight: "15px", borderRight: "#dcdbdb 2px solid"}}>
                        <a onClick={this.infoProject} className="bold" style={{fontSize: "12px", marginRight: "20px", paddingBottom: "10px", color: "#000"}}>
                            <em class="fa fa-folder">&nbsp;</em>Project Info
                        </a>
                        {this.state.infoProjectPop}
                    </div>

                    <a onClick={(e) => this.mainMenu(e, "module")} className="bold main-menu-module" style={{fontSize: "12px", marginRight: "20px", paddingBottom: "10px", borderBottom: "2px solid #386384"}}>Module</a>
                    <a onClick={(e) => this.mainMenu(e, "bugs")} className="bold main-menu-module second-font-color" style={{fontSize: "12px", marginRight: "20px", paddingBottom: "10px"}}>Bugs</a>
                    <a onClick={(e) => this.mainMenu(e, "doc file")} className="bold main-menu-module second-font-color" style={{fontSize: "12px", marginRight: "20px", paddingBottom: "10px"}}>Doc File</a>

                    {
                        /*menu -> data tab from database*/
                        tabMenuAdditional
                    }

                    <a onClick={this.newTab} className="main-menu-module second-font-color" style={{fontSize: "12px", marginRight: "20px", borderLeft: "2px solid #CCC", paddingLeft: "10px"}}>
                        <FontAwesomeIcon icon={faPlusCircle}/>&nbsp;
                        New Tab
                    </a>
                </div>
                {this.state.tabBase}
                <div ref={this.refModule} id="base-tab-module">
                    <div id="header-base-tab-module" className="main-border-bottom" style={{paddingBottom: "10px", paddingTop: "10px", width: "80%"}}>
                        <span className="bold">List Module</span>
                        {
                            (this.state.picProject == getCookieUserId() || this.state.createdByProject == getCookieUserId()) 
                            ?
                                <div style={{float: "right"}}>
                                    <button ref={this.markAllBtn} onClick={this.markAll} style={{background:"none", fontSize: "12px", display: "block", float: "left", marginTop: "4px"}} className='bold main-border-right'>
                                        <i class="fa fa-check"></i> Mark All
                                    </button>
                                    <button ref={this.unMarkAllBtn} onClick={this.unmarkAll} style={{background:"none", fontSize: "12px", display: "none", float: "left", marginTop: "4px"}} className='bold main-border-right'>
                                        <i class="fa fa-times"></i> Unmark All
                                    </button>
                                    <button onClick={this.deleteModule} style={{background:"none", fontSize: "12px"}} className='bold main-border-right'>
                                        <i class="fa fa-trash"></i> Delete
                                    </button>
                                    <button onClick={this.handOver} style={{background: "none", fontSize: "12px"}}
                                            className='bold main-border-right'>
                                        <FontAwesomeIcon icon={faHandshake}/> Handover
                                    </button>
                                    <button onClick={this.newModule.bind(this)} style={{background:"none", fontSize: "12px"}} className='bold main-border-right'>
                                        <i class="fa fa-plus"></i> New Module
                                    </button>
                                    {
                                        (this.state.isBorder)
                                        ?
                                            <button onClick={this.hideBorder} className="bold main-font-color tooltip" onClick={this.hideBorder} style={{background: "none", fontSize: "12px"}}>
                                                <FontAwesomeIcon icon={faBorderNone}/>
                                                <span className="tooltiptext">Hide border</span>
                                            </button>
                                        :
                                            <button onClick={this.showBorder} className="bold main-font-color tooltip" onClick={this.showBorder} style={{background: "none", fontSize: "12px"}}>
                                                <FontAwesomeIcon icon={faBorderAll}/>
                                                <span className="tooltiptext">Show border</span>
                                            </button>
                                    }
                                </div>
                            : 
                                ""
                        }
                    </div>
                    
                    <table style={{width: "80%"}}>
                        <thead ref={this.theadModule}>
                            <tr>
                                <th colSpan="2" style={{width: "400px"}} className="main-border-right second-font-color bold">Module</th>
                                <th style={{width: "150px"}} className="main-border-right second-font-color bold">PIC</th>
                                <th className="main-border-right second-font-color bold">Due date</th>
                                <th className="main-border-right second-font-color bold">Status</th>
                            <th className="second-font-color bold"></th>
                            </tr>
                        </thead>
                        <tbody style={{overflow: "auto"}}>
                            {
                                (dataModule == "") 
                                ? 
                                    <tr><td colSpan="5" className="bold font-second-color" style={{paddingTop: "20px",paddingBottom:"30px", fontSize: "14px", textAlign: "center", color: "#a2a2a2"}}><span style={{fontSize: "16px"}}><i class="fa fa-exclamation-triangle"></i></span><br></br>No data to display</td></tr> 
                                : 
                                    dataModule
                            }
                        </tbody>
                    </table>
                </div>
                
                <div ref={this.refBugs} id="base-tab-bugs" style={{display: "none"}}>
                    {this.state.bugsBase}
                </div>
                <div ref={this.refDocFile} id="base-tab-doc-file" style={{display: "none"}}>
                    {this.state.documentFileBase}
                </div>
                
                <div className="main-border-top" style={{marginTop: "30px", paddingTop: "10px"}}>
                    <div className="bold" style={{marginBottom: "10px"}}><i class="fa fa-users"></i> Member team</div>
                    {
                        dataTeamMember == "" 
                        ? 
                            <div id='no-member-base'>
                                <span style={{fontSize: "12px"}}>No data member in this project<br/>click button bellow to add new member</span>
                                <div style={{marginTop: "5px"}}><button className="btn-primary" onClick={this.addMember}><i class="fa fa-user-plus"></i> Add</button></div>
                            </div> 
                        : 
                            <div>
                                {dataTeamMember}
                                {
                                    (this.state.picProject == getCookieUserId()) 
                                    ?    
                                        <button style={{paddingTop: "10px", paddingBottom: "9px", background: "none"}} onClick={this.addMember}><i class="fa fa-user-plus"></i> Add</button>
                                    :
                                        ""
                                }
                            </div>
                    }
                </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setDataNote: (dataNote) => dispatch(setDataNote(dataNote)),
        selectRowModule: (moduleId) => dispatch(selectRowModule(moduleId))
    }
}



export default connect('', mapDispatchToProps) (modulePage)