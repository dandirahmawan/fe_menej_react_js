import React, { Component, Fragment } from 'react'
import { popCenterPosition, popUpAlert } from '../../function/function'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faFill } from '@fortawesome/free-solid-svg-icons'
import ColorPicker from '../color_picker'
import { ApiFetch } from '../apiFetch'
import {connect} from 'react-redux'
import PopConfirmation from '../popup_confirmation'
import EditStatusPopup from './edit_status_popup'
import { dataColorPickerNoWhiteGroup } from '../../const/const'

class manage_status extends Component{

    constructor(){
        super()
        this.state = {
            colorStatus: "#000",
            colorPickerBase: null,
            popup: null,
            statusId: null
        }

        this.inputStatus = React.createRef()
        this.submitStatus = this.submitStatus.bind(this)
        this.pickColor = this.pickColor.bind(this)
        this.hidePopUp = this.hidePopUp.bind(this)
        this.selectColor = this.selectColor.bind(this)
        this.delete = this.delete.bind(this)
        this.commitDelete = this.commitDelete.bind(this)
        this.editStatus = this.editStatus.bind(this)
        this.updateDataStatus = this.updateDataStatus.bind(this)
    }

    componentDidMount(){
        popCenterPosition("base-manage-status")
        this.setState({
            dataStatus: this.props.dataStatus
        })
    }

    submitStatus(){
        let val = this.inputStatus.current.value
        if(val == 0){
            popUpAlert("Status is empty")
        }else{
            let form = new FormData()
            form.append("projectId", this.props.projectId)
            form.append("statusName", val)
            form.append("color", this.state.colorStatus)
            ApiFetch("/new_status", {
                method: "POST",
                body: form
            }).then(res => res.json()).then(result => {
                let newData = this.props.dataStatus.concat(result[0])
                this.props.updateDataStatus(newData)
            })
        }
    }

    hidePopUp(){
        this.setState({
            colorPickerBase: null,
            popup: null
        })
    }

    pickColor(){
        this.setState({
            colorPickerBase: <ColorPicker colors={dataColorPickerNoWhiteGroup} hidePopUp={this.hidePopUp} select={this.selectColor}/>
        })
    }

    delete(status, statusId){
        let sts = statusId.toString()
        let canDelete = true
        this.props.dataModuleRedux.map(dt => {
            if(dt.modulStatus == sts){
                canDelete = false
            }
        })

        if(canDelete){
            let textpopup = "Are you sure, you want delete status <span class='bold'>"+status+"</span> from this project?"
            this.setState({
                popup: <PopConfirmation titleConfirmation="Delete status" textPopup={textpopup} yesAction={this.commitDelete} hidePopUp={this.hidePopUp}/>
            })

            this.setState({
                statusId: statusId
            })
        }else{
            popUpAlert("Cannot delete, there's module on this status", "info")
        }
    }

    commitDelete(){
        let idx = 0
        let form = new FormData()
        form.append("statusId", this.state.statusId)
        form.append("projectId", this.props.projectId)
        ApiFetch("/delete_status", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == 'true'){
                let newDataStatus = []
                this.props.dataStatus.map(dt => {
                    if(dt.id != this.state.statusId){
                        newDataStatus.push(dt)
                    }
                    idx++
                })
        
                this.props.updateDataStatus(newDataStatus)
                this.setState({
                    dataStatus: newDataStatus,
                    popup: null
                })
            }
        })
    }

    selectColor(color){
        this.setState({
            colorStatus: color,
            colorPickerBase: null
        })
    }

    editStatus(data){
        this.setState({
            popup: <EditStatusPopup projectId={this.props.projectId} data={data} updateDataStatus={this.updateDataStatus} cancel={this.hidePopUp}/>
        })
    }

    updateDataStatus(jsonData){
        this.setState(prev => {
            const newData = prev.dataStatus.map(dt => {
                if(dt.id == jsonData.id){
                    dt = jsonData
                }
                return dt    
            })
            
            //set new status for info_project_component
            this.props.updateDataStatus(newData)

            //set new state
            return{
                dataStatus: newData
            }
        })

        
    }

    render(){

        const dataView = this.props.dataStatus.map(dt => {
            return <div className="tr-selectable" style={{padding: "8px", marginLeft: "-10px", marginRight: "-10px", paddingLeft: "10px"}}>
                        <div className="bold" style={{fontSize: "12px", borderLeft: "14px solid "+dt.color, paddingLeft: "5px", color: "#717171"}}>
                            <a onClick={() => this.delete(dt.status, dt.id)} style={{float: "right", fontSize: "10px"}}>
                                <FontAwesomeIcon icon={faTrashAlt}/>
                            </a>
                            <a onClick={() => this.editStatus(dt)} style={{float: "right", marginRight: "5px", fontSize: "10px"}}>
                                <FontAwesomeIcon icon={faEdit}/>
                            </a>
                            {dt.status}
                        </div>
                    </div>
        })

        return(
            <Fragment>
                {this.state.popup}
                <div className="block" onClick={this.props.cancel}/>
                <div id="base-manage-status" className="main-border pop" style={{background: "#FFF", width: "300px", height: "300px", borderRadius: "3px"}}>
                    <div className="bold main-border-bottom" style={{padding: "10px", fontSize: "12px"}}>
                        Manage status
                    </div>
                    <div style={{padding: "10px",paddingTop: "0px", height: "210px", overflowY: "scroll"}}>
                        {dataView}
                    </div>
                    <div className="main-border-top" style={{padding: "10px"}}>
                        <div className="main-border-right" style={{float: "left", width: "215px"}}>
                            <input ref={this.inputStatus} 
                                type="text" 
                                className="bold" 
                                placeholder="New status" 
                                style={{padding: "4px", width: "100%", boxSizing: "border-box", fontSize: '12px',  border: "none", color: this.state.colorStatus}}/>
                        </div>
                        {this.state.colorPickerBase}
                        <a onClick={this.submitStatus} style={{fontSize: "11px", float: "right", marginTop: "4px"}}>Submit</a>
                        <a onClick={this.pickColor} style={{fontSize: "11px", float: "right", marginRight: "8px", marginTop: "4px"}}>
                            <FontAwesomeIcon icon={faFill}/>
                        </a>
                    </div>
                </div>
            </Fragment>
        )
    }
}


const mapStateToProps = state => {
    return{
        dataModuleRedux : state.dataModule,
        dataStatus: state.dataStatus
    }
}

export default connect(mapStateToProps) (manage_status)