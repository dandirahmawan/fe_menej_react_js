import React from 'react'
import Logo from '../../images/menej_fff.png'
import { baseUrl } from '../../const/const'
import { getCookieSessionId, getCookieUserId } from '../../function/function'
import wrnAlt from '../../images/warn_alert_inf.png'
import scsAlt from '../../images/success_alt_inf.png'
import {Spinner} from '../spinner'

class invitation extends React.Component{

    constructor(){
        super()
        this.state = {
            resultInv: 0,
            isload: true
        }
    }

    componentDidMount(){
        var href = window.location.href
        var get = href.lastIndexOf("?")
        var get = href.substring(parseInt(get) + 1, href.length)
        var nameGet = get.split("=")[0]

        var sessionId = getCookieSessionId();
        var userId = getCookieUserId();

        if(nameGet === "conf"){
            var parGet = get.split("=")[1]
            var form = new FormData()
            form.append("conf", parGet)
            form.append("userId", userId)
            form.append("sessionId", sessionId)
            fetch(baseUrl+"/conf_invitation", {
                method: "POST",
                body: form
            }).then(res => res.text())
            .then(result => {
                this.setState({
                    resultInv: result,
                    isload: false
                })
            }) 
        }
    }

    render(){
        return(
            <React.Fragment>
                <div id="header" style={{background: "#FFF", overflow: 'hidden', borderTop: "none"}}>
                    <div id="main-header" className="main-color">
                        <div style={{height:"60px", textAlign: "center"}}>
                            <img style={{marginTop:"17px",marginLeft: "15px", width: "80px"}} src={Logo}></img>
                        </div>
                    </div>
                </div>
                <div>
                    {
                        (this.state.isload)
                        ?
                            <div style={{margin: "auto",marginTop: "50px"}}>
                                <Spinner size="30px" textLoader="processing invitation..."/>
                            </div>
                        :
                            (this.state.resultInv == 0)
                            ?
                                <div style={{width: "300px", margin: "auto", marginTop: "50px", textAlign: "center"}}>
                                    <div><img src={wrnAlt}/></div>
                                    <div>
                                        <span className="bold">Opps</span><br/>
                                        <span style={{fontSize: "12px"}}>
                                            Invitation not available or expired, invitation will be expired in 24 hours
                                        </span>
                                    </div>
                                </div>
                            : 
                                <div style={{width: "300px", margin: "auto", marginTop: "50px", textAlign: "center"}}>
                                    <div><img src={scsAlt}/></div>
                                    <div>
                                        <span className="bold">Accepted</span><br/>
                                        <span style={{fontSize: "12px"}}>
                                            Invitation has been accpeted, lets start with your new partners in menej
                                        </span><br></br>
                                        <a href="/dashboard">
                                            <button className="btn-primary" style={{fontSize: "10px", marginTop: "10px"}}>
                                                Go to Menej
                                            </button>
                                        </a>
                                    </div>
                                </div>
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default invitation