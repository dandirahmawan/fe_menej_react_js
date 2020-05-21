import React from 'react'
import Triangle from '../../../images/triangle.png'
import Item from './item_base_select_user_privacy'
import {baseUrl} from "../../../const/const";
import {getCookieSessionId, getCookieUserId, popUpAlert} from "../../../function/function";

class base_select_user_privacy extends React.Component{

    constructor(){
        super()
        this.state = {
            userSelected: [],
            dataUserPrivacy: []
        }
        this.cancel = this.cancel.bind(this)
        this.select = this.select.bind(this)
        this.submit = this.submit.bind(this)
    }

    componentDidMount(){
        let form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("tabId", this.props.tabId)

        fetch(baseUrl+"/get_user_privacy", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            let arr = result.split(",")
            const data = this.props.data.map(dt => {
                let idx = arr.indexOf(dt.userId.toString())
                if(idx != -1){
                    dt.isSelected = true
                    this.state.userSelected.push(dt.userId)
                }else{
                    dt.isSelected = false
                }
                return dt
            })

            this.setState({
                dataUserPrivacy: data
            })
        })
    }

    cancel(){
        this.props.cancel()
    }

    select(userId){
        let idx = this.state.userSelected.indexOf(userId)
        if(idx == -1){
            this.state.userSelected.push(userId)
        }else{
            this.state.userSelected.splice(idx, 1)
        }
    }

    submit(){
        let dataLength = this.state.userSelected.length
        if(dataLength < 1){
            popUpAlert("No user selected")
        }else{
            this.props.submit(this.state.userSelected)
        }
    }

    render(){

        const item = this.state.dataUserPrivacy.map(dt => {
            return <Item userName={dt.userName}
                         emailUser={dt.emailUser}
                         userId={dt.userId}
                         isSelected={dt.isSelected}
                         select={this.select}/>
        })

        return(
            <div className="main-border"
                 style={{background: "#FFF", position: "absolute", marginTop: "-5px",
                     marginLeft: "97px", minHeight: "100px", width: "250px", zIndex: "1"}}>
                 <img src={Triangle}
                      style={{height: "12px", transform: "rotate(-90deg)",
                          position: "absolute", marginLeft: "-11px", marginTop: "10px"}}/>
                <div>
                    <div className="bold main-border-bottom" style={{fontSize: "12px", padding: "10px"}}>
                        Select user
                    </div>
                    <div style={{overflowY: "scroll", maxHeight: "200px"}}>
                        {item}
                    </div>
                </div>
                <div className="main-border-top" style={{padding: "10px", textAlign: "right"}}>
                    <button onClick={this.submit} className="btn-primary" style={{fontSize: "10px", marginRight: '10px'}}>Ok</button>
                    <button onClick={this.cancel} className="btn-secondary" style={{fontSize: "10px"}}>Cancel</button>
                </div>
            </div>
        )
    }
}

export default base_select_user_privacy