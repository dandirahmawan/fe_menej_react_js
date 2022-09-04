import React, { Component } from 'react'
import { connect } from 'react-redux'
import RowModule from './list_row'
import { selectRowModule, setDataModule } from '../../../redux/action'
import { Fragment } from 'react'
import { faChevronDown, faEdit, faInfoCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RenameSection from '../rename_section'
import { getCookieUserId, popUpAlert } from '../../../function/function'
import PopConfirmation from '../../popup_confirmation'
// import { ApiFetch } from '../../apiFetch'
import Fetch from '../../../function/fetchApi'

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
    deleteSection = this.deleteSection.bind(this)
    commitDeleteSection = this.commitDeleteSection.bind(this)

    componentDidMount(){
        document.addEventListener("keydown", this.holdDown)
        document.addEventListener("keyup", this.holdUp)
    }

    componentDidUpdate(prevState){
        if(prevState !== this.state){
            // console.log(prevState)
            // console.log(this.state)
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

    deleteSection(e, id, name){
        let text = "<span>Are you sure you want delete <span class='bold'>"+name+"</span> section. Make sure that the section is not have any task</span>"
        this.setState({
            popup: <PopConfirmation titleConfirmation="Delete Section"
                                    textPopup={text}
                                    yesAction={() => this.commitDeleteSection(id)}
                                    hidePopUp={this.hidePopUp}/>
        })
    }

    commitDeleteSection(id){
        let isValid = true
        let dataModule = [...this.props.dataModule]
        let seq = 0;
        for(let i = 0;i<dataModule.length;i++){
            let dt = dataModule[i]
            if(dt.id == id){
                let countTask = dt.modules.length
                if(countTask > 0){
                    popUpAlert("This section is not empty")
                    isValid = false
                }else{
                    /*set index array section for delete*/
                    seq = i
                }
                break
            }
        }

        if(isValid){
            popUpAlert("Section successfully deleted", "success")
            let form = new FormData()
            form.append("id", id)

            let fetch = new Fetch()
            fetch.post("/section/delete", form).then(res => {
                try {
                    let resJson = JSON.parse(res)
                    if(resJson.status == "success"){
                        popUpAlert("Delete section is successfully", "success")

                        /*set data module to redux*/
                        dataModule.splice(seq, 1)
                        this.props.setDataModule(dataModule)
                    }else{
                        popUpAlert(resJson.message)
                    }
                } catch (error) {
                    /*nothing happen*/
                }
            })
            // ApiFetch("/section/delete", {
            //     method: "POST",
            //     body: form
            // }).then(res => res.text()).then(res => {
            //     let resJson = JSON.parse(res)
            //     if(resJson.status == "success"){
            //         popUpAlert("Delete section is successfully", "success")

            //         /*set data module to redux*/
            //         dataModule.splice(seq, 1)
            //         this.props.setDataModule(dataModule)
            //     }else{
            //         popUpAlert(resJson.message)
            //     }
            // })
        }

        this.setState({
            popup: ""
        })
    }

    filteringData(data, type, param){
        if(type == "status" || type == "assign"){
            let count = 0
            for(let i = 0;i<data.length;i++){
                if(type == "status"){
                    if(parseInt(data[i].modulStatus) == param){
                        count++
                    }
                }else if(type == "assign"){
                    let assigns = data[i].assignTo
                    for(let x = 0;x<assigns.length;x++){
                        if(assigns[x].userId == param){
                            count++
                        }
                    }
                }
            }
            return count
        }else{
            return 1
        }
    }

    render(){
        const picProjcet = this.props.dataProject.pic
        const dataModule = this.props.dataModule.map(dt => {
            if(dt.isDelete != "Y"){
                let lengthData = 0
                let pc = parseInt(picProjcet)

                let filter = this.props.filter
                let countFilter = this.filteringData(dt.modules, filter.type, filter.id)
                
                return <Fragment>
                            {
                                (countFilter > 0)
                                ?
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
                                                    <div style={{display: "inline"}}>
                                                        <a onClick={(e) => this.renameSection(e, dt.id, dt.section)} className="main-font-color" style={{fontSize: "10px"}}>
                                                            <FontAwesomeIcon icon={faEdit}/>
                                                        </a>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <a onClick={(e) => this.deleteSection(e, dt.id, dt.section)} className="second-font-color" style={{fontSize: "10px"}}>
                                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                                        </a>
                                                    </div>
                                                    
                                                :
                                                    ""
                                            }   
                                        </td>
                                    </tr>
                                : null
                            }

                            {dt.modules.map(dt => {
                                
                                let isVisible = true
                                let filter = this.props.filter

                                /*read data filter*/
                                if(filter.type == "status"){
                                    if(filter.id != dt.modulStatus){
                                        isVisible = false
                                    }else{
                                        isVisible = true
                                    }
                                }else if(filter.type == "assign"){
                                    let uid = filter.id
                                    isVisible = false
                                    for(let i = 0;i<dt.assignTo.length;i++){
                                        let dtass = dt.assignTo[i]
                                        let assignToId = dtass.userId
                                        if(uid == assignToId){
                                            isVisible = true
                                            break;
                                        }
                                    }
                                }

                                if(isVisible)
                                {  
                                    // console.log(dt.label)
                                    lengthData++
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
                                                assigned={dt.assignTo}
                                                bugsIconClick = {this.bugsIconClick}
                                                isSelected={dt.isSelected}
                                                docFileIconClick = {this.docFileIconClick}
                                                noteClick={this.noteClick}
                                                appendsNote=""
                                                updateStateDataNote=""
                                                labelModule={dt.label}
                                                contextMenuModule={this.props.contextMenuModule}
                                                showDescription={this.props.showDescription}
                                                isBorder={this.props.isBorder}/>
                                    }
                                })
                            }

                            {
                                // (dt.modules.length == 0)
                                (dt.modules.length == 0 && countFilter > 0)
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

                            {
                                (countFilter > 0)
                                ?
                                    <tr><td colSpan="7" style={{padding: "10px"}}></td></tr>
                                : null
                            }
                        </Fragment>
            }
            
        })

        return(
            <React.Fragment>
                <div style={{marginLeft: "15px", paddingTop: "65px"}}>
                    {this.state.popup}
                    <table style={{width: "80%", marginBottom: "50px", minWidth: "755px"}}>
                        <thead ref={this.theadModule}>
                            <tr className="main-border-bottom">
                                <th colSpan="2" style={{maxWidth: "400px"}} className="main-border-right second-font-color bold">Module</th>
                                {/* <th style={{maxWidth: "150px", textAlign: "center", paddingRight: "0px", paddingTop: "15px", paddingBottom: "15px"}} className="main-border-right second-font-color bold">Labels</th> */}
                                <th style={{maxWidth: "150px", textAlign: "center", paddingRight: "0px"}} className="main-border-right second-font-color bold">Assign to</th>
                                <th style={{textAlign: "center", maxWidth: "150px"}} className="main-border-right second-font-color bold">Due date</th>
                                <th style={{textAlign: "center", maxWidth:"150px"}} className="main-border-right second-font-color bold">Status</th>
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
        selectRowModule: (moduleId) => dispatch(selectRowModule(moduleId)),
        setDataModule: (data) => dispatch(setDataModule(data))
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