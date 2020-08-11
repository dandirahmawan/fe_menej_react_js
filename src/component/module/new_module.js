import React from 'react'
import UserListChoice from '../user_list_choice'
import { tsAnyKeyword } from '@babel/types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import FormAddStatus from './form_add_status'
import ChoiceStatus from './status_choice'
import {SelectBox} from '../custom_element'

class new_module extends React.Component{

    constructor(){
        super()
        this.state = {
            popupListChoice: "",
            userSelected: "Select",
            userSelectedId:"",
            moduleName:"",
            dueDate:"",
            description:"",
            formAddStatus: "",
            status: "Not started",
            idStatus: "N",
            statusChoice: "",
        }
        this.baseStatus = React.createRef()
        this.selectUser = this.selectUser.bind(this)
        this.userSelected = this.userSelected.bind(this)
        this.xSelected = this.xSelected.bind(this)
        this.commit = this.commit.bind(this)
        this.chName = this.chName.bind(this)
        this.ddChange = this.ddChange.bind(this)
        this.descChange = this.descChange.bind(this)
        this.selectStatus = this.selectStatus.bind(this)
        this.newStatusCommit = this.newStatusCommit.bind(this)
        // this.addStatus = this.addStatus.bind(this)
        this.chooseStatus = this.chooseStatus.bind(this)
        this.hideChoice = this.hideChoice.bind(this)
    }

    componentDidMount(){
        var x = document.getElementById("pop_new_module")
        var w = x.offsetWidth
        var h = x.offsetHeight
        var top = (parseInt(window.innerHeight) - h) / 2
        var left = (parseInt(window.innerWidth) - w) / 2
        x.style.top = top+"px"
        x.style.left = left+"px"
    }

    selectUser(){
        this.setState({
            popupListChoice: <UserListChoice 
                                projectId={this.props.projectId}
                                xSelected={this.xSelected} 
                                userSelected={this.userSelected}/>
        })
    }

    userSelected(ue, ui, un){
        this.setState({
            popupListChoice: "",
            userSelected: ue,
            userSelectedId: ui
        })
    }

    xSelected(){
        this.setState({
            popupListChoice: ""
        }) 
    }

    commit(){
        if(this.state.userSelected == "Select" || this.state.moduleName == "" || this.state.dueDate == ""){
            return false
        }
        var iu = this.state.userSelectedId
        var pn = this.state.moduleName
        var dd = this.state.dueDate
        var desc = this.state.description
        var pi = this.props.projectId
        var status = this.state.idStatus
        this.props.commit(iu, pn, dd, desc, pi, status)
    }

    chName(e){
        var name = e.target.value;
        this.setState({moduleName: name})
    }

    ddChange(e){
        var date = e.target.value
        this.setState({dueDate: date})
    }

    descChange(e){
        var desc = e.target.value
        this.setState({description: desc})
    }

    chooseStatus(e){
        let scope = this
        let target = ""
        let prtTagId = e.target.parentElement
        if(prtTagId.getAttribute("id") == "slck-box-cstm"){
            target = e.target.parentElement
        }else{
            target = e.target
        }

        let itv = setInterval(() => {
            let w = target.offsetWidth+"px"
            scope.setState({
                statusChoice: <ChoiceStatus width={w}
                                            projectId={this.props.projectId} 
                                            val="N" dataStatus={this.props.dataStatus}
                                            selectStatus={this.selectStatus}
                                            newStatus={this.newStatusCommit} 
                                            hideChoice={this.hideChoice}/>
            })
            clearInterval(itv)
        }, 100)
    }

    newStatusCommit(status){
        this.props.commitNewStatus(status)
        this.hideChoice()
    }

    selectStatus(id){
        this.props.dataStatus.map(dt => {
            if(id == dt.id){
                this.setState({
                    statusChoice: "",
                    idStatus: dt.id,
                    status: dt.status
                })
            }
        })
    }

    hideChoice(){
        this.setState({
            statusChoice: ""
        })
    }

    render(){
        return(
            <React.Fragment>
                <div onClick={this.props.hide} className="block"></div>
                <div id='pop_new_module' class='pop' style={{position: "fixed", height: "auto", width: "500px", borderRadius: '5px'}}>
                    <div className="header-second-background bold main-border-bottom" style={{padding: '10px', fontSize: '16px'}}>
                        New Module
                    </div>
                    <div style={{background: "#FFF", width: "480px", height: "auto", padding: '10px'}}>
                        <table>
                            <tr>
                                <td className="bold" style={{width: "80px", textAlign: "right", paddingRight: "10px"}}>Name <span style={{color: "red"}}>*</span></td>
                                <td><input onChange={this.chName} placeholder="module name" value={this.state.projectName} style={{padding: "5px", width: "250px"}} type="text"></input></td>
                            </tr>
                            <tr>
                                <td className="bold" style={{width: "80px", textAlign: "right", paddingRight: "10px"}}>User <span style={{color: "red"}}>*</span></td>
                                <td>
                                    {this.state.popupListChoice}
                                    <a onClick={this.selectUser} className="bold">{this.state.userSelected}</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="bold" style={{width: "80px", textAlign: "right", paddingRight: "10px"}}>Status <span style={{color: "red"}}>*</span></td>
                                <td ref={this.baseStatus}>
                                    <SelectBox click={this.chooseStatus} 
                                        style={{padding: "7px", overflow: "hidden",border: "#ccc9c9 1px solid", borderRadius: "3px", width: "200px"}} 
                                        value={this.state.status}/>
                                    {this.state.statusChoice}
                                </td>
                            </tr>
                            <tr>
                                <td className="bold" style={{width: "80px", textAlign: "right", paddingRight: "10px"}}>Due date <span style={{color: "red"}}>*</span></td>
                                <td><input onChange={this.ddChange} style={{padding: "5px"}} type="date"></input></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style={{fontSize:"11px"}}><span style={{color: "red"}}>*</span> Mandatory, must be filled</td>
                            </tr>
                            <tr>
                                <td valign="top" className="bold" style={{width: "80px", textAlign: "right", paddingRight: "10px"}}>Description</td>
                                <td style={{padding: "5px"}}>
                                    <textarea placeholder="module description" 
                                            onChange={this.descChange} 
                                            style={{height: "50px", width: "350px", fontSize: "12px"}}/>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="header-second-background bold" style={{padding: '10px', textAlign: 'right'}}>
                        <button onClick={this.commit} style={{fontSize: '12px', marginRight: "5px"}} className='btn-primary'>Submit</button>
                        <button onClick={this.props.hide} style={{fontSize: '12px', background: "none"}}>Cancel</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default new_module