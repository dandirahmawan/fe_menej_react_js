import React from 'react'
import RowDocFile from './row_doc_file'
import PopConfirmDelete from './pop_confirm_delete'
import PopupConfirmation from '../popup_confirmation'
import {popUpAlert, getCookieUserId} from '../../function/function'
import PreviewImage from '../preview_image'
import DocFileInput from './doc_file_input'
import { baseUrl } from '../../const/const'

class doc_file_module extends React.Component{

    constructor(){
        super()
        this.state = {
            fileName:"",
            popConfirmDelete:"",
            fileNameDelete:"",
            rowSelected:"",
            popImage:"",
            descFile:"",
            picProject:"",
            isPermition:""
        }

        this.inputElement = React.createRef()
        this.attachment = this.attachment.bind(this)
        this.fileUploaHandler = this.fileUploaHandler.bind(this)
        this.commit = this.commit.bind(this)
        this.delete = this.delete.bind(this)
        this.hideConfirm = this.hideConfirm.bind(this)
        this.yesConfirm = this.yesConfirm.bind(this)
        this.rowClickDocFile = this.rowClickDocFile.bind(this)
        this.hideImage = this.hideImage.bind(this)
        this.descFileHandler = this.descFileHandler.bind(this)
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
        var file = e.target.files[0]
        var fileSize = file.size
        if(fileSize > 11000000){
            popUpAlert("Maximum file size upload is 10 mb", "warning")
        }else{
            var name = file.name
            this.props.documentFileUpload(e)
            this.setState({
                fileName: name
            })
        }
    }

    rowClickDocFile(e, fileName, url){
        var a = fileName.lastIndexOf(".")
        var ext = fileName.substr(parseInt(a) + 1, fileName.length)
        if(ext == 'jpeg' || ext == 'jpg' || ext == 'png'){
            e.preventDefault()
            this.setState({
                popImage : <PreviewImage image={fileName} hideImage={this.hideImage} url={url}/>
            })
        }else{
            window.open(baseUrl+"/file/"+url)
        }
    }

    hideImage(){
        this.setState({
            popImage: ""
        })
    }

    delete(e,fileName){
        if(this.state.popConfirmDelete == ""){
            var t = e.target
            var row = t.parentElement.parentElement.parentElement
            
            this.setState({
                fileNameDelete: fileName,
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

    descFileHandler(e){
        var value = e.target.value
        this.setState({
            descFile: value
        })   
    }

    yesConfirm(){
        this.state.rowSelected.style.opacity = "0.5"
        var r = document.getElementsByClassName("row-doc-file")
        for(var i = 0;i<r.length;i++){
            r[i].setAttribute("class", "tr-selectable row-doc-file")
        }
        this.hideConfirm()
        this.props.deleteDocFile(this.state.fileNameDelete)
    }

    commit(){
        if(this.state.fileName == ""){
            popUpAlert("File upload is empty", "warning")
        }else{
            this.props.commitDocFileUpload(this.state.descFile)
            this.setState({
                fileName: ""
            })
        }
    }

    txtDocFileClick(e){
        var t = e.target
        t.style.height = "40px"
    }

    render(){

        const heightMain = (this.props.mainHeight - 40) - 30
        const data = this.props.dataDocFile.map(dt => <RowDocFile 
                                                        rowClickDocFile={this.rowClickDocFile} 
                                                        fileName={dt.fileName} 
                                                        fileSize={dt.fileSize} 
                                                        descFile={dt.description} 
                                                        delete={this.delete}
                                                        picProject={this.props.picProject}
                                                        isPermition={this.state.isPermition}
                                                        path={dt.path}/>)

        return(
            <React.Fragment>
                {this.state.popImage}
                {this.state.popConfirmDelete}
                <div style={{padding: "10px", height: heightMain+"px", overflowY: "scroll"}}>
                    <table style={{width: "85%"}}>
                        <thead>
                            <tr>
                                <th colSpan="2" className="main-border-right bold second-font-color">Name</th>
                                <th className="main-border-right bold second-font-color">Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data}
                        </tbody>
                    </table>
                </div>
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
                            inputElement={this.inputElement}
                            fileUploaHandler={this.fileUploaHandler}
                        />
                    :
                        ""
                }
            </React.Fragment>
        )
    }
}

export default doc_file_module