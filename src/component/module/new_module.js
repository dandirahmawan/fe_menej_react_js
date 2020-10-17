import React from 'react'
import UserListChoice from '../user_list_choice'
import { tsAnyKeyword } from '@babel/types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faUserEdit} from '@fortawesome/free-solid-svg-icons'
import FormAddStatus from './form_add_status'
import ChoiceStatus from './status_choice'
import {SelectBox} from '../custom_element'
import { popUpAlert, setInitialName } from '../../function/function'

class new_module extends React.Component{

    constructor(){
        super()
        this.state = {
            popupListChoice: "",
            userSelected: [],
            userSelectedId:"",
            moduleName:"",
            dueDate:"",
            description:"",
            formAddStatus: "",
            status: "",
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
        this.chooseStatus = this.chooseStatus.bind(this)
        this.hideChoice = this.hideChoice.bind(this)
        this.submitUserAsigning = this.submitUserAsigning.bind(this)
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
                                submit={this.submitUserAsigning} 
                                projectId={this.props.projectId}
                                xSelected={this.xSelected} 
                                userSelected={this.userSelected}/>
        })
    }

    submitUserAsigning(data){
        this.setState({
            userSelected: data,
            popupListChoice: ""
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
        if(this.state.userSelected.length <= 0){
            popUpAlert("Make sure all data has been filled")
            return false
        }

        var iu = []
        this.state.userSelected.map(dt => {
            iu.push(dt.userId)
        })
        
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
                                            isManageStatus={true}
                                            appendDataStatus={this.newStatusCommit}
                                            projectId={this.props.projectId} 
                                            val="N" 
                                            dataStatus={this.props.dataStatus}
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
        const userAssignTo = this.state.userSelected.map(dt => {
            let initial = setInitialName(dt.userName)
            
            return <div className="main-color ass-tooltip-nm" 
                        style={{width: "35px", height: "35px", borderRadius: "100%", marginRight: "10px"}}>
                        <div style={{textAlign: "center", marginTop: "10px", color: "#FFF"}}>
                            {initial}
                        </div>
                        <div className="ass-tooltiptext-nm main-border shadow">
                            <div className="bold">{dt.userName}</div>
                            <div className="second-font-color" style={{fontSize: "11px"}}>
                                {dt.emailUser}
                            </div>
                        </div>
                    </div>
        })

        return(
            <React.Fragment>
                <div onClick={this.props.hide} className="block"></div>
                <div id='pop_new_module' class='pop' style={{position: "fixed", height: "auto", width: "500px", borderRadius: '5px'}}>
                    <div className="bold main-border-bottom" style={{padding: '10px', fontSize: '14px', background: "#FFF"}}>
                        New Module
                    </div>
                    <div style={{background: "#FFF", width: "480px", height: "auto", padding: '10px'}}>
                        <table>
                            <tr>
                                <td className="bold" style={{width: "80px", textAlign: "right", paddingRight: "10px"}}>Name <span style={{color: "red"}}>*</span></td>
                                <td><input onChange={this.chName} placeholder="module name" value={this.state.projectName} style={{padding: "5px", width: "250px"}} type="text"></input></td>
                            </tr>
                            <tr>
                                <td className="bold" style={{width: "80px", textAlign: "right", paddingRight: "10px"}}>Assign to <span style={{color: "red"}}>*</span></td>
                                <td>
                                    {this.state.popupListChoice}
                                    {
                                        (this.state.userSelected.length == 0)
                                        ?
                                            <a className="bold" onClick={this.selectUser}>Select user</a>
                                        :
                                            <div style={{display: "flex"}}>
                                                <div id="bs-user-selected-nm" style={{display: "flex"}}>
                                                    {userAssignTo}
                                                </div>
                                                <div className="main-border-left" style={{paddingLeft: "5px"}}>
                                                    <a onClick={this.selectUser}><FontAwesomeIcon icon={faUserEdit}/></a>
                                                </div>
                                            </div>
                                    }
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