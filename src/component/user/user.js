import React from 'react'
import DetailUser from './detail_user'
import {connect} from 'react-redux'
import {baseUrl} from '../../const/const'
import {setTitleHader} from '../../redux/action'
import RowUser from './row_user'
import InviteUser from './invite_user'
import { getCookieUserId } from '../../function/function'
import CardView from './card_view_user'
import DetailUserPopup from './detail_user_popup'

class user extends React.Component{

    constructor(){
        super()
        this.refTable= React.createRef
        this.state = {
            data:[],
            detailUser:"",
            widthBaseUser: "",
            popup:""
        }

        this.rowClick = this.rowClick.bind(this)
        this.hideDetail = this.hideDetail.bind(this)
        this.inviteUser = this.inviteUser.bind(this)
        this.hidePopUp = this.hidePopUp.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
    }

    componentDidMount(){
        var form = new FormData();
        form.append("userId", getCookieUserId());
        fetch(baseUrl+"/user_relation", {
            method: "POST",
            body: form
        })
        .then(res => res.json())
        .then((result) => {
            this.setState({
                data: result
            })
        })

        var w = document.getElementById("main-base-data").offsetWidth
        var hub = document.getElementById('header-user-base')
        var w = w - 30
        hub.style.width = w+"px"
        var hmb = hub.children
        var h = hmb[0].offsetHeight
        document.getElementById('tbl-list-user').style.marginTop = parseInt(h) + 10+"px"
    }

    rowClick(userId){
        var tbl = document.getElementById("tbl-list-user")
        // tbl.style.width = "65%"
        this.state.data.map(dt => {
            if(dt.userId == userId){
                this.setState({
                    // detailUser: <DetailUser 
                    //                 userName={userName}
                    //                 emailUser={emailUser}
                    //                 hideDetail={this.hideDetail}
                    //                 userId={userId}
                    //             />
                    detailUser: <DetailUserPopup
                                    userName={dt.userName}
                                    emailUser={dt.emailUser}
                                    relateDate={dt.relateDate}
                                    picProfileDetail={dt.picProfileDetail}
                                    hideDetail={this.hideDetail}
                                    userId={dt.userId}
                                    hide={this.hideDetail}
                                    deleteUser={this.deleteUser}
                                />
                })
            }
        })
    }

    hideDetail(){
        var tbl = document.getElementById("tbl-list-user")
        tbl.style.width = "80%"
        this.setState({
            detailUser: ""
        })
    }

    inviteUser(){
        this.setState({
            popup: <InviteUser hidePopUp={this.hidePopUp}/>
        })
    }

    hidePopUp(){
        this.setState({
            popup: ""
        })
    }

    deleteUser(userId){
       const newUserData = this.state.data.map(dt => {
           if(dt.userId == userId){
               dt.isDelete = "Y"
           }
           return dt
       })

       this.setState({
           data: newUserData,
           detailUser: ""
       })
    }

    render(){

        const dataView = this.state.data.map(dt => {
            if(dt.isDelete != "Y")
            {
                return <RowUser
                        userName={dt.userName}
                        emailUser={dt.emailUser}
                        rowClick={this.rowClick}
                        userId={dt.userId}
                        picProfile={dt.picProfile}
                    />
            }
        })

        const dataCardView = this.state.data.map(dt => <CardView
                                // userName={dt.userName}
                                // emailUser={dt.emailUser}
                                // rowClick={this.rowClick}
                                // userId={dt.userId}
                            />)
        
        const styleUserItem = {
            width: "140px", 
            height: '160px', 
            marginTop:"10px", 
            background: "#FFF", 
            borderRadius: "5px", 
            float: "left", 
            marginRight: "10px", 
            padding: "10px",
        }

        const stylePicProfileList = {width: "60px", height: "60px", margin: "auto", marginTop: "20px", textAlign: "center", padding: "20px", background: "#eaeaea", border: "1px solid #CCC", borderRadius: "10px"}
        return(
            <div id='main-base-data'>
                {this.state.popup}
                <div id="header-user-base" style={{position: "fixed", width: "100%", background: "#FFF", marginTop: "1px"}}>
                    <div className="main-border-bottom" style={{paddingTop: "20px", fontSize: "14px", paddingBottom: "15px", overflow: "hidden"}}>
                        <div style={{width: "80%", float: "left"}}>
                            <i class="fa fa-users" aria-hidden="true"></i> <span className="bold">List User</span>
                            <input placeholder="search user" type="text" style={{float: "right", padding: "5px", marginTop: "-5px", marginRight: "10px"}}></input>
                        </div>
                        <button onClick={this.inviteUser} className="bold main-font-color" style={{marginLeft: "50px", background: "none", float: "left"}}>
                            <i class="fa fa-plus"></i> Invite user
                        </button>
                    </div>
                </div>

                {this.state.detailUser}

                <div id="tbl-list-user" style={{width: "80%"}}>
                    <table style={{width: "100%", marginTop: "-10px"}}>
                        <thead>
                            <tr>
                                <th className="bold" colSpan="2" style={{paddingTop: "10px"}}>Name</th>
                                <th className="bold" style={{paddingTop: "10px"}}>Date</th>
                                <th className="bold" style={{paddingTop: "10px"}}>Moduled</th>
                                <th className="bold" style={{paddingTop: "10px"}}>Bugs</th>
                                <th className="bold" style={{paddingTop: "10px"}}>Doc File</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataView}
                        </tbody>
                    </table>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        title : state.title
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setTitle : dispatch(setTitleHader("User"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (user)