import React from 'react'
import ReactDom from 'react-dom'
import RowNote from './row_note'
import {getCookieUserId, getCookieSessionId, popUpAlert} from '../../function/function'
import {ApiFetch} from '../apiFetch'
import {connect} from 'react-redux'
import {appendDataNote, updateDataModuleNote, deleteDataNote} from '../../redux/action'
import ExpandNote from './expand_note'
import PopupConfirmation from '../popup_confirmation'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {SpinnerButton} from "../spinner";
import EditNote from './edit_note'

class note extends React.Component{

    constructor(){
        super()
        this.state = {
            noteText:"",
            expandBase:"",
            titleNote:"",
            popup:"",
            noteIdDelete:""
        }
        this.submitNote = this.submitNote.bind(this)
        this.changeText = this.changeText.bind(this)
        this.submit = this.submit.bind(this)
        this.expandView = this.expandView.bind(this)
        this.collapeseView = this.collapeseView.bind(this)
        this.deleteNote = this.deleteNote.bind(this)
        this.hidePopUp = this.hidePopUp.bind(this)
        this.commitDeleteNote = this.commitDeleteNote.bind(this)
        this.editNote = this.editNote.bind(this)
    }

    componentDidMount(){
        
        var title = ""
        if(this.props.moduleName !== undefined) title = this.props.moduleName
        if(this.props.bugsText !== undefined) title = this.props.bugsText

        this.setState({
            dataNoteState: this.state.dataNoteState,
            titleNote: title
        })
    }

    submitNote(e){
        if(this.state.noteText != 0){
            let t = e.target
            ReactDom.render(<SpinnerButton size="15px"/>, t)
            this.submit(t)
        }else{
            popUpAlert("Note is empty")
        }
    }

    submit(t){
        var userId = getCookieUserId()
        var moduleId = (this.props.moduleId === undefined) ? 0 : this.props.moduleId
        var bugsId = (this.props.bugsId === undefined) ? 0 : this.props.bugsId

        var form = new FormData()
        form.append("userId", userId)
        form.append("sessionId", getCookieSessionId())
        form.append("moduleId", moduleId)
        form.append("bugsId", bugsId)
        form.append("note", this.state.noteText)

        ApiFetch("/insert_note", {
            method: "POST",
            body: form
        }).then(res => res.json())
        .then(result => {
            //make sure that result of api is json object type
            var jsonObject = result
            // this.state.dataNoteState.push(jsonObject)
            this.setState({
                noteText: "",
                dataNoteState:  this.state.dataNoteState,
                countNote: parseInt(this.state.countNote) + 1
            })

            //update data to redux
            ReactDom.render("Submit", t)
            this.props.appendDataNote(jsonObject, bugsId, moduleId)
            this.props.updateDataModuleNote(moduleId, "add")
        })
    }

    deleteNote(noteId){
        this.setState({
            noteIdDelete: noteId,
            popup: <PopupConfirmation 
                        titleConfirmation="Delete Note"
                        textPopup="Are you sure, you want delete note ?"
                        hidePopUp={this.hidePopUp}
                        yesAction={this.commitDeleteNote}/>
        })
    }

    commitDeleteNote(e){
        e.stopPropagation()
        var form = new FormData
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("noteId", this.state.noteIdDelete)

        ApiFetch("/delete_note", {
            method: "POST",
            body: form
        }).then(res => res.text())
        .then(result => {
            if(result == 1){
                this.props.deleteDataNote(this.state.noteIdDelete)
                this.setState({
                    noteIdDelete:"",
                    popup: ""
                })
            }
        })
    }

    hidePopUp(e){
        this.setState({
            popup: ""
        })
        if(e !== undefined)
            e.stopPropagation()
    }

    baseNoteClick(e){
        e.stopPropagation()
    }

    changeText(e){
        var val = e.target.value
        this.setState({
            noteText: val
        })
    }

    editNote(noteId, note){
        this.setState({
            popup: <EditNote
                        noteId={noteId}
                        note={note}
                        cancel={this.hidePopUp}
                    />
        })
    }

    expandView(e, moduleId, bugsId){
        this.setState({
            expandBase: <ExpandNote 
                            moduleId={moduleId}
                            bugsId={bugsId}
                            hide={this.collapeseView}
                            titleNote={this.state.titleNote}/>
        })
        e.stopPropagation()
    }


    collapeseView(e){
        this.setState({
            expandBase: ""
        })
        e.stopPropagation()
    }

    render(){
        var no = 0
        const data = this.props.dataNoteRedux.map(dt => {
            if(this.props.bugsId === undefined){
                if(dt.moduleId == this.props.moduleId || dt.bugsId == this.props.bugsId){
                    if(dt.isDelete != 'Y'){
                        no++
                        return <RowNote
                                    no={no}
                                    note={dt.note}
                                    noteId={dt.noteId}
                                    pic={dt.pic}
                                    userId={dt.userId}
                                    deleteNote={this.deleteNote}
                                    createdDate={dt.createdDate}
                                    editNote={this.editNote}
                                />
                    }
                }
            }else{
                if(dt.bugsId == this.props.bugsId){
                    if(dt.isDelete != 'Y'){
                        no++
                        return <RowNote
                                    no={no}
                                    note={dt.note}
                                    noteId={dt.noteId}
                                    pic={dt.pic}
                                    userId={dt.userId}
                                    deleteNote={this.deleteNote}
                                    createdDate={dt.createdDate}
                                    editNote={this.editNote}
                                />
                    }
                }
            }
        })

        return(
            <React.Fragment>
                {this.state.expandBase}
                {this.state.popup}
                <div className="main-border" onClick={this.baseNoteClick} style={{fontSize: "11px", width: "350px", marginTop: "5px", borderRadius: "5px", background: "#FFF"}}>
                    <div className="main-border-bottom" style={{position: "relative", padding: "5px", overflow: "hidden"}}>
                        <div className="bold" style={{fontSize: "14px", float: "left", marginTop: "2px"}}>Note</div>
                        <button className="main-border tooltip" onClick={(e) => this.expandView(e, this.props.moduleId, this.props.bugsId)} style={{padding: "3px",background: "#FFF", float: "right"}}>
                            <i className="fa fa-expand"></i>
                        </button>
                    </div>
                    { 
                        (this.props.countNote > 0)
                        ?
                            <div className="main-border-bottom" style={{padding: "5px", maxHeight: "200px", overflowY: "scroll"}}>
                                <table>
                                    <tbody>
                                        {data}
                                    </tbody>
                                </table>
                            </div>
                        :
                            ""
                    }
                    <div>
                        <div style={{padding: "5px", overflow: "hidden"}}>
                            {this.state.testing}
                            <div className="main-border-right" style={{width: "280px", float: "left"}}>
                                <textarea onChange={this.changeText} style={{fontSize: "12px", outline: "none", border: "none", width: "260px", height: "50px"}} placeholder="new note" value={this.state.noteText}></textarea>
                            </div>
                            <button onClick={this.submitNote} className="btn-primary" style={{float: "left", color: "#FFF", fontSize: "11px", marginLeft: "5px"}}>Submit</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => { 
    return{
        dataNoteRedux: state.dataNote
    }
}

const mapDispatchToProps = dispatch => {
    return{
        appendDataNote: (jsonObject, bugsId, moduleId) => dispatch(appendDataNote(jsonObject, bugsId, moduleId)),
        updateDataModuleNote: (moduleId, type) => dispatch(updateDataModuleNote(moduleId, type)),
        deleteDataNote: (noteId) => dispatch(deleteDataNote(noteId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (note)