import React, { Component } from 'react'
import { connect } from 'react-redux'
import RowModule from './list_row'
import { selectRowModule } from '../../../redux/action'
import { Fragment } from 'react'
import { faChevronDown, faEdit, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RenameSection from '../rename_section'
import { getCookieUserId } from '../../../function/function'

class list_view extends Component{

    state = {
        popup: "",
        ctrlClick: false,
        arrSelected: []
    }

    readDataLabel = this.readDataLabel.bind(this)
    selectedRow = this.selectedRow.bind(this)
    selectedRow2 = this.selectedRow2.bind(this)
    hidePopUp = this.hidePopUp.bind(this)
    holdDown = this.holdDown.bind(this)
    holdUp = this.holdUp.bind(this)
    renameSection = this.renameSection.bind(this)

    componentDidMount(){
        document.addEventListener("keydown", this.holdDown)
        document.addEventListener("keyup", this.holdUp)
    }

    componentDidUpdate(prevState){
        if(prevState !== this.state){
            console.log(prevState)
            console.log(this.state)
        }
    }

    readDataLabel(moduleId){
        let data = []
        this.props.dataLabelModule.map(dt => {
            if(moduleId == dt.moduleId){
                data.push(dt)
            }
        })
        return data
    }

    selectedRow(data){
        this.props.selectedRow(data)
    }

    selectedRow2(data){
        if(this.state.ctrlClick){
            this.props.dataModule.map(dt => {
                if(dt.modulId === data){
                    if(dt.isSelected){
                        var idx = this.state.arrSelected.indexOf(data)
                        this.state.arrSelected.splice(idx, 1)
                    }else{
                        this.state.arrSelected.push(data)
                    }
                    this.props.selectRowModule(data)
                }
            })
            this.props.selectedRow2(this.state.arrSelected)
        }else{
            this.selectedRow(data)
        }
    }

    hidePopUp(){
        this.setState({
            infoPop: "",
            popup: ""
        })
    }

    holdDown(event){
        if (event.keyCode == 17) {
            this.state.ctrlClick = true
        }
    }

    holdUp(event){
        if (event.keyCode == 17) {
            this.state.ctrlClick = false
        }
    }

    renameSection(e, id, name){
        let x = e.clientX
        let y = e.clientY
        this.setState({
            popup: <RenameSection y={y} 
                                x={x} 
                                cancel={this.hidePopUp}
                                id={id} 
                                name={name}/>
        })
    }

    render(){
        const picProjcet = this.props.dataProject.pic
        const dataModule = this.props.dataModule.map(dt => {
            if(dt.isDelete != "Y"){
                let pc = parseInt(picProjcet)
                return <Fragment>
                            <tr>
                                <td colSpan='7' 
                                    className='bold second-font-color' 
                                    style={{paddingTop: "10px", paddingBottom: "10px", textTransform: "uppercase"}}>
                                    <FontAwesomeIcon icon={faChevronDown}/>
                                    &nbsp;&nbsp;
                                    {dt.section}
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    {
                                        (getCookieUserId() == pc)
                                        ?
                                            <a onClick={(e) => this.renameSection(e, dt.id, dt.section)} className="main-font-color" style={{fontSize: "10px"}}>
                                                <FontAwesomeIcon icon={faEdit}/>
                                            </a>
                                        :
                                            ""
                                    }   
                                </td>
                            </tr>

                            {
                                (dt.sectionModule.length == 0)
                                ?
                                    <tr className="main-border-bottom">
                                        <td colSpan="7" style={{fontSize: "14px", color: "#a2a2a2"}}>
                                            <div style={{padding: "5px", paddingLeft: "15px", display: "flex", alignItems: "center"}}>
                                                <FontAwesomeIcon style={{fontSize: "14px"}} icon={faInfoCircle}/>&nbsp;&nbsp;
                                                <div>
                                                    <div className="bold" style={{fontSize: '11px'}}>No data to display</div>
                                                    <div style={{fontSize: "11px"}}>This section did not have data to display</div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                : 
                                    ""
                            }

                            {dt.sectionModule.map(dt => {
                                
                                let isVisible = true
                                let filter = this.props.filter

                                /*read data filter*/
                                if(filter.type == "status"){
                                    if(filter.id != parseInt(dt.modulStatus)){
                                        isVisible = false
                                    }else{
                                        isVisible = true
                                    }
                                }

                                if(isVisible)
                                {
                                    return <RowModule
                                                dataStatus={this.props.dataStatus}
                                                detail = {this.detail}
                                                isDelete = {dt.isTrash}
                                                selected = {this.selectedRow}
                                                selectedRow = {this.selectedRow2}
                                                moduleId = {dt.modulId}
                                                modulName = {dt.modulName}
                                                description = {dt.description}
                                                endDate = {dt.endDate}
                                                modulStatus = {dt.modulStatus}
                                                countBugs = {dt.countBugs}
                                                countBugsClose = {dt.countBugsClose}
                                                countDoc = {dt.countDoc}
                                                countNote = {dt.countNote}
                                                userName = {dt.userName}
                                                isMember = {dt.isMember}
                                                note = ""
                                                assigned = {this.props.assignedModules}
                                                bugsIconClick = {this.bugsIconClick}
                                                isSelected={dt.isSelected}
                                                docFileIconClick = {this.docFileIconClick}
                                                noteClick={this.noteClick}
                                                appendsNote=""
                                                updateStateDataNote=""
                                                dataLabelModule={this.readDataLabel(dt.modulId)}
                                                contextMenuModule={this.props.contextMenuModule}
                                                showDescription={this.props.showDescription}
                                                isBorder={this.props.isBorder}/>
                                    }
                                })
                            }
                            <tr><td colSpan="7" style={{padding: "10px"}}></td></tr>
                        </Fragment>
            }
            
        })

        return(
            <React.Fragment>
                <div style={{marginLeft: "15px"}}>
                    {this.state.popup}
                    <table style={{width: "89%", marginBottom: "50px", minWidth: "755px"}}>
                        <thead ref={this.theadModule}>
                            <tr className="main-border-bottom">
                                <th colSpan="2" style={{maxWidth: "400px"}} className="main-border-right second-font-color bold">Module</th>
                                <th style={{maxWidth: "150px", textAlign: "center", paddingRight: "0px", paddingTop: "15px", paddingBottom: "15px"}} className="main-border-right second-font-color bold">Labels</th>
                                <th style={{maxWidth: "150px", textAlign: "center", paddingRight: "0px"}} className="main-border-right second-font-color bold">Assign to</th>
                                <th style={{textAlign: "center"}} className="main-border-right second-font-color bold">Due date</th>
                                <th style={{textAlign: "center"}} className="main-border-right second-font-color bold">Status</th>
                            <th className="second-font-color bold"></th>
                            </tr>
                        </thead>
                        <tbody style={{overflow: "auto"}}>
                            {
                                (dataModule == "") 
                                ? 
                                    <tr>
                                        <td colSpan="7" style={{paddingTop: "20px", paddingBottom:"30px", fontSize: "14px", textAlign: "center", color: "#a2a2a2"}}>
                                            <div style={{marginTop: "25px", marginBottom: "100px"}}>
                                                <span style={{fontSize: "16px"}}>
                                                    <i class="fas fa-clipboard" style={{fontSize: "30px"}}></i>
                                                </span>
                                                <div className="bold" style={{marginTop: "10px", fontSize: '14px'}}>No data to display</div>
                                                <div style={{fontSize: "12px"}}>please click new module button<br/>to create a new module</div>
                                            </div>
                                        </td>
                                    </tr> 
                                : 
                                    dataModule  
                            }
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        selectRowModule: (moduleId) => dispatch(selectRowModule(moduleId))
    }
}

const mapStateToProps = state => {
    return{
        dataLabelModule: state.dataLabelsModule,
        assignedModules: state.assignedModules,
        dataModule : state.dataModule,
        dataStatus : state.dataStatus,
        dataProject : state.dataProject[0]
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (list_view)