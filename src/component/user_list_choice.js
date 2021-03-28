import React from 'react'
import ItemUserChoice from './item_user_choice'
import {getCookieUserId} from '../function/function'
import {ApiFetch} from './apiFetch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { Spinner } from './spinner'

class userListChoice extends React.Component{

    constructor(){
        super()
        this.state = {
            dataUser: [],
            userIdSelected:[]
        }

        this.baseLoader = React.createRef()
        this.baseDataSelect = React.createRef()
        this.select = this.select.bind(this)
        this.submit = this.submit.bind(this)
    }

    componentDidMount(){
        var userId = getCookieUserId();
        var form = new FormData()
        form.append('userId', userId)
        form.append('project_id', this.props.projectId)
        this.baseDataSelect.current.style.display = "none"

        ApiFetch("/team", {
            method: "POST",
            body: form
        }).then(res => res.json())
        .then((result) => {
            this.baseLoader.current.remove()
            this.baseDataSelect.current.style.display = "block"
            this.setState({
                dataUser: result
            })
        })
    }

    select(userId){
        let idx = this.state.userIdSelected.indexOf(userId)
        if(idx == -1){
            this.state.userIdSelected.push(userId)
        }else{
            this.state.userIdSelected.splice(idx, 1)
        }
    }

    submit(){
        let dataSubmit = []
        this.state.dataUser.map(dt => {
            if(this.state.userIdSelected.indexOf(dt.userId) != -1){
                dataSubmit.push(dt)
            }
        })

        this.props.submit(dataSubmit)
    }

    render(){

        const dataSelect = this.state.dataUser.map(dt => 
            <ItemUserChoice
                select={this.select} 
                userName={dt.userName}
                userId={dt.userId}
                userEmail={dt.mailUser}
                picProfile={dt.picProfile}
                userSelected={this.props.userSelected}/>
        )

        return(
            <div className="main-border" style={{width: "280px", background: "#FFF", position: "fixed", overflowY: "auto", zIndex: "1"}}>
                <div className='main-border-bottom bold' style={{padding: "10px", position: "fixed", width: "260px", background: "#FFF"}}>
                    Choose user
                    <a onClick={this.props.xSelected}><i style={{float: "right", marginRight: "3px", fontSize: "14px", color: "#CCC"}} class="fa fa-times"></i></a>
                </div>
                <div ref={this.baseLoader} style={{marginTop: "35px", opacity: "0.7"}}>
                    <Spinner size="20px"/>
                </div>
                <div ref={this.baseDataSelect} style={{marginTop: "35px"}}>
                    {
                        (this.state.dataUser.length > 0)
                        ?
                            dataSelect
                        :
                            <div className="second-font-color" style={{textAlign: "center", padding: "20px"}}>
                                <div style={{fontSize: "20px"}}><FontAwesomeIcon icon={faUsers}/></div>
                                <div style={{fontSize: "11px"}}>no data to display</div>
                            </div>
                    }
                </div>
                <div className="main-border-top" style={{padding: "10px", textAlign: "right"}}>
                    <button onClick={this.submit} className="btn-primary" style={{fontSize: "11px"}}>Submit</button>
                    &nbsp;&nbsp;
                    <button onClick={this.props.xSelected} className="btn-secondary" style={{fontSize: "11px"}}>Cancel</button>
                </div>
            </div>
        )
    }
}

export default userListChoice