import { faCheckCircle, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { createRef, Fragment } from 'react'

class doc_file_input extends React.Component{

    parHgtxtArea = createRef()
    
    render(){
        return(
            <Fragment>
                {/*base upload progress*/}
                <div ref={this.props.baseProgressBar} className="main-border second-background-grs" 
                    style={{display: "none", 
                            alignItems: "center", 
                            padding: "5px", 
                            paddingLeft: "10px", 
                            borderRadius: "5px",
                            position: "fixed",
                            bottom: "10px",
                            right: "20px",
                            width: "250px", 
                            marginTop: "10px"}}>

                    <FontAwesomeIcon icon={faUpload} className="second-font-color"/>
                    <div className="main-font-size main-border-left" style={{marginLeft: "10px", paddingLeft: "10px", wordBreak: "break-word"}}>
                        {this.props.fileNameProgress}
                        <div style={{background: "#CCC", border: "1px solid #b0b0b0", height: "8px", width: "150px", marginTop: "5px", borderRadius: "4px", overflow: "hidden"}}>
                            <div ref={(e) => this.props.progressBar(e)} className="main-color" style={{width: "0%", height: "8px"}}></div>
                        </div>
                        <div className="bold" ref={this.props.uploadedFileIndicator} style={{fontSize: "12px", color: "green", marginTop: "5px", display: "none"}}>
                            <FontAwesomeIcon icon={faCheckCircle}/> File uploaded
                        </div>
                    </div>
                </div>

                <div id="footer-base-bugs" className="main-border input-info-mdl" style={{height: "auto", borderRadius: "3px", marginTop: "10px"}}>
                    <div style={{overflow: "hidden"}}>
                        <textarea
                            onChange={(e) => this.props.descFileHandler(e, this.parHgtxtArea.current)} 
                            onClick={this.props.txtDocFileClick}
                            value={this.props.descFile} 
                            className='main-border-right' 
                            placeholder="description document file" 
                            style={{float: "left", width: "430px", border: "none", outline: "none", resize: "none", fontSize: "12px", padding: "5px", marginTop: "5px", marginBottom: "5px", marginLeft: "5px", borderRight: "#dcdbdb 1px solid", height: "15px", background: "none"}}>   
                        </textarea>
                        
                        <div ref={this.parHgtxtArea} 
                                    className="main-border" 
                                    style={{width: "430px", padding: "5px", fontSize: "12px", position: "absolute", background: "yellow", opacity: "0"}}>insert checklist</div>
                                

                        <button onClick={this.props.attachment} 
                                style={{fontSize: "12px", marginLeft: "5px", marginTop: "10px", background: "none"}}>
                            <i className="fa fa-paperclip"></i> Attachment
                        </button>

                        <input ref={this.props.inputElement} 
                            onChange={this.props.fileUploaHandler} 
                            id="attach-doc-file" 
                            type="file" 
                            style={{display: "none"}}></input>

                        <button onClick={this.props.commit} 
                                style={{fontSize: "12px", marginLeft: "5px", marginTop: "10px", background: "none", color: "blue"}}>
                            Send
                        </button>

                    </div>
                    <div id='base-doc-file-name-upload' style={{fontSize: "12px", overflow: "hidden"}}>
                        {
                            (this.props.fileName != "") ? 
                                <div style={{background: "#CCC", padding: "3px", float: "left", borderRadius: "4px",  margin: "10px"}}>
                                    <i class="fa fa-arrow-circle-up" style={{marginTop: "2px"}}></i> <span>{this.props.fileName}</span>
                                </div> 
                            : 
                                ""
                        }                   
                    </div>
                </div>
                <div className="second-font-color" style={{paddingTop: "10px", fontSize: "11px"}}>
                    * Maksimum document or file upload is 1 mb (except image file)
                </div>
            </Fragment>
        )
    }
}

export default doc_file_input