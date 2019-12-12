import React from 'react'
import {baseUrl} from '../../const/const'
import {Spinner} from '../spinner'

class row_doc_file extends React.Component{

    byteToKb(size){
        var rtn = 0
        var mathFLoor = Math.floor(size / 1000)
        console.log(mathFLoor+" => 1")
        if(mathFLoor >= 1000){
            rtn = Math.floor(mathFLoor / 1000)
            rtn = rtn+" mb"
        }else{
            rtn = mathFLoor+" kb"
        }
        return rtn
    }

    getIconDocFIle(fileName){
        var a = fileName.split(".")
        var ext = a[a.length - 1]
        var rtn = ""
        if(ext == 'jpeg' || ext == 'jpg' || ext == 'png'){
            rtn = "image"
        }else{
            rtn = "doc file"
        }
        return rtn
    }

    render(){
        return(
            <tr className='tr-selectable row-doc-file'>
                <td style={{width: "20px", paddingTop: "7px"}}>
                    {
                        (this.getIconDocFIle(this.props.fileName) == 'image') ? <i className="fa fa-image"></i> : <i className="fa fa-file" style={{color: "#d4ae2b"}}></i>
                    }
                </td>
                <td style={{width: "70%", paddingRight: "10px"}}>
                    <a onClick={(e) => this.props.rowClickDocFile(e, this.props.fileName)} href={baseUrl+"/file/"+this.props.fileName} style={{color: "#000"}}>{this.props.fileName}</a>
                    <div className="second-font-color" style={{fontSize: "11px"}}>ini adalah description dari document file</div>
                </td>
                <td className='second-font-color' style={{paddingRight: "5px"}} align="right">
                    {this.byteToKb(this.props.fileSize)}
                </td>
                <td className='second-font-color' style={{paddingRight: "5px"}} align="right">
                    <button onClick={(e) => this.props.delete(e, this.props.fileName)} style={{background: "none", padding: "0px"}}><i class="fa fa-trash"></i></button>
                </td>
            </tr>
        )
    }
}

export default row_doc_file