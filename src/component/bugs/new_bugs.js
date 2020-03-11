import React from 'react'
import {popCenterPosition} from '../../function/function'
import {connect} from 'react-redux'
import { baseUrl } from '../../const/const'
import {appendDataBugs, updateDataModuleBugs} from '../../redux/action'

class new_module extends React.Component{

    constructor(){
        super()
        this.state = {
            listModule: [],
            bugs:"",
            moduleId:"",
            projectId:""
        }

        this.changeBugs = this.changeBugs.bind(this)
        this.changeModule = this.changeModule.bind(this)
        this.submitBugs = this.submitBugs.bind(this)
    }

    componentDidMount(){
        popCenterPosition("bs-new-bugs")
        var a = document.getElementById("bs-head-new-bugs")
        var b = document.getElementById("bs-main-new-bugs")
        var c = document.getElementById("bs-footer-new-bugs")

        var h1 = a.offsetHeight
        var h2 = c.offsetHeight
        var setMainHeight = 300 - (parseInt(h1) + h2) - 20
        b.style.height = setMainHeight+"px"
    }

    changeBugs(e){
        var t = e.target
        this.setState({
            bugs: t.value
        })
    }

    changeModule(e){
        var t = e.target
        this.setState({
            moduleId: t.value
        })
    }

    submitBugs(){
        var isSubmit = true
        if(this.state.moduleId == 0) isSubmit = false
        if(this.state.moduleId == "") isSubmit = false
        if(isSubmit){
            var form = new FormData
            form.append("moduleId", this.state.moduleId)
            form.append("projectId", this.props.projectId)
            form.append("bugs", this.state.bugs)

            fetch(baseUrl+"/add_bugs", {
                method: 'POST',
                body: form
            }).then(res => res.json())
            .then(result => {
                this.props.appendBugs(result)
                this.props.updateDataModuleBugs(this.state.moduleId, "add")
                this.props.hide()
            })
        }else {
            return false
        }
    }

    render(){

        const choice = this.props.dataModule.map(dt => {
            return <option value={dt.modulId}>{dt.modulName}</option>
        })

        return(
            <React.Fragment>   
                <div className="block" onClick={this.props.hide}></div>
                <div id="bs-new-bugs" className="pop" style={{width: "400px", height: "300px", background: "#FFF"}}>
                    <div id="bs-head-new-bugs" className="bold main-border-bottom" style={{padding: "10px", fontSize: "14px", background: "#f5f5f5"}}>
                        New Bugs
                    </div>
                    <div id="bs-main-new-bugs" style={{padding: "10px"}}>
                        {/* <div>
                            <div className="bold" style={{fontSize: "12px", marginBottom: "3px"}}>Module :</div>
                            <select>
                                <option>Module name</option>
                                <option>Module name satu</option>
                                <option>Module name dua</option>
                            </select>
                            <div style={{marginTop: "10px"}}>
                                <textarea placeholder="bugs" style={{width: "100%", boxSizing: "border-box", borderRadius: "0px"}}></textarea>
                            </div>
                        </div> */}
                        <table>
                            <tbody>
                                <tr>
                                    <td className="bold" style={{fontSize: "12px", width: "50px"}}>Module</td>
                                    <td style={{width: "300px"}}>
                                        <select onChange={this.changeModule} value={this.state.moduleId} style={{fontSize: "12px"}}>
                                            <option value="0"> - select -</option>
                                            {choice}
                                        </select>
                                    </td>
                                </tr>
                                <tr valign="top">
                                    <td className="bold" style={{fontSize: "12px"}}>Bugs</td>
                                    <td>
                                        <div>
                                            <textarea placeholder="bugs description" onChange={this.changeBugs} value={this.state.bugs} style={{width: "100%", boxSizing: "border-box", fontSize: "12px", height: "100px"}}></textarea>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="bs-footer-new-bugs" className="main-border-top" style={{padding: "10px", textAlign: "right"}}>
                        <button onClick={this.submitBugs} className="btn-primary" style={{marginRight: "10px", fontSize: "12px"}}>Submit</button>
                        <button onClick={this.props.hide} className="btn-secondary" style={{fontSize: "12px"}}>Cancel</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        dataModule : state.dataModule
    } 
}

const mapDispatchToProps = dispatch => {
    return{
        appendBugs : (jsonObject) => dispatch(appendDataBugs(jsonObject)),
        updateDataModuleBugs: (moduleId, type) => dispatch(updateDataModuleBugs(moduleId, type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (new_module)