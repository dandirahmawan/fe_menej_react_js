import React from 'react'
import ReactDom from 'react-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTable, faPlus, faBorderAll, faBorderNone, faTrash, faArrowsAltH, faCog, faGlobe, faLock, faUser, faCopy, faUserAlt, faFileExcel, faOm} from '@fortawesome/free-solid-svg-icons'
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
            rowCellEdit: 0
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
    }

    componentDidMount(){
        this.fetchAction(this.props.tabId)

        let icon = this.privacyIconRender(this.props.privacy)
        this.setState({
            isStarting: true,
            tabName: this.props.tabName,
            tabId: this.props.tabId,
            privacy: this.props.privacy,
            popSetting: null,
            createdBy: this.props.createdBy,
            privacyIcon: icon,
            userName: this.props.userName,
            pic: this.props.pic,
            dataTeam: this.props.dataTeam
        })
        this.isButtonAdditional(this.props.dataTeam, this.props.createdBy)
    }

    componentWillReceiveProps(nextProps){
        if(this.props.tabId !== nextProps.tabId){
            this.tableHeader.current.style.width = "auto"
            this.tableTBody.current.style.width = "auto"
            this.fetchAction(nextProps.tabId)

            let icon = this.privacyIconRender(nextProps.privacy)

            this.setState({
                row: [],
                isStartingRow: true,
                tabName: nextProps.tabName,
                tabId: nextProps.tabId,
                privacy: nextProps.privacy,
                popSetting: null,
                createdBy: nextProps.createdBy,
                privacyIcon: icon,
                userName: nextProps.userName,
                pic: nextProps.pic,
                dataTeam: nextProps.dataTeam,
                btnAdditional: true
            })
            this.isButtonAdditional(nextProps.dataTeam, nextProps.createdBy)
        }
    }

    fetchAction(tabId){
        this.tableBody.current.style.width = "100%"
        let tabIdpar = tabId
        let elm = document.getElementById("header-table-render")
        elm.innerHTML = ""
        let form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("tabId", tabId)
        fetch(baseUrl+"/tab_page", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result != "no data"){
                let jo = JSON.parse(result)
                this.setState({
                    tableReady: true,
                    col: jo,
                    form: "",
                    row: []
                })
                this.tableBase.current.style.display = "block"
                let elm = document.createElement("btn")
                ReactDom.render(<FontAwesomeIcon icon={faArrowsAltH}/>, elm)
                tableHeaderRender(jo, "header-table-render", this.thClick, this.thClickFilter, this.state.filterHeaderColumn)
                let headerWidth = this.headerTable.current.offsetWidth
                this.tableBody.current.style.width = headerWidth+"px"
                this.fetchActionRow(tabIdpar)
            }else{
                this.tableBase.current.style.display = "none"
                this.setState({
                    tableReady: false,
                    row: []
                })
            }
        })
    }

    fetchActionRow(tabId){
        this.setState({
            isLoadData: true
        })
        let form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("tabId", tabId)
        fetch(baseUrl+"/row_tab", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            let jo = JSON.parse(result)
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
            this.state.row.map(dt => {
                let elmtable = this.tbody.current.children
                let isDislpay =  elmtable[i].style.display
                i++
                if(dt[seqCol].length > ltext && isDislpay != "none"){
                    ltext = dt[seqCol].length
                    if(dt[seqCol].length > 0) elmSpan.innerText = dt[seqCol]
                    w = (elmSpan.offsetWidth > 500) ? 500 : parseInt(elmSpan.offsetWidth) + 10
                    w = (w > 140) ? w : 140
                    thead.style.width = w+"px"
                    newHeaderWidth = curWidthHeader + (w - curThWidth)
                }
            })
        }

        this.tableHeader.current.style.width = newHeaderWidth+"px"
        this.setState({
            isStartingRow: true
        })
    }

    thClickFilter(e, seqCol){
        var x = e.clientX;     // Get the horizontal coordinate
        var y = e.clientY;     // Get the vertical coordinate
        let r = window.innerWidth - x

        let left = x
        if(r <= 210){
            left = window.innerWidth - 210
        }

        this.setState({
            popup: <Filter top={y}
                           column={seqCol}
                           data={this.state.row}
                           left={left}
                           right={r}
                           filter={this.filterSubmit}
                           cancel={this.cancel}/>
        })
    }

    filterSubmit(data, column){
        let elmChild = this.tbody.current.children
        if(data.length > 0){
            for(let i = 0;i<elmChild.length;i++){
                let child = elmChild[i].children
                let col = parseInt(column) + 1
                let idx = data.indexOf(child[col].innerText)
                if(idx == "-1"){
                    elmChild[i].style.display = "none"
                }else{
                    elmChild[i].style.display = "block"
                }
            }
        }else{
            for(let i = 0;i<elmChild.length;i++){
                elmChild[i].style.display = "block"
            }
        }
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
        fetch(baseUrl+"/delete_tab_data", {
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
                            tabName={this.props.tabName}
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
        fetch(baseUrl+"/copy_tab", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == 0){

                let form = new FormData()
                form.append("userId", getCookieUserId())
                form.append("sessionId", getCookieSessionId())
                form.append("projectId", this.props.projectId)
                fetch(baseUrl+"/tab_list", {
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
        fetch(baseUrl+"/delete_tab", {
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
        window.open(baseUrl+"/export_excel_tab/"+tabId+"/"+tabName)
    }

    cellContextMenu(e, row, column){
        e.preventDefault()
        // let elm = document.getElementById("base-data-tab-table")
        // let bound = elm.getBoundingClientRect()
        var x = e.clientX    // Get the horizontal coordinate
        var y = e.clientY    // Get the vertical coordinate
        this.setState({
            isCellEdit: false,
            form: null,
            popup: <CellEdit x={x}
                        y={y}
                        row={row}
                        column={column}
                        cancel={this.cancel}
                        submitCellContextMenu={this.submitCellContextMenu} 
                        value={e.target.innerText}/>
        })
    }

    submitCellContextMenu(row, column, value){
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
        fetch(baseUrl+"/edit_tab_data", {
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
                            isCellEdit={this.state.isCellEdit}/>
            }
        })

        return(
            <React.Fragment>
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
                            <FontAwesomeIcon icon={faUserAlt}/> {this.props.userName}
                        </div>
                    </div>
                    <div style={{float: "right", padding: "5px"}}>
                        {
                            (this.state.createdBy == getCookieUserId())
                            ?
                                <React.Fragment>
                                    <button onClick={this.formAdd}
                                            style={{background:"none",
                                                fontSize: "12px",
                                                display: "block",
                                                float: "left",
                                                marginTop: "4px"}}>
                                        <FontAwesomeIcon icon={faPlus}/>&nbsp;
                                        Add data
                                    </button>
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
                    <div  className={(this.state.tableReady) ? "main-border-right main-border-left" : ""}
                         style={{maxWidth: "99%", textAlign: "centre", marginRight: "10px", float: "left", minWidth: (!this.state.tableReady) ? "80%" : "0px"}}>
                        {
                            (!this.state.tableReady) ?
                                <div style={{fontSize: "12px", marginTop: "25px", textAlign: "center"}}>
                                    <span className="bold second-font-color">This tab not have table to display</span>
                                </div> : ""
                        }
                        <div ref={this.tableBase}  className="scrollbar-white-bck" style={{width: "100%", overflowX: "hidden"}}>
                            <table ref={this.tableHeader} id="header-table-render" className="main-border" style={{fontSize: "12px"}}>
                                <thead ref={this.headerTable}/>
                            </table>
                            <div ref={this.tableBodyScroll}
                                 onScroll={this.scroll}
                                 id="base-data-tab-table"
                                 className="scrollbar tab-base-scroll"
                                 style={{maxHeight: "350px", overflowX: "scroll", maxWidth: "100%", minHeight: "100px", position: "relative"}}>
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
            </React.Fragment>
        )
    }
}

export default tab