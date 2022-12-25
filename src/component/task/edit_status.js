import React from 'react'
import ReactDom from 'react-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircle, faFill} from '@fortawesome/free-solid-svg-icons'
import {SpinnerButton} from '../spinner'
import { ApiFetch } from '../apiFetch'
import { popUpAlert } from '../../function/function'
import ColorPicker from '../color_picker'

class edit_status extends React.Component{
    
    constructor(){
        super()
        this.state = {
            status : "",
            color: "",
            colorPickerBase: ""
        }
        this.baseEdit = React.createRef()
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
        this.selectColor = this.selectColor.bind(this)
        this.hideColorPicker = this.hideColorPicker.bind(this)
        this.selectingColor = this.selectingColor.bind(this)
    }

    componentDidMount(){
        var elm = this.baseEdit.current
        var h = elm.offsetHeight
        var w = elm.offsetWidth

        var l = (window.innerWidth - w) / 2
        var t = (window.innerHeight - h) / 2

        elm.style.left = l+"px"
        elm.style.top = t+"px"

        this.setState({
            status : this.props.status,
            color : this.props.color
        })
    }

    submit(e){
        let elm = e.target
        elm.style.opacity = "0.5"
        ReactDom.render(<SpinnerButton size="13px"/>, elm)

        let form = new FormData()
        form.append("projectId", this.props.projectId)
        form.append("statusName", this.state.status)
        form.append("statusId", this.props.id)
        form.append("color", this.state.color)
        
        ApiFetch("/edit_status", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == "true"){
                this.props.updateDataStatus(this.props.id, this.state.status, this.state.color)
            }else{
                popUpAlert("Failed edit status")
            }
        })
    }

    handleChange(e){
        this.setState({
            status: e.target.value
        })
    }

    selectColor(){
        this.setState({
            colorPickerBase: <ColorPicker hidePopUp={this.hideColorPicker} select={this.selectingColor}/>
        })
    }

    hideColorPicker(){
        this.setState({
            colorPickerBase: ""
        })
    }

    selectingColor(color){
        this.setState({
            color: color
        })
    }

    render(){
        return(
            <React.Fragment>
                <div onClick={this.props.hidePopup} className="block"/>
                <div className='pop' ref={this.baseEdit} style={{background: "#FFF", width: "250px"}}>
                    <div style={{padding: '10px', fontSize:"12px"}}>                                  
                        <span className="bold">Edit status</span>
                    </div>
                    <div style={{padding: '10px', paddingTop: "5px"}}>
                        <div className="bold" style={{fontSize: "11px", marginBottom: "3px"}}>
                            <FontAwesomeIcon className="test" 
                                            style={{color: this.state.color}} 
                                            icon={faCircle}/>&nbsp;&nbsp;<span className="second-font-color">{this.props.status}</span>
                        </div>
                        <input type="text" onChange={this.handleChange} value={this.state.status} placeholder="insert status" style={{padding: "8px", border: "1px solid "+this.state.color}}/>
                        <FontAwesomeIcon onClick={this.selectColor} icon={faFill} className="second-font-color" style={{marginLeft: "10px", fontSize: "14px"}}/>
                        {this.state.colorPickerBase}
                    </div>
                    <div className="header-second-background bold" style={{padding: "10px", textAlign: "right"}}>
                        <button onClick={this.submit} className="btn-primary" style={{fontSize: "11px", marginRight: "10px"}}>Submit</button>
                        <button onClick={this.props.hidePopUp} className="btn-secondary" style={{fontSize: "11px"}}>Cancel</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default edit_status