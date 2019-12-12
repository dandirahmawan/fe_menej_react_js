import React from 'react'
import UserListChoice from '../user_list_choice'

class module_info extends React.Component{

    constructor(){
        super()
        this.state = {
            popupListChoice: ""
        }
        this.setAssigned = this.setAssigned.bind(this)
        this.xSelected = this.xSelected.bind(this)
        this.userSelected = this.userSelected.bind(this)
    }

    setAssigned(){
        this.setState({
            popupListChoice: <UserListChoice 
                                userSelected={this.userSelected} 
                                xSelected={this.xSelected}
                            />
        })
    }

    xSelected(){
        this.setState({
            popupListChoice: ""
        })
    }

    userSelected(ue, ui, un){
        this.props.changeUserSelected(ue, ui, un)
        this.xSelected()
    }

    render(){
        return(
            <div style={{padding: "10px", paddingTop: "20px"}}>
                <table>
                    <tr>
                        <td style={{width:"100px"}} className="bold">Name</td>
                        <td><input placeholder="module name" onChange={this.props.changeName} style={{padding: "5px", width: "300px"}} type='text' value={this.props.moduleName}></input></td>
                    </tr>
                    <tr>
                        <td style={{width:"100px"}} className="bold">Assigned</td>
                        <td>
                            {this.state.popupListChoice}
                            <a onClick={this.setAssigned}>
                                <span className="bold">{this.props.userName}</span><br/>
                                <span style={{fontSize: "10px"}}>{this.props.emailUser}</span>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td style={{width:"100px"}} className="bold">Status</td>
                        <td>
                            <select onChange={this.props.changeStatus} value={this.props.moduleStatus} style={{fontSize: "12px"}}>
                                <option value="P">On progress</option>
                                <option value="C">Close</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style={{width:"100px"}} className="bold">Due date</td>
                        <td>
                            <input style={{padding: "5px"}} onChange={this.props.changeDate} value={this.props.dueDate} type='date'></input>
                        </td>
                    </tr>
                    <tr>
                        <td style={{width:"100px", paddingTop: "10px"}} valign="top" className="bold">Description</td>
                        <td>
                            <textarea value={this.props.description} onChange={this.props.changeDesc} placeholder="description" style={{width: "300px", height: "50px", fontSize: "12px"}}></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td style={{width:"100px", paddingTop: "10px"}} valign="top" className="bold"></td>
                        <td>
                            <button onClick={this.props.commitModule} className="btn-primary bold" style={{fontSize: "12px"}}>Save change</button>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default module_info