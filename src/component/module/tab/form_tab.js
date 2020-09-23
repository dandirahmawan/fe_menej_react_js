import React from 'react'
import ReactDom from 'react-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes, faFill, faFont} from '@fortawesome/free-solid-svg-icons'
import {SpinnerButton} from "../../spinner";
import {ApiFetch} from '../../apiFetch'
import {getCookieSessionId, getCookieUserId, popUpAlert} from "../../../function/function"
import FunctionPreview from './function_preview'
import FunctionData from './function_data'
import ColorPicker from '../../color_picker'
import { baseUrl } from '../../../const/const';

class form_tab extends React.Component{

    constructor(){
        super()
        this.state = {
            functionBase: null,
            functionDataBase: null,
            functionSelectData: [],
            colorPicker: null,
            colorPickerBackground: null,
            targetElement: null,
            styleData: {},
            columnSetStyle: null
        }

        this.baseForm = React.createRef()
        this.buttonSubmit = React.createRef()
        this.startAction = this.startAction.bind(this)
        this.renderForm = this.renderForm.bind(this)
        this.submit = this.submit.bind(this)
        this.keyUpTxtAreaForm = this.keyUpTxtAreaForm.bind(this)
        this.hidePopUp = this.hidePopUp.bind(this)
        this.functionSelect = this.functionSelect.bind(this)
        this.hidePopUp = this.hidePopUp.bind(this)
        this.selectFunction = this.selectFunction.bind(this)
        this.setStyleState = this.setStyleState.bind(this)
        this.pickerBtn = this.pickerBtn.bind(this)
        this.colorPickerBackgroundAction = this.colorPickerBackgroundAction.bind(this)
        this.colorPickerColorAction = this.colorPickerColorAction.bind(this)
        this.scrolling = this.scrolling.bind(this)
        this.selectBackground = this.selectBackground.bind(this)
        this.selectColor = this.selectColor.bind(this)
        this.cssSet = this.cssSet.bind(this)
    }

    componentDidMount(){
        this.renderForm(this.props.col, this.props.data, this.props.createdBy)
        this.startAction(this.props.data, this.props.col)
        
        //set style row to state
        if(this.props.data.style !== undefined){
            this.setState({
                styleData: this.props.data.style
            })
        }
    }

    componentWillReceiveProps(nexProps){
        if(nexProps.seq != this.props.seq){
            this.renderForm(nexProps.col, nexProps.data, nexProps.createdBy)
            this.startAction(nexProps.data, nexProps.col)
            
            //set style row to state
            if(nexProps.data.style !== undefined){
                this.setState({
                    styleData: nexProps.data.style
                })
            }
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
        if(this.buttonSubmit.current != null) {
            this.buttonSubmit.current.innerText = "Submit"
            this.buttonSubmit.current.style.opacity = 1
        }
    }

    setStyleState(column, style, elm){
        let tagName = elm.tagName
        let styles = (style !== undefined && style != null && style != "") 
                        ? (style[column] !== undefined) ? style[column].split(";") : 0 : 0
        if(styles == 0){
            if(tagName != "DIV"){
                elm.style.background = "#FFF"
                elm.style.color = "#000"
            }
        }else{
            for(let i = 0;i<styles.length;i++){
                let styleName = styles[i].split(":")[0]
                if(styleName == "background"){
                    let cssColor = styles[i].split(":")[1].substring(0, 4)
                    if(cssColor != "#FFF" && cssColor != "#fff" && tagName == "DIV"){
                        elm.style.background = styles[i].split(":")[1]
                    }else if(tagName == "TEXTAREA"){
                        elm.style.background = styles[i].split(":")[1]
                    }
                }else if(styleName == "color"){
                    elm.style.color = styles[i].split(":")[1]
                }
            }
        }
    }

    renderForm(col, data, createdBy){
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
            div.style.borderRadius = "3px"
            if(createdBy == getCookieUserId()) {
                div.style.position = "absolute"
                div.style.opacity = "0"
                div.style.zIndex = "-1"
            }
            div.setAttribute("class", "div-txt-frm main-border second-background-grs")
            div.innerHTML = (data[i] === undefined) ? "" : (data[i] == "") ? "<span class='second-font-color'>empty</span>" : data[i]
            this.setStyleState(i, data.style, div)
            elm1.append(div)

            if(createdBy == getCookieUserId()) {
                let txtarea = document.createElement("textarea")
                txtarea.style.fontSize = "12px"
                txtarea.style.padding = "6px"
                txtarea.placeholder = col[i]
                txtarea.value = (data[i] === undefined) ? "" : data[i]
                txtarea.style.minHeight = "15px"
                txtarea.setAttribute("rows", "1")
                txtarea.setAttribute("class", "txt-val-frm-tab box-shadow")
                txtarea.onkeyup = this.keyUpTxtAreaForm
                
                //set style cell form tab
                let style = data.style
                this.setStyleState(i, style, txtarea)
                let basePicker = document.createElement("div")
                elm1.append(txtarea)
                elm1.append(basePicker)
                this.pickerBtn(basePicker, i)
            }
            wrapper.append(elm1)
        }

        let classDiv = document.getElementsByClassName("div-txt-frm")
        for(let i=0;i<classDiv.length;i++){
            let classtxt = document.getElementsByClassName("txt-val-frm-tab")
            let h = classDiv[i].offsetHeight - 10
            let w = classDiv[i].offsetWidth - 10
            if(classtxt[i] !== undefined) {
                classtxt[i].style.height = h + "px"
                classtxt[i].style.width = w + "px"
            }
        }
    }

    pickerBtn(elm, column){
        let btn = document.createElement("button")
        btn.onClick = ""
        ReactDom.render(<div style={{marginTop: "-3px"}}>
                            <button onClick={(e) => this.colorPickerBackgroundAction(e, elm, column)} className="second-font-color" style={{fontSize: "12px", background: "none", paddingRight: "10px"}}><FontAwesomeIcon icon={faFill}/></button>
                            <button onClick={(e) => this.colorPickerColorAction(e, elm, column)} className="second-font-color main-border-left" style={{fontSize: "12px", background: "none", paddingLeft: "10px"}}><FontAwesomeIcon icon={faFont}/></button>
                            </div>, 
                        elm)
    }

    colorPickerBackgroundAction(e, elm, column){
        var x = e.clientX + "px"   // Get the horizontal coordinate
        var y = e.clientY + "px"    // Get the vertical coordinate
        this.setState({
            colorPicker: <ColorPicker select={this.selectBackground} left={x} top={y} hidePopUp={this.hidePopUp}/>,
            targetElement: elm,
            columnSetStyle: column
        })
    }

    colorPickerColorAction(e, elm, column){
        var x = e.clientX + "px"   // Get the horizontal coordinate
        var y = e.clientY + "px"    // Get the vertical coordinate
        this.setState({
            colorPicker: <ColorPicker select={this.selectColor} left={x} top={y} hidePopUp={this.hidePopUp}/>,
            targetElement: elm,
            columnSetStyle: column
        })
    }

    selectColor(color){
        let prt = this.state.targetElement.parentElement
        let children = prt.children
        let columnSet = this.state.columnSetStyle
        children[1].style.color = color
        children[2].style.color = color
        this.cssSet("color", color, this.state.styleData[columnSet], columnSet)
    }

    selectBackground(color){
        let prt = this.state.targetElement.parentElement
        let children = prt.children
        let columnSet = this.state.columnSetStyle
        children[1].style.background = color
        children[2].style.background = color
        console.log(this.state.styleData)
        this.cssSet("background", color, this.state.styleData[columnSet], columnSet)
    }

    cssSet(styleName, styleValue, styleData, column){
        let dataStyleEdit = ""
        if(styleData !== undefined && styleData != "" && styleData != null){
            let arrStyle = styleData.split(";")
            let isMatch = false /*for chechking is style name is ready in css*/
            for(let i = 0;i<arrStyle.length;i++){
                if(styleName == arrStyle[i].split(":")[0]){
                    dataStyleEdit += styleName+":"+styleValue+";"
                    isMatch = true
                }else{
                    dataStyleEdit += (arrStyle[i] != "") ? arrStyle[i]+";" : ""
                }
                
                //add new attribute style
                let ii = parseInt(i) + 1
                if(ii == arrStyle.length && !isMatch){
                    dataStyleEdit += styleName+":"+styleValue+";"
                }
            }
        }else{
            dataStyleEdit = styleName+":"+styleValue+";"
        }

        this.state.styleData[column] = dataStyleEdit
        this.setState({
            styleData: this.state.styleData
        })
        return null
    }

    keyUpTxtAreaForm(e){
        var x = e.target.offsetTop    // Get the horizontal coordinate
        var y = e.target.offsetLeft    // Get the vertical coordinate

        let prt = e.target.parentElement
        let divTxtPreview = prt.children
        for(let i = 0;i<divTxtPreview.length;i++){
            let cname = divTxtPreview[i].className
            let value = e.target.value
            if (cname.match(/div-txt-frm*/)) {
                divTxtPreview[i].innerText = value
                let h = divTxtPreview[i].offsetHeight - 12
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

    hidePopUp(){
        this.setState({
            functionBase: null,
            functionDataBase: null,
            colorPicker: null
        })
    }

    functionSelect(target, x, y, functionName){
        let x1 = parseInt(x) + 20
        let y1 = parseInt(y) + 50
        let startTop = this.baseForm.current.offsetTop
        this.setState({
            functionBase: null,
            functionDataBase: <FunctionData functionName={functionName}
                                            hidePopUp={this.hidePopUp}
                                            target={target}
                                            startTop={startTop}
                                            selectFunction={this.selectFunction}
                                            x={x1} 
                                            y={y1}/>
        })
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

    scrolling(){
        this.setState({
            colorPicker: null,
            colorPickerBackground: null
        })
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

        //merge style data
        jo.style = this.state.styleData
        
        let form = new FormData()
        form.append("seq", this.props.seq)
        form.append("tabId", this.props.tabId)
        form.append("data", JSON.stringify(jo))

        ApiFetch("/edit_tab_data", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == ""){
                this.props.update(jo, this.props.seq, this.state.functionSelectData)
                ReactDom.render("Submit",  t)
                t.style.opacity = 1
                this.props.cancelForm()
                popUpAlert("Data successfully updated", "success")
            }
        })
    }

    render(){
        return(
            <div className="main-border-left" ref={this.baseForm} onScroll={this.scrolling} style={{position: "fixed", right: "0px", background: "#FFF", width: "350px", top: "60px", zIndex: "1"}}>
                {this.state.functionBase}
                {this.state.functionDataBase}
                {this.state.colorPicker}
                {this.state.colorPickerBackground}

                <div id="hd-form-tb" className="bold main-border-bottom" style={{padding: "10px", fontSize: "14px", paddingLeft: "20px"}}>
                    Form data
                    <button onClick={this.props.cancelForm}
                            className="second-font-color"
                            style={{float: "right", fontSize: "12px", background: "none"}}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </button>
                </div>
                <div style={{padding: "10px", paddingLeft: "20px", overflowY: "scroll"}} id="bs-form-tab">
                    {
                        /* renderForm function will create element input (textarea) in here */
                    }
                </div>
                {
                    (this.props.createdBy == getCookieUserId())
                    ?
                        <div id="ft-form-tb" className="main-border-top" style={{textAlign: "right", padding: "10px"}}>
                            <button ref={this.buttonSubmit} onClick={this.submit} className="btn-primary" style={{marginRight: "10px"}}>
                                Submit
                            </button>
                            <button onClick={this.props.cancelForm} className="btn-secondary">Cancel</button>
                        </div>
                    :
                        <div id="ft-form-tb"/>
                }
            </div>
        )
    }
}
export default form_tab