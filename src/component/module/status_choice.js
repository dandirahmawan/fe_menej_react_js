import React, { Fragment } from 'react'
import { popUpAlert } from '../../function/function'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircle, faCog} from '@fortawesome/free-solid-svg-icons'
import ColorPicker from '../color_picker'
import { ApiFetch } from '../apiFetch'
import ManageStatus from './manage_status'

class status_module extends React.Component{

    constructor(){
        super()
        this.state = {
            new: "",
            color: "#000",
            colorPicker: null,
            idEdit: null,
            isEdit: false,
            popup: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.submitNew = this.submitNew.bind(this)
        this.manageStatus = this.manageStatus.bind(this)
        this.cancelAdd = this.cancelAdd.bind(this)
        this.colorPicker = this.colorPicker.bind(this)
        this.hideColorPicker = this.hideColorPicker.bind(this)
        this.selectColor = this.selectColor.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.editStatus = this.editStatus.bind(this)
        this.hidePopUp = this.hidePopUp.bind(this)

        this.baseChoice = React.createRef()
        this.baseChoiceMain = React.createRef()
        this.baseNewEditStatus = React.createRef()
    }

    componentDidMount(){
        document.addEventListener("click", this.handleClickOutside)
        let childElm = this.baseChoiceMain.current.children
        let i = 0
        this.props.dataStatus.map(dt => {
            if(dt.id == this.props.val){
                this.mouseOver("", childElm[i])      
            }
            i++
        })

        this.setState({
            idEdit: this.props.val
        })
    }

    mouseOver(e, elm){
        let target = (e == "")? elm : e.target
        let prt = this.baseChoiceMain.current
        let child = prt.children
        for(let i = 0;i<child.length;i++){
            child[i].style.background = "#FFF"
            child[i].style.color = "#000"
        }
        
        let realTarget = ""
        if(target.tagName == "path"){
            realTarget = target.parentElement.parentElement
            console.log(realTarget+" 1")
        }else if(target.parentElement.tagName == "svg"){
            realTarget = target.parentElement
            console.log(realTarget+" 2")
        }else{
            realTarget = (target.tagName == "svg") ? target.parentElement : target
        }

        realTarget.style.background = "#4da1b5"
        realTarget.style.color = "#fff"
    }

    choose(id){
        this.props.selectStatus(id)
    }

    submitNew(){
        if(this.state.new != ""){
            let form = new FormData()
            form.append("projectId", this.props.projectId)
            form.append("color", this.state.color)
            form.append("statusName", this.state.new)
            ApiFetch("/new_status", {
                method: "POST",
                body: form
            }).then(res => res.json()).then(result => {
                this.props.newStatus(result)
            })
        }else{
            popUpAlert("new status is empty")
        }
        
    }

    handleChange(e){
        this.setState({
            new: e.target.value
        })
    }

    manageStatus(){
        this.setState({
            popup: <ManageStatus cancel={this.hidePopUp}
                                projectId={this.props.projectId}
                                appendDataStatus={this.props.appendDataStatus}
                                isManageStatus={this.props.isManageStatus} 
                                dataStatus={this.props.dataStatus}/>
        })
    }

    cancelAdd(){
        this.baseChoiceMain.current.style.display = "block"
        this.baseNewEditStatus.current.style.display = "none"
        this.setState({
            isEdit: false
        })
    }

    colorPicker(){
        this.setState({
            colorPicker: <ColorPicker hidePopUp={this.hideColorPicker} width={this.props.width} select={this.selectColor}/>
        })
    }

    selectColor(color){
        this.setState({
            color: color,
            colorPicker: null
        })
    }

    hideColorPicker(){
        this.setState({
            colorPicker: null
        })
    }

    handleClickOutside(event) {
        if (this.baseChoice.current && !this.baseChoice.current.contains(event.target)) {
            if(this.state.popup == null) this.props.hideChoice()
        }
    }

    editStatus(e, id, status, color){
        e.stopPropagation()
        this.setState({
            isEdit: true,
            idEdit: id,
            new: status,
            color: color
        })
        
        this.baseChoiceMain.current.style.display = "none"
        this.baseNewEditStatus.current.style.display = "block"
    }

    hidePopUp(){
        this.setState({
            popup: null
        })   
    }

    render(){

        const dataStatus = this.props.dataStatus.map(dt => {
            return <div onMouseOver={(e) => this.mouseOver(e, "")} 
                        onClick={() => this.choose(dt.id)}
                        style={{padding: "7px"}}>
                        <FontAwesomeIcon className="test" 
                                        style={{color: dt.color}} 
                                        icon={faCircle}/>&nbsp;&nbsp;{dt.status}
                        {
                            (dt.projectId != "all") 
                            ?
                                ""   
                                // <FontAwesomeIcon
                                //     onClick={(e) => this.editStatus(e, dt.id, dt.status, dt.color)} 
                                //     style={{fontSize: "10px", float: "right"}} icon={faEdit}/>
                            : ""
                        }
                    </div>
        })

        return(
            <Fragment>
                {this.state.popup}
                <div ref={this.baseChoice} style={{position: "absolute", background: "#FFF", marginTop: "-1px", width: this.props.width, minWidth: "180px", zIndex: "1"}}>
                    <div ref={this.baseChoiceMain} style={{border: "1px solid #CCC"}}>

                        {dataStatus}
                        
                        {
                            (this.props.isManageStatus)
                            ?
                                <div className="main-border-top second-background-grs" style={{padding: "10px"}}>
                                    <a onClick={this.manageStatus} className="bold" style={{fontSize: "11px", background: "none"}}>
                                        <FontAwesomeIcon icon={faCog}/> Manage status
                                    </a>
                                </div>
                            :
                                ""
                        }
                        
                    </div>

                    {/**ini adalah form untuk manmbahakan status baru */}
                    {/* <div ref={this.baseNewEditStatus} 
                        style={{display: "none", width: this.props.width, background: "#FFF", borderRadius: "3px", border: "2px solid #CCC"}}>
                        <div style={{padding: "5px", paddingBottom: "20px"}}>
                            <div className="bold" style={{fontSize: "11px", marginBottom: "3px", marginTop: "5px"}}>
                                {
                                    (this.state.isEdit)
                                    ?
                                        "Edit status :"
                                    :
                                        "New status :"
                                }
                            </div>
                            <input type="text" 
                                val={this.state.new}
                                onChange={this.handleChange}
                                style={{padding: "5px", boxSizing: "border-box", width: "100%", color: this.state.color}} 
                                placeholder={"insert status"}/>
                            <div style={{marginTop: "5px"}}>
                                <a onClick={this.colorPicker} style={{fontSize: "11px"}}><FontAwesomeIcon icon={faFill}/> Color Status</a>
                                {this.state.colorPicker}
                            </div>
                        </div>
                        <div className=" main-border-top" style={{textAlign: "right", padding: "5px"}}>
                            <button onClick={this.submitNew} className="btn-primary" style={{fontSize: "10px"}}>Submit</button>
                            <button onClick={this.cancelAdd} className="btn-secondary" style={{fontSize: "10px", marginLeft: "5px"}}>Cancel</button>
                        </div>
                    </div> */}
                </div>
            </Fragment>
        )
    }
}

export default status_module