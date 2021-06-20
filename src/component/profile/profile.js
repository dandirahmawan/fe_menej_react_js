import React, { Fragment } from 'react'
import ReactDom from 'react-dom'
import {popCenterPosition, getCookieUserId, popUpAlert, pxd} from '../../function/function'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faOm, faTrashAlt, faInfo, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { baseUrl } from '../../const/const'
import { startData } from '../../redux/action'
import {ApiFetch} from '../apiFetch'
import {EXIF} from 'exif-js'
import {SpinnerButton} from '../spinner'
import BaseChangePassword from './change_password'

class profile extends React.Component{

    state = {
        userName: null,
        ort: "",
        srcImage: null,
        isDeletePicture: false,
        email: "",
        passChangeEmail: ""
    }

    general             = React.createRef()
    account             = React.createRef()
    accountEmail        = React.createRef()
    accountPassword     = React.createRef()
    baseGeneral         = React.createRef()
    baseAccount         = React.createRef()
    baseAccountEmail    = React.createRef()
    baseAccountPassword = React.createRef()
    inputFile           = React.createRef()
    alertInfoCgAccount  = React.createRef()

    menuClick           = this.menuClick.bind(this)
    menuClickAccount    = this.menuClickAccount.bind(this) 
    handelChangeName    = this.handelChangeName.bind(this)
    saveChange          = this.saveChange.bind(this)
    changePicProfile    = this.changePicProfile.bind(this)
    changeImage         = this.changeImage.bind(this)
    deletePicture       = this.deletePicture.bind(this)
    submitChangeEmail   = this.submitChangeEmail.bind(this)
    handelChangeEmail   = this.handelChangeEmail.bind(this)
    handelChangePasswordEmail = this.handelChangePasswordEmail.bind(this)

    componentDidMount(){
        popCenterPosition("base-profile-usr-lg")
        this.alertInfoCgAccount.current.style.display = "none"

        this.setState({
            userName: this.props.userLoginData.name
        })
    }

    menuClick(type){
        let gen = this.general.current
        let acc = this.account.current
        if(type == "general"){
            gen.setAttribute("class", "bold main-font-color")
            acc.setAttribute("class", "bold second-font-color")
            this.baseGeneral.current.style.display = "block"
            this.baseAccount.current.style.display = "none"
        }else{
            acc.setAttribute("class", "bold main-font-color")
            gen.setAttribute("class", "bold second-font-color")
            this.baseGeneral.current.style.display = "none"
            this.baseAccount.current.style.display = "block"
        }
        popCenterPosition("base-profile-usr-lg")
    }

    menuClickAccount(type){
        let email = this.accountEmail.current
        let pass = this.accountPassword.current
        if(type == "email"){
            email.setAttribute("class", "bold main-font-color")
            pass.setAttribute("class", "bold second-font-color")
            this.baseAccountEmail.current.style.display = "block"
            this.baseAccountPassword.current.style.display = "none"
        }else{
            pass.setAttribute("class", "bold main-font-color")
            email.setAttribute("class", "bold second-font-color")
            this.baseAccountEmail.current.style.display = "none"
            this.baseAccountPassword.current.style.display = "block"
        }
        popCenterPosition("base-profile-usr-lg")
    }

    handelChangeName(e){
        let val = e.target.value
        this.setState({
            userName: val
        })
    }

    changePicProfile(){
        this.inputFile.current.click()
    }

    changeImage(e){
        let imgData = e.target.files[0]
        const scope = this
        EXIF.getData(imgData, function() {
            var allMetaData = EXIF.getAllTags(this)

            let reader = new FileReader()
            reader.readAsDataURL(imgData)
            reader.onload = function(e){
                let elm = document.getElementById("pic_profile_base")
                scope.setState({
                    ort : allMetaData.Orientation,
                    srcImage: e.target.result
                })

                elm.style.background = "url("+e.target.result+") no-repeat center"
                elm.style.backgroundSize = "cover"
                let ort = scope.state.ort
                if(ort == 6){
                    elm.style.transform = "rotate(90deg)"
                }else if(ort == 8){
                    elm.style.transform = "rotate(-90deg)"
                }else if(ort == 1){
                    elm.style.transform = "rotate(0deg)"
                }else if(ort === undefined){
                    elm.style.transform = "rotate(0deg)"
                }else{
                    elm.style.transform = "rotate(180deg)"
                }

                var img = new Image()
                img.src = e.target.result
                img.setAttribute("id", "img-to-cvs")
                img.style.display = "none"
                let baseImgCvs = document.getElementById("base-img-cvs")
                baseImgCvs.append(img)
            }
        })
    }

    saveChange(){
        let imgToCvs = document.getElementById("img-to-cvs")
        if(imgToCvs != null){
            var hi = imgToCvs.height
            var wi = imgToCvs.width

            var h1 = 100
            var h2 = 100 / (imgToCvs.width / imgToCvs.height)
            var w1 = 100
            var w2 = 100 / (imgToCvs.height / imgToCvs.width)
            var h =  (imgToCvs.height > imgToCvs.width) ? h1 : h2
            var w = (imgToCvs.width > imgToCvs.height) ? w1 : w2

            var h1Detail = 200
            var h2Detail = 200 / (imgToCvs.width / imgToCvs.height)
            var w1Detail = 200
            var w2Detail = 200 / (imgToCvs.height / imgToCvs.width)
            var hDetail =  (imgToCvs.height > imgToCvs.width) ? h1Detail : h2Detail
            var wDetail = (imgToCvs.width > imgToCvs.height) ? w1Detail : w2Detail

            var canvas = document.getElementById("pic_canvas")
            canvas.setAttribute("width", w+"px")
            canvas.setAttribute("height", h+"px")

            var ctx = canvas.getContext("2d");
            ctx.drawImage(imgToCvs, 0, 0, wi, hi, 0, 0, w, h)
            var dataurl = canvas.toDataURL('image/jpeg',90);

            //canvas for user detail
            var canvasDetail = document.getElementById("pic_canvas_detail")
            canvasDetail.setAttribute("width", wDetail+"px")
            canvasDetail.setAttribute("height", hDetail+"px")

            var ctx = canvasDetail.getContext("2d");
            ctx.drawImage(imgToCvs, 0, 0, wi, hi, 0, 0, wDetail, hDetail)
            var dataurlDetail = canvasDetail.toDataURL('image/jpeg',90);
        }else{
            var dataurlDetail = ""
            var dataurl = ""
        }
        

        let orientation = (this.state.ort !== "" && this.state.ort !== undefined) ? this.state.ort : 0
        let jsonData = this.props.userLoginData
        jsonData.name = this.state.userName

        let form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("userName", this.state.userName)
        form.append("base64", dataurl)
        form.append("base64Detail", dataurlDetail)
        form.append("ort", orientation)
        form.append("deletePicture", this.state.isDeletePicture)
        ApiFetch("/edit_user", {
            method: "POST",
            body: form
        }).then(res => res.json()).then(result => {
            let picProfile              = result.picProfile
            let picProfileDetail        = result.picProfileDetail
            jsonData.picProfile         = picProfile
            jsonData.picProfileDetail   = picProfileDetail

            // console.log(jsonData)
            this.props.setStartData(jsonData)
            this.props.hidePopUp()
            popUpAlert("Edit profile successfully", "success")
        })
    }

    deletePicture(){
        let elm = document.getElementById("pic_profile_base")
        elm.style.background = "none"
        this.setState({
            isDeletePicture: true
        })
    }

    submitChangeEmail(e){
        // alert(this.state.email)
        this.alertInfoCgAccount.current.style.display = "none"
        let email   = this.state.email
        let pass    = this.state.passChangeEmail

        this.alertInfoCgAccount.current.style.paddingLeft = "10px"
        this.alertInfoCgAccount.current.style.paddingRight = "10px"
        
        if(email == "" || pass == ""){
            this.alertInfoCgAccount.current.style.display = "block"
            this.alertInfoCgAccount.current.style.background = "#c36363"
            this.alertInfoCgAccount.current.innerText = "Email or password is empty"
        }else{
            let btn = e.target
            btn.setAttribute("class", "btn-primary-clicked")
            ReactDom.render(<SpinnerButton size="15px"/>, btn)

            let form = new FormData()
            form.append("userId", getCookieUserId())
            form.append("email", email)
            form.append("pass", pass)
            ApiFetch("/user_change_email", {
                method: "POST",
                body: form
            }).then(res => res.text()).then(result => {
                let rstJson = JSON.parse(result)
                // console.log(rstJson)
                if(rstJson .code == 1){
                    this.alertInfoCgAccount.current.style.display = "block"
                    this.alertInfoCgAccount.current.style.background = "#568c98"
                    this.alertInfoCgAccount.current.innerHTML = "You have request to change your email<br/>please check your email"
                }else if(rstJson .code == 3){
                    this.alertInfoCgAccount.current.style.display = "block"
                    this.alertInfoCgAccount.current.style.background = "#c36363"
                    this.alertInfoCgAccount.current.innerHTML =  rstJson.message
                }else{
                    this.alertInfoCgAccount.current.style.display = "block"
                    this.alertInfoCgAccount.current.style.background = "#c36363"
                    this.alertInfoCgAccount.current.innerText = rstJson.message
                }

                btn.setAttribute("class", "btn-primary")
                ReactDom.render("submit", btn)
            })    
        }    
    }

    handelChangeEmail(e){
        let val = e.target.value
        this.setState({
            email: val
        })
    }

    handelChangePasswordEmail(e){
        let val = e.target.value
        let valx = pxd(val)
        this.setState({
            passChangeEmail: valx
        })
    }

    render(){
        return(
            <Fragment>
                <div className="block" onClick={this.props.hidePopUp}/>
                <div id="base-profile-usr-lg" className="pop main-border" style={{background: "#FFF", borderRadius: "3px", width: "350px"}}>
                    <div style={{margin:"auto", height: "80px", width: "80px", borderRadius: "100%", marginTop: "20px", background: "#CCC"}}>
                        {
                            (this.props.userLoginData.picProfileDetail != null)
                            ?
                                <div style={{margin:"auto", 
                                            height: "80px", 
                                            width: "80px", 
                                            borderRadius: "100%", 
                                            marginTop: "20px",
                                            background: "url("+baseUrl+"/pic_profile/"+this.props.userLoginData.picProfileDetail+") no-repeat center",
                                            backgroundSize: "cover"}}/>
                            :
                                ""
                        }
                    </div>
                    <div style={{marginTop: "10px", textAlign: "center"}}>
                        <div className="bold" style={{fontSize: "20px"}}>
                            {this.props.userLoginData.name}
                        </div>
                        <div className="second-font-color" style={{fontSize: "12px"}}>
                            {this.props.userLoginData.email}
                        </div>
                    </div>
                    <div style={{marginTop: "10px", fontSize: "11px", padding: "10px", textAlign: "center"}}>
                        <a onClick={() => this.menuClick("general")} className="bold main-font-color" ref={this.general} style={{marginRight: "10px"}}>
                            <FontAwesomeIcon icon={faCog}/> General
                        </a>
                        <a onClick={() => this.menuClick("account")} className="bold second-font-color" ref={this.account} style={{marginRight: "10px"}}>
                            <FontAwesomeIcon icon={faCog}/> Account
                        </a>
                    </div>
                    <div style={{borderTop: "10px solid #CCC"}}>
                        <div ref={this.baseGeneral} id="base-general-profile" style={{padding: "10px"}}>
                            <div style={{overflow: "hidden"}}>
                                <div style={{height: "40px", width: "40px", borderRadius: "3px", background: "#CCC", float: "left"}}>
                                    <div id="pic_profile_base" 
                                         style={{height: "40px", 
                                                width: "40px", 
                                                borderRadius: "3px", 
                                                background: "url("+baseUrl+"/pic_profile/"+this.props.userLoginData.picProfile+") no-repeat center",
                                                backgroundSize: "cover", 
                                                float: "left"}}/>
                                </div>
                                <div style={{marginLeft: "50px", marginTop: "5px"}}>
                                    <div className="bold" style={{fontSize: "12px", marginBottom: "2px"}}>
                                        {this.props.userLoginData.name}
                                    </div>
                                    <a onClick={this.changePicProfile} className="bold" style={{fontSize: "10px"}}>Change picture</a>
                                    <a onClick={this.deletePicture} className="bold main-border-left" style={{fontSize: "10px", marginLeft: '5px', paddingLeft: "5px"}}>
                                        <FontAwesomeIcon icon={faTrashAlt}/>
                                    </a>
                                    <div style={{display: "none"}}>
                                        <div id="base-img-cvs"/>
                                        <canvas id="pic_canvas" style={{display: "none"}}/>
                                        <canvas id="pic_canvas_detail" style={{display: "none"}}/>
                                        <input ref={this.inputFile} onChange={this.changeImage} type="file" accept="image/*"/>
                                    </div>
                                </div>
                            </div>
                            <div className="bold" style={{fontSize: "12px", marginTop: "5px", paddingTop: "10px"}}>
                                Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="text" onChange={this.handelChangeName} value={this.state.userName} placeholder="insert name" style={{padding: "7px"}}/>
                            </div>
                            <button onClick={this.saveChange} className="btn-primary" style={{marginTop: "15px", marginLeft: "50px", fontSize: "12px"}}>Save change</button>
                        </div>

                        <div ref={this.baseAccount} id="base-general-account" style={{padding: "10px", display: "none"}}>
                            <div className="bold" style={{fontSize: "11px", marginBottom: "5px", paddingBottom: "10px"}}>
                                <a onClick={() => this.menuClickAccount("email")} ref={this.accountEmail} className="main-font-color" style={{marginRight: "10px", paddingBottom: "5px"}}>Change email</a>
                                <a onClick={() => this.menuClickAccount("password")} ref={this.accountPassword} className="second-font-color" style={{marginRight: "10px", paddingBottom: "5px"}}>Change password</a>
                            </div>

                            <div ref={this.baseAccountEmail} id="base-general-account-email">
                                <div ref={this.alertInfoCgAccount} 
                                    style={{color: "#FFF", 
                                            fontSize: "11px", 
                                            padding: "10px", 
                                            textAlign: "center", 
                                            borderRadius: "3px", 
                                            marginLeft: '10px', 
                                            marginRight: "10px", 
                                            marginBottom: "5px"}}/>
                                
                                <table style={{fontSize: "12px"}}>
                                    <tr>
                                        <td className="bold" style={{textAlign: "right"}}>Email</td>
                                        <td><input type="text" placeholder="insert email" onChange={this.handelChangeEmail} value={this.state.email} style={{padding: "7px"}}/></td>
                                    </tr> 
                                    <tr>
                                        <td className="bold" style={{textAlign: "right"}}>Password</td>
                                        <td><input type="password" placeholder="insert password" onChange={this.handelChangePasswordEmail} style={{padding: "7px"}}/></td>
                                    </tr>   
                                    <tr>
                                        <td/>
                                        <td>
                                            <div className="second-font-color" style={{fontSize: '11px', width: "200px", marginBottom: "10px", display: "flex"}}>
                                                <FontAwesomeIcon icon={faInfoCircle} style={{fontSize: '14px'}}/>&nbsp; 
                                                <div>Email will be change after you confirm that your email is valid</div>
                                            </div>
                                            <button onClick={this.submitChangeEmail} className="btn-primary" style={{fontSize: "11px", minWidth: "70px"}}>Submit</button>
                                        </td>
                                    </tr>    
                                </table>
                            </div>
                            <div ref={this.baseAccountPassword} id="base-general-account-password" style={{display: "none"}}>
                                <BaseChangePassword/>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        userLoginData: state.userLoginData
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setStartData: (jsonData) => dispatch(startData(jsonData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(profile)