import React from 'react'
import RowBugs from './row_bugs'
import NoData  from './no_data_bugs'
// import CmenuBugs from './cmenu_bugs'
import PopConfirmDeleteBugs from './pop_confirm_delete_bugs'
import PopConfirmCloseBugs from './pop_confirm_close_bugs'
import PopupConfirmation from '../popup_confirmation'
import { baseUrl } from '../../const/const'
import {popUpAlert, getCookieUserId, getCookieSessionId} from '../../function/function'
import {deleteDataBugs, closeDataBugs, uncloseDataBugs} from '../../redux/action'
import {connect} from 'react-redux'
import EditBugs from '../bugs/edit_bugs'

class bugs_module extends React.Component{

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
        this.commitBugs = this.commitBugs.bind(this)
        this.deleteBugs = this.deleteBugs.bind(this)
        this.confirmYesDelete = this.confirmYesDelete.bind(this)
        this.hideConfirm = this.hideConfirm.bind(this)
        this.closeBugs = this.closeBugs.bind(this)
        this.confirmYesClose = this.confirmYesClose.bind(this)
        this.uncloseBugs = this.uncloseBugs.bind(this)
        this.confirmYesUnclose = this.confirmYesUnclose.bind(this)
        this.editBugs = this.editBugs.bind(this)
    }

    componentDidMount(){
        this.props.dataPermition.map(dt => {
            if(dt.permitionCode == 2){
                if(dt.isChecked == 'Y'){
                    this.setState({
                        isPermition: true,
                        picProject: this.props.picProject
                    })
                }
            }
        })
    }

    chBugs(e){
        this.setState({
            bugsText: e.target.value
        })
    }

    commitBugs(){
        if(this.state.bugsText == ""){
            popUpAlert("Description bugs is empty", "warning")
        }else{
            this.props.commitBugs(this.state.bugsText)
            this.state.bugsText = ""
        }
    }

    deleteBugs(bugsId){
        this.setState({
            bugsId: bugsId,
            popDelete: <PopupConfirmation
                            titleConfirmation="Delete Bugs"
                            textPopup="Are you sure, you want delete bugs ?" 
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

    closeBugs(bugsId){
        this.setState({
            bugsId: bugsId,
            popDelete: <PopupConfirmation
                            titleConfirmation="Close Bugs"
                            textPopup="Are you sure, you want close bugs ?" 
                            yesAction={this.confirmYesClose} 
                            hidePopUp={this.hideConfirm}/>
        })
    }

    uncloseBugs(bugsId){
        this.setState({
            bugsId: bugsId,
            popDelete: <PopupConfirmation
                            titleConfirmation="Unclose Bugs"
                            textPopup="Are you sure, you want unclose bugs ?" 
                            yesAction={this.confirmYesUnclose} 
                            hidePopUp={this.hideConfirm}/>
        })
    }

    confirmYesDelete(){
        var form = new FormData()
        form.append("bugsId", this.state.bugsId)
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        fetch(baseUrl+"/delete_bugs",{
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
        var form = new FormData()
        form.append("bugsId", this.state.bugsId)
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        fetch(baseUrl+"/close_bugs",{
            method: "POST",
            body: form
        }).then(res => res.text())
        .then(result => {
            this.setState({
                popDelete: ""
            })
            this.props.closeDataBugs(this.state.bugsId)
            this.props.closeBugs(this.state.bugsId)
        })
    }

    confirmYesUnclose(){
        var form = new FormData()
        form.append("bugsId", this.state.bugsId)
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        fetch(baseUrl+"/unclose_bugs",{
            method: "POST",
            body: form
        }).then(res => res.text())
        .then(result => {
            this.setState({
                popDelete: ""
            })
            this.props.uncloseDataBugs(this.state.bugsId)
            this.props.uncloseBugs(this.state.bugsId)
        })
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

    txtBugsClick(e){
        var t = e.target
        t.style.height = "40px"
    }

    render(){
        const heightMain = (this.props.mainHeight - 40) - 30
        const data = this.props.dataBugs.map(dt => {
            if(dt.isDelete != "Y")
            {
                return <RowBugs 
                        bugsId={dt.bugsId}
                        bugsText={dt.note}
                        createDate={dt.createDate}
                        isPermition={this.state.isPermition}
                        picProject={this.props.picProject}
                        deleteBugs={this.deleteBugs}
                        closeBugs={this.closeBugs}
                        uncloseBugs={this.uncloseBugs}
                        editBugs={this.editBugs}
                        bugStatus={dt.bugStatus}/> 
            }
        })
        const thereData = this.props.dataBugs.length

        return(
            <React.Fragment>
                {this.state.contextMn}
                {this.state.popDelete}
                <div style={{padding: "10px", height: heightMain+"px", overflowY: "scroll"}}>
                    <table style={{width: "100%"}}>
                        <thead>
                            <tr>
                                <th colSpan="2" className="main-border-right bold second-font-color">Bugs name</th>
                                <th className="main-border-right bold second-font-color">Date</th>
                            </tr>
                        </thead>
                        <tbody id="body-bugs-table">
                            {(thereData < 0) ? <NoData/> : data}
                        </tbody>
                    </table>
                </div>

                {
                    (this.props.picProject == getCookieUserId() || this.state.isPermition)
                    ?
                        <div id="footer-base-bugs" className="main-border-top" style={{overflow: "hidden", background: "#FFF"}}>
                            <textarea onChange={this.chBugs} onClick={this.txtBugsClick} value={this.state.bugsText} className='main-border-right' placeholder="new bugs" style={{float: "left", width: "520px", border: "none", outline: "none", resize: "none", fontSize: "12px", padding: "5px", marginTop: "10px", marginBottom: "10px", marginLeft: "10px", borderRight: "#dcdbdb 1px solid", height: "20px"}}>   
                            </textarea>
                            <button onClick={this.commitBugs} style={{fontSize: "12px", marginLeft: "5px", marginTop: "15px", background: "none", color: "blue"}}>
                                Kirim
                            </button>
                        </div>
                    :
                        ""
                }
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