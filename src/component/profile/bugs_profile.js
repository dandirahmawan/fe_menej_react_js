import React from 'react'
import RowBugs from './row_bugs_profile'
import { getCookieUserId, getCookieSessionId } from '../../function/function'
import {ApiFetch} from '../apiFetch'
import DetailModule from '../module/detail'

class bugs_profile extends React.Component{

    constructor(){
        super()
        this.state = {
            dataBugs:[],
            detailModule:""
        }
        this.hidePopUp = this.hidePopUp.bind(this)
        this.moduleClick = this.moduleClick.bind(this)
    }

    componentDidMount(){
        var form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())

        ApiFetch("/bugs_user",{
            method: "POST",
            body: form
        }).then(res => res.text())
        .then(result => {
            var jsonObject = JSON.parse(result)
            this.setState({
                dataBugs: jsonObject
            })
        })
    }

    moduleClick(e, moduleId){
        this.state.dataBugs.map(dt => {
            if(dt.modulId == moduleId){
                this.setState({
                    detailModule: <DetailModule 
                                        modulId={dt.modulId}
                                        projectId={dt.projectId}
                                        hide={this.hidePopUp}
                                        close={this.hidePopUp}
                                    />
                })
            }
        })
        e.stopPropagation()
    }

    hidePopUp(){
        this.setState({
            detailModule: ""
        })
    }

    render(){

        const data = this.state.dataBugs.map(dt => {
            return <RowBugs
                        note={dt.note}
                        module={dt.modulName}
                        projectName={dt.projectName}
                        moduleId={dt.modulId}
                        createDate={dt.createDate}
                        moduleClick={this.moduleClick}
                    />
        })

        return(
            <React.Fragment>
                {this.state.detailModule}
                <table style={{width: "80%"}}>
                    <thead>
                        <tr>
                            <th colSpan="2" className="main-border-right second-font-color bold">
                                Bugs
                            </th>
                            <th className="main-border-right second-font-color bold">
                                Project
                            </th>
                            <th className="main-border-right second-font-color bold">
                                Module
                            </th>
                            <th className="main-border-right second-font-color bold">
                                Created date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
            </React.Fragment>
           
        )
    }
}

export default bugs_profile