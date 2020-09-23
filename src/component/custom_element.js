import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'

export class SelectBox extends React.Component{
    render(){
        return(
            <div id="slck-box-cstm" className="input-info-mdl" onClick={this.props.click} style={this.props.style}>
                <div style={{float: "left"}}>
                    {
                        (this.props.value == "" || this.props.value == null)
                        ?
                            "- Select -"
                        :
                            this.props.value
                    }
                </div>
                <div style={{float: "right", color: "#000"}}><FontAwesomeIcon icon={faChevronDown}/></div>
            </div>
        )
    }
}