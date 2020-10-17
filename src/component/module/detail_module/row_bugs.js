import { faCalendarAlt, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment } from 'react'
import { getCookieUserId, convertDate_dd_mmm_yyy } from '../../../function/function'

class row_bugs extends React.Component{

    checkBox = React.createRef()

    render(){
        return(
            <tr className='tr-selectable' /*onContextMenu={(e) => this.props.ctxMenu(e, this.props.bugsText)}*/>
                <td valign="top" style={{width: "20px"}}>
                    <a ref={this.checkBox} onClick={() => this.props.checkingBugs(this.props.bugsId)}>
                        {
                            (this.props.bugStatus == "C")
                            ?
                                <i class="fa fa-check-square ck-box-fa-checked"></i>
                            :
                                <i class="far fa-square ck-box-fa"></i>
                        }
                    </a>
                </td>
                <td valign="top" style={{paddingRight: "10px", paddingTop: "8px"}}>
                    {this.props.bugsText}
                    <div className="bold" style={{marginTop: "3px", fontSize: "10px"}}>
                    <span className="bold second-font-color">
                        <FontAwesomeIcon  icon={faCalendarAlt}/>&nbsp;{convertDate_dd_mmm_yyy(this.props.createDate)}
                    </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {
                            (this.props.picProject == getCookieUserId() || this.props.isPermition)
                            ?
                                <Fragment>
                                    <a onClick={() => this.props.deleteBugs(this.props.bugsId)}><FontAwesomeIcon icon={faTrashAlt}/> Delete</a>
                                    {/* &nbsp;&nbsp;&nbsp; */}
                                    {/* <a onClick={() => this.props.deleteBugs(this.props.bugsId)}><FontAwesomeIcon icon={faEdit}/> Edit</a> */}
                                </Fragment>
                            :
                                ''
                        }
                    </div>
                </td>
            </tr>
        )
    }
}

export default row_bugs