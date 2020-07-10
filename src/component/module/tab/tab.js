import React from 'react'
import ReactDom from 'react-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTable, faPlus, faBorderAll, faBorderNone, faTrash, faArrowsAltH, faCog, faGlobe, faLock, faUser, faCopy, faUserAlt, faFileExcel, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import CreateTable from './create_table'
import {baseUrl} from "../../../const/const";
import Form from './form_tab'
import FormAdd from './form_add'
import Row from './row_tab'
import PopConfirmation from '../../../component/popup_confirmation'
import EditDelTable from './edit_delete_table'
import TabSetting from './tab_setting'
import Filter from './filter_table_tab'
import CopyTab from './copy_tab'
import CellEdit from './cell_edit'
import {ApiFetch} from '../../apiFetch'
import PageNotFound from '../../404'
import {getCookieSessionId, getCookieUserId, popUpAlert, tableHeaderRender} from "../../../function/function";

class tab extends React.Component{

    constructor(){
        super()
        this.state = {
            popup: "",
            tableReady: true,
            form: "",
            col: null,
            row: [],
            isLoadData: false,
            tabId:0,
            seqSelected:null,
            isBorder: true,
            isStartingRow: true,
            popSetting: null,
            tabName: null,
            privacy: null,
            privacyIcon : null,
            createdBy: null,
            userName: null,
            filterHeaderColumn: null,
            btnAdditional: true,
            dataTeam: [],
            pic:null, 
            isCellEdit: false,
            rowCellEdit: 0,
            tabExist: false,
            dataFilter: [],
            columnOnFilter: [],
            lastSeqFilter: null
        }

        this.headerTable = React.createRef()
        this.tableBody = React.createRef()
        this.buttonDelete = React.createRef()
        this.tableBase = React.createRef()
        this.tbody = React.createRef()
        this.tableTBody = React.createRef()
        this.tableHeader = React.createRef()
        this.spanToWidth = React.createRef()
        this.tableBodyScroll = React.createRef()
        this.tabBase = React.createRef()
        this.pageNotFound = React.createRef()

        this.thClick = this.thClick.bind(this)
        this.cancel = this.cancel.bind(this)
        this.createTable = this.createTable.bind(this)
        this.formTab = this.formTab.bind(this)
        this.formAdd = this.formAdd.bind(this)
        this.fetchAction = this.fetchAction.bind(this)
        this.fetchActionRow = this.fetchActionRow.bind(this)
        this.showBorder = this.showBorder.bind(this)
        this.hideBorder = this.hideBorder.bind(this)
        this.appendDataTab = this.appendDataTab.bind(this)
        this.cancelForm = this.cancelForm.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
        this.commitDelete = this.commitDelete.bind(this)
        this.unselect = this.unselect.bind(this)
        this.scroll = this.scroll.bind(this)
        this.setting = this.setting.bind(this)
        this.editTab = this.editTab.bind(this)
        this.editDelTable = this.editDelTable.bind(this)
        this.reloadEditDelTable = this.reloadEditDelTable.bind(this)
        this.deleteTabPage = this.deleteTabPage.bind(this)
        this.thClickFilter = this.thClickFilter.bind(this)
        this.filterSubmit = this.filterSubmit.bind(this)
        this.isButtonAdditional = this.isButtonAdditional.bind(this)
        this.deleteTabPage2 = this.deleteTabPage2.bind(this)
        this.commitDeleteTab2 = this.commitDeleteTab2.bind(this)
        this.copyTab = this.copyTab.bind(this)
        this.existCopy = this.existCopy.bind(this)
        this.yesConfirmReplace = this.yesConfirmReplace.bind(this)
        this.cellContextMenu = this.cellContextMenu.bind(this)
        this.submitCellContextMenu = this.submitCellContextMenu.bind(this)
        this.createDataFilter = this.createDataFilter.bind(this)
        this.validationFilter = this.validationFilter.bind(this)
    }

    componentDidMount(){
        this.fetchAction(this.props.tabId)
        this.pushHistory()

        let icon = this.privacyIconRender(this.props.privacy)
        this.setState({
            isStarting: true,
            tabId: this.props.tabId,
            popSetting: null,
            createdBy: this.props.createdBy,
            privacyIcon: icon,
            dataTeam: this.props.dataTeam
        })
        this.isButtonAdditional(this.props.dataTeam, this.props.createdBy)
    }

    componentWillReceiveProps(nextProps){
        if(this.props.tabId !== nextProps.tabId){
            this.tableHeader.current.style.width = "auto"
            this.tableTBody.current.style.width = "auto"
            this.fetchAction(nextProps.tabId)
            this.pushHistory()
            let icon = this.privacyIconRender(nextProps.privacy)

            this.setState({
                row: [],
                tabId: nextProps.tabId,
                isStartingRow: true,
                popSetting: null,
                createdBy: nextProps.createdBy,
                privacyIcon: icon,
                dataTeam: nextProps.dataTeam,
                btnAdditional: true,
                dataFilter: [],
                columnOnFilter: []
            })
            this.isButtonAdditional(nextProps.dataTeam, nextProps.createdBy)
        }
    }

    fetchAction(tabId){
        this.tableBodyScroll.current.style.display = "none"
        this.tableBody.current.style.width = "100%"
        let tabIdpar = tabId
        let elm = document.getElementById("header-table-render")
        elm.innerHTML = ""

        let form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("tabId", tabId)
        form.append("projectId", this.props.projectId)

        ApiFetch("/tab_page", {
            method: "POST",
            body: form,
        }).then(res => res.json()).then(result => {
            let dataTab = result[0].tab
            let columnTab = (result[0].columnTab != 'no data') ? JSON.parse(result[0].columnTab) : null

            if(dataTab == null){
                this.tabBase.current.style.display = "none"
                this.pageNotFound.current.style.display = "block"
                this.tableBase.current.style.display = "none"
                this.setState({
                    tabExist: false,
                    tableReady: false,
                    row: []
                })
            }else{
                this.tabBase.current.style.display = "block"
                this.pageNotFound.current.style.display = "none"

                this.setState({
                    tabName: dataTab.tabName,
                    tabId: dataTab.tabId,
                    privacy: dataTab.privacy,
                    createdBy: dataTab.createdBy,
                    userName: dataTab.userName,
                    pic: dataTab.pic,
                    tableReady: false,
                })

                if((columnTab != null)) {
                    this.setState({
                        tabExist: true,
                        tableReady: true,
                        col: columnTab,
                        form: "",
                        row: []
                    })

                    this.tableBodyScroll.current.style.display = "block"
                    this.tableBase.current.style.display = "block"
                    let elm = document.createElement("btn")
                    ReactDom.render(<FontAwesomeIcon icon={faArrowsAltH}/>, elm)
                    
                    //create table heeader design
                    tableHeaderRender(columnTab, "header-table-render", this.thClick, this.thClickFilter, this.tableBodyScroll)
                    let tableWidth = this.tableHeader.current.style.width
                    //set table body width base tabelWidth
                    this.tableBody.current.style.width = tableWidth
                    this.tableBodyScroll.current.style.width = tableWidth
                    this.tableTBody.current.style.width = tableWidth
                    this.tbody.current.style.width = tableWidth
                    
                    
                    this.fetchActionRow(tabIdpar, columnTab)
                }
            }
        })
    }

    pushHistory(){
        let href = window.location.href
        // alert(href)
        // window.history.pushState("", )
    }

    createDataFilter(columnTab, row){
        if(columnTab != "no data"){
            var count = Object.keys(columnTab).length
            let jsonObject = JSON.parse("{}")
            for(let i = 0;i<count;i++){
                let jsonObject2 = JSON.parse("{}")
                jsonObject2.filter = []
                jsonObject2.filterData = []
                jsonObject2.seq = null
                jsonObject[i] = jsonObject2
            }

            this.setState({
                dataFilter: jsonObject
            })
        }
    }

    fetchActionRow(tabId, columnTab){
        this.setState({
            isLoadData: true
        })
        let form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("tabId", tabId)

        ApiFetch("/row_tab", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            let jo = JSON.parse(result)
            this.createDataFilter(columnTab, jo)
            this.setState({
                row: jo,
                isLoadData: false
            })
        })
    }

    cancel(){
        this.setState({
            popup: "",
            popSetting: null
        })
    }

    createTable(){
        this.setState({
            popup: <CreateTable
                        projectId={this.props.projectId}
                        tabId={this.props.tabId}
                        fetchAction={this.fetchAction}
                        cancel={this.cancel}/>
        })
    }

    reloadEditDelTable(){
        this.setState({
            row: [],
            isStartingRow: true
        })
        this.fetchAction(this.props.tabId)
    }

    editDelTable(){
        this.setState({
            popup: <EditDelTable colTable={this.state.col}
                                 tabId={this.state.tabId}
                                 fetchAction={this.reloadEditDelTable}
                                 cancel={this.cancel}/>
        })
    }

    privacyIconRender(privacy){
        let icon = null
        if(privacy == 'pr' || privacy == null){
            icon = <div><FontAwesomeIcon style={{fontSize: "11px"}} icon={faLock}/></div>
        }else if(privacy == 'pu'){
            icon = <div><FontAwesomeIcon style={{fontSize: "11px", marginTop: "3px"}} icon={faGlobe}/></div>
        }else{
            icon = <div><FontAwesomeIcon style={{fontSize: "11px"}} icon={faUser}/></div>
        }
        return icon
    }

    formTab(e, key){
        if(this.buttonDelete.current !== null) this.buttonDelete.current.style.opacity = 1
        let elm = document.getElementsByClassName("tr-tb-data")
        for(let i = 0;i<elm.length;i++){
            elm[i].setAttribute("class", elm[i].getAttribute("class").replace(" selected-row", ""))
        }

        let row = e.target.parentElement
        let c = row.getAttribute("class")
        row.setAttribute("class", c+" selected-row")

        let data = this.state.row
        for(let i = 0;i<data.length;i++){
            if(key == i){
                this.setState({
                    seqSelected: key,
                    isStartingRow: false,
                    popup: null,
                    form: <Form data={data[i]}
                                createdBy={this.state.createdBy}
                                seq={key}
                                tabId={this.props.tabId}
                                col={this.state.col}
                                update={this.update}
                                cancelForm={this.cancelForm}/>
                })
            }
        }
    }

    appendDataTab(json){
        const newState = this.state.row.concat(json)
        this.setState({
            row : newState
        })
    }

    formAdd(){
        this.setState({
            popup: <FormAdd
                    col={this.state.col}
                    tabId={this.props.tabId}
                    appendDataTab={this.appendDataTab}
                    cancel={this.cancel}/>
        })
    }

    thClick(thead, seqCol){
        var col = parseInt(seqCol) + 1
        let curThWidth = thead.offsetWidth
        let elmSpan = this.spanToWidth.current
        elmSpan.innerText = ""
        let w = 0
        let curWidthHeader = this.tableHeader.current.offsetWidth
        let newHeaderWidth = curWidthHeader
        let ltext = 0

        let thw = thead.style.width.replace("px", "")
        if(thw > 140){
            thead.style.width = "140px"
            newHeaderWidth = parseInt(150) + (curWidthHeader - thw)
        }else{
            let i = 0
            let rowTable = this.tbody.current.children
            for(let i = 0;i<rowTable.length;i++){
                let dataTable = rowTable[i].children
                let textDataTable = dataTable[col].innerText
                
                if(textDataTable.length > ltext){
                    ltext = textDataTable.length
                    if(ltext > 0) elmSpan.innerText = textDataTable
                    w = (elmSpan.offsetWidth > 500) ? 500 : parseInt(elmSpan.offsetWidth) + 10
                    console.log(w)
                    w = (w > 140) ? w : 140
                    thead.style.width = w+"px"
                    newHeaderWidth = curWidthHeader + (w - curThWidth)
                }
            }
        }

        this.tableHeader.current.style.width = newHeaderWidth+"px"
        this.tableBody.current.style.width = newHeaderWidth+"px"
        this.tableBodyScroll.current.style.width = newHeaderWidth+"px"
        this.tableTBody.current.style.width = newHeaderWidth+"px"
        this.tbody.current.style.width = newHeaderWidth+"px"

        this.setState({
            isStartingRow: true
        })
    }

    validationDataFilter(dataRow, currentSeq){
        let dataFilter  = this.state.dataFilter
        let count       = Object.keys(dataFilter).length
        let isOk        = "ok"

        for(let i = 0;i<count;i++){
            if(currentSeq == null){
                if(dataFilter[i].seq != null){
                    if(dataFilter[i].filter.indexOf(dataRow[i]) == -1){
                        isOk = "not"
                    }
                }
            }else{
                if(dataFilter[i].seq < currentSeq && dataFilter[i].seq != null){
                    if(dataFilter[i].filter.indexOf(dataRow[i]) == -1){
                        isOk = "not"
                    }
                }
            }
        }

        return isOk
    }

    thClickFilter(e, seqCol){
        var x = e.clientX;     // Get the horizontal coordinate
        var y = e.clientY;     // Get the vertical coordinate
        let r = window.innerWidth - x
        // let col = parseInt(seqCol) + 1
        let left = x
        if(r <= 210){
            left = window.innerWidth - 210
        }

        // console.log(this.state.dataFilter)
        let arrDataFiltered = this.state.dataFilter[seqCol].filter
        let currentSeq = this.state.dataFilter[seqCol].seq
        let arrDataFilter = []
        let row = this.state.row
        for(let i = 0;i<row.length;i++){
            let dataRow = row[i][seqCol]
            let idx     =  arrDataFilter.indexOf(dataRow)
            if(idx == -1){
                let isOK = this.validationDataFilter(row[i], currentSeq)
                
                if(isOK == "ok"){
                    arrDataFilter.push(row[i][seqCol])
                }
            }
        }


        this.setState({
            isStarting: false,
            dataFilter: this.state.dataFilter,
            popup: <Filter top={y}
                           column={seqCol}
                           data={arrDataFilter}
                           dataFiltered={arrDataFiltered}
                           btnFilter={e.target}
                           left={left}
                           right={r}
                           filter={this.filterSubmit}
                           cancel={this.cancel}/>
        })
    }

    filterSubmit(data, column, isAll){
        // let elmChild = this.tbody.current.children
        let arrColumnOnFilter = this.state.columnOnFilter
        this.state.dataFilter[column].filter = data

        let idx = arrColumnOnFilter.indexOf(column)
        if(idx == -1){
            if(!isAll){
                arrColumnOnFilter.push(column)
            }
        }else{
            if(isAll){
                arrColumnOnFilter.splice(idx, 1)
            }
        }

        //set sequence column in filter, untuk mengetahui urutan filter
        let countObject = Object.keys(this.state.dataFilter).length
        let sequenceFilter = 0

        if(!isAll){
            for(let i = 0;i<countObject;i++){
                let data = this.state.dataFilter[i]
                let seq = (data.seq == null) ? 0 : data.seq
                if(seq >= sequenceFilter){
                    let seqVal = (data.seq == null) ? 0 : parseInt(seq) + 1
                    sequenceFilter = seqVal
                }           
            }
        }else{
            this.state.dataFilter[column].filter = []
            sequenceFilter = null
        }

        /*
        jika urutan filter (seq) pada data state bukan nul
        maka seq tetap dengan urutan tersebut, tapi ketika urutan filte adalah null 
        kecuali filter di check all maka seq filter akan hilan
        maka perlu diberi data seq baru
        */
        let currentSeqFilter = this.state.dataFilter[column].seq
        if(currentSeqFilter == null){
            this.state.dataFilter[column].seq = sequenceFilter
        }else{
            if(sequenceFilter == null){
                //mengatur kembali urutan filter jika user select all data pada filter
                let lengthObject = Object.keys(this.state.dataFilter).length
                let curSeq = this.state.dataFilter[column].seq
                for(let i = 0;i<lengthObject;i++){
                    let dataFilter = this.state.dataFilter[i]
                    console.log(dataFilter.seq+" > "+curSeq)
                    if(dataFilter.seq > curSeq){
                        let newSeq = dataFilter.seq - 1
                        this.state.dataFilter[i].seq = newSeq
                    }
                }
                this.state.dataFilter[column].seq = sequenceFilter
            }
        }

        let dataFilter = this.state.dataFilter[column].filter        
        for(let i = 0;i<dataFilter.length;i++){
            if(dataFilter[i].length > 0){
                this.setState({
                    dataFilter: this.state.dataFilter,
                    columnOnFilter: arrColumnOnFilter
                })
            }
        }

        //set tampilan table header tab pada icon filter
        let elm = document.getElementsByClassName("seq-filter-pin")
        for(let i = 0;i<elm.length;i++){
            var seqFilter = this.state.dataFilter[i].seq
            seqFilter = (seqFilter != null) ? parseInt(seqFilter) + 1 : ""
            console.log(seqFilter)
            elm[i].innerText = seqFilter
        }
    }

    validationFilter(column){
        let dataFilter = this.state.dataFilter
        let columnOnFilter = this.state.columnOnFilter
        let returnData = "ok"
        // let returnDataTemp = "ok"
        let count = Object.keys(columnOnFilter).length

        // console.log(this.state.columnOnFilter)
        for(let i = 0;i<count;i++){
            let col = columnOnFilter[i]
            let data = dataFilter[col].filter
            
            if(data.indexOf(column[col]) == -1){
                returnData = "bad"
            }
        }
        return returnData
    }

    isButtonAdditional(dataTeam, createdBy){
        dataTeam.map(dt => {
            if(dt.userId == createdBy){
                this.setState({
                    btnAdditional: false
                })
            }
        })
    }

    showBorder(){
        this.setState({
            isBorder: true
        })
    }

    cancelForm(){
        if(this.buttonDelete.current != null) this.buttonDelete.current.style.opacity = 0.4
        let row = (this.tbody != null) ? this.tbody.current.children : null
        if(row !== null) {
            for (let i = 0; i < row.length; i++) {
                let crow = row[i].getAttribute("class").replace(" selected-row", "")
                row[i].setAttribute("class", crow)
            }
        }

        this.setState({
            form: "",
            seqSelected: null
        })
    }

    hideBorder(){
        this.setState({
            isBorder: false
        })
        let classElm = document.getElementsByClassName("td-tab-data")
        for(let i = 0;i<classElm.length;i++){
            let curClass = classElm[i].getAttribute("class")
            let setClass = curClass.replace(" main-border", "")
            classElm[i].setAttribute("class", setClass)
        }
    }

    update(json, seq){
        let i = 0;
        const data = this.state.row.map(dt => {
            if(seq == i){
                dt = json
            }
            i++
            return dt
        })

        this.setState({
            row: data,
            isStartingRow: false
        })
    }

    delete(){
        if(this.state.seqSelected == null)
            return false

        this.setState({
            popup: <PopConfirmation
                        textPopup="Are you sure, you want delete data tab ?"
                        titleConfirmation="Delete"
                        hidePopUp={this.cancel}
                        yesAction={this.commitDelete}
                    />
        })
    }

    scroll(e){
        let scrollLeft = e.target.scrollLeft
        this.tableHeader.current.style.marginLeft = "-"+scrollLeft+"px"
    }

    unselect(){
        let ref = this.tbody.current
        let row = ref.children()
        for(let i = 0;i<row.length;i++){
            let c = row[i].getAttribute("class").replace(" selected-row")
            row[i].setAttribute("class", c)
        }
    }

    commitDelete(){
        let seq = this.state.seqSelected
        let form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("tabId", this.props.tabId)
        form.append("seq", seq)

        ApiFetch("/delete_tab_data", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            const data = this.state.row
            data.splice(seq, 1)
            this.setState({
                form: "",
                popup: "",
                row: data,
                seqSelected: null
            })
        })
    }

    editTab(tabName, privacy){
        let icon = this.privacyIconRender(privacy)
        this.props.editTab(this.state.tabId, tabName, privacy)
        this.setState({
            tabName: tabName,
            privacy: privacy,
            privacyIcon: icon
        })
    }

    setting(){
        this.setState({
            popSetting: <TabSetting
                            dataTeam={this.props.dataTeam}
                            tabId={this.state.tabId}
                            privacy={this.state.privacy}
                            editTab={this.editTab}
                            tabName={this.state.tabName}
                            deleteTab={this.deleteTabPage}
                            cancel={this.cancel}/>
        })
    }

    copyTab(){
        this.setState({
            popup: <CopyTab existCopy={this.existCopy}
                            updateDataTab={this.props.updateDataTab}
                            tabId={this.state.tabId}
                            projectId={this.props.projectId}
                            cancel={this.cancel}/>
        })
    }

    existCopy(tabName, tabId, projectId){
        this.setState({
            popup: <PopConfirmation titleConfirmation="Copy tab"
                                    textPopup="tab name is already exist, do you want to replace the tab ?"
                                    yesAction ={() => this.yesConfirmReplace(tabName, tabId, projectId)}
                                    hidePopUp={this.cancel}
                                    />
        })
    }

    yesConfirmReplace(tabName, tabId, projectId){
        let form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("tabName", tabName)
        form.append("confirmReplace", "Y")
        form.append("tabId", tabId)
        form.append("projectId", projectId)

        ApiFetch("/copy_tab", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == 0){

                let form = new FormData()
                form.append("userId", getCookieUserId())
                form.append("sessionId", getCookieSessionId())
                form.append("projectId", this.props.projectId)
                ApiFetch("/tab_list", {
                    method: "POST",
                    body: form
                }).then(res => res.json()).then(result => {
                    this.props.updateDataTab(result)
                    this.setState({
                        popup: ""
                    })
                    popUpAlert("copy tab successfully", "success")
                })
            }else if(result == 2){
                this.props.existCopy(this.inputTabName.current.value, this.props.tabId, this.props.projectId)
            }else if(result == 3){
                this.setState({
                    popup: ""
                })
                popUpAlert("You cannot replace this tab")
            }
        })
    }

   deleteTabPage(tabId){
        this.props.refreshDelete(tabId)
   }

   deleteTabPage2(){
        this.setState({
            popup: <PopConfirmation titleConfirmation="Delete tab"
                                    hidePopUp={this.cancel}
                                    yesAction={this.commitDeleteTab2}
                                    textPopup="Are you sure you want delete this tab, make sure that tab maker is not a member anymore"/>
        })
    }

    commitDeleteTab2(){
        let form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("tabId", this.state.tabId)

        ApiFetch("/delete_tab", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == ""){
                this.cancel()
                this.props.refreshDelete(this.state.tabId)
                popUpAlert("Delete tab page successfully", "success")
            }else if(result == 1){
                this.cancel()
                popUpAlert("Tab maker is still a member in this project")
            }
        })
    }

    exportExcel(tabId, tabName){
        window.open(baseUrl+"/export_excel_tab/"+tabId+"?tab_n="+tabName)
    }

    cellContextMenu(e, row, column){
        e.preventDefault()
        if(this.buttonDelete.current !== null) this.buttonDelete.current.style.opacity = 0.4
        
        let elm = document.getElementsByClassName("tr-tb-data")
        for(let i = 0;i<elm.length;i++){
            elm[i].setAttribute("class", elm[i].getAttribute("class").replace(" selected-row", ""))
        }

        let val = this.state.row[row][column]
        var x = e.clientX    // Get the horizontal coordinate
        var y = e.clientY    // Get the vertical coordinate
        this.setState({
            // isCellEdit: false,
            form: null,
            seqSelected: null,
            // isStartingRow: true,
            popup: <CellEdit x={x}
                        y={y}
                        row={row}
                        column={column}
                        cancel={this.cancel}
                        submitCellContextMenu={this.submitCellContextMenu} 
                        value={val}/>
        })
    }

    submitCellContextMenu(row, column, value, color, colorBackground){
        let i = 0
        let dataPass = ""
        
        this.state.row.map(dt => {
            if(i == row){
                dt[column] = value
                dataPass = dt
            }
            i++
        })
        
        let scope = this

        let form = new FormData()
        form.append("seq", row)
        form.append("tabId", this.state.tabId)
        form.append("data", JSON.stringify(dataPass))

        ApiFetch("/edit_tab_data", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            this.setState({
                isCellEdit: true,
                popup: null
            })
            scope.update(dataPass, row)
            popUpAlert("Data successfully updated", "success")
        })
    }

    render(){
        let i = 0
        let no = 0
        const row = this.state.row.map(dt => {
            if(dt.isDelete != "Y"){
                let seq = i++
                no++
                let isRender = this.validationFilter(dt)
                if(isRender == "ok"){
                    console.log("render")
                    return <Row elm={document.getElementsByClassName("th-tab")}
                                headerTable={this.headerTable.current}
                                bodyTable={this.tableBody.current}
                                tableTbody={this.tableTBody.current}
                                tableHeader={this.tableHeader.current}
                                tableBodyScroll={this.tableBodyScroll.current}
                                isStarting={this.state.isStartingRow}
                                formTab={this.formTab}
                                isBorder={this.state.isBorder}
                                key={i}
                                seq={seq}
                                seqSelected={this.state.seqSelected}
                                no={no}
                                cellContextMenu={this.cellContextMenu}
                                colHeader={this.state.col}
                                col={dt}
                                dataFilter={this.state.dataFilter}
                                isCellEdit={this.state.isCellEdit}/>
                }
            }
        })

        return(
            <React.Fragment>
                <div ref={this.tabBase}>
                        {this.state.popup}
                    {this.state.form}
                    {this.state.filterHeaderColumn}
                    <span style={{fontSize: "12px", position: "absolute", opacity: "0", zIndex: "-1"}} ref={this.spanToWidth}/>
                    <div className="main-border-bottom" style={{paddingBottom: "10px", paddingTop: "10px", width: "100%", overflow: "hidden"}}>
                        <div style={{float: "left"}}>
                            <div className="second-font-color"
                                 style={{fontSize: "13px", marginRight: "5px", float: "left", marginTop: "2px"}}>
                                {this.state.privacyIcon}
                            </div>
                            <span className="bold">
                                        {this.state.tabName}
                                    </span>
                            <div className="second-font-color bold" style={{fontSize: "10px", marginLeft: "15px"}}>
                                <FontAwesomeIcon icon={faUserAlt}/> {this.state.userName}
                            </div>
                        </div>
                        <div style={{float: "right", padding: "5px"}}>
                            {
                                (this.state.createdBy == getCookieUserId())
                                    ?
                                    <React.Fragment>
                                        {
                                            (this.state.tableReady)
                                                ?
                                                <button onClick={this.formAdd}
                                                        style={{background:"none",
                                                            fontSize: "12px",
                                                            display: "block",
                                                            float: "left",
                                                            marginTop: "4px"}}>
                                                    <FontAwesomeIcon icon={faPlus}/>&nbsp;
                                                    Add data
                                                </button>
                                                : ""
                                        }
                                        
                                        <button ref={this.buttonDelete} onClick={this.delete}
                                                style={{background:"none",
                                                    fontSize: "12px",
                                                    display: "block",
                                                    float: "left",
                                                    opacity: "0.4",
                                                    marginTop: "4px"}}>
                                            <FontAwesomeIcon icon={faTrash}/>&nbsp;
                                            Delete
                                        </button>

                                        {
                                            (this.state.tableReady)
                                                ?
                                                <button onClick={this.editDelTable}
                                                        style={{background:"none",
                                                            fontSize: "12px",
                                                            display: "block",
                                                            float: "left",
                                                            marginTop: "4px"}}>
                                                    <FontAwesomeIcon icon={faTable}/>&nbsp;
                                                    Edit / delete table
                                                </button>
                                                :
                                                <button onClick={this.createTable}
                                                        style={{background:"none",
                                                            fontSize: "12px",
                                                            display: "block",
                                                            float: "left",
                                                            marginTop: "4px"}}>
                                                    <FontAwesomeIcon icon={faTable}/>&nbsp;
                                                    Create table
                                                </button>
                                        }

                                        <div style={{float: "left"}}>
                                            <button onClick={this.setting}
                                                    style={{background:"none",
                                                        fontSize: "12px",
                                                        display: "block",
                                                        float: "left",
                                                        marginTop: "4px"}}>
                                                <FontAwesomeIcon icon={faCog}/>&nbsp;
                                                Setting
                                            </button>
                                            {this.state.popSetting}
                                        </div>
                                    </React.Fragment>
                                    : ""
                            }

                            <button onClick={this.copyTab}
                                    style={{background:"none",
                                        fontSize: "12px",
                                        display: "block",
                                        float: "left",
                                        marginTop: "4px"}}>
                                <FontAwesomeIcon icon={faCopy}/>&nbsp;
                                Copy tab
                            </button>

                            {
                                (!this.state.isBorder)
                                    ?
                                    <button onClick={this.showBorder}
                                            style={{background:"none",
                                                fontSize: "12px",
                                                display: "block",
                                                float: "left",
                                                marginTop: "4px"}}>
                                        <FontAwesomeIcon icon={faBorderAll}/>&nbsp;
                                        Show Border
                                    </button>
                                    :
                                    <button onClick={this.hideBorder}
                                            style={{background:"none",
                                                fontSize: "12px",
                                                display: "block",
                                                float: "left",
                                                marginTop: "4px"}}>
                                        <FontAwesomeIcon icon={faBorderNone}/>&nbsp;
                                        Hide Border
                                    </button>
                            }
                            {
                                (this.state.btnAdditional && this.state.pic != this.state.createdBy)
                                    ?
                                    <React.Fragment>
                                        <button onClick={this.deleteTabPage2}
                                                style={{background:"none",
                                                    fontSize: "12px",
                                                    display: "block",
                                                    float: "left",
                                                    marginTop: "4px"}}>
                                            <FontAwesomeIcon icon={faTrash}/>&nbsp;
                                            Delete tab
                                        </button>
                                    </React.Fragment>
                                    :
                                    ""
                            }

                            {
                                ((this.state.tableReady))
                                    ?
                                    <button onClick={() => this.exportExcel(this.state.tabId, this.state.tabName)}
                                            style={{background:"none",
                                                fontSize: "12px",
                                                display: "block",
                                                float: "left",
                                                color: "green",
                                                marginTop: "4px"}}>
                                        <FontAwesomeIcon icon={faFileExcel}/>&nbsp;
                                        Export Excel
                                    </button>
                                    :
                                    ""
                            }


                        </div>
                    </div>
                    <div style={{overflow: "hidden"}}>

                        {
                            (!this.state.tableReady) ?
                                <div style={{fontSize: "14px", marginTop: "25px", textAlign: "center", marginBottom: "100px", width: "100%"}}>
                                    <FontAwesomeIcon style={{fontSize: "24px", color: "a07878"}} icon={faInfoCircle}/><br/>
                                    <span className="bold second-font-color">This tab not have table to display</span><br/>
                                    <span style={{fontSize: "12px"}}>Click create table to create new</span>
                                </div> : ""
                        }

                        <div className={(this.state.tableReady) ? "main-border-right main-border-left" : ""}
                              style={{maxWidth: "99%", textAlign: "centre", marginRight: "10px", float: "left", minWidth: (!this.state.tableReady) ? "80%" : "0px"}}>
                            <div ref={this.tableBase}  className="scrollbar-white-bck" style={{width: "100%", overflowX: "hidden"}}>
                                <table ref={this.tableHeader} id="header-table-render" className="main-border" style={{fontSize: "12px"}}>
                                    <thead ref={this.headerTable}/>
                                </table>

                                <div ref={this.tableBodyScroll}
                                     onScroll={this.scroll}
                                     id="base-data-tab-table"
                                     className="scrollbar tab-base-scroll"
                                     style={{maxHeight: "350px", overflowX: "scroll", maxWidth: "100%", minHeight: "100px"}}>
                                    <div ref={this.tableBody} style={{overflowX: "hidden", minWidth: "150px"}}>
                                        <table ref={this.tableTBody}>
                                            <tbody ref={this.tbody}>
                                            {
                                                (this.state.isLoadData)
                                                    ?
                                                    <tr>
                                                        <td colSpan="2" style={{textAlign: "left"}}>
                                                            <div className="second-font-color bold"
                                                                 style={{fontSize: "12px", height: "100px"}}>
                                                                Load data...</div>
                                                        </td>
                                                    </tr>
                                                    : ""
                                            }
                                            {
                                                (!this.state.isLoadData && row.length == 0 && this.state.tableReady)
                                                    ?
                                                    <tr>
                                                        <td colSpan="2" style={{textAlign: "left"}}>
                                                            <div style={{fontSize: "12px", height: "100px"}}>
                                                                No data to display</div>
                                                        </td>
                                                    </tr>
                                                    :
                                                    row
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display: "none"}} ref={this.pageNotFound}>
                    <PageNotFound/>
                </div>
            </React.Fragment>
        )
    }
}

export default tab