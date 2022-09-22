import React, { Fragment } from 'react'
import PopupConfirmation from '../popup_confirmation'
import Detail from './detail_task/detail'
import ManageMember from './manage_member'
// import Permition from './permition'
// import {ApiFetch} from '../apiFetch'
import Fetch from '../../function/fetchApi'
import { getCookieUserId, setInitialName } from '../../function/function'
import {connect} from 'react-redux'
import {setDataNote, selectRowModule, deleteMember, setViewModule} from '../../redux/action'
import Bugs from '../bugs/bugs'
import DocumentFile from '../document_file/document_file'
// import InfoProject from './info_project.js'
import HandoverModule from './handover_module'
import NewCollection from './tab/new_collection'
import Collection from './tab/collection'
import DropDownMenuTab from './dropdown_tab_menu'
// import MenuTab from './menu_tab'
import ListView from './list_view/list_view'
import CardView from './card_view/card_view'
import ContextMenuModule from './context_menu_module'
// import SidebarTask from './sibebar_task'
import ManageStatus from './manage_status'
import NewSection from './new_section'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faFolder, faObjectGroup, faUser } from '@fortawesome/free-solid-svg-icons'
import {check_circle as CkCIrcle, circle_duotone as CircleDuotone, circle_minus as CircleMinus} from '../icon/icon'
import HeaderTask from './header_task'

class modulePage extends React.Component{
    
    constructor(){
        super()
        this.state = {
            infoPop:"",
            addMember:"",
            dataPermition:[],
            dataCollection:[],
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
            contextMenuBase: "",
            popup: null,
            showDescription: false,
            isDeleteProject: false,
            groupType: "section",
            filterData:{},
            tabActive: "task",
            showBorderAttachment: false
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
        this.popGroupBy = React.createRef()
        this.popFilter = React.createRef()
 
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
        this.newCollection = this.newCollection.bind(this)
        this.updateDataCollection = this.updateDataCollection.bind(this)
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
        this.manageStatus = this.manageStatus.bind(this)
        this.showDescription = this.showDescription.bind(this)
        this.groupByAct = this.groupByAct.bind(this)
        // this.groupByPop = this.groupByPop.bind(this)
        this.filterAction = this.filterAction.bind(this)
        // this.filter = this.filter.bind(this)
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
                dataCollection: dataProps.dataTab,
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
                if(scope.menuBugs.current != null) scope.menuBugs.current.click()
            }else if(currentTab == "doc file"){
                if(scope.menuDocFile.current != null) scope.menuDocFile.current.click()
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
        this.setState({
            infoPop: <Detail
                        close={this.hidePopUp}
                        modulId={data}
                        projectId={this.props.projectIdHeader}
                    />
         })
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

    mainMenu(e, tab, isSideBar){
        // console.log(tab+" "+isSideBar)
        // this.pushHistory(tab)
        var c = document.getElementsByClassName("main-menu-module")
        
        if(isSideBar != true){
            for(var i = 0;i<c.length;i++){
                c[i].style.borderBottom = "none"
                c[i].setAttribute("class", "bold main-menu-module second-font-color")
            }

            var t = e.target
            t.setAttribute("class", "bold main-menu-module")
            t.style.borderBottom = "2px solid #386384"
        }

        this.refModule.current.style.display = "none"
        this.refBugs.current.style.display = "none"
        this.refDocFile.current.style.display = "none"

        if(tab == "bugs"){
            this.setState({
                bugsBase: <Bugs projectId={this.props.projectIdHeader} 
                                pic={this.state.picProject}
                                dataPermition={this.state.dataPermition}/>
            })

        }else if(tab == "task"){

            var refCurrent = this.refModule.current
            refCurrent.style.display = "block"
            this.setState({
                tabActive: tab
            })

        }else if(tab == "attachment"){
            var refCurrent = this.refDocFile.current
            refCurrent.style.display = "block"
            this.setState({
                tabActive: tab,
                documentFileBase: <DocumentFile
                                        mainMenu={(e) => this.mainMenu(e, "task", true)}
                                        projectId={this.props.projectIdHeader} 
                                        pic={this.state.picProject}
                                        dataPermition={this.state.dataPermition}/>
            })

            // setTimeout(() => {
            //     this.setState({
            //         // tabActive: tab,
            //         documentFileBase: <DocumentFile
            //                                 // mainMenu={(e) => this.mainMenu(e, "task", true)}
            //                                 projectId={this.props.projectIdHeader} 
            //                                 pic={this.state.picProject}
            //                                 dataPermition={this.state.dataPermition}/>
            //     })
                
            // }, 5000)
        }
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
            infoPop: <Detail
                        close={this.hidePopUp}
                        modulId={null}
                        projectId={this.props.projectIdHeader}
                    />
        })
        
        // this.setState({
        //     infoPop: <NewTask 
        //                 projectId={this.props.projectIdHeader}
        //                 hcName={this.handleChangeNameModule}
        //                 dataStatus={this.props.dataStatus}
        //                 section={this.props.sectionModule}
        //                 commit={this.commitNewModule}
        //                 commitNewStatus={this.commitNewStatus}
        //                 hide={this.hidePopUp}/>
        // })
    }

    newSection(){
        this.setState({
            infoPop: <NewSection 
                        // commit={this.commitNewModule}
                        // commitNewStatus={this.commitNewStatus}
                        projectId={this.props.projectIdHeader}
                        cancel={this.hidePopUp}/>
        })
    }

    commitNewStatus(status){
        this.props.commitNewStatus(status)
    }

    hidePopUp(){
        this.setState({
            infoPop: "",
            popup: null
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

        let fetch = new Fetch()
        fetch.post("/module/delete", form).then(result => {
            this.props.commitDeleteModule(this.state.arrSelected)
            this.setState({
                infoPop: ""
            })
        })
    }

    commitDeleteModuleCtx(moduleId){
        let fetch = new Fetch()
        let arrModuleId = [moduleId]
        fetch.deleteGolang("/module/"+moduleId).then(result => {
            this.props.commitDeleteModule(arrModuleId)
            this.setState({
                infoPop: ""
            })
        })
    }

    commitNewModule(idUser, moduleName, dueDate, description, pi, status, section){
        this.props.commitNewModule(idUser, moduleName, dueDate, description, pi, status, section)
        this.setState({
            infoPop: ""
        })
    }

    addMember(){
        this.setState({
            infoProjectPop: "",
            addMember: <ManageMember
                            projectId={this.props.projectIdHeader}
                            // dataTeam={this.props.dataTeam} 
                            // projectId={this.props.projectIdHeader}
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
        let i = 0
        let index = 0
        this.props.dataTeam.map(dt => {
            if(dt.userId == userId){
                index = i
            }
            i++
        })
        
        this.props.dataTeam.splice(index, 1)
    }

    setTeamMember(userId){
        this.setState({
            userSetTeamMember: userId
        })
    }

    // setPermition(userId){
    //     this.setState({
    //         userSetTeamMember: "",
    //         permition: <Permition
    //                         dataPermition={[]}
    //                         userId={userId}
    //                         projectId={this.props.projectIdHeader}
    //                         cancelPermition={this.cancelPermition}
    //                     />
    //     })
    // }

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
        // this.props.dataProject.map(dt =>
        //     this.setState({
        //         infoProjectPop: <InfoProject
        //                             dataStatus={this.props.dataStatus} 
        //                             dataTeam={this.props.dataTeam}
        //                             dataPermition={this.state.dataPermition}
        //                             refreshModule={this.props.refreshModule}
        //                             dataProject={dt}
        //                             // updateDataStatus={this.updateDataStatus}
        //                             manageMember={this.addMember}
        //                             hideInfo={this.hideInfoProject}/>
        //     })
        // )
        
    }

    hideInfoProject(){
        this.setState({
            infoProjectPop: ""
        })
    }

    newCollection(){
        this.setState({
            infoPop: <NewCollection
                            cancel={this.hidePopUp}
                            projectId={this.props.projectIdHeader}
                            updateDataCollection={this.updateDataCollection}
                        />
        })
    }

    updateDataCollection(jsonData){
        this.setState({
            dataCollection: jsonData,
            isUpadateDataTab: true
        })
    }

    tabMenu(e, tabId){
        var c = document.getElementsByClassName("main-menu-module")
        for(var i = 0;i<c.length;i++){
            c[i].style.borderBottom = "none"
            c[i].setAttribute("class", "bold main-menu-module second-font-color")
        }

        if(this.dropdownBase.current != null){
            this.dropdownBase.current.style.borderBottom = "none"

            if(e != null) {
                var t = e.target
                t.setAttribute("class", "bold main-menu-module")
                t.style.borderBottom = "2px solid #386384"
            }
        }

        /*hide page module, doc file and bugs*/
        this.refModule.current.style.display = "none"
        this.refBugs.current.style.display = "none"
        this.refDocFile.current.style.display = "none"

        let tabName = null
        let privacy = null
        let createdBy = null
        let userName = null
        this.state.dataCollection.map(dt => {
            if(dt.tabId == tabId){
                tabName = dt.tabName
                privacy = dt.privacy
                createdBy = dt.createdBy
                userName = dt.userName
            }
        })

        this.setState({
            tabBase: <Collection
                        updateDataCollection={this.updateDataCollection}
                        editTab={this.editTab}
                        projectId={this.props.projectIdHeader}
                        dataTeam={this.props.dataTeam}
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
        this.state.dataCollection.map(dt => {
            if(dt.tabId == tabId){
                tabName = dt.tabName
                privacy = dt.privacy
                createdBy = dt.createdBy
                userName = dt.userName
            }
        })

        this.setState({
            tabBase: <Collection
                updateDataCollection={this.updateDataCollection}
                editTab={this.editTab}
                projectId={this.props.projectIdHeader}
                dataTeam={this.props.dataTeam}
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
        const data = this.state.dataCollection.map(dt => {
            if(dt.tabId == tabId){
                dt.tabName = tabName
                dt.privacy = privacy
            }
            return dt
        })

        this.setState({
            dataCollection: data
        })
    }

    refreshTabMenu(tabId){
        let data = this.state.dataCollection
        this.state.dataCollection.map(dt => {
            if(dt.tabId == tabId){
                let idx = data.indexOf(dt)
                data.splice(idx, 1)
            }
            return dt
        })


        if(this.menuModule.current != null) this.menuModule.current.click()
        
        /*untuk mengalihkan ke data task atau module*/
        this.mainMenu(null, "task", true)

        this.setState({
            isRecreteMenuTab: true,
            dataCollection: data
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

        let isPermition = false
        // console.log(getCookieUserId())
        
        // console.log(this.props.dataProject)
        if(getCookieUserId() == this.props.dataProject[0].pic || this.state.isPermitionModule)
        {
            isPermition = true
        }

        this.setState({
            infoPop: <ContextMenuModule viewDetail={this.selectedRow} 
                                        delete={this.deleteModuleDelCtx}
                                        moduleId={moduleId}
                                        hide={this.hidePopUp}
                                        isPermitionModule={isPermition}
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

    manageStatus(){
        this.setState({
            popup: <ManageStatus dataStatus={this.props.dataStatus} 
                                 projectId={this.props.projectIdHeader}
                                 updateDataStatus={this.updateDataStatus} 
                                 cancel={this.hidePopUp}/>
        })
    }

    showDescription(){
        this.setState({
            showDescription: !this.state.showDescription
        })
    }

    groupByAct(type){
        this.setState({
            groupType: type
        })
    }

    // groupByPop(){
    //     this.popGroupBy.current.style.display = "block"
    //     return false
    // }

    // filter(){
    //     this.popFilter.current.style.display = "block"
    // }

    filterAction(type, id){
        let data = {}
        if(type != "all"){
            data.type = type
            data.id = id
        }
        this.setState({
            filterData: data
        })
    }

    colorStatus(a){
        let color =  ""
        let icon = null
        // console.log(this.props.dataStatus)
        this.props.dataStatus.map(dt => {
            if(a == dt.id){
                let colorStatus = (dt.color == null) ? "#000" : dt.color
                color = colorStatus

                // console.log("status : "+dt.status.toLowerCase())
                if(dt.status.toLowerCase() == "not started"){
                    icon = <CircleMinus className="second-font-color" style={{fontSize: "14px"}}/>
                }else if(dt.status.toLowerCase() == "completed"){
                    icon = <CkCIrcle style={{color: colorStatus, fontSize: "14px"}}/>
                }else{
                    icon = <CircleDuotone style={{fontSize: "12px", color: colorStatus, border: "1px solid", borderRadius: "100%"}}/>
                }
            }
        })
        return icon
    }

    render(){
        const pic = parseInt(this.props.dataProject[0].pic)
        let dataTeam = this.props.dataTeam.map(dt => {
            let name = dt.userName
            let initial = setInitialName(name)
            return  <div className="main-color" 
                        style={{width: "30px", 
                                height: "30px", 
                                borderRadius: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: "2px"}}>
                        <span className="bold" style={{color: "#FFF"}}>{initial}</span>
                    </div>
        })

        return(
            <React.Fragment>
                {this.state.infoPop}
                {this.state.addMember}
                {this.state.permition}
                {this.state.popup}
                
                <div id="base-data-module" style={{marginLeft: "0px"}}>
                    {this.state.tabBase}
                    
                    <HeaderTask
                        tabActive={this.state.tabActive}
                        filterAction={this.filterAction}
                        newModule={this.newModule.bind(this)}
                        newSection={this.newSection.bind(this)}
                        groupByAct={this.groupByAct}
                        list={this.list}
                        card={this.card}
                        showDescription={this.showDescription}
                        isShowDescription={this.state.showDescription}
                        taskPage={(e) => this.mainMenu(e, "task", true)}
                        attachment={(e) => this.mainMenu(e, "attachment", true)}
                    />
                    {/** base data tasklist or module */}        
                    <div ref={this.refModule} id="base-tab-module">
                        <div id="header-base-tab-module" className="main-border-bottom-drk" 
                            style={{paddingBottom: "15px", 
                                    paddingTop: "15px", 
                                    minWidth: "745px",
                                    display: "none", 
                                    marginLeft: "-10px", 
                                    paddingLeft: "10px"}}>
                            
                            <div style={{paddingLeft: "15px", 
                                        paddingRight: "15px", 
                                        display: "flex", 
                                        justifyContent: "space-between", 
                                        alignItems: "center"}}>

                                <div id="nm-prj-asdd" className="bold" style={{fontSize: "14px"}}>
                                    <FontAwesomeIcon className="fld-color" style={{fontSize: "18px"}} icon={faFolder}/>&nbsp;&nbsp;The Project Name
                                </div>
                                <div id="tb-mn-bs-jkdag" 
                                    style={{display: "flex", alignItems: "center"}}>
                                    
                                    <div className="main-border" style={{display: "flex",borderRadius: "10px", overflow: "hidden"}}>
                                        <a className="bold mn-tsk-main main-border-right" style={{color: "#000"}}>Task list</a>
                                        <a onClick={(e) => this.mainMenu(e, "doc file", true)} className="bold second-font-color mn-tsk-main main-border-right">Attachment</a>
                                        <a onClick={(e) => this.mainMenu(e, "doc file", true)} className="bold second-font-color mn-tsk-main">Chart</a>
                                    </div>
                                    
                                    <a>
                                        <div style={{display: "flex", paddingLeft: "10px"}}>
                                            {dataTeam}
                                        </div>
                                    </a>
                                </div>
                                <div id="tsk-hdr-mn-1xsd" style={{display: "flex"}}>
                                    {
                                        (this.props.viewModule == "list")
                                        ?
                                            <Fragment>
                                                <div className="main-border-right" style={{display: "flex", alignItems: "center", marginRight: "10px", paddingRight: "10px"}}>
                                                    <input type="checkbox" onClick={this.showDescription}/>&nbsp;&nbsp;
                                                    <div className="bold" style={{marginTop: "1px", fontSize: "11px"}}>Show Description</div>
                                                </div>
                                            </Fragment>
                                        :
                                            ""
                                    }
                                    {
                                        (this.props.viewModule == "list")
                                        ?
                                            <button className="main-border-drk"
                                                onClick={this.card} 
                                                style={{background:"none", fontSize: "11px", padding: "8px", borderRadius: "3px", display: "flex", marginRight: "5px"}}>
                                                <div className="main-border-right" style={{paddingRight: "5px"}}>
                                                    <i class="fa fa-square"></i>
                                                </div>
                                                <div style={{marginLeft: "5px"}}>Card</div>
                                            </button>
                                        :
                                            <button className="main-border-drk" 
                                                onClick={this.list} 
                                                style={{background:"none", fontSize: "11px", padding: "8px", borderRadius: "3px", display: "flex", marginRight: "5px"}}>
                                                <div className="main-border-right" style={{paddingRight: "5px"}}>
                                                    <i class="fa fa-list-alt"></i>
                                                </div>
                                                <div style={{marginLeft: "5px"}}>List</div>
                                            </button>
                                    }
                                    {
                                        (getCookieUserId() == pic || this.state.isPermitionModule)
                                        ?
                                            <Fragment>
                                                <button id="btn-n-tsk" className="main-border-drk" 
                                                    onClick={this.newModule.bind(this)} 
                                                    style={{background:"none", fontSize: "11px", padding: "8px", borderRadius: "3px", display: "flex", marginRight: "5px"}}>
                                                    <div className="main-border-right" style={{paddingRight: "5px"}}><i class="fa fa-plus"></i></div>
                                                    <div style={{marginLeft: "5px"}}>Task</div>
                                                </button>

                                                <button id="btn-n-sct" className="main-border-drk" 
                                                    onClick={this.newSection.bind(this)} 
                                                    style={{background:"none", fontSize: "11px", padding: "8px", borderRadius: "3px", display: "flex", marginRight: "5px"}}>
                                                    <div className="main-border-right" style={{paddingRight: "5px"}}><i class="fa fa-plus"></i></div>
                                                    <div style={{marginLeft: "5px"}}>Section</div>
                                                </button>
                                            </Fragment>
                                            
                                        : ""
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            (this.props.viewModule == "list")
                            ?
                                <ListView isBorder={this.state.isBorder}
                                    contextMenuModule={this.contextMenuModule}
                                    selectedRow={this.selectedRow}
                                    filter={this.state.filterData}
                                    showDescription={this.state.showDescription}
                                    selectedRow2={this.selectedRow2}/>
                            :
                                <CardView contextMenuModule={this.contextMenuModule}
                                    groupType={this.state.groupType}
                                    filter={this.state.filterData}
                                    selectedRow={this.selectedRow}
                                    selectedRow2={this.selectedRow2}/>
                        }
                    </div>

                    <div ref={this.refBugs} id="base-tab-bugs" style={{display: "none"}}>
                        {this.state.bugsBase}
                    </div>

                     {/** base data attachment */}    
                    <div ref={this.refDocFile} id="base-tab-doc-file" style={{display: "none"}}>
                        {this.state.documentFileBase}
                    </div>
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
        viewModule: state.viewModule,
        dataTeam: state.dataTeam,
        sectionModule: state.sectionModule
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (modulePage)