import React, { Component, createRef } from 'react'
import { check_circle } from '../icon/icon'

class choice_status extends Component{

    constructor(){
        super()
        this.baseSection = createRef()
        this.mouseOver = this.mouseOver.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.select = this.select.bind(this)
    }

    componentDidMount(){
        document.addEventListener("click", this.handleClickOutside)
    }

    mouseOver(e){
        let elm = document.getElementsByClassName("itm-sect-bs")
        for(let i = 0;i<elm.length;i++){
            elm[i].style.background = "#FFF"
            elm[i].style.color = "#000"
        }

        let t = e.target
        t.style.background = "#4da1b5"
        t.style.color = "#FFF"
    }

    handleClickOutside(event) {
        if (this.baseSection.current && !this.baseSection.current.contains(event.target)) {
            this.props.hideSection()
        }
    }

    select(id, section){
        this.props.selectSection(id, section)
        this.props.hideSection()
    }

    render(){
        const selectItem = this.props.data.map(dt => {
            return <div onClick={() => this.select(dt.id, dt.section)}
                        onMouseOver={this.mouseOver} 
                        style={{padding: "8px"}} className="main-border-bottom bold itm-sect-bs">
                    {dt.section}
                </div>
        })
        return(
            <div ref={this.baseSection} 
                className="main-border" 
                style={{background: "#FFF", width: "215px", position: "absolute"}}>
                {selectItem}
            </div>
        )
    }
}

export default choice_status