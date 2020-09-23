import React from 'react'
import DetailUser from './detail_user'
import {connect} from 'react-redux'
import {baseUrl} from '../../const/const'
import {ApiFetch} from '../apiFetch'
import {setTitleHader} from '../../redux/action'
import RowUser from './row_user'
import InviteUser from './invite_user'
import {getCookieSessionId, getCookieUserId, convertDate_dd_MMM_yyy} from '../../function/function'
import CardView from './card_view_user'
import DetailUserPopup from './detail_user_popup'
import PopupConfirmation from "../popup_confirmation"
import {faCalendarAlt, faUserAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

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

        this.sideBarListUser = React.createRef()
        this.baseUserDetail = React.createRef()
        this.rowClick = this.rowClick.bind(this)
        this.hideDetail = this.hideDetail.bind(this)
        this.inviteUser = this.inviteUser.bind(this)
        this.hidePopUp = this.hidePopUp.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
    }

    componentDidMount(){
        var form = new FormData();
        form.append("userId", getCookieUserId());

        ApiFetch("/user_relation", {
            method: "POST",
            body: form
        })
        .then(res => res.json())
        .then((result) => {
            this.setState({
                data: result
            })
        })

        let windowHeight = window.innerHeight
        let h = windowHeight - 60
        this.sideBarListUser.current.style.height = h+"px"

        let mainBase = document.getElementById("main-base-data")
        let mainBaseWidth = mainBase.offsetWidth
        let detailBaseWidth = mainBaseWidth - 266
        
        this.baseUserDetail.current.style.width = detailBaseWidth+"px"
        // var w = document.getElementById("main-base-data").offsetWidth
        // var hub = document.getElementById('header-user-base')
        // var w = w - 30
        // hub.style.width = w+"px"
        // var hmb = hub.children
        // var h = hmb[0].offsetHeight
        // document.getElementById('tbl-list-user').style.marginTop = parseInt(h)+"px"
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
            let picProfile = baseUrl+"/pic_profile/"+dt.picProfile
            if(dt.isDelete != "Y")
            {
                return <div className="main-border-bottom  tr-selectable" style={{padding: "5px", overflow: "hidden", marginRight: "5px", cursor: "pointer"}}>
                            <div style={{float: "left", width: "40px", height: "40px", background: "#CCC", borderRadius: "3px", overflow: "hidden"}}>
                                <div style={{background: "url("+picProfile+") no-repeat center", width: "40px", height: "40px", backgroundSize: "cover"}}/>
                            </div>
                            <div style={{float: "right", width: "200px", minHeight: "40px"}}>
                                <span className="bold" style={{fontSize: "14px"}}>
                                    {dt.userName}
                                </span>
                                <div className="second-font-color" style={{fontSize: "11px"}}>
                                    {dt.emailUser}
                                </div>
                                <div className="bold" style={{fontSize: "11px", color: "rgb(144 144 144)", marginTop: "5px"}}>
                                    <FontAwesomeIcon icon={faCalendarAlt}/>&nbsp;&nbsp;{convertDate_dd_MMM_yyy(dt.relateDate)} 
                                </div>
                            </div>
                        </div>
                // return <RowUser
                //         userName={dt.userName}
                //         emailUser={dt.emailUser}
                //         rowClick={this.rowClick}
                //         userId={dt.userId}
                //         picProfile={dt.picProfile}
                //         delete={this.deleteUser}
                //         countModule={dt.countModule}
                //         countBugs = {dt.countBugs}
                //         countDocFile = {dt.countDocFile}
                //     />
            }
        })

        // const dataCardView = this.state.data.map(dt => <CardView
        //                         // userName={dt.userName}
        //                         // emailUser={dt.emailUser}
        //                         // rowClick={this.rowClick}
        //                         // userId={dt.userId}
        //                     />)
        //
        // const styleUserItem = {
        //     width: "140px",
        //     height: '160px',
        //     marginTop:"10px",
        //     background: "#FFF",
        //     borderRadius: "5px",
        //     float: "left",
        //     marginRight: "10px",
        //     padding: "10px",
        // }

        return(
            <div id='main-base-data'>
                {this.state.popup}
                {/* <div id="header-user-base" style={{width: "100%", background: "#FFF", position: "fixed", top: "61px"}}>
                    <div className="main-border-bottom" style={{paddingTop: "20px", fontSize: "14px", paddingBottom: "15px", overflow: "hidden"}}>
                        <div style={{width: "80%", float: "left"}}>
                            <i class="fa fa-users" aria-hidden="true"></i> <span className="bold">List User</span>
                            <input placeholder="search user" type="text" style={{float: "right", padding: "5px", marginTop: "-5px", marginRight: "10px"}}></input>
                        </div>
                        <button onClick={this.inviteUser} className="bold main-font-color" style={{marginLeft: "50px", background: "none", float: "left"}}>
                            <i class="fa fa-plus"></i> Invite user
                        </button>
                    </div>
                </div> */}

                <div ref={this.sideBarListUser} 
                    className="main-border-right" 
                    style={{width: "270px", marginLeft: "-10px", background: "#FFF", position: "fixed", overflowY: "scroll"}}>
                    <div style={{padding: "10px"}}>
                        <div className="bold second-font-color" style={{fontSize: "12px"}}>
                            <FontAwesomeIcon icon={faUserAlt}/>&nbsp;List user</div>
                    </div>
                    {dataView}
                </div>
                <div ref={this.baseUserDetail} style={{float: "right"}}>
                    {/* <div id="header-dtl-usr" className="bold main-border-bottom" style={{padding: "10px", fontSize: "14px"}}>
                        Detail user
                    </div> */}
                    <div>
                        <div style={{width: "300px", margin: "auto", textAlign: "center", marginTop: "100px"}} 
                            className="second-font-color">
                            <FontAwesomeIcon style={{fontSize: "100px", color: "#CCC"}} icon={faUserAlt}/><br/>
                            <span style={{fontSize: "12px", }}>
                                Select user on list user to see detail user<br/>by 'click' the data
                            </span>
                        </div>
                    </div>
                </div>
                {this.state.detailUser}

                {/* <div id="tbl-list-user" style={{width: "80%", marginLeft: "250px"}}>
                    <table style={{width: "100%"}}>
                        <thead className="second-background-grs main-border-bottom">
                            <tr>
                                <td className="bold" colSpan="2" style={{paddingTop: "10px"}}>Name</td>
                                <td className="bold" style={{paddingTop: "10px"}}>Date</td>
                                <td className="bold" style={{paddingTop: "10px"}}>Moduled</td>
                                <td className="bold" style={{paddingTop: "10px"}}>Bugs</td>
                                <td className="bold" style={{paddingTop: "10px"}}>Doc File</td>
                                <td className="bold" style={{paddingTop: "10px"}}></td>
                            </tr>
                        </thead>
                        <tbody>
                            {dataView}
                        </tbody>
                    </table>
                </div> */}\
                
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