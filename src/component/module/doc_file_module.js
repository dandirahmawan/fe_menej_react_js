import React from 'react'
import RowDocFile from './row_doc_file'
import PopConfirmDelete from './pop_confirm_delete'
import {popUpAlert} from '../../function/function'
import PreviewImage from '../preview_image'

class doc_file_module extends React.Component{

    constructor(){
        super()
        this.state = {
            fileName:"",
            popConfirmDelete:"",
            fileNameDelete:"",
            rowSelected:"",
            popImage:""
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
    }

    attachment(){
        this.inputElement.current.click()
        console.log(this.inputElement.current)
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

    delete(e,fileName){
        if(this.state.popConfirmDelete == ""){
            var t = e.target
            var row = t.parentElement.parentElement.parentElement
            this.setState({
                popConfirmDelete: <PopConfirmDelete hideConfirm={this.hideConfirm} yesConfirm={this.yesConfirm}/>,
                fileNameDelete: fileName,
                rowSelected: row
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
            this.props.commitDocFileUpload()
            this.setState({
                fileName: ""
            })
        }
    }

    render(){

        const heightMain = (this.props.mainHeight - 40) - 30
        const data = this.props.dataDocFile.map(dt => <RowDocFile rowClickDocFile={this.rowClickDocFile} fileName={dt.fileName} fileSize={dt.fileSize} delete={this.delete}/>)

        return(
            <React.Fragment>
                {this.state.popImage}
                {this.state.popConfirmDelete}
                <div style={{padding: "10px", height: heightMain+"px", overflowY: "scroll"}}>
                    <table style={{width: "85%"}}>
                        <thead>
                            <th colSpan="2" className="main-border-right bold second-font-color">Name</th>
                            <th className="main-border-right bold second-font-color">Size</th>
                        </thead>
                        <tbody>
                            {data}
                        </tbody>
                    </table>
                </div>
                <div id="footer-base-bugs" className="main-border-top" style={{height: "auto", background: "#FFF"}}>
                    <div style={{overflow: "hidden"}}>
                        <textarea rows="1" className='main-border-right' placeholder="description document file" style={{float: "left", width: "330px", border: "none", outline: "none", resize: "none", fontSize: "12px", padding: "5px", marginTop: "10px", marginLeft: "10px", borderRight: "#dcdbdb 1px solid"}}>   
                        </textarea>
                        
                        <button onClick={this.attachment} style={{fontSize: "12px", marginLeft: "5px", marginTop: "15px", background: "none"}}>
                            <i className="fa fa-paperclip"></i> Attachment
                        </button>
                        <input ref={this.inputElement} onChange={this.fileUploaHandler} id="attach-doc-file" type="file" style={{display: "none"}}></input>
                        <button onClick={this.commit} style={{fontSize: "12px", marginLeft: "5px", marginTop: "15px", background: "none", color: "blue"}}>Kirim</button>
                    </div>
                    <div id='base-doc-file-name-upload' style={{fontSize: "12px", overflow: "hidden"}}>
                        {(this.state.fileName != "") ? 
                            <div style={{background: "#CCC", padding: "3px", float: "left", borderRadius: "4px",  margin: "10px", marginLeft:"15px"}}>
                                <i class="fa fa-arrow-circle-up" style={{marginTop: "2px"}}></i> <span>{this.state.fileName}</span>
                            </div> 
                            : 
                            ""
                        }                    
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default doc_file_module