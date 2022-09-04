import React from 'react'
import RowDocFile from './row_attachment'
import PopupConfirmation from '../../popup_confirmation'
import {popUpAlert, getCookieUserId} from '../../../function/function'
import PreviewImage from '../../preview_image'
import PreviewVideo from '../../preview_video'
import DocFileInput from './doc_file_input'
import { baseUrl } from '../../../const/const'
import {EXIF} from "exif-js";

class doc_file_module extends React.Component{

    constructor(){
        super()
        this.state = {
            fileName:"",
            filaNameProgress:"",
            popConfirmDelete:"",
            idFileDelete:"",
            rowSelected:"",
            popImage:"",
            descFile:"",
            picProject:"",
            isPermition:"",
            ort: 0,
            base64: ""
        }
        
        this.inputElement = React.createRef()
        this.setRef = this.setRef.bind(this)
        this.attachment = this.attachment.bind(this)
        this.fileUploaHandler = this.fileUploaHandler.bind(this)
        this.commit = this.commit.bind(this)
        this.delete = this.delete.bind(this)
        this.hideConfirm = this.hideConfirm.bind(this)
        this.yesConfirm = this.yesConfirm.bind(this)
        this.rowClickDocFile = this.rowClickDocFile.bind(this)
        this.hideImage = this.hideImage.bind(this)
        this.descFileHandler = this.descFileHandler.bind(this)
        this.changeImage = this.changeImage.bind(this)
    }

    componentDidMount(){
        this.setState({
            picProject: this.props.picProject
        })

        this.props.dataPermition.map(dt => {
            if(dt.permitionCode == 3){
                if(dt.isChecked == 'Y'){
                    this.setState({
                        isPermition: true
                    })
                }
            }
        })
    }

    attachment(){
        this.inputElement.current.click()
    }

    fileUploaHandler(e){
        let file = e.target.files[0]
        let fileName = file.name
        let fileSize = file.size
        let fileType = fileName.substr(fileName.lastIndexOf("."), fileName.length)

        let ext = fileName.lastIndexOf(".")
        let extName = fileName.substr(parseInt(ext) + 1, fileName.length - 1)
        
        // if(fileSize > 1100000 && 
        //     (extName.toLowerCase() != "jpg" && extName.toLowerCase() != "jpeg") && extName.toLowerCase() != "png"){
        //     popUpAlert("Maximum file size upload is 1 mb", "warning")
        // }else{
            var name = file.name
            this.props.documentFileUpload(e)
            this.setState({
                fileName: name,
                filaNameProgress: name
            })
            if(fileType == ".jpg" || fileType == ".jpef" || fileType == ".png"){
                this.changeImage(e, fileSize)
            }
        // }
    }

    rowClickDocFile(e, url, ext, fileName){
        console.log(url)
        ext = ext.toLowerCase().replace(".", "")
        if(ext == 'jpeg' || ext == 'jpg' || ext == 'png'){
            e.preventDefault()
            this.setState({
                popImage : <PreviewImage image={fileName} hideImage={this.hideImage} url={url}/>
            })
        }else if(ext == "mp4" || ext == "3gp" || ext == "mkv"){
            e.preventDefault()
            this.setState({
                popImage : <PreviewVideo video={fileName} hideVideo={this.hideImage} url={url}/>
            })
        }else{
            window.open(url)
        }
    }

    hideImage(){
        this.setState({
            popImage: ""
        })
    }

    delete(e, id){
        if(this.state.popConfirmDelete == ""){
            var t = e.target
            var row = t.parentElement.parentElement.parentElement
            
            this.setState({
                idFileDelete: id,
                rowSelected: row,
                popConfirmDelete: <PopupConfirmation
                                        titleConfirmation="Delete Document File"
                                        textPopup="Are you sure, you want delete document file ?" 
                                        hidePopUp={this.hideConfirm} 
                                        yesAction={this.yesConfirm}/>,
            })

            var r = document.getElementsByClassName("row-doc-file")
            for(var i = 0;i<r.length;i++){
                r[i].setAttribute("class", "tr-selectable row-doc-file")
            }
            row.setAttribute("class", "tr-selectable row-doc-file selected-row")
        }
    }

    hideConfirm(){
        this.setState({
            popConfirmDelete: "",
        })

        var r = document.getElementsByClassName("row-doc-file")
        for(var i = 0;i<r.length;i++){
            r[i].setAttribute("class", "tr-selectable row-doc-file")
        }
    }

    descFileHandler(e, x){
        var value = e.target.value
        this.setState({
            descFile: value
        })
        
        if(e.target.value == 0){
            x.innerText = "description"
        }else{
            x.innerText = e.target.value
        }
        
        let h = x.offsetHeight
        h = h - 11
        e.target.style.height = h+"px"
    }

    yesConfirm(){
        this.state.rowSelected.style.opacity = "0.5"
        var r = document.getElementsByClassName("row-doc-file")
        for(var i = 0;i<r.length;i++){
            r[i].setAttribute("class", "tr-selectable row-doc-file")
        }
        this.hideConfirm()
        this.props.deleteDocFile(this.state.idFileDelete)
    }

    commit(){
        if(this.state.fileName == ""){
            popUpAlert("File upload is empty", "warning")
        }else{
            this.props.commitDocFileUpload(this.state.descFile, this.state.base64, this.state.ort, this.state.fileName)
            this.setState({
                fileName: ""
            })
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

    setRef(e){
        this.props.bindProgressBar(e)
    }

    render(){

        const data = this.props.dataDocFile.map(dt => 
            {
                console.log(dt)
                return <RowDocFile 
                                rowClickDocFile={this.rowClickDocFile}
                                ext={dt.extension} 
                                id={dt.id}
                                fileName={dt.fileName} 
                                fileSize={dt.fileSize} 
                                descFile={dt.descriptionFile} 
                                delete={this.delete}
                                picProject={this.props.picProject}
                                isPermition={this.state.isPermition}
                                urlPath={dt.urlPath}/>
            })

            
        return(
            <React.Fragment>
                {this.state.popImage}
                {this.state.popConfirmDelete}
                <canvas id="image_canvas" style={{display: "none"}}/>
                <div style={{display: "none"}}><img id="base-img-upload"/></div>
                <div className="main-border-top" style={{padding: "22px", paddingTop: "10px", marginTop: "10px"}}>
                    <div className="second-font-color bold" style={{fontSize: "11px", marginBottom : "3px"}}>Attachment</div>
                    <table style={{width: "100%"}}>
                        <tbody>
                            { 
                                (this.props.dataDocFile.length > 0)
                                ?   
                                    data
                                :
                                    <tr>
                                        <td colSpan="3" className="font-second-color" style={{paddingTop: "20px",paddingBottom:"30px", fontSize: "14px", textAlign: "center", color: "#707070"}}>
                                            <div style={{marginTop: "10px"}}>
                                                {/* <span style={{fontSize: "16px"}}>
                                                    <i class="fa fa-file" style={{fontSize: "20px"}}></i>
                                                </span> */}
                                                <div className="bold" style={{marginTop: "10px", fontSize: '12px'}}>No data to display</div>
                                                <div style={{fontSize: "12px"}}>there's no data document or file<br/>in this module</div>
                                            </div>
                                        </td>
                                    </tr> 
                            }
                        </tbody>
                    </table>

                    {
                        (this.state.isPermition || this.state.picProject == getCookieUserId())
                        ?
                            <DocFileInput
                                descFileHandler={this.descFileHandler} 
                                txtDocFileClick={this.txtDocFileClick}
                                descFile={this.state.descFile} 
                                attachment={this.attachment}
                                commit={this.commit}
                                fileName={this.state.fileName}
                                fileNameProgress={this.state.filaNameProgress}
                                inputElement={this.inputElement}
                                progressBar={this.setRef}
                                baseProgressBar={this.props.baseProgressBar}
                                uploadedFileIndicator={this.props.uploadedFileIndicator}
                                fileUploaHandler={this.fileUploaHandler}
                            />
                        :
                            ""
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default doc_file_module