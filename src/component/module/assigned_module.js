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
        // this.goRight = this.goRight.bind(this)
        // this.checkRemoveMember = this.checkRemoveMember.bind(this)
        // this.goLeft = this.goLeft.bind(this)
        this.hidePopup = this.hidePopup.bind(this)
        this.assign = this.assign.bind(this)
    }

    componentDidMount(){
        var elm = document.getElementById("base-add-member")
        var h = elm.offsetHeight
        var w = elm.offsetWidth
        var top = (window.innerHeight - h) / 2 
        var left = (window.innerWidth - w) / 2
        
        elm.style.top = top+"px"
        elm.style.left = left+"px"

        this.props.userAssigned.map(dt => {
            this.state.listSelected.push(dt.userId)
        })

        var form = new FormData()
        form.append("projectId", this.props.projectId)
        ApiFetch("/module_assigning", {
            method: "POST",
            body: form
        }).then(rst => rst.json())
        .then(result => {
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

    // checkRemoveMember(userId){
    //     let idx = this.state.listSelected.indexOf(userId)
    //     this.state.listSelected.splice(idx, 1)
    // }

    // goRight(){
    //     this.setState({
    //         listSelected: this.state.listSelected
    //     })
    // }

    // goLeft(){
    //     this.setState({
    //         listSelected: this.state.listSelected
    //     })
    // }

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

        // const dataMemberAssigned = this.state.listMember.map(dt =>{
        //     let isChecked = false
        //     this.state.listSelected.map(dta => {
        //         if(dt.userId == dta){
        //             isChecked = true
        //         }
        //     })

        //     if(isChecked)
        //         return <ItemMemberAssigning
        //                     checkMember={this.checkRemoveMember}
        //                     userName= {dt.userName}
        //                     userId={dt.userId}
        //                     userEmail={dt.emailUser}
        //                     picProfile={dt.picProfile}
        //                     isRelated={dt.isRelated}
        //                     isInvited={dt.isInvited}
        //                     userSelected={dt.isCheckedRemove}/>
        // })

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
                                            {/* <div className="bold second-background-grs main-border-bottom" style={{padding: "10px", fontSize: "12px", width: "304px", position: "fixed"}}>All user</div> */}
                                            <div /*style={{marginTop: "35px"}}*/>
                                                {dataMember}
                                            </div>
                                        </div>
                                        {/* <div className="main-add-member main-border-left main-border-right" style={{float: "left", width: "50px", textAlign: "center"}}>
                                            <div style={{marginTop: "100px"}}>
                                                <button onClick={this.goRight} style={{background: "none"}}><i className="fa fa-angle-right" style={{fontSize: "18px"}}></i></button><br/>
                                                <button onClick={this.goLeft} style={{background: "none"}}><i className="fa fa-angle-left" style={{fontSize: "18px"}}></i></button>
                                            </div>
                                        </div> */}
                                        {/* <div className="main-add-member" style={{float: "left", width: "324px", overflowY: "scroll"}}>
                                            <div className="bold second-background-grs main-border-bottom" style={{padding: "10px", fontSize: "12px", width: "304px", position: "fixed"}}>Assigned</div>
                                            <div style={{marginTop: "35px"}}>
                                                {dataMemberAssigned} */}
                                                {/* {
                                                    (countData == 0) ? 
                                                    <div className="bold second-font-color" style={{fontSize: "11px", textAlign: "center", padding: "30px"}}>
                                                        this project<br/>not have a member
                                                    </div> 
                                                    : dataSelected
                                                } */}
                                            {/* </div> */}
                                        {/* </div> */}
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