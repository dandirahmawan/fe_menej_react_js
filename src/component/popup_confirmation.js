import React from 'react'
import ReactDom from 'react-dom'
import {SpinnerButton} from "./spinner";

class popup_confrimation extends React.Component{

    constructor(){
        super()
        this.yesBtn = React.createRef()
    }

    componentDidMount(){
        this.yesBtn.current.addEventListener("click", function(e){
            e.target.style.opacity = 0.5
            ReactDom.render(<SpinnerButton size="15px"/>, e.target)
        })

        var elm = document.getElementsByClassName("pop")[0]
        var h = elm.offsetHeight
        var w = elm.offsetWidth

        var l = (window.innerWidth - w) / 2
        var t = (window.innerHeight - h) / 2

        elm.style.left = l+"px"
        elm.style.top = t+"px"
    }

    render(){
        return(
            <React.Fragment>
                <div className='block' onClick={this.props.hidePopUp} style={{zIndex: "100001"}}></div>
                <div className='pop popup_confirmation' style={{zIndex: "100001"}}>
                    <div className="header-second-background bold" style={{padding: '10px', fontSize:"14px"}}>                                  
                        {this.props.titleConfirmation}
                    </div>
                    <div style={{padding: '10px'}}>
                        <span style={{fontSize: "12px"}} dangerouslySetInnerHTML={{ __html: this.props.textPopup }}/>
                    </div>
                    <div className="header-second-background bold" style={{padding: "10px", textAlign: "right"}}>
                        <button ref={this.yesBtn} onClick={this.props.yesAction} className="btn-primary" style={{fontSize: "12px", marginRight: "10px"}}>Yes</button>
                        <button onClick={this.props.hidePopUp} className="btn-secondary bold" style={{background: "none", fontSize: "12px"}}>No</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default popup_confrimation