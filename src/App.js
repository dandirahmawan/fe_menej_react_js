import React from 'react'
import ReactDom from 'react-dom'
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
import {startData} from './redux/action'
import {connect} from 'react-redux'
import './css/style.css'
import './App.css'
import { baseUrl } from './const/const';
import { getCookieUserId, getCookieSessionId } from './function/function';
import {SpinnerButton} from "./component/spinner";

// const btnPrimary = document.getElementsByTagName("button")
// btnPrimary.addEventListener("click", function(){
//     alert("dandi")
// })

class App extends React.Component{
  
  constructor(){
    super()
    this.state = {
      userNameLogin: "",
      emailLogin: "",
      isLoad: true
    }
  }

  componentDidMount(){
    // document.addEventListener("click", function(e){
    //   let elmClick = e.target
    //   let tag = elmClick.tagName
    //   if(tag === "BUTTON"){
    //       let classs = elmClick.getAttribute("class").split(" ")
    //       for(let i = 0;i<classs.length;i++){
    //           if(classs[i] == "btn-primary"){
    //               elmClick.style.opacity = 0.5
    //               ReactDom.render(<SpinnerButton size="15px"/>, elmClick)
    //           }
    //       }
    //   }
    // })

    let form = new FormData();
    var userId =  getCookieUserId()
    var sessionId = getCookieSessionId()

    form.append("userId", userId)
    form.append("sessionId", sessionId);

    fetch(baseUrl+"/start_data", {
      method : "POST",
      body : form
    }).then(rst => rst.text())
    .then(result => {
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
    if(a === ""){
      return (
        <div>
          <BrowserRouter>
            <Redirect to="/login"></Redirect>
            <Route path="/login"  exact component={Login} />
            <Route path="/register"  exact component={Register} />
          </BrowserRouter>
        </div>
      );
    }else{
      if((this.state.userNameLogin == null && this.state.emailLogin == null && this.state.isLoad == false) || this.state.userNameLogin == "" && this.state.emailLogin == "" && this.state.isLoad == false){
        return(
          <BrowserRouter>
            <Redirect to="/logout" component={Logout}></Redirect>
          </BrowserRouter>
        )
      }
      if((this.props.userEmailLogin == "" || this.props.userNameLogin == "" || this.props.userEmailLogin === undefined || this.props.userNameLogin === undefined) && path != '/logout'){
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
          const redirect = (path === '/login') ? <Redirect to="/dashboard"></Redirect> : ""
          return (
            <BrowserRouter>
                {redirect}
                <Navbar/>
                <Sidebar/>
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/users/"  exact component={User} />
                <Route path="/project/"  exact component={Project} />
                <Route path="/project/:id"  exact component={ListModule} />
                <Route path="/logout"  exact component={Logout} />
                <Route path="/profile"  exact component={Profile} />
            </BrowserRouter>
          )
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
