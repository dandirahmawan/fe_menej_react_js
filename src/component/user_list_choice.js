import React from 'react'
import ItemUserChoice from './item_user_choice'
import {baseUrl} from '../const/const'
import {getCookieUserId} from '../function/function'
import {ApiFetch} from './apiFetch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { Spinner } from './spinner'

class userListChoice extends React.Component{

    constructor(){
        super()
        this.state = {
            dataUser: []
        }

        this.baseLoader = React.createRef()
        this.baseDataSelect = React.createRef()
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

    render(){

        const dataSelect = this.state.dataUser.map(dt => 
            <ItemUserChoice 
                userName={dt.userName}
                userId={dt.userId}
                userEmail={dt.mailUser}
                picProfile={dt.picProfile}
                userSelected={this.props.userSelected}/>
        )

        return(
            <div className="main-border" style={{width: "280px", height: "250px", background: "#FFF", position: "fixed", overflowY: "scroll"}}>
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
                            <div className="second-font-color" style={{textAlign: "center", marginTop: "60px"}}>
                                <div style={{fontSize: "20px"}}><FontAwesomeIcon icon={faUsers}/></div>
                                <div style={{fontSize: "11px"}}>no data to display</div>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

export default userListChoice