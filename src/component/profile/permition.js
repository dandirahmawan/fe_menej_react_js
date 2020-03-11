import React from 'react'
import {baseUrl} from '../../const/const'
import PermitionList from './permitionList'
import { getCookieUserId } from '../../function/function'

class permition extends React.Component{

    constructor(){
        super()
        this.state = {
            permitionData : [],
            permitionCode: []
        }
    }

    componentDidMount(){
        var form = new FormData()
        form.append("userId", getCookieUserId())
        fetch(baseUrl+"/list_permition_profile",{
            method: "POST",
            body: form
        }).then(res => res.text())
        .then(result => {
            var jsonObject = JSON.parse(result)
            this.setState({
                permitionData : jsonObject[0].permitionProfile,
                permitionCode: jsonObject[0].permitionCode
            })
        })
    }

    render(){

        const data = this.state.permitionData.map(dt => {
            return <PermitionList
                        projectName={dt.projectName}
                        permitionCode={this.state.permitionCode}
                        permitionList={dt.listPermition}
                        pic={dt.pic}
                        picName={dt.picName}
                    />
        })

        return(
            <React.Fragment>
                {data}
            </React.Fragment>
        )
    }
}

export default permition