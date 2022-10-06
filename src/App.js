import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import Login from './component/login'
import Navbar from './component/navbar'
import Project from './component/project/project'
import Task from './component/task/task'
import StartPage from './component/start_page'
import Register from './component/register/register'
import Invitation from './component/invitation/invitation'
import Logout from './component/logout'
import ForgotPassword from './component/forgot_password'
import AccountRecover from './component/account_recover'
import PageNotFound from './component/404'
import Email from './component/email'
import ConfirmationEmail from './component/confirmation_email/confirmation_email'
import {startData} from './redux/action'
import {connect} from 'react-redux'
import './css/style.css'
import './App.css'
import { baseUrl, baseUrlGO } from './const/const'
import { pathValidation } from './function/function'
import axios from 'axios'
import Ismobile from './ismobile'

/*set config axios base url and header*/
let cookie = document.cookie
if(cookie != "" && cookie != null && cookie !== undefined){
    let data = cookie.replace(" ","").split(";")
    let userId      = (data[0]) ? data[0].split("=")[1] : ""
    let sessionId   = (data[1]) ? data[1].split("=")[1] : ""
    axios.defaults.headers.common['userid'] = userId
    axios.defaults.headers.common['sessionid'] = sessionId
    axios.defaults.baseURL = baseUrl
}

class App extends React.Component{
    mCookie = document.cookie
    constructor(){
        super()
        this.state = {
            userNameLogin: "",
            emailLogin: "",
            isLoad: true,
            pathIndex: true,
            invalidPath: false
        }
    }

    componentDidMount(){
        let path = window.location.pathname
        if(pathValidation(path) == "invalid"){
            this.setState({
                invalidPath: true
            })
        }

        const isMobile = navigator.userAgentData.mobile;
        if(isMobile){
            ReactDOM.render(<Ismobile/>, document.getElementById("root"))
            return false
        }

        if(this.mCookie !== ""){
            axios.get(baseUrlGO+"/start_data").then(result => {
                if(result != ""){
                    let jsonData = result.data
                    console.log(jsonData)
                    this.props.dispatchStartData(jsonData)
                    this.setState({
                        userNameLogin: jsonData.name,
                        emailLogin: jsonData.email,
                        isLoad: false
                    })
                }
            })
        }
    }

    render(){
        var a = document.cookie
        var path = window.location.pathname

        if(path == "/account_recovery" || path == "/email"){
            return(
                <BrowserRouter>
                    <Route path="/account_recovery"  exact component={AccountRecover} />
                    <Route path="/email"  exact component={Email} />
                </BrowserRouter>
            )
        }
        else{
            if(a === ""){
                let redirectUrl = "/login"
                if(path == "/invitation" || path == "/login/invitation"){
                    let href = window.location.href
                    let lastIdx = href.lastIndexOf("/")
                    let strLastIdx = href.substr(lastIdx + 1, href.length)
                    redirectUrl = "/login/"+strLastIdx
                }

                return (
                    <div>
                        <BrowserRouter>
                            <Redirect to={redirectUrl}/>
                            <Route path="/login"  exact component={Login} />
                            <Route path="/login/*"  exact component={Login} />
                            <Route path="/account_recovery"  exact component={AccountRecover} />
                            <Route path="/forgot_password"  exact component={ForgotPassword} />
                            <Route path="/register"  exact component={Register} />
                        </BrowserRouter>
                    </div>
                )
            }else{
                if(
                    (this.state.userNameLogin == null &&
                        this.state.emailLogin == null &&
                        this.state.isLoad == false
                    ) || this.state.userNameLogin == "" && this.state.emailLogin == "" && this.state.isLoad == false){
                    return(
                        <BrowserRouter>
                            <Redirect to="/logout" component={Logout}></Redirect>
                        </BrowserRouter>
                    )
                }
                if(Object.keys(this.props.userLoginData).length == 0 && path != "/logout"){
                    return(
                        <StartPage/>
                    )
                }else{
                    if(path == '/invitation' || path == '/confirmation_email'){
                        return(
                            <BrowserRouter>
                                <Route path="/invitation" exact={true} component={Invitation} />
                                <Route path="/confirmation_email" exact={true} component={ConfirmationEmail} />
                            </BrowserRouter>
                        )
                    }
                    else if(path == '/logout'){
                        return(
                            <BrowserRouter>
                                <Logout/>
                                {/* {a === "" ? <Redirect to="/login"></Redirect> : <Logout/>} */}
                            </BrowserRouter>
                        )
                    }else{
                        const path = window.location.pathname
                        const redirect = (path === '/login' || path === "/") ? <Redirect to="/project"></Redirect> : ""
                        return (  
                                (pathValidation(path) == "invalid")
                                ?
                                    <BrowserRouter>
                                        <Navbar/>
                                        <div id='main-base-data-wrapper' style={{marginLeft: "0px"}}>
                                            <Route path='*' exact={true} component={PageNotFound} />
                                        </div>
                                    </BrowserRouter>
                                :
                                    <BrowserRouter>
                                        {redirect}
                                        <Navbar/>
                                        {/* <Sidebar/> */}
                                        <div id="main-base-data-wrapper">
                                            <Route path="/project/" exact={true} component={Project} />
                                            <Route path="/project/:id" exact={true} component={Task} />
                                            <Route path="/logout" exact={true} component={Logout} />
                                            <Route path="/project/:id/*" exact={true} component={PageNotFound} />
                                        </div>
                                    </BrowserRouter> 
                        )
                    }
                }
            }
        }
    }
}

const mapStateToProps = state => {
    return{
        userLoginData : state.userLoginData
    }
}

const mapDispatchToProps = dispatch => {
    return{
        dispatchStartData : (jsonData) => dispatch(startData(jsonData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
