import React, { Fragment } from 'react'
import UserListChoice from '../user_list_choice'
import { getCookieUserId,  convertDate_dd_MMM_yyy} from '../../function/function'
import {SelectBox} from '../custom_element'
import ChoiceStatus from '../module/status_choice'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendarAlt, faStickyNote, faTag, faTrashAlt, faEdit, faCog, faUserEdit, faUserCog, faPlus, faPlusSquare} from '@fortawesome/free-solid-svg-icons'
import NewLabel from './new_label'
import {connect} from 'react-redux'
import {ApiFetch} from '../apiFetch'
import PopupConfirmation from '../popup_confirmation'
import { setDataLabel, setDataLabelModule } from '../../redux/action'
import LabelModuleDetailItem from './label_module_detail_item'
import Assigned from './assigned_module'

class module_info extends React.Component{
    readyOperate = false


    constructor(){
        super()
        this.state = {
            popupListChoice: "", 
            statusChoice: "",
            idStatus: "",
            status: "",
            popup: "",
            label: "",
            dataLabelModule: [],
            readyOperate: false
        }
        this.SelectBox = React.createRef()
        this.labelBase = React.createRef()
        this.dvTxtArea = React.createRef()
        this.txtArea   = React.createRef()

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
    }

    componentDidMount(){
        let jsonArray = []
        this.props.dataLabelModule.map(dt => {
            jsonArray.push(dt)
        })

        this.setState({
            idStatus : this.props.moduleStatus,
            dataLabelModule : jsonArray,
            dataLabel: this.props.dataLabelRedux,
        })

        setTimeout(() => {
            this.readyOperate = true
        }, 100)

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
        let ready = false

        if(!this.readyOperate) return false
        
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

        /*set new label selected to parent jsx 'detail.js'*/
        this.props.selectLabelModule(this.state.dataLabelModule)
    }

    render(){
        const dataLabel = this.props.dataLabelRedux.map(dt => {
                let isChecked = false
                
                this.props.dataLabelModuleRedux.map(dtt => {
                    if(dtt.moduleId == this.props.moduleId && dtt.label == dt.label){
                        isChecked = true
                    }
                })

                return <LabelModuleDetailItem isChecked={isChecked} 
                                        label={dt.label} 
                                        color={dt.color}
                                        selectLabel={this.selectLabel}
                                        deleteLabel={this.deleteLabel}/>
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

                <div style={{width: "420px"}}>
                    <table>
                        <tbody>
                        <tr>
                                {
                                    (this.props.pic == getCookieUserId() || this.props.modulePermition)
                                    ?
                                        <td colSpan="2">
                                            <div className="second-font-color bold" style={{fontSize: "10px", marginBottom : "3px"}}>Module name</div>
                                            <input className="input-info-mdl" onChange={this.props.changeName} value={this.props.moduleName} style={{padding: "7px", width: "100%", boxSizing: "border-box"}} placeholder="module name" type='text'></input>
                                        </td>
                                    :
                                        <td colSpan="2">
                                            <div className="second-font-color bold" style={{fontSize: "10px", marginBottom : "3px"}}>Module name</div>
                                            <div className="second-background-grs" style={{padding: "5px", borderRadius: "3px", border: "1px solid #CCC"}}>
                                                {this.props.moduleName}
                                            </div>
                                        </td>
                                }
                            </tr>
                            <tr>
                                {
                                    (this.props.pic == getCookieUserId() || this.props.modulePermition)
                                    ?
                                        <td>
                                            <div className="second-font-color bold" style={{fontSize: "10px", marginBottom : "3px"}}>Status</div>
                                            <SelectBox ref={this.SelectBox} click={this.chooseStatus} 
                                                style={{padding: "7px", overflow: "hidden", border: "#ccc9c9 1px solid", borderRadius: "3px", width: "200px"}} 
                                                value={this.statusName(this.state.idStatus)}/>
                                            {this.state.statusChoice}
                                        </td>
                                    :
                                        <td>
                                            <div className="second-font-color bold" style={{fontSize: "10px", marginBottom : "3px"}}>Status</div>
                                            <div className="second-background-grs" style={{padding: "5px", borderRadius: "3px", border: "1px solid #CCC", width: "212px"}}>
                                                {(this.props.moduleStatus == 'C') ? 'Close' : 'On Progress'}
                                            </div>
                                        </td>
                                }

                                {
                                    (this.props.pic == getCookieUserId() || this.props.modulePermition)
                                    ?
                                        <td style={{paddingLeft: "20px"}}>
                                            <div className="second-font-color bold" style={{fontSize: "10px", marginBottom : "3px"}}>Due date</div>
                                            <input className="input-info-mdl" style={{padding: "5px"}} onChange={this.props.changeDate} value={this.props.dueDate} type='date'></input>
                                        </td>
                                    :
                                        <td style={{paddingLeft: "20px"}}>
                                            <div className="second-font-color bold" style={{fontSize: "10px", marginBottom : "3px"}}>Due date</div>
                                            <div className="bold second-background-grs second-font-color" 
                                                style={{padding: "5px", float: "left", borderRadius: "3px", border: "1px solid #CCC"}}>
                                                <FontAwesomeIcon icon={faCalendarAlt}/>&nbsp;&nbsp;{convertDate_dd_MMM_yyy(this.props.dueDate)}
                                            </div>
                                        </td>
                                }
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <div className="second-font-color bold" style={{fontSize: "10px", marginBottom : "3px"}}>Description</div>
                                    <div>
                                    {
                                        (this.props.pic == getCookieUserId() || this.props.modulePermition)
                                        ?
                                            <Fragment>
                                                <div ref={this.dvTxtArea} style={{padding: "7px", borderRadius: "3px", border: "1px solid #CCC", width: "370px", opacity: "0", position: "absolute", zIndex: "-1"}} className="second-background-grs second-font-color"> 
                                                    {(this.props.description != '') ? this.props.description : 'No description'}
                                                </div> 
                                                <textarea ref={this.txtArea} className="input-info-mdl" onKeyUp={this.txtHeght} onChange={this.changeDesc} 
                                                    placeholder="description" 
                                                    value={this.props.description}
                                                    style={{width: "100%", height: "50px", fontSize: "12px", boxSizing: "border-box", padding: "7px", overflow: "hidden"}}>
                                                </textarea>
                                            </Fragment>
                                            
                                        :
                                            <div style={{padding: "5px", borderRadius: "3px", width: "370px", minHeight: "50px", border: "1px solid #CCC"}} className="second-background-grs second-font-color"> 
                                                {(this.props.description != '') ? this.props.description : 'No description'}
                                            </div>    
                                        
                                    }
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" style={{paddingBottom: "10px"}}>
                                    <div className="second-font-color bold" style={{fontSize: "10px", marginBottom : "3px"}}>Label</div>
                                    
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
                                            <div style={{width: "17px", textAlign: "center"}}>
                                                <a id="btn-set-assign-module" onClick={this.newLabel}>
                                                    <FontAwesomeIcon style={{fontSize: "16px"}} icon={faPlusSquare}/>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div ref={this.labelBase} className="main-border-left" style={{width: "180px", paddingLeft: "10px", paddingRight: "10px"}}>
                    <div className="second-font-color bold" style={{fontSize: "10px", marginBottom : "10px"}}>Assigned</div>
                    <div className="scrollbar" style={{fontSize: "11px", maxHeight: "200px", overflowY: "scroll"}}>
                        {assigned}
                        
                    </div>
                    {
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
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        dataLabelRedux : state.dataLabels,
        dataLabelModuleRedux : state.dataLabelsModule
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setDataLabel : (data) => dispatch(setDataLabel(data)),
        setDataLabelModule : (data) => dispatch(setDataLabelModule(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (module_info)