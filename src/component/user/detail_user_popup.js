import React from 'react'
import {popCenterPosition, getCookieUserId, getCookieSessionId, convertDate_dd_MMM_yyy} from '../../function/function'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendar, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import {setDataModule, setDataBugs, setDataDocFile} from '../../redux/action'
import { baseUrl } from '../../const/const'
import {ApiFetch} from '../apiFetch'
import RowModule from './row_module_detail_popup'
import Detail from '../module/detail'
import RowBugs from './row_bugs_user_detail_pop'
import RowDocFile from './row_doc_file_user_detail_pop'
import PopupConfirmation from '../popup_confirmation'
import { Spinner } from '../spinner'
import Row from "./row_module_detail";

class detail_user_popup extends React.Component{
    
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
    }

    componentDidMount(){
        var wh = window.innerHeight
        var ch = this.refBase.current
        ch.style.height = wh - 100+"px"
        popCenterPosition("base-pop-usr-dtl")

        var form = new FormData()
        form.append("userId", this.props.userId)
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
                this.block.current.style.display = "none"
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
        this.block.current.style.display = "block"
        this.setState({
            popup: ""
        })
    }

    delete(){
        this.block.current.style.display = "none"
        this.setState({
            popup: <PopupConfirmation 
                        titleConfirmation="Delete user"
                        textPopup="Are you sure, you want delete user ?"
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
            return <RowBugs note={dt.note} moduleName={dt.modulName}/>
        })

        const dataDocFile = this.props.dataDocFile.map(dt => {
            return <RowDocFile fileName={dt.fileName} path={dt.path} description={dt.descriptionFile}/>
        })

        return(
            <React.Fragment>
                {this.state.popup}
                <div className="block" ref={this.block} onClick={this.props.hide}/>
                <div ref={this.refBase} id="base-pop-usr-dtl" className="pop" style={{width: "450px", background: "#FFF", height: "400px", overflowY: "scroll"}}>
                    <div className="bold main-border-bottom"  style={{padding: "10px", position: "fixed", width: "430px", background: "#FFF"}}>
                        Detail user
                    </div>
                    <div style={{padding: "10px", marginTop: "40px", overflow: "hidden"}}>
                        <div style={{width: "70px", height:"70px", borderRadius: "350px", background: "#CCC", float: "left", overflow: "hidden"}}>
                            {
                                (this.props.picProfileDetail !== "")
                                ?
                                    <div style={{background: "url("+baseUrl+"/pic_profile/"+this.props.picProfileDetail+") center center / cover no-repeat", height: "70px", width: "70px"}}/>
                                :
                                    ""
                            }
                        </div>
                        <div style={{marginLeft: "10px", float: "left", marginTop: "5px"}}>
                            <span className="bold">{this.props.userName}</span><br/>
                            <span style={{fontSize: "12px"}}>{this.props.emailUser}</span><br/>
                            <span className="bold second-font-color" style={{fontSize: "11px"}}><FontAwesomeIcon icon={faCalendar}/>
                                &nbsp;{convertDate_dd_MMM_yyy(this.props.relateDate)}
                            </span>
                        </div>
                        <button onClick={this.delete} className="btn-secondary" style={{float: "right", fontSize: "15px", color: "#9a9a9a"}}>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </button>
                    </div>
                    <div className="main-border-bottom" style={{padding: "10px", overflow: "hidden"}}>
                        <button onClick={(e) => this.btnNavUser(e, "module")} className="btn-primary btn-nav-usr-dtl" style={{fontSize: "11px", marginRight: "10px"}}>Module</button>
                        <button onClick={(e) => this.btnNavUser(e, "bugs")} className="btn-secondary btn-nav-usr-dtl" style={{fontSize: "11px", marginRight: "10px"}}>Bugs</button>
                        <button onClick={(e) => this.btnNavUser(e, "doc file")} className="btn-secondary btn-nav-usr-dtl" style={{fontSize: "11px", marginRight: "10px"}}>Doc & File</button>
                        {/*<button onClick={this.btnNavUser} className="btn-secondary btn-nav-usr-dtl" style={{fontSize: "11px", marginRight: "10px"}}>Permition</button>*/}
                    </div>
                    
                    <div ref={this.loaderBase}><Spinner size="25px" textLoader="load data.."/></div>
                    <div ref={this.baseDataDetail} style={{display: "none"}}>
                        <div id="base-data-module-user-dtl-pop" className="base-nav-usr-dtl-pop" style={{padding: "10px"}}>
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

export default connect(mapStateToProps, mapDispatchToProps) (detail_user_popup)