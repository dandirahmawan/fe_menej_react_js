import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {popCenterPosition, popUpAlert, getCookieUserId, getCookieSessionId} from '../../function/function'
import { baseUrl } from '../../const/const'
import {appendDataDocFile, updateDataModuleDocFile} from '../../redux/action'
import {SpinnerButton} from "../spinner";
import {EXIF} from "exif-js";
import {ApiFetch} from '../apiFetch'

class upload_document_file extends React.Component{

    constructor(){
        super()
        this.state = {
            moduleId: "",
            description: "",
            fileName: "",
            files:"",
            ort:0,
            modWidth: 0,
            modHeight: 0,
            base64: "",
            image:null,
            numPercent: 0,
            choicesModule:[]
        }

        this.inputRef = React.createRef()
        this.baseProgressBar = React.createRef()
        this.progressBar = React.createRef()

        this.fileSelect = this.fileSelect.bind(this)
        this.changeModule = this.changeModule.bind(this)
        this.submit = this.submit.bind(this)
        this.changeDescription = this.changeDescription.bind(this)
        this.changeFile = this.changeFile.bind(this)
        this.getModWidthHeight = this.getModWidthHeight.bind(this)
        this.canvasing = this.canvasing.bind(this)
    }

    componentDidMount(){
        popCenterPosition("upl_doc_file_bs")
        var elm1 = document.getElementById("hd-upl-doc-file-bs")
        var elm2 = document.getElementById("ft-upl-doc-file-bs")
        var elmSet = document.getElementById("mn-upl-doc-file-bs")

        var h1 = elm1.offsetHeight
        var h2 = elm2.offsetHeight
        var h3 = 300 - (parseInt(h1) + h2) - 20
        elmSet.style.minHeight = h3+"px"

        this.props.dataModule.map( dt=> {
            var jsonObject = '{"moduleId":"'+dt.modulId+'","moduleName":"'+dt.modulName+'"}';
            var jsonObject = JSON.parse(jsonObject)
            this.state.choicesModule.push(jsonObject)
            this.setState({
                choicesModule: this.state.choicesModule
            })
        })  

    }

    changeModule(e){
        var moduleId = e.target.value
        this.setState({
            moduleId: moduleId
        })
    }

    changeDescription(e){
        var v = e.target.value
        this.setState({
            description: v
        })
    }

    fileSelect(){
        this.inputRef.current.click()
    }

    submit(e){
        let t = e.target
        let ready0 = true
        let ready1 = true
        
        if(this.state.moduleId == 0) ready0 = false
        if(this.state.fileName == 0) ready1 = false
        // return false
        if(ready0 && ready1){
            ReactDOM.render(<SpinnerButton size="15px"/>, e.target)
            e.target.style.opacity = 0.5
            let form = new FormData()
            let file = (this.state.base64 == "") ? this.state.files : null
            let bs64 = (this.state.base64 != "") ? this.state.base64 : ""
            form.append('file', file)
            form.append("userId", getCookieUserId())
            form.append("sessionId", getCookieSessionId())
            form.append('projectId', this.props.projectId)
            form.append('moduleId', this.state.moduleId)
            form.append('descFile', this.state.description)
            form.append('base64', bs64)
            form.append('fileName', this.state.fileName)
            form.append('ort', this.state.ort)

            this.baseProgressBar.current.style.display = "block"
            const xhr = new XMLHttpRequest()
            xhr.upload.onprogress = (e) => {
                const done = e.position || e.loaded
                const total = e.totalSize || e.total
                const perc = (Math.floor(done / total * 1000) / 10)
                
                //set width progress bar
                if(perc >= 100){
                    this.progressBar.current.style.width = "100%"
                }else{
                    this.progressBar.current.style.width = Math.floor(perc)+"%"
                    this.setState({numPercent : Math.floor(perc)})
                }
            }

            xhr.onreadystatechange = (e) => {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var json = JSON.parse(xhr.responseText)
                    if(json.projectId !== undefined){
                        this.props.appendDataDocFile(json)
                        this.props.updateDataModuleDocFile(this.state.moduleId)
                        popUpAlert("Document or file uploaded successfully", "success")
                        this.props.hide()
                    }else{
                        popUpAlert("Upload doc file failed")
                        ReactDOM.render("Submit", t)
                        t.style.opacity = 1
                    }
                }
            }

            xhr.open('POST', baseUrl+'/document_file')
            xhr.setRequestHeader("userId", getCookieUserId())
            xhr.setRequestHeader("sessionId", getCookieSessionId())
            xhr.send(form)
        }else{
            if(!ready0) popUpAlert("Module not selected")
            if(!ready1) popUpAlert("File not choosen")
        }
    }

    changeFile(e){
        var file = e.target.files[0]
        var fileName = file.name
        let fileSize = file.size
        this.setState({
            fileName: fileName,
            files: file
        })
        let ft = fileName.substr(fileName.lastIndexOf("."), fileName.length)
        if(ft == ".jpg" || ft == ".jpeg" || ft == ".png"){
            this.changeImage(e, fileSize)
        }
    }

    getModWidthHeight(w, h){
        if(w > h){
            if(w > 1280){
                this.setState({
                    modWidth: 1280,
                    modHeight: h / w * 1280
                })
            }else{
                this.setState({
                    modWidth: w,
                    modHeight: h
                })
            }
        }else{
            if(h > 1280){
                this.setState({
                    modWidth: w / h * 1280,
                    modHeight: 1280
                })
            }else{
                this.setState({
                    modWidth: w,
                    modHeight: h
                })
            }
        }
    }

    changeImage(e, fileSize) {
        let imgData = e.target.files[0]
        const scope = this
        EXIF.getData(imgData, function () {
            var allMetaData = EXIF.getAllTags(this)

            let reader = new FileReader()
            reader.readAsDataURL(imgData)
            reader.onload = function (e) {
                let elm = document.getElementById("base-img-upload")
                scope.setState({
                    ort: (allMetaData.Orientation == undefined) ? 0 : allMetaData.Orientation,
                    srcImage: e.target.result
                })
                let img = new Image()
                img.src = e.target.result
                elm.src = e.target.result
                scope.setState({
                    image: img
                })

                let itvl = setInterval(function(){
                    scope.getModWidthHeight(img.width, img.height)
                    if(scope.state.modHeight > 0 && scope.state.modWidth > 0){
                        clearInterval(itvl)
                        if(fileSize > 500000) scope.canvasing()
                    }
                }, 100)
            }
        })
    }

    canvasing(){
        let imgToCvs = document.getElementById("base-img-upload")
        let canvas = document.getElementById("image_canvas")
        canvas.setAttribute("width", this.state.modWidth+"px")
        canvas.setAttribute("height", this.state.modHeight+"px")

        var ctx = canvas.getContext("2d");
        ctx.drawImage(imgToCvs, 0, 0, this.state.modWidth, this.state.modHeight)
        var dataurl = canvas.toDataURL('image/jpeg',80);
        this.setState({
            base64: dataurl
        })
    }

    render(){

        const choice = this.state.choicesModule.map(dt => {
            return <option value={dt.moduleId}>{dt.moduleName}</option>
        })

        return(
            <React.Fragment>
                <div className="block"></div>
                <canvas id="image_canvas" style={{display: "none"}}/>
                <div style={{display: "none"}}><img id="base-img-upload"/></div>
                <div id="upl_doc_file_bs" className="pop" style={{width: "350px", minHeight: "300px", background: "#FFF", borderRadius: "4px", overflow: "hidden"}}>
                    <div id="hd-upl-doc-file-bs" className="main-border-bottom bold" style={{padding: "10px", fontSize: "14px", background: "#f5f5f5"}}>
                        Upload
                    </div>
                    <div id="mn-upl-doc-file-bs" style={{padding: "10px"}}>
                        <table style={{width: "100%"}}>
                            <tbody style={{fontSize: "12px"}}>
                                <tr>
                                    <td style={{width: "70px"}}>Module</td>
                                    <td>
                                        <select onChange={this.changeModule} style={{fontSize: "12px"}}>
                                            <option value="0"> - select -</option>
                                            {choice}
                                        </select>
                                    </td>
                                </tr>
                                <tr valign="top">
                                    <td style={{paddingTop: "10px"}}>Description</td>
                                    <td>
                                        <textarea onChange={this.changeDescription} placeholder="description doc file" style={{width: "100%", boxSizing: "border-box", height: "100px", fontSize: "12px"}}></textarea>
                                    </td>
                                </tr>
                                <tr valign="top">
                                    <td>Doc / file</td>
                                    <td>
                                        <div style={{borderLeft: "2px solid #CCC", paddingLeft: "5px"}}>
                                            <input ref={this.inputRef} onChange={this.changeFile} type="file" style={{display: "none"}}></input>
                                            <button onClick={this.fileSelect} style={{fontSize: "12px",marginTtop: "15px", background: "none", padding: "0px", color: "blue"}}>
                                                <i class="fa fa-paperclip"></i> Attachment
                                            </button><br/>
                                            
                                            {
                                                (this.state.fileName === "")
                                                ?
                                                    <span style={{fontSize: "11px"}}>No file selected, klik attachment to select file</span>
                                                :
                                                    <div style={{padding: "3px", background: "#CCC", float: "left", borderRadius: "3px", border: "1px solid #b1b1b1", marginTop: "3px"}}> 
                                                        {this.state.fileName}
                                                    </div>

                                            }
                                            
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="ft-upl-doc-file-bs" className="main-border-top" style={{padding: "10px", textAlign: "right"}}>
                        <div ref={this.baseProgressBar} style={{float: "left", textAlign: "left", display: "none"}}>
                            <span className="bold second-font-color" style={{fontSize: "11px"}}>
                                {this.state.numPercent}&nbsp;%
                            </span>
                            <div style={{background: "#CCC", height: "8px", width: "120px"}}>
                                <div ref={this.progressBar} className="main-color" style={{width: "30%", height: "8px"}}></div>
                            </div>
                        </div>

                        <button onClick={this.submit} className="btn-primary" style={{fontSize: "12px"}}>Submit</button>
                        <button onClick={this.props.hide} className="btn-secondary" style={{fontSize: "12px", marginLeft: "10px"}}>Cancel</button>
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
        appendDataDocFile: (jsonObject) => dispatch(appendDataDocFile(jsonObject)),
        updateDataModuleDocFile: (modulId) => dispatch(updateDataModuleDocFile(modulId, "add"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(upload_document_file)