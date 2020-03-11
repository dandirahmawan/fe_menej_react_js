import React from 'react'
import ItemUserChoice from './item_user_choice'
import {baseUrl} from '../const/const'
import {getCookieUserId} from '../function/function'

class userListChoice extends React.Component{

    constructor(){
        super()
        this.state = {
            dataUser:[]
        }
    }

    componentDidMount(){
        var userId = getCookieUserId();
        var form = new FormData()
        form.append('userId', userId)
        form.append('project_id', this.props.projectId)
        
        fetch(baseUrl+"/team", {
            method: "POST",
            body: form
        }).then(res => res.json())
        .then((result) => {
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
            <div className="main-border" style={{width: "280px", height: "250px", background: "#FFF", position: "fixed", borderRadius: "4px", overflowY: "scroll"}}>
                <div className='main-border-bottom bold' style={{padding: "10px", position: "fixed", width: "260px", background: "#FFF"}}>
                    Choose user
                    <a onClick={this.props.xSelected}><i style={{float: "right", marginRight: "3px", fontSize: "14px", color: "#CCC"}} class="fa fa-times"></i></a>
                </div>
                <div style={{marginTop: "35px"}}>
                    {dataSelect}
                </div>
            </div>
        )
    }
}

export default userListChoice