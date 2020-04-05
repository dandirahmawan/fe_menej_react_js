import React from 'react'
import NoteModule from '../note/note'

class row_module extends React.Component{

    constructor(){
        super()
        this.state = {
            noteBaseVisible: false
        }
        this.noteClick = this.noteClick.bind(this)
        this.updateStateDataNote = this.updateStateDataNote.bind(this)
    }

    moduleStatus(a){
        var v = ""
        if(a == 'P'){
            v = "On Progress"
        }else{
            v = "Closed"
        }
        return v
    }

    colorStatus(a){
        var v = ""
        if(a == "P"){
            v = "#cea827"
        }else{
            v = "#4eab2f"
        }
        return v
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
                                    {this.props.userName}&nbsp; 
                                    {
                                        this.props.isMember == 0 ? 
                                        <i style={{color: "red", fontSize: "12px"}} alt='sasas' class="fa fa-exclamation-circle tooltip"><span class="tooltiptext">this user not available</span></i> 
                                        : ''
                                    }
                                </td>
                                <td className="tb-border-mod main-border">{this.convertDate(this.props.endDate)}</td>
                                <td className="bold tb-border-mod main-border" style={{color: this.colorStatus(this.props.modulStatus)}}>{this.moduleStatus(this.props.modulStatus)}</td>
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
                                    <a onClick={(e) => this.props.selected(e, this.props.moduleId)} className="bold">{this.props.modulName}</a>
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
                                    {this.props.userName}&nbsp; 
                                    {
                                        this.props.isMember == 0 ? 
                                        <i style={{color: "red", fontSize: "12px"}} alt='sasas' class="fa fa-exclamation-circle tooltip"><span class="tooltiptext">this user not available</span></i> 
                                        : ''
                                    }
                                </td>
                                <td className="tb-border-mod">{this.convertDate(this.props.endDate)}</td>
                                <td className="bold tb-border-mod" style={{color: this.colorStatus(this.props.modulStatus)}}>{this.moduleStatus(this.props.modulStatus)}</td>
                                <td className="bold tb-border-mod">
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
                        ""
                }
            </React.Fragment>
            
        )
    }
}

export default row_module