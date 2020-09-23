import React from 'react'
import {baseUrl} from '../../const/const'
import {Spinner} from '../spinner'
import ReactDom from 'react-dom'
import { getCookieUserId, getIconDocFIle } from '../../function/function'

class row_doc_file extends React.Component{

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

    urlPath(url){
        let url2 = url.replace("..\\upload\\", "")
        let url21 = url2.replace("../upload/", "")
        return url21
    }

    render(){
        return(
            <tr className='tr-selectable row-doc-file'>
                <td style={{width: "20px", paddingTop: "7px"}}>
                    <div ref={this.baseIcon}></div>
                    {/* {this.getIconDocFIle(this.props.fileName)} */}
                    {/* <i className={this.getIconDocFIle(this.props.fileName)} 
                        style={(this.getIconDocFIle(this.props.fileName) == "fa fa-file" ? {color: "#d4ae2b"} : {})}></i> */}
                </td>
                <td style={{width: "70%", paddingRight: "10px"}}>
                    <a onClick={(e) => this.props.rowClickDocFile(e, this.props.fileName, this.urlPath(this.props.path))} style={{color: "#000"}}>{this.props.fileName}</a>
                    <div className="second-font-color" style={{fontSize: "11px"}}>
                        {
                            (this.props.descFile != null && this.props.descFile != "")
                            ?
                                this.props.descFile
                            :
                                ''
                        }
                    </div>
                </td>
                <td className='second-font-color' style={{paddingRight: "5px"}} align="right">
                    {this.byteToKb(this.props.fileSize)}
                </td>
                <td className='second-font-color' style={{paddingRight: "5px"}} align="right">
                    {
                        (this.props.isPermition || this.props.picProject == getCookieUserId())
                        ?
                            <button onClick={(e) => this.props.delete(e, this.props.fileName)} style={{background: "none", padding: "0px"}}><i class="fa fa-trash"></i></button>
                        :
                            ""
                    }
                </td>
            </tr>
        )
    }
}

export default row_doc_file