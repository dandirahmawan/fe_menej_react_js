import React from 'react'
import {getCookieSessionId, getCookieUserId, popCenterPosition, popUpAlert} from "../../../function/function";
import {baseUrl} from "../../../const/const";

class form_add extends React.Component{

    constructor(){
        super()
        this.submit = this.submit.bind(this)
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
            txtarea.style.width = "80%"
            txtarea.style.boxSizing = "border-box"
            txtarea.style.padding = "6px"
            txtarea.placeholder = col[i]
            txtarea.setAttribute("rows", "1")
            txtarea.setAttribute("class", "txt-val-frm-add")

            elm1.append(elm2)
            elm1.append(txtarea)

            wrapper.append(elm1)
        }
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
        fetch(baseUrl+"/new_tab_data", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == ""){
                this.props.cancel()
                this.props.appendDataTab(jo)
                popUpAlert("Insert data success", "success")
            }
        })
    }

    render(){
        return(
            <React.Fragment>
                <div className="block"/>
                <div className="pop" id="base-add-data-form" style={{background: "#FFF", minWidth: "350px"}}>
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