import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
class label_module_detail_item extends React.Component{
    render(){
        return(
            <div className="hvr-lbl-bs" style={{display: "flex", alignItems: "center", marginBottom: "5px", float: "left"}}>
                <div style={{width: "30px"}}>
                    <a onClick={() => this.props.selectLabel(this.props.label)}>
                        {
                            (this.props.isChecked)
                            ?
                                <i class="fa fa-check-square ck-box-fa-checked"></i>
                            :
                                <i class="far fa-square ck-box-fa"></i>
                        }
                    </a>
                </div>

                <div style={{width: "100%", display: "flex", marginRight: "10px", alignItems: "center"}}>   
                    <div style={{padding: "7px", background: this.props.color, color: "#FFF", borderRadius: "3px", width: "100%", position: "relative"}}>
                        {
                            (this.props.labelPermition)
                            ?
                                <a className="btn-del-lbl" onClick={() => this.props.deleteLabel(this.props.label)} style={{marginLeft: "5px", position: "absolute", right: "0px", top: "0px"}}>
                                    <div style={{background: "#000",
                                                opacity: "0.2",
                                                width: "14px",
                                                height: "28px",
                                                }}>
                                        
                                    </div>
                                    <FontAwesomeIcon className="second-font-color" style={{position: "absolute", top: "8px", left: "2px", color: "#FFF", fontSize: "11px"}} icon={faTrashAlt}/>
                                </a>
                            :
                                ""
                        }
                        {this.props.label}
                    </div>
                </div>
            </div>
        )
    }
}

export default label_module_detail_item