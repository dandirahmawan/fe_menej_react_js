import React from 'react'

class row_document_file_profile extends React.Component{

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
            <tr>
                <td style={{width: "20px"}}><i className="fa fa-file" style={{color: "#d4ae2b"}}></i></td>
                <td>
                    document_moduel.docx<br></br>
                    <span className="second-font-color">description of document and file is here</span>
                </td>
                <td>module name</td>
                <td>100 kb</td>
            </tr>
        )
    }
}

export default row_document_file_profile