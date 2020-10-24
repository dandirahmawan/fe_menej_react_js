import React from 'react'
import FunctionImage from '../../../images/function_15.png'
import {ApiFetch} from '../../apiFetch'
import FunctionDataRow from './function_data_row'

class function_data extends React.Component{

    constructor(){
        super()
        this.state = {
            functionName: null,
            search: "",
            data: []
        }

        this.base = React.createRef()
        this.baseIcon = React.createRef()
        this.baseHeader = React.createRef()

        this.search = this.search.bind(this)
        this.select = this.select.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)
    }

    componentDidMount(){
        let url = window.location.href
        let lastIndex = url.lastIndexOf("/")
        let lastString = url.substr(lastIndex + 1, url.length)
        let projectId = lastString.split("?")[0]

        document.addEventListener('mouseup', this.handleClickOutside)
        this.base.current.style.top = this.props.x+"px"
        this.base.current.style.left = this.props.y+"px"
        this.setState({
            functionName: this.props.functionName.replace("=", "")
        })

        let functionName = this.props.functionName.replace("=", "") 
        if(functionName != "url" && functionName != "URL"){
            let form = new FormData()
            form.append("projectId", projectId)
            form.append("type", functionName)
            ApiFetch("/function_data", {
                method: "POST",
                body: form
            }).then(res => res.json()).then(result => {
                this.setState({
                    data: result
                })

                let bottomOffset = (window.innerHeight - this.base.current.offsetTop) - this.props.startTop
                if(bottomOffset < this.base.current.offsetHeight){
                    let mtop = this.base.current.offsetTop - (this.base.current.offsetHeight - bottomOffset) - 10
                    this.base.current.style.top = mtop+"px"
                }
            })
        }
    }

    select(id, name, docUrl){
        let functionText = "="+this.state.functionName+"("+id+")"
        let json = JSON.parse("{}")
        json.functionText = functionText
        json.name = name
        json.id = id
        json.docUrl = docUrl
        
        this.props.target.value = "="+this.state.functionName+"("+id+")"
        this.props.selectFunction(json)
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
            let srcData = this.state.search.replace(/\\/g, "\\\\");
            if(dt.name.match(srcData)){
                count++
                return <FunctionDataRow fileName={dt.name}
                                        id={dt.id}
                                        docUrl={dt.docUrl}
                                        select={this.select} 
                                        functionName={this.state.functionName}/>
            }
        })

        return(
            <div ref={this.base} className="main-border" style={style.styleBase}>
                <div ref={this.baseHeader}>
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
                </div>
                <div style={{maxHeight: "300px", overflowY: "scroll"}}>
                    {
                        (count > 0)
                        ?
                            data
                        :
                            <div className="second-font-color bold" 
                                style={{padding: "20px", fontSize: "12px", textAlign: "center"}}>Data not found</div>
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
        borderRadius: "3px"
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