import React from 'react'
import {connect} from 'react-redux'
import {setTitleHader, startData} from '../../redux/action'
import ModuleProfile from './module_profile'
import BugsProfile from './bugs_profile'
import DocumentFile from './document_file_profile'
import Account from './account'
import Permition from './permition'
import { baseUrl } from '../../const/const'
import {ApiFetch} from '../apiFetch'
import { getCookieUserId, getCookieSessionId } from '../../function/function'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import  PopupRename from './pop_rename'

class profile extends React.Component{

    constructor(){
        super()
        this.state = {
            permitionBase: "",
            userId:"",
            userName:"",
            userEmail:"",
            moduleBase:"",
            bugsBase:"",
            popup:"",
            picProfileDetail:""
        }
        this.resetnav = this.resetnav.bind(this)
        this.navProfileBugs = this.navProfileBugs.bind(this)
        this.navProfileDocFile = this.navProfileDocFile.bind(this)
        this.navProfileModule = this.navProfileModule.bind(this)
        this.navProfileAcount = this.navProfileAcount.bind(this)
        this.navProfileAcount = this.navProfileAcount.bind(this)
        this.navProfilePermition = this.navProfilePermition.bind(this)
        this.editProfile = this.editProfile.bind(this)
        this.cancelEdit = this.cancelEdit.bind(this)
        this.submitRename = this.submitRename.bind(this)
    }

    componentDidMount(){
        this.props.setTitle()

        var form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        ApiFetch("/user_data", {
            method: "POST",
            body: form
        }).then(res => res.json())
        .then(result => {
            this.setState({
                userId: result.userId,
                userName: result.userName,
                userEmail: result.emailUser,
                picProfileDetail: result.picProfileDetail
            })
        })
    }

    navProfileModule(e){
        var a = e.target
        var tag = a.tagName
        var tgt = (tag == "I") ? a.parentElement : a
        this.resetnav(tgt)

        tgt.setAttribute("class", "bold nav-profile")
        var base = document.getElementById("profile-base-module")
        base.style.display = "block"

        this.setState({
            moduleBase: <ModuleProfile/>
        })
    }

    navProfileBugs(e){
        var a = e.target
        var tag = a.tagName
        var tgt = (tag == "I") ? a.parentElement : a
        this.resetnav(tgt)

        tgt.setAttribute("class", "bold nav-profile")
        var base = document.getElementById("profile-base-bugs")
        base.style.display = "block"

        this.setState({
            bugsBase: <BugsProfile/>
        })
    }

    navProfileDocFile(e){
        var a = e.target
        var tag = a.tagName
        var tgt = (tag == "I") ? a.parentElement : a
        this.resetnav(tgt)

        tgt.setAttribute("class", "bold nav-profile")
        var base = document.getElementById("profile-base-doc-file")
        base.style.display = "block"
    }

    navProfileAcount(e){
        var a = e.target
        var tag = a.tagName
        var tgt = (tag == "I") ? a.parentElement : a
        this.resetnav(tgt)

        tgt.setAttribute("class", "bold nav-profile")
        var base = document.getElementById("profile-base-account")
        base.style.display = "block"
    }

    navProfilePermition(e){
        var a = e.target
        var tag = a.tagName
        var tgt = (tag == "I") ? a.parentElement : a
        this.resetnav(tgt)
        
        tgt.setAttribute("class", "bold nav-profile")
        var base = document.getElementById("profile-base-permition")
        base.style.display = "block"

        this.setState({
            permitionBase: <Permition/>
        })
    }

    resetnav(t){
        var c = document.getElementsByClassName("nav-profile")
        for(var i = 0;i<c.length;i++){
            c[i].setAttribute("class", "bold second-font-color nav-profile")
            c[i].style.borderBottom = "none"
        }

        var base = document.getElementsByClassName("nav-data-bs-profile")
        for(var i = 0;i<base.length;i++){
            base[i].style.display = "none"
        }

        t.style.paddingBottom = "10px"
        t.style.borderBottom = "2px solid #386384"
    }


    editProfile(){
        this.setState({
            popup: <PopupRename
                    name={this.state.userName}
                    cancel={this.cancelEdit}
                    submit={this.submitRename}
                    />
        })
    }

    cancelEdit(){
        this.setState({
            popup: ""
        })
    }

    submitRename(jsonObject){
        this.setState({
            userName: jsonObject.userName,
            picProfile: jsonObject.picProfile,
            picProfileDetail: jsonObject.picProfileDetail,
            popup: ""
        })
        this.props.startData(jsonObject.userName, jsonObject.emailUser, jsonObject.picProfile)
    }

    render(){
        return(
            <React.Fragment>
                {this.state.popup}
                <div id="main-base-data">
                    <div id="head-base-profile" style={{padding: "10px", paddingTop: "20px"}}>
                        {
                            (this.state.picProfileDetail !== "")
                            ?
                                <div style={{width: "80px", height: "80px", borderRadius: "40px", background: "#CCC"}}>
                                    <div style={{width: "80px", height: "80px", borderRadius: "40px", background: "url("+baseUrl+"/pic_profile/"+this.state.picProfileDetail+") center center / cover no-repeat"}}/>
                                </div>
                            :
                                <div style={{width: "80px", height: "80px", borderRadius: "40px", background: "#CCC"}}/>
                        }
                        <div style={{marginLeft: "90px", marginTop: "-70px"}}>
                            <span className="bold" style={{fontSize: "20px"}}>{this.state.userName}</span>
                            <div style={{fontSize: "12px"}}>{this.state.userEmail}</div>
                            <button onClick={this.editProfile} className="main-font-color btn-secondary" style={{padding: "5px", fontSize: "10px", marginTop: "5px"}}>
                                <FontAwesomeIcon icon={faEdit}/> Edit
                            </button>
                        </div>
                    </div>
                    <div style={{padding: "10px", marginTop: "20px"}}>
                        <div className="main-border-bottom" style={{paddingBottom: "10px", fontSize: "12px"}}>
                            <a onClick={this.navProfileAcount} className="bold nav-profile"
                               style={{marginRight: "20px", borderBottom: "2px solid #386384", paddingBottom: "10px"}}>
                                <i className="fa fa-user">&nbsp;</i>Account
                            </a>
                            <a onClick={this.navProfilePermition} className="bold second-font-color nav-profile"
                               style={{marginRight: "20px"}}>
                                <i className="fa fa-key"/> Permition
                            </a>
                            {/* <a onClick={this.navProfileModule} className="bold second-font-color nav-profile" style={{marginRight: "20px"}}>
                            <i className="fa fa-clipboard"></i> Module
                        </a>
                        <a onClick={this.navProfileBugs} className="bold second-font-color nav-profile" style={{marginRight: "20px"}}>
                            <i className="fa fa-exclamation-triangle"></i> Bugs
                        </a>
                        <a onClick={this.navProfileDocFile} className="bold second-font-color nav-profile" style={{marginRight: "20px"}}>
                            <i class="fa fa-file"></i> Document file
                        </a> */}
                        </div>
                    </div>
                    <div id="profile-base-account" className="nav-data-bs-profile" style={{paddingLeft: "10px"}}>
                        <Account
                            userId={this.state.userId}
                            userEmail={this.state.userEmail}
                            userName={this.state.userName}
                        />
                    </div>
                    <div id="profile-base-permition" className="nav-data-bs-profile"
                         style={{paddingLeft: "10px", display: "none"}}>
                        {this.state.permitionBase}
                    </div>
                    <div id="profile-base-module" className="nav-data-bs-profile"
                         style={{paddingLeft: "10px", display: "none"}}>
                        {this.state.moduleBase}
                    </div>
                    <div id="profile-base-bugs" className="nav-data-bs-profile"
                         style={{paddingLeft: "10px", display: "none"}}>
                        {this.state.bugsBase}
                    </div>
                    <div id="profile-base-doc-file" className="nav-data-bs-profile"
                         style={{paddingLeft: "10px", display: "none"}}>
                        <DocumentFile/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setTitle : () => dispatch(setTitleHader("Profile")),
        startData : (userName, userEmail, picProfile) => dispatch(startData(userName, userEmail, picProfile))
    }
}

export default connect('', mapDispatchToProps)(profile)