import React from 'react'
import FunctionImage from '../../../images/function_15.png'

class function_data extends React.Component{

    constructor(){
        super()
        this.state = {
            functionName: null
        }
        this.base = React.createRef()
    }

    componentDidMount(){
        this.base.current.style.top = this.props.x+"px"
        this.base.current.style.left = this.props.y+"px"
        this.setState({
            functionName: this.props.functionName.replace("=", "")
        })
    }

    render(){

        const data = dataFunction.map(dt => {
            return <div className="tr-selectable" style={{padding: "7px", paddingLeft: "10px", paddingRight: "10px", cursor: "pointer"}}>
                        <div style={{fontSize: "12px"}}>
                            <i className="fa fa-clipboard" style={{fontSize: "14px", color: "#d4ae2b"}}></i> 
                            <div style={{marginLeft: "20px", marginTop: "-15px"}}>{dt.description}</div>
                        </div>
                    </div>
        })

        return(
            <div ref={this.base} className="main-border" style={style.styleBase}>
                <div className="main-border-bottom" style={{padding: "5px", paddingLeft: "10px", paddingRight: "10px", fontSize: "12px"}}>
                    <img src={FunctionImage} style={{width: "15px"}}/>&nbsp; 
                    <span className="second-font-color bold">{this.state.functionName}</span>
                </div>
                {data}
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