import React from 'react'
import PopupProfile from './popup_profile'
import {connect} from 'react-redux'
import PopupNotification from './popup_notification'
import {popupProfile, popupNotification} from '../redux/action'
import LeftArrow from '../images/left_arrow.png'
import {backHistory} from '../function/function'

class navbar extends React.Component{
    constructor(){
        super()
        this.state = {
            popupProfile : "",
            isTogle : false
        }
        this.popAction = this.popAction.bind(this)
        this.notification = this.notification.bind(this)
        this.togleSideBar = this.togleSideBar.bind(this)
    }

    popAction(a){
        const e = <PopupProfile logout={this.logout}/>
        this.props.popProfile(e)
        a.stopPropagation()
    }

    notification(a){
        const e = <PopupNotification/>
        this.props.popNotification(e)
        a.stopPropagation()
    }

    logout(){
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        window.location.reload()
    }

    backNavbar(){
        backHistory();
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
                    console.log(ml2+" "+ml3)
                    console.log(togle)   
                }
                if(ml > 25){
                    clearInterval(si)
                }
            },
            1 
        )
    }

    render(){
        return(
            <div id="header" className='navbar main-border' style={{background: "#FFF", overflow: 'hidden', borderTop: "none"}}>
                <div id="main-header" style={{marginLeft: '250px'}}>
                    
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
                        <a onClick={this.popAction}>
                            <div className="main-color bold" style={{height: "25px", width: "35px", borderRadius: "18px", float: "left", color: "#FFF", textAlign: "center", paddingTop: "10px", fontSize: "12px"}}>DR</div>
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
        popup : state.popup,
        title : state.title
    }
}

const mapDispatchToProps = dispatch => {
    return{
        popProfile : (elm) => dispatch(popupProfile(elm)),
        popNotification : (elm) => dispatch(popupNotification(elm))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(navbar)