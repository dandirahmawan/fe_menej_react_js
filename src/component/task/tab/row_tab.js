import React from 'react'
import {getIconDocFIle} from '../../../function/function'

class row_tab extends React.Component{

    constructor(){
        super()
        this.state = {
            baseEditCell: null,
            isBorder: true
        }
        this.refRow = React.createRef()
        this.renderElement = this.renderElement.bind(this)
        this.removeRow = this.removeRow.bind(this)
        this.fxDisplay = this.fxDisplay.bind(this)
        this.linkFunction = this.linkFunction.bind(this)
        this.mouseOver = this.mouseOver.bind(this)
        this.mouseLeave = this.mouseLeave.bind(this)
    }

    componentDidMount(){
        this.renderElement(this.props.col, this.props.no, this.props.isStarting, this.props.isBorder, this.props.colHeader)
        this.setState({
            isBorder: this.props.isBorder
        })
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
            this.renderElement(nexProps.col, nexProps.no, nexProps.isStarting, nexProps.isBorder, this.props.colHeader)
            this.setState({
                isBorder: nexProps.isBorder
            })
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

    getIconDocFIle(fileName){
        var a = fileName.split(".")
        var ext = a[a.length - 1]
        var rtn = ""

        let elm = document.createElement("i")
        if(ext == 'jpeg' || ext == 'jpg' || ext == 'png'){
            rtn = "fa fa-image"
            elm.setAttribute("class", rtn)
        }else if(ext == "mp4" || ext == "3gp" || ext == "mkv"){
            rtn = "fa fa fa-play-circle"
            elm.setAttribute("class", rtn)
            elm.style.color = "#F00"
            elm.style.fontSize = "14px"
        }else{
            rtn = "fa fa-file"
            elm.setAttribute("class", rtn)
            elm.style.color = "#d4ae2b"
        }

        return elm
    }


    linkFunction(e, id, fx, fileName){
        this.props.linkFunction(id, fx, fileName)
        e.stopPropagation()
    }

    fxDisplay(val){
        let isFunction = (val.substring(0, 1) == "=") ? true : false
        if(isFunction){

            let icon = ""
            let fxName = val.substring(1, 4)
            let name = ""
            let id = null
            let url = null
            if(fxName == "MOD" || fxName == "mod"){
                this.props.relationData.map(dt => {
                    if(dt.functionText == val){
                        name = dt.name
                        id = dt.id
                        url = dt.docUrl
                    }
                })
                
                icon = document.createElement("i")
                icon.setAttribute("class", "fas fa-clipboard")
                icon.setAttribute("style", "font-size: 14px;color: #d4ae2b")
            }else if(fxName == "DOC" || fxName == "doc"){
                this.props.relationData.map(dt => {
                    if(dt.functionText == val){
                        name = dt.name
                        id = dt.docUrl
                    }
                })
            }else{
                let lName = val.length
                name = val.substring(5, lName - 1)
                icon = document.createElement("i")
                icon.setAttribute("class", "fa fa-globe")
                icon.setAttribute("style", "font-size: 14px;color: #001fff")
            }
            
            let link = document.createElement("a")
            link.onclick = (e) => this.linkFunction(e, id, fxName, name)
            link.innerHTML = name

            let baseName = document.createElement("div")
            baseName.style.marginTop = "-15px"
            baseName.style.background = "none"
            baseName.style.marginLeft = "20px"
            baseName.setAttribute("class", "bold")

            if(id == null && fxName.toLowerCase() != "url"){
                let span = document.createElement("span")
                span.style.color = "#F00"
                span.innerText = "error, data function is not found"
                baseName.append(span)
            }else{
                baseName.append(link)
            }

            let elmReturnBase = document.createElement("div")
            let elmReturn = document.createElement("div")
            if(fxName == "MOD" || fxName == "mod"){ 
                getIconDocFIle(name, elmReturn)
                elmReturnBase.append(icon) 
            }else if(fxName == "URL" || fxName == "url"){ 
                elmReturnBase.append(icon) 
            }else{
                getIconDocFIle(name, elmReturn)
                elmReturnBase.append(elmReturn)
            }

            elmReturnBase.append(baseName)
            return elmReturnBase
        }else{
            return val
        }
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
            //get column style
            let styles = (col.style !== undefined) ? col.style : ""
            let style = (styles != "" && styles != null) ? styles[i] : ""

            let i2 = parseInt(i) + 1
            if(this.props.elm[i2] !== undefined) {
                let wi = this.props.elm[i2].style.width.replace("px", "")
                let elm1 = document.createElement("td")

                //set value cell
                elm1.append((col[i] === undefined) ? "" : this.fxDisplay(col[i]))
                
                if (!isBorder) {
                    elm1.setAttribute("class", "td-tab-data tab-cell")
                } else {
                    elm1.setAttribute("class", "td-tab-data tab-cell main-border")
                }

                let defaultStyle = "padding:5px;text-align:left;word-wrap:anywhere;"
                //replacing background color white with none
                let style2 = (style !== undefined) ? style.replace("background:#ffffff", "background:none") : ""
                let mergeStyle = defaultStyle+style2
                elm1.setAttribute("style", mergeStyle)


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

    mouseOver(e){
        let prt = e.target.parentElement
        if(prt.tagName == "TR"){
            let child = prt.children
            let setAttribute = ""
            if(!this.state.isBorder){
                setAttribute = "second-background-grs td-tab-data"
            }else{
                setAttribute = "second-background-grs td-tab-data main-border"
            }
            child[0].setAttribute("class", setAttribute+" num-row-tab-hover")
        }
    }

    mouseLeave(e){
        let child = e.target.children
        let curAttribute = child[0].getAttribute("class")
        let setAttribute = curAttribute.replace(" num-row-tab-hover", "")
        child[0].setAttribute("class", setAttribute)
    }

    render() {
        return (
            <React.Fragment>
                {this.state.baseEditCell}
                    <tr valign="top"
                        onMouseOver={this.mouseOver}
                        onMouseLeave={this.mouseLeave}
                        onClick={(e) => this.props.formTab(e, this.props.seq)}
                        className="tr-selectable tr-tb-data main-border"
                        ref={this.refRow}
                        style={{background: "#FFF"}}></tr>
            </React.Fragment>
        )
    }
}

export default row_tab