import React from 'react'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import Login from './component/login'
import Navbar from './component/navbar'
import Sidebar from './component/sidebar'
import Dashboard from './component/dashboard/dashboard'
import User from './component/user/user'
import Project from './component/project/project'
import ListModule from './component/module/list_module'
import StartPage from './component/start_page'
import Register from './component/register/register'
import Invitation from './component/invitation/invitation'
import Logout from './component/logout'
import Profile from './component/profile/profile'
import ForgotPassword from './component/forgot_password'
import AccountRecover from './component/account_recover'
import PageNotFound from './component/404'
import Email from './component/email'
import {startData} from './redux/action'
import {connect} from 'react-redux'
import './css/style.css'
import './App.css'
import { baseUrl } from './const/const';
import { getCookieUserId, getCookieSessionId, pathValidation } from './function/function';
import {isMobile, MobileView, isBrowser, BrowserView} from 'react-device-detect'
import {SpinnerButton} from "./component/spinner";

class App extends React.Component{
  
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
      let form = new FormData();
      var userId =  getCookieUserId()
      var sessionId = getCookieSessionId()

      let path = window.location.pathname
      if(pathValidation(path) == "invalid"){
          this.setState({
              invalidPath: true
          })
      }

      form.append("userId", userId)
      form.append("sessionId", sessionId);

      fetch(baseUrl+"/start_data", {
            method : "POST",
            body : form
      }).then(rst => rst.text())
      .then(result => {
        console.log(result)
        if(result != ""){
            let jsonData = JSON.parse(result)
            if(jsonData.name != null && jsonData.email != null){
                this.props.dispatchStartData(jsonData.name, jsonData.email, jsonData.picProfile)
            }
            this.setState({
                userNameLogin: jsonData.name,
                emailLogin: jsonData.email,
                isLoad: false
            })
        }
      })
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
            return (
                <div>
                    <BrowserRouter>
                        <Redirect to="/login"/>
                        <Route path="/login"  exact component={Login} />
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
            if(
                (this.props.userEmailLogin == "" ||
                    this.props.userNameLogin == "" ||
                    this.props.userEmailLogin === undefined ||
                    this.props.userNameLogin === undefined
                ) && path != '/logout'){
                return(
                    <StartPage/>
                )
            }else{
                if(path == '/invitation'){
                    return(
                        <Invitation/>
                    )
                }
                else if(path == '/logout'){
                    return(
                        <BrowserRouter>
                            {a === "" ? <Redirect to="/login"></Redirect> : <Logout/>}
                        </BrowserRouter>

                    )
                }else{
                    const path = window.location.pathname
                    const redirect = (path === '/login') ? <Redirect to="/project"></Redirect> : ""
                    return (
                        <BrowserRouter>
                            {redirect}
                            <Navbar/>
                            <Sidebar/>
                            <div id="main-base-data-wrapper">
                                {
                                    (pathValidation(path) == "invalid")
                                    ?
                                        <Route path='*' exact={true} component={PageNotFound} />
                                    :
                                        ""
                                }
                                <Route path="/dashboard" exact={true} component={Dashboard} />
                                <Route path="/users/" exact={true} component={User} />
                                <Route path="/project/" exact={true} component={Project} />
                                <Route path="/project/:id" exact={true} component={ListModule} />
                                <Route path="/logout" exact={true} component={Logout} />
                                <Route path="/profile" exact={true} component={Profile} />
                                <Route path='/not_found' exact={true} component={PageNotFound} />
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
        userNameLogin : state.userNameLogin,
        userEmailLogin : state.userEmailLogin
    }
}

const mapDispatchToProps = dispatch => {
    return{
        dispatchStartData : (userName, userEmail, picProfile) => dispatch(startData(userName, userEmail, picProfile))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
