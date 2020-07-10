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
                                    <td style={{paddingBottom: "10px"}}>
                                        <div className="second-background-grs" style={{padding: "5px", borderRadius: "3px", border: "1px solid #CCC"}}>{this.props.moduleName}</div>
                                    </td>
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
                                                <div className="second-background-grs" style={{padding: "5px", borderRadius: "3px", border: "1px solid #CCC"}}>
                                                    <span className="bold">{this.props.userName}</span><br/>
                                                    <span style={{fontSize: "10px"}}>{this.props.emailUser}</span>
                                                </div>
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
                                    <td style={{paddingBottom: "10px"}}>
                                        <div className="second-background-grs" style={{padding: "5px", borderRadius: "3px", border: "1px solid #CCC"}}>
                                            {(this.props.moduleStatus == 'C') ? 'Close' : 'On Progress'}
                                        </div>
                                    </td>
                            }
                        </tr>
                        <tr>
                            <td style={{width:"100px"}} className="bold">Due date</td>
                            {
                                (this.props.pic == getCookieUserId() || this.props.modulePermition)
                                ?
                                    <td><input style={{padding: "5px"}} onChange={this.props.changeDate} value={this.props.dueDate} type='date'></input></td>
                                :
                                    <td style={{paddingBottom: "10px"}}>
                                        <div className="bold second-background-grs second-font-color" 
                                            style={{padding: "5px", float: "left", borderRadius: "3px", border: "1px solid #CCC"}}>
                                            {this.props.dueDate}
                                        </div>
                                    </td>
                            }
                        </tr>
                        <tr>
                            <td style={{width:"100px"}} className="bold">Created date</td>
                            <td style={{paddingBottom: "10px"}}>
                                <div className="bold second-background-grs second-font-color" 
                                    style={{padding: "5px", float: "left", borderRadius: "3px", border: "1px solid #CCC"}}>
                                    {this.props.createdDate}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{width:"100px"}} className="bold">Updated date</td>
                            <td style={{paddingBottom: "10px"}}>
                                <div className="bold second-background-grs second-font-color" 
                                    style={{padding: "5px", float: "left", borderRadius: "3px", border: "1px solid #CCC"}}>
                                    {this.props.dueDate}
                                </div>
                            </td>
                        </tr>
                        {/* <tr>
                            <td style={{width:"100px"}} className="bold">Document file</td>
                            <td style={{paddingBottom: "10px"}}>
                                <div className="bold" style={{padding: "3px", float: "left", background: "rgb(222, 221, 221)", border: "1px solid #CCC", borderRadius: "3px"}}>0</div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{width:"100px"}} className="bold">Bugs</td>
                            <td style={{paddingBottom: "10px"}}>
                                <div className="bold" style={{padding: "3px", float: "left", background: "rgb(222, 221, 221)", border: "1px solid #CCC", borderRadius: "3px"}}>0</div>
                            </td>
                        </tr> */}
                        <tr>
                            <td style={{width:"100px", paddingTop: "10px"}} valign="top" className="bold">Description</td>
                            <td>
                                {
                                    (this.props.pic == getCookieUserId() || this.props.modulePermition)
                                    ?
                                        <textarea onChange={this.props.changeDesc} 
                                            placeholder="description" 
                                            value={this.props.description}
                                            style={{width: "300px", height: "50px", fontSize: "12px"}}>
                                        </textarea>
                                    :
                                        <div style={{padding: "5px", borderRadius: "3px", width: "300px", minHeight: "50px", border: "1px solid #CCC"}} className="second-background-grs second-font-color"> 
                                            {(this.props.description != '') ? this.props.description : 'No description'}
                                        </div>    
                                    
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