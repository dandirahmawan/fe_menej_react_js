import React from 'react'
import GifLoader from '../gif/Rolling-1s-45px.gif'

export class Spinner extends React.Component{
    constructor(){
        super()
        this.state = {
            width: "30px"   
        }
    }

    componentDidMount(){
        if(this.props.size !== undefined){
            this.setState({width: this.props.size})
        }
    }

    render(){
        const style = {
            width: this.state.width,
            marginTop: "20px"
        }
        return(
            <div style={{textAlign: "center"}}>
                <img style={style} src={GifLoader}></img>
                <div className="bold" style={{fontSize: "11px", color: "#a2a2a2"}}>{this.props.textLoader}</div>
            </div>
        )
    }
}

export class SpinnerButton extends React.Component{
    constructor(){
        super()
        this.state = {
            width: "30px"   
        }
    }

    componentDidMount(){
        if(this.props.size !== undefined){
            this.setState({width: this.props.size})
        }
    }

    render(){
        const style = {
            width: this.state.width,
            marginBottom: "-3px"
        }
        return(
            <div style={{textAlign: "center"}}>
                <img style={style} src={GifLoader}></img>
                <div className="bold" style={{fontSize: "11px", color: "#a2a2a2"}}>{this.props.textLoader}</div>
            </div>
        )
    }
}