import React, { Fragment } from 'react'
import { popCenterPosition } from '../../function/function'
import {faTrashAlt, faUserCog} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {connect} from 'react-redux'
import {editProject} from '../../redux/action'
import { ApiFetch } from '../apiFetch'
import PicPicker from './pic_picker'

class edit_project extends React.Component{

    state = {
        dataProject: {},
        projectId: null,
        projectName: null,
        pic: null,
        picName: null,
        picEmail: null,
        picPickerBase: null,
        userSelected: {}
    }

    submitEdit          = this.submitEdit.bind(this)
    handleProjectName   = this.handleProjectName.bind(this)
    changePic           = this.changePic.bind(this)
    hidePicPicker       = this.hidePicPicker.bind(this)
    selectPic           = this.selectPic.bind(this)
    deleteProject       = this.deleteProject.bind(this)

    componentDidMount(){
        let dt = this.props.dataProject
        popCenterPosition("bs-edit-project-mdl")
        this.setState({
            projectId: dt.projectId,
            projectName: dt.projectName,
            pic: dt.pic,
            picName: dt.picName,
            picEmail: dt.picEmail,
            dataProject: dt
        })
    }

    submitEdit(){
        this.state.dataProject.pic = this.state.pic
        this.state.dataProject.projectName = this.state.projectName
        this.state.dataProject.picEmail = this.state.picEmail

        let form = new FormData()
        form.append("projectId", this.state.dataProject.projectId)
        form.append("projectName", this.state.projectName)
        form.append("pic", this.state.pic)

        ApiFetch("/edit_project", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == "success"){
                this.props.editDataProject(this.state.dataProject)
                this.props.refreshModule()
            }
        }) 
    }

    handleProjectName(e){
        let val = e.target.value
        this.setState({
            projectName: val
        })
    }

    changePic(){
        this.setState({
            picPickerBase: <PicPicker dataTeam={this.props.dataTeam}
                                    select={this.selectPic} 
                                    hidePicPicker={this.hidePicPicker}/>
        })
    }

    hidePicPicker(){
        this.setState({
            picPickerBase: null
        })
    }

    selectPic(userId){
        this.props.dataTeam.map(dt => {
            if(dt.userId == userId){
                this.setState({
                    userSelected: dt,
                    picName: dt.userName,
                    picEmail: dt.emailUser,
                    pic: dt.userId
                })
            }
        })
    }

    deleteProject(){
        this.props.deleteProject()
    }

    render(){
        return(
            <Fragment>
                <div /*onClick={this.props.cancel}*/ className="block"></div>
                <div id="bs-edit-project-mdl" className="pop" style={{width: "300px", background: "#FFF", borderRadius: "3px", overflow: "hidden"}}>
                    <div className="bold main-border-bottom" style={{fontSize: "12px", padding: "10px"}}>Edit project</div>
                    <div style={{padding: "10px"}}>
                        <div>
                            <div className="second-font-color bold" style={{fontSize: "11px"}}>Project name :</div>
                            <div style={{marginTop: "3px"}}>
                                <input type="text" onChange={this.handleProjectName} value={this.state.projectName} placeholder="Project name" style={{padding: "7px", fontSize: "12px", width: "200px"}}/>
                            </div>
                        </div>
                        <div style={{marginTop: "10px", overflow: "hidden"}}>
                            <div className="second-font-color bold" style={{fontSize: "11px"}}>Project manager :</div>
                            <div style={{marginTop: "3px"}}>
                                <div className="main-border-right" style={{maxWidth: "200px", float: "left", paddingRight: "5px"}}>
                                    <div className="bold" style={{fontSize: "12px"}}>{this.state.picName}</div>
                                    <div className="second-font-color" style={{fontSize: "11px"}}>{this.state.picEmail}</div>
                                </div>

                                {this.state.picPickerBase}
                                
                                <a onClick={this.changePic}  
                                    className="main-font-color" 
                                    style={{minWidth: "24px",
                                        marginLeft: "5px",
                                        height: "20px"}}>
                                    <FontAwesomeIcon icon={faUserCog} style={{fontSize: "14px"}}/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="main-border-top" 
                        style={{textAlign: "right", display: "flex", alignItems: "center", marginTop: "10px", padding: "10px"}}>
                        <div style={{width: "100%", textAlign: "left"}}>
                            <a className="second-font-color bold" style={{fontSize: "11px"}} onClick={this.deleteProject}>
                                <FontAwesomeIcon icon={faTrashAlt}/>&nbsp;&nbsp;Delete project
                            </a>
                        </div>
                        <div style={{width: "145px"}}>
                            <button onClick={this.submitEdit} className="btn-primary" style={{fontSize: "12px", marginRight: "5px"}}>Save</button>
                            <button onClick={this.props.cancel} className="btn-secondary" style={{fontSize: "12px"}}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        editDataProject: (jsonData) => dispatch(editProject(jsonData))
    }
}

export default connect('', mapDispatchToProps)(edit_project)