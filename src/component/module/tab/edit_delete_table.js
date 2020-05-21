import React from 'react'
import {getCookieSessionId, getCookieUserId, popCenterPosition, popUpAlert} from "../../../function/function";
import {baseUrl} from "../../../const/const";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

class edit_delete_table extends React.Component{

    constructor(){
        super()
        this.state = {
            deleteTable: false,
            colTable: null,
            delCol:[]
        }

        this.baseEdit = React.createRef()
        this.baseDelete = React.createRef()
        this.delnav = this.delnav.bind(this)
        this.editNav = this.editNav.bind(this)
        this.renderEditBase = this.renderEditBase.bind(this)
        this.submitEdit = this.submitEdit.bind(this)
        this.removeColumn = this.removeColumn.bind(this)
        this.submitDelete = this.submitDelete.bind(this)
        this.addColumn = this.addColumn.bind(this)
    }

    componentDidMount(){
        popCenterPosition("bs-edit-del-tab-tbl")
        this.setState({
            colTable: this.props.colTable
        })
        this.baseDelete.current.style.display = "none"
        this.renderEditBase(this.props.colTable)
    }

    renderEditBase(col){
        let count = Object.keys(col).length;
        for(let i = 0;i<count;i++) {
            let no = parseInt(i) + 1
            let div = document.createElement("div")
            div.style.fontSize = "11px"
            div.style.marginBottom = "10px"

            let span = document.createElement("span")
            span.setAttribute("class", "bold ttl-col-seq")
            span.innerText = "column " + no + " :"
            let br = document.createElement("br")

            let text = document.createElement("input")
            text.type = "text"
            text.placeholder = "column name"
            text.style.padding = "5px"
            text.style.marginTop = "5px"
            text.setAttribute("class", "ip-edit-tab-tbl")
            text.value = col[i]

            let ielm = document.createElement("i")
            ielm.setAttribute("class", "fa fa-times")

            let btn = document.createElement("button")
            btn.style.fontSize = "10px"
            btn.style.background = "none"
            btn.setAttribute("class", "second-font-color")
            btn.onclick = (e) => this.removeColumn(e, i)
            btn.append(ielm)

            div.append(span)
            div.append(br)
            div.append(text)
            div.append(btn)
            console.log(div)
            this.baseEdit.current.append(div)
        }
    }

    addColumn(){
        let elm = document.getElementsByClassName("ttl-col-seq")
        let no = parseInt(elm.length) + 1

        let div = document.createElement("div")
        div.style.fontSize = "11px"
        div.style.marginBottom = "10px"

        let span = document.createElement("span")
        span.setAttribute("class", "bold ttl-col-seq")
        span.innerText = "column " + no + " :"
        let br = document.createElement("br")

        let text = document.createElement("input")
        text.type = "text"
        text.placeholder = "column name"
        text.style.padding = "5px"
        text.style.marginTop = "5px"
        text.setAttribute("class", "ip-edit-tab-tbl")

        let ielm = document.createElement("i")
        ielm.setAttribute("class", "fa fa-times")

        let btn = document.createElement("button")
        btn.style.fontSize = "10px"
        btn.style.background = "none"
        btn.setAttribute("class", "second-font-color")
        btn.onclick = (e) => this.removeColumn(e, null)
        btn.append(ielm)

        div.append(span)
        div.append(br)
        div.append(text)
        div.append(btn)
        console.log(div)
        this.baseEdit.current.append(div)
    }

    removeColumn(e, seqCol){
        let elm = document.getElementsByClassName("ttl-col-seq")
        if(elm.length == 1){
            popUpAlert("This is the last one")
            return false
        }
        let tag = e.target.tagName
        let prt = (tag == "I") ? e.target.parentElement.parentElement : e.target.parentElement
        if(seqCol != null) this.state.delCol.push(seqCol)
        prt.remove()
        for(let i = 0;i<elm.length;i++){
            let no = parseInt(i) + 1
            elm[i].innerText = "column "+no+" :"
        }
    }

    editNav(){
        let elm = document.getElementsByClassName("nav-btn-ed-tb")
        elm[1].style.borderRight = "none"
        elm[1].setAttribute("class", elm[1].getAttribute("class")+" second-font-color")
        elm[0].style.borderRight = "2px solid #386384"
        elm[0].setAttribute("class", "nav-btn-ed-tb bold")

        this.baseDelete.current.style.display = "none"
        this.baseEdit.current.parentElement.style.display = "block"
    }

    submitEdit(){
        let col = document.getElementsByClassName("ip-edit-tab-tbl")
        let allFilled = true
        let jo = JSON.parse("{}")
        for(let i = 0;i<col.length;i++){
            let tagName = col[i].tagName
            if(tagName == "INPUT"){
                let val = col[i].value
                if(val == 0) allFilled = false
                jo[i] = val
            }
        }

        if(allFilled == false) {
            return false;
        }

        let form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("col", JSON.stringify(jo))
        form.append("tabId", this.props.tabId)
        form.append("re_col", this.state.delCol)
        fetch(baseUrl+"/edit_table", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == ""){
                this.props.fetchAction()
                this.props.cancel()
            }
        })
    }

    delnav(){
        let elm = document.getElementsByClassName("nav-btn-ed-tb")
        elm[0].style.borderRight = "none"
        elm[0].setAttribute("class", "nav-btn-ed-tb second-font-color")
        elm[1].style.borderRight = "2px solid #386384"
        elm[1].setAttribute("class", "nav-btn-ed-tb bold")

        this.baseDelete.current.style.display = "block"
        this.baseEdit.current.parentElement.style.display = "none"
    }

    submitDelete(){
        let form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("tabId", this.props.tabId)

        fetch(baseUrl+"/delete_tab_table", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == ""){
                this.props.fetchAction()
                this.props.cancel()
            }
        })
    }

    render(){

        return(
            <React.Fragment>
                <div className="block"/>
                <div id="bs-edit-del-tab-tbl" className="pop" style={{width: "451px", background: "#fff"}}>
                    <div className="bold main-border-bottom" style={{fontSize: "14px", padding: "10px"}}>Edit / delete table</div>
                    <div style={{overflow: "hidden"}}>
                        <div className="main-border-right" style={{float: "left", width: "130px", height: "300px"}}>
                            <button onClick={this.editNav} className="nav-btn-ed-tb"
                                    style={{width: "131px",
                                        padding: "5px",
                                        paddingLeft: "10px",
                                        textAlign: "left",
                                        background: "none",
                                        fontSize: "12px",
                                        borderRight: "2px solid #386384",
                                        marginTop: "5px"}}>
                                Edit table
                            </button>
                            <button onClick={this.delnav} className="nav-btn-ed-tb second-font-color"
                                    style={{width: "131px", padding: "5px", paddingLeft: "10px", marginTop: "5px", textAlign: "left", background: "none", fontSize: "12px"}}>
                                Delete table
                            </button>
                        </div>
                        <div style={{float: "left", width: "320px", height: "300px", overflowY: "scroll"}}>

                                <div ref={this.baseDelete} style={{padding: "10px", paddingLeft: "20px"}}>
                                    <span className="bold" style={{fontSize: "14px"}}>Delete table</span><br/>
                                    <span style={{fontSize: "12px"}}>Are you sure, you want delete tabel</span><br/>
                                    <button onClick={this.submitDelete}
                                            className="btn-primary" style={{marginTop: "10px", fontSize: "12px"}}>
                                        yes
                                    </button>
                                    <button onClick={this.props.cancel}
                                            className="btn-secondary" style={{marginTop: "10px", fontSize: "12px", marginLeft: "10px"}}>
                                        cancel
                                    </button>
                                </div>

                                <div style={{padding: '10px', paddingLeft: '20px'}}>
                                    <div ref={this.baseEdit} style={{padding: "10px", paddingLeft: "20px"}}/>
                                    <div style={{paddingLeft: "20px", marginTop: "-10px", marginBottom: "10px", fontSize: "11px"}}>
                                        <FontAwesomeIcon icon={faPlus}/>&nbsp;<a onClick={this.addColumn} className="bold">Add column</a>
                                    </div>
                                    <div style={{paddingLeft: "20px", paddingBottom: "10px"}}>
                                        <button onClick={this.submitEdit} className="btn-primary">Submit</button>&nbsp;
                                        <button onClick={this.props.cancel} className="btn-secondary">Cancel</button>
                                    </div>
                                </div>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default edit_delete_table