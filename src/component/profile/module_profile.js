import React from 'react'
import {ApiFetch} from '../apiFetch'
import { getCookieUserId, getCookieSessionId } from '../../function/function';
import RowModule from './row_module_profile'
import DetailModule from '../module/detail'
import {Spinner} from '../spinner'

class module_profile extends React.Component{
    
    constructor(){
        super()
        this.state = {
            dataModule: [],
            detailModule:"",
            loader:""
        }
        this.rowClick=this.rowClick.bind(this)
        this.hidePopUp=this.hidePopUp.bind(this)
        this.rowClickBugs=this.rowClickBugs.bind(this)
        this.rowClickDocFile=this.rowClickDocFile.bind(this)
    }

    componentDidMount(){
        this.setState({
            loader: <Spinner textLoader="Load data.." size="20px"/>
        })

        var formData = new FormData();
        formData.append("userId", getCookieUserId())
        formData.append("sessionId", getCookieSessionId())
        ApiFetch("/module_user", {
            method : "POST",
            body: formData
        }).then(res => res.json())
        .then((result) => {
            this.setState({
                dataModule: result,
                loader: ""
            })
        })
    }

    rowClick(moduleId){
        this.state.dataModule.map(dt => {
            if(dt.modulId == moduleId){
                this.setState({
                    detailModule: <DetailModule 
                                        modulId={moduleId}
                                        projectId={dt.projectId}
                                        hide={this.hidePopUp}
                                        close={this.hidePopUp}
                                    />
                })
            }
        })
    }

    rowClickBugs(e, moduleId){
        this.state.dataModule.map(dt => {
            if(dt.modulId == moduleId){
                this.setState({
                    detailModule: <DetailModule 
                                        modulId={moduleId}
                                        projectId={dt.projectId}
                                        hide={this.hidePopUp}
                                        close={this.hidePopUp}
                                        tabParameter="bugs"
                                    />
                })
            }
        })
        e.stopPropagation()
    }

    rowClickDocFile(e, moduleId){
        this.state.dataModule.map(dt => {
            if(dt.modulId == moduleId){
                this.setState({
                    detailModule: <DetailModule 
                                        modulId={moduleId}
                                        projectId={dt.projectId}
                                        hide={this.hidePopUp}
                                        close={this.hidePopUp}
                                        tabParameter="doc_file"
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
        
        const data = this.state.dataModule.map(dt => {
            return <RowModule
                        moduleId={dt.modulId}
                        moduleName={dt.modulName}
                        projectName={dt.projectName}
                        dueDate={dt.endDate}
                        status={dt.modulStatus}
                        countBugs={dt.countBugs}
                        countDocFile={dt.countDoc}
                        rowClick={this.rowClick}
                        bugsClick={this.rowClickBugs}
                        docFileClick={this.rowClickDocFile}
                    />
        })

        return(
            <React.Fragment>
                {this.state.loader}
                {this.state.detailModule}
                <table style={{width: "80%", marginTop: "10px"}}>
                    <thead>
                        <tr>
                            <th colSpan="2" style={{width: "400px"}} className="main-border-right second-font-color bold">Module</th>
                            <th style={{width: "150px"}} className="main-border-right second-font-color bold">Project</th>
                            <th className="main-border-right second-font-color bold">Due date</th>
                            <th className="main-border-right second-font-color bold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (data == "") 
                            ? 
                                <tr><td colSpan="5" className="bold font-second-color" style={{paddingTop: "20px",paddingBottom:"30px", fontSize: "14px", textAlign: "center", color: "#a2a2a2"}}><span style={{fontSize: "16px"}}><i class="fa fa-exclamation-triangle"></i></span><br></br>No data to display</td></tr> 
                            : 
                                data
                        }
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

export default module_profile