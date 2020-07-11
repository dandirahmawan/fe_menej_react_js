import React from 'react'
import FunctionImage from '../../../images/function_15.png'
import {ApiFetch} from '../../apiFetch'

class function_data extends React.Component{

    constructor(){
        super()
        this.state = {
            functionName: null,
            search: "",
            data: []
        }

        this.base = React.createRef()
        this.search = this.search.bind(this)
        this.select = this.select.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)
    }

    componentDidMount(){
        document.addEventListener('mouseup', this.handleClickOutside);
        this.base.current.style.top = this.props.x+"px"
        this.base.current.style.left = this.props.y+"px"
        this.setState({
            functionName: this.props.functionName.replace("=", "")
        })

        let functionName = this.props.functionName.replace("=", "") 
        if(functionName != "url" && functionName != "URL"){
            let form = new FormData()
            form.append("projectId", 72)
            form.append("type", functionName)
            ApiFetch("/function_data", {
                method: "POST",
                body: form
            }).then(res => res.json()).then(result => {
                this.setState({
                    data: result
                })
            })
        }
    }

    select(id){
        this.props.target.value = "="+this.state.functionName+"("+id+")"
        this.props.hidePopUp()
    }

    search(e){
        let val = e.target.value
        this.setState({
            search: val
        })
    }

    handleClickOutside(event) {
        if (this.base.current && !this.base.current.contains(event.target)) {
            this.props.hidePopUp()
        }
    }

    render(){
        let count = 0
        const data = this.state.data.map(dt => {
            if(dt.name.match(this.state.search)){
                count++
                return <div onClick={() => this.select(dt.id)} className="tr-selectable" style={{padding: "7px", paddingLeft: "10px", paddingRight: "10px", cursor: "pointer"}}>
                        <div style={{fontSize: "12px"}}>
                            <i className="fa fa-clipboard" style={{fontSize: "14px", color: "#d4ae2b"}}></i> 
                            <div className="bold" style={{marginLeft: "20px", marginTop: "-15px", wordBreak: "break-all", color: "#777"}}>
                                {dt.name}
                            </div>
                        </div>
                    </div>
            }
        })

        return(
            <div ref={this.base} className="main-border" style={style.styleBase}>
                <div className="main-border-bottom second-background-grs" style={{padding: "5px", paddingLeft: "10px", paddingRight: "10px", fontSize: "12px"}}>
                    <img src={FunctionImage} style={{width: "15px"}}/>&nbsp; 
                    <span className="second-font-color bold">{this.state.functionName}</span>
                </div>
                <div className="main-border-bottom">
                    <input type="text" 
                        onKeyUp={this.search}
                        className="main-border-bottom" 
                        placeholder="search" 
                        style={{width: "100%", boxSizing: "border-box", padding: "5px 10px 5px 10px", border: "none"}}/>
                </div>
                <div style={{maxHeight: "300px", overflowY: "scroll"}}>
                    {
                        (count > 0)
                        ?
                            data
                        :
                            <div className="second-font-color" style={{padding: "20px", fontSize: "12px", textAlign: "center"}}>no data to display</div>
                    }
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