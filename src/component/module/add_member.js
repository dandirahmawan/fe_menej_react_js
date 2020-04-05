import React from 'react'
import { baseUrl } from '../../const/const'
import { getCookieUserId, getCookieSessionId, popUpAlert } from '../../function/function'
import ItemUserAddMember from '../item_user_add_member'
import ItemUserAddMemberSelected from '../item_user_add_member_selected'
import ReactDom from 'react-dom'
import {SpinnerButton} from "../spinner";

class add_member extends React.Component{

    constructor(){
        super()
        this.state = {
            addMemberData : [],
            addMemberDataSelected: [],
            listRemovMember:[]
        }

        this.checkAddMember = this.checkAddMember.bind(this)
        this.commitAddMember = this.commitAddMember.bind(this)
        this.goRight = this.goRight.bind(this)
        this.checkRemoveMember = this.checkRemoveMember.bind(this)
        this.goLeft = this.goLeft.bind(this)
    }

    componentDidMount(){
        var hdr = document.getElementById("header-add-member")
        var ftr = document.getElementById("footer-add-member")

        var mam = document.getElementsByClassName("main-add-member")
        for(var i = 0;i<mam.length;i++){
            mam[i].style.height = 350 - (parseInt(hdr.offsetHeight) + ftr.offsetHeight)+"px"
        }

        var elm = document.getElementById("base-add-member")
        var h = elm.offsetHeight
        var w = elm.offsetWidth
        var top = (window.innerHeight - h) / 2 
        var left = (window.innerWidth - w) / 2
        
        elm.style.top = top+"px"
        elm.style.left = left+"px"

        var form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        fetch(baseUrl+"/add_member", {
            method: "POST",
            body: form
        }).then(rst => rst.json())
        .then(result => {
            for(var i = 0;i<result.length;i++){
                result[i].isChecked = ""
            }
            this.setState({
                addMemberData: result
            })
        })
    }

    checkAddMember(userId){
        this.setState(prev => {
            const newData = prev.addMemberData.map(dt => {
                if(dt.userId == userId){
                    if(dt.isChecked == 'Y'){
                        dt.isChecked = ""
                    }else{
                        dt.isChecked = "Y"
                    }
                }
                return dt
            })

            return{
                addMemberData: newData
            }
        })
    }

    checkRemoveMember(userId){
        this.setState(prev => {
            const newData = prev.addMemberDataSelected.map(data => {
                if(data.userId == userId){
                    if(data.isChecked == 'Y'){
                        data.isChecked = ""
                        var idx = this.state.listRemovMember.indexOf(data)
                        this.state.listRemovMember.splice(idx, 1)
                    }else{
                        data.isChecked = "Y"
                        var idx = this.state.listRemovMember.indexOf(data)
                        if(idx < 0){
                            this.state.listRemovMember.push(data)
                        }
                    }
                }
                return data
            })

            return{
                addMemberDataSelected: newData
            }
        })
    }

    goRight(){
        var arrSelected = this.state.addMemberDataSelected
        this.state.addMemberData.map(dt => {
            if(dt.isChecked == 'Y'){
                dt.isChecked = ""
                var idx = arrSelected.indexOf(dt)
                if(idx < 0) arrSelected.push(dt)
            }
        })
        
        this.setState({
            addMemberDataSelected: arrSelected
        })

    }

    goLeft(){
        this.state.listRemovMember.map(dt => {
            var idx = this.state.addMemberDataSelected.indexOf(dt)
            this.state.addMemberDataSelected.splice(idx, 1)
            dt.isChecked = ""
            this.setState({
                addMemberDataSelected: this.state.addMemberDataSelected
            })
        })

        this.setState({
            listRemovMember: []
        })
    }

    commitAddMember(e){
        var listUserId = []
        var form = new FormData()
        this.state.addMemberDataSelected.map(dt => {
           listUserId.push(dt.userId)    
        })

        if(listUserId.length > 0){
            let t = e.target
            t.style.opacity = 0.5
            ReactDom.render(<SpinnerButton size="15px"/>, t)

            form.append("userIdList", listUserId)
            form.append("userId", getCookieUserId())
            form.append("sessionId", getCookieSessionId())
            form.append("projectId", this.props.projectId)
            fetch(baseUrl+"/commit_add_member", {
                method: "POST",
                body: form
            }).then(res => res.json())
            .then(result => {
                this.props.refresh(result, listUserId)
                ReactDom.render("Add", t)
                t.style.opacity = 1
                // popUpAlert("Member team succesfully update", "success")
            })
        }else{
            popUpAlert("No user selected", "warning")
        }
    }

    render(){

        const dataSelect = this.state.addMemberData.map(dt => <ItemUserAddMember
                                                                checkAddMember={this.checkAddMember} 
                                                                userName= {dt.userName}
                                                                userId={dt.userId}
                                                                userEmail={dt.emailUser}
                                                                picProfile={dt.picProfile}
                                                                userSelected={dt.isChecked}/>)

        
        const dataSelected = this.state.addMemberDataSelected.map(dt => <ItemUserAddMemberSelected
                                                                            checkRemoveMember={this.checkRemoveMember} 
                                                                            userName= {dt.userName}
                                                                            userId={dt.userId}
                                                                            userEmail={dt.emailUser}
                                                                            picProfile={dt.picProfile}
                                                                            userSelected={dt.isChecked}/>)

        return(
            <React.Fragment>
                <div className="block"></div>
                <div id='base-add-member' style={{background: "#FFF", position: "fixed", zIndex: "1000", borderRadius: "3px"}}>
                    <div id="main-base-add-member" style={{width: "700px", height: "350px"}}>
                        <div id="header-add-member" className="bold main-border-bottom" style={{padding: "10px", fontSize: "14px"}}>
                            Add member
                        </div>
                        <div className="main-add-member">
                            {/* <Spinner size="20px"/> */}
                            <div className="main-add-member" style={{float: "left", width: "324px", overflowY: "scroll"}}>
                                {dataSelect}
                            </div>
                            <div className="main-add-member main-border-left main-border-right" style={{float: "left", width: "50px", textAlign: "center"}}>
                                <div style={{marginTop: "100px"}}>
                                    <button onClick={this.goRight} style={{background: "none"}}><i className="fa fa-angle-right" style={{fontSize: "18px"}}></i></button><br/>
                                    <button onClick={this.goLeft} style={{background: "none"}}><i className="fa fa-angle-left" style={{fontSize: "18px"}}></i></button>
                                </div>
                            </div>
                            <div className="main-add-member" style={{float: "left", width: "324px", overflowY: "scroll"}}>
                                {
                                    dataSelected == "" ? 
                                    <div style={{fontSize: "12px", textAlign: "center", padding: "10px"}}>No data selected</div> 
                                    : dataSelected
                                }
                            </div>
                        </div>
                        <div id="footer-add-member" className="main-border-top" style={{padding: "10px", textAlign: "right", height: "27px"}}>
                            <button onClick={this.commitAddMember} className="btn-primary" style={{fontSize: "12px"}}>Add</button>
                            <button onClick={this.props.cancel} style={{fontSize: "12px", marginLeft: "5px", background: "none"}}>Cancel</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default add_member