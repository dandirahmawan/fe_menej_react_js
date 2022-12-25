import React from 'react'
import {Link} from 'react-router-dom'
import Logo from '../images/menej_285e8e.png'
import {baseUrlGO} from '../const/const'
import cookieReact from 'react-cookies'

class login extends React.Component{

    constructor(){
        super()
        this.state = {
            email:'',
            password: '',
            alertLogin: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangePass = this.handleChangePass.bind(this)
        this.submit = this.submit.bind(this)
    }

    handleChange(e){
        var v = e.target.value
        this.setState({
            email: v
        })
    }

    handleChangePass(e){
        var v = e.target.value
        this.setState({
            password: v
        })
    }

    setCookies(data){
        for(var i = 0;i<data.length;i++){
            cookieReact.save("userId", data[i]['userId'], {path: '/'})
            cookieReact.save("sessionId", data[i]['sessionId'], {path: '/'})
        }  
    }

    componentDidMount(){
        this.setCenter()
    }

    submit(e){
        if(this.state.email.length == 0){
            this.setState({
                alertLogin: "Email is empty"
            })
            return false;
        }

        if(this.state.password.length == 0){
            this.setState({
                alertLogin: "Password is empty"
            })
            return false;
        }

        this.setState({
            alertLogin: ""
        })

        var b = e.target
        b.setAttribute("class", "btn-secondary")
        b.innerText = "processing..."
        
        var form = new FormData()
        form.append("email", this.state.email)
        form.append("password", this.state.password)
        // form.append("password", pxd(this.state.password))
        
        /*set redirection location after
        specialy for invitaion redirection page*/
        
        let redirect = ""
        if(window.location.pathname == "/login/invitation"){
            let url = window.location.href
            let lastIndexUrl = url.lastIndexOf("/") + 1
            redirect = url.substring(lastIndexUrl, url.length)
        }

        fetch(baseUrlGO+"/loginApp", {
            method: "POST",
            headers : new Headers(),
            body: form
        }).then(res => res.json())
        .then((result) => {
            if(result[0].code != 201){
                this.setCookies(result)
                if(redirect == ""){ 
                    window.location.reload()
                }else{
                    window.location = window.location.origin+"/"+redirect 
                }
            }else{
                this.setState({
                    alertLogin: "Email and password is not match"
                })
                b.setAttribute("class", "btn-primary")
                b.innerText = "Sign in"
            }
        })    
    }

    setCenter(){
        let elm = document.getElementById("base-login")
        let h = elm.offsetHeight
        let hw = window.innerHeight
        let marginTop = (hw / 2) - (h / 2)
        elm.style.marginTop = marginTop+"px"
        // console.log("height : "+h+" "+marginTop)
    }

    render(){
        return(
            <div id="base-login" style={{textAlign: "center", marginTop: "100px"}}>
                <img src={Logo}></img><br/>
                <p className="bold-black">Sign in</p>
                <p className="bold" style={{fontSize: '12px', color: "#F00"}}>{this.state.alertLogin}</p>
                
                <input type='text' id="e-login" onChange={this.handleChange} className='bold' placeholder='Email' style={{padding: "10px", fontSize: "14px", marginBottom: "10px", width: "250px"}}></input><br/>
                
                <input type='password' id="p-login" onChange={this.handleChangePass} value={this.state.password} className='bold' placeholder='Password' style={{padding: "10px", fontSize: "14px", marginBottom: "10px", width: "250px"}}></input><br/>
                
                <button id="s-login" className='btn-primary bold' onClick={this.submit} style={{fontSize: "12px", marginTop: "10px", width: "150px", padding: "10px"}}>Sign in</button>
                
                <div className="bold" style={{marginTop: '20px'}}>
                    <Link to="/forgot_password"><a style={{fontSize: "11px"}}>Forgot Password?</a></Link><br/>
                    <Link to="/register" style={{fontSize: "11px"}}>Sign up for an account</Link>
                </div>
            </div>
        )
    }
}

export default login