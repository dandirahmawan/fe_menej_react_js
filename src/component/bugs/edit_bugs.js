import React from 'react'
import ReactDom from 'react-dom'
import {getCookieSessionId, getCookieUserId, popCenterPosition, popUpAlert} from '../../function/function'
import {editBugs} from '../../redux/action'
import {connect} from 'react-redux'
import {SpinnerButton} from "../spinner"
// import {ApiFetch} from '../apiFetch'
import Fetch from '../../function/fetchApi'

class edit_bugs extends React.Component{

    constructor(){
        super()
        this.textArea = React.createRef()
        this.submit = this.submit.bind(this)
        this.textKeyUp = this.textKeyUp.bind(this)
        this.state = {
            l : 0
        }
    }

    componentDidMount(){
        popCenterPosition("base-edit-bugs")
        let lt = this.textArea.current.value.length
        this.setState({
            l : lt
        })
    }

    textKeyUp(e){
        let val = e.target.value
        let ll = val.length
        this.setState({
            l: ll
        })
    }

    submit(e){
        let ths = e.target
        ths.style.opacity = 0.5
        ReactDom.render(<SpinnerButton size="15px"/>, ths)
        let v = this.textArea.current.value
        let form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("bugsId", this.props.bugsId)
        form.append("bugs", v)

        var header = new Headers()
        header.append("sessionId", getCookieSessionId())
        header.append("userId", getCookieUserId());

        let fetch = new Fetch()
        fetch.post("/edit_bugs", form).then(result => {
            if(result == "success"){
                this.props.editBugs(this.props.bugsId, v)
                popUpAlert("Edit bugs successfully", "success")
                if (this.props.commit !== undefined) this.props.commit(this.props.bugsId, v)
                this.props.cancel()
            }
        })
    }

    render(){
        return(
            <React.Fragment>
                <div className="block"/>
                <div id="base-edit-bugs" className="pop" style={{width: "400px", background: "#FFF", borderRadius: "3px", height: "auto"}}>
                    <div className="bold" style={{padding: "10px", fontSize: "14px"}}>Edit bugs</div>
                    <div style={{paddingLeft: "10px", paddingRight: "10px"}}>
                        <textarea onKeyUp={this.textKeyUp} ref={this.textArea} maxLength="500" style={{boxSizing: "border-box", width: "100%", height: "120px", resize: "none", fontSize: "12px"}}>
                            {this.props.textBugs}
                        </textarea>
                    </div>
                    <div style={{padding: "10px", overflow: "hidden"}}>
                        <div style={{float: "left", padding: "2px"}}>
                            <span className="second-font-color bold" style={{fontSize: "12px"}}> {this.state.l} / 500</span>
                        </div>
                        <div style={{float: "right"}}>
                            <button onClick={this.submit} className="btn-primary" style={{fontSize: "12px", marginRight: "10px"}}>Save</button>
                            <button onClick={this.props.cancel} className="btn-secondary" style={{fontSize: "12px"}}>Cancel</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        editBugs: (bugsId, bugs) => dispatch(editBugs(bugsId, bugs))
    }
}

export default connect(null, mapDispatchToProps) (edit_bugs)