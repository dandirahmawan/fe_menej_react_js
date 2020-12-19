import { faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Component } from 'react';
import { connect } from 'react-redux';
import CardItem from './card_item'

class card_view extends Component{

    selectCard = this.selectCard.bind(this)
    setBaseCardView = this.setBaseCardView.bind(this)
    baseCard = React.createRef()
    

    componentDidMount(){
        this.setBaseCardView(this.props)
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            this.setBaseCardView(nextProps)
        }
    }

    setBaseCardView(props){
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
                        </div>
            
                        <div className="base-card-mod-itm scrollbar">
                            {
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
                                })
                            }
                        </div>
                    </div>
        })

        return(
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