import React, { Component, createRef, Fragment } from 'react'
import { connect } from 'react-redux'
import {popCenterPosition, popUpAlert} from '../../function/function'
import { setDataModule, setSectionModule } from '../../redux/action'
import Fetch from '../../function/fetchApi'

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
            // let form = new FormData()
            // form.append("section", val)
            // form.append("projectId", this.props.projectId)

            let param = {}
            param.projectId = this.props.projectId
            param.section = val
            
            new Fetch().postGolang("/section", param).then(result => {
                try{
                    
                    var isSuccess = result.success
                    if(isSuccess){
                        this.props.setSection(result.data)
                        this.props.cancel()
                    }
                }catch(error){
                    /*nothing happen*/
                }
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
        setSection : (data) => dispatch(setSectionModule(data))
    }
}

const mapStateToProps = state => {
    return{
        dataModule : state.dataModule
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (new_section)