import React from 'react'
import { baseUrl } from '../../const/const'
import { getCookieUserId, getCookieSessionId, popUpAlert } from '../../function/function'
// import ItemUserAddMember from '../item_user_add_member'
import ItemMemberAssigning from './item_member_assigning'
import ReactDom from 'react-dom'
import {ApiFetch} from '../apiFetch'
import {SpinnerButton} from "../spinner"
import Permition from './permition'
import {Spinner} from '../spinner'
import Fetch from '../../function/fetchApi'

class set_assigned_module extends React.Component{

    constructor(){
        super()
        this.state = {
            listMember: [],
            listSelected: [],
            popup: "",
            isLoad: false
        }

        this.checkAddMember = this.checkAddMember.bind(this)
        this.hidePopup = this.hidePopup.bind(this)
        this.assign = this.assign.bind(this)
    }

    componentDidMount(){
        /*start positioning popup in window to center*/
        var elm = document.getElementById("base-add-member")
        var h = elm.offsetHeight
        var w = elm.offsetWidth
        var top = (window.innerHeight - h) / 2 
        var left = (window.innerWidth - w) / 2
        
        elm.style.top = top+"px"
        elm.style.left = left+"px"
        /*end positioning popup in window to center*/

        this.props.userAssigned.map(dt => {
            this.state.listSelected.push(dt.userId)
        })

        var form = new FormData()
        form.append("projectId", this.props.projectId)

        let fetch = new Fetch()
        fetch.post("/module/assigning", form).then(result => {
            try {
                this.setState({
                    listMember: result,
                    isLoad: false
                })
                
                //set style base data height
                var hdr = document.getElementById("header-add-member")
                var ftr = document.getElementById("footer-add-member")
                var mam = document.getElementsByClassName("main-add-member")
                for(var i = 0;i<mam.length;i++){
                    mam[i].style.height = 350 - (parseInt(hdr.offsetHeight) + ftr.offsetHeight)+"px"
                }
            }catch (error) {
                /*noting happen*/
            }
        })
    }

    checkAddMember(userId){
        let idx = this.state.listSelected.indexOf(userId)
        if(idx == -1) {
            this.state.listSelected.push(userId)
        }else{
            this.state.listSelected.splice(idx, 1)
        } 
    }

    assign(){
        let moduleId = this.props.moduleId
        let data = []
        this.state.listMember.map(dt => {
            let idx = this.state.listSelected.indexOf(dt.userId)
            if(idx != -1){
                dt.moduleId = moduleId
                data.push(dt)
            }
        })
        
        this.props.okAssign(data)
    }

    hidePopup(){
        let elm = document.getElementById("base-add-member")
        elm.style.zIndex = 1000

        this.setState({
            popup: ""
        })
    }

    render(){
        const dataMember = this.state.listMember.map(dt =>{

            let isChecked = false
            this.state.listSelected.map(dta => {
                if(dt.userId == dta){
                    isChecked = true
                }
            })

            return <ItemMemberAssigning
                        checkMember={this.checkAddMember}
                        userName= {dt.userName}
                        userId={dt.userId}
                        userEmail={dt.emailUser}
                        picProfile={dt.picProfile}
                        isRelated={dt.isRelated}
                        isInvited={dt.isInvited}
                        isChecked={isChecked}
                        userSelected={dt.isCheckedRemove}/>
        })

        return(
            <React.Fragment>
                <div onClick={this.blockClick} className="block"></div>
                {this.state.popup}
                <div id='base-add-member' style={{background: "#FFF", position: "fixed", zIndex: "1000", borderRadius: "3px"}}>
                    <div id="main-base-add-member" style={{width: "350px", height: "350px"}}>
                        <div id="header-add-member" className="bold main-border-bottom" style={{padding: "10px", fontSize: "14px"}}>
                            User Assigning
                        </div>
                        {
                            (this.state.isLoad)
                            ?   
                                <Spinner size="20px"/>
                            :
                                <div>
                                    <div className="main-add-member">
                                        <div className="main-add-member" style={{float: "left", width: "330px", overflowY: "scroll"}}>
                                            <div /*style={{marginTop: "35px"}}*/>
                                                {dataMember}
                                            </div>
                                        </div>
                                    </div>
                                    <div id="footer-add-member" className="main-border-top" style={{padding: "10px", textAlign: "right", height: "27px"}}>
                                        <button onClick={this.assign} className="btn-primary" style={{fontSize: "12px"}}>Ok</button>
                                        <button onClick={this.props.cancel} style={{fontSize: "12px", marginLeft: "5px", background: "none"}}>Cancel</button>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default set_assigned_module