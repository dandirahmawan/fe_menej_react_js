import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFilter, faPlus, faBorderAll, faBorderNone} from '@fortawesome/free-solid-svg-icons'
import Row from './row_document_file'
import { getCookieUserId, getCookieSessionId } from '../../function/function'
import { baseUrl } from '../../const/const'
import {setDataDocFile, updateDataModuleDocFile, deleteDataDocFile} from '../../redux/action'
import { connect } from 'react-redux'
import PopUpConfirmation from '../../component/popup_confirmation'
import Filter from './filter'
import Upload from './upload_document_file'
import PreviewImage from '../preview_image'
import PreviewVideo from '../preview_video'
import {Spinner} from '../spinner'
import DetailModule from '../module/detail_module/detail'
import {ApiFetch} from '../apiFetch'

class document_file extends React.Component{

    constructor(){
        super()
        this.deleteDocFile = this.deleteDocFile.bind(this)
        this.hidePopUp = this.hidePopUp.bind(this)
        this.commitDelete = this.commitDelete.bind(this)
        this.filter = this.filter.bind(this)
        this.filterGo = this.filterGo.bind(this)
        this.unFilter = this.unFilter.bind(this)
        this.showBorder = this.showBorder.bind(this)
        this.hideBorder = this.hideBorder.bind(this)
        this.upload = this.upload.bind(this)
        this.rowClickDocFile = this.rowClickDocFile.bind(this)
        this.moduleClick = this.moduleClick.bind(this)

        this.state = {
            popup: "",
            moduleId: "",
            projectId: "",
            picProject:"",
            fileName: "",
            filter:"",
            isBorder: false,
            moduleNameFilter:[],
            isPermition: false,
            isLoad: true
        }
    }

    componentDidMount(){
        this.props.dataPermition.map(dt => {
            if(dt.permitionCode === 3 && dt.isChecked === 'Y'){
                this.state.isPermition = true
            }
            return null
        })

        this.setState({
            picProject: this.props.pic,
            isPermition: this.state.isPermition
        })

        var form = new FormData
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("projectId", this.props.projectId)

        var header = new Headers()
        header.append("sessionId", getCookieSessionId())
        header.append("userId", getCookieUserId());

        ApiFetch("/document_file_list", {
            method: "POST",
            body: form,
            headers: header
        }).then(res => res.json())
        .then(result => {
            this.props.setDataDocFile(result)
            this.setState({
                isLoad: false
            })
        })
    }

    showBorder(){
        var elmId = document.getElementById("th-doc-file")
        elmId.style.background = "#f5f5f5"
        elmId.style.borderTop = "none"

        var elmClass = document.getElementsByClassName("th-doc-file")
        for(var i = 0;i<elmClass.length;i++){
            elmClass[i].style.borderTop = "none"
        }

        this.setState({
            isBorder: true
        })
        
    }

    hideBorder(){
        var elmId = document.getElementById("th-doc-file")
        elmId.style.background = "#FFF"
        elmId.style.borderTop = "none"

        this.setState({
            isBorder: false
        })
    }

    deleteDocFile(fileName, moduleId, projectId){

        this.setState({
            moduleId: moduleId,
            projectId: projectId,
            fileName: fileName,
            popup: <PopUpConfirmation 
                        titleConfirmation="Delete Doc File"
                        textPopup="Are you sure, you want delete this document file ?"
                        hidePopUp={this.hidePopUp}
                        yesAction={this.commitDelete}
                    />
        })
    }

    commitDelete(){
        var mi = this.state.moduleId
        var pi = this.state.projectId
        var fileName = this.state.fileName
        var userId = getCookieUserId()

        var form = new FormData()
        form.append("moduleId", mi)
        form.append("projectId", pi)
        form.append("fileName", fileName)
        form.append("userId", userId)

        var header = new Headers()
        header.append("sessionId", getCookieSessionId())
        header.append("userId", getCookieUserId());

        ApiFetch("/delete_document_file", {
            method: "POST",
            body: form,
            headers: header
        }).then(res => res.text())
        .then(result => {
            if(result == 1){
                this.props.updateDataModuleDocFile(mi, "delete")
                this.props.deleteDataDocFile(mi, pi, fileName, userId)
            }
            this.hidePopUp()
        })
    }

    filter(){
        this.setState({
            filter: <Filter
                        filterGo={this.filterGo}
                        unFilter={this.unFilter}
                    />
        })
    }

    filterGo(arrModule){
        this.setState({
            moduleNameFilter: arrModule,
            filter: ""
        })
    }

    unFilter(){
        this.setState({
            filter: ""
        })
    }

    hidePopUp(){
        this.setState({
            popup: ""
        })
    }

    upload(){
        this.setState({
            popup: <Upload projectId={this.props.projectId} hide={this.hidePopUp}/>
        })
    }
    
    moduleClick(moduleId){
        this.setState({
            popup: <DetailModule modulId={moduleId} projectId={this.props.projectId} close={this.hidePopUp}/>
        })
    }

    rowClickDocFile(e, fileName, url){
        var a = fileName.lastIndexOf(".")
        var ext = fileName.substr(parseInt(a) + 1, fileName.length)
        if(ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'png'){
            e.preventDefault()
            this.setState({
                popup : <PreviewImage image={fileName} hideImage={this.hidePopUp} url={url}/>
            })
        }else if(ext.toLowerCase() == "mp4" || ext.toLowerCase() == "3gp" || ext.toLowerCase() == "mkv"){
            e.preventDefault()
            this.setState({
                popup : <PreviewVideo video={fileName} hideVideo={this.hidePopUp} url={url}/>
            })
        }else{
            window.open(baseUrl+"/file/"+url)
        }
    }

    render(){

        const data = this.props.dataDocFile.map(dt => {
            if(dt.isDelete != 'Y'){
                if(this.state.moduleNameFilter.length < 1){
                    return <Row
                        fileName={dt.fileName}
                        descriptionFile={dt.descriptionFile}
                        fileSize={dt.fileSize}
                        moduleName={dt.moduleName}
                        uploadDate={dt.uploadDate}
                        projectId={dt.projectId}
                        modulId={dt.modulId}
                        path={dt.path}
                        userName={dt.userName}
                        userId={dt.userId}
                        isBorder={this.state.isBorder}
                        deleteDocFile={this.deleteDocFile}
                        rowClickDocFile={this.rowClickDocFile}
                        moduleClick={this.moduleClick}
                    />
                }else{
                    var idx = this.state.moduleNameFilter.indexOf(dt.moduleName)
                    if(idx >= 0){
                        return <Row
                            fileName={dt.fileName}
                            descriptionFile={dt.descriptionFile}
                            fileSize={dt.fileSize}
                            moduleName={dt.moduleName}
                            uploadDate={dt.uploadDate}
                            projectId={dt.projectId}
                            modulId={dt.modulId}
                            path={dt.path}
                            userName={dt.userName}
                            userId={dt.userId}
                            isBorder={this.state.isBorder}
                            //action passing param
                            deleteDocFile={this.deleteDocFile}
                            rowClickDocFile={this.rowClickDocFile}
                            moduleClick={this.moduleClick}
                            // userClick={this.userClick}
                        />
                    }
                }   
            }
        })

        return(
            <React.Fragment>
                {this.state.popup}
                <div className="main-border-bottom" style={{paddingTop: "10px", paddingBottom: "10px", width: "80%"}}>
                    <span className="bold">List Document File</span>
                    {
                        (this.state.isBorder)
                        ?
                            <button onClick={this.hideBorder} className="main-border-right main-font-color" style={{float: "right", fontSize: "12px", background: "none"}}>
                                <FontAwesomeIcon icon={faBorderNone}></FontAwesomeIcon> Hide Border
                            </button>
                        :
                            <button onClick={this.showBorder} className="main-border-right main-font-color" style={{float: "right", fontSize: "12px", background: "none"}}>
                                <FontAwesomeIcon icon={faBorderAll}></FontAwesomeIcon> Show Border
                            </button>

                    }
                    <div style={{float:"right"}}>
                        <button onClick={this.filter} className="main-border-right" style={{fontSize: "12px", background: "none", float: "right"}}>
                            <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon> Module
                        </button>
                        {this.state.filter}
                    </div>
                    
                    {
                        (this.state.picProject == getCookieUserId() || this.state.isPermition)
                        ?
                            <button onClick={this.upload} className="main-border-right" style={{float: "right", fontSize: "12px", background: "none"}}>
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Upload
                            </button>
                        :
                            ""
                    }

                </div>
                <table className="main-border-bottom" style={{width: "80%"}}>
                    <thead id="th-doc-file">
                        {
                            (this.state.isBorder)
                            ?
                                <tr>
                                    <th className="bold second-font-color main-border th-doc-file tb-doc-file" colSpan="2">Name</th>
                                    <th className="bold second-font-color main-border th-doc-file tb-doc-file" style={{width: "100px"}}>Module</th>
                                    <th className="bold second-font-color main-border th-doc-file tb-doc-file" style={{width: "100px"}}>Upload By</th>
                                    <th className="bold second-font-color main-border th-doc-file tb-doc-file" style={{width: "50px"}}>
                                        Size
                                    </th>
                                    <th className="bold second-font-color main-border th-doc-file tb-doc-file" colSpan="2">Date</th>
                                </tr>
                            :
                                <tr>
                                    <th className="bold second-font-color main-border-right th-doc-file tb-doc-file" colSpan="2">Name</th>
                                    <th className="bold second-font-color main-border-right th-doc-file tb-doc-file" style={{width: "100px"}}>Module</th>
                                    <th className="bold second-font-color main-border-right th-doc-file tb-doc-file" style={{width: "100px"}}>Upload By</th>
                                    <th className="bold second-font-color main-border-right th-doc-file tb-doc-file" style={{width: "50px"}}>
                                        Size
                                    </th>
                                    <th className="bold second-font-color th-doc-file tb-doc-file" colSpan="2">Date</th>
                                </tr>
                        }
                    </thead>
                    <tbody>
                        {
                            (this.state.isLoad)
                            ? 
                                <tr>
                                    <td colSpan="5" className="bold font-second-color" style={{paddingTop: "20px",paddingBottom:"30px", fontSize: "14px", textAlign: "center", color: "#a2a2a2"}}>
                                        <Spinner size="25px" textLoader="load data.."/>
                                    </td>
                                </tr>
                            :
                                (data == "")
                                ?
                                    <tr>
                                        <td colSpan="6" className="font-second-color" style={{paddingTop: "20px",paddingBottom:"30px", fontSize: "14px", textAlign: "center", color: "#a2a2a2"}}>
                                            <div style={{marginTop: "10px", marginTop: "25px", marginBottom: "100px"}}>
                                                <span style={{fontSize: "16px"}}>
                                                    <i class="fa fa-file" style={{fontSize: "30px"}}></i>
                                                </span>
                                                <div className="bold" style={{marginTop: "10px", fontSize: '14px'}}>No data to display</div>
                                                <div style={{fontSize: "12px"}}>there's no document or file in this project</div>
                                            </div>
                                        </td>
                                    </tr> 
                                :
                                    data
                        }
                    </tbody>
                </table>
                {/* <div className="main-border-bottom main-border-top" style={{width: "80%", fontSize: "10px"}}>
                    <div style={{padding: "10px", textAlign: "right"}}>
                        Modified by : <span className="bold">Dandi rahmawan</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Modified date : <span className="bold">10 Jan 2020</span>
                    </div>
                </div> */}
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setDataDocFile : (jsonArray) => dispatch(setDataDocFile(jsonArray)),
        updateDataModuleDocFile: (moduleId) => dispatch(updateDataModuleDocFile(moduleId)),
        deleteDataDocFile: (moduleId, projectId, fileName, userId) => dispatch(deleteDataDocFile(moduleId, projectId, fileName, userId))
    }
}

const mapStateToProps = state => {
    return{
        dataDocFile : state.dataDocFile
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (document_file)