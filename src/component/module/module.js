import React, { Fragment } from 'react'
import NewModule from './new_module'
import PopupConfirmation from '../popup_confirmation'
import Detail from './detail_module/detail'
import ManageMember from './manage_member'
import Permition from './permition'
import {ApiFetch} from '../apiFetch'
import { getCookieUserId } from '../../function/function'
import {connect} from 'react-redux'
import {setDataNote, selectRowModule, deleteMember, setDataStatus, setViewModule} from '../../redux/action'
import Bugs from '../bugs/bugs'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBorderAll, faBorderNone, faPlusCircle, faCaretDown, faCog,} from '@fortawesome/free-solid-svg-icons'
import DocumentFile from '../document_file/document_file'
import InfoProject from './info_project'
import HandoverModule from './handover_module'
import NewTab from './tab/new_tab'
import Tab from './tab/tab'
import DropDownMenuTab from './dropdown_tab_menu'
import MenuTab from './menu_tab'
import ListView from './list_view/list_view'
import CardView from './card_view/card_view'
import ContextMenuModule from './context_menu_module'

class modulePage extends React.Component{
    
    constructor(){
        super()
        this.state = {
            infoPop:"",
            addMember:"",
            dataTeam:[],
            dataPermition:[],
            dataTab:[],
            createdByProject:"",
            permition:"",
            dataNote:[],
            bugsBase:"",
            isBorder:"",
            documentFileBase:"",
            projectName:"",
            infoProjectPop:"",
            tabBase:"",
            isPermitionModule: false,
            dropDownMenuTabBase: "",
            dropDownMenuTabItem: [],
            isUpadateDataTab: false,
            isRecreteMenuTab: false,
            arrSelected: [],
            contextMenuBase: ""
        }

        this.refBugs = React.createRef()
        this.refModule = React.createRef()
        this.refDocFile = React.createRef()
        this.theadModule = React.createRef()
        this.markAllBtn = React.createRef()
        this.unMarkAllBtn = React.createRef()
        this.baseMenuTab = React.createRef()
        this.menuModule = React.createRef()
        this.tabBaseMenu = React.createRef()
        this.dropdownBase = React.createRef()
        this.menuBugs = React.createRef()
        this.menuDocFile = React.createRef()
 
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
        this.tabMenuDp = this.tabMenuDp.bind(this)
        this.editTab = this.editTab.bind(this)
        this.refreshTabMenu = this.refreshTabMenu.bind(this)
        this.dropDownMenuTabAction = this.dropDownMenuTabAction.bind(this)
        this.hideDropDownTabMenu = this.hideDropDownTabMenu.bind(this)
        this.setDropDownTabMenuData = this.setDropDownTabMenuData.bind(this)
        this.resetDropDownTabMenu = this.resetDropDownTabMenu.bind(this)
        this.setRecreateMenuTabTrue = this.setRecreateMenuTabTrue.bind(this)
        this.setRecreateMenuTabFalse = this.setRecreateMenuTabFalse.bind(this)
        this.commitNewStatus = this.commitNewStatus.bind(this)
        this.updateDataStatus = this.updateDataStatus.bind(this)
        this.startingTab = this.startingTab.bind(this)
        this.setDataModulePage = this.setDataModulePage.bind(this)
        this.readDataLabel = this.readDataLabel.bind(this)
        this.card = this.card.bind(this)
        this.list = this.list.bind(this)
        this.contextMenuModule = this.contextMenuModule.bind(this)
        this.commitDeleteModuleCtx = this.commitDeleteModuleCtx.bind(this)
        this.deleteModuleDelCtx = this.deleteModuleDelCtx.bind(this)
    }

    componentDidMount(){
        this.state.arrSelected = []
        this.setDataModulePage(this.props)
        this.startingTab()
        
        document.addEventListener("keydown", this.holdDown)
        document.addEventListener("keyup", this.holdUp)
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            this.setDataModulePage(nextProps)
            this.startingTab()
        }

        if(this.props.projectIdHeader != nextProps.projectIdHeader){
            this.state.arrSelected = []
        }
    }

    setDataModulePage(dataProps){
        dataProps.dataProject.map(dt => {
            dataProps.setDataNote(dataProps.dataNote)
            this.setState({
                dataTeam: dataProps.dataTeam,
                createdByProject: dt.createdBy,
                projectName:dt.projectName,
                dataPermition: dataProps.dataPermition,
                dataNote: dataProps.dataNote,
                picProject: dt.pic,
                dataTab: dataProps.dataTab,
                dataStatus: dataProps.dataStatus
            })
        })

        dataProps.dataPermition.map(dt => {
            if(dt.permitionCode == 1 && dt.isChecked == 'Y'){
                this.setState({
                    isPermitionModule: true
                })
            }
        })
    }

    startingTab(){
        let href = window.location.href
        let getCurrentTab = href.split("?")[1]
        let getCurrentTab2 = (getCurrentTab !== undefined) ? getCurrentTab.split("=")[1] : ""
        let currentTab = getCurrentTab2.replace("%20", " ")
        let scope = this
        var itv = setInterval(function(){
            if(currentTab == "bugs") {
                scope.menuBugs.current.click()
            }else if(currentTab == "doc file"){
                scope.menuDocFile.current.click()
            }else if(currentTab == "" || currentTab == "module"){
                //do nothing
            }else{
                scope.tabMenu(null, currentTab)
            }
            clearInterval(itv)
        }, 100)
    }

    refreshDataTeam(jsonData, userIdList){
        this.props.dataModule.map(dt => {
            var idx = userIdList.indexOf(dt.userId)
            if(idx >= 0) {
                dt.isMember = 1 
            }else{
                dt.isMember = 0
            }
        })

        this.setState({
            dataTeam: jsonData,
            addMember: ""
        })
    }

    selectedRow(data){
        if(this.state.ctrlClick){
            //no action
        }else{
            this.props.dataModule.map(dt => {
                if(dt.modulId == data){
                    this.setState({
                        infoPop: <Detail
                                    close={this.hidePopUp}
                                    modulId={dt.modulId}
                                    projectId={dt.projectId}
                                    description={dt.description}
                                    tabParameter="info"
                                />
                    })
                }
            })
        }
    }

    selectedRow2(arrSelected){
        this.setState({
            arrSelected: arrSelected
        })
    }

    updateStateDataNote(jsonObj){
        this.state.dataNote.push(jsonObj)
        this.setState({
            dataNote: this.state.dataNote
        })
    }

    mainMenu(e, tab){
        this.pushHistory(tab)
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
                                description={dt.description}
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
            var idx = this.state.arrSelected.indexOf(dt.modulId)
            this.state.arrSelected.push(dt.modulId)
        })
        this.props.selectRowModule("all mark")
        this.unMarkAllBtn.current.style.display = "block"
        this.markAllBtn.current.style.display = "none"
    }

    unmarkAll(){
        this.state.arrSelected = []
        this.props.selectRowModule("all unmark")
        this.unMarkAllBtn.current.style.display = "none"
        this.markAllBtn.current.style.display = "block"
    }

    newModule(){
        this.setState({
            infoPop: <NewModule 
                        projectId={this.props.projectIdHeader}
                        hcName={this.handleChangeNameModule}
                        dataStatus={this.props.dataStatus}
                        commit={this.commitNewModule}
                        commitNewStatus={this.commitNewStatus}
                        hide={this.hidePopUp}/>
        })
    }

    commitNewStatus(status){
        this.props.commitNewStatus(status)
    }

    hidePopUp(){
        this.setState({
            infoPop: ""
        })
    }

    deleteModule(){
        if(this.state.arrSelected.length > 0){
            this.setState({ 
                infoPop: <PopupConfirmation textPopup="Are you sure, you want delete this module ?" titleConfirmation="Delete module" hidePopUp={this.hidePopUp} yesAction={this.commitDeleteModule}/>
            })
        }
    }

    setRecreateMenuTabTrue(){
        this.setState({
            isRecreteMenuTab: true
        })
    }

    setRecreateMenuTabFalse(){
        this.setState({
            isRecreteMenuTab: false
        })
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
            if(this.state.arrSelected.length > 0){
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
        form.append("moduleId", this.state.arrSelected)

        ApiFetch("/delete_module", {
            method: "POST",
            body: form
        }).then(res => res.text())
        .then(result => {
            this.props.commitDeleteModule(this.state.arrSelected)
            this.setState({
                infoPop: ""
            })
        })
    }

    commitDeleteModuleCtx(moduleId){
        var userId = getCookieUserId()
        var form = new FormData()
        form.append("userId", userId)
        form.append("moduleId", moduleId)
        
        let arrModuleId = []
        arrModuleId.push(moduleId)

        ApiFetch("/delete_module", {
            method: "POST",
            body: form
        }).then(res => res.text())
        .then(result => {
            this.props.commitDeleteModule(arrModuleId)
            this.setState({
                infoPop: ""
            })
        })
    }

    commitNewModule(idUser, moduleName, dueDate, description, pi, status){
        this.props.commitNewModule(idUser, moduleName, dueDate, description, pi, status)
        this.setState({
            infoPop: ""
        })
    }

    addMember(){
        this.setState({
            infoProjectPop: "",
            addMember: <ManageMember
                            projectId={this.props.projectIdHeader}
                            dataTeam={this.state.dataTeam} 
                            projectId={this.props.projectIdHeader}
                            deleteMember={this.deleteMember} 
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

    deleteMember(userId){
        const data = this.state.dataTeam.map(dt => {
            if(dt.userId == userId){
                dt.isDelete = "Y"
            }
            return dt
        })
        
        this.props.deleteMemberRedux(userId)
        this.setState({
            dataTeam: data
        })
        console.log(this.state.dataTeam)
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

    showBorder(){
        var c = document.getElementsByClassName("tb-border-mod")
        for(var i = 0;i<c.length;i++){
            c[i].style.border = "#dcdbdb 1px solid"
        }

        var cr = this.theadModule.current
        if(cr != null){
            cr.setAttribute("class", "second-background-grs main-border")
            cr.style.borderTop = "none"
        }

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
        if(cr != null){
            cr.setAttribute("class", "")
            cr.style.borderTop = "none"
        }

        this.setState({
            isBorder: false
        })
    }

    infoProject(){
        this.props.dataProject.map(dt =>
            this.setState({
                infoProjectPop: <InfoProject
                                    dataStatus={this.props.dataStatus} 
                                    dataTeam={this.state.dataTeam}
                                    dataPermition={this.state.dataPermition}
                                    refreshModule={this.props.refreshModule}
                                    dataProject={dt}
                                    // updateDataStatus={this.updateDataStatus}
                                    manageMember={this.addMember}
                                    hideInfo={this.hideInfoProject}/>
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
            dataTab: jsonData,
            isUpadateDataTab: true
        })
    }

    tabMenu(e, tabId){
        var c = document.getElementsByClassName("main-menu-module")
        for(var i = 0;i<c.length;i++){
            c[i].style.borderBottom = "none"
            c[i].setAttribute("class", "bold main-menu-module second-font-color")
        }

        this.dropdownBase.current.style.borderBottom = "none"

        if(e != null) {
            var t = e.target
            t.setAttribute("class", "bold main-menu-module")
            t.style.borderBottom = "2px solid #386384"
        }

        this.refModule.current.style.display = "none"
        this.refBugs.current.style.display = "none"
        this.refDocFile.current.style.display = "none"

        let tabName = null
        let privacy = null
        let createdBy = null
        let userName = null
        this.state.dataTab.map(dt => {
            if(dt.tabId == tabId){
                tabName = dt.tabName
                privacy = dt.privacy
                createdBy = dt.createdBy
                userName = dt.userName
            }
        })

        this.setState({
            tabBase: <Tab
                        updateDataTab={this.updateDataTab}
                        editTab={this.editTab}
                        projectId={this.props.projectIdHeader}
                        dataTeam={this.state.dataTeam}
                        tabId={tabId}
                        refreshDelete={this.refreshTabMenu}
                        pic={this.state.picProject}

                    />
        })
    }

    tabMenuDp(base, tabId){
        let c = document.getElementsByClassName("main-menu-module")
        for(let i = 0;i<c.length;i++){
            c[i].style.borderBottom = "none"
            c[i].setAttribute("class", "bold main-menu-module second-font-color")
        }

        base.style.borderBottom = "2px solid #386384"

        this.refModule.current.style.display = "none"
        this.refBugs.current.style.display = "none"
        this.refDocFile.current.style.display = "none"

        let tabName = null
        let privacy = null
        let createdBy = null
        let userName = null
        this.state.dataTab.map(dt => {
            if(dt.tabId == tabId){
                tabName = dt.tabName
                privacy = dt.privacy
                createdBy = dt.createdBy
                userName = dt.userName
            }
        })

        this.setState({
            tabBase: <Tab
                updateDataTab={this.updateDataTab}
                editTab={this.editTab}
                projectId={this.props.projectIdHeader}
                dataTeam={this.state.dataTeam}
                tabId={tabId}
                pic={this.state.picProject}
                createdBy={createdBy}
                privacy={privacy}
                userName={userName}
                refreshDelete={this.refreshTabMenu}
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

    refreshTabMenu(tabId){
        let data = this.state.dataTab
        this.state.dataTab.map(dt => {
            if(dt.tabId == tabId){
                let idx = data.indexOf(dt)
                data.splice(idx, 1)
            }
            return dt
        })

        this.menuModule.current.click()
        this.setState({
            isRecreteMenuTab: true,
            dataTab: data
        })
    }

    dropDownMenuTabAction(){
        this.setState({
            dropDownMenuTabBase : <DropDownMenuTab item={this.state.dropDownMenuTabItem}
                                                   baseDropdown={this.dropdownBase}
                                                   tabMenuActionDp={this.tabMenuDp}
                                                   hideDropDown={this.hideDropDownTabMenu}/>
        })
    }

    pushHistory(tab){
        let href = window.location.href
        let getCurrentTab = href.split("?")[1]
        let getCurrentTab2 = (getCurrentTab !== undefined) ? getCurrentTab.split("=")[1] : ""
        let currentTab = getCurrentTab2
        if(tab !== currentTab){
            window.history.pushState("", "dandi", "/project/"+this.props.projectIdHeader+"?tab="+tab)
        }
    }

    hideDropDownTabMenu(){
        this.setState({
            dropDownMenuTabBase : ""
        })
    }

    resetDropDownTabMenu(){
        this.setState({
            dropDownMenuTabItem : []
        })
    }

    setDropDownTabMenuData(jsonObject){
        if(jsonObject.isDelete != "Y") {
            this.state.dropDownMenuTabItem.push(jsonObject)
        }
    }

    /*unuser function*/
    updateDataStatus(jsonData){
        // this.props.updateDataStatus(jsonData)
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

    card(){
        this.props.setViewModule("card")
    }

    list(){
        this.props.setViewModule("list")
    }

    contextMenuModule(e, moduleId){
        e.preventDefault()

        var x = e.clientX;     // Get the horizontal coordinate
        var y = e.clientY;     // Get the vertical coordinate

        this.setState({
            infoPop: <ContextMenuModule viewDetail={this.selectedRow} 
                                        delete={this.deleteModuleDelCtx}
                                        moduleId={moduleId}
                                        hide={this.hidePopUp}
                                        left={x} 
                                        top={y}/>
        })
    }

    deleteModuleDelCtx(moduleId){
        this.setState({ 
            infoPop: <PopupConfirmation textPopup="Are you sure, you want delete this module ?" 
                                        titleConfirmation="Delete module" 
                                        hidePopUp={this.hidePopUp} 
                                        yesAction={() => this.commitDeleteModuleCtx(moduleId)}/>
        })
    }

    render(){
        return(
            <React.Fragment>
                {this.state.infoPop}
                {this.state.addMember}
                {this.state.permition}

                <div ref={this.baseMenuTab} className="main-border-bottom second-background-grs" style={{paddingTop: "10px", marginLeft: "-20px", marginRight: "-10px", paddingLeft: "20px", overflow: "hidden"}}>
                    <div id="inf-project-module" style={{float: "left", marginRight: "15px", borderRight: "#dcdbdb 2px solid"}}>
                        <a onClick={this.infoProject} className="bold" style={{fontSize: "12px", marginRight: "20px", paddingBottom: "10px", color: "#000"}}>
                            <FontAwesomeIcon icon={faCog}/>&nbsp;Info Project
                        </a>
                        {this.state.infoProjectPop}
                    </div>

                    {/*menu module, bugs, doc file*/}
                    <div id="main-menu-module" style={{float: "left"}}>
                        <a ref={this.menuModule} onClick={(e) => this.mainMenu(e, "module")}
                           className="bold main-menu-module"
                           style={{fontSize: "12px",
                               marginRight: "20px",
                               paddingBottom: "10px",
                               borderBottom: "2px solid #386384",
                               display: "inline-block"}}>
                            Module
                        </a>
                        {/* <a ref={this.menuBugs} onClick={(e) => this.mainMenu(e, "bugs")}
                           className="bold main-menu-module second-font-color"
                           style={{fontSize: "12px",
                                marginRight: "20px",
                                paddingBottom: "10px",
                                display: "none"}}>
                            Bugs
                        </a> */}
                        <a ref={this.menuDocFile} onClick={(e) => this.mainMenu(e, "doc file")}
                           className="bold main-menu-module second-font-color"
                           style={{fontSize: "12px",
                                marginRight: "20px",
                                paddingBottom: "10px",
                                display: "inline-block"}}>
                            Doc File
                        </a>
                    </div>

                    <div id="base-tab-menu" ref={this.tabBaseMenu} style={{float: "left"}}>

                        <MenuTab
                            dataTab={this.state.dataTab}
                            isRecreate={this.state.isRecreteMenuTab}
                            action={this.tabMenu}
                            baseMenuTab={this.tabBaseMenu}
                            resetDropDown={this.resetDropDownTabMenu}
                            setDropDownData={this.setDropDownTabMenuData}
                            setRecreateMenuTabFalse={this.setRecreateMenuTabFalse}
                        />

                        <div ref={this.dropdownBase} style={{display: "none", paddingBottom: "10px"}}>
                            <button onClick={this.dropDownMenuTabAction}
                                    id="dropdown-menu-tab"
                                    className="main-border-left"
                                    style={{background: "none"}}>
                                <FontAwesomeIcon icon={faCaretDown}/>
                            </button>
                            {this.state.dropDownMenuTabBase}
                        </div>
                        <a id="btn-new-tab" onClick={this.newTab}
                           className="main-menu-module second-font-color"
                           style={{fontSize: "12px", marginRight: "20px", borderLeft: "2px solid #CCC", paddingLeft: "10px"}}>
                            <FontAwesomeIcon icon={faPlusCircle}/>&nbsp;
                            New Tab
                        </a>
                    </div>

                </div>
                {this.state.tabBase}
                <div ref={this.refModule} id="base-tab-module">
                    <div id="header-base-tab-module" className="main-border-bottom" style={{paddingBottom: "10px", paddingTop: "10px", width: "80%"}}>
                        <span className="bold">Modules / Tasks</span>
                        {
                            (this.state.picProject == getCookieUserId() || this.state.createdByProject == getCookieUserId() || this.state.isPermitionModule)
                            ?
                                <div style={{float: "right", display: "flex", marginTop: "2px"}}>
                                    {
                                        (this.props.viewModule == "list")
                                        ?
                                            <Fragment>
                                                <button ref={this.markAllBtn} onClick={this.markAll} style={{background:"none", fontSize: "12px", display: "block"}}>
                                                    {/* <i class="fa fa-check"></i>  */}
                                                    Mark All
                                                </button>
                                                <button ref={this.unMarkAllBtn} onClick={this.unmarkAll} style={{background:"none", fontSize: "12px", display: "none"}}>
                                                    {/* <i class="fa fa-times"></i>  */}
                                                    Unmark All
                                                </button>
                                                <button onClick={this.deleteModule} style={{background:"none", fontSize: "12px"}}>
                                                    {/* <i class="fa fa-trash"></i>  */}
                                                    Delete
                                                </button>
                                                <button onClick={this.deleteModule} style={{background:"none", fontSize: "12px"}}>
                                                    {/* <i class="fa fa-trash"></i>  */}
                                                    Filter
                                                </button>
                                            </Fragment>
                                        :
                                            ""
                                    }
                                    
                                    <button onClick={this.card} style={{background:"none", fontSize: "12px"}}>
                                        {/* <FontAwesomeIcon icon={faSimCard}/>  */}
                                        Card
                                    </button>
                                    <button onClick={this.list} style={{background:"none", fontSize: "12px"}}>
                                        {/* <i class="fa fa-times"></i>  */}
                                        List
                                    </button>
                                    <button onClick={this.newModule.bind(this)} style={{background:"none", fontSize: "12px"}}>
                                        {/* <i class="fa fa-plus"></i> */}
                                        New Module
                                    </button>
                                    {
                                        (this.props.viewModule == "list")
                                        ?
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
                                        :
                                            ""
                                    }
                                </div>
                            :
                                <div id="base-btn-no-usr-acc" style={{float: "right"}}>
                                    <button onClick={this.card} style={{background:"none", fontSize: "12px"}}>
                                        {/* <FontAwesomeIcon icon={faSimCard}/>  */}
                                        Card
                                    </button>
                                    <button onClick={this.list} style={{background:"none", fontSize: "12px"}}>
                                        {/* <i class="fa fa-times"></i>  */}
                                        List
                                    </button>
                                    
                                    {
                                        (this.state.isBorder)
                                        ?
                                            <button onClick={this.hideBorder} className="bold main-font-color tooltip" onClick={this.hideBorder} style={{background: "none", fontSize: "12px"}}>
                                                <FontAwesomeIcon icon={faBorderNone}/>
                                                <span className="tooltiptext">Hide border</span>
                                            </button>
                                        :
                                            <button onClick={this.showBorder} className="main-font-color tooltip" onClick={this.showBorder} style={{background: "none", fontSize: "12px"}}>
                                                <FontAwesomeIcon icon={faBorderAll}/>
                                                <span className="tooltiptext">Show border</span>
                                            </button>
                                    }
                                </div>
                        }
                    </div>
                    
                    {
                        (this.props.viewModule == "list")
                        ?
                            <ListView isBorder={this.state.isBorder}
                                contextMenuModule={this.contextMenuModule}
                                selectedRow={this.selectedRow}
                                selectedRow2={this.selectedRow2}/>
                        :
                            <CardView contextMenuModule={this.contextMenuModule}
                                selectedRow={this.selectedRow}
                                selectedRow2={this.selectedRow2}/>
                    }

                </div>
                
                <div ref={this.refBugs} id="base-tab-bugs" style={{display: "none"}}>
                    {this.state.bugsBase}
                </div>
                <div ref={this.refDocFile} id="base-tab-doc-file" style={{display: "none"}}>
                    {this.state.documentFileBase}
                </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setDataNote: (dataNote) => dispatch(setDataNote(dataNote)),
        selectRowModule: (moduleId) => dispatch(selectRowModule(moduleId)),
        deleteMemberRedux: (userId) => dispatch(deleteMember(userId)),
        setViewModule: (type) => dispatch(setViewModule(type))
    }
}

const mapStateToProps = state => {
    return{
        dataLabelModule: state.dataLabelsModule,
        assignedModules: state.assignedModules,
        dataModule: state.dataModule,
        dataStatus: state.dataStatus,
        viewModule: state.viewModule
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (modulePage)