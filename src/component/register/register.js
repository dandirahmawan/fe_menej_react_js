import React from 'react'
import Logo from '../../images/menej_285e8e.png'
import { baseUrl } from '../../const/const'
import Confirmaton from './register_confirmation'
import {Link} from "react-router-dom";

class register extends React.Component{

    constructor(){
        super()
        this.state = {
            email:'',
            password: '',
            name:'',
            alertRegister: '',
            repeatPassword:'',
            confirmationBase:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangePass = this.handleChangePass.bind(this)
        this.handleChangePassRepeat = this.handleChangePassRepeat.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.submit = this.submit.bind(this)
        this.baseRegister = React.createRef()
    }

    handleChange(e){
        var v = e.target.value
        this.setState({
            email: v
        })
    }

    handleChangeName(e){
        var v = e.target.value
        this.setState({
            name: v
        })
    }

    handleChangePass(e){
        var v = e.target.value
        this.setState({
            password: v
        })
    }

    handleChangePassRepeat(e){
        var v = e.target.value
        this.setState({
            repeatPassword: v
        })
    }

    setCookies(data){
        for(var i = 0;i<data.length;i++){
            document.cookie = "userId = "+data[i]['userId'];
        }
        window.location.reload()    
    }

    submit(e){
        if(this.state.email.length == 0){
            this.setState({
                alertRegister: "Email is empty"
            })
            return false;
        }

        if(this.state.password.length == 0){
            this.setState({
                alertRegister: "Password is empty"
            })
            return false;
        }

        if(this.state.password != this.state.repeatPassword){
            this.setState({
                alertRegister: "Repeat password not match"
            })
            return false;
        }

        this.setState({
            alertRegister: ""
        })

        var b = e.target
        b.style.background = "#CCC"
        b.innerText = "processing.."
        
        var form = new FormData()
        form.append("email", this.state.email)
        form.append("password", this.state.password)
        form.append("name", this.state.name)
        fetch(baseUrl+"/register", {
            method: "POST",
            body: form
        }).then(res => res.text())
        .then((result) => {
            if(result != "ready"){
                this.baseRegister.current.style.display = "none"
                this.setState({
                    confirmationBase: <Confirmaton email={this.state.email} password={this.state.password}/>
                })
                // this.login()
            }else{
                this.setState({
                    alertRegister: "Email has been reegistered"
                })
                b.style.background = ""
                b.innerText = "Submit"
            }
        })    
    }

    render(){
        return(
            <React.Fragment>
                <div ref={this.baseRegister} style={{textAlign: "center", marginTop: "100px"}}>
                    <img src={Logo}></img><br/>
                    <p className="bold-black">Register</p>
                    <p className="bold" style={{fontSize: '12px', color: "#F00"}}>{this.state.alertRegister}</p>
                    
                    <input type='text' onChange={this.handleChange} className='bold' placeholder='Email' style={{padding: "10px", fontSize: "14px", marginBottom: "10px", width: "250px"}}></input><br/>
                    
                    <input type='text' onChange={this.handleChangeName} className='bold' placeholder='Name' style={{padding: "10px", fontSize: "14px", marginBottom: "10px", width: "250px"}}></input><br/>

                    <input type='password' onChange={this.handleChangePass} className='bold' placeholder='Password' style={{padding: "10px", fontSize: "14px", marginBottom: "10px", width: "250px"}}></input><br/>

                    <input type='password' onChange={this.handleChangePassRepeat} className='bold' placeholder='Repeat Password' style={{padding: "10px", fontSize: "14px", marginBottom: "10px", width: "250px"}}></input><br/>
                    
                    <button className='btn-primary bold' onClick={this.submit} style={{fontSize: "12px", marginTop: "10px", width: "150px", padding: "10px"}}>Submit</button>

                    <div className="bold" style={{marginTop: '20px', textAlign: "center"}}>
                        <Link to="/login"><a style={{fontSize: "11px"}}>Back to login</a></Link><br/>
                        <Link to="/forgot_password" style={{fontSize: "11px"}}>Forgot password</Link>
                    </div>
                </div>
                {this.state.confirmationBase}
            </React.Fragment>
            
        )
    }
}

export default register