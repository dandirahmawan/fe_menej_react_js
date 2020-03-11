import React from 'react'
import {popCenterPosition, getCookieUserId, getCookieSessionId, popUpAlert} from '../../function/function'
import Row from './row_expand_note'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes, faBorderAll, faBorderNone, faClipboardCheck, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
import PopupConfirmation from '../popup_confirmation'
import { baseUrl } from '../../const/const'
import {deleteDataNote, appendDataNote, updateDataModuleNote} from '../../redux/action'

class expand_note extends React.Component{

    constructor(){
        super()
        this.state = {
            popup: "",
            noteIdDelete:"",
            textNote:""
        }

        this.blockExpandNote = React.createRef()
        this.txtNoteClick = this.txtNoteClick.bind(this)
        this.deleteNote = this.deleteNote.bind(this)
        this.hidePopUpExpand = this.hidePopUpExpand.bind(this)
        this.commitDeleteNoteExpand = this.commitDeleteNoteExpand.bind(this)
        this.changeNote = this.changeNote.bind(this)
        this.commitNote = this.commitNote.bind(this)
    }

    componentDidMount(){
        popCenterPosition("expand-note-base")
        var hd = document.getElementById("expand-note-header")
        var mb = document.getElementById("expand-note-main")
        var fb = document.getElementById("footer-base-bugs")
        var xh = document.getElementById("title-mb-note")

        var hx = parseInt(xh.offsetHeight) + 20
        var heightHead = hd.offsetHeight
        var fbHeight = fb.offsetHeight
        var mHeight = 450 - heightHead - fbHeight - hx - 10
        
        mb.style.height = mHeight+"px"
        mb.style.overflowY = "scroll"
    }
    
    showBorder(){
        var the = document.getElementsByClassName("thead-exp-note")
        the[0].style.background = "#f5f5f5"

        var tbl = document.getElementsByClassName("tb-note-expand")
        for(var i = 0;i<tbl.length;i++){
            var curClass = tbl[i].getAttribute("class")
            var setClass = curClass+" main-border"
            tbl[i].setAttribute("class", setClass)
        }   
    }

    hideBorder(){
        var the = document.getElementsByClassName("thead-exp-note")
        the[0].style.background = "none"

        var tbl = document.getElementsByClassName("tb-note-expand")
        for(var i = 0;i<tbl.length;i++){
            var curClass = tbl[i].getAttribute("class")
            var setClass = curClass.replace(" main-border", "")
            var lg = setClass.length
            tbl[i].setAttribute("class", setClass)
        }   
    }

    txtNoteClick(e){
        var t = e.target
        t.style.height = "50px"
    }

    expandClick(e){
        e.stopPropagation()
    }

    deleteNote(noteId){
        this.setState({
            popup: <PopupConfirmation 
                        titleConfirmation="Delete Note"
                        textPopup="Are you sure, you want delete note ?"
                        hidePopUp={this.hidePopUpExpand}
                        yesAction={this.commitDeleteNoteExpand}/>,
            noteIdDelete: noteId
        })

        this.blockExpandNote.current.style.display = "none"
    }

    hidePopUpExpand(e){
        this.setState({
            popup: ""
        })
        this.blockExpandNote.current.style.display = "block"
        e.stopPropagation()
    }

    commitDeleteNoteExpand(e){
        var form = new FormData
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("noteId", this.state.noteIdDelete)

        fetch(baseUrl+"/delete_note", {
            method: "POST",
            body: form
        }).then(res => res.text())
        .then(result => {
            if(result == 1){
                this.props.deleteDataNoteExpand(this.state.noteIdDelete)
                this.setState({
                    noteIdDelete:"",
                    popup: ""
                })
            }
        })
        
        this.setState({
            popup: ""
        })
        this.blockExpandNote.current.style.display = "block"
        e.stopPropagation()
    }

    changeNote(e){
        var v = e.target.value
        this.setState({
            textNote: v
        })
    }

    commitNote(){
        if(this.state.textNote != 0){
            this.submit()
        }else{
            popUpAlert("Note is empty")
        }
    }

    submit(){
        var userId = getCookieUserId()
        var moduleId = (this.props.moduleId === undefined) ? 0 : this.props.moduleId
        var bugsId = (this.props.bugsId === undefined) ? 0 : this.props.bugsId

        var form = new FormData()
        form.append("userId", userId)
        form.append("sessionId", getCookieSessionId())
        form.append("moduleId", moduleId)
        form.append("bugsId", bugsId)
        form.append("note", this.state.textNote)
        fetch(baseUrl+"/insert_note", {
            method: "POST",
            body: form
        }).then(res => res.json())
        .then(result => {
            //make sure tha result of api is json object type
            var jsonObject = result
            // this.state.dataNoteState.push(jsonObject)
            this.setState({
                textNote: "",
                dataNoteState:  this.state.dataNoteState,
                countNote: parseInt(this.state.countNote) + 1
            })

            //update data to redux
            this.props.appendDataNoteExpand(jsonObject, bugsId, moduleId)
            this.props.updateDataModuleNote(moduleId, "add")
        })
    }

    render(){

        const styleExpand = {width: "600px", height: "450px", background: "#FFF", position: "fixed", zIndex: "1000"}
        var no = 0
        const data = this.props.dataNote.map(dt => {
            var moduleId = (this.props.moduleId === undefined) ? 0 : this.props.moduleId
            var bugsId = (this.props.bugsId === undefined) ? 0 : this.props.bugsId
            if(dt.isDelete != 'Y'){
                if(bugsId == 0){
                    if(dt.moduleId == moduleId){
                        no++
                        console.log(no)
                        return <Row key={no}
                                    no={no}
                                    note={dt.note}
                                    noteId={dt.noteId}
                                    createdDate={dt.createdDate}
                                    deleteNote={this.deleteNote}
                                    pic={dt.pic}
                                    userId={dt.userId}
                                    userName={dt.userName}/>
                    }
                }else{
                    if(dt.bugsId == bugsId){
                        no++
                        console.log(no)
                        return <Row key={no}
                                           no={no}
                                           note={dt.note}
                                           noteId={dt.noteId}
                                           createdDate={dt.createdDate}
                                           deleteNote={this.deleteNote}
                                           pic={dt.pic}
                                           userId={dt.userId}
                                           userName={dt.userName}/>
                    }
                }
            }
        })

        return(
            <React.Fragment>
                {this.state.popup}
                <div onClick={this.props.hide} className="block" ref={this.blockExpandNote}></div>
                <div id="expand-note-base" onClick={this.expandClick} style={styleExpand}> 
                    <div id="expand-note-header" className="main-border-bottom" style={{padding: "10px", fontSize: "14px"}}>
                        <span className="bold">Note</span>
                        <button onClick={this.props.hide} className="second-font-color" style={{background: "none", float: "right"}}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </button>
                        <button onClick={this.showBorder} className="second-font-color" style={{background: "none", float: "right"}}>
                            <FontAwesomeIcon icon={faBorderAll}/>
                        </button>
                        <button onClick={this.hideBorder} className="second-font-color" style={{background: "none", float: "right"}}>
                            <FontAwesomeIcon icon={faBorderNone}/>
                        </button>
                    </div>
                    <div id="title-mb-note" className="main-border" style={{borderRadius: "5px", margin: "10px", padding: "10px", background: "#f5f5f5", overflow: "hidden"}}>
                        {
                            (this.props.bugsId === undefined)
                            ?
                                <div>
                                    <FontAwesomeIcon icon={faClipboardCheck} style={{color: "#d4ae2b"}}/>
                                    <span className="bold">&nbsp;{this.props.titleNote}</span>
                                </div>
                            :
                                <div>
                                    <div style={{float: "left", marginTop: "-1px"}}>
                                        <FontAwesomeIcon icon={faExclamationTriangle} style={{color: "red", fontSize: "12px"}}/>
                                    </div>
                                    <div style={{fontSize: "12px", marginLeft: "25px"}}>
                                        {this.props.titleNote}
                                    </div>
                                </div>
                        }
                        
                        
                    </div>
                    <div id="expand-note-main" style={{paddingLeft: "10px",paddingRight: "10px", paddingBottom: "5px"}}>
                        <table className="tb-note-expand" style={{width: "100%"}}>
                            <thead className="bold second-font-color tb-note-expand thead-exp-note">    
                                <tr>
                                    <th colSpan="2" className="tb-note-expand">Note</th>
                                    <th colSpan="2" className="main-border-left tb-note-expand">date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data}
                            </tbody>
                        </table>
                    </div>
                    <div id="footer-base-bugs" className="main-border-top" style={{overflow: "hidden", background: "#FFF"}}>
                        <textarea onChange={this.changeNote} onClick={this.txtNoteClick} value={this.state.textNote} className='main-border-right' placeholder="new note" style={{float: "left", width: "520px", border: "none", outline: "none", resize: "none", fontSize: "12px", padding: "5px", marginTop: "10px", marginBottom: "10px", marginLeft: "10px", borderRight: "#dcdbdb 1px solid", height: "20px"}}></textarea>
                        
                        <button onClick={this.commitNote} style={{fontSize: "12px", marginLeft: "5px", marginTop: "15px", background: "none", color: "blue"}}>Kirim</button>
                    </div>
                </div>
            </React.Fragment>
           
        )
    }
}

const mapStateToProps = state => {
    return{
        dataNote : state.dataNote
    }
}

const mapDispatchToProps = dispatch => {
    return{
        deleteDataNoteExpand : (noteId) => dispatch(deleteDataNote(noteId)),
        appendDataNoteExpand : (jsonObject, bugsId, moduleId) => dispatch(appendDataNote(jsonObject, bugsId, moduleId)),
        updateDataModuleNote : (moduleId, type) => dispatch(updateDataModuleNote(moduleId, type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(expand_note)