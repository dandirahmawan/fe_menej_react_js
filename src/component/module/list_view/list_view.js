import React, { Component } from 'react'
import { connect } from 'react-redux'
import RowModule from './list_row'
import { selectRowModule } from '../../../redux/action'

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

    componentDidMount(){
        document.addEventListener("keydown", this.holdDown)
        document.addEventListener("keyup", this.holdUp)
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
            infoPop: ""
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


    render(){

        const dataModule = this.props.dataModule.map(dt => {

            if(dt.isDelete != "Y"){
                /*set data assigned each module*/
                let assigned = []
                this.props.assignedModules.map(dta => {
                    if(dta.moduleId == dt.modulId){
                        assigned.push(dta)
                    }
                })

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
                            // note = {this.state.dataNote}
                            note = ""
                            assigned = {assigned}
                            bugsIconClick = {this.bugsIconClick}
                            isSelected={dt.isSelected}
                            docFileIconClick = {this.docFileIconClick}
                            noteClick={this.noteClick}
                            // appendsNote={this.state.appendsNote}
                            appendsNote=""
                            // updateStateDataNote={this.updateStateDataNote}
                            updateStateDataNote=""
                            dataLabelModule={this.readDataLabel(dt.modulId)}
                            contextMenuModule={this.props.contextMenuModule}
                            isBorder={this.props.isBorder}/>
            }
            
        })

        return(
            <React.Fragment>
                {this.state.popup}
                <table className="main-border-bottom" style={{width: "80%", marginBottom: "50px"}}>
                    <thead ref={this.theadModule}>
                        <tr>
                            <th colSpan="2" style={{width: "400px"}} className="main-border-right second-font-color bold">Module</th>
                            <th style={{maxWidth: "150px", textAlign: "center", paddingRight: "0px"}} className="main-border-right second-font-color bold">Assign to</th>
                            <th className="main-border-right second-font-color bold">Due date</th>
                            <th className="main-border-right second-font-color bold">Status</th>
                        <th className="second-font-color bold"></th>
                        </tr>
                    </thead>
                    <tbody style={{overflow: "auto"}}>
                        {
                            (dataModule == "") 
                            ? 
                                <tr>
                                    <td colSpan="5" style={{paddingTop: "20px", paddingBottom:"30px", fontSize: "14px", textAlign: "center", color: "#a2a2a2"}}>
                                        <div style={{marginTop: "25px", marginBottom: "100px"}}>
                                            <span style={{fontSize: "16px"}}>
                                                <i class="fa fa-clipboard" style={{fontSize: "30px"}}></i>
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
        dataStatus : state.dataStatus
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (list_view)