import React, { createRef } from 'react'
import { Component } from 'react';

class index extends Component{

    constructor(){
        super()
        this.refBase = createRef()
        this.handleClickOutside = this.handleClickOutside.bind(this)
    }

    componentDidMount(){
        document.addEventListener("click", (e) => this.handleClickOutside(e))
    }

    handleClickOutside(event) {
        if (this.refBase.current && !this.refBase.current.contains(event.target)) {
            this.props.hideDetail()

        }
    }

    render(){
        return(
            <div ref={this.refBase} className="shadow main-border" 
                style={{width: "300px", height: "200px", background: "#FFF", position: "absolute", top: "50px"}}>

            </div>
        )
    }
}

export default index