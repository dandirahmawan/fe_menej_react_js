import React from 'react'

class input_form_tab extends React.Component{

    componentDidMount(){
        console.log(this.props.col)
    }

    renderForm(col, data, createdBy){
        // let wrapper = document.getElementById("bs-form-tab")
        // wrapper.innerHTML = ""
        // let count = Object.keys(col).length;
        // for(let i = 0;i<count;i++){
        //     let elm1 = document.createElement("div")
        //     elm1.style.marginBottom = "10px"

        //     let elm2 = document.createElement("div")
        //     elm2.style.fontSize = "12px"
        //     elm2.setAttribute("class", "bold")
        //     elm2.style.marginBottom = "3px"
        //     elm2.innerText = col[i]+" :"
        //     elm1.append(elm2)

        //     let div = document.createElement("div")
        //     div.style.padding = "5px"
        //     div.style.fontSize = "12px"
        //     div.style.width = "80%"
        //     div.style.borderRadius = "3px"
        //     if(createdBy == getCookieUserId()) {
        //         div.style.position = "absolute"
        //         div.style.opacity = "0"
        //         div.style.zIndex = "-1"
        //     }
        //     div.setAttribute("class", "div-txt-frm main-border second-background-grs")
        //     div.innerHTML = (data[i] === undefined) ? "" : (data[i] == "") ? "<span class='second-font-color'>empty</span>" : data[i]
        //     elm1.append(div)

        //     if(createdBy == getCookieUserId()) {
        //         let txtarea = document.createElement("textarea")
        //         txtarea.style.fontSize = "12px"
        //         txtarea.style.padding = "6px"
        //         txtarea.placeholder = col[i]
        //         txtarea.value = (data[i] === undefined) ? "" : data[i]
        //         txtarea.style.minHeight = "15px"
        //         txtarea.setAttribute("rows", "1")
        //         txtarea.setAttribute("class", "txt-val-frm-tab box-shadow")
        //         txtarea.onkeyup = this.keyUpTxtAreaForm
                
        //         //set style cell form tab
        //         let style = data.style
        //         this.setStyleState(i, style, txtarea)
        //         let basePicker = document.createElement("div")
        //         elm1.append(txtarea)
        //         elm1.append(basePicker)
        //         this.pickerBtn(basePicker)
        //     }
        //     wrapper.append(elm1)
        // }

        // let classDiv = document.getElementsByClassName("div-txt-frm")
        // for(let i=0;i<classDiv.length;i++){
        //     let classtxt = document.getElementsByClassName("txt-val-frm-tab")
        //     let h = classDiv[i].offsetHeight - 10
        //     let w = classDiv[i].offsetWidth - 10
        //     if(classtxt[i] !== undefined) {
        //         classtxt[i].style.height = h + "px"
        //         classtxt[i].style.width = w + "px"
        //     }
        // }
    }

    render(){
        return(
            <React.Fragment>
                <div style={{marginBottom: "10px"}}>
                    <div className="bold" style={{fontSize: "12px", marginBottom: "3px"}}>
                        {this.props.columnName}
                    </div>
                    <div style={{padding: "5px", fontSize: "12px", width: "80%", borderRadius: "3px"}}>
                        {this.props.data}
                    </div>
                    <textarea className="txt-val-frm-tab box-shadow" 
                            rows="1"
                            value={this.props.data}
                            style={{fontSize: "12px", padding: "6px", minHeight: "15px"}}/>
                </div>
            </React.Fragment>
        )
    }
}

export default input_form_tab