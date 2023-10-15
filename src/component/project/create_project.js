import React, { createRef } from 'react'
import {getCookieUserId, popUpAlert} from '../../function/function'
import Fetch from '../../function/fetchApi'
import ReactDom from 'react-dom'
import {SpinnerButton} from '../spinner'
import PS from '../../services/project_service'

class create_project extends React.Component{

    constructor(){
        super()
        this.state = {
            projectName: "",
            onProcess: false
        }

        this.redirectLink = createRef()
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

    commitProject = async (e) => {
        let services = new PS();
        let body = {}
        body.projectName = this.state.projectName
        
        let tgt = e.target
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

        let form = new FormData()
        form.append("userId", userId)
        form.append("projectName", this.state.projectName)

        let fetch = new Fetch()
        fetch.post("/project/insert_project", form).then(result => {
            if(result != "exists"){
                window.location = "/project/"+result
            }else{
                popUpAlert("Project name already exists")
            }

            tgt.style.opacity = "1"
            ReactDom.render("Create", tgt)
            this.setState({
                onProcess: false
            })
        })

        // axios.post("/project/insert_project", form).then(response => {
        //     let status = response.status
        //     let result = response.data

        //     if(status == 200){
        //         if(result != "exists"){
        //             window.location = "/project/"+result
        //         }else{
        //             popUpAlert("Project name already exists")
        //         }
    
        //         tgt.style.opacity = "1"
        //         ReactDom.render("Create", tgt)
        //         this.setState({
        //             onProcess: false
        //         })
        //     }
        // })
    }

    commitProjectGolang = async (e) => {
        let services = new PS();
        let body = {}
        body.projectName = this.state.projectName
        
        if(this.state.projectName == ""){
            popUpAlert("Project name is empty", "warning");
            return false;
        }

        let tgt = e.target
        e.target.style.opacity = "0.5"
        this.setState({
            onProcess: true
        })
        
        let resp = await services.postProject(body)
        if(resp != "exists"){
            window.location = "/project/"+resp
        }else{
            popUpAlert("Project name already exists")
        }

        tgt.style.opacity = "1"
        ReactDom.render("Create", tgt)
        this.setState({
            onProcess: false
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
                            <button onClick={this.commitProjectGolang} className='btn-primary' style={{fontSize: '11px', marginRight: '5px'}}>
                                Create
                            </button>
                            <button className="btn-secondary" onClick={this.props.hidePopUp} style={{fontSize: '11px'}}>Cancel</button>
                        </div>
                    </div>
                    <div id="bs-rlinl-cmt"></div>
                </div>
            </React.Fragment>
        )
    }
}

export default create_project