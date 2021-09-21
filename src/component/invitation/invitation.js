import React from 'react'
import Logo from '../../images/menej_285e8e.png'
import InvitationReady from './invitation_ready'
import { getCookieSessionId, getCookieUserId } from '../../function/function'
import wrnAlt from '../../images/warn_alert_inf.png'
import {Spinner} from '../spinner'
// import {ApiFetch} from '../apiFetch'
import Fetch from '../../function/fetchApi'

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
        document.body.style.background = '#e1e1e1'

        var sessionId = getCookieSessionId()
        var userId = getCookieUserId()

        if(nameGet === "conf"){
            var parGet = get.split("=")[1]
            var form = new FormData()
            form.append("conf", parGet)
            form.append("userId", userId)
            form.append("sessionId", sessionId)

            var header = new Headers()
            header.append("sessionId", getCookieSessionId())
            header.append("userId", getCookieUserId());

            let fetch = new Fetch()
            fetch.post("/conf_invitation", form).then(result => {
                this.setState({
                    resultInv: result,
                    isload: false,
                })
            })
        }
    }

    render(){
        return(
            <React.Fragment>
                <div id="header" style={{borderTop: "none"}}>
                    <div id="main-header">
                        <div style={{height:"60px", textAlign: "center", marginTop: "30px"}}>
                            <img style={{marginTop:"17px",marginLeft: "15px", width: "100px"}} src={Logo}></img>
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
                            (this.state.resultInv.viewInvitation == null)
                            ?
                                <div style={{width: "300px", margin: "auto", marginTop: "50px", textAlign: "center"}}>
                                    <div><img src={wrnAlt}/></div>
                                    <div>
                                        <span className="bold">Opps</span><br/>
                                        <span style={{fontSize: "12px"}}>
                                            Invitation not available or expired, invitation will be expired in 3 hours
                                        </span>
                                    </div>
                                </div>
                            : 
                                <InvitationReady data={this.state.resultInv}/>
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default invitation