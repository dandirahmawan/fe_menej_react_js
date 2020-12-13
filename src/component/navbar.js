import React from 'react'
import PopupProfile from './popup_profile'
import {connect} from 'react-redux'
import PopupNotification from './popup_notification'
import Logo from '../images/menej_fff.png'
import {backHistory} from '../function/function'
import {baseUrl} from "../const/const"
import {faBars, faFolder} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Profile from './profile/profile'
import { Link } from 'react-router-dom'

class navbar extends React.Component{
    constructor(){
        super()
        this.state = {
            popupProfile : "",
            isTogle : false,
            popup:""
        }
        this.popAction = this.popAction.bind(this)
        this.notification = this.notification.bind(this)
        this.togleSideBar = this.togleSideBar.bind(this)
        this.hidePopUp = this.hidePopUp.bind(this)
        this.seeProfile = this.seeProfile.bind(this)
    }

    popAction(){
        const e = <PopupProfile 
                        logout={this.logout} 
                        hidePopUp={this.hidePopUp}
                        name={this.props.userLoginData.name}
                        email={this.props.userLoginData.email}
                        seeProfile={this.seeProfile}
                    />
        this.setState({
            popup: e
        })
    }

    notification(){
        const e = <PopupNotification hidePopUp={this.hidePopUp}/>
        this.setState({
            popup: e
        })
    }

    hidePopUp(){
        this.setState({
            popup: ""
        })
    }

    backNavbar(){
        backHistory();
    }

    firstWord(userNameLogin){
        console.log(userNameLogin)
        var a = userNameLogin.split(" ")
        var b = ""
        for(var i = 0;i<a.length;i++){
            b += a[i].substr(0, 1).toUpperCase()
        }
        return b
    }

    togleSideBar(a){
        var elm = document.getElementsByClassName("sidebar")
        var elm2 = document.getElementById("main-header")
        var elm3 = document.getElementById("main-base-data")

        var t = a.target;
        t.style.transform = "rotate(900deg)"
        
        var togle = this.state.isTogle
        this.setState({
            isTogle : !togle
        })

        if(togle){
            var t = a.target;
            t.style.transform = "rotate(0deg)"
        }else{
            var t = a.target;
            t.style.transform = "rotate(900deg)"
        }

        var ml = 0
        var si = setInterval(
            function frame(){
                if(!togle){
                    ml++
                    var ml2 = (ml * 10) - 10
                    var ml3 = 250 - ml2
                    elm[0].style.marginLeft = "-"+ml2+"px"
                    elm2.style.marginLeft = ml3+"px"
                    elm3.style.marginLeft = ml3+"px"
                }else{
                    ml++
                    var ml2 = (ml * 10) - 10
                    var ml3 = parseInt(-250) + ml2
                    elm[0].style.marginLeft = ml3+"px"
                    elm2.style.marginLeft = ml2+"px"
                    elm3.style.marginLeft = ml2+"px"
                }
                if(ml > 25){
                    clearInterval(si)
                }
            },
            1 
        )
    }

    bars(){
        let btn = document.getElementById("btn-sb-togle")
        btn.style.display = "none"
        let elm2 = document.getElementById("sidebar")
        elm2.style.marginLeft = "0px"

        let elm = document.getElementById("main-base-data-wrapper")
        elm.style.marginLeft =  elm2.offsetWidth+"px"

        let elm3 = document.getElementById("main-header")
        elm3.style.marginLeft =  elm2.offsetWidth+"px"
    }

    seeProfile(){
        this.setState({
            popup: <Profile hidePopUp={this.hidePopUp}/>
        })
    }

    render(){
        return(
            <div id="header" className='navbar main-border-bottom main-color' style={{overflow: 'hidden'}}>
                
                <div id="main-header" style={{/*marginLeft: "50px"*/}}>
                    <button id="btn-sb-togle" onClick={this.bars}
                        style={{float: "left",
                                fontSize: "16px",
                                background: "none",
                                display: "none",
                                marginTop: "21px",
                                marginLeft: "15px"}}>
                        <FontAwesomeIcon icon={faBars}/>
                    </button>

                    <img style={{marginTop:"18px",marginLeft: "15px", height: "25px"}} src={Logo}></img>            

                    <div style={{float: 'right', paddingRight: "20px", display: "flex", alignItems: "center", height: "55px"}}>
                        <Link to="/project">
                            <div style={{float: "left", borderRadius: "18px", marginRight: "20px", paddingTop: "7px", color: "#FFF", display: "flex", alignItems: "center"}}>
                                <FontAwesomeIcon icon={faFolder} style={{fontSize: "16px"}}/>&nbsp;&nbsp;
                                <span className="bold" style={{fontSize: "11px"}}>Project</span>
                            </div>
                        </Link>
                        <a onClick={this.notification}>
                            <div style={{float: "left", borderRadius: "18px", marginRight: "20px", paddingTop: "7px", color: "#FFF", transform: "rotate(20deg)"}}>
                                <em style={{fontSize: "16px"}} class="fa fa-bell"></em>
                            </div>
                        </a>

                        {this.state.popup}

                        <a onClick={this.popAction}>
                            <div className="bold" id="pic-profile-navbar-base" style={styelPicProfileBase}>
                                <div style={{position: "absolute", width: "30px", textAlign: "center", marginTop: "8px"}}>{this.firstWord("")}</div>
                                <div style={{width: "30px", height: "30px", borderRadius: "20px", position: "absolute", background: "url("+baseUrl+"/pic_profile/"+this.props.userLoginData.picProfile+") center center / cover no-repeat"}}/>
                            </div>
                        </a>
                    </div>
                </div>
                {this.props.popup}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        userLoginData : state.userLoginData,
        title : state.title
    }
}

const styelPicProfileBase = {height: "30px", 
                            width: "30px", 
                            borderRadius: "100%", 
                            float: "left", 
                            background: "#FFF", 
                            textAlign: "center",
                            fontSize: "12px", 
                            marginTop: "2px"}

export default connect(mapStateToProps)(navbar)