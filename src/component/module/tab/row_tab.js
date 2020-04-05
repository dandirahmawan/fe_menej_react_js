import React from 'react'

class row_tab extends React.Component{

    constructor(){
        super()
        this.refRow = React.createRef()
        this.renderElement = this.renderElement.bind(this)
    }

    componentDidMount(){
        this.renderElement(this.props.col, this.props.no, this.props.isStarting, this.props.isBorder)
    }

    componentWillReceiveProps(nexProps){
        if(nexProps.col !== this.props.col || nexProps.no != this.props.no || nexProps.isStarting || nexProps.isBorder != this.props.isBorder){
            this.renderElement(nexProps.col, nexProps.no, nexProps.isStarting, nexProps.isBorder)
        }
    }

    renderElement(col, no, isStarting, isBorder){
        this.refRow.current.innerHTML = ""
        let count = Object.keys(col).length;
        let elm0 = document.createElement("td")
        elm0.innerText = no
        if(!isBorder){
            elm0.setAttribute("class", "bold td-tab-data")
        }else{
            elm0.setAttribute("class", "bold td-tab-data main-border")
        }

        elm0.style.padding = "5px"
        elm0.style.width = this.props.elm[0].offsetWidth - 10+"px"
        elm0.style.textAlign = "left"

        this.refRow.current.append(elm0)
        let sumWidth = null
        for(let i = 0;i<count;i++){
            let i2 = parseInt(i) + 1
            let wi = this.props.elm[i2].style.width.replace("px", "")
            let elm1 = document.createElement("td")
            elm1.innerText = col[i];
            if(!isBorder){
                elm1.setAttribute("class", "td-tab-data")
            }else{
                elm1.setAttribute("class", "td-tab-data main-border")
            }

            elm1.style.padding = "5px"
            elm1.style.textAlign = "left"
            elm1.style.wordWrap = "anywhere"

            if(no == 1) elm1.style.width = wi+"px"
            this.refRow.current.append(elm1)
            if(no == 1 && isStarting) {
                sumWidth = this.props.tableHeader.style.width
            }
        }
        if(no == 1 && isStarting){
            let w = sumWidth.replace("px", "")
            let wb = parseInt(sumWidth) + 10
            this.props.bodyTable.style.width = wb+"px"
            this.props.tableHeader.style.width = sumWidth
            this.props.tableTbody.style.width = sumWidth
        }
    }

    render() {
        return (
            <React.Fragment>
                <tr valign="top" onClick={(e) => this.props.formTab(e, this.props.seq)} className="tr-selectable tr-tb-data" ref={this.refRow}/>
            </React.Fragment>
        )
    }
}

export default row_tab