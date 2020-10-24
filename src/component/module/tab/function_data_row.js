import React from 'react'
import {getIconDocFIle} from '../../../function/function'

export default class funtion_data_row extends React.Component{
    constructor(){
        super()
        this.baseIcon = React.createRef()
    }

    componentDidMount(){
        if(this.props.functionName == "MOD" || this.props.functionName == "mod"){
            let elm = document.createElement("i")
            elm.setAttribute("class", "fas fa-clipboard")
            elm.setAttribute("style", "fontSize: 14px; color: #d4ae2b")
            this.baseIcon.current.append(elm)
        }else{
            getIconDocFIle(this.props.fileName, this.baseIcon.current)
        }
    }

    render(){
        return(
            <div onClick={() => this.props.select(this.props.id, this.props.fileName, this.props.docUrl)} className="tr-selectable" style={{padding: "7px", paddingLeft: "10px", paddingRight: "10px", cursor: "pointer"}}>
                <div style={{fontSize: "12px"}}>
                    <div ref={this.baseIcon}/>
                    <div className="bold" style={{marginLeft: "20px", marginTop: "-15px", wordBreak: "break-all", color: "#777"}}>
                        {this.props.fileName}
                    </div>
                </div>
            </div>
        )
    }
}