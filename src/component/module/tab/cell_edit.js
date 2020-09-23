import React from 'react'
import Triangle from '../../../images/triangle.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFill, faFont} from '@fortawesome/free-solid-svg-icons'
import ColorPicker from '../../color_picker'
import FunctionPreview from './function_preview'
import FunctionData from './function_data'

class cell_edit extends React.Component{

    constructor(){
        super()
        this.state = {
            colorPicker: null,
            colorPickerColor: null,
            colorCell: null,
            colorCellBackground: null,
            functionBase: null,
            functionDataBase: null,
            functionSelectData: []
        }
        
        this.positioning = this.positioning.bind(this)
        this.submit = this.submit.bind(this)
        this.colorPickerBackground = this.colorPickerBackground.bind(this)
        this.selectColor = this.selectColor.bind(this)
        this.colorPickerColorAction = this.colorPickerColorAction.bind(this)
        this.selectColorColor = this.selectColorColor.bind(this)
        this.hidePopUp = this.hidePopUp.bind(this)
        this.keyUpTxtAreaForm = this.keyUpTxtAreaForm.bind(this)
        this.functionSelect = this.functionSelect.bind(this)
        this.selectFunction = this.selectFunction.bind(this)
        
        this.base = React.createRef()
        this.barBackgrundPicker = React.createRef()
    }
    
    componentDidMount(){
        this.barBackgrundPicker.current.value = this.props.value
        this.positioning(this.props.x, this.props.y)
        this.setStyleState(this.props.column, this.props.style)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps != this.props){
            this.setStyleState(nextProps.column, nextProps.style)
            this.barBackgrundPicker.current.value = nextProps.value
            this.positioning(nextProps.x, nextProps.y)
            this.setState({
                functionBase: null,
                functionDataBase: null,
                functionSelectData: []
            })
        }
    }
    
    setStyleState(column, style){
        let styles = (style != "") ? (style[column] !== undefined) ? style[column].split(";") : 0 : 0
        if(styles == 0){
            this.setState({
                colorCellBackground : "none",
                colorCell: "#000"
            })
        }else{
            for(let i = 0;i<styles.length;i++){
                let styleName = styles[i].split(":")[0]
                if(styleName == "background"){
                    this.setState({
                        colorCellBackground : styles[i].split(":")[1]
                    })
                }else if(styleName == "color"){
                    this.setState({
                        colorCell : styles[i].split(":")[1]
                    })
                }
            }
        }
    }

    positioning(x, y){
        let left = x - 100
        let top = y + 18
        this.base.current.style.top = top+"px"
        this.base.current.style.left = left+"px"
    }

    submit(){
        let style = "background:"+this.state.colorCellBackground+";color:"+this.state.colorCell
        let val = this.barBackgrundPicker.current.value
        this.props.submitCellContextMenu(this.props.row, this.props.column, val, style, this.state.functionSelectData, this.state.style)
    }

    colorPickerBackground(){
        this.setState({
            colorPicker: <ColorPicker select={this.selectColor} hidePopUp={this.hidePopUp}/>

        })
    }

    colorPickerColorAction(){
        this.setState({
            colorPickerColor: <ColorPicker select={this.selectColorColor} hidePopUp={this.hidePopUp}/>
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
        
        this.barBackgrundPicker.current.value = e.target.value
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

    functionSelect(target, x, y, functionName){
        let x1 = parseInt(x) + 20
        let y1 = parseInt(y) + 50
        let startTop = this.base.current.offsetTop
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

    hidePopUp(){
        this.setState({
            functionBase : null,
            functionDataBase : null,
            colorPickerColor : null,
            colorPicker : null
            
        })
    }

    render(){
        return(
            <React.Fragment>
                <div ref={this.base} id="cell-edit-base" 
                    className="pop main-border" 
                    style={{width: "200px", background: "#FFF", position: "fixed", boxShadow: "2px 2px #eaeaea"}}>
                    
                    {this.state.functionBase}
                    {this.state.functionDataBase}
                    
                    <img src={Triangle} style={{height: "18px", marginTop: "-17px", position: "absolute", marginLeft: "90px"}}/>
                    <div className="bold main-border-bottom" style={{fontSize: "12px", padding: "5px"}}>
                        Cell edit
                    </div>
                    <textarea ref={this.barBackgrundPicker} className="main-border-bottom" 
                        onKeyUp={this.keyUpTxtAreaForm}
                        style={{height: "100px", 
                                fontSize: "12px",
                                width: "100%",
                                color: this.state.colorCell,
                                background: this.state.colorCellBackground,
                                borderRadius: "0px",
                                boxSizing: "border-box", 
                                resize: "none", 
                                padding: "5px"}}>
                    </textarea>
                    <div style={{textAlign: "right", padding: "5px"}}>
                        <button onClick={this.colorPickerBackground} className="second-font-color"
                                style={{float: "left", background: "none", marginTop: "2px", fontSize: "12px"}}>
                            <FontAwesomeIcon icon={faFill}/>
                        </button>
                        {this.state.colorPicker}
                        <button onClick={this.colorPickerColorAction} className="second-font-color"
                                style={{float: "left", background: "none", marginTop: "2px", fontSize: "12px"}}>
                            <FontAwesomeIcon icon={faFont}/>
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