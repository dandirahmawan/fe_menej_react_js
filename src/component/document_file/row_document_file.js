import React from 'react'
import {convertDate} from  '../../function/function'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {getIconDocFIle} from '../../function/function'

class row_document_file extends React.Component{

    constructor(){
        super()
        this.baseIcon = React.createRef()
    }

    componentDidMount(){
        getIconDocFIle(this.props.fileName, this.baseIcon.current)
    }

    byteToKb(size){
        var rtn = 0
        var mathFLoor = Math.floor(size / 1000)
        if(mathFLoor >= 1000){
            rtn = Math.floor(mathFLoor / 1000)
            rtn = rtn+" mb"
        }else{
            rtn = mathFLoor+" kb"
        }
        return rtn
    }

    url(url){
        let url2 = url.replace("..\\upload\\", "")
        let url21 = url2.replace("../upload/", "")
        return url21
    }

    render(){
        return(
            (!this.props.isBorder)
            ?
                <tr className="tb-doc-file tr-selectable" valign="top">
                    <td className="tb-doc-file" style={{width: "20px"}}>
                        <div ref={this.baseIcon}></div>
                    </td>
                    <td className="tb-doc-file" style={{paddingRight: "10px"}}>
                        <a onClick={(e) => this.props.rowClickDocFile(e, this.props.fileName, this.url(this.props.path))} style={{color: "#000"}}>{this.props.fileName}</a>
                        <div className="second-font-color">
                            <div style={{fontSize: "11px"}}>
                            {
                                (this.props.descriptionFile != null && this.props.descriptionFile != "")
                                ?
                                    this.props.descriptionFile
                                : 
                                    "No description for this document file"
                            }
                            </div>
                        </div>
                    </td>
                    <td className="tb-doc-file">
                        <a onClick={() => this.props.moduleClick(this.props.modulId)}>{this.props.moduleName}</a>
                    </td>
                    <td className="tb-doc-file">
                        {this.props.userName}
                    </td>
                    <td className="tb-doc-file">{this.byteToKb(this.props.fileSize)}</td>
                    <td className="tb-doc-file" style={{width: "70px"}}>{convertDate(this.props.uploadDate)}</td>
                    <td>
                        <a onClick={() => this.props.deleteDocFile(this.props.fileName, this.props.modulId, this.props.projectId)}>
                            <FontAwesomeIcon icon={faTrashAlt} style={{fontSize: "11px"}}></FontAwesomeIcon>
                        </a>
                    </td>
                </tr>
            :
                <tr className="tb-doc-file tr-selectable main-border" valign="top">
                    <td className="tb-doc-file main-border" style={{width: "20px"}}>
                        <div ref={this.baseIcon}></div>
                    </td>
                    <td className="tb-doc-file main-border" style={{paddingRight: "10px"}}>
                        <a onClick={(e) => this.props.rowClickDocFile(e, this.props.fileName, this.url(this.props.path))} style={{color: "#000"}}>{this.props.fileName}</a>
                        <div className="second-font-color">
                            <div style={{fontSize: "11px"}}>
                            {
                                (this.props.descriptionFile != null && this.props.descriptionFile != "")
                                ?
                                    this.props.descriptionFile
                                : 
                                    "No description for this document file"
                            }
                            </div>
                        </div>
                    </td>
                    <td className="tb-doc-file main-border">
                        <a onClick={() => this.props.moduleClick(this.props.modulId)}>{this.props.moduleName}</a>
                    </td>
                    <td className="tb-doc-file main-border">
                        {this.props.userName}
                    </td>
                    <td className="tb-doc-file main-border">{this.byteToKb(this.props.fileSize)}</td>
                    <td className="tb-doc-file main-border" style={{width: "70px"}}>{convertDate(this.props.uploadDate)}</td>
                    <td className="main-border" style={{width: "20px"}}>
                        <a onClick={() => this.props.deleteDocFile(this.props.fileName, this.props.modulId, this.props.projectId)}>
                            <FontAwesomeIcon icon={faTrashAlt} style={{fontSize: "11px"}}></FontAwesomeIcon>
                        </a>
                    </td>
                </tr>
        )
    }
}

export default row_document_file