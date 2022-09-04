import React from 'react'
import {convertDate} from  '../../function/function'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendar, faCalendarAlt, faSdCard, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {getIconDocFIle} from '../../function/function'
import {check_circle as CkCIrcle} from '../icon/icon'
import { connect } from 'react-redux'

class row_document_file extends React.Component{

    constructor(){
        super()
        this.baseIcon = React.createRef()
    }

    componentDidMount(){
        getIconDocFIle(this.props.ext, this.baseIcon.current)
    }

    // componentDidUpdate(prevProps, prevState, snapshot){
    //     if(prevProps != this.props){
    //         console.log(this.props)
    //     }
    // }

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
            (!this.props.isBorderRdx)
            ?
                <tr className="tb-doc-file tr-selectable" valign="top">
                    <td className="tb-doc-file" valign='middle' style={{width: "20px"}}>
                        <div ref={this.baseIcon}></div>
                    </td>
                    <td className="tb-doc-file" style={{paddingRight: "10px"}}>
                        <a onClick={(e) => this.props.rowClickDocFile(e, this.props.fileName, this.url(this.props.path))} className="bold" style={{color: "#000"}}>{this.props.fileName}</a>
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
                    <td className="tb-doc-file" style={{position: "relative", padding: "0px", paddingLeft: "5px"}}>
                        <a onClick={() => this.props.moduleClick(this.props.modulId)}>
                            <div style={{display: "flex", alignItems: "center", position: "absolute", height: "100%"}}>
                                <CkCIrcle className="fld-color" style={{width: "15px", height: "15px"}}/> 
                                <div className="bold" style={{marginLeft: "10px"}}>
                                    {this.props.moduleName}
                                </div>
                            </div>
                        </a>
                    </td>
                    {/* <td className="tb-doc-file">
                        {this.props.userName}
                    </td> */}
                    <td className="tb-doc-file bold" style={{position : "relative", padding: "0px", paddingLeft: "5px"}}>
                        <div style={{display: "flex", alignItems: "center", height: "100%", position: "absolute"}}> 
                            <FontAwesomeIcon className="second-font-color" icon={faSdCard}/>&nbsp;&nbsp;{this.byteToKb(this.props.fileSize)}
                        </div>
                    </td>
                    <td className="tb-doc-file bold" style={{position : "relative", padding: "0px", paddingLeft: "5px", width: "90px"}}>
                        <div style={{display: "flex", alignItems: "center", height: "100%", position: "absolute"}}> 
                            <FontAwesomeIcon className="second-font-color" icon={faCalendarAlt}/>&nbsp;&nbsp;{convertDate(this.props.uploadDate)}
                        </div>
                    </td>
                    <td valign='middle'>
                        <a onClick={() => this.props.deleteDocFile(this.props.fileName, this.props.modulId, this.props.projectId)}>
                            <FontAwesomeIcon icon={faTrashAlt} style={{fontSize: "11px"}}></FontAwesomeIcon>
                        </a>
                    </td>
                </tr>
            :
                <tr className="tb-doc-file tr-selectable" valign="top">
                    <td className="tb-doc-file main-border" valign='middle' style={{width: "20px", borderRight: "none"}}>
                        <div ref={this.baseIcon}></div>
                    </td>
                    <td className="tb-doc-file main-border" style={{paddingRight: "10px", borderLeft: "none"}}>
                        <a onClick={(e) => this.props.rowClickDocFile(e, this.props.fileName, this.url(this.props.path))} className="bold" style={{color: "#000"}}>{this.props.fileName}</a>
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
                    <td className="tb-doc-file main-border" style={{position: "relative", padding: "0px", paddingLeft: "5px"}}>
                        <a onClick={() => this.props.moduleClick(this.props.modulId)}>
                            <div style={{display: "flex", alignItems: "center", position: "absolute", height: "100%"}}>
                                <CkCIrcle className="fld-color" style={{width: "15px", height: "15px"}}/> 
                                <div className="bold" style={{marginLeft: "10px"}}>
                                    {this.props.moduleName}
                                </div>
                            </div>
                        </a>
                    </td>
                    {/* <td className="tb-doc-file">
                        {this.props.userName}
                    </td> */}
                    <td className="tb-doc-file bold main-border" style={{position : "relative", padding: "0px", paddingLeft: "5px"}}>
                        <div style={{display: "flex", alignItems: "center", height: "100%", position: "absolute"}}> 
                            <FontAwesomeIcon className="second-font-color" icon={faSdCard}/>&nbsp;&nbsp;{this.byteToKb(this.props.fileSize)}
                        </div>
                    </td>
                    <td className="tb-doc-file bold main-border" style={{position : "relative", padding: "0px", paddingLeft: "5px", width: "90px"}}>
                        <div style={{display: "flex", alignItems: "center", height: "100%", position: "absolute"}}> 
                            <FontAwesomeIcon className="second-font-color" icon={faCalendarAlt}/>&nbsp;&nbsp;{convertDate(this.props.uploadDate)}
                        </div>
                    </td>
                    <td valign='middle' className='main-border' style={{textAlign: "center"}}>
                        <a onClick={() => this.props.deleteDocFile(this.props.fileName, this.props.modulId, this.props.projectId)}>
                            <FontAwesomeIcon icon={faTrashAlt} style={{fontSize: "11px"}}></FontAwesomeIcon>
                        </a>
                    </td>
                </tr>
        )
    }
}

const mapStateToProps = state => {
    return {
        isBorderRdx: state.isBorderAttachment
    }
}

export default connect(mapStateToProps) (row_document_file)