import React from 'react'
import ReactDom from 'react-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {SpinnerButton} from "../../spinner";
import {baseUrl} from "../../../const/const";

class form_tab extends React.Component{

    constructor(){
        super()
        this.baseForm = React.createRef()
        this.buttonSubmit = React.createRef()
        this.startAction = this.startAction.bind(this)
        this.renderForm = this.renderForm.bind(this)
        this.submit = this.submit.bind(this)
    }

    componentDidMount(){
        this.renderForm(this.props.col, this.props.data)
        this.startAction(this.props.data, this.props.col)
    }

    componentWillReceiveProps(nexProps){
        if(nexProps.seq != this.props.seq){
            this.renderForm(nexProps.col, nexProps.data)
            this.startAction(nexProps.data, nexProps.col)
        }
    }

    startAction(){
        let h1 = document.getElementById("hd-form-tb").offsetHeight
        let h2 = document.getElementById("ft-form-tb").offsetHeight
        let wh = window.innerHeight
        let h = wh - 60
        let hSet = (h - (parseInt(h1) + h2)) - 20
        document.getElementById("bs-form-tab").style.height = hSet+"px"
        this.baseForm.current.style.height = h+"px"
        this.buttonSubmit.current.innerText = "Submit"
        this.buttonSubmit.current.style.opacity = 1
    }

    renderForm(col, data){
        let wrapper = document.getElementById("bs-form-tab")
        wrapper.innerHTML = ""
        let count = Object.keys(col).length;
        for(let i = 0;i<count;i++){
            let elm1 = document.createElement("div")
            elm1.style.marginBottom = "10px"

            let elm2 = document.createElement("div")
            elm2.style.fontSize = "12px"
            elm2.setAttribute("class", "bold")
            elm2.style.marginBottom = "3px"
            elm2.innerText = col[i]+" :"
            elm1.append(elm2)

            let div = document.createElement("div")
            div.style.padding = "5px"
            div.style.fontSize = "12px"
            div.style.width = "80%"
            div.style.position = "absolute"
            div.style.opacity = "0"
            div.style.zIndex = "-1"
            div.setAttribute("class", "div-txt-frm main-border second-background-grs")
            div.innerText = data[i]
            elm1.append(div)

            let txtarea = document.createElement("textarea")
            txtarea.style.fontSize = "12px"
            // txtarea.style.width = "80%"
            // txtarea.style.boxSizing = "border-box"
            txtarea.style.padding = "6px"
            txtarea.placeholder = col[i]
            txtarea.value = data[i]
            txtarea.style.minHeight = "15px"
            // if(data[i].length >= 43) {
            //     txtarea.style.height = "50px"
            // }else{
            //     txtarea.style.height = "27px"
            // }
            txtarea.setAttribute("rows", "1")
            txtarea.setAttribute("class", "txt-val-frm-tab")
            elm1.append(txtarea)

            wrapper.append(elm1)
        }

        let classDiv = document.getElementsByClassName("div-txt-frm")
        for(let i=0;i<classDiv.length;i++){
            let classtxt = document.getElementsByClassName("txt-val-frm-tab")
            let h = classDiv[i].offsetHeight - 10
            let w = classDiv[i].offsetWidth - 10
            classtxt[i].style.height = h+"px"
            classtxt[i].style.width = w+"px"
        }
    }

    submit(e){
        let t = e.target
        ReactDom.render(<SpinnerButton size="15px"/>,  t)
        t.style.opacity = 0.5

        let jo = JSON.parse("{}")
        let emptyCount = 0
        let elm = document.getElementsByClassName("txt-val-frm-tab")
        for(let i = 0;i<elm.length;i++){
            let val = elm[i].value
            jo[i] = val
            if(val == 0) emptyCount++
        }

        let form = new FormData()
        form.append("seq", this.props.seq)
        form.append("tabId", this.props.tabId)
        form.append("data", JSON.stringify(jo))
        fetch(baseUrl+"/edit_tab_data", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == ""){
                this.props.update(jo, this.props.seq)
                ReactDom.render("Submit",  t)
                t.style.opacity = 1
            }
        })
    }

    render(){
        return(
            <div className="main-border-left" ref={this.baseForm} style={{position: "fixed", right: "0px", background: "#FFF", width: "350px", top: "60px"}}>
                <div id="hd-form-tb" className="bold main-border-bottom" style={{padding: "10px", fontSize: "14px", paddingLeft: "20px"}}>
                    Form data
                    <button onClick={this.props.cancelForm}
                            className="second-font-color"
                            style={{float: "right", fontSize: "12px", background: "none"}}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </button>
                </div>
                <div style={{padding: "10px", paddingLeft: "20px", overflowY: "scroll"}} id="bs-form-tab"/>
                <div id="ft-form-tb" className="main-border-top" style={{textAlign: "right", padding: "10px"}}>
                    <button ref={this.buttonSubmit} onClick={this.submit} className="btn-primary" style={{marginRight: "10px"}}>Submit</button>
                    <button onClick={this.props.cancelForm} className="btn-secondary">Cancel</button>
                </div>
            </div>
        )
    }
}
export default form_tab