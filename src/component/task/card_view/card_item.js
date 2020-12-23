import React from 'react'
import { faCalendarAlt, faCheckCircle, faFile, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertDate_dd_mmm_yyy } from '../../../function/function';
import {check_circle as CheckCircle} from '../../icon/icon'

class card_item extends React.Component{

    colorStatus(a){
        let color =  ""
        let a2 = parseInt(a)
        // console.log(a+" "+a2)
        this.props.dataStatus.map(dt => {
            // console.log(dt.id)
            if(a2 == dt.id){
                // console.log("sasasasasa")
                let colorStatus = (dt.color == null) ? "#000" : dt.color
                color = colorStatus
            }
        })
        return color
    }

    render(){
        const labelView = this.props.labelModule.map(dt => {
            return <div style={{float: "left", padding: "5px", background: dt.color, color: "#FFF", fontSize: "11px", borderRadius: "3px", display: "flex", alignItems: "center", marginRight: "5px", marginBottom: "3px"}}>
                         <FontAwesomeIcon icon={faTag}/>&nbsp;{dt.label}
                    </div>
        })

        const assigned = this.props.assignedModule.map(dt => {
            let initial = ""
            let name = dt.userName.split(" ")
            
            initial += name[0].substr(0, 1)
            initial += (name[1] != null && name[1] != "") ? name[1].substr(0, 1) : ""

            return <div className="main-color ass-tooltip" style={{width: "30px", height: "30px", borderRadius: "100%", marginRight: "5px"}}>
                        <div style={{color: "#FFF", fontSize: "12px", textAlign: "center", marginTop: "7px"}}>
                            {initial}
                        </div>
                        <div className="ass-tooltiptext main-border" style={{marginTop: "10px", marginLeft: "15px"}}>
                            <div className="bold">{dt.userName}</div>
                            <div className="second-font-color" style={{fontSize: "11px"}}>{dt.emailUser}</div>
                        </div>
                    </div>
        })

        return(
            <div onClick={() => this.props.select(this.props.moduleId)} 
                onContextMenu={(e) => this.props.contextMenuModule(e, this.props.moduleId)}
                className="main-border card-item" 
                style={{marginTop: "10px", padding: "10px", borderRadius: "3px", width: "280px", background: "#FFF"}}>
                
                <div style={{display: "flex"}}>
                    {/* <i class="fas fa-clipboard" style={{color: "rgb(212, 174, 43)", marginTop: "5px"}}></i> */}
                    <CheckCircle style={{fontSize: "16px", color: this.colorStatus(this.props.status) /*color: "#777777"*/}}/>
                    <div style={{marginLeft: "10px"}}>
                        <div id="base-dt-label-card" style={{overflow: "hidde"}}>{labelView}</div>
                        
                        <div className="bold" style={{fontSize: "14px", marginBottom: "2px"}}>
                            {this.props.moduleName}
                        </div>
                        <div style={{display: "flex", fontSize: "11px"}}>
                            <div className="second-font-color">
                                <FontAwesomeIcon icon={faCalendarAlt}/>&nbsp;&nbsp;{convertDate_dd_mmm_yyy(this.props.dueDate)}
                            </div>

                            &nbsp;&nbsp;&nbsp;&nbsp;
                            
                            {
                                (this.props.countBugs > 0)
                                ?
                                    (this.props.countBugs <= this.props.countBugsClose)
                                    ?
                                        <div className="m-tooltip">
                                            <div className="main-border second-font-color m-tooltiptext">All checklist is checked</div>
                                            <div><FontAwesomeIcon style={{fontSize: "12px", color: "green"}} icon={faCheckCircle}/></div>    
                                        </div>
                                    :
                                        <div className="m-tooltip">
                                            <div className="main-border second-font-color m-tooltiptext">This module have cheklist</div>
                                            <div><FontAwesomeIcon style={{fontSize: "12px", color: "red"}} icon={faCheckCircle}/></div>    
                                        </div>
                                :
                                    ""
                            }
                            

                            &nbsp;&nbsp;

                            {
                                (this.props.countDocFile > 0)
                                ?
                                    <div className="m-tooltip">
                                        <div className="main-border second-font-color m-tooltiptext">This module have document file</div>
                                        <div><FontAwesomeIcon style={{color: "#d4ae2b", fontSize: "12px"}} icon={faFile}/></div>    
                                    </div>
                                :
                                    ""
                            }    
                            
                        </div>
                    </div>
                </div>
                <div style={{fontSize: "12px", marginTop: "7px", marginLeft: "25px"}}>
                    
                    {
                        (this.props.description != "")
                        ?
                            <div style={{marginBottom: "10px"}}>{this.props.description}</div>
                        :
                            <div className="second-font-color" style={{paddingTop: "5px", paddingBottom: "5px", fontSize: "11px", color: "#969696"}}>
                                No description for this module
                            </div>
                            
                    }
                    
                </div>
                <div style={{display: "flex", marginTop: "5px", marginLeft: "25px"}}>
                    {assigned}
                </div>
            </div>
        )
    }
}

export default card_item