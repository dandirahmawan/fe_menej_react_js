import React from 'react'
import {baseUrl} from '../../const/const'
import {getCookieUserId, popUpAlert} from '../../function/function'
import {Redirect} from 'react-router-dom'
import { ApiFetch } from '../apiFetch'
import ReactDom from 'react-dom'
import {SpinnerButton} from '../spinner'

class create_project extends React.Component{

    constructor(){
        super()
        this.state = {
            projectName: "",
            onProcess: false
        }
        this.handleChange = this.handleChange.bind(this)
    }
    
    componentDidMount(){
        this.setState({
            redirectId: ''
        })

        var elm = document.getElementById("pop_create_project")
        var xHeight = elm.offsetHeight;
        var xWidth = elm.offsetWidth;
        var top = (window.innerHeight - xHeight) / 2
        var left = (window.innerWidth - xWidth) / 2
        elm.style.top = top+"px"
        elm.style.left = left+"px"
    }

    commitProject(e){
        var userId = getCookieUserId()
        if(this.state.projectName == ""){
            popUpAlert("Project name is empty", "warning");
            return false;
        }

        if(this.state.onProcess){
            return false
        }

        e.target.style.opacity = "0.5"
        ReactDom.render(<SpinnerButton size="14px"/>, e.target)
        this.setState({
            onProcess: true
        })

        var formData = new FormData()
        formData.append("userId", userId)
        formData.append("projectName", this.state.projectName)
        ApiFetch("/insert_project",{
            method: 'POST',
            body: formData
        }).then(res => res.text())
        .then(result => {
            if(result != 'exists'){
                // window.location = '/project/'+result
            }else{
                popUpAlert("project name already exists")
            }
        })
    }

    handleChange(e){
        var val = e.target.value
        this.setState({
            projectName: val
        })
    }

    render(){
        return(
            <React.Fragment>
                <div onClick={this.props.hidePopUp} className='block' style={{zIndex: "1001"}}></div>
                <div id='pop_create_project' className='pop' style={{position: "fixed", height: "auto", overflow: 'hidden',background: '#FFF', zIndex: "1001"}}>
                    <div style={{width: '264px', margin: 'auto'}}>
                        <div className='bold' style={{fontSize: '14px', padding: "10px"}}>
                            Create project
                        </div>
                        <div style={{padding: "10px"}}>
                            <input
                                id='pn_input' 
                                type='text' 
                                value={this.state.projectName} 
                                onChange={this.handleChange} 
                                placeholder='project name' 
                                style={{padding: '8px', fontSize: '12px', boxSizing: 'border-box', width: '100%', borderRadius: "0px"}}>    
                            </input>
                            <span 
                                className='bold' 
                                style={{fontSize: '10px', color: '#a2a2a2'}}>
                                    * Insert your project name
                            </span>
                        </div>
                        <div className="main-border-top" style={{textAlign: 'right', padding: "10px"}}>
                            <button onClick={this.commitProject.bind(this)} className='btn-primary' style={{fontSize: '11px', marginRight: '5px'}}>
                                Create
                            </button>
                            <button className="btn-secondary" onClick={this.props.hidePopUp} style={{fontSize: '11px'}}>Cancel</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default create_project