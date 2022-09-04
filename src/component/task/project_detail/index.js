import React, { createRef } from 'react'
import { Component } from 'react';
import { faFolder, faCalendarAlt, faUserAlt, faKey, faCheckCircle, faFile, faUsersCog, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { convertDate_dd_MMM_yyy } from '../../../function/function';
import {check_circle as CkCIrcle} from '../../icon/icon'

class index extends Component{

    constructor(){
        super()
        this.state = {
            projectName: "",
            createdDate: new Date(),
            userName : "",
            picName : ""
        }
        this.refBase = createRef()
        this.handleClickOutside = this.handleClickOutside.bind(this)
    }

    componentDidMount(){
        // console.log(this.props.dataProject)
        this.setState({
            projectName: this.props.dataProject.projectName,
            createdDate: this.props.dataProject.createdDate,
            picName : this.props.dataProject.picName,
            userName : this.props.dataProject.userName
        })
        document.addEventListener("click", (e) => this.handleClickOutside(e))
    }

    handleClickOutside(event) {
        if (this.refBase.current && !this.refBase.current.contains(event.target)) {
            this.props.hideDetail()

        }
    }

    render(){
        return(
            <div ref={this.refBase} className="shadow main-border" 
                style={{width: "320px", height: "auto", background: "#FFF", position: "absolute", top: "50px", padding: "20px"}}>
                
                <div style={{display: "flex", alignItems: "center"}}>
                    <div className="main-border-right">
                        <FontAwesomeIcon className="fld-color" style={{fontSize: "18px"}} icon={faFolder}/>&nbsp;&nbsp;
                    </div>
                    <div style={{paddingLeft: "10px"}}>
                        <div style={{fontSize: "14px"}}>{this.state.projectName}</div>
                        <div className='second-font-color' style={{fontSize: "11px"}}>
                            <FontAwesomeIcon icon={faCalendarAlt}/>&nbsp;&nbsp;
                            {convertDate_dd_MMM_yyy(this.state.createdDate)}
                        </div>
                    </div>
                </div>
                
                <div style={{marginLeft: "26px", paddingLeft: "10px", marginTop: "10px", fontSize: "12px"}}>
                    <div style={{margin: "8px 0px", display: "flex", alignItems: "center"}}>
                        <FontAwesomeIcon icon={faUserAlt} style={{fontSize: "16px"}}/>&nbsp;&nbsp;
                        <div>
                            <div className='second-font-color' style={{fontSize: "10px"}}>Created BY</div>
                            <div>{this.state.userName}</div>
                        </div>
                    </div>
                    <div style={{margin: "8px 0px", display: "flex", alignItems: "center"}}>
                        <FontAwesomeIcon icon={faKey} style={{fontSize: "16px"}}/>&nbsp;&nbsp;
                        <div>
                            <div className='second-font-color' style={{fontSize: "10px"}}>PIC</div>
                            <div>{this.state.userName}</div>
                        </div>
                    </div>
                    {/* <div style={{margin: "8px 0px"}}>
                        <FontAwesomeIcon icon={faKey}/>
                        &nbsp;
                        {this.state.picName}
                    </div> */}
                    <div className='main-border-top' style={{fontSize: "12px", display: "flex", justifyContent: "space-between", paddingTop: "5px", margintop: "50x", display: "none"}}>
                        <div style={{margin: "8px 0px"}}>
                            <CkCIrcle style={{color: "#000", fontSize: "12px"}}/>
                            &nbsp;Task
                            <div style={{fontSize: "20px", textAlign: "center"}}>10</div>
                        </div>
                        &nbsp;&nbsp;
                        <div style={{margin: "8px 0px"}}>
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: "red"}}/>
                            &nbsp;Checklist
                            <div style={{fontSize: "20px", textAlign: "center"}}>10</div>
                        </div>
                        &nbsp;&nbsp;
                        <div style={{margin: "8px 0px"}}>
                            <FontAwesomeIcon icon={faFile}/>
                            &nbsp;Files
                            <div style={{fontSize: "20px", textAlign: "center"}}>10</div>
                        </div>
                        &nbsp;&nbsp;
                        <div style={{margin: "8px 0px"}}>
                            <FontAwesomeIcon icon={faUsers} style={{color: "#878787"}}/>
                            &nbsp;Teams
                            <div style={{fontSize: "20px", textAlign: "center"}}>10</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default index