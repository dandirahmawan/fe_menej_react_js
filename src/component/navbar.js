import React from 'react'
import PopupProfile from './popup_profile'
import {connect} from 'react-redux'
import PopupNotification from './popup_notification'
import LeftArrow from '../images/left_arrow.png'
import Logo from '../images/menej_285e8e.png'
import {backHistory} from '../function/function'
import {baseUrl} from "../const/const"
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

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
    }

    popAction(){
        const e = <PopupProfile 
                    logout={this.logout} 
                    hidePopUp={this.hidePopUp}
                    name={this.props.userNameLogin}
                    email={this.props.userEmailLogin}
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

    render(){
        return(
            <div id="header" className='navbar main-border' style={{background: "#FFF", overflow: 'hidden', borderTop: "none"}}>
                {/*<img src={Logo} style={{height: "25px", float: "left", marginTop: "17px"}}/>*/}
                <div id="main-header" style={{marginLeft: "50px"}}>
                    <button id="btn-sb-togle" onClick={this.bars}
                        style={{float: "left",
                                fontSize: "16px",
                                background: "none",
                                display: "none",
                                marginTop: "21px",
                                marginLeft: "15px"}}>
                        <FontAwesomeIcon icon={faBars}/>
                    </button>
                    <div id="title-header" className="bold second-color" style={{float: "left", fontSize: "20px", padding: "19px"}}>
                        <img onClick={this.backNavbar} src={LeftArrow} style={{width: "15px", marginRight: "10px", cursor: "pointer",}}></img>
                        {this.props.title}
                    </div>

                    <div style={{float: 'right', padding: "12px"}}>
                        <input className="main-border" placeholder="Search" type="text" style={{padding: "7px", fontWeight: "bolder", width: "250px", float: "left", marginRight: "100px", background: "#f7f7f7", marginTop: "3px"}}/>

                        <a onClick={this.notification}>
                            <div style={{float: "left", borderRadius: "18px", marginRight: "20px", paddingTop: "7px"}}>
                                <em style={{fontSize: "20px"}} class="fa fa-bell"></em>
                            </div>
                        </a>

                        {this.state.popup}

                        <a onClick={this.popAction}>
                            <div className="main-color bold" style={{height: "25px", width: "35px", borderRadius: "18px", float: "left", color: "#FFF", textAlign: "center", paddingTop: "10px", fontSize: "12px"}}>
                                {this.firstWord(this.props.userNameLogin)}
                                <div style={{width: "35px", height: "35px", borderRadius: "20px", background: "url("+baseUrl+"/pic_profile/"+this.props.picProfile+") center center / cover no-repeat", position: "absolute", top: "11px"}}/>
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
        title : state.title,
        userNameLogin : state.userNameLogin,
        userEmailLogin : state.userEmailLogin,
        picProfile : state.picProfileUserLogin
    }
}

export default connect(mapStateToProps)(navbar)