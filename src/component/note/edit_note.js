import React from 'react'
import ReactDom from 'react-dom'
import {getCookieSessionId, getCookieUserId, popCenterPosition, popUpAlert} from '../../function/function'
import {SpinnerButton} from '../spinner'
import {connect} from 'react-redux'
import {editNote} from '../../redux/action'
import {ApiFetch} from '../apiFetch'

/*
    "note for using this popup."
    -------------------------------
    props.note = parameter for note
    props.noteId = parameter for note id
    props.cancel = parameter to hide popup edit note (this function call when click cancel or when susccess edit note
*/

class edit_note extends React.Component{

    constructor(){
        super()
        this.state = {
            lengthNote : 0
        }
        this.submit = this.submit.bind(this)
        this.textAreaEdit = React.createRef()
        this.textAreaKeyUp = this.textAreaKeyUp.bind(this)
    }

    componentDidMount(){
        popCenterPosition("edit-note-base")
        let lnote = this.props.note.length
        this.setState({
            lengthNote: lnote
        })
    }

    textAreaKeyUp(e){
        let t = e.target
        let v = t.value
        let l = v.length
        this.setState({
            lengthNote: l
        })
    }

    submit(e){
        let v = this.textAreaEdit.current.value
        if(v == 0) return false
        ReactDom.render(<SpinnerButton size="15px"/>, e.target)
        e.target.style.opacity = 0.5
        this.props.editNoteRedux(this.props.noteId, v)

        let form = new FormData()
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("noteId", this.props.noteId)
        form.append("note", v)

        ApiFetch("/edit_note", {
            method: "POST",
            body: form
        }).then(res => res.text())
            .then(result => {
                if(result == ""){
                    popUpAlert("Edit note successfully", "success")
                    this.props.cancel()
                }
            })
    }

    render(){
        return(
            <React.Fragment>
                <div onClick={this.noteBaseClick} className="block" style={{zIndex: "1001"}}/>
                <div onClick={this.noteBaseClick} id="edit-note-base" className="pop" style={{width: "400px", height: "auto", zIndex: "1001", background: "#FFF"}}>
                    <div className="bold" style={{padding: "10px", fontSize: "14px"}}>Edit note</div>
                    <div style={{paddingLeft: "10px", paddingRight: "10px"}}>
                        <textarea onKeyUp={this.textAreaKeyUp} maxLength="500" ref={this.textAreaEdit} placeholder="type note here" style={{width: "100%", fontSize: "12px", boxSizing: "border-box", height: "150px"}}>
                            {this.props.note}
                        </textarea>
                    </div>
                    <div id="ft-edit-note" style={{padding: "10px", overflow: "hidden"}}>
                        <div className="second-font-color bold" style={{marginTop: "5px", fontSize: "12px", float: "left"}}>
                            {this.state.lengthNote} / 500
                        </div>
                        <div style={{float: "right"}}>
                            <button onClick={this.submit} className="btn-primary" style={{fontSize: "12px", marginRight: "10px"}}>Submit</button>
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
        editNoteRedux : (noteId, note) => dispatch(editNote(noteId, note))
    }
}

export default connect(null, mapDispatchToProps)(edit_note)