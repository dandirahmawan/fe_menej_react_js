import { faEdit, faInfo, faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Component } from 'react';
import { connect } from 'react-redux';
import CardItem from './card_item'
import RenameSection from '../rename_section'
import { Fragment } from 'react';

class card_view extends Component{

    state = {
        popup: ""
    }

    selectCard = this.selectCard.bind(this)
    setBaseCardView = this.setBaseCardView.bind(this)
    baseCard = React.createRef()
    renameSection = this.renameSection.bind(this)
    hidePopUp = this.hidePopUp.bind(this)
    

    componentDidMount(){
        this.setBaseCardView(this.props)
    }

    // componentWillReceiveProps(nextProps){
    //     if(this.props !== nextProps){
    //         this.setBaseCardView(nextProps)
    //     }
    // }

    componentDidUpdate(prevState){
        if(prevState !== this.props){
            this.setBaseCardView(this.props)
        }
    }

    setBaseCardView(props){
        // console.log(props)
        // let sizeStatus = props.dataStatus.length
        let sizeStatus = props.dataModule.length
        let w = (parseInt(320) + 20) * sizeStatus
        
        let wh = window.innerHeight
        let t = this.baseCard.current.offsetTop 
        let hg = wh - t - 5

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
                                /*set data label for each card*/
                                let dataLabel = []
                                this.props.dataLabelModule.map(dtm => {
                                    if(dtm.moduleId == dtta.modulId){
                                        dataLabel.push(dtm)
                                    }
                                })

                                /*set data assigned for each card*/
                                let dataAssigned = []
                                this.props.assignedModules.map(dtas => {
                                    if(dtas.moduleId == dtta.modulId){
                                        dataAssigned.push(dtas)
                                    }
                                })
                                
                                /*read data filter*/
                                // let isVisible = true
                                // let filter = this.props.filter
                                // if(filter.type == "status"){
                                //     // console.log(filter.id+" == "+dtta.modulStatus)
                                //     if(filter.id != parseInt(dtta.modulStatus)){
                                //         // console.log("ngga ada")
                                //         isVisible = false
                                //     }else{
                                //         isVisible = true
                                //         // console.log("ada")
                                //     }
                                // }

                                // if(isVisible){
                                    // console.log("menampilkan")
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
                                                labelModule={dataLabel}
                                                assignedModule={dataAssigned}
                                                dueDate={dtta.endDate}
                                                contextMenuModule={this.props.contextMenuModule}/>
                                }
                            })
                            // console.log(cardItem)
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
                            <a onClick={(e) => this.renameSection(e, dt.id, dt.section)} style={{float: "right"}}>
                                <FontAwesomeIcon icon={faEdit}/>
                            </a>
                        </div>
            
                        <div className="base-card-mod-itm scrollbar">
                            {
                                (dt.sectionModule.length > 0)
                                ?
                                    dt.sectionModule.map(dtta => {
                                        /*set data label for each card*/
                                        console.log(dtta)
                                        let dataLabel = []
                                        this.props.dataLabelModule.map(dtm => {
                                            if(dtm.moduleId == dtta.modulId){
                                                dataLabel.push(dtm)
                                            }
                                        })

                                        /*set data assigned for each card*/
                                        let dataAssigned = []
                                        this.props.assignedModules.map(dtas => {
                                            if(dtas.moduleId == dtta.modulId){
                                                dataAssigned.push(dtas)
                                            }
                                        })
                                        
                                        /*read data filter*/
                                        let isVisible = true
                                        let filter = this.props.filter
                                        if(filter.type == "status"){
                                            if(filter.id != parseInt(dtta.modulStatus)){
                                                isVisible = false
                                            }else{
                                                isVisible = true
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
                                                        labelModule={dataLabel}
                                                        assignedModule={dataAssigned}
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
                <div className="main-border-top" 
                    style={{overflowX: "scroll", marginLeft: "-20px", paddingLeft: "20px", background: "#efefef"}}>
                    <div ref={this.baseCard} style={{marginTop: "10px", overflow: "hidden", position: "relative"}}>
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

const mapStateToProps = state => {
    return{
        dataLabelModule: state.dataLabelsModule,
        assignedModules: state.assignedModules,
        dataModule : state.dataModule,
        dataStatus : state.dataStatus
    }
}

export default connect(mapStateToProps) (card_view) 