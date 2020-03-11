import React from 'react'
import {convertDate_dd_MMM_yyy, getCookieUserId} from '../../function/function'

class row_note extends React.Component{
    render(){
        return(
            <tr valign="top">
                <td className="bold">{this.props.no}.</td>
                <td>
                    {this.props.note}
                    <div className="second-font-color" style={{marginTop: "5px", fontSize: "11px"}}>
                        <span style={{marginRight: "20px"}}>{convertDate_dd_MMM_yyy(this.props.createdDate)}</span>
                        {
                            (this.props.pic == getCookieUserId())
                            ?
                                <a onClick={() => this.props.deleteNote(this.props.noteId)}>Delete</a>
                            :
                                (this.props.userId == getCookieUserId())
                                ?
                                    <a onClick={() => this.props.deleteNote(this.props.noteId)}>Delete</a>
                                :
                                    ""
                        }

                    </div>
                </td>
            </tr>
        )
    }
}

export default row_note