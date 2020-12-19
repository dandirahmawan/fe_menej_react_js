import React, { Fragment } from 'react'
import NoteModule from '../../note/note'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faClipboard, faTag, faCheckCircle, faFile } from '@fortawesome/free-solid-svg-icons'
import {check_circle as CkCIrcle} from '../../icon/icon'

class list_row extends React.Component{

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
        const classNameRow = (this.props.isSelected) ? "tr-module-data tr-selectable selected-row main-border-bottom" : "tr-module-data tr-selectable main-border-bottom"
        const labelView = this.props.dataLabelModule.map(dt => {
            return <span style={{padding: "3px", 
                                background: dt.color, 
                                color: "#FFF", 
                                fontSize: "11px", 
                                borderRadius: "3px",
                                alignItems: "center", 
                                marginRight: "2px"}}>
                         <FontAwesomeIcon icon={faTag}/>
                    </span>
        })

        /*set assigned kolom data*/
        let assigned = this.props.assigned.map(dt => {            
            if(dt.moduleId == this.props.moduleId){
                let initial = ""
                let name = dt.userName.split(" ")
                
                initial += name[0].substr(0, 1)
                initial += (name[1] != null && name[1] != "") ? name[1].substr(0, 1) : ""
                
                return <Fragment>
                            <div className="main-color ass-tooltip" 
                                style={{width: "25px", 
                                        height: "25px", 
                                        borderRadius: "100%",
                                        color: "#FFF",
                                        marginRight: "5px"}}>
                                <div style={{with: "30px", textAlign: "center", marginTop: "5px", fontSize: "11px"}}>{initial}</div>
                                <div className="ass-tooltiptext main-border">
                                    <div className="bold">{dt.userName}</div>
                                    <div className="second-font-color" style={{fontSize: "11px"}}>{dt.emailUser}</div>
                                </div>
                            </div>
                        </Fragment>
            }
        })

        return(
            <React.Fragment>
                {
                    (this.props.isDelete == "N") 
                    ? 
                        (this.props.isBorder)
                        ?
                            <tr onClick={() => this.props.selectedRow(this.props.moduleId)} 
                                valign="center"
                                style={{background: "#e6e6e6"}}
                                className={classNameRow+" main-border"} 
                                valign="middle" is-selected="false">
                                
                                <td className="tb-border-mod main-border" style={{width: "20px"}}>
                                    <i className="fas fa-clipboard" style={{fontSize: "14px", color: "#d4ae2b"}}></i>
                                </td>
                                <td className="tb-border-mod main-border">
                                    {/* {
                                        (this.props.dataLabelModule.length > 0)
                                        ?
                                            <div style={{overflow: "hidden", marginBottom: "3px"}}>
                                                {labelView} 
                                            </div>
                                        :
                                            ""
                                    } */}

                                    <span className="bold">{this.props.modulName}</span>
                                    {/* <div style={{width: "400px", color: "#8e8e8e"}}>
                                        {
                                            (this.props.description != null && this.props.description != "")
                                            ?   
                                                <div style={{marginTop: "3px", fontSize: "12px"}}>{this.props.description}</div>
                                            :
                                                <span style={{fontSize: "12px", color: "#CCC"}}>No description for this module</span>
                                        }
                                    </div> */}
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
                                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        {assigned}
                                    </div>
                                </td>
                                <td className="tb-border-mod main-border">
                                    <FontAwesomeIcon style={{marginRight: "5px"}} className="second-font-color" icon={faCalendarAlt}/>
                                    {this.convertDate(this.props.endDate)}
                                </td>
                                <td className="tb-border-mod main-border" style={{background: this.colorStatus(this.props.modulStatus), textAlign: "center"}}>
                                    <div style={{color: "#FFF", padding: "5px", borderRadius: "3px", float: "left", fontSize: "11px"}}>
                                        {this.moduleStatus(this.props.modulStatus)}
                                    </div>
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
                            <tr onClick={() => this.props.selectedRow(this.props.moduleId)} 
                                onContextMenu={(e) => this.props.contextMenuModule(e, this.props.moduleId)}
                                className={classNameRow} 
                                valign="middle" 
                                data-module={this.props.modulId} 
                                is-selected="false">
                                
                                <td className="tb-border-mod" style={{width: "25px"}}>
                                    <CkCIrcle style={{color: this.colorStatus(this.props.modulStatus), fontSize: "16px"}}/>
                                </td>
                                <td className="tb-border-mod">
                                    {/* {
                                        (this.props.dataLabelModule.length > 0)
                                        ?
                                            <div style={{overflow: "hidden", marginBottom: "3px"}}>
                                                {labelView} 
                                            </div>
                                        :
                                            ""
                                    } */}
                                    
                                    <div className="bold">{this.props.modulName}</div>
                                    {
                                        (this.props.showDescription)
                                        ?
                                            <div style={{color: "#8e8e8e"}}>
                                                {
                                                    (this.props.description != null && this.props.description != "")
                                                    ?   
                                                        <div style={{marginTop: "3px", fontSize: "12px"}}>{this.props.description}</div>
                                                    :
                                                        ""
                                                }
                                            </div>
                                        :
                                            ""
                                    }
                                   

                                    {/* {
                                        (this.state.noteBaseVisible) 
                                        ?
                                            <NoteModule
                                                countNote={this.props.countNote}
                                                moduleId={this.props.moduleId}
                                                moduleName={this.props.modulName}
                                            />
                                        : ""
                                    } */}
                                    
                                </td>
                                <td style={{width: "100px"}}>
                                     {
                                        (this.props.dataLabelModule.length > 0)
                                        ?
                                            <div style={{overflow: "hidden", display: "flex", justifyContent: "center"}}>
                                                {labelView} 
                                            </div>
                                        :
                                            ""
                                    }
                                </td>
                                <td className="tb-border-mod" style={{width: "150px"}}>
                                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        {assigned}
                                    </div>
                                </td>
                                <td style={{width: "90px", textAlign: "center"}} className="tb-border-mod">
                                    <FontAwesomeIcon icon={faCalendarAlt} style={{marginRight: "5px"}} className="second-font-color"/>
                                    {this.convertDate(this.props.endDate)}
                                </td>
                                <td className="tb-border-mod" style={{/*background: this.colorStatus(this.props.modulStatus),*/ textAlign: "center", paddingLeft: "0px", width: "100px"}}>
                                    <div className="bold" style={{color: "#000", fontSize: "12px"}}>
                                        {this.moduleStatus(this.props.modulStatus)}
                                    </div>
                                </td>
                                <td className="bold tb-border-mod" style={{width: "40px"}}>
                                    {
                                        (this.props.countBugs > 0) 
                                        ? 
                                            (this.props.countBugsClose < this.props.countBugs)
                                            ?
                                                <a onClick={(e) => this.props.selected(e, this.props.moduleId)}>
                                                    <div className="m-tooltip">
                                                        <div className="main-border second-font-color m-tooltiptext">This module have cheklist</div>
                                                        <div><FontAwesomeIcon style={{fontSize: "14px", color: "red"}} icon={faCheckCircle}/></div>    
                                                    </div>
                                                </a>
                                            :
                                                <a onClick={(e) => this.props.selected(e, this.props.moduleId)}>
                                                    <div className="m-tooltip">
                                                        <div className="main-border second-font-color m-tooltiptext">All checklist is checked</div>
                                                        <div><FontAwesomeIcon style={{fontSize: "14px", color: "green"}} icon={faCheckCircle}/></div>    
                                                    </div>
                                                </a>
                                        :
                                            ""
                                   
                                    }
                                    {
                                        (this.props.countDoc > 0) 
                                        ? 
                                            <a onClick={(e) => this.props.selected(e, this.props.moduleId)}>
                                                <div className="m-tooltip">
                                                    <div className="main-border second-font-color m-tooltiptext">This module have document file</div>
                                                    <div><FontAwesomeIcon style={{color: "#d4ae2b", fontSize: "14px"}} icon={faFile}/></div>    
                                                </div>
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

export default list_row