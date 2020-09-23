import React from 'react'
import ModuleDetail from './module_detail'
import BugsDetail from './bugs_detail'
import DocumentFileDetail from './document_file_detail'
import {ApiFetch} from '../apiFetch'
import {getCookieSessionId, getCookieUserId} from '../../function/function'
import Detail from '../module/detail'
import {setDataModule} from '../../redux/action'
import { connect } from 'react-redux'
import PreviewImage from '../preview_image'

class detail_user extends React.Component{

    constructor(){
        super()
        this.state = {
            dataBugs:[],
            dataDocFile:[],
            popup:"",
            popImage:""
        }
        this.rowModuleClick = this.rowModuleClick.bind(this)
        this.hidePopUp = this.hidePopUp.bind(this)
        this.rowClickDocFile = this.rowClickDocFile.bind(this)
        this.hideImage = this.hideImage.bind(this)
    }

    componentDidMount(){
        var h1 = document.getElementById("header").offsetHeight
        var h2 = document.getElementById("header-detail-user-base").offsetHeight
        // var h = parseInt(h1) + h2
        var heightDetailBase = window.innerHeight - h1
        document.getElementById("detail-user-base").style.height = heightDetailBase+"px"
        document.getElementById("main-base-detail").style.height = heightDetailBase - h2+"px"
        // document.getElementById("main-base-detail").style.height = heightDetailBase - 59+"px"

        document.getElementById("base-module-detail").style.display = "block"
        document.getElementById("base-bugs-detail").style.display = "none"
        document.getElementById("base-doc-file-detail").style.display = "none"

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

            this.setState({
                dataBugs: bugs,
                dataDocFile: docFile
            })

            this.props.setDataModule(modul)
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.userId != this.props.userId){
            var form = new FormData()
            form.append("userId", nextProps.userId)
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
                
                this.setState({
                    dataBugs: bugs,
                    dataDocFile: docFile,
                })
                this.props.setDataModule(modul)
            })
        }
    }

    rowClickDocFile(e, fileName){
        var a = fileName.lastIndexOf(".")
        var ext = fileName.substr(parseInt(a) + 1, fileName.length)
        if(ext == 'jpeg' || ext == 'jpg' || ext == 'png'){
            e.preventDefault()
            this.setState({
                popImage : <PreviewImage image={fileName} hideImage={this.hideImage}/>
            })
        }
    }

    hideImage(){
        this.setState({
            popImage: ""
        })
    }

    rowModuleClick(moduleId){
        this.props.dataModule.map(dt => {
            if(dt.modulId == moduleId){
                this.setState({
                    popup: <Detail 
                                close={this.hidePopUp} 
                                modulId={dt.modulId}
                                projectId={dt.projectId}
                            />
                })
            }
        })
    }

    hidePopUp(){
        this.setState({
            popup: ""
        })
    }

    menuDetail(e, menu){
        var c = e.target.getAttribute("class")
        var t = e.target
        if(c != "bold mn-dtl"){
            t = t.parentElement
        }

        var cl = document.getElementsByClassName("mn-dtl")
        for(var i = 0;i<cl.length;i++){
            cl[i].style.borderBottom = "none"
        }

        t.style.borderBottom = "2px solid #386384"

        if(menu == "module"){
            document.getElementById("base-module-detail").style.display = "block"
            document.getElementById("base-bugs-detail").style.display = "none"
            document.getElementById("base-doc-file-detail").style.display = "none"
            document.getElementById("base-permition-detail").style.display = "none"
        }else if(menu == "bugs"){
            document.getElementById("base-module-detail").style.display = "none"
            document.getElementById("base-bugs-detail").style.display = "block"
            document.getElementById("base-doc-file-detail").style.display = "none"
            document.getElementById("base-permition-detail").style.display = "none"
        }else if(menu == "permition"){
            document.getElementById("base-module-detail").style.display = "none"
            document.getElementById("base-bugs-detail").style.display = "none"
            document.getElementById("base-doc-file-detail").style.display = "none"
            document.getElementById("base-permition-detail").style.display = "block"
        }else{
            document.getElementById("base-module-detail").style.display = "none"
            document.getElementById("base-bugs-detail").style.display = "none"
            document.getElementById("base-doc-file-detail").style.display = "block"
            document.getElementById("base-permition-detail").style.display = "none"
        }  
    }

    render(){
        return(
            <React.Fragment>

                {this.state.popup}
                {this.state.popImage}

                <div id="detail-user-base" className="main-border-left" style={{width: "35%", position: "fixed", right: "0px", height: "100%", background:"#FFF", /*marginTop: "59px"*/}}>
                    <div id="header-detail-user-base" className="main-border-bottom" style={{padding: "10px"}}>
                        <span className="bold second-font-color" style={{fontSize: "14px"}}>
                            <a onClick={this.props.hideDetail} className="second-font-color" style={{marginRight: "10px"}}><i class="fa fa-times"></i></a> Detail user
                        </span>
                    </div>
                    <div id="main-base-detail" style={{overflowY: "scroll"}}>
                        <div style={{width: "80px", height: "80px", borderRadius: "40px", background: "#CCC", margin: "auto", marginTop: "20px"}}></div>
                        <div style={{textAlign: "center", padding: "10px"}}>
                            <span className="bold">{this.props.userName}</span><br/>
                            <span style={{fontSize: "12px"}}>{this.props.emailUser}</span><br/>
                            <span className="bold second-font-color" style={{fontSize: "12px"}}>
                                <i class="fa fa-calendar">&nbsp;</i>12 january 2019
                            </span>
                        </div>
                        <div style={{paddingLeft: "10px", paddingRight: "10px"}}>
                            <div className="main-border-bottom" style={{marginTop: "20px", overflow: "hidden"}}>
                                <a onClick={(e) => this.menuDetail(e, "module")}>
                                    <div className="bold mn-dtl" style={{width: "25%", float: "left", textAlign: "center", fontSize: "12px", paddingTop: "10px", paddingBottom: "10px", borderBottom: "2px solid #386384"}}>
                                        <em class="fa fa-clipboard">&nbsp;</em>Module
                                    </div>
                                </a>
                                <a onClick={(e) => this.menuDetail(e, "bugs")}>
                                    <div className="bold mn-dtl" style={{width: "25%", float: "left", textAlign: "center", fontSize: "12px", paddingTop: "10px", paddingBottom: "10px"}}>
                                        <i class="fa fa-exclamation-triangle">&nbsp;</i>Bugs
                                    </div>
                                </a>
                                <a onClick={(e) => this.menuDetail(e, "doc_file")}>
                                    <div className="bold mn-dtl" style={{width: "25%", float: "left", textAlign: "center", fontSize: "12px", paddingTop: "10px", paddingBottom: "10px"}}>
                                        <i class="fa fa-file">&nbsp;</i>Document file
                                    </div>  
                                </a>
                                <a onClick={(e) => this.menuDetail(e, "permition")}>
                                    <div className="bold mn-dtl" style={{width: "25%", float: "left", textAlign: "center", fontSize: "12px", paddingTop: "10px", paddingBottom: "10px"}}>
                                        <i class="fa fa-key">&nbsp;</i>Permition
                                    </div>  
                                </a>
                            </div>
                            <div id="base-module-detail">
                                <ModuleDetail
                                    rowModuleClick={this.rowModuleClick}
                                    data={this.props.dataModule}
                                />
                            </div>
                            <div id="base-bugs-detail">
                                <BugsDetail
                                    data={this.state.dataBugs}
                                />
                            </div>
                            <div id="base-doc-file-detail">
                                <DocumentFileDetail
                                    data={this.state.dataDocFile}
                                    rowClickDocFile={this.rowClickDocFile}
                                />
                            </div>
                            <div id="base-permition-detail">
                                halaman permition
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        dataModule: state.dataModule
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setDataModule: (data) => dispatch(setDataModule(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (detail_user)