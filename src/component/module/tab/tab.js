import React from 'react'
import ReactDom from 'react-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTable, faPlus, faBorderAll, faBorderNone, faTrash, faArrowsAltH, faCog, faGlobe, faLock, faUser} from '@fortawesome/free-solid-svg-icons'
import CreateTable from './create_table'
import {baseUrl} from "../../../const/const";
import Form from './form_tab'
import FormAdd from './form_add'
import Row from './row_tab'
import PopConfirmation from '../../../component/popup_confirmation'
import EditDelTable from './edit_delete_table'
import TabSetting from './tab_setting'
import {getCookieSessionId, getCookieUserId, tableHeaderRender} from "../../../function/function";

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
            privacyIcon: icon
        })
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
                privacyIcon: icon
            })
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
                tableHeaderRender(jo, "header-table-render", this.thClick)
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
            row: []
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
                    form: <Form data={data[i]}
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
        console.log(json)
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
        console.log(thead)
        let curThWidth = thead.offsetWidth
        let elmSpan = this.spanToWidth.current
        elmSpan.innerText = ""
        let w = 0
        let curWidthHeader = this.tableHeader.current.offsetWidth
        let newHeaderWidth = curWidthHeader
        let ltext = 0

        let thw = thead.style.width
        if(thw.replace("px", "") > 140){
            thead.style.width = "140px"
            newHeaderWidth = parseInt(150) + (curWidthHeader - 500)
        }else{
            this.state.row.map(dt => {
                if(dt[seqCol].length > ltext){
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
                            tabId={this.state.tabId}
                            privacy={this.state.privacy}
                            editTab={this.editTab}
                            tabName={this.props.tabName}
                            cancel={this.cancel}/>
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
                            col={dt}/>
            }
        })

        return(
            <React.Fragment>
                {this.state.popup}
                {this.state.form}
                <span style={{fontSize: "12px", position: "absolute", opacity: "0", zIndex: "-1"}} ref={this.spanToWidth}/>
                <div className="main-border-bottom" style={{paddingBottom: "10px", paddingTop: "10px", width: "80%"}}>
                    <div className="second-font-color"
                         style={{fontSize: "13px", marginRight: "5px", float: "left", marginTop: "2px"}}>
                        {this.state.privacyIcon}
                    </div>
                    <span className="bold">
                        {this.state.tabName}
                    </span>
                    <div style={{float: "right"}}>
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
                    </div>
                </div>
                {this.state.tableReady}
                <div style={{width: "90%", textAlign: "centre"}}>
                    {
                        (!this.state.tableReady) ?
                            <div style={{fontSize: "12px", marginTop: "25px"}}>
                                <span className="bold second-font-color">This page not have table to display</span><br/>
                                click <a onClick={this.createTable} style={{color: "blue"}}>create table</a> to creat a table
                            </div> : ""
                    }
                    <div ref={this.tableBase}  className="scrollbar-white-bck" style={{width: "100%", overflowX: "hidden"}}>
                        <table ref={this.tableHeader} id="header-table-render" className="main-border" style={{fontSize: "12px"}}>
                            <thead ref={this.headerTable}/>
                        </table>
                        <div ref={this.tableBodyScroll} onScroll={this.scroll} className="scrollbar tab-base-scroll" style={{maxHeight: "350px", overflowX: "scroll", maxWidth: "100%"}}>
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
            </React.Fragment>
        )
    }
}

export default tab