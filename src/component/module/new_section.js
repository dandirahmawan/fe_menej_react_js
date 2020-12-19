import React, { Component, createRef, Fragment } from 'react'
import { connect } from 'react-redux'
import {popCenterPosition, popUpAlert} from '../../function/function'
import { setDataModule, setSectionModule } from '../../redux/action'
import { ApiFetch } from '../apiFetch'

class new_section extends Component{

    constructor(){
        super()
        this.inputSection = createRef()
        this.submit = this.submit.bind(this)
    }

    componentDidMount(){
        popCenterPosition("bs-new-section")
    }

    submit(){
        let val = this.inputSection.current.value
        if(val == 0){
            popUpAlert("Section name is empty")
        }else{
            let form = new FormData()
            form.append("section", val)
            form.append("projectId", this.props.projectId)
            ApiFetch("/section", {
                method: "POST",
                body: form
            }).then(res => res.json()).then(result => {
                let sections = result.sections
                let section = result.section
                section.sectionModule = []
                this.props.dataModule.push(section)

                let newSection= []
                this.props.dataModule.map(dt => {
                    newSection.push(dt)
                })
                
                
                this.props.setDataModule(newSection)
                this.props.setSection(sections)
                this.props.cancel()
            })
        }
    }

    render(){
        return(
            <Fragment>
                <div className="block"></div>
                <div id="bs-new-section" 
                    className="main-border pop" 
                    style={{width: "250px", background: "#FFF"}}>

                    <div className="bold" style={{padding: "10px", fontSize: "14px"}}>
                        New Section
                    </div>
                    <div style={{padding: "10px", paddingTop: "0px"}}>
                        <input ref={this.inputSection}  
                            type="text" 
                            placeholder="section name" 
                            style={{padding: "8px", width: "100%", boxSizing: "border-box"}}/>
                    </div>
                    <div className="main-border-top" style={{padding: "10px", textAlign: "right"}}>
                        <button onClick={this.submit} className="btn-primary" style={{fontSize: "11px"}}>Submit</button>
                        &nbsp;&nbsp;
                        <button onClick={this.props.cancel} className="btn-secondary" style={{fontSize: "11px"}}>Cancel</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setSection : (data) => dispatch(setSectionModule(data)),
        setDataModule : (data) => dispatch(setDataModule(data)) 
    }
}

const mapStateToProps = state => {
    return{
        dataModule : state.dataModule
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (new_section)