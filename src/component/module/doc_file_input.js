import React from 'react'

class doc_file_input extends React.Component{
    render(){
        return(
            <div id="footer-base-bugs" className="main-border-top" style={{height: "auto", background: "#FFF"}}>
                <div style={{overflow: "hidden"}}>
                    <textarea
                        onChange={this.props.descFileHandler} 
                        onClick={this.props.txtDocFileClick}
                        value={this.props.descFile} 
                        className='main-border-right' 
                        placeholder="description document file" 
                        style={{float: "left", width: "430px", border: "none", outline: "none", resize: "none", fontSize: "12px", padding: "5px", marginTop: "10px", marginBottom: "10px", marginLeft: "10px", borderRight: "#dcdbdb 1px solid", height: "20px"}}>   
                    </textarea>
                    
                    <button onClick={this.props.attachment} style={{fontSize: "12px", marginLeft: "5px", marginTop: "15px", background: "none"}}>
                        <i className="fa fa-paperclip"></i> Attachment
                    </button>

                    <input ref={this.props.inputElement} onChange={this.props.fileUploaHandler} id="attach-doc-file" type="file" style={{display: "none"}}></input>

                    <button onClick={this.props.commit} style={{fontSize: "12px", marginLeft: "5px", marginTop: "15px", background: "none", color: "blue"}}>Kirim</button>

                </div>
                <div id='base-doc-file-name-upload' style={{fontSize: "12px", overflow: "hidden"}}>
                    {(this.props.fileName != "") ? 
                        <div style={{background: "#CCC", padding: "3px", float: "left", borderRadius: "4px",  margin: "10px", marginLeft:"15px"}}>
                            <i class="fa fa-arrow-circle-up" style={{marginTop: "2px"}}></i> <span>{this.props.fileName}</span>
                        </div> 
                        : 
                        ""
                    }                    
                </div>
            </div>
        )
    }
}

export default doc_file_input