import React, { createRef } from 'react'
import ReactDom from 'react-dom'
import RowBugs from './row_bugs'
import NoData  from '../no_data_bugs'
import {ApiFetch} from '../../apiFetch'
import PopupConfirmation from '../../popup_confirmation'
import {popUpAlert, getCookieUserId, getCookieSessionId} from '../../../function/function'
import {deleteDataBugs, closeDataBugs, uncloseDataBugs} from '../../../redux/action'
import {connect} from 'react-redux'
import EditBugs from '../../bugs/edit_bugs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

class bugs_module extends React.Component{

    readyOperate = false

    constructor(){
        super()
        this.state = {
            bugsText: "",
            note:"",
            bugsId:"",
            popDelete:"",
            isPermition: false,
            picProject:""
        }

        this.chBugs = this.chBugs.bind(this)
        this.commitChecklist = this.commitChecklist.bind(this)
        this.deleteBugs = this.deleteBugs.bind(this)
        this.confirmYesDelete = this.confirmYesDelete.bind(this)
        this.hideConfirm = this.hideConfirm.bind(this)
        this.confirmYesClose = this.confirmYesClose.bind(this)
        this.confirmYesUnclose = this.confirmYesUnclose.bind(this)
        this.editBugs = this.editBugs.bind(this)
        this.checkingBugs = this.checkingBugs.bind(this)
        
        this.btnCommit = createRef()
        this.parHgtxtArea = createRef()
    }

    componentDidMount(){
        this.props.dataPermition.map(dt => {
            if(dt.permitionCode == 2){
                if(dt.isChecked == 'Y'){
                    this.setState({
                        isPermition: true,
                        picProject: this.props.picProject,
                    })
                }
            }
        })
    }

    chBugs(e){
        this.setState({
            bugsText: e.target.value
        })

        if(e.target.value == 0){
            this.parHgtxtArea.current.innerText = "insert cheklist"
        }else{
            this.parHgtxtArea.current.innerText = e.target.value
        }
        
        let h = this.parHgtxtArea.current.offsetHeight
        h = h - 11
        e.target.style.height = h+"px"
    }

    commitChecklist(){
        let btn = this.btnCommit.current
        if(this.state.bugsText == ""){
            popUpAlert("Description bugs is empty", "warning")
        }else{
            ReactDom.render(<div className="second-font-color">Sending..</div>, btn)
            this.props.commitChecklist(btn, this.state.bugsText)
            this.state.bugsText = ""
        }
    }

    deleteBugs(bugsId){
        this.setState({
            bugsId: bugsId,
            popDelete: <PopupConfirmation
                            titleConfirmation="Delete Bugs"
                            textPopup="Are you sure, you want delete checklist data ?" 
                            yesAction={this.confirmYesDelete} 
                            hidePopUp={this.hideConfirm}/>
        })
    }

    editBugs(bugsId, bugs){
        this.setState({
            bugsId: bugsId,
            popDelete: <EditBugs
                            bugsId={bugsId}
                            textBugs={bugs}
                            cancel={this.hideConfirm}
                            commit={this.props.commitEditBugs}
                        />
        })
    }

    confirmYesDelete(){
        var form = new FormData()
        form.append("bugsId", this.state.bugsId)
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())

        ApiFetch("/delete_bugs",{
            method: "POST",
            body: form
        }).then(res => res.text())
        .then(result => {
            this.setState({
                popDelete: ""
            })

            var bodyTable = document.getElementById("body-bugs-table")
            var child = bodyTable.children
            
            for(var i=0;i<child.length;i++){
                child[i].setAttribute("class","tr-selectable")
            }
            this.props.deleteBugsRedux(this.state.bugsId)
            this.props.deleteBugs(this.state.bugsId)
        })
    }

    confirmYesClose(){
        // var form = new FormData()
        // form.append("bugsId", this.state.bugsId)
        // form.append("userId", getCookieUserId())
        // form.append("sessionId", getCookieSessionId())

        // ApiFetch("/close_bugs",{
        //     method: "POST",
        //     body: form
        // }).then(res => res.text())
        // .then(result => {
        //     this.setState({
        //         popDelete: ""
        //     })
        //     this.props.closeDataBugs(this.state.bugsId)
        //     this.props.closeBugs(this.state.bugsId)
        // })
    }

    confirmYesUnclose(){
        // var form = new FormData()
        // form.append("bugsId", this.state.bugsId)
        // form.append("userId", getCookieUserId())
        // form.append("sessionId", getCookieSessionId())

        // ApiFetch("/unclose_bugs",{
        //     method: "POST",
        //     body: form
        // }).then(res => res.text())
        // .then(result => {
        //     this.setState({
        //         popDelete: ""
        //     })
        //     this.props.uncloseDataBugs(this.state.bugsId)
        //     this.props.uncloseBugs(this.state.bugsId)
        // })
    }

    hideConfirm(){
        this.setState({
            popDelete: ""
        })

        var bodyTable = document.getElementById("body-bugs-table")
        var child = bodyTable.children

        for(var i=0;i<child.length;i++){
            child[i].setAttribute("class","tr-selectable")
        }
    }

    checkingBugs(bugsId){
        if(getCookieUserId() == this.props.picProject || this.state.isPermition){
            this.props.checkingBugs(bugsId)
        }else{
            popUpAlert("You did not have permition to change data checklist", "info")
        }
    }

    render(){
        let thereData = 0
        const data = this.props.dataBugs.map(dt => {
            if(dt.isDelete != "Y")
            {
                thereData++
                return <RowBugs 
                            bugsId={dt.bugsId}
                            bugsText={dt.note}
                            createDate={dt.createDate}
                            isPermition={this.state.isPermition}
                            picProject={this.props.picProject}
                            checkingBugs={this.checkingBugs}
                            deleteBugs={this.deleteBugs}
                            bugStatus={dt.bugStatus}/> 
            }
        })

        return(
            <React.Fragment>
                {this.state.contextMn}
                {this.state.popDelete}
                <div className="main-border-top" style={{padding: "10px", paddingRight: "22px", paddingLeft: "22px", marginTop: "5px"}}>
                    <div className="second-font-color bold" style={{fontSize: "10px", marginBottom : "3px"}}>Checklist</div>
                    <table style={{width: "100%"}}>
                        <tbody id="body-bugs-table">
                            {(thereData < 1) ? <NoData/> : data}
                        </tbody>
                    </table>
                    {
                        (this.props.picProject == getCookieUserId() || this.state.isPermition)
                        ?
                            <div id="footer-base-bugs" className="main-border input-info-mdl" style={{overflow: "hidden", marginTop: "10px", borderRadius: "4px"}}>
                                <textarea onChange={this.chBugs}
                                        value={this.state.bugsText}
                                        className='main-border-right' 
                                        placeholder="insert checklist" 
                                        style={{float: "left", width: "520px", border: "none", outline: "none", resize: "none", fontSize: "12px", padding: "5px", marginTop: "5px", marginBottom: "5px", marginLeft: "5px", borderRight: "#dcdbdb 1px solid", height: "15px", background: "none"}}>   
                                </textarea>
                                
                                <div ref={this.parHgtxtArea} 
                                    className="main-border" 
                                    style={{width: "520px", padding: "5px", fontSize: "12px", position: "absolute", background: "yellow", opacity: "0"}}>insert checklist</div>
                                
                                <button ref={this.btnCommit} 
                                        onClick={this.commitChecklist} 
                                        style={{fontSize: "12px", marginLeft: "5px", marginTop: "10px", background: "none", color: "blue", display: "flex"}}>
                                    {/* <FontAwesomeIcon icon={faPaperPlane}/> */}
                                    Send
                                </button>
                            </div>
                        :
                            ""
                    }
                </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        deleteBugsRedux : (bugsId) => dispatch(deleteDataBugs(bugsId)),
        closeDataBugs : (bugsId) => dispatch(closeDataBugs(bugsId)),
        uncloseDataBugs : (bugsId) => dispatch(uncloseDataBugs(bugsId)),
    }
}

export default connect('', mapDispatchToProps)(bugs_module)