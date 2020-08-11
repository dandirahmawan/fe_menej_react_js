import React from 'react'
import NoteModule from '../note/note'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons'

class row_module extends React.Component{

    constructor(){
        super()
        this.state = {
            noteBaseVisible: false
        }
        this.noteClick = this.noteClick.bind(this)
        this.updateStateDataNote = this.updateStateDataNote.bind(this)
        this.moduleStatus = this.moduleStatus.bind(this)
    }

    colorStatus(a){
        let color =  ""
        this.props.dataStatus.map(dt => {
            if(a == dt.id){
                let colorStatus = (dt.color == null) ? "#000" : dt.color
                color = colorStatus
            }
        })
        return color
    }

    moduleStatus(id){
        let status =  ""
        this.props.dataStatus.map(dt => {
            if(id == dt.id){
                status = dt.status
            }
        })
        return status
    }

    convertDate(date){
        var d = new Date(date)
        var dt = d.toLocaleDateString("id-ID");
        return dt
    }

    noteClick(e){
        this.setState({
            noteBaseVisible: true 
        })
        e.stopPropagation()
    }

    updateStateDataNote(jsonObj){
        this.props.updateStateDataNote(jsonObj);
    }

    render(){
        
        const classNameRow = (this.props.isSelected) ? "tr-module-data tr-selectable selected-row" : "tr-module-data tr-selectable"

        return(
            <React.Fragment>
                {
                    (this.props.isDelete == "N") 
                    ? 
                        (this.props.isBorder)
                        ?
                            <tr onClick={(e) => this.props.selectedRow(e, this.props.moduleId)} className={classNameRow+" main-border"} valign="top" is-selected="false">
                                <td className="tb-border-mod main-border" style={{width: "40px"}}>
                                    <i className="fa fa-clipboard" style={{fontSize: "14px", color: "#d4ae2b"}}></i>
                                        {
                                            (this.props.countNote > 0) 
                                            ?
                                                <i onClick={this.noteClick} className="fa fa-sticky-note tooltip" style={{marginLeft: "5px", color: "green", fontSize: "14px"}}>
                                                    <span className="tooltiptext">This module have notes</span>
                                                </i>
                                            :
                                                <i onClick={this.noteClick} className="fa fa-sticky-note second-font-color tooltip" style={{marginLeft: "5px", fontSize: "14px"}}>
                                                    <span className="tooltiptext">Add notes</span>
                                                </i>  
                                        }
                                </td>
                                <td className="tb-border-mod main-border">
                                    <a onClick={(e) => this.props.selected(e, this.props.moduleId)} className="bold">
                                        {this.props.modulName}
                                    </a>
                                    <div style={{width: "400px", color: "#8e8e8e"}}>
                                        {
                                            (this.props.description != null && this.props.description != "")
                                            ?   
                                                <div style={{marginTop: "3px", fontSize: "11px"}}>{this.props.description}</div>
                                            :
                                                <span style={{fontSize: "11px"}}>no description for this module</span>
                                        }
                                    </div>
                                    {
                                        (this.state.noteBaseVisible) 
                                        ?
                                            <NoteModule
                                                countNote={this.props.countNote}
                                                moduleId={this.props.moduleId}
                                                moduleName={this.props.modulName}
                                            />
                                        : ""
                                    }
                                </td>
                                <td className="tb-border-mod main-border">
                                    {
                                        (this.props.isMember) 
                                        ?
                                            <div><FontAwesomeIcon className="second-font-color" icon={faUserAlt}/></div>
                                        :
                                            <div className="tooltip">
                                                <FontAwesomeIcon style={{color: "#F00"}} icon={faUserAlt}/>
                                                <span class="tooltiptext">this user not available</span>
                                            </div>
                                    }
                                    <div style={{float: "left", marginLeft: "20px", marginTop: "-13px"}}>
                                        {this.props.userName}
                                    </div>
                                </td>
                                <td className="tb-border-mod main-border">
                                    <FontAwesomeIcon style={{marginRight: "5px"}} className="second-font-color" icon={faCalendarAlt}/>
                                    {this.convertDate(this.props.endDate)}
                                </td>
                                <td className="tb-border-mod main-border" 
                                    style={{background: this.colorStatus(this.props.modulStatus), color: "#FFF"}}>
                                    {this.moduleStatus(this.props.modulStatus)}
                                </td>
                                <td className="bold tb-border-mod main-border">
                                    {
                                        (this.props.countBugs > 0) 
                                        ?
                                            (this.props.countBugsClose != this.props.countBugs)
                                            ?
                                                <a onClick={(e) => this.props.bugsIconClick(e, this.props.moduleId)}>
                                                    <i style={{color: "red", fontSize: "14px", marginRight: "5px"}} class="fa fa-exclamation-triangle tooltip"><span class="tooltiptext">this module have bugs</span></i>
                                                </a>
                                            :
                                                <a onClick={(e) => this.props.bugsIconClick(e, this.props.moduleId)}>
                                                    <i style={{
                                                        color: "green",
                                                        fontSize: "14px",
                                                        marginRight: "5px"
                                                    }}
                                                       className="fa fa-exclamation-triangle tooltip">
                                                        <span className="tooltiptext">all bugs is closed</span>
                                                    </i>
                                                </a>
                                        : 
                                            ""
                                    }
                                
                                    {
                                        (this.props.countDoc > 0) 
                                        ? 
                                            <a onClick={(e) => this.props.docFileIconClick(e, this.props.moduleId)}>
                                                <i style={{color: "#d4ae2b", fontSize: "14px"}} class="fa fa-file tooltip"><span class="tooltiptext">this module have some document file</span></i> 
                                            </a>
                                        : 
                                            ""
                                    }
                                </td>
                            </tr>
                        :
                            <tr onClick={(e) => this.props.selectedRow(e, this.props.moduleId)} className={classNameRow} valign="top" data-module={this.props.modulId} is-selected="false">
                                <td className="tb-border-mod" style={{width: "40px"}}>
                                    <i className="fa fa-clipboard" style={{fontSize: "14px", color: "#d4ae2b"}}></i>
                                        {
                                            (this.props.countNote > 0) 
                                            ?
                                                <i onClick={this.noteClick} className="fa fa-sticky-note tooltip" style={{marginLeft: "5px", color: "green", fontSize: "14px"}}>
                                                    <span className="tooltiptext">This module have notes</span>
                                                </i>
                                            :
                                                <i onClick={this.noteClick} className="fa fa-sticky-note second-font-color tooltip" style={{marginLeft: "5px", fontSize: "14px"}}>
                                                    <span className="tooltiptext">Add notes</span>
                                                </i>  
                                        }
                                </td>
                                <td className="tb-border-mod">
                                    <a onClick={(e) => this.props.selected(e, this.props.moduleId)} className="bold">
                                        {this.props.modulName}
                                    </a>
                                    <div style={{width: "400px", color: "#8e8e8e"}}>
                                        {
                                            (this.props.description != null && this.props.description != "")
                                            ?   
                                                <div style={{marginTop: "3px", fontSize: "11px"}}>{this.props.description}</div>
                                            :
                                                <span style={{fontSize: "11px"}}>no description for this module</span>
                                        }
                                    </div>
                                    {
                                        (this.state.noteBaseVisible) 
                                        ?
                                            <NoteModule
                                                countNote={this.props.countNote}
                                                moduleId={this.props.moduleId}
                                                moduleName={this.props.modulName}
                                            />
                                        : ""
                                    }
                                    
                                </td>
                                <td className="tb-border-mod">
                                    {
                                        (this.props.isMember) 
                                        ?
                                            <div><FontAwesomeIcon className="second-font-color" icon={faUserAlt}/></div>
                                        :
                                            <div className="tooltip">
                                                <FontAwesomeIcon style={{color: "#F00"}} icon={faUserAlt}/>
                                                <span class="tooltiptext">this user not available</span>
                                            </div>
                                    }
                                    <div style={{float: "left", marginLeft: "20px", marginTop: "-13px"}}>
                                        {this.props.userName}
                                    </div>
                                </td>
                                <td className="tb-border-mod">
                                    <FontAwesomeIcon icon={faCalendarAlt} style={{marginRight: "5px"}} className="second-font-color"/>
                                    {this.convertDate(this.props.endDate)}
                                </td>
                                <td className="tb-border-mod" 
                                    style={{background: this.colorStatus(this.props.modulStatus), color: "#FFF"}}>
                                    {this.moduleStatus(this.props.modulStatus)}
                                </td>
                                <td className="bold tb-border-mod">
                                    {
                                        (this.props.countBugs > 0) 
                                        ? 
                                            (this.props.countBugsClose < this.props.countBugs)
                                            ?
                                                <a onClick={(e) => this.props.bugsIconClick(e, this.props.moduleId)}>
                                                    <i style={{color: "red", fontSize: "14px", marginRight: "5px"}} class="fa fa-exclamation-triangle tooltip"><span class="tooltiptext">this module have bugs</span></i>
                                                </a>
                                            :
                                                <a onClick={(e) => this.props.bugsIconClick(e, this.props.moduleId)}>
                                                    <i style={{
                                                        color: "green",
                                                        fontSize: "14px",
                                                        marginRight: "5px"
                                                    }}
                                                    className="fa fa-exclamation-triangle tooltip">
                                                        <span className="tooltiptext">all bugs is closed</span>
                                                    </i>
                                                </a>
                                        :
                                            ""
                                    }
                                    {
                                        (this.props.countDoc > 0) 
                                        ? 
                                            <a onClick={(e) => this.props.docFileIconClick(e, this.props.moduleId)}>
                                                <i style={{color: "#d4ae2b", fontSize: "14px"}} class="fa fa-file tooltip"><span class="tooltiptext">this module have some document file</span></i> 
                                            </a>
                                        : 
                                            ""
                                    }
                                </td>
                            </tr>    
                    : 
                        ""
                }
            </React.Fragment>
            
        )
    }
}

export default row_module