import React from 'react'
import PreviewImage from "../preview_image"
import {baseUrl} from "../../const/const"

class row_doc_file_user_detail_pop extends React.Component{

    constructor(){
        super()
        this.state = {
            popup: null
        }

        this.rowClickDocFile = this.rowClickDocFile.bind(this)
        this.hideImage = this.hideImage.bind(this)
    }

    rowClickDocFile(e, fileName, url){
        var a = fileName.lastIndexOf(".")
        var ext = fileName.substr(parseInt(a) + 1, fileName.length)
        if(ext == 'jpeg' || ext == 'jpg' || ext == 'png'){
            e.preventDefault()
            document.getElementById("base-pop-usr-dtl").style.overflowY = "hidden"
            this.setState({
                popup : <PreviewImage image={fileName} hideImage={this.hideImage} url={url}/>
            })
        }else{
            window.open(baseUrl+"/file/"+url)
        }
    }

    url(url){
        let url2 = url.replace("..\\upload\\", "")
        let url21 = url2.replace("../upload/", "")
        return url21
    }

    hideImage(){
        document.getElementById("base-pop-usr-dtl").style.overflowY = "scroll"
        this.setState({
            popup: null
        })
    }

    render(){
        return(
            <React.Fragment>
                {this.state.popup}
                <tr valign="top">
                    <td>
                        <i class="fa fa-file" style={{color: "rgb(212, 174, 43)", marginRight: "5px", marginTop: "5px"}}></i>
                    </td>
                    <td className="main-border-bottom">
                        <a onClick={(e) => this.rowClickDocFile(e, this.props.fileName, this.url(this.props.path))} className="bold">
                            {this.props.fileName}
                        </a>
                        <div style={{marginTop: "3px"}}>
                        {
                            (this.props.description != "" && this.props.description != null)
                            ?
                                <span style={{fontSize: "11px"}}>{this.props.description}</span>
                            :
                                <span style={{fontSize: "11px"}}>No description for this document file</span>
                        }
                        </div>
                    </td>
                </tr>
            </React.Fragment>
        )
    }
}

export default row_doc_file_user_detail_pop