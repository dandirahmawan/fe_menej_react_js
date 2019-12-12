import React from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import Login from './component/login'
import Navbar from './component/navbar'
import Sidebar from './component/sidebar'
import Dashboard from './component/dashboard'
import User from './component/user/user'
import Project from './component/project'
import ListModule from './component/list_module'
import Register from './component/register'
import './css/style.css'
import './App.css'

class App extends React.Component{

  render(){
    var a = document.cookie
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
      const path = window.location.pathname
      const redirect = (path === '/login') ? <Redirect to="/dashboard"></Redirect> : ""
      return (
        <div onClick={this.test}>
          <BrowserRouter>
              {redirect}
              <Navbar/>
              <Sidebar/>
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/users/"  exact component={User} />
              <Route path="/project/"  exact component={Project} />
              <Route path="/project/:id"  exact component={ListModule} />
          </BrowserRouter>
        </div>
      );
    }
  }
}

export default App;
