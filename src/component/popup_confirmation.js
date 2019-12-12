import React from 'react'

class popup_confrimation extends React.Component{

    componentDidMount(){
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
                <div className='block' onClick={this.props.hidePopUp}></div>
                <div className='pop popup_confirmation'>
                    <div className="header-second-background bold" style={{padding: '10px'}}>{this.props.titleConfirmation}</div>
                    <div style={{padding: '10px'}}>
                        <span style={{fontSize: "12px"}}>
                            {this.props.textPopup}
                        </span>
                    </div>
                    <div className="header-second-background bold" style={{padding: "10px", textAlign: "right"}}>
                        <button onClick={this.props.yesAction} className="btn-primary" style={{fontSize: "12px", marginRight: "10px"}}>Yes</button>
                        <button onClick={this.props.hidePopUp} className="btn-secondary bold" style={{background: "none", fontSize: "12px"}}>No</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default popup_confrimation