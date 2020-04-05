import React from 'react'
import ReactDom from 'react-dom'
import Row from './row_permition'
import { baseUrl } from '../../const/const'
import {getCookieSessionId, popUpAlert} from '../../function/function'
import {SpinnerButton} from "../spinner";

class permition extends React.Component{

    constructor(){
        super()
        this.state = {
            dataPermition: [],
            userId:"",
            userName:"",
            userEmail:"",
            permitionSelected:[]
        }
        this.checkClick = this.checkClick.bind(this)
        this.commitPermition = this.commitPermition.bind(this)
    }

    componentDidMount(){
        var w = window.innerWidth
        var h = window.innerHeight
        var left = (w - 300) / 2
        var top = (h - 300) / 2
        var base = document.getElementById("base-permition")
        base.style.left = left+"px"
        base.style.top = top+"px"

        var baseHeader  = document.getElementById("head-base-permition")
        var baseMain    = document.getElementById("main-base-permition")
        var baseFooter  = document.getElementById("footer-base-permition")
        var basePermition = document.getElementById("base-permition")

        var headerHeight = baseHeader.offsetHeight
        var footerHeight = baseFooter.offsetHeight
        var heightMain = basePermition.offsetHeight - 20 - (parseInt(headerHeight) + footerHeight)
        baseMain.style.height = heightMain+"px"

        var form = new FormData()
        form.append('userId', this.props.userId)
        form.append('projectId', this.props.projectId)
        fetch(baseUrl+"/permition_project",{
            method: "POST",
            body: form
        }).then(res => res.json())
        .then(result => {
            
            //set ready permition to state.permitionSelected
            for(var i = 0;i<result.dataPermition.length;i++){
                if(result.dataPermition[i]['isChecked'] == 'Y'){
                    this.state.permitionSelected.push(result.dataPermition[i]['permitionCode'])
                }   
            }

            this.setState({
                dataPermition: result.dataPermition,
                userId: result.dataUser.userId,
                userName: result.dataUser.userName,
                userEmail: result.dataUser.emailUser
            })

        })
    }

    checkClick(e, permitionCode){
        var t = e.target
        this.setState(prev => {
            const newData = prev.dataPermition.map(dt => {
                if(dt.permitionCode == permitionCode){
                    if(t.checked == true){
                        dt.isChecked = "Y"
                        var idx = this.state.permitionSelected.indexOf(permitionCode)
                        if(idx == -1){
                            this.state.permitionSelected.push(permitionCode)
                        }
                    }else{
                        dt.isChecked = "N"
                        var idx = this.state.permitionSelected.indexOf(permitionCode)
                        this.state.permitionSelected.splice(idx, 1)
                    }
                }
                return dt
            })
            return{
                dataPermition: newData,
                permitionSelected: this.state.permitionSelected
            }
        })
    }

    commitPermition(e){
        let t = e.target
        t.style.opacity = 0.5
        ReactDom.render(<SpinnerButton size="15px"/>, t)

        var form = new FormData()
        form.append('permition_code', this.state.permitionSelected)
        form.append('project_id', this.props.projectId)
        form.append('user_id', this.props.userId)
        form.append('sessionId', getCookieSessionId())
        fetch(baseUrl+"/set_permition", {
            method: "POST",
            body: form
        }).then(res => res.text())
            .then(result => {
                if(result == ""){
                    popUpAlert("Permition successfully updated", "success")
                    ReactDom.render("Submit", t)
                    t.style.opacity = 1
                }
            })
    }

    render(){

        const styleBase = {
            width: "300px",
            background: "#FFF",
            permition: "fixed",
            height: "300px",
            position: "fixed",
            borderRadius: "5px"
        }

        const data = this.state.dataPermition.map(dt => <Row
                                                            permitionName={dt.permitionName}
                                                            permitionDescription={dt.permitionDescription}
                                                            permitionCode={dt.permitionCode}
                                                            isChecked={dt.isChecked}
                                                            checkClick={this.checkClick}
                                                        />)

        return(
            <React.Fragment>
                <div className="block"></div>
                <div id="base-permition" className="main-border pop" style={styleBase}>
                    <div id="head-base-permition" className="bold main-border-bottom" style={{padding: "10px", fontSize: "14px"}}>
                        Permition
                    </div>
                    <div id="main-base-permition" style={{padding: "10px",  overflowY: "scroll"}}>
                        <div style={{width: "30px", height: "30px", borderRadius: "15px", background: "#CCC"}}></div>
                        <div style={{marginLeft: "40px", marginTop: "-31px"}}>
                            <span className="bold" style={{fontSize: "12px"}}>
                                {this.state.userName}
                            </span>
                            <div className="second-font-color" style={{fontSize: "11px"}}>
                                {this.state.userEmail}
                            </div>
                        </div>
                        <table style={{marginLeft:"30px", marginTop: "10px"}}>
                            {data}
                        </table>
                    </div>
                    <div id="footer-base-permition" className="main-border-top" style={{padding: "10px", textAlign: "right"}}>
                        <button onClick={this.commitPermition} className="btn-primary" style={{fontSize: "12px"}}>Save</button>
                        <button onClick={this.props.cancelPermition} style={{fontSize: "12px", background: "none"}}>Cancel</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default permition