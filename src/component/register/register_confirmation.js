import React from 'react'
import Logo from '../../images/menej_285e8e.png'
import { baseUrl } from '../../const/const'

class register_confirmation extends React.Component{

    constructor(){
        super()
        this.inputConfirm = React.createRef()
        this.submitConfirm = this.submitConfirm.bind(this)
        this.login = this.login.bind(this)
        this.setCookies = this.setCookies.bind(this)
    }

    submitConfirm(){
        var val = this.inputConfirm.current.value
        var email = this.props.email
        
        var form = new FormData()
        form.append("email", email)
        form.append("confirmationCode", val)
        fetch(baseUrl+"/confirmation_registration",{
            method: "POST",
            body: form
        }).then(res => res.text())
        .then(result => {
            if(result == 0){
                alert("confirmation code is wrong")
            }else{
                this.login()
            }
        })
    }

    login(){
        var form = new FormData()
        form.append("email", this.props.email)
        form.append("password", this.props.password)
        
        fetch(baseUrl+"/login", {
            method: "POST",
            headers : new Headers(),
            body: form
        }).then(res => res.json())
        .then((result) => {
            var l = result.length;
            if(l > 0){
                this.setCookies(result);
            }
        })  
    }

    setCookies(data){
        for(var i = 0;i<data.length;i++){
            document.cookie = "userId = "+data[i]['userId'];
            document.cookie = "sessionId = "+data[i]['sessionId'];
        }
        window.location.reload()    
    }

    render(){
        return(
            <div style={{position: "fixed", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%"}}>
                <div style={{textAlign: "center", marginTop: "100px"}}>
                    <img src={Logo}/>
                    <div style={{fontSize: "12px", marginBottom: "10px"}}>
                        <div className="bold" style={{fontSize: "16px", marginBottom: "10px", marginTop: "10px"}}>Confirmation</div>
                        We has sent comfirmation code to you email<br/>please insert code below
                    </div>
                    <input ref={this.inputConfirm} type="text" className="bold" style={{padding: "10px", textAlign: "center"}} maxLength="6" placeholder="code register"></input><br/>
                    <button onClick={this.submitConfirm} className="btn-primary" style={{marginTop: "10px", width: "150px", padding: "10px"}}>Submit</button>
                </div>
            </div>
        )
    }
}

export default register_confirmation