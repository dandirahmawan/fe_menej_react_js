import React, { Component, Fragment } from 'react'
import { popCenterPosition, popUpAlert } from '../../function/function'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFill } from '@fortawesome/free-solid-svg-icons'
import { ApiFetch } from '../apiFetch'
import ColorPicker from '../color_picker'

class edit_status_popup extends Component{

    inputEdit = React.createRef()
    cancel = this.cancel.bind(this)
    submit = this.submit.bind(this)
    setColor = this.setColor.bind(this)
    hideColorPicker = this.hideColorPicker.bind(this)
    selectColor = this.selectColor.bind(this)

    state = {
        color: null,
        idStatus: null,
        statusName: null,
        colorPickerBase: null
    }

    componentDidMount(){
        popCenterPosition("edit-status-popup-base")
        let dt = this.props.data
        console.log(dt)
        this.inputEdit.current.value = dt.status
        this.setState({
            color: dt.color,
            idStatus: dt.id,
            statusName: dt.status
        })
    }

    cancel(){
        this.props.cancel()
    }

    submit(){
        let status = this.inputEdit.current.value
        let color = this.state.color
        let id = this.state.idStatus

        /*int statusId, String statusName, int projectId, String color*/
        let form = new FormData()
        form.append("statusId", id)
        form.append("statusName", status)
        form.append("color", color)
        form.append("projectId", this.props.projectId)
        ApiFetch("/edit_status", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == 'true'){
                let newJson = this.props.data
                newJson.color = color
                newJson.status = status
                this.props.updateDataStatus(newJson)
                this.props.cancel()
                popUpAlert("Update data status successfully", "success")
            }else{
                popUpAlert("Failed to update data status")
            }
        })
    }

    setColor(){
        this.setState({
            colorPickerBase: <ColorPicker hidePopUp={this.hideColorPicker} select={this.selectColor}/>
        })
    }

    hideColorPicker(){
        this.setState({colorPickerBase: null})
    }

    selectColor(color){
        this.setState({
            colorPickerBase: null,
            color: color
        })
    }

    render(){
        return(
            <Fragment>
                <div className="block" style={{zIndex: "1001"}}/>
                <div id="edit-status-popup-base" className="pop" style={styleBase}>
                    <div style={{padding: "10px"}}>
                        <span className="bold" style={{fontSize: "14px"}}>Edit status</span>
                        <div className="second-font-color" style={{paddingLeft: "5px", borderLeft: "12px solid "+this.state.color, fontSize: "11px"}}>
                            {this.state.statusName}
                        </div>
                    </div>
                    <div style={{padding: "10px", paddingTop: "0px"}}>
                        <div style={{borderLeft: "8px solid "+this.state.color}}>
                            <input type="text"
                                ref={this.inputEdit} 
                                placeholder="insert status" 
                                style={{padding: "8px", fontSize: '12px', width: "250px", borderLeft: "0px", borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px"}}/>
                        </div>
                        
                        <div style={{marginTop: "2px", marginLeft: "5px"}}>
                            <a onClick={this.setColor} className="second-font-color bold" style={{fontSize: "11px"}}><FontAwesomeIcon icon={faFill}/> change color</a>
                            {this.state.colorPickerBase}
                        </div>
                    </div>
                    <div className="main-border-top" style={{textAlign: "right", padding: "10px"}}>
                        <button onClick={this.submit} className="btn-primary" style={{fontSize: '12px', marginRight: "10px"}}>Save</button>
                        <button onClick={this.cancel} className="btn-secondary" style={{fontSize: "12px"}}>Cancel</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default edit_status_popup

const styleBase = {
    background: "#FFF",
    width: "320px",
    zIndex: "1001",
    borderRadius: "3px"
}