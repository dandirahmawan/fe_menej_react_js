import React, { Fragment } from 'react'
import { popCenterPosition, popUpAlert } from '../../function/function'
import ColorPicker from '../color_picker'
import {ApiFetch} from '../apiFetch'
import {connect} from 'react-redux'
import { setDataLabel } from '../../redux/action'
import {dataColorPickerNoWhiteGroup} from '../../const/const'
import { faTag } from '@fortawesome/free-solid-svg-icons'

class new_label extends React.Component{
    
    state = {
        color: null
    }

    input = React.createRef()
    selectColor = this.selectColor.bind(this)
    cancel = this.cancel.bind(this)
    submit = this.submit.bind(this)

    componentDidMount(){
        popCenterPosition("base-new-label")
    }

    noAction(){
        //no action needed
    }

    selectColor(color){
        this.input.current.style.background = color
        this.input.current.style.color = "#FFF"
        this.setState({
            color: color
        })
    }

    cancel(){
        this.props.cancel()
    }

    submit(){
        let label = this.input.current.value
        let color = this.state.color
        
        if(label == 0){
            popUpAlert("Label name is empy")
            return false
        }

        if(color == null){
            popUpAlert("Please select color label")
            return false
        }

        let jsonObject = JSON.parse("{}")
        jsonObject.projectId = this.props.projectId
        jsonObject.label = label
        jsonObject.color = color
        
        let jsonArray = []
        jsonArray = this.props.dataLabel
        jsonArray.push(jsonObject)

        let form = new FormData()
        form.append("projectId", this.props.projectId)
        form.append("label", label)
        form.append("color", color)
        ApiFetch("/label",{
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            this.props.setDataLabel(jsonArray)
            this.props.cancel()
            popUpAlert("Insert data label successfully", "success")
        })
    }

    render(){
        return(
            <Fragment>
                <div className="block"></div>
                <div className="pop" id="base-new-label" style={{width: "270px", background: "#FFF"}}>
                    <div className="bold" style={{padding: "10px", fontSize: "14px"}}>
                        New label
                    </div>
                    <div style={{padding: "10px"}}>
                        <div className="second-font-color bold" style={{fontSize: "10px", marginBottom: "3px"}}>Label name</div>
                        <input type="text" ref={this.input} style={{padding: "7px", width: "100%", boxSizing: "border-box"}} placeholder="insert label name"/>
                        
                        <div className="second-font-color bold" style={{fontSize: "10px", marginBottom: "3px", marginTop: "10px"}}>Color label</div>
                        <div style={{height: "100px"}}>
                            <ColorPicker colors={dataColorPickerNoWhiteGroup} hidePopUp={this.noAction} select={this.selectColor}/>
                        </div>
                    </div>
                    <div style={{padding: "10px", textAlign: "right", paddingTop: "0px"}}>
                        <button onClick={this.submit} className="btn-primary" style={{fontSize: "11px"}}>Submit</button>&nbsp;&nbsp;
                        <button onClick={this.cancel} className="btn-secondary" style={{fontSize: "11px"}}>Cancel</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        dataLabel : state.dataLabels
    }
}

const mapDipatchToProps = dispatch => {
    return{
        setDataLabel : (data) => dispatch(setDataLabel(data))
    }
}

export default connect(mapStateToProps, mapDipatchToProps) (new_label)