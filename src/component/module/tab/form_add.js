import React from 'react'
import {getCookieSessionId, getCookieUserId, popCenterPosition, popUpAlert} from "../../../function/function";
import {ApiFetch} from '../../apiFetch'
import FunctionPreview from './function_preview'
import FunctionData from './function_data'

class form_add extends React.Component{

    constructor(){
        super()
        this.state = {
            functionBase : null,
            functionDataBase : null,
            functionSelectData: []
        }
        this.baseForm = React.createRef()
        this.submit = this.submit.bind(this)
        this.hidePopUp = this.hidePopUp.bind(this)
        this.keyUpTxtAreaForm = this.keyUpTxtAreaForm.bind(this)
        this.functionSelect = this.functionSelect.bind(this)
        this.selectFunction = this.selectFunction.bind(this)
    }

    componentDidMount(){
        this.renderForm(this.props.col)
        popCenterPosition("base-add-data-form")
    }

    renderForm(col){
        let wrapper = document.getElementById("bs-inp-form")
        let count = Object.keys(col).length;
        for(let i = 0;i<count;i++){
            let elm1 = document.createElement("div")
            elm1.style.marginBottom = "10px"

            let elm2 = document.createElement("div")
            elm2.style.fontSize = "12px"
            elm2.setAttribute("class", "bold")
            elm2.style.marginBottom = "3px"
            elm2.innerText = col[i]+" :"

            let txtarea = document.createElement("textarea")
            txtarea.style.fontSize = "12px"
            txtarea.style.width = "300px"
            txtarea.style.boxSizing = "border-box"
            txtarea.style.padding = "6px"
            txtarea.style.minHeight = "15px"
            txtarea.placeholder = col[i]
            txtarea.setAttribute("rows", "1")
            txtarea.setAttribute("class", "txt-val-frm-add box-shadow")
            txtarea.onkeyup = this.keyUpTxtAreaForm

            let divText = document.createElement("div")
            divText.setAttribute("class", "div-txt-frm")
            divText.style.fontSize = "12px"
            divText.style.padding = "6px"
            divText.style.paddingTop = "7px"
            divText.style.paddingBottom = "7px"
            divText.style.minHeight = "15px"
            divText.style.position = "absolute"
            divText.style.opacity = "0"
            divText.style.zIndex = "-1"
            divText.style.width = "288px"

            let wraper = document.createElement("div")
            wraper.setAttribute("class", "wrapper-frm-input")

            wraper.append(divText)
            wraper.append(txtarea)

            elm1.append(elm2)
            elm1.append(wraper)
            wrapper.append(elm1)
        }
    }

    hidePopUp(){
        this.setState({
            functionBase: null,
            functionDataBase: null
        })
    }

    submit(){
        let jo = JSON.parse("{}")
        let input = document.getElementsByClassName("txt-val-frm-add")
        let emptyCount = 0
        for(let i = 0;i<input.length;i++){
            jo[i] = input[i].value
            if(input[i].value == 0) emptyCount++
        }

        if(emptyCount == input.length){
            popUpAlert("All column is empty")
            return false
        }

        let form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("data", JSON.stringify(jo))
        form.append("tabId", this.props.tabId)

        ApiFetch("/new_tab_data", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == ""){
                this.props.cancel()
                this.props.appendDataTab(jo, this.state.functionSelectData)
                popUpAlert("Insert data success", "success")
            }
        })
    }

    functionSelect(target, x, y, functionName){
        let x1 = parseInt(x) + 20
        let y1 = parseInt(y) + 50
        if(functionName != "url" && functionName != "URL"){
            this.setState({
                functionBase: null,
                functionDataBase: <FunctionData functionName={functionName}
                                                hidePopUp={this.hidePopUp}
                                                startTop={this.baseForm.current.offsetTop}
                                                target={target}
                                                selectFunction={this.selectFunction}
                                                x={x1} 
                                                y={y1}/>
            })
        }
    }

    selectFunction(jsonValue){
        var isPush = true
        this.state.functionSelectData.map(dt => {
            if(dt.functionText == jsonValue.functionText){
                isPush = false
            }
        })

        if(isPush) this.state.functionSelectData.push(jsonValue)
    }

    keyUpTxtAreaForm(e){
        var x = e.target.offsetTop    // Get the horizontal coordinate
        var y = e.target.offsetLeft    // Get the vertical coordinate

        let prt = e.target.parentElement
        let divTxtPreview = prt.children
        // console.log(divTxtPreview)
        for(let i = 0;i<divTxtPreview.length;i++){
            let cname = divTxtPreview[i].className
            let value = e.target.value
            if (cname.match(/div-txt-frm*/)) {
                divTxtPreview[i].innerText = value
                let h = divTxtPreview[i].offsetHeight
                e.target.style.height = h+"px"
            }
        }

        if(e.target.value == "="){
            this.setState({
                functionBase : <FunctionPreview x={x} 
                                                y={y}
                                                select={this.functionSelect} 
                                                target={e.target} 
                                                hidePopUp={this.hidePopUp}/>
            })
        }else{
            this.setState({
                functionBase : null
            })
        }
    }

    render(){
        return(
            <React.Fragment>
                <div className="block"/>
                <div className="pop" ref={this.baseForm} id="base-add-data-form" style={{background: "#FFF", width: "380px"}}>
                    {this.state.functionBase}
                    {this.state.functionDataBase}

                    <div className="bold main-border-bottom" style={{padding: "10px", fontSize: "14px"}}>
                        Add Data
                    </div>
                    <div id="bs-inp-form" style={{padding: "10px", maxHeight: "400px", overflowY: "scroll"}}>

                    </div>
                    <div style={{padding: "10px", textAlign: "right"}}>
                        <button onClick={this.submit} className="btn-primary" style={{marginRight: "10px"}}>Submit</button>
                        <button onClick={this.props.cancel} className="btn-secondary">Cancel</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default form_add