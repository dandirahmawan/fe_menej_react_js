import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faUser, faEdit} from '@fortawesome/free-solid-svg-icons'
import {convertDate_dd_MMM_yyy, getCookieUserId} from '../../function/function'

class row_expand_view extends React.Component{
    render(){
        const checkBg = this.props.no % 2
        const rowColor = (checkBg == 0) ? "#f5f5f5" : "#FFF"
        return(
            <tr valign="top" className="tr-selectable tb-note-expand main-border-top" style={{background: rowColor,}}>
                <td style={{width: "20px"}}>
                    <i class="fa fa-sticky-note tooltip" style={{color: "green", fontSize: "14px"}}></i>
                </td>
                <td className="tb-note-expand" style={{paddingRight: "10px"}}>
                    <div dangerouslySetInnerHTML={ {__html: this.props.note} }/>
                    <div className="bold second-font-color" style={{fontSize: "11px", marginTop: "3px"}}>
                        <FontAwesomeIcon icon={faUser}/> {this.props.userName}
                    </div>
                </td>
                <td className="tb-note-expand" style={{width:"110px"}}>
                    {convertDate_dd_MMM_yyy(this.props.createdDate)}
                </td>
                <td className="tb-note-expand" style={{width:"50px"}}>
                    {
                        (this.props.pic == getCookieUserId())
                        ?
                            <React.Fragment>
                                <a onClick={() => this.props.deleteNote(this.props.noteId)} className="tooltip" style={{marginRight: "5px"}}>
                                    <FontAwesomeIcon icon={faTrash} className="tooltip" style={{color: "#000"}}></FontAwesomeIcon>
                                </a>
                                <a onClick={() => this.props.editNote(this.props.noteId, this.props.note)} className="tooltip">
                                    <FontAwesomeIcon icon={faEdit} className="tooltip" style={{color: "#000"}}/>
                                </a>
                            </React.Fragment>
                        :
                            (this.props.userId == getCookieUserId())
                            ?
                                <React.Fragment>
                                    <a onClick={() => this.props.deleteNote(this.props.noteId)} className="tooltip" style={{marginRight: "5px"}}>
                                        <FontAwesomeIcon icon={faTrash} className="tooltip" style={{color: "#000"}}/>
                                    </a>
                                    <a onClick={() => this.props.editNote(this.props.noteId, this.props.note)} className="tooltip">
                                        <FontAwesomeIcon icon={faEdit} className="tooltip"/>
                                    </a>
                                </React.Fragment>
                            :
                                ""
                    }

                </td>
            </tr>
        )
    }
}

export default row_expand_view