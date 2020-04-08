import React from 'react'
import ReactDom from 'react-dom'
import {getCookieSessionId, getCookieUserId, popCenterPosition} from "../../../function/function";
import {baseUrl} from "../../../const/const";

class create_table extends React.Component{

    constructor(){
        super()
        this.addColumn = this.addColumn.bind(this)
        this.submit = this.submit.bind(this)
    }

    componentDidMount(){
        popCenterPosition("base-create-table")
    }

    addColumn(){
        let base = document.getElementById("base-l-col")
        let html = base.children
        let c = parseInt(html.length) + 1
        let div1 = document.createElement("div")
        div1.setAttribute("class", "col-crt")
        div1.style.padding = "10px"

        let div2 = document.createElement("div")
        div2.setAttribute("class", "bold")
        div2.style.fontSize = "12px"
        div2.style.marginBottom = "5px"
        div2.innerText = "Column "+c
        div2.setAttribute("id", "cnt-base")

        let input = document.createElement("input")
        input.type = "text"
        input.placeholder = "column name"
        input.style.padding = "8px"
        input.style.width = "230px"

        let btn = document.createElement("button")
        btn.innerText = "X"
        btn.setAttribute("class", "bold second-font-color")
        btn.style.fontSize = "10px"
        btn.style.marginLeft = "5px"
        btn.style.background = "none"
        btn.onclick = this.removeCol

        div1.append(div2)
        div1.append(input)
        div1.append(btn)
        base.append(div1)
    }

    removeCol(e){
        e.target.parentElement.remove()
        let base = document.getElementById("base-l-col")
        let html = base.children
        for(let i = 0;i<html.length;i++){
            let child = html[i].children
            let num = parseInt(i)+1
            child[0].innerText ="Column "+num
        }
    }

    submit(){
        let col = document.getElementsByClassName("col-crt")
        let allFilled = true
        let jo = JSON.parse("{}")
        for(let i = 0;i<col.length;i++){
            let child = col[i].children
            for(let j = 0;j<child.length;j++){
                let tagName = child[j].tagName
                if(tagName == "INPUT"){
                    let val = child[j].value
                    if(val == 0) allFilled = false
                    jo[i] = val
                }
            }
        }
        if(allFilled == false) {
            return false;
        }

        let form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("projectId", this.props.projectId)
        form.append("tabId", this.props.tabId)
        form.append("col", JSON.stringify(jo))
        fetch(baseUrl+"/new_table", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == ""){
                this.props.fetchAction(this.props.tabId)
                this.props.cancel()
            }
        })
    }

    render(){
        return(
            <React.Fragment>
                <div className="block"/>
                <div id="base-create-table" className="pop" style={{background: "#FFF"}}>
                    <div className="bold main-border-bottom second-background-grs" style={{padding: "10px", width: "300px"}}>
                        Create table
                    </div>
                    <div style={{height: "300px", overflowY: "scroll"}}>
                        <div id="base-l-col">
                            <div className="col-crt" style={{padding: "10px"}}>
                                <div className="bold" id="cnt-base" style={{fontSize: "12px", marginBottom: "5px"}}>Column 1 :</div>
                                <input type="text" placeholder="column name" style={{padding: "8px", width: "230px"}}/>
                            </div>
                        </div>
                        <div style={{paddingLeft: "10px", marginBottom: "10px"}}>
                            <a onClick={this.addColumn} className="bold" style={{fontSize: "12px"}}>+ Add column</a>
                        </div>
                    </div>
                    <div style={{padding: "10px", textAlign: "right"}}>
                        <button onClick={this.submit} className="btn-primary">Submit</button>&nbsp;
                        <button onClick={this.props.cancel} className="btn-secondary">Cancel</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default create_table