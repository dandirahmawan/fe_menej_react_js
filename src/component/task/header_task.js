import { faAngleDown, faFilter, faFolder, faObjectGroup, faPlus, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Fragment } from 'react'
import { connect } from 'react-redux'
import { getCookieUserId, setInitialName } from '../../function/function'
import Triangle from '../../images/triangle.png'
import {check_circle as CkCIrcle, circle_duotone as CircleDuotone, circle_minus as CircleMinus} from '../icon/icon'
import Teams from './teams/teams'
import ProjectDetail from './project_detail'
// import InfoProject from './info_project'
import { showBorderAttachment } from '../../redux/action'

class header_task extends React.Component{

    constructor(){
        super()
        this.state = {
            isBorderAttachment: false,
            teamsBase: "",
            dataProject: {},
            projectDetailBase: ""
        }

        this.popFilter = React.createRef()
        this.popGroupBy = React.createRef()

        this.filter = this.filter.bind(this)
        this.showBorderAttachment = this.showBorderAttachment.bind(this)
        this.hideBorderAttachment = this.hideBorderAttachment.bind(this)
        this.colorStatus = this.colorStatus.bind(this)
        this.groupByPop = this.groupByPop.bind(this)
        this.teams = this.teams.bind(this)
        this.hideTeams = this.hideTeams.bind(this)
        this.taskAction = this.taskAction.bind(this)
        this.attachmentAction = this.attachmentAction.bind(this)
        this.projectDetail = this.projectDetail.bind(this)
    }

    showBorderAttachment(){
        this.props.showBorderAttachment()
        this.setState({
            isBorderAttachment: true
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps != this.props){
            this.setState({
                tabActive: this.props.tabActive,
                dataProject: this.props.dataProject
            })
        }
    }

    hideBorderAttachment(){
        this.props.hideBorderAttachment()
        this.setState({
            isBorderAttachment: false
        })
    }

    filter(){
        this.popFilter.current.style.display = "block"
    }

    groupByPop(){
        this.popGroupBy.current.style.display = "block"
        return false
    }

    teams(){
        let elm = document.getElementById("header-base-tab-module")
        elm.style.zIndex = 1000
        this.setState({
            teamsBase: <Teams projectId={this.props.dataProject.projectId} 
                            hidePopUp={this.hideTeams}/>
        })
    }

    hideTeams(){
        let elm = document.getElementById("header-base-tab-module")
        elm.style.zIndex = 999
        this.setState({
            teamsBase: ""
        })
    }

    colorStatus(a){
        let color =  ""
        let icon = null
        // console.log(this.props.dataStatus)
        this.props.dataStatus.map(dt => {
            if(a == dt.id){
                let colorStatus = (dt.color == null) ? "#000" : dt.color
                color = colorStatus

                // console.log("status : "+dt.status.toLowerCase())
                if(dt.status.toLowerCase() == "not started"){
                    icon = <CircleMinus className="second-font-color" style={{fontSize: "14px"}}/>
                }else if(dt.status.toLowerCase() == "completed"){
                    icon = <CkCIrcle style={{color: colorStatus, fontSize: "14px"}}/>
                }else{
                    icon = <CircleDuotone style={{fontSize: "12px", color: colorStatus, border: "1px solid", borderRadius: "100%"}}/>
                }
            }
        })
        return icon
    }

    taskAction(){
        this.props.taskPage()
    }

    attachmentAction(){
        this.props.attachment()
    }

    projectDetail(){
        this.setState({
            projectDetailBase: <ProjectDetail dataProject={this.state.dataProject} hideDetail={() => this.setState({projectDetailBase: ""})}/>
        })
    }

    render(){
        // console.log(this.props.tabActive)
        const picProject = this.props.dataProject.pic
        const listFilterAssign = this.props.dataTeam.map(dt => {
            return <a onClick={() => this.props.filterAction("assign", dt.userId)} style={{textDecoration: "none"}}>
                        <div className="main-border-bottom menu-item" style={{padding: "7px", fontSize: "12px"}}>
                            <FontAwesomeIcon icon={faUser}/>&nbsp;&nbsp;{dt.userName}
                        </div>
                    </a>
        })

        let sqSts = 0
        const listFilterStatus = this.props.dataStatus.map(dt => {
            sqSts++
            return <a onClick={() => this.props.filterAction("status", dt.id)} style={{textDecoration: "none"}}>
                        <div className="main-border-bottom menu-item" style={{padding: "7px", fontSize: "12px"}}>
                            {/* <CkCIrcle style={{color: dt.color, fontSize: "12px"}}/> */}
                            {this.colorStatus(dt.id)}
                            &nbsp;&nbsp;{dt.status}
                        </div>
                    </a>
        })

        let dataTeam = this.props.dataTeam.map(dt => {
            let name = dt.userName
            let initial = setInitialName(name)
            return  <div className="main-color main-font-size" 
                        style={{width: "30px", 
                                height: "30px", 
                                borderRadius: "100%",
                                border: "1px solid #FFF",
                                marginLeft: "-7px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: "2px"}}>
                        <span className="bold" style={{color: "#FFF"}}>{initial}</span>
                    </div>
        })
        return(
            <div id="header-base-tab-module" className="main-border-bottom-drk" 
                style={{paddingBottom: "15px", 
                        paddingTop: "15px", 
                        minWidth: "745px",
                        position: "fixed",
                        width: "100%",
                        zIndex: "1",
                        background: "#FFF",
                        marginLeft: "-10px", 
                        paddingLeft: "10px"}}>
                
                <div style={{paddingLeft: "15px", 
                            paddingRight: "15px", 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center"}}>

                    <div id="nm-prj-asdd" className="bold" style={{fontSize: "14px", display: "flex", alignItems: "center"}}>
                        <div className="main-border-right">
                            <FontAwesomeIcon className="fld-color" style={{fontSize: "18px"}} icon={faFolder}/>&nbsp;&nbsp;
                        </div>
                        &nbsp;
                        <a id="lk-prj-dtl-hdr" onClick={this.projectDetail} style={{color: "#000"}}>
                            {this.state.dataProject.projectName}
                        </a>
                        &nbsp;&nbsp;
                        <a id="lk-prj-dtl-hdr" onClick={this.projectDetail} style={{color: "#000"}}>
                            <FontAwesomeIcon className="second-font-color" style={{marginTop: "2px"}} icon={faAngleDown}/>  
                        </a>
                        {this.state.projectDetailBase}
                    </div>
                    <div id="tb-mn-bs-jkdag" style={{display: "flex", alignItems: "center"}}>
                        
                        <div className="main-border" style={{display: "flex",borderRadius: "10px", overflow: "hidden"}}>
                            {
                                (this.state.tabActive == "task")
                                ?
                                    <a style={{color: "#000"}} className="bold main-font-size mn-tsk-main main-border-right">Task list</a>
                                :
                                    <a onClick={this.taskAction} className="bold main-font-size second-font-color mn-tsk-main main-border-right">Task list</a>
                            }
                            {
                                (this.state.tabActive == "attachment")
                                ?
                                    <a style={{color: "#000"}} className="bold main-font-size mn-tsk-main main-border-right">Attachment</a>
                                :
                                    <a onClick={this.attachmentAction} className="bold main-font-size second-font-color mn-tsk-main main-border-right">Attachment</a>
                            }
                            {/* <a onClick={this.props.taskPage} className="bold second-font-color mn-tsk-main main-border-right">Task list</a> */}
                            {/* <a style={{color: "#000"}} className="bold mn-tsk-main main-border-right">Attachment</a> */}
                            <a className="bold main-font-size second-font-color mn-tsk-main">Chart</a>
                        </div>
                        
                        <div>
                            <a onClick={this.teams}>
                                <div id="prv-tm-prj-129ssa" style={{display: "flex", paddingLeft: "20px", alignItems: "center"}}>
                                    <div style={{width: "30px", 
                                                height: "30px", 
                                                borderRadius: "100%",
                                                border: "1px solid #CCC",
                                                background: "#FFF",
                                                zIndex: "1",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginRight: "2px"}}>
                                        <FontAwesomeIcon icon={faUsers} color={"#898989"}/>
                                    </div>
                                    {dataTeam}
                                    <div className='main-border-left' style={{marginLeft: "4px"}}>
                                        <div style={{width: "25px", 
                                                    height: "25px", 
                                                    marginLeft: "5px",
                                                    borderRadius: "100%",
                                                    border: "1px solid #CCC",
                                                    background: "#FFF",
                                                    zIndex: "1",
                                                    display: "flex",
                                                    fontSize: "12px",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginRight: "2px"}}>
                                            <FontAwesomeIcon icon={faPlus} color={"#898989"}/>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            {this.state.teamsBase}
                        </div>
                        
                    </div>
                    
                    {
                        this.state.tabActive == "task"
                        ?
                        <div id="tsk-hdr-mn-1xsd" style={{display: "flex"}}>
                            {
                                (this.props.viewModule == "list")
                                ?
                                    <Fragment>
                                        {/* <button ref={this.markAllBtn} onClick={this.markAll} style={{background:"none", fontSize: "12px", display: "block"}}>
                                            <i class="fa fa-check"></i> 
                                            Mark All
                                        </button>
                                        <button ref={this.unMarkAllBtn} onClick={this.unmarkAll} style={{background:"none", fontSize: "12px", display: "none"}}>
                                            <i class="fa fa-times"></i> 
                                            Unmark All
                                        </button>
                                        <button onClick={this.deleteModule} style={{background:"none", fontSize: "12px"}}>
                                            <i class="fa fa-trash"></i> 
                                            Delete
                                        </button> */}
                                        <div className="main-border-right" style={{display: "flex", alignItems: "center", marginRight: "10px", paddingRight: "10px"}}>
                                            {
                                                (this.props.isShowDescription)
                                                ?
                                                    <><input type="checkbox" checked onClick={this.props.showDescription}/>&nbsp;&nbsp;</>
                                                :
                                                    <><input type="checkbox" onClick={this.props.showDescription}/>&nbsp;&nbsp;</>

                                            }
                                            <div className="bold" style={{marginTop: "1px", fontSize: "11px"}}>Show Description</div>
                                        </div>
                                        {/* <button onClick={this.deleteModule} style={{background:"none", fontSize: "12px"}}>
                                            {/* <i class="fa fa-trash"></i>  */}
                                            {/* Filter */}
                                        {/* </button> */} 
                                    </Fragment>
                                :
                                    ""
                            }
                            
                            {
                                (getCookieUserId() == picProject || this.state.isPermitionModule)
                                ?
                                    <Fragment>
                                        <button className="main-border-drk" 
                                            onClick={this.props.newModule} 
                                            style={{background:"none", fontSize: "11px", padding: "8px", borderRadius: "3px", display: "flex", marginRight: "5px"}}>
                                            <div className="main-border-right" style={{paddingRight: "5px"}}><i class="fa fa-plus"></i></div>
                                            <div style={{marginLeft: "5px"}}>Task</div>
                                        </button>

                                        <button className="main-border-drk" 
                                            onClick={this.props.newSection} 
                                            style={{background:"none", fontSize: "11px", padding: "8px", borderRadius: "3px", display: "flex", marginRight: "5px"}}>
                                            <div className="main-border-right" style={{paddingRight: "5px"}}><i class="fa fa-plus"></i></div>
                                            <div style={{marginLeft: "5px"}}>Section</div>
                                        </button>
                                    </Fragment>
                                    
                                : ""
                            }
                            
                            {/*popup filter and button filter*/}
                            <div id="base-filter-task">
                                <button className="main-border-drk"
                                    onClick={this.filter} 
                                    style={{background:"none", fontSize: "11px", padding: "8px", borderRadius: "3px", display: "flex", marginRight: "5px"}}>
                                    <div className="main-border-right" style={{paddingRight: "5px"}}>
                                        <i class="fa fa-filter"></i>
                                    </div>
                                    <div style={{marginLeft: "5px"}}>Filter</div>
                                </button>
                                
                                <div ref={this.popFilter} className="pop-elm" id="flt-module" style={{position: "fixed",zIndex: "1"}}>   
                                    <img src={Triangle} style={{width: "15px", zIndex: "2", position: "fixed", marginLeft: "24px"}}/>
                                    <div className="main-border shadow " 
                                        style={{width: "170px", 
                                                background: "#FFF", 
                                                marginLeft: "-55px", 
                                                marginTop: "13px"}}>
                                        <a style={{textDecoration: "none"}} onClick={() => this.props.filterAction("all", "")}>
                                            <div className="main-border-bottom menu-item" style={{padding: "7px", fontSize: "12px"}}>
                                                <FontAwesomeIcon className="second-font-color" style={{fontSize: "11px"}} icon={faFilter}/>
                                                &nbsp;&nbsp;&nbsp;Show All
                                            </div>
                                        </a>
                                        <div>
                                            <div className="main-border-bottom second-background-grs bold" style={{padding: "7px"}}>Status</div>
                                            {listFilterStatus}
                                        </div>
                                        <div>
                                            <div className="main-border-bottom bold second-background-grs" style={{padding: "7px"}}>
                                                Assign To
                                            </div>
                                            {listFilterAssign}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {
                                (this.props.viewModule != "list")
                                ?
                                    <Fragment>
                                        <button className="main-border-drk"
                                            onClick={this.groupByPop} 
                                            style={{background:"none", fontSize: "11px", padding: "8px", borderRadius: "3px", display: "flex", marginRight: "5px"}}>
                                            <div className="main-border-right" style={{paddingRight: "5px"}}>
                                                <FontAwesomeIcon icon={faObjectGroup}/>
                                            </div>
                                            <div style={{marginLeft: "5px"}}>Group By</div>
                                        </button>

                                        <div ref={this.popGroupBy} className="pop-elm" style={{position: "fixed",zIndex: "1"}}>   
                                            <img src={Triangle} style={{width: "15px", zIndex: "2", position: "fixed", marginTop: "30px", marginLeft: "105px"}}/>
                                            <div className="main-border shadow " 
                                                style={{width: "150px", 
                                                        background: "#FFF", 
                                                        marginLeft: "35px", marginTop: "43px"}}>
                                                <a onClick={() => this.props.groupByAct("section")} style={{textDecoration: "none"}}>
                                                    <div className="main-border-bottom bold menu-item" style={{padding: "7px", fontSize: "12px"}}>Section</div>
                                                </a>
                                                <a onClick={() => this.props.groupByAct("status")} style={{textDecoration: "none"}}>
                                                    <div className="main-border-bottom bold menu-item" style={{padding: "7px", fontSize: "12px"}}>Status</div>
                                                </a>
                                            </div>
                                        </div>
                                    </Fragment>
                                :
                                    ""
                            }

                            {
                                (this.props.viewModule == "list")
                                ?
                                    <button className="main-border-drk"
                                        onClick={this.props.card} 
                                        style={{background:"none", fontSize: "11px", padding: "8px", borderRadius: "3px", display: "flex", marginRight: "5px"}}>
                                        <div className="main-border-right" style={{paddingRight: "5px"}}>
                                            <i class="fa fa-square"></i>
                                        </div>
                                        <div style={{marginLeft: "5px"}}>Card</div>
                                    </button>
                                :
                                    <button className="main-border-drk" 
                                        onClick={this.props.list} 
                                        style={{background:"none", fontSize: "11px", padding: "8px", borderRadius: "3px", display: "flex", marginRight: "5px"}}>
                                        <div className="main-border-right" style={{paddingRight: "5px"}}>
                                            <i class="fa fa-list-alt"></i>
                                        </div>
                                        <div style={{marginLeft: "5px"}}>List</div>
                                    </button>
                            }
                        </div>
                    :

                        <div id="atch-hdr-sa992" style={{display: "flex"}}>
                            {/* <button className="main-border-drk" 
                                // onClick={this.newSection.bind(this)} 
                                style={{background:"none", fontSize: "11px", padding: "8px", borderRadius: "3px", display: "flex", marginRight: "5px"}}>
                                <div className="main-border-right" style={{paddingRight: "5px"}}><i class="fa fa-plus"></i></div>
                                <div style={{marginLeft: "5px"}}>Upload</div>
                            </button> */}
                            {/* {
                                (picProject == getCookieUserId() || this.state.isPermition)
                                ?
                                        <button onClick={this.props.uploadAttachment} className="main-border-drk" 
                                            // onClick={this.newSection.bind(this)} 
                                            style={{background:"none", fontSize: "11px", padding: "8px", borderRadius: "3px", display: "flex", marginRight: "5px"}}>
                                            <div className="main-border-right" style={{paddingRight: "5px"}}><i class="fa fa-plus"></i></div>
                                            <div style={{marginLeft: "5px"}}>Upload</div>
                                        </button>
                                    :
                                        ""
                            }
                            <button className="main-border-drk" 
                                // onClick={this.newSection.bind(this)} 
                                style={{background:"none", fontSize: "11px", padding: "8px", borderRadius: "3px", display: "flex", marginRight: "5px"}}>
                                <div className="main-border-right" style={{paddingRight: "5px"}}><i class="fa fa-filter"></i></div>
                                <div style={{marginLeft: "5px"}}>Filter</div>
                            </button> */}

                            {
                                (this.props.isBorderAttachment)
                                ?
                                    <button onClick={this.showBorderAttachment} className="main-border-drk" 
                                        // onClick={this.newSection.bind(this)} 
                                        style={{background:"none", fontSize: "11px", padding: "8px", borderRadius: "3px", display: "flex", marginRight: "5px"}}>
                                        <div className="main-border-right" style={{paddingRight: "5px"}}><i class="fa fa-border-none"></i></div>
                                        <div style={{marginLeft: "5px"}}>Hide Border</div>
                                    </button>
                                :
                                    <button onClick={this.showBorderAttachment} className="main-border-drk" 
                                        // onClick={this.newSection.bind(this)} 
                                        style={{background:"none", fontSize: "11px", padding: "8px", borderRadius: "3px", display: "flex", marginRight: "5px"}}>
                                        <div className="main-border-right" style={{paddingRight: "5px"}}><i class="fa fa-border-all"></i></div>
                                        <div style={{marginLeft: "5px"}}>Show Border</div>
                                    </button>
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isBorderAttachment: state.isBorderAttachment,
        dataProject : state.dataProject[0],
        dataLabelModule: state.dataLabelsModule,
        assignedModules: state.assignedModules,
        dataModule: state.dataModule,
        dataStatus: state.dataStatus,
        viewModule: state.viewModule,
        dataTeam: state.dataTeam,
        sectionModule: state.sectionModule
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showBorderAttachment: () => dispatch(showBorderAttachment())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (header_task)