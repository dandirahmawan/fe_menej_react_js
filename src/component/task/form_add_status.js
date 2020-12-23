import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFill} from '@fortawesome/free-solid-svg-icons'
import ColorPicker from './../color_picker'

class form_add_status extends React.Component {
    constructor(){
        super()
        this.state = {
            colorPicker : "",
            colorSelect : "#000"
        }
        this.colorStatus = this.colorStatus.bind(this)
        this.hidePopUp = this.hidePopUp.bind(this)
        this.select = this.select.bind(this)
    }
    
    colorStatus(){
       this.setState({
           colorPicker: <ColorPicker hidePopUp={this.hidePopUp} select={this.select}/>
       })
    }

    hidePopUp(){
        this.setState({
            colorPicker: ""
        })
    }

    select(color){
        this.setState({
            colorPicker: "",
            colorSelect: color
        })
    }

    render(){
        return(
            <div>
                <div>
                    <input type="text" placeholder="new status" style={{padding: "8px", color: this.state.colorSelect}}/>
                    <a onClick={this.colorStatus} style={{marginLeft: "5px", fontSize: "14px"}}><FontAwesomeIcon icon={faFill}/></a>
                </div>
                {this.state.colorPicker}
            </div>
        )
    }
}

export default form_add_status