import React from 'react'
import { Fragment } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { popCenterPosition, popUpAlert } from '../../function/function';
import { setDataModule, setSectionModule } from '../../redux/action';
import { ApiFetch } from '../apiFetch';

class rename_section extends Component{

    constructor(){
        super()
        this.state = {
            name: "",
            curName: ""
        }

        this.cancelAction = this.cancelAction.bind(this)
        this.changeName = this.changeName.bind(this)
        this.save = this.save.bind(this)
        this.baseRename = React.createRef()
    }
    
    componentDidMount(){
        popCenterPosition("base-rename-section")
        this.setState({
            // name: this.props.name.toUpperCase(),
            curName: this.props.name.toUpperCase()
        })
        document.addEventListener("scroll", () => {
            this.cancelAction()
        })
    }

    componentDidUpdate(prevState){
        if(prevState != this.props){
            this.setState({
                name: this.props.name.toUpperCase()
            })
        }
    }

    cancelAction(){
        this.props.cancel()
    }

    changeName(e){
        this.setState({
            name: e.target.value.toUpperCase()
        })
    }

    save(){
        /*validasai tha name is not empty*/
        if(this.state.name == 0){
            popUpAlert("Name section is empty")
            return false
        }

        let id = this.props.id
        const newData = this.props.dataModule.map(dt => {
            if(id == dt.id){
                dt.section = this.state.name
            }
            return dt
        })

        const newDataSection = this.props.sectionModule.map(dt => {
            if(dt.id == id){
                dt.section = this.state.name
            }
            return dt
        })
        
        let form = new FormData()
        form.append("id", id)
        form.append("name", this.state.name)

        ApiFetch("/section/rename", {
            method: "POST",
            body: form
        }).then(res => res.text()).then(result => {
            if(result == "success"){
                this.props.setDataModule(newData)
                this.props.setSectionModule([...newDataSection])
                this.props.cancel()
            }else{
                popUpAlert("Failed to rename section, please check your connection")
            }
        })
    }

    render(){

        const top = this.props.y - 5
        const left = parseInt(this.props.x) + 10

        return(
            <Fragment>
                <div className="block"/>
                <div id="base-rename-section" className="main-border" 
                    style={{position: "fixed", 
                            width: "250px", 
                            padding: "10px",
                            // left: left,
                            // top: top,
                            zIndex: 1001, 
                            background: "#FFF"}}>

                    <div className="bold" style={{marginBottom: "10px"}}>Rename section</div>
                    <div>
                        <input type="text" 
                            placeholder="insert section"
                            className="bold"
                            onChange={this.changeName}
                            value={this.state.name} 
                            style={{padding: "7px", width: "100%", boxSizing: "border-box"}}/>
                        <div className="second-font-color" style={{fontSize: "10px", marginTop: "5px", marginBottom: "10px"}}>
                            *Make sure that name section is not empty
                        </div>
                        <div className="main-border-left" style={{lineHeight: "15px", paddingLeft: "10px", borderLeft: "3px solid #CCC"}}>
                            <span className="second-font-color bold" style={{fontSize: "10px"}}>Current section</span><br/>
                            <span className="bold">{this.state.curName}</span>
                        </div>
                    </div>
                    <div style={{textAlign: "right", paddingTop: "10px"}}>
                        <button onClick={this.save} className="btn-primary" style={{fontSize: "12px"}}>save</button>
                        &nbsp;&nbsp;
                        <button onClick={this.cancelAction} className="btn-secondary" style={{fontSize: "12px"}}>cancel</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        sectionModule : state.sectionModule,
        dataModule : state.dataModule
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setDataModule : (data) => dispatch(setDataModule(data)),
        setSectionModule : (data) => dispatch(setSectionModule(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (rename_section)