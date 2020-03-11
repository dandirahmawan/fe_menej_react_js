import React from 'react'
import {connect} from 'react-redux'
import {popCenterPosition, popUpAlert, getCookieUserId, getCookieSessionId} from '../../function/function'
import { baseUrl } from '../../const/const'
import {appendDataDocFile, updateDataModuleDocFile} from '../../redux/action'
class upload_document_file extends React.Component{

    constructor(){
        super()
        this.state = {
            moduleId: "",
            description: "",
            fileName: "",
            files:"",
            choicesModule:[]
        }

        this.inputRef = React.createRef()
        this.fileSelect = this.fileSelect.bind(this)
        this.changeModule = this.changeModule.bind(this)
        this.submit = this.submit.bind(this)
        this.changeDescription = this.changeDescription.bind(this)
        this.changeFile = this.changeFile.bind(this)
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

    submit(){
        var ready = true
        if(this.state.moduleId === 0) ready = false
        if(this.state.fileName === 0) ready = false 
        
        if(ready){
            var form = new FormData()
            form.append('file', this.state.files)
            form.append("userId", getCookieUserId())
            form.append("sessionId", getCookieSessionId())
            form.append('projectId', this.props.projectId)
            form.append('moduleId', this.state.moduleId)
            form.append('descFile', this.state.description)
            fetch(baseUrl+"/document_file",{
                method: "POST",
                body: form
            }).then(res => res.text())
            .then(result => {
                if(result != ""){
                    var json = JSON.parse(result)
                    this.props.appendDataDocFile(json)
                    this.props.updateDataModuleDocFile(this.state.moduleId)
                    popUpAlert("Document or file uploaded successfully", "success")
                    this.props.hide()
                }
            })
        }else{
            popUpAlert("make sure that you have select modul and file to upload")
        }
    }

    changeFile(e){
        var file = e.target.files[0]
        var fileName = file.name
        alert(file.type)
        this.setState({
            fileName: fileName,
            files: file
        })
    }

    render(){

        const choice = this.state.choicesModule.map(dt => {
            return <option value={dt.moduleId}>{dt.moduleName}</option>
        })

        return(
            <React.Fragment>
                <div className="block"></div>
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
                                    <td>Document / file</td>
                                    <td>
                                        <div style={{borderLeft: "2px solid #CCC", paddingLeft: "5px"}}>
                                            <input ref={this.inputRef} onChange={this.changeFile} type="file" style={{display: "none"}}></input>
                                            <button onClick={this.fileSelect} style={{fontSize: "14px",marginTtop: "15px", background: "none", padding: "0px", color: "blue"}}>
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