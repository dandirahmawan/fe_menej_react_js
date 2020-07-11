import React from 'react'
import Triangle from '../../../images/triangle.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFill, faFont} from '@fortawesome/free-solid-svg-icons'
import ColorPicker from '../../color_picker'
import FunctionPreview from './function_preview'

class cell_edit extends React.Component{

    constructor(){
        super()
        this.state = {
            colorPicker: null,
            colorPickerColor: null,
            colorCell: "#000",
            colorCellBackground: "#FFF",
            functionBase: null
        }
        
        this.changeValue = this.changeValue.bind(this)
        this.positioning = this.positioning.bind(this)
        this.submit = this.submit.bind(this)
        this.colorPickerBackground = this.colorPickerBackground.bind(this)
        this.selectColor = this.selectColor.bind(this)
        this.colorPickerColorAction = this.colorPickerColorAction.bind(this)
        this.selectColorColor = this.selectColorColor.bind(this)
        this.hidePopUp = this.hidePopUp.bind(this)
        this.keyUpTxtAreaForm = this.keyUpTxtAreaForm.bind(this)
        
        this.base = React.createRef()
        this.barBackgrundPicker = React.createRef()
    }
    
    componentDidMount(){
        this.barBackgrundPicker.current.value = this.props.value
        this.positioning(this.props.x, this.props.y)
    }

    componentWillReceiveProps(nextProps){
        this.barBackgrundPicker.current.value = nextProps.value
        this.positioning(nextProps.x, nextProps.y)
    }

    positioning(x, y){
        let left = x - 100
        let top = y + 18
        this.base.current.style.top = top+"px"
        this.base.current.style.left = left+"px"
    }

    changeValue(e){
        let e2 = e
        this.setState({
            value: e.target.value
        })
        this.keyUpTxtAreaForm(e2)
    }

    submit(){
        this.props.submitCellContextMenu(this.props.row, this.props.column, this.state.value, this.state.colorCell, this.state.colorCellBackground)
    }

    colorPickerBackground(){
        this.setState({
            colorPicker: <ColorPicker select={this.selectColor}/>

        })
    }

    colorPickerColorAction(){
        this.setState({
            colorPickerColor: <ColorPicker select={this.selectColorColor}/>
        })
    }

    selectColor(color){
        this.barBackgrundPicker.current.style.background = color
        this.setState({
            colorPicker: null,
            colorCellBackground: color
        })
    }

    selectColorColor(color){
        this.barBackgrundPicker.current.style.color = color
        this.setState({
            colorPickerColor: null,
            colorCell: color
        })
    }

    keyUpTxtAreaForm(e){
        var x = e.target.offsetTop    // Get the horizontal coordinate
        var y = e.target.offsetLeft    // Get the vertical coordinate

        // let prt = e.target.parentElement
        // let divTxtPreview = prt.children
        // for(let i = 0;i<divTxtPreview.length;i++){
        //     let cname = divTxtPreview[i].className
        //     let value = e.target.value
        //     if (cname.match(/div-txt-frm*/)) {
        //         divTxtPreview[i].innerText = value
        //         let h = divTxtPreview[i].offsetHeight - 12
        //         e.target.style.height = h+"px"
        //     }
        // }
        
        this.barBackgrundPicker.current.value = e.target.value
        if(e.target.value == "="){
            this.setState({
                functionBase : <FunctionPreview x={x} y={y} target={e.target} hidePopUp={this.hidePopUp}/>
            })
        }else{
            this.setState({
                functionBase : null
            })
        }
    }

    hidePopUp(){
        this.setState({
            functionBase : null
        })
    }

    render(){
        return(
            <React.Fragment>
                <div ref={this.base} id="cell-edit-base" 
                    className="pop main-border" 
                    style={{width: "200px", background: "#FFF", position: "fixed", boxShadow: "2px 2px #eaeaea"}}>
                    {this.state.functionBase}
                    <img src={Triangle} style={{height: "18px", marginTop: "-17px", position: "absolute", marginLeft: "90px"}}/>
                    <div className="bold main-border-bottom" style={{fontSize: "12px", padding: "5px"}}>
                        Cell edit
                    </div>
                    <textarea ref={this.barBackgrundPicker} className="main-border-bottom" 
                        onKeyUp={this.keyUpTxtAreaForm}
                        style={{height: "100px", 
                                fontSize: "12px",
                                width: "100%",
                                borderRadius: "0px",
                                boxSizing: "border-box", 
                                resize: "none", 
                                padding: "5px"}}>
                    </textarea>
                    <div style={{textAlign: "right", padding: "5px"}}>
                        <button onClick={this.colorPickerBackground} className="second-font-color"
                                style={{float: "left", background: "none", marginTop: "2px", fontSize: "12px"}}>
                            <FontAwesomeIcon icon={faFill}/>
                            {/*<div ref={this.barBackgrundPicker} className="main-border" style={{height: "4px", background: "#FFF", marginTop: "2px"}}></div>*/}
                        </button>
                        {this.state.colorPicker}
                        <button onClick={this.colorPickerColorAction} className="second-font-color"
                                style={{float: "left", background: "none", marginTop: "2px", fontSize: "12px"}}>
                            <FontAwesomeIcon icon={faFont}/>
                            {/*<div className="main-border" style={{height: "4px", background: "#000", marginTop: "2px"}}></div>*/}
                        </button>
                        {this.state.colorPickerColor}
                        <button onClick={this.submit} className="btn-primary" style={{fontSize: "11px", marginRight: "5px"}}>Submit</button>
                        <button onClick={this.props.cancel} className="btn-secondary" style={{fontSize: "11px"}}>Cancel</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default cell_edit