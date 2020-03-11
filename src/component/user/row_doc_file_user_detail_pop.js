import React from 'react'

class row_doc_file_user_detail_pop extends React.Component{
    render(){
        return(
            <tr valign="top">
                <td>
                    <i class="fa fa-file" style={{color: "rgb(212, 174, 43)", marginRight: "5px", marginTop: "5px"}}></i>
                </td>
                <td className="main-border-bottom">
                    <a className="bold">{this.props.fileName}</a>
                    <div style={{marginTop: "3px"}}>
                    {
                        (this.props.description != "" && this.props.description != null)
                        ?
                            this.props.description
                        :
                            <span>No description for this document file</span>
                    }
                    </div>
                </td>
            </tr>
        )
    }
}

export default row_doc_file_user_detail_pop