import React from 'react'

class row_tab extends React.Component{

    constructor(){
        super()
        this.state = {
            baseEditCell: null
        }
        this.refRow = React.createRef()
        this.renderElement = this.renderElement.bind(this)
        this.removeRow = this.removeRow.bind(this)
    }

    componentDidMount(){
        this.renderElement(this.props.col, this.props.no, this.props.isStarting, this.props.isBorder, this.props.colHeader)
    }

    componentWillReceiveProps(nexProps){
        if(
            nexProps.col !== this.props.col || 
            nexProps.no != this.props.no || 
            nexProps.isStarting || 
            nexProps.isBorder != this.props.isBorder || 
            nexProps.col != this.props.col ||
            nexProps.isCellEdit ||
            nexProps.dataFilter != this.props.dataFilter
        )
        {
            this.renderElement(nexProps.col, nexProps.no, nexProps.isStarting, this.props.isBorder, this.props.colHeader)
        }
    }

    validationRenderElement(dataFilter, column){
        let returnData = "bad"
        var count = Object.keys(column).length
        for(let i = 0;i<count;i++){
            let idx = dataFilter[i].indexOf(column[i])
            if(idx != -1) {
                returnData = "ok"
                this.setState({
                    isRender: true
                })
            }
        }
        return returnData
    }

    renderElement(col, no, isStarting, isBorder, colHeader){
        this.refRow.current.innerHTML = ""
        let countColHeader = Object.keys(colHeader).length
        let elm0 = document.createElement("td")
        elm0.innerText = no
        if(!isBorder){
            elm0.setAttribute("class", "second-background-grs td-tab-data")
        }else{
            elm0.setAttribute("class", "second-background-grs td-tab-data main-border")
        }

        elm0.style.padding = "5px"
        elm0.style.width = this.props.elm[0].offsetWidth - 10+"px"
        elm0.style.textAlign = "left"

        //append column number
        this.refRow.current.append(elm0)
        let sumWidth = null
        for(let i = 0;i<countColHeader;i++){
            let i2 = parseInt(i) + 1
            if(this.props.elm[i2] !== undefined) {
                let wi = this.props.elm[i2].style.width.replace("px", "")
                let elm1 = document.createElement("td")
                elm1.innerText = (col[i] === undefined) ? "" : col[i]
                if (!isBorder) {
                    elm1.setAttribute("class", "td-tab-data tab-cell")
                } else {
                    elm1.setAttribute("class", "td-tab-data tab-cell main-border")
                }

                elm1.style.padding = "5px"
                elm1.style.textAlign = "left"
                elm1.style.wordWrap = "anywhere"

                let rowNumber = no - 1
                let colNumber = i
                elm1.oncontextmenu = (e) => this.props.cellContextMenu(e, rowNumber, colNumber)

                elm1.style.width = wi + "px"
                this.refRow.current.append(elm1)
                if (no == 1 && isStarting) {
                    sumWidth = this.props.tableHeader.style.width
                }
            }
        }
    }

    removeRow(){
        let elm = this.refRow.current
        if(elm != null) elm.remove()
    }

    render() {
        return (
            <React.Fragment>
                {this.state.baseEditCell}
                    <tr valign="top"
                        onClick={(e) => this.props.formTab(e, this.props.seq)}
                        className="tr-selectable tr-tb-data main-border"
                        ref={this.refRow}
                        style={{background: "#FFF"}}></tr>
            </React.Fragment>
        )
    }
}

export default row_tab