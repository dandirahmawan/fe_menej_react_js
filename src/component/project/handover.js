import React from 'react'
import ReactDom from 'react-dom'
import {getCookieSessionId, getCookieUserId, popCenterPosition, popUpAlert} from '../../function/function'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFolder} from '@fortawesome/free-solid-svg-icons'
import RowUser from './row_user_handover'
// import {ApiFetch} from '../apiFetch'

import {SpinnerButton} from '../spinner'
import {setDataProject} from '../../redux/action'
import {connect} from 'react-redux'
import Fetch from '../../function/fetchApi'

class handover extends React.Component{

    constructor(){
        super()
        this.state = {
            data: []
        }

        this.buttonSubmit = React.createRef()
        this.submit = this.submit.bind(this)
        this.select = this.select.bind(this)
    }

    componentDidMount(){
        popCenterPosition("pop-handover-project")
        let h1 = document.getElementById("hd-handover-project")
        let h2 = document.getElementById("hd-handover-project-2")
        let ft = document.getElementById("ft-handover-project")
        let mainBase = document.getElementById("base-handover-project")

        let heightH1 = h1.offsetHeight
        let heightH2 = h2.offsetHeight
        let setMainBaseHeight = 350 - 20 - ft.offsetHeight - (parseInt(heightH1) + heightH2)
        mainBase.style.height = setMainBaseHeight+"px"

        let form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())

        let fetch = new Fetch()
        fetch.post("/user_relation", form).then(res => {
            res => {
                this.setState({
                    data: res
                })
            }
        })
        // ApiFetch("/user_relation", {
        //     method: "POST",
        //     body: form
        // }).then(res => res.json()).then(
        //     res => {
        //         this.setState({
        //             data: res
        //         })
        //     }
        // )
    }

    submit(){
        let userId = null
        this.state.data.map(dt => {
            if(dt.isSelected) userId = dt.userId
        })

        if(userId === null){
            popUpAlert("No user selected")
            return false
        }

        let x = this.buttonSubmit.current
        ReactDom.render(<SpinnerButton size="15px"/>, x)
        x.style.opacity = 0.5

        let form = new FormData();
        form.append("userId", userId)
        form.append("userId_", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("projectId", this.props.projectId)

        let fetch = new Fetch()
        fetch.post("/handover_project", form).then(result => {
            try{
                this.props.setDataProject(result)
                this.props.cancel()
            }catch(error) {
                /*nothing action*/
            }
        })
        // ApiFetch("/handover_project", {
        //     method: "POST",
        //     body: form
        // }).then(res => res.json())
        //     .then(result => {
        //         this.props.setDataProject(result)
        //         this.props.cancel()
        //     })
    }

    select(userId){
        const newData = this.state.data.map(dt => {
            if(dt.userId == userId){
                dt.isSelected = true
            }else{
                dt.isSelected = false
            }
            return dt
        })

        this.setState({
            data: newData
        })
    }

    render(){

        const rowdata = this.state.data.map(dt => {
            return <RowUser
                        userId= {dt.userId}
                        userName= {dt.userName}
                        userEmail= {dt.emailUser}
                        isSelected= {dt.isSelected}
                        selected= {this.select}
                    />
        })

        return(
            <React.Fragment>
                <div onClick={this.props.cancel} className="block"/>
                <div id="pop-handover-project" className="pop" style={{width: "350px", height: "350px", background: "#FFF", borderRadius: "3px"}}>
                    <div id="hd-handover-project" className="bold main-border-bottom" style={{padding: "10px"}}>
                        Handover project
                    </div>
                    <div id="hd-handover-project-2" className="main-border-bottom" style={{padding: "10px", fontSize: "14px"}}>
                        <span className="bold">
                            <FontAwesomeIcon icon={faFolder} style={{color: "#d4ae2b"}}/> Project name<br/>
                        </span>
                        <span className="second-font-color" style={{fontSize: "12px"}}>Select user below as a new project manager.</span>
                    </div>
                    <div id="base-handover-project" style={{overflowY: "scroll", height: "200px", padding: "10px"}}>
                        <table>
                            <tbody>
                                {rowdata}
                            </tbody>
                        </table>
                    </div>
                    <div id="ft-handover-project" className="main-border-top" style={{textAlign: "right", padding: "10px"}}>
                        <button ref={this.buttonSubmit} onClick={this.submit} className="btn-primary" style={{fontSize: "12px", marginRight: "10px", minWidth: "40px"}}>
                            submit
                        </button>
                        <button onClick={this.props.cancel} className="btn-secondary" style={{fontSize: "12px"}}>Cancel</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const initMapDispatchToProps = dispatch => {
    return{
        setDataProject : (data) => dispatch(setDataProject(data))
    }
}

export default connect('', initMapDispatchToProps) (handover)