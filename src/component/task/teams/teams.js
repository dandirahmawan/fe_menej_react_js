import { faPlus, faTimes, faTrashAlt, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Fragment } from 'react'
import { connect } from 'react-redux'
import AddMember from '../add_member'
import TeamDetail from './teams_detail'
import Confirmation from '../../popup_confirmation'
import { ApiFetch } from '../../apiFetch'
import {setDataTeam} from '../../../redux/action'

class Teams extends React.Component {

    /*initation*/
    state = {
        addMemberBse: ""
    }

    /*reference element*/
    refBase = React.createRef()
    
    /*binding function*/
    add = this.add.bind(this)
    hideAddMember = this.hideAddMember.bind(this)
    selectUser = this.selectUser.bind(this)
    hideDetail = this.hideDetail.bind(this)
    delete = this.delete.bind(this)
    refresDataTeam = this.refresDataTeam.bind(this)
    handleClickOutside = this.handleClickOutside.bind(this)

    componentDidMount(){
        document.addEventListener("click", (e) => this.handleClickOutside(e))
    }

    handleClickOutside(event) {
        if (this.refBase.current && !this.refBase.current.contains(event.target)) {
            if(this.state.addMemberBse == "" || this.state.addMemberBse == null){
                this.props.hidePopUp()
            }
        }
    }

    /*function start here*/
    add(){
        this.setState({
            addMemberBse: <AddMember projectId={this.props.projectId} 
                                    dataTeam={this.props.dataTeam} 
                                    hide={this.hideAddMember}/>
        })
    }
    
    hideAddMember() {
        this.hideDetail()
    }

    selectUser(userId, projectId){
        this.setState({
            addMemberBse: <TeamDetail userId={userId} projectId={projectId} hide={this.hideDetail}/>
        })
    }

    hideDetail() {
        /*set time out untuk
        membuat action berjalan 
        setelah handleclickoutsisd*/
        setTimeout(() => {
            this.setState({
                addMemberBse: ""
            })
        }, 1);
    }

    delete(e, dt){
        let userName = dt.userName
        let userId = dt.userId
        let projectId = dt.projectId
        let txt = "Are you sure you want delete <span class='bold'>"+userName+"</span> as member team in this project"
        
        e.stopPropagation()
        this.setState({
            addMemberBse: <Confirmation titleConfirmation="Delete member"
                                        textPopup={txt}
                                        yesAction={() => this.confirmDelete(userId, projectId)}
                                        hidePopUp={() => {this.setState({addMemberBse: ""})}}/>
        })
    }

    confirmDelete(userId, projectId){
        let newData = [...this.props.dataTeam]
        let i = 0;
        newData.map(dt => {
            if(dt.userId == userId){
                newData.splice(i, 1)
                this.props.setDataTeam(newData)
            }
            i++
        })

        let form = new FormData
        form.append("userDelete", userId)
        form.append("projectId", projectId)
        ApiFetch("/member/delete_member", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == "success"){
                this.refresDataTeam(userId)
            }

            /*remove popup delete*/
            this.setState({
                addMemberBse: ""
            })
        })
    }

    refresDataTeam(userId){
        let newData = [...this.props.dataTeam]
        let i = 0;
        newData.map(dt => {
            if(dt.userId == userId){
                newData.splice(i, 1)
                this.props.setDataTeam(newData)
            }
            i++
        })
    }

    render(){

        const dataTeam = this.props.dataTeam.map(dt => {
            return <a key={dt.userId} style={{textDecoration: "none"}} onClick={() => this.selectUser(dt.userId, dt.projectId)}>
                        <div className="main-border-bottom mn-tsk-main" 
                            style={{display: "flex", 
                                    cursor: "pointer", 
                                    padding: "15px", 
                                    paddingTop: "10px", 
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingBottom: "10px"}}>
                            
                            <div style={{display: "flex"}}>
                                <div style={{width: "30px", height: "30px", background: "#CCC", borderRadius: "100%"}}></div>
                                <div style={{marginLeft: "7px"}}>
                                    <div className="bold main-font-size">{dt.userName}</div>
                                    <div className="second-font-color" style={{fontSize: "11px"}}>
                                        {dt.emailUser}
                                    </div>
                                </div>
                            </div>
                            <button onClick={(e) => this.delete(e, dt)} style={{background: "none"}}>
                                <FontAwesomeIcon className="second-font-color" icon={faTrashAlt}/>
                            </button>
                        </div>
                    </a>
        })

        return(
            <Fragment>
                <div ref={this.refBase} className="main-border shadow" style={styles.bsTeams}>
                    {this.state.addMemberBse}
                    <div className="main-border-bottom" 
                        style={{background: "rgb(245, 245, 245)", 
                                padding: "15px", 
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "space-between"}}>
                        <div>
                            <FontAwesomeIcon icon={faUsers}/>&nbsp;
                            <span className="bold" style={{fontSize: "14px"}}>Teams</span>
                        </div>
                        <div style={{display: "flex"}}>
                            <button onClick={this.add} 
                                id="add-mbr" 
                                className="btn-primary" 
                                style={{padding: "2px", minWidth: "20px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <FontAwesomeIcon style={{width: "8px"}} icon={faPlus}/>
                            </button>
                            &nbsp;&nbsp;
                            <button onClick={this.props.hidePopUp} 
                                    className="btn-secondary" 
                                    style={{padding: "2px", minWidth: "20px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <FontAwesomeIcon className="second-font-color" style={{width: "8px"}} icon={faTimes}/>
                            </button>
                        </div>
                    </div>
                    <div style={{maxHeight: "350px", overflowY: "scroll"}}>
                        {dataTeam}
                    </div>
                </div>
            </Fragment>
        )
    }
}
    
const styles = {
    bsTeams: {
        background: "#FFF",
        position: "absolute",
        width: "280px",
        marginLeft: "-95px",
        marginTop: "5px"
    }
}

const mapStateToProps = state => {
    return{
        dataTeam : state.dataTeam
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setDataTeam : (data) => dispatch(setDataTeam(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Teams)