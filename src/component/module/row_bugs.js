import React from 'react'
import { getCookieUserId, convertDate } from '../../function/function'

class row_bugs extends React.Component{
    render(){
        return(
            <tr className='tr-selectable' /*onContextMenu={(e) => this.props.ctxMenu(e, this.props.bugsText)}*/>
                <td valign="top" style={{width: "20px", paddingTop: "7px"}}>
                    {
                        (this.props.bugStatus != "C")
                        ?
                            <i class="fa fa-exclamation-triangle" style={{color: "red"}}></i>
                        :
                            <i class="fa fa-exclamation-triangle" style={{color: "green"}}></i>
                    }
                </td>
                <td valign="top" style={{width: "65%", paddingRight: "10px"}}>
                    {this.props.bugsText}
                    <div className="bold" style={{marginTop: "3px", fontSize: "11px"}}>
                        {
                            (this.props.picProject == getCookieUserId() || this.props.isPermition)
                            ?
                                <React.Fragment>
                                    {
                                        (this.props.bugStatus != "C")
                                        ?
                                            <a onClick={() => this.props.closeBugs(this.props.bugsId)} className="second-font-color">close</a>
                                        :
                                            <a onClick={() => this.props.uncloseBugs(this.props.bugsId)} className="second-font-color">unclose</a>
                                    }
                                    &nbsp;&nbsp;&nbsp;
                                    <a onClick={() => this.props.editBugs(this.props.bugsId, this.props.bugsText)} className="second-font-color">edit</a>
                                    &nbsp;&nbsp;&nbsp;
                                    <a onClick={() => this.props.deleteBugs(this.props.bugsId)} className="second-font-color">delete</a>
                                </React.Fragment>
                            :
                                ''
                        }
                    </div>
                </td>
                <td valign="top" className='second-font-color'>
                    {convertDate(this.props.createDate)}
                </td>
            </tr>
        )
    }
}

export default row_bugs