import { Create } from '@material-ui/icons'
import React, { createRef, Fragment } from 'react'

class doc_file_input extends React.Component{

    parHgtxtArea = createRef()
    
    render(){
        return(
            <Fragment>
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

                        <div style={{background: "#CCC", height: "4px", width: "105px", float: "right", marginRight: "27px", marginTop: "5px", borderRadius: "10px", display: "none"}}>
                            <div ref={(e) => this.props.progressBar(e)} className="main-color" style={{width: "0%", height: "4px", borderRadius: "10px"}}></div>
                        </div>

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