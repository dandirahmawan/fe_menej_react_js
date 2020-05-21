import React from 'react'
import UserListChoice from '../user_list_choice'
import { getCookieUserId } from '../../function/function'

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
                                projectId={this.props.projectId}
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
        const heightMain = this.props.mainHeight - 40
        return(
            <div style={{padding: "10px", paddingTop: "20px", overflowY: "scroll", height: heightMain+"px"}}>
                <table>
                    <tbody>
                        <tr>
                            <td style={{width:"100px"}} className="bold">Name</td>
                            {
                                (this.props.pic == getCookieUserId() || this.props.modulePermition)
                                ?
                                    <td><input placeholder="module name" onChange={this.props.changeName} style={{padding: "5px", width: "300px"}} type='text' value={this.props.moduleName}></input></td>
                                : 
                                    <td style={{paddingBottom: "10px"}}>{this.props.moduleName}</td>
                            }
                        </tr>
                        <tr>
                            <td style={{width:"100px"}} className="bold">Assigned</td>
                            <td style={{paddingBottom: "10px"}}>
                                {
                                    (this.props.pic == getCookieUserId() || this.props.modulePermition)
                                        ?
                                            <React.Fragment>
                                                {this.state.popupListChoice}
                                                <a onClick={this.setAssigned}>
                                                    <span className="bold">{this.props.userName}</span><br/>
                                                    <span style={{fontSize: "10px"}}>{this.props.emailUser}</span>
                                                </a>
                                            </React.Fragment>
                                        :
                                            <React.Fragment>
                                                <span className="bold">{this.props.userName}</span><br/>
                                                <span style={{fontSize: "10px"}}>{this.props.emailUser}</span>
                                            </React.Fragment>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td style={{width:"100px"}} className="bold">Status</td>
                            {
                                (this.props.pic == getCookieUserId() || this.props.modulePermition)
                                ?
                                    <td>
                                        <select onChange={this.props.changeStatus} value={this.props.moduleStatus} style={{fontSize: "12px"}}>
                                            <option value="P">On progress</option>
                                            <option value="C">Close</option>
                                        </select>
                                    </td>
                                :
                                    <td style={{paddingBottom: "10px"}}>{(this.props.moduleStatus == 'C') ? 'Close' : 'On Progress'}</td>
                            }
                        </tr>
                        <tr>
                            <td style={{width:"100px"}} className="bold">Due date</td>
                            {
                                (this.props.pic == getCookieUserId() || this.props.modulePermition)
                                ?
                                    <td><input style={{padding: "5px"}} onChange={this.props.changeDate} value={this.props.dueDate} type='date'></input></td>
                                :
                                    <td style={{paddingBottom: "10px"}}>{this.props.dueDate}</td>
                            }
                        </tr>
                        <tr>
                            <td style={{width:"100px"}} className="bold">Due date</td>
                            {
                                (this.props.pic == getCookieUserId() || this.props.modulePermition)
                                ?
                                    <td><input style={{padding: "5px"}} onChange={this.props.changeDate} value={this.props.dueDate} type='date'></input></td>
                                :
                                    <td style={{paddingBottom: "10px"}}>{this.props.dueDate}</td>
                            }
                        </tr>
                        <tr>
                            <td style={{width:"100px"}} className="bold">Document file</td>
                            <td style={{paddingBottom: "10px"}}>10</td>
                        </tr>
                        <tr>
                            <td style={{width:"100px"}} className="bold">Bugs</td>
                            <td style={{paddingBottom: "10px"}}>10</td>
                        </tr>
                        <tr>
                            <td style={{width:"100px", paddingTop: "10px"}} valign="top" className="bold">Description</td>
                            <td>
                                {
                                    (this.props.pic == getCookieUserId() || this.props.modulePermition)
                                    ?
                                        <textarea value={this.props.description} onChange={this.props.changeDesc} placeholder="description" style={{width: "300px", height: "50px", fontSize: "12px"}}></textarea>
                                    :
                                        (this.props.description != '') ? this.props.description : 'No description'
                                }
                            </td>
                        </tr>
                        <tr>
                            <td style={{width:"100px", paddingTop: "10px"}} valign="top" className="bold"></td>
                            <td>
                                {
                                (this.props.pic == getCookieUserId() || this.props.modulePermition)
                                ? 
                                        <button onClick={this.props.commitModule} className="btn-primary bold" style={{fontSize: "12px"}}>Save change</button>
                                    :
                                        ''
                                }
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default module_info