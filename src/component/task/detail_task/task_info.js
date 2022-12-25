import React, { Fragment } from 'react'
import UserListChoice from '../../user_list_choice'
import { getCookieUserId,  convertDate_dd_MMM_yyy, popUpAlert} from '../../../function/function'
import {SelectBox} from '../../custom_element'
import ChoiceStatus from '../status_choice'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendarAlt, faUserCog, faPlusSquare, faTag, faEdit} from '@fortawesome/free-solid-svg-icons'
import NewLabel from '../new_label'
import {connect} from 'react-redux'
import {ApiFetch} from '../../apiFetch'
import PopupConfirmation from '../../popup_confirmation'
import { setDataLabel, setDataLabelModule } from '../../../redux/action'
import LabelModuleDetailItem from '../label_module_detail_item'
import Assigned from '../assigned_module'
import ChoiceSection from '../choice_section'
import Labeling from '../labeling_task'

class module_info extends React.Component{
    readyOperate = false
    isNewModule = false

    constructor(){
        super()
        this.state = {
            popupListChoice: "", 
            statusChoice: "",
            sectionChoice: "",
            idStatus: "",
            idSection: "",
            status: "",
            section: "",
            popup: "",
            labeling: "",
            dataLabelModule: []
        }
        this.SelectBox = React.createRef()
        this.labelBase = React.createRef()
        this.dvTxtArea = React.createRef()
        this.txtArea   = React.createRef()
        this.SelectBoxSection = React.createRef()

        this.setAssigned = this.setAssigned.bind(this)
        this.xSelected = this.xSelected.bind(this)
        this.userSelected = this.userSelected.bind(this)
        this.chooseStatus = this.chooseStatus.bind(this)
        this.hideChoice = this.hideChoice.bind(this)
        this.selectStatus = this.selectStatus.bind(this)
        this.statusName = this.statusName.bind(this)
        this.newLabel = this.newLabel.bind(this)
        this.cancelLabel = this.cancelLabel.bind(this)
        this.changeDesc = this.changeDesc.bind(this)
        this.txtHeght = this.txtHeght.bind(this)
        this.deleteLabel = this.deleteLabel.bind(this)
        this.commitDelete = this.commitDelete.bind(this)
        this.selectLabel = this.selectLabel.bind(this)
        this.setAssigned = this.setAssigned.bind(this)
        this.okAssign = this.okAssign.bind(this)
        this.chooseSection = this.chooseSection.bind(this)
        this.hideSection = this.hideSection.bind(this)
        this.selectSection = this.selectSection.bind(this)
        this.sectionName = this.sectionName.bind(this)
        this.setLabel = this.setLabel.bind(this)
        this.setDataLabel = this.setDataLabel.bind(this)
    }

    componentDidMount(){
        let jsonArray = []
        this.props.dataLabelModule.map(dt => {
            jsonArray.push(dt)
        })

        this.setState({
            idStatus : this.props.moduleStatus,
            idSection : this.props.sectionId,
            dataLabelModule : (this.props.dataLabelModule.length == 0) ? jsonArray : this.props.dataLabelModule,
        })
        
        /*mendeteksi apakah form ini diperuntukan untuk menambahkan task baru*/
        if(this.props.moduleId == null || this.props.moduleId == "") this.isNewModule = true
        
        if(this.txtArea.current != null) this.txtArea.current.style.height = this.dvTxtArea.current.offsetHeight+"px"
    }

    setAssigned(){
        this.setState({
            popupListChoice: <UserListChoice 
                                userSelected={this.userSelected} 
                                xSelected={this.xSelected}
                                projectId={this.props.projectId}
                            />
        })
    }

    xSelected(){
        this.setState({
            popupListChoice: ""
        })
    }

    userSelected(ue, ui, un){
        this.props.changeUserSelected(ue, ui, un)
        this.xSelected()
    }

    chooseStatus(e){
        let scope = this
        let target = ""
        let prtTagId = e.target.parentElement
        if(prtTagId.getAttribute("id") == "slck-box-cstm"){
            target = e.target.parentElement
        }else{
            target = e.target
        }

        let itv = setInterval(() => {
            let w = target.offsetWidth+"px"
            scope.setState({
                statusChoice: <ChoiceStatus width={w}
                                            projectId={this.props.projectId} 
                                            val={this.state.idStatus} 
                                            dataStatus={this.props.dataStatus}
                                            selectStatus={this.selectStatus} 
                                            hideChoice={this.hideChoice}/>
            })
            clearInterval(itv)
        }, 100)
    }

    hideChoice(){
        this.setState({
            statusChoice: ""
        })
    }

    selectStatus(id){
        this.props.changeStatus(id)
        this.props.dataStatus.map(dt => {
            if(id == dt.id){
                this.setState({
                    statusChoice: "",
                    idStatus: dt.id,
                    status: dt.status
                })
            }
        })

        /*reset design birder*/
        let elm = document.getElementById("inf-inp-s1")
        let attr = elm.getAttribute("class").split(" ")[0]
        elm.setAttribute("class", attr)
    }

    statusName(id){
        let statusName = ""
        this.props.dataStatus.map(dt => {
            if(dt.id == id){
                statusName = dt.status
            }
        })
        return statusName
    }

    sectionName(id){
        let section = ""
        this.props.dataSection.map(dt => {
            if(dt.id == id){
                section = dt.section
            }
        })
        return section
    }

    newLabel(){
        this.setState({
            popup: <NewLabel projectId={this.props.projectId}
                            cancel={this.cancelLabel}/>
        })
    }

    cancelLabel(){
        this.setState({
            popup: null
        })
    }

    changeDesc(e){
        this.props.changeDesc(e)
    }

    txtHeght(){
        let hg = this.dvTxtArea.current.offsetHeight
        this.txtArea.current.style.height = hg+"px"
    }

    deleteLabel(label){
        let txt = "Are you sure, you want delete <span class='bold'>"+label+"</span> label"
        this.setState({
            label: label,
            popup: <PopupConfirmation yesAction={this.commitDelete} 
                                    hidePopUp={this.cancelLabel} 
                                    titleConfirmation="Delete label" textPopup={txt}/>
        })
    }

    commitDelete(){
        let form = new FormData()
        form.append("projectId", this.props.projectId)
        form.append("label", this.state.label)

        /*get index array data to remove*/
        let idxArrRemove = []
        for(let i = 0;i<this.props.dataLabelModuleRedux.length;i++){
            let dt = this.props.dataLabelModuleRedux[i]
            if(dt.label == this.state.label){
                idxArrRemove.push(i)
            }
        }

        for (var i = idxArrRemove.length -1; i >= 0; i--){
            this.props.dataLabelModuleRedux.splice(idxArrRemove[i], 1)
        }

        ApiFetch("/delete_label", {
            method: "POST",
            body: form
        }).then(res => res.json()).then(result => {
            this.props.setDataLabel(result.label)
            this.props.setDataLabelModule(result.labelModule)
            this.setState({
                popup: ""
            })
        })
    }

    setAssigned(){
        this.setState({
            popup: <Assigned cancel={this.cancelLabel}  
                            okAssign={this.okAssign}
                            userAssigned={this.props.assignedModules}
                            moduleId={this.props.moduleId} 
                            projectId={this.props.projectId}/>
        })
    }

    okAssign(data){
        this.props.assignedModuleAct(data)
        this.setState({
            popup: ""
        })
    }

    selectLabel(label){
        let jsonObject = {}
        let ready = false;

        if(getCookieUserId() == this.props.pic || this.props.modulePermition){
            /*get data label selected*/
            for(let i = 0;i<this.props.dataLabelRedux.length;i++){
                let dt = this.props.dataLabelRedux[i]
                if(dt.label == label){
                    jsonObject.moduleId = this.props.moduleId
                    jsonObject.projectId = this.props.projectId
                    jsonObject.label = label
                    jsonObject.color = dt.color
                }
            }

            /*set data label selected*/
            for(let i = 0;i<this.state.dataLabelModule.length;i++){
                let dt = this.state.dataLabelModule[i]
                if(dt.label == label && dt.moduleId == this.props.moduleId){
                    ready = true
                    this.state.dataLabelModule.splice(i, 1)
                }
            }
            
            if(!ready){
                this.state.dataLabelModule.push(jsonObject)
            }

            this.setState({
                dataLabelModule: this.state.dataLabelModule
            })

            // console.log(this.state.dataLabelModule)
            /*set new label selected to parent jsx 'detail.js'*/
            this.props.selectLabelModule(this.state.dataLabelModule)
        }else{
            popUpAlert("You did not have permition to change data", "info")
        }   
    }

    chooseSection(){
        this.setState({
            sectionChoice: <ChoiceSection data={this.props.dataSection}
                                selectSection={this.selectSection}
                                hideSection={this.hideSection}/>
        })
    }

    hideSection(){
        this.setState({
            sectionChoice: ""
        })
    }

    selectSection(id){
        this.props.changeSection(id)
        this.setState({
            idSection: id
        })
        this.hideSection()

        /*reset design birder*/
        let elm = document.getElementById("inf-inp-s2")
        let attr = elm.getAttribute("class").split(" ")[0]
        elm.setAttribute("class", attr)
    }

    setLabel(canceling){
        if(!canceling){
            this.setState({
                labeling: <Labeling cancel={this.setLabel} 
                                    okLabel={this.setDataLabel}
                                    moduleId={this.props.moduleId}
                                    projectId={this.props.projectId}
                                    labelSelected={this.state.dataLabelModule}/>
            }) 
        }else{
            this.setState({
                labeling: ""
            })
        }
    }

    setDataLabel(data){
        this.setState({
            labeling: "",
            dataLabelModule: data
        })

        /*set data label modul for passing to api*/
        this.props.selectLabelModule(data)
    }

    render(){
        const dataLabel = this.props.dataLabelRedux.map(dt => {
                let isChecked = false
                let labelPermition = (this.props.modulePermition || this.props.pic == getCookieUserId()) ? true : false
                this.props.dataLabelModule.map(dtt => {
                    if(dtt.moduleId == this.props.moduleId && dtt.label == dt.label){
                        isChecked = true
                    }
                })

                return <LabelModuleDetailItem isChecked={isChecked} 
                                        label={dt.label} 
                                        color={dt.color}
                                        labelPermition={labelPermition}
                                        selectLabel={this.selectLabel}
                                        deleteLabel={this.deleteLabel}/>
        }) 

        const labelDataSelected = this.state.dataLabelModule.map(dt => {
            return  <div style={{padding: "5px", background: dt.color, color: "#FFF", fontSize: "11px", borderRadius: "3px", marginBottom: "5px"}}>
                        <FontAwesomeIcon icon={faTag}/>&nbsp;&nbsp;
                        {dt.label}
                    </div>
        })

        const assigned = this.props.assignedModules.map(dt => {

            let initial = ""
            let name = dt.userName.split(" ")
            
            initial += name[0].substr(0, 1)
            initial += (name[1] != null && name[1] != "") ? name[1].substr(0, 1) : ""

            return <div style={{marginBottom: "10px"}}>
                        <div className="main-color" style={{width: "30px", height: "30px", borderRadius: "100%", position: "relative"}}>
                            <div style={{textAlign: "center", color: "#FFF", marginTop: "7px", width: "30px", position: "absolute"}}>{initial}</div>    
                        </div>  
                        <div style={{marginLeft: "35px", marginTop: "-28px"}}>
                            <span className="bold">{dt.userName}</span><br/>
                            <span style={{fontSize: "10px"}}>{dt.emailUser}</span>
                        </div>
                    </div>
        })

        return(
            <div style={{padding: "10px", paddingLeft: "20px", paddingRight: "20px", display: "flex"}}>
                {this.state.popup}

                <div id="tsk-inf-bs" style={{width: "440px"}}>
                    <table>
                        <tbody>
                        <tr>
                                {
                                    (this.props.pic == getCookieUserId() || this.props.modulePermition || this.isNewModule)
                                    ?
                                        <td colSpan="2">
                                            <div className="second-font-color bold" style={{fontSize: "11px", marginBottom : "3px"}}>Task name</div>
                                            <input id="" className="input-info-mdl" onChange={this.props.changeName} value={this.props.moduleName} style={{padding: "7px", width: "100%", boxSizing: "border-box"}} placeholder="task name" type='text'></input>
                                        </td>
                                    :
                                        <td colSpan="2">
                                            <div className="second-font-color bold" style={{fontSize: "11px", marginBottom : "3px"}}>Task name</div>
                                            <div className="second-background-grs" style={{padding: "5px", borderRadius: "3px", border: "1px solid #CCC"}}>
                                                {this.props.moduleName}
                                            </div>
                                        </td>
                                }
                            </tr>
                            <tr>
                                {
                                    (this.props.pic == getCookieUserId() || this.props.modulePermition || this.isNewModule)
                                    ?
                                        <td>
                                            <div className="second-font-color bold" style={{fontSize: "11px", marginBottom : "3px"}}>Status</div>
                                            <SelectBox id="inf-inp-s1" ref={this.SelectBox} click={this.chooseStatus} 
                                                style={{padding: "7px", overflow: "hidden", border: "#ccc9c9 1px solid", borderRadius: "3px", width: "200px"}} 
                                                value={this.statusName(this.state.idStatus)}/>
                                            <div id="sc-dtl-sts" style={{position: "relative"}}>
                                                {this.state.statusChoice}
                                            </div>
                                        </td>
                                    :
                                        <td>
                                            <div className="second-font-color bold" style={{fontSize: "11px", marginBottom : "3px"}}>Status</div>
                                            <div className="second-background-grs" style={{padding: "5px", borderRadius: "3px", border: "1px solid #CCC", width: "212px"}}>
                                                {(this.props.moduleStatus == 'C') ? 'Close' : 'On Progress'}
                                            </div>
                                        </td>
                                }

                                {
                                    (this.props.pic == getCookieUserId() || this.props.modulePermition || this.isNewModule)
                                    ?
                                        <td style={{paddingLeft: "20px"}}>
                                            <div className="second-font-color bold" style={{fontSize: "11px", marginBottom : "3px"}}>Due date</div>
                                            <input id="inf-inp-2" className="input-info-mdl" style={{padding: "5px"}} onChange={this.props.changeDate} value={this.props.dueDate} type='date'></input>
                                        </td>
                                    :
                                        <td style={{paddingLeft: "20px"}}>
                                            <div className="second-font-color bold" style={{fontSize: "11px", marginBottom : "3px"}}>Due date</div>
                                            <div className="second-background-grs" 
                                                style={{padding: "5px", float: "left", borderRadius: "3px", border: "1px solid #CCC"}}>
                                                <FontAwesomeIcon icon={faCalendarAlt}/>&nbsp;&nbsp;{convertDate_dd_MMM_yyy(this.props.dueDate)}
                                            </div>
                                        </td>
                                }
                            </tr>
                            <tr>
                                {
                                    (this.props.pic == getCookieUserId() || this.props.modulePermition || this.isNewModule)
                                    ?
                                        <td>
                                            <div className="second-font-color bold" style={{fontSize: "11px", marginBottom : "3px"}}>Section</div>
                                            <SelectBox id="inf-inp-s2" ref={this.SelectBoxSection} click={this.chooseSection} 
                                                style={{padding: "7px", overflow: "hidden", border: "#ccc9c9 1px solid", borderRadius: "3px", width: "200px"}} 
                                                value={this.sectionName(this.state.idSection)}/>
                                            <div id="sc-dtl-sts" style={{position: "relative"}}>
                                                {this.state.sectionChoice}
                                            </div>
                                        </td>
                                    :
                                        <td>
                                            <div className="second-font-color bold" style={{fontSize: "11px", marginBottom : "3px"}}>Section</div>
                                            <div className="second-background-grs" style={{padding: "5px", borderRadius: "3px", border: "1px solid #CCC", width: "212px"}}>
                                                {this.sectionName(this.state.idSection)}
                                            </div>
                                        </td>
                                }
                            </tr>
                            <tr>
                                <td colSpan="2" style={{position: "relative"}}>
                                    <div className="second-font-color bold" style={{fontSize: "11px", marginBottom : "3px"}}>Description</div>
                                    <div>
                                    {
                                        (this.props.pic == getCookieUserId() || this.props.modulePermition || this.isNewModule)
                                        ?
                                            <Fragment>
                                                <div ref={this.dvTxtArea} id="bs-dv-dsc-ta-90ss2"
                                                    style={{padding: "7px", paddingBottom: "10px", paddingTop: "10px", borderRadius: "3px", border: "1px solid #CCC", opacity: "0", position: "absolute", zIndex: "-1"}} className="second-background-grs second-font-color"> 
                                                    {(this.props.description != '') ? this.props.description : 'No description'}
                                                </div> 
                                                <textarea ref={this.txtArea} id="bs-ta-dsc-ta-90ss2" className="input-info-mdl" onKeyUp={this.txtHeght} onChange={this.changeDesc} 
                                                    placeholder="insert description" 
                                                    value={this.props.description}
                                                    style={{width: "100%", fontSize: "12px", boxSizing: "border-box", padding: "7px", paddingTop: "10px", paddingBottom: "10px", overflow: "hidden"}}>
                                                </textarea>
                                            </Fragment>
                                            
                                        :
                                            <div style={{padding: "5px", borderRadius: "3px", width: "370px", minHeight: "50px", border: "1px solid #CCC"}} 
                                                className="second-background-grs"> 
                                                {(this.props.description != '') ? this.props.description : 'No description'}
                                            </div>    
                                        
                                    }
                                    </div>
                                </td>
                            </tr>

                            {/* start tidak dipakai */}
                            <tr style={{display: "none"}}>
                                <td colSpan="2" style={{paddingBottom: "10px"}}>
                                    <div className="second-font-color bold" style={{fontSize: "11px", marginBottom : "3px"}}>Label</div>
                                    
                                    <div className="main-border-top" style={{padding: "7px", paddingBottom: "0px"}}>
                                        <div style={{display: "flex"}}>
                                            <div style={{overflow: "hidden", width: "358px"}}>
                                                {/* {assigned} */}
                                                {
                                                    (dataLabel.length > 0)
                                                    ?
                                                        dataLabel
                                                    :
                                                        <div className="second-font-color" style={{padding: "11px", textAlign: "center"}}>
                                                            <span className="bold">There's no label in this project</span><br/>
                                                            <span style={{fontSize: "11px"}}>
                                                                click <FontAwesomeIcon className="main-font-color" icon={faPlusSquare}/> to add new label
                                                            </span>
                                                        </div>
                                                }
                                            </div>

                                            {
                                                (this.props.pic == getCookieUserId() || this.props.modulePermition)
                                                ?
                                                    <div style={{width: "17px", textAlign: "center"}}>
                                                        <a id="btn-set-assign-module" onClick={this.newLabel}>
                                                            <FontAwesomeIcon style={{fontSize: "16px"}} icon={faPlusSquare}/>
                                                        </a>
                                                    </div>
                                                :
                                                    ""
                                            }
                                        </div>
                                    </div>
                                </td>
                            </tr>
                             {/* end tidak dipakai */}
                        </tbody>
                    </table>
                </div>
                <div ref={this.labelBase} className="main-border-left" style={{width: "200px", paddingLeft: "10px", paddingRight: "10px"}}>
                    <div className="second-font-color bold" 
                        style={{fontSize: "11px", marginBottom : "10px", display: "flex", justifyContent: "space-between"}}>
                        <div>Assign To</div>
                        {
                            (this.props.pic == getCookieUserId() || this.props.modulePermition || this.isNewModule)
                            ?
                                <a onClick={this.setAssigned}><FontAwesomeIcon icon={faUserCog}/></a>
                            : 
                                null
                        }
                    </div>
                    <div className="scrollbar" id="bs-data-assigned" style={{fontSize: "11px", maxHeight: "200px"}}>
                        {
                            (this.props.assignedModules.length > 0)
                            ?
                                assigned
                            :
                                <div id="inp-asgn-1" className="second-font-color" style={{padding: "10px", textAlign: "center"}}>
                                    Select assignees<br/>by click <a onClick={this.setAssigned}><FontAwesomeIcon icon={faUserCog}/></a> icon
                                </div>
                        }
                    </div>
                    
                    <div id="base-label-s12i">
                        <div className="second-font-color bold main-border-top" 
                            style={{fontSize: "11px", marginBottom : "10px", position: "relative", marginTop: "10px", paddingTop: "10px", display: "flex", justifyContent: "space-between"}}>
                            <div>Labels</div>
                            <a onClick={() => this.setLabel(false)}>
                                <FontAwesomeIcon className="main-font-color" icon={faEdit}/>
                            </a>
                            {this.state.labeling}
                        </div>

                        <div id="base-data-label-s12i" className="scrollbar" style={{fontSize: "12px", maxHeight: "200px"}}>
                            {
                                (labelDataSelected == "")
                                ?  
                                    <div className="second-font-color" style={{padding: "10px", textAlign: "center"}}>
                                        Select labels<br/>by click <FontAwesomeIcon className="main-font-color" icon={faEdit}/> icon
                                    </div>
                                :
                                    labelDataSelected
                            }
                            
                        </div>
                    </div>
                   
                    {/* {
                        (this.props.pic == getCookieUserId() || this.props.modulePermition)
                        ? 
                            <a onClick={this.setAssigned} style={{textDecoration: "none"}}>
                                <div style={{borderRadius: "3px", marginTop: '5px', border: '1px solid rgb(172 180 208)'}}>
                                    <div style={{padding: "5px", textAlign: "center"}}>
                                        <FontAwesomeIcon style={{fontSize: "14px"}} icon={faUserCog}/>
                                    </div>
                                </div>
                            </a>
                        :
                            ""
                    } */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        dataLabelRedux : state.dataLabels,
        dataLabelModuleRedux : state.dataLabelsModule,
        dataSection : state.sectionModule
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setDataLabel : (data) => dispatch(setDataLabel(data)),
        setDataLabelModule : (data) => dispatch(setDataLabelModule(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (module_info)