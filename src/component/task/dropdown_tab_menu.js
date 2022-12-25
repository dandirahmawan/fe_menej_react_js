import React from 'react'
import Row from './row_dropdown_tab_menu'

class dropdown_tab_menu extends React.Component{

    constructor(){
        super()

        this.baseDropDown = React.createRef()
        this.tabMenuDropDown = this.tabMenuDropDown.bind(this)
        this.documentCick = this.documentCick.bind(this)
    }

    componentDidMount(){
        document.addEventListener("click", this.documentCick)
    }

    documentCick(e){
        if(this.baseDropDown.current != null){
            if(!this.baseDropDown.current.contains(e.target)){
                this.props.hideDropDown()
            }
        }
    }

    tabMenuDropDown(baseDropdown, tabId){
        this.props.tabMenuActionDp(baseDropdown, tabId)
        this.props.hideDropDown()
    }

    render() {

        const itemMenu = this.props.item.map(dt => {
            return <Row tabName={dt.tabName} createdBy={dt.createdBy} userName={dt.userName}
                        onClick={() => this.tabMenuDropDown(this.props.baseDropdown.current, dt.tabId)}/>
        })

        return (
            <div ref={this.baseDropDown} id="otr-tb-bs"
                 className="main-border"
                 style={{width: "200px", background: "#FFF", position: "absolute",
                     marginLeft: "-170px", zIndex: "1", fontSize: "12px", borderRadius: "3px", overflow: "hidden"}}>
                <div className="bold main-border-bottom second-background-grs" style={{padding: "10px", fontSize: "12px"}}>
                    Other tab
                </div>
                <div style={{maxHeight: "200px", overflowY: "scroll"}}>
                    {itemMenu}
                </div>
            </div>
        );
    }
}

export default dropdown_tab_menu