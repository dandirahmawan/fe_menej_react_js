import React from 'react'
import {connect} from 'react-redux'
import {baseUrl} from '../../const/const'
import {ApiFetch} from '../apiFetch'
import {setTitleHader} from '../../redux/action'
import InviteUser from './invite_user'
import {getCookieSessionId, getCookieUserId, convertDate_dd_MMM_yyy} from '../../function/function'
import DetailUser from './detail_user'
import {faCalendarAlt, faUserAlt, faPlus, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
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

        this.infoDetail = React.createRef()
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
        let detailBaseWidth = mainBaseWidth - 245
        
        this.baseUserDetail.current.style.width = detailBaseWidth+"px"
        this.baseUserDetail.current.style.height = h+"px"
        this.baseUserDetail.current.style.background = "rgb(230 230 230)"
        this.baseUserDetail.current.style.marginRight = "-10px"
    }

    rowClick(userId){
        this.state.data.map(dt => {
            if(dt.userId == userId){
                this.setState({
                    detailUser: <DetailUser
                                    userName={dt.userName}
                                    emailUser={dt.emailUser}
                                    relateDate={dt.relateDate}
                                    isInvited={dt.isInvited}
                                    isRelated={dt.isRelated}
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
                return <div onClick={() => this.rowClick(dt.userId)} className="main-border-bottom  tr-selectable" style={{padding: "5px", overflow: "hidden", marginRight: "5px", cursor: "pointer"}}>
                            <div style={{float: "left", width: "40px", height: "40px", background: "#CCC", borderRadius: "3px", overflow: "hidden", textAlign: "center"}}>
                                {
                                    (dt.picProfile != "" && dt.picProfile != null)
                                    ?
                                        <div style={{background: "url("+picProfile+") no-repeat center", width: "40px", height: "40px", backgroundSize: "cover"}}/>
                                    :
                                        <FontAwesomeIcon className="second-font-color" style={{fontSize: "30px", marginTop: "5px"}} icon={faUserAlt}/>
                                }
                                
                            </div>
                            <div style={{float: "right", width: "195px", minHeight: "40px"}}>
                                <span className="bold" style={{fontSize: "14px"}}>
                                    {dt.userName}
                                </span>
                                <div className="second-font-color" style={{fontSize: "11px"}}>
                                    {dt.emailUser}
                                </div>
                                <div className="bold" style={{fontSize: "11px", color: "rgb(144 144 144)", marginTop: "5px"}}>
                                    {
                                        (dt.relateDate != null)
                                        ?
                                            <React.Fragment>
                                                <FontAwesomeIcon icon={faCalendarAlt}/>&nbsp;&nbsp;{convertDate_dd_MMM_yyy(dt.relateDate)}
                                            </React.Fragment>
                                        : 
                                            <span className="main-font-color">
                                                <FontAwesomeIcon icon={faInfoCircle}/> Related by project
                                            </span> 
                                    }
                                </div>
                            </div>
                        </div>
            }
        })

        return(
            <div id='main-base-data'>
                {this.state.popup}

                <div ref={this.sideBarListUser} 
                    className="main-border-right scrollbar-white-bck" 
                    style={{width: "280px", marginLeft: "-20px", background: "#FFF", position: "fixed", overflowY: "scroll"}}>
                    <div className="main-border-bottom" 
                        style={{padding: "10px", 
                                paddingLeft: "15px", 
                                paddingRight: "5px",
                                position: "fixed", 
                                width: "250px",
                                background: "#FFF",
                                overflow: "hidden"}}>
                        <div className="bold second-font-color" style={{fontSize: "12px", float: "left"}}>
                            <FontAwesomeIcon icon={faUserAlt}/>&nbsp;List user
                        </div>
                        <button onClick={this.inviteUser} className="second-font-color main-border-left" 
                            style={{float: "right", background: "none", marginTop: "-2px"}}>
                            <FontAwesomeIcon style={{fontSize: "13px"}} icon={faPlus}/> <span style={{fontSize: "12px"}}>Invite</span>
                        </button>
                    </div>
                    <div id="base-dt-lst-usr" style={{paddingLeft: "10px", marginTop: "40px"}}>
                        {
                            (dataView.length > 0)
                            ?
                                dataView
                            :
                                <div className="second-font-color" style={{textAlign: "center", fontSize: "12px", padding: "20px"}}>
                                    <FontAwesomeIcon icon={faUserAlt} style={{fontSize: "20px"}}/><br/>
                                    <span className="bold">No data to display</span>
                                    <div style={{fontSize: "11px"}}>You can invite someone to colaborate with you in menej</div>
                                    <button className="btn-primary" style={{fontSize: "10px", width: "50px", marginTop: "10px"}}>+ Invite</button>
                                </div>
                        }
                    </div>
                    
                </div>

                <div ref={this.baseUserDetail} style={{float: "right", overflowY: "scroll"}}>
                    {
                        (this.state.detailUser == "")
                        ?
                            <div ref={this.infoDetail}>
                                <div style={{width: "300px", margin: "auto", textAlign: "center", marginTop: "100px"}} 
                                    className="second-font-color">
                                    <FontAwesomeIcon style={{fontSize: "100px", color: "#CCC"}} icon={faUserAlt}/><br/>
                                    <span style={{fontSize: "12px", }}>
                                        Select user on list user to see detail user<br/>by 'click' the data
                                    </span>
                                </div>
                            </div>
                        : ""
                    }

                    {this.state.detailUser}
                
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