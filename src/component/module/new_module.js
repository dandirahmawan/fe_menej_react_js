import React from 'react'
import UserListChoice from '../user_list_choice'
import { tsAnyKeyword } from '@babel/types'

class new_module extends React.Component{

    constructor(){
        super()
        this.state = {
            popupListChoice: "",
            userSelected: "Select",
            userSelectedId:"",
            moduleName:"",
            dueDate:"",
            description:""
        }
        this.selectUser = this.selectUser.bind(this)
        this.userSelected = this.userSelected.bind(this)
        this.xSelected = this.xSelected.bind(this)
        this.commit = this.commit.bind(this)
        this.chName = this.chName.bind(this)
        this.ddChange = this.ddChange.bind(this)
        this.descChange = this.descChange.bind(this)
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
            popupListChoice: <UserListChoice xSelected={this.xSelected} userSelected={this.userSelected}/>
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
        if(this.userSelected == "" || this.state.moduleName == "" || this.state.dueDate == ""){
            return false
        }
        var iu = this.state.userSelectedId
        var pn = this.state.moduleName
        var dd = this.state.dueDate
        var desc = this.state.description
        var pi = this.props.projectId
        this.props.commit(iu, pn, dd, desc, pi)
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

    render(){
        return(
            <React.Fragment>
                <div onClick={this.props.hide} className="block"></div>
                <div id='pop_new_module' class='pop' style={{position: "fixed", height: "auto", width: "400px", borderRadius: '5px', overflow: 'hidden'}}>
                    <div className="header-second-background bold main-border-bottom" style={{padding: '10px', fontSize: '16px'}}>
                        New Module
                    </div>
                    <div style={{background: "#FFF", width: "380px", height: "auto", padding: '10px'}}>
                        <table>
                            <tr>
                                <td className="bold" style={{width: "80px", textAlign: "right", paddingRight: "10px"}}>Name <span style={{color: "red"}}>*</span></td>
                                <td><input onChange={this.chName} placeholder="module name" value={this.state.projectName} style={{padding: "5px"}} type="text"></input></td>
                            </tr>
                            <tr>
                                <td className="bold" style={{width: "80px", textAlign: "right", paddingRight: "10px"}}>User <span style={{color: "red"}}>*</span></td>
                                <td>
                                    {this.state.popupListChoice}
                                    <a onClick={this.selectUser} className="bold">{this.state.userSelected}</a>
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
                                <td style={{padding: "5px"}}><textarea placeholder="module description" onChange={this.descChange} style={{height: "50px", width: "100%", fontSize: "12px"}}></textarea></td>
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