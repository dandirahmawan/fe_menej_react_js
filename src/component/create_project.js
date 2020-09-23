import React from 'react'
import {baseUrl} from '../const/const'
import {getCookieUserId, popUpAlert} from '../function/function'
import {Redirect} from 'react-router-dom'
import { ApiFetch } from './apiFetch'

class create_project extends React.Component{

    constructor(){
        super()
        this.state = {
            projectName: ""
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

    commitProject(){
        var userId = getCookieUserId()
        if(this.state.projectName == ""){
            popUpAlert("Project name is empty", "warning");
            return false;
        }

        var formData = new FormData()
        formData.append("userId", userId)
        formData.append("projectName", this.state.projectName)
        ApiFetch("/insert_project",{
            method: 'POST',
            body: formData
        }).then(res => res.text())
        .then(result => {
            if(result != 'exists'){
                window.location = '/project/'+result
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
                <div id='pop_create_project' className='pop' style={{position: "fixed", height: "auto", borderRadius: '5px', overflow: 'hidden',background: '#FFF', zIndex: "1001"}}>
                    <div style={{width: '264px', padding: '20px', margin: 'auto'}}>
                        <span className='bold' style={{fontSize: '20px'}}>Create project</span>
                        <div style={{marginTop: '10px'}}>
                            <input
                                id='pn_input' 
                                type='text' 
                                value={this.state.projectName} 
                                onChange={this.handleChange} 
                                placeholder='project name' 
                                style={{padding: '10px', fontSize: '14px', boxSizing: 'border-box', width: '100%'}}>    
                            </input>
                            <span 
                                className='bold' 
                                style={{fontSize: '10px', color: '#a2a2a2'}}>
                                    * Insert your project name
                            </span>
                        </div>
                        <div style={{textAlign: 'right'}}>
                            <button onClick={this.commitProject.bind(this)} className='btn-primary' style={{marginTop: '20px', fontSize: '12px', marginRight: '5px'}}>
                                Create
                            </button>
                            <button onClick={this.props.hidePopUp} style={{marginTop: '20px', background: 'none',fontSize: '12px'}}>Cancel</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default create_project