import React from 'react'
import FunctionImage from '../../../images/function_15.png'
import {ApiFetch} from '../../apiFetch'

class function_data extends React.Component{

    constructor(){
        super()
        this.state = {
            functionName: null,
            data: []
        }
        this.base = React.createRef()
    }

    componentDidMount(){
        this.base.current.style.top = this.props.x+"px"
        this.base.current.style.left = this.props.y+"px"
        this.setState({
            functionName: this.props.functionName.replace("=", "")
        })

        let form = new FormData()
        form.append("projectId", 72)
        form.append("type", "doc")
        ApiFetch("/function_data", {
            method: "POST",
            body: form
        }).then(res => res.json()).then(result => {
            this.setState({
                data: result
            })
        })
    }

    select(id){
        alert(id)
    }

    render(){

        const data = this.state.data.map(dt => {
            return <div onClick={() => this.select(dt.id)} className="tr-selectable" style={{padding: "7px", paddingLeft: "10px", paddingRight: "10px", cursor: "pointer"}}>
                        <div style={{fontSize: "12px"}}>
                            <i className="fa fa-clipboard" style={{fontSize: "14px", color: "#d4ae2b"}}></i> 
                            <div className="bold" style={{marginLeft: "20px", marginTop: "-15px", wordBreak: "break-all", color: "#777"}}>
                                {dt.name}
                            </div>
                        </div>
                    </div>
        })

        return(
            <div ref={this.base} className="main-border" style={style.styleBase}>
                <div className="main-border-bottom" style={{padding: "5px", paddingLeft: "10px", paddingRight: "10px", fontSize: "12px"}}>
                    <img src={FunctionImage} style={{width: "15px"}}/>&nbsp; 
                    <span className="second-font-color bold">{this.state.functionName}</span>
                </div>
                <div style={{maxHeight: "300px", overflowY: "scroll"}}>
                    {data}
                </div>
            </div>
        )
    }
}

const style = {
    styleBase : {
        width: "250px",
        background: "#FFF", 
        position: "absolute", 
        zIndex: "10002", 
        borderRadius: "3px",
    }
}

const dataFunction = [
    {
        functionName: "URL",
        description: "for add url in your data"
    },
    {
        functionName: "MOD",
        description: "for create module relation data"
    },
    {
        functionName: "DOC",
        description: "for create document file relation data"
    }
]

export default function_data