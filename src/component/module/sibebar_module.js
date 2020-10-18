import { faBullseye, faChevronDown, faClipboard, faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import ItemUser from '../item_user_list'

class sidebar_module extends React.Component{

    constructor(){
        super()
        this.sideBar = React.createRef()
    }

    componentDidMount(){
        let elm = this.sideBar.current
        let setHeight = window.innerHeight - 60
        elm.style.height = setHeight+"px"
    }

    menuClick(accordName){
        let classAccord = document.getElementsByClassName("accord-bs")
        for(let i = 0;i<classAccord.length;i++){
            let accordName1 = classAccord[i].getAttribute("accord-name")
            
            if(accordName1 == accordName){
                classAccord[i].style.display = "block"
            }
        }
    }

    render(){

        const dataCollection = this.props.dataCollection.map(dt => {
            return <a style={{textDecoration: "none", color: "#000"}}>
                        <div className="tr-selectable" style={{paddingLeft: "30px", paddingTop: "10px", paddingBottom: "10px", background: "#f3f2f1"}}>
                            <FontAwesomeIcon className="second-font-color" icon={faBullseye}/>&nbsp;&nbsp;&nbsp;
                            {dt.tabName}
                        </div> 
                    </a>
        })


        const dataTeam = this.props.dataTeam.map(dt => {
            return <div style={{padding: "10px", paddingLeft: "25px"}}>
                        <ItemUser emailUser={dt.emailUser}
                                userName={dt.userName}/>
                    </div>
        })

        return(
            <div ref={this.sideBar} className="main-border-right second-background-grs" 
                style={{width: "250px", position: "fixed", height: "100%", zIndex: "1"}}>
                <div className="main-border-bottom" style={{background: "#f3f2f1", padding: "10px"}}>
                    <div style={{overflow: "hidden", padding: "5px"}}>
                        <a id="btn-edit-project" onClick={this.editProject}>
                            <em className="fa fa-edit second-font-color" style={{float: "right", fontSize: "15px", marginTop: "4px"}}>&nbsp;</em>
                        </a>
                        
                        <em class="fa fa-folder" style={{float: "left", fontSize: "20px", marginTop: "4px", color: "rgb(212, 174, 43)"}}>&nbsp;</em>
                        
                        <div style={{float: "left", fontSize: "12px", marginLeft: "5px"}}>
                            <span className="bold" style={{fontSize: "12px"}}>
                                Project name
                            </span><br/>
                            <span className="second-font-color" style={{fontSize: "10px"}}>
                                12 Jan 2020
                            </span>
                        </div>
                    </div>
                    <div style={{overflow: "hidden", padding: "5px"}}>
                        <em className="fa fa-user-circle" style={{float: "left", fontSize: "20px", marginTop: "4px"}}>&nbsp;</em>
                        <div style={{float: "left", fontSize: "12px", marginLeft: "5px"}}>
                            <span style={{fontSize: "10px", color: "#949494"}}>Project Manager :</span><br/>
                            <span className="bold" style={{fontSize: "12px"}}>Project manager</span>
                        </div>
                    </div>
                </div>
                
                <a onClick={this.props.moduleClick} style={{textDecoration: "none", color: "#000"}}>
                    <div className="main-border-bottom tr-selectable-menu" style={{fontSize: "12px", padding: "10px"}}>
                        <div style={{width: "100%"}}>
                            <FontAwesomeIcon icon={faClipboard}/>&nbsp;&nbsp;&nbsp;&nbsp;Module
                        </div>
                    </div>
                </a>
                <a onClick={this.props.documentFileClick} style={{textDecoration: "none", color: "#000"}}>
                    <div className="main-border-bottom tr-selectable-menu" style={{fontSize: "12px", padding: "10px"}}>
                        <div style={{width: "100%"}}>
                            <FontAwesomeIcon icon={faFile}/>&nbsp;&nbsp;&nbsp;&nbsp;Document & File
                        </div>
                        {/* <FontAwesomeIcon icon={faChevronDown} style={{float: "right"}}/> */}
                    </div>
                </a>

                <div className="main-border-bottom">
                    <a style={{textDecoration: "none", color: "#000"}}>
                        <div onClick={() => this.menuClick("member-project")} className="tr-selectable-menu" style={{fontSize: "12px", padding: "10px"}}>
                            <div style={{width: "100%"}}>
                                <FontAwesomeIcon icon={faChevronDown}/>&nbsp;&nbsp;&nbsp;&nbsp;Member Project
                            </div>
                        </div>
                    </a>
                    <div accord-name="member-project" className="accord-bs" style={{marginBottom: "10px", display: "none"}}>
                        {dataTeam}
                    </div>
                </div>
                    
 
                <a style={{textDecoration: "none", color: "#000"}}>
                    <div className="main-border-bottom tr-selectable-menu" style={{fontSize: "12px", padding: "10px"}}>
                        <div style={{width: "100%"}}>
                            <FontAwesomeIcon icon={faChevronDown}/>&nbsp;&nbsp;&nbsp;&nbsp;Status Module
                        </div>
                    </div>
                </a>
                {/* <a style={{textDecoration: "none", color: "#000"}}> */}
                    <div className="main-border-bottom">
                        <a style={{textDecoration: "none", color: "#000"}}>
                            <div onClick={() => this.menuClick("collection")} className="tr-selectable-menu" style={{fontSize: "12px", padding: "10px"}}>
                                <div style={{width: "100%"}}>
                                    <FontAwesomeIcon icon={faChevronDown}/>&nbsp;&nbsp;&nbsp;&nbsp;Collection
                                </div>
                            </div>
                        </a>
                        <div accord-name="collection" className="accord-bs bold" style={{paddingLeft: "0px", fontSize: "12px", display: "none"}}>
                            {dataCollection}
                        </div>
                    </div>
            </div>
        )
    }
}

export default sidebar_module