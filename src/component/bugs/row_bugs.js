import React,{Component} from 'react'
import Note from '../note/note'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faTimes, faCheck, faEdit} from '@fortawesome/free-solid-svg-icons'
import {convertDate, getCookieUserId} from '../../function/function'

class row_bugs extends Component{

    constructor(){
        super()
        this.state = {
            note: false,
            popup:"",
            bugsIdDelete:"",
            mouseOver: false
        }

        this.btnEdit = React.createRef()
        this.textBugs = React.createRef()
        this.noteBugs = this.noteBugs.bind(this)
        this.mouseOver = this.mouseOver.bind(this)
        this.mouseLeave = this.mouseLeave.bind(this)
    }

    noteBugs(){
        this.setState({
            note: true
        })
    }

    mouseOver(){
        this.setState({
            mouseOver : true
        })
    }

    mouseLeave(){
        this.setState({
            mouseOver : false
        })
    }

    render(){

        const btnEdit = <button ref={this.btnEdit} onClick={() => this.props.editBugs(this.props.bugsId, this.props.moduleId, this.props.bugs)} style={{fontSize: "10px", color: "#000", padding: "2px", width: "20px", marginLeft: "3px", background: "none"}}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </button>

        return(
            <React.Fragment>
                {this.state.popup}
                {
                    (this.props.isBorder)
                    ?
                        <tr className="tr-selectable tb-border main-border" onMouseOver={this.mouseOver} onMouseLeave={this.mouseLeave} valign="top">
                            <td className="tb-border main-border" style={{fontSize: "14px", width: "40px"}}>
                                {
                                    (this.props.bugStatus != "C")
                                    ?
                                        <i class="fa fa-exclamation-triangle" style={{color: "red"}}></i>
                                    :
                                        <i class="fa fa-exclamation-triangle" style={{color: "green"}}></i>
                                }
                                {
                                    (this.props.countNote > 0)
                                    ?
                                        <a onClick={this.noteBugs}><i class="fa fa-sticky-note tooltip" style={{marginLeft: "5px", color: "green"}}>
                                            <span className="tooltiptext">This bugs have notes</span>
                                        </i></a>
                                    :
                                        <a onClick={this.noteBugs}><i class="fa fa-sticky-note tooltip second-font-color" style={{marginLeft: "5px"}}>
                                            <span className="tooltiptext">Add note</span>
                                        </i></a>
                                }
                            </td>
                            <td className="tb-border main-border">
                                <span ref={this.textBugs}>{this.props.bugs}</span>
                                {
                                    (this.state.mouseOver)
                                    ?
                                        (this.props.isPermition || this.props.pic == getCookieUserId())
                                        ?
                                            btnEdit
                                        :
                                            ""
                                    :
                                        ""
                                }
                                {
                                    (this.state.note)
                                    ?
                                        <Note
                                            moduleId={this.props.moduleId}
                                            countNote={this.props.countNote}
                                            bugsId={this.props.bugsId}
                                            bugsText={this.props.bugs}
                                        />
                                    :
                                        ""
                                }
                            </td>
                            <td className="tb-border main-border" style={{minWidth: "150px"}}>
                                <a onClick={() => this.props.moduleCLick(this.props.moduleId)}>{this.props.moduleName}</a>
                            </td>
                            <td className="tb-border main-border" style={{minWidth: "150px"}}>Dandi Rahmawan</td>
                            <td className="tb-border main-border" style={{width: "70px"}}>{convertDate(this.props.createDate)}</td>
                            <td className="tb-border">
                                {
                                    (this.props.isPermition || this.props.pic == getCookieUserId())
                                    ?
                                        <div style={{width: "45px"}}>
                                            {
                                                (this.props.bugStatus != "C")
                                                    ?
                                                    <button className="btn-secondary" onClick={() => this.props.closeBugs(this.props.bugsId, this.props.moduleId)} style={{fontSize: "10px", color: "red", padding: "2px", width: "20px"}}>
                                                        <FontAwesomeIcon icon={faTimes}/>
                                                    </button>
                                                    :
                                                    <button className="btn-secondary" onClick={() => this.props.uncloseBugs(this.props.bugsId, this.props.moduleId)} style={{fontSize: "10px", color: "green",padding: "2px", width: "20px"}}>
                                                        <FontAwesomeIcon icon={faCheck}/>
                                                    </button>
                                            }
                                            <button className="btn-secondary" onClick={() => this.props.deleteBugs(this.props.bugsId, this.props.moduleId)} style={{fontSize: "10px", color: "#926161", padding: "2px", width: "20px", marginLeft: "3px"}}>
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </button>
                                        </div>
                                    :
                                        ""
                                }
                            </td>
                        </tr>
                    :
                        <tr className="tr-selectable tb-border" onMouseOver={this.mouseOver} onMouseLeave={this.mouseLeave} valign="top">
                            <td className="tb-border" style={{fontSize: "14px", width: "40px"}}>
                                {
                                    (this.props.bugStatus != "C")
                                    ?
                                        <i class="fa fa-exclamation-triangle" style={{color: "red"}}></i>
                                    :
                                        <i class="fa fa-exclamation-triangle" style={{color: "green"}}></i>
                                }
                                {
                                    (this.props.countNote > 0)
                                    ?
                                        <a onClick={this.noteBugs}><i class="fa fa-sticky-note tooltip" style={{marginLeft: "5px", color: "green"}}>
                                            <span className="tooltiptext">This bugs have {this.props.countNote} notes</span>
                                        </i></a>
                                    :
                                        <a onClick={this.noteBugs}><i class="fa fa-sticky-note tooltip second-font-color" style={{marginLeft: "5px"}}>
                                            <span className="tooltiptext">Add note</span>
                                        </i></a>
                                }
                            </td>
                            <td className="tb-border" style={{paddingRight: "10px"}}>
                                <span ref={this.textBugs}>{this.props.bugs}</span>
                                {
                                    (this.state.mouseOver)
                                        ?
                                            (this.props.isPermition || this.props.pic == getCookieUserId())
                                            ?
                                                btnEdit
                                            :
                                                ""
                                        :
                                        ""
                                }
                                {
                                    (this.state.note)
                                    ?
                                        <Note
                                            moduleId={this.props.moduleId}
                                            countNote={this.props.countNote}
                                            bugsId={this.props.bugsId}
                                            bugsText={this.props.bugs}
                                        />
                                    :
                                        ""
                                }
                                
                            </td>
                            <td className="tb-border" style={{minWidth: "150px"}}>
                                <a onClick={() => this.props.moduleCLick(this.props.moduleId)}>{this.props.moduleName}</a>
                            </td>
                            <td className="tb-border" style={{minWidth: "150px"}}>Dandi Rahmawan</td>
                            <td className="tb-border">{convertDate(this.props.createDate)}</td>
                            <td className="tb-border">
                                {
                                    (this.props.isPermition || this.props.pic == getCookieUserId())
                                    ?
                                        <div style={{width: "45px"}}>
                                            {
                                                (this.props.bugStatus != "C")
                                                ?
                                                    <button className="btn-secondary" onClick={() => this.props.closeBugs(this.props.bugsId, this.props.moduleId)} style={{fontSize: "10px", color: "red", padding: "2px", width: "20px"}}>
                                                        <FontAwesomeIcon icon={faTimes}/>
                                                    </button>
                                                :
                                                    <button className="btn-secondary" onClick={() => this.props.uncloseBugs(this.props.bugsId, this.props.moduleId)} style={{fontSize: "10px", color: "green",padding: "2px", width: "20px"}}>
                                                        <FontAwesomeIcon icon={faCheck}/>
                                                    </button>
                                            }
                                            <button className="btn-secondary" onClick={() => this.props.deleteBugs(this.props.bugsId, this.props.moduleId)} style={{fontSize: "10px", color: "#926161", padding: "2px", width: "20px", marginLeft: "3px"}}>
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </button>
                                        </div>
                                    :
                                        ""
                                }
                            </td>
                        </tr>
                }
            </React.Fragment> 
        )
    }
}

export default row_bugs