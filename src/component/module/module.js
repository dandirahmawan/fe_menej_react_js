import React from 'react'
import HeaderModule from './header_module'
import RowModule from './row_module'
import NewModule from './new_module'
import PopupConfirmation from '../popup_confirmation'
import ProjectMember from '../project_member_team'
import Detail from './detail'
import { baseUrl } from '../../const/const'

var ctrlClick = false
var arrSeleceted = []
window.addEventListener("keydown", function(event) {
    if (event.keyCode == 17) {
       ctrlClick = true
    }
})

window.addEventListener("keyup", function(event) {
    if (event.keyCode == 17) {
       ctrlClick = false
    }
})

class modulePage extends React.Component{
    
    constructor(){
        super()
        this.state = {
            dataDetail:"",
            newModulName:"",
            newDueDate:"",
            newUser:"",
            newDescitiopn:"",
            infoPop:""
        }
        this.hidePopUp = this.hidePopUp.bind(this)
        this.deleteModule = this.deleteModule.bind(this)
        this.deleteModuleDel = this.deleteModuleDel.bind(this)
        this.commitDeleteModule = this.commitDeleteModule.bind(this)
        this.commitNewModule = this.commitNewModule.bind(this)
        this.selectedRow = this.selectedRow.bind(this)
    }

    componentDidMount(){
        arrSeleceted = []
    }

    selectedRow(a){
        var t = a.target.parentElement
        var data = parseInt(t.getAttribute("data-module"))
        var isSelecetd = t.getAttribute("is-selected")
        if(ctrlClick){
            if(isSelecetd == "false"){
                t.setAttribute("class", "tr-module-data tr-selectable selected-row")
                t.setAttribute("is-selected", true)
                arrSeleceted.push(data)
            }else{
                t.setAttribute("class", "tr-module-data tr-selectable")
                t.setAttribute("is-selected", false)
                var idx = arrSeleceted.indexOf(data)
                arrSeleceted.splice(idx, 1)
            }
        }else{

            this.props.dataModule.map(dt => {
                if(dt.modulId == data){
                    this.setState({
                        infoPop: <Detail 
                                    close={this.hidePopUp} 
                                    dataModule={dt}    
                                />
                    })
                }
            })
            
        }   
    }

    markAll(){
        var tr = document.getElementsByClassName("tr-module-data")
        for(var i = 0;i<tr.length;i++){
            tr[i].setAttribute("class", "tr-module-data tr-selectable selected-row")
            tr[i].setAttribute("is-selected", true)
            var data = tr[i].getAttribute("data-module")
            arrSeleceted.push(parseInt(data))
        }
    }

    unmarkAll(){
        var tr = document.getElementsByClassName("tr-module-data")
        for(var i = 0;i<tr.length;i++){
            tr[i].setAttribute("class", "tr-module-data tr-selectable")
            tr[i].setAttribute("is-selected", false)
        }
        arrSeleceted = []
    }

    newModule(){
        this.setState({
            infoPop: <NewModule 
                        projectId={this.props.projectIdHeader}
                        hcName={this.handleChangeNameModule}
                        commit={this.commitNewModule}
                        hide={this.hidePopUp}/>
        })
    }

    hidePopUp(){
        this.setState({
            infoPop: ""
        })
    }

    deleteModule(){
        if(arrSeleceted.length > 0){
            this.setState({ 
                infoPop: <PopupConfirmation textPopup="Are you sure, you want delete this module ?" titleConfirmation="Delete module" hidePopUp={this.hidePopUp} yesAction={this.commitDeleteModule}/>
            })
        }
    }

    deleteModuleDel(event){
        if (event.keyCode == 46) {
            if(arrSeleceted.length > 0){
                this.setState({ 
                    infoPop: <PopupConfirmation textPopup="Are you sure, you want delete this module ?" titleConfirmation="Delete module" hidePopUp={this.hidePopUp} yesAction={this.commitDeleteModule}/>
                })
            }
        }
    }

    commitDeleteModule(){
        this.props.commitDeleteModule(arrSeleceted)
        arrSeleceted = []
        this.setState({
            infoPop: ""
        })
    }

    commitNewModule(idUser, moduleName, dueDate, description, pi){
        this.props.commitNewModule(idUser, moduleName, dueDate, description, pi)
        this.setState({
            infoPop: ""
        })
    }

    render(){
        
        const dataProject = this.props.dataProject.map(dt => <HeaderModule
                                                                projectName     = {dt.projectName}
                                                                projectManager  = {dt.picName}
                                                                countModule     = {dt.countModule}
                                                                countBugs       = {dt.countBugs}
                                                                countMember     = {dt.countTeam}
                                                                percentage      = "100%" 
                                                            />)

        const dataModule = this.props.dataModule.map(dt => <RowModule
                                                        detail = {this.detail}
                                                        isDelete = {dt.isTrash}
                                                        selected = {this.selectedRow} 
                                                        modulId = {dt.modulId}
                                                        modulName = {dt.modulName}
                                                        endDate = {dt.endDate}
                                                        modulStatus = {dt.modulStatus}
                                                        countBugs = {dt.countBugs} 
                                                        countDoc = {dt.countDoc}
                                                        userName = {dt.userName}/>)

        const dataTeamMember = this.props.dataTeam.map(dt => <ProjectMember
                                                            userName={dt.userName}
                                                        />)

        
        return(
            <React.Fragment>
                {dataProject}
                {this.state.infoPop}
                <div className="main-border-bottom" style={{marginTop: "10px", paddingBottom: "10px"}}>
                    <button onClick={this.markAll} style={{marginRight: "20px", background:"none", border: "none"}} className='btn-secondary bold main-font-color'>
                        <i class="fa fa-check"></i> Mark All
                    </button>
                    <button onClick={this.unmarkAll} style={{marginRight: "20px", background:"none", border: "none"}} className='btn-secondary bold main-font-color'>
                        <i class="fa fa-times"></i> Unmark All
                    </button>
                    <button onClick={this.deleteModule} style={{marginRight: "20px", background:"none", border: "none"}} className='btn-secondary bold main-font-color'>
                        <i class="fa fa-trash"></i> Delete
                    </button>
                    <button onClick={this.newModule.bind(this)} style={{marginRight: "20px", background:"none", border: "none"}} className='btn-secondary bold main-font-color'>
                        <i class="fa fa-plus"></i> New Module
                    </button>
                </div>
                <table style={{width: "80%", marginTop: "10px"}}>
                    <thead>
                        <th colSpan="2" style={{width: "400px"}} className="main-border-right second-font-color bold">Module</th>
                        <th style={{width: "150px"}} className="main-border-right second-font-color bold">PIC</th>
                        <th className="main-border-right second-font-color bold">Due date</th>
                        <th className="main-border-right second-font-color bold">Status</th>
                    </thead>
                    <tbody>
                        {(dataModule == "") ? <tr><td colSpan="5" className="bold font-second-color" style={{paddingTop: "20px",paddingBottom:"30px", fontSize: "14px", textAlign: "center", color: "#a2a2a2"}}><span style={{fontSize: "16px"}}><i class="fa fa-exclamation-triangle"></i></span><br></br>No data to display</td></tr> : dataModule}
                    </tbody>
                </table>
                <div className="main-border-top" style={{marginTop: "30px", paddingTop: "10px"}}>
                    <div className="bold" style={{marginBottom: "10px"}}><i class="fa fa-users"></i> Member team</div>
                    {dataTeamMember}
                </div>
            </React.Fragment>
        )
    }
}

export default modulePage