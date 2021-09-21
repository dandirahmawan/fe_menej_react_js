import { faEdit, faInfoCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Component } from 'react';
import { connect } from 'react-redux';
import CardItem from './card_item'
import RenameSection from '../rename_section'
import { Fragment } from 'react';
import PopConfirmation from "../../popup_confirmation";
import { popUpAlert } from '../../../function/function';
import { ApiFetch } from '../../apiFetch';
import { setDataModule } from '../../../redux/action';
import Fetch from '../../../function/fetchApi'

class card_view extends Component{

    state = {
        popup: ""
    }

    selectCard = this.selectCard.bind(this)
    setBaseCardView = this.setBaseCardView.bind(this)
    baseCard = React.createRef()
    renameSection = this.renameSection.bind(this)
    hidePopUp = this.hidePopUp.bind(this)
    deleteSection = this.deleteSection.bind(this)
    commitDeleteSection = this.commitDeleteSection.bind(this)

    componentDidMount(){
        this.setBaseCardView(this.props)
        window.addEventListener("resize", () => {
            this.setBaseCardView(this.props)
        })
    }

    componentDidUpdate(prevState){
        if(prevState !== this.props){
            this.setBaseCardView(this.props)
        }
    }

    setBaseCardView(props){
        if(this.baseCard == null || this.baseCard.current == null){
            return false
        }
        // console.log(props)
        // let sizeStatus = props.dataStatus.length
        let sizeStatus = props.dataModule.length
        let w = (parseInt(320) + 20) * sizeStatus
        
        let wh = window.innerHeight
        let t = this.baseCard.current.offsetTop 
        let hg = wh - t - 10

        this.baseCard.current.style.width = w+"px"
        this.baseCard.current.style.height = hg+"px"

        let elm = document.getElementsByClassName("base-card-mod-itm")
        for(let i = 0;i<elm.length;i++){
            let element = elm[i]
            let t2 = element.offsetTop
            let h2 = hg - t2 - 10
            element.style.height = h2+"px"
        }
    }

    selectCard(moduleId){
        this.props.selectedRow(moduleId)
    }

    renameSection(e, id, name){
        let x = e.clientX
        let y = e.clientY
        this.setState({
            popup: <RenameSection y={y} 
                                x={x} 
                                cancel={this.hidePopUp}
                                id={id} 
                                name={name}/>
        })
    }

    deleteSection(e, id, name){
        let text = "<span>Are you sure you want delete <span class='bold'>"+name+"</span> section. Make sure that the section is not have any task</span>"
        this.setState({
            popup: <PopConfirmation titleConfirmation="Delete Section"
                                    textPopup={text}
                                    yesAction={() => this.commitDeleteSection(id)}
                                    hidePopUp={this.hidePopUp}/>
        })
    }

    commitDeleteSection(id){
        let isValid = true
        let dataModule = [...this.props.dataModule]
        let seq = 0;
        for(let i = 0;i<dataModule.length;i++){
            let dt = dataModule[i]
            if(dt.id == id){
                let countTask = dt.sectionModule.length
                if(countTask > 0){
                    popUpAlert("There is task in this section")
                    isValid = false
                }else{
                    /*set index array section for delete*/
                    seq = i
                }
                break
            }
        }

        if(isValid){
            popUpAlert("Section successfully deleted", "success")
            let form = new FormData()
            form.append("id", id)

            let fetch = new Fetch()
            fetch.post("/section/delete", form).then(res => {
                try {
                    let resJson = JSON.parse(res)
                    if(resJson.status == "success"){
                        popUpAlert("Delete section is successfully", "success")

                        /*set data module to redux*/
                        dataModule.splice(seq, 1)
                        this.props.setDataModule(dataModule)
                    }else{
                        popUpAlert(resJson.message)
                    }
                } catch (error) {
                    /*nothing happen*/
                }
            })
            // ApiFetch("/section/delete", {
            //     method: "POST",
            //     body: form
            // }).then(res => res.text()).then(res => {
            //     let resJson = JSON.parse(res)
            //     if(resJson.status == "success"){
            //         popUpAlert("Delete section is successfully", "success")

            //         /*set data module to redux*/
            //         dataModule.splice(seq, 1)
            //         this.props.setDataModule(dataModule)
            //     }else{
            //         popUpAlert(resJson.message)
            //     }
            // })
        }

        this.setState({
            popup: ""
        })
    }

    hidePopUp(){
        this.setState({
            popup: ""
        })
    }

    render(){
        const baseGroup = this.props.dataStatus.map(dt => {
            return <div className="base-card-mod">
                    <div className="bold second-font-color" 
                        style={{fontSize: "12px", 
                                padding: "10px", 
                                background: "#FFF",
                                boxShadow: "1px 3px 3px #CCC", 
                                border: "1px solid #e8e8e8", 
                                borderRadius: "3px",
                                width: "280px"}}>
                        {dt.status}
                    </div>
                    
                    <div className="base-card-mod-itm scrollbar">
                        
                    {
                        this.props.dataModule.map(dtt => {
                            const cardItem = dtt.sectionModule.map(dtta => {
                                // /*set data assigned for each card*/
                                // let dataAssigned = []
                                // this.props.assignedModules.map(dtas => {
                                //     if(dtas.moduleId == dtta.modulId){
                                //         dataAssigned.push(dtas)
                                //     }
                                // // })
                                
                                if(dtta.modulStatus == dt.id){
                                    return <CardItem moduleId={dtta.modulId}
                                                dataStatus={this.props.dataStatus}
                                                status={dtta.modulStatus}
                                                select={this.selectCard}
                                                moduleName={dtta.modulName}
                                                description={dtta.description}
                                                countDocFile={dtta.countDoc}
                                                countBugs={dtta.countBugs}
                                                countBugsClose={dtta.countBugsClose}
                                                labelModule={dtta.label}
                                                assignedModule={dtta.assignTo}
                                                dueDate={dtta.endDate}
                                                contextMenuModule={this.props.contextMenuModule}/>
                                }
                            })
                            return cardItem
                        })
                    }
                    </div>
                </div>
            
        })


        const baseSection = this.props.dataModule.map(dt => {
            return <div className="base-card-mod">
                        <div className="bold second-font-color" 
                            style={{fontSize: "12px", 
                                    padding: "10px", 
                                    background: "#FFF",
                                    boxShadow: "1px 3px 3px #CCC", 
                                    border: "1px solid #e8e8e8", 
                                    borderRadius: "3px",
                                    width: "280px"}}>
                            {dt.section}
                            <div style={{float: "right"}}>
                                <a onClick={(e) => this.renameSection(e, dt.id, dt.section)} >
                                    <FontAwesomeIcon icon={faEdit}/>
                                </a>
                                &nbsp;&nbsp;&nbsp;
                                <a onClick={(e) => this.deleteSection(e, dt.id, dt.section)} className="second-font-color">
                                    <FontAwesomeIcon icon={faTrashAlt}/>
                                </a>
                            </div>
                        </div>
            
                        <div className="base-card-mod-itm scrollbar scoll-card-task">
                            {
                                (dt.sectionModule.length > 0)
                                ?
                                    dt.sectionModule.map(dtta => {
                                        /*set data assigned for each card*/
                                        // let dataAssigned = []
                                        // this.props.assignedModules.map(dtas => {
                                        //     if(dtas.moduleId == dtta.modulId){
                                        //         dataAssigned.push(dtas)
                                        //     }
                                        // })
                                        
                                        /*read data filter*/
                                        let isVisible = true
                                        let filter = this.props.filter
                                        if(filter.type == "status"){
                                            if(filter.id != parseInt(dtta.modulStatus)){
                                                isVisible = false
                                            }else{
                                                isVisible = true
                                            }
                                        }else if(filter.type == "assign"){
                                            isVisible = false
                                            for(let i = 0;i<dtta.assignTo.length;i++){
                                                let dttaAssign = dtta.assignTo[i]
                                                if(dttaAssign.userId == filter.id){
                                                    isVisible = true
                                                    break
                                                }
                                            }
                                        }

                                        if(isVisible){
                                            return <CardItem moduleId={dtta.modulId}
                                                        dataStatus={this.props.dataStatus}
                                                        status={dtta.modulStatus}
                                                        select={this.selectCard}
                                                        moduleName={dtta.modulName}
                                                        description={dtta.description}
                                                        countDocFile={dtta.countDoc}
                                                        countBugs={dtta.countBugs}
                                                        countBugsClose={dtta.countBugsClose}
                                                        labelModule={dtta.label}
                                                        assignedModule={dtta.assignTo}
                                                        dueDate={dtta.endDate}
                                                        contextMenuModule={this.props.contextMenuModule}/>
                                        }
                                    })
                                :
                                    <div className="main-border" style={{margin: "10px", width: "260px", textAlign: "center", paddingTop: "20px", paddingBottom: "20px"}}>
                                        <FontAwesomeIcon style={{fontSize: "16px"}} icon={faInfoCircle}/>&nbsp;&nbsp;
                                        <div style={{color: "#9c9c9c"}}>
                                            <div className="bold" style={{fontSize: '14px'}}>No data to display</div>
                                            <div style={{fontSize: "11px"}}>This section did not have data to display</div>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
        })

        return(
            <Fragment>
                {this.state.popup}
                <div className="main-border-top scroll-card-task-y" 
                    style={{overflowX: "scroll", marginLeft: "-8px", paddingLeft: "20px", background: "#efefef"}}>
                    <div ref={this.baseCard} style={{marginTop: "70px", overflow: "hidden", position: "relative"}}>
                        {
                            (this.props.groupType == 'section')
                            ?
                                baseSection
                            :
                                baseGroup
                        }
                    </div>
                </div>
            </Fragment>            
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setDataModule : (data) => dispatch(setDataModule(data))
    }
}   

const mapStateToProps = state => {
    return{
        dataLabelModule: state.dataLabelsModule,
        assignedModules: state.assignedModules,
        dataModule : state.dataModule,
        dataStatus : state.dataStatus
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (card_view) 