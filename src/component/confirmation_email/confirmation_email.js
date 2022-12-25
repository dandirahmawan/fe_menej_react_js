import React from 'react'
import Logo from '../../images/menej_285e8e.png'
import {Spinner} from '../spinner'
import {ApiFetch} from '../apiFetch'
import { getCookieUserId } from '../../function/function'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import Fetch from '../../function/fetchApi'

class confirmation_email extends React.Component{

    state = {
        isLoad: true,
        code: 0,
        message: null, 
        email: null
    }

    base = React.createRef()

    componentDidMount(){
        var href = window.location.href
        var get = href.lastIndexOf("?")
        var get = href.substring(parseInt(get) + 1, href.length)
        var nameGet = get.split("=")[0]
        document.body.style.background = '#e1e1e1'
        var userId = getCookieUserId()

        if(nameGet === "conf"){
            var parGet = get.split("=")[1]
            var form = new FormData()
            form.append("conf", parGet)
            form.append("userId", userId)

            let fetch = new Fetch()
            fetch.post("/email_confirmation", form).then(result => {
                try {
                    let code = result.code

                    this.setState({
                        resultInv: result,
                        isLoad: false,
                        code: code,
                        email: result.message
                    })

                    let wHeight = window.innerHeight
                    let heightBase = this.base.current.offsetHeight
                    
                    let top = ((wHeight - heightBase) / 2) - 80
                    this.base.current.style.marginTop =  top+"px"
                } catch (error) { /*noting happen*/ }
            })
        }
    }

    render(){
        return(
            <React.Fragment>
                <div ref={this.base}>
                    <div id="header" style={{borderTop: "none"}}>
                        <div id="main-header">
                            <div style={{height:"60px", textAlign: "center", marginTop: "30px"}}>
                                <img style={{marginTop:"17px", width: "100px"}} src={Logo}></img>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        {
                            (this.state.isLoad)
                            ?
                                <div style={{marginTop: "20px", textAlign: "center"}}>
                                    <Spinner size="20px"/>
                                    <div className="second-font-color" style={{fontSize: "12px"}}>processing..</div>
                                </div>
                            :
                                (this.state.code == 1)
                                ?
                                    <div style={{textAlign: "center", marginTop: "30px"}}>
                                        <div style={{marginBottom: "10px"}}>
                                            <FontAwesomeIcon icon={faCheckCircle} className="second-font-color" style={{fontSize: "40px", color: "green"}}/>
                                        </div>
                                        <span className="bold" style={{fontSize: "20px"}}>
                                            Change email successfully
                                        </span>
                                        <div style={{fontSize: "12px", marginTop: "10px"}}>
                                            Your current email account is
                                            <div className="bold" style={{marginTop: "2px"}}>
                                                {this.state.email}
                                            </div>
                                            {/* Successfully set e new email with email address<br/><span className="bold">dandirahmawan95@gmail.com</span> */}
                                        </div>
                                        <div style={{marginTop: '10px'}}>
                                            <a href="/project">
                                                <button className="btn-primary" style={{fontSize: "12px"}}>
                                                    Open menej <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                :
                                    <div style={{textAlign: "center", marginTop: "30px"}}>
                                        <div style={{marginBottom: "10px"}}>
                                            <FontAwesomeIcon icon={faTimesCircle} className="second-font-color" style={{fontSize: "40px", color: "red"}}/>
                                        </div>
                                        <span className="bold" style={{fontSize: "20px"}}>
                                            Request not found
                                        </span>
                                        <div style={{fontSize: "12px", marginTop: "10px"}}>
                                            Request to change email account is not found<br/>the link maybe be expired
                                        </div>
                                        <div style={{marginTop: '10px'}}>
                                            <a href="/project">
                                                <button className="btn-primary" style={{fontSize: "12px"}}>
                                                    Open menej <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default confirmation_email