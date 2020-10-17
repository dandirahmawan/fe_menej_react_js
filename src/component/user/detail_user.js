import React from 'react'
import {popCenterPosition, getCookieUserId, getCookieSessionId, convertDate_dd_MMM_yyy} from '../../function/function'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendarAlt, faTrashAlt, faUserAlt, faPlus, faInfoCircle, faTimes, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import {setDataModule, setDataBugs, setDataDocFile} from '../../redux/action'
import { baseUrl } from '../../const/const'
import {ApiFetch} from '../apiFetch'
import RowModule from './row_module_detail_popup'
import Detail from '../module/detail_module/detail'
import RowBugs from './row_bugs_user_detail_pop'
import RowDocFile from './row_doc_file_user_detail_pop'
import PopupConfirmation from '../popup_confirmation'
import { Spinner } from '../spinner'
import Row from "./row_module_detail";

class detail_user extends React.Component{
    
    constructor(){
        super()
        this.refBase = React.createRef()
        this.block = React.createRef()
        this.loaderBase = React.createRef()
        this.baseDataDetail = React.createRef()
        this.state = {
            popup: ""
        }

        this.rowModuleClick = this.rowModuleClick.bind(this)
        this.closeModuleDetail = this.closeModuleDetail.bind(this)
        this.delete = this.delete.bind(this)
        this.commitDelete = this.commitDelete.bind(this)
        this.fetchAction = this.fetchAction.bind(this)
    }

    componentDidMount(){
        this.fetchAction(this.props.userId)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.userId != this.props.userId){
            this.fetchAction(nextProps.userId)
        }
    }

    fetchAction(userId){
        var wh = window.innerHeight
        var ch = this.refBase.current
        ch.style.minHeight = wh - 100+"px"
        popCenterPosition("base-pop-usr-dtl")

        var form = new FormData()
        form.append("userId", userId)
        form.append("user", getCookieUserId())
        form.append("sessionId", getCookieSessionId())

        ApiFetch("/user_detail", {
            method: "POST",
            body: form
        }).then(res => res.json())
        .then(result => {
            var bugs = result[0].bugs
            var modul = result[0].modul
            var docFile = result[0].documentFile

            this.props.setDataModule(modul)
            this.props.setDataDocFile(docFile)
            this.props.setDataBugs(bugs)
            this.loaderBase.current.remove()
            this.baseDataDetail.current.style.display = "block"
        })
    }

    btnNavUser(e, type){
        var elm = document.getElementsByClassName("btn-nav-usr-dtl")
        for(var i = 0;i<elm.length;i++){
            var curAtt = elm[i].getAttribute("class")
            curAtt = curAtt.replace("btn-primary", "btn-secondary")
            elm[i].setAttribute("class", curAtt)
        }

        var elm = document.getElementsByClassName("base-nav-usr-dtl-pop")
        for(var i = 0;i<elm.length;i++){
            elm[i].style.display = "none"
        }

        if(type == "bugs"){
            var el = document.getElementById("base-data-bugs-user-dtl-pop")
            el.style.display = "block"
        }else if(type == "doc file"){
            var el = document.getElementById("base-data-doc-file-user-dtl-pop")
            el.style.display = "block"
        }else{
            var el = document.getElementById("base-data-module-user-dtl-pop")
            el.style.display = "block"
        }

        var cur = e.target.getAttribute("class")
        var setCur = cur.replace("btn-secondary", "btn-primary")
        e.target.setAttribute("class", setCur)
    }

    rowModuleClick(moduleId){
        this.props.dataModule.map(dt => {
            if(dt.modulId == moduleId){
                this.setState({
                    popup: <Detail 
                                close={this.closeModuleDetail} 
                                modulId={dt.modulId}
                                projectId={dt.projectId}
                            />
                })
            }
        })
    }

    closeModuleDetail(){
        this.setState({
            popup: ""
        })
    }

    delete(userName){
        let textPopup = "Are you sure, you want remove <span class='bold'>"+userName+"</span> ?"
        this.setState({
            popup: <PopupConfirmation 
                        titleConfirmation="Remove user"
                        textPopup={textPopup}
                        hidePopUp={this.closeModuleDetail}
                        yesAction={this.commitDelete}/>
        })
    }

    commitDelete(){
        var form = new FormData()
        form.append("userId", this.props.userId)
        form.append("sessionId", getCookieSessionId())
        form.append("userIdLogin", getCookieUserId())

        ApiFetch("/delete_user", {
            method: "POST",
            body: form
        })
        this.props.deleteUser(this.props.userId)
    }

    invite(emailUser){
        let form = new FormData()
        form.append("email", emailUser)
        form.append("userId", getCookieUserId())

        ApiFetch("/invitation", {
            method: "POST",
            body: form
        })
    }

    render(){

        const dataModule = this.props.dataModule.map(dt => {
            return <RowModule 
                        moduleName={dt.modulName} 
                        projectName={dt.projectName} 
                        moduleId={dt.modulId}
                        rowClick={this.rowModuleClick}
                        countDoc={dt.countDoc}
                        countBugs={dt.countBugs}
                        countBugsClose={dt.countBugsClose}
                    />
        })

        const dataBugs = this.props.dataBugs.map(dt => {
            return <RowBugs note={dt.note} moduleName={dt.modulName} status={dt.bugStatus}/>
        })

        const dataDocFile = this.props.dataDocFile.map(dt => {
            return <RowDocFile fileName={dt.fileName} path={dt.path} description={dt.descriptionFile}/>
        })

        return(
            <React.Fragment>
                {this.state.popup}
                {/* <div className="block" ref={this.block} onClick={this.props.hide}/> */}
                <div ref={this.refBase} id="base-pop-usr-dtl" 
                    className="main-border" 
                    style={{width: "500px", borderRadius: "5px", background: "#FFF", minHeight: "400px", margin: "auto", marginTop: "100px", borderRadius: "4px", overflow: "hidden", marginBottom: "-10px"}}>
                    <div className="bold main-border-bottom second-font-color"  
                        style={{padding: "10px", background: "#FFF", fontSize: "12px"}}>
                        <FontAwesomeIcon icon={faUserAlt}/>&nbsp;&nbsp;Detail user
                    </div>
                    <div style={{padding: "10px", overflow: "hidden", marginTop: "20px"}}>
                        <div style={{width: "100px", height:"100px", margin: "auto", borderRadius: "100%", textAlign: "center", background: "#CCC", overflow: "hidden"}}>
                            {
                                (this.props.picProfileDetail != "" && this.props.picProfileDetail != null)
                                ?
                                    <div style={{background: "url("+baseUrl+"/pic_profile/"+this.props.picProfileDetail+") center center / cover no-repeat", height: "100px", width: "100px"}}/>
                                :
                                    <FontAwesomeIcon className="second-font-color" style={{fontSize: "80px", marginTop: "21px"}} icon={faUserAlt}/>
                            }
                        </div>
                        <div style={{marginTop: "5px", textAlign: "center"}}>
                            <span className="bold" style={{fontSize: "25px"}}>{this.props.userName}</span>
                            <div className="second-font-color" style={{fontSize: "12px"}}>{this.props.emailUser}</div>
                            
                            {
                                (this.props.isRelated == "Y")
                                ?   
                                    <React.Fragment>
                                        <span className="bold second-font-color" style={{fontSize: "11px"}}>
                                            <FontAwesomeIcon icon={faCalendarAlt}/>
                                            &nbsp;{convertDate_dd_MMM_yyy(this.props.relateDate)}
                                        </span><br/>
                                        <button onClick={() => this.delete(this.props.userName)} className="btn-primary bold" style={{fontSize: "11px", marginTop: "10px"}}>
                                            <FontAwesomeIcon icon={faTrashAlt}/>&nbsp;Remove
                                        </button>
                                    </React.Fragment>
                                :
                                    <React.Fragment>
                                        {/* <span className="bold main-font-color" style={{fontSize: "11px"}}>
                                            <FontAwesomeIcon icon={faInfoCircle}/>
                                            &nbsp;Related by project
                                        </span><br/> */}
                                        {
                                            (this.props.isInvited == "Y")
                                            ?
                                                <button onClick={() => this.invite(this.props.emailUser)} className="btn-secondary bold" style={{fontSize: "11px", marginTop: "10px", color: "#999999"}}>
                                                    <FontAwesomeIcon icon={faTimesCircle}/>&nbsp;Cancel request
                                                </button>
                                            :
                                                <button onClick={() => this.invite(this.props.emailUser)} className="btn-primary bold" style={{fontSize: "11px", marginTop: "10px", background: "green", width: "100px"}}>
                                                    <FontAwesomeIcon icon={faPlus}/>&nbsp;invite
                                                </button>
                                        }
                                        
                                    </React.Fragment>
                            }
                            
                        </div>
                    </div>

                    {/*main navition user detail*/}
                    <div id="menu-usr-dtl" style={{padding: "10px", overflow: "hidden", marginTop: "20px", marginRight: "-1px", marginLeft: "-1px", borderBottom: "10px solid rgb(230, 230, 230)", textAlign: "center"}}>
                        <a onClick={(e) => this.btnNavUser(e, "module")} className="bold btn-nav-usr-dtl" style={{fontSize: "12px", padding: "10px"}}>
                            <i className="fa fa-clipboard"/>&nbsp;Module
                        </a>
                        
                        <a onClick={(e) => this.btnNavUser(e, "bugs")} className="bold second-font-color btn-nav-usr-dtl" style={{fontSize: "12px", padding: "10px"}}>
                            <i className="fa fa-exclamation-triangle"/>&nbsp;Bugs
                        </a>
                        
                        <a onClick={(e) => this.btnNavUser(e, "doc file")} className="bold second-font-color btn-nav-usr-dtl" style={{fontSize: "12px", padding: "10px"}}>
                            <i className="fa fa-file"/>&nbsp;Doc & File
                        </a>
                    </div>
                    
                    <div ref={this.loaderBase}><Spinner size="25px" textLoader="load data.."/></div>
                    <div ref={this.baseDataDetail} style={{display: "none"}}>
                        <div id="base-data-module-user-dtl-pop" className="base-nav-usr-dtl-pop" style={{padding: "10px"}}>
                            <div className="bold second-font-color" style={{fontSize: "12px", padding: "5px", marginBottom: "5px"}}>
                                <i className="fa fa-clipboard"/>&nbsp;&nbsp;List module
                            </div>
                            <table style={{width: "100%"}}> 
                                <tbody>
                                    {
                                        (dataModule != "")
                                        ?
                                            dataModule
                                        :
                                            <div className="bold second-font-color" style={{textAlign: "center", marginTop: "20px", fontSize: "14px"}}>
                                                <i className="fa fa-exclamation-triangle second-font-color" style={{fontSize: "20px"}}></i>
                                                <br/>
                                                <span style={{fontSize: "12px"}}>No data to display</span>
                                            </div> 
                                    }
                                </tbody>
                            </table>
                        </div>
                        
                        <div id="base-data-bugs-user-dtl-pop" className="base-nav-usr-dtl-pop" style={{padding: "10px", display: "none"}}>
                            <div className="bold second-font-color" style={{fontSize: "12px", padding: "5px", marginBottom: "5px"}}>
                                <i className="fa fa-exclamation-triangle second-font-color"/>&nbsp;&nbsp;List bugs
                            </div>
                            <table style={{width: "100%"}}> 
                                <tbody>
                                    {
                                        (dataBugs != "")
                                        ?
                                            dataBugs
                                        :
                                            <div className="bold second-font-color" style={{textAlign: "center", marginTop: "20px", fontSize: "14px"}}>
                                                <i className="fa fa-exclamation-triangle second-font-color" style={{fontSize: "20px"}}></i>
                                                <br/>
                                                <span style={{fontSize: "12px"}}>No data to display</span>
                                            </div>  
                                    }
                                </tbody>
                            </table>
                        </div>
                        
                        <div id="base-data-doc-file-user-dtl-pop" className="base-nav-usr-dtl-pop" style={{padding: "10px", display: "none"}}>
                            <div className="bold second-font-color" style={{fontSize: "12px", padding: "5px", marginBottom: "5px"}}>
                                <i className="fa fa-file second-font-color"/>&nbsp;&nbsp;List document & file
                            </div>
                            <table style={{width: "100%"}}> 
                                <tbody>
                                    {
                                        (dataDocFile != "")
                                        ?
                                            dataDocFile
                                        :
                                            <div className="bold second-font-color" style={{textAlign: "center", marginTop: "20px", fontSize: "14px"}}>
                                                <i className="fa fa-exclamation-triangle second-font-color" style={{fontSize: "20px"}}></i>
                                                <br/>
                                                <span style={{fontSize: "12px"}}>No data to display</span>
                                            </div>    
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        dataModule: state.dataModule,
        dataBugs: state.dataBugs,
        dataDocFile: state.dataDocFile
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setDataModule: (dataJosnArray) => dispatch(setDataModule(dataJosnArray)),
        setDataBugs: (dataJosnArray) => dispatch(setDataBugs(dataJosnArray)),
        setDataDocFile: (dataJosnArray) => dispatch(setDataDocFile(dataJosnArray))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (detail_user)