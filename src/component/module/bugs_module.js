import React from 'react'
import RowBugs from './row_bugs'
import NoData  from './no_data_bugs'
import CmenuBugs from './cmenu_bugs'
import PopConfirmDeleteBugs from './pop_confirm_delete_bugs'
import { baseUrl } from '../../const/const'
import {popUpAlert} from '../../function/function'

class bugs_module extends React.Component{

    constructor(){
        super()
        this.state = {
            bugsText: "",
            note:"",
            popDelete:""
        }

        this.chBugs = this.chBugs.bind(this)
        this.commitBugs = this.commitBugs.bind(this)
        this.contextMn = this.contextMn.bind(this)
        this.deleteBugs = this.deleteBugs.bind(this)
        this.confirmYesDelete = this.confirmYesDelete.bind(this)
        this.hideConfirm = this.hideConfirm.bind(this)
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

    contextMn(e, note){
        e.preventDefault()
        var x = e.clientX
        var y = e.clientY

        var bodyTable = document.getElementById("body-bugs-table")
        var child = bodyTable.children
        
        for(var i=0;i<child.length;i++){
            child[i].setAttribute("class","tr-selectable")
        }

        var row = e.target.parentElement
        row.setAttribute("class", "tr-selectable selected-row")

        this.setState({
            contextMn: <CmenuBugs left={x} top={y} deleteBugs={() => this.deleteBugs(note)}></CmenuBugs>
        })
    }

    deleteBugs(note){
        this.setState({
            note: note,
            popDelete: <PopConfirmDeleteBugs yesConfirm={this.confirmYesDelete} hideConfirm={this.hideConfirm}/>,
            contextMn: ""
        })
    }

    confirmYesDelete(){

        var form = new FormData()
        form.append("note", this.state.note)
        form.append("moduleId", this.props.moduleId)
        fetch(baseUrl+"/delete_bugs",{
            method: "POST",
            body: form
        })

        this.props.deleteBugs(this.state.note)
        this.setState({
            popDelete: ""
        })

        var bodyTable = document.getElementById("body-bugs-table")
        var child = bodyTable.children
        
        for(var i=0;i<child.length;i++){
            child[i].setAttribute("class","tr-selectable")
        }
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

    render(){
        
        const heightMain = (this.props.mainHeight - 40) - 30
        const data = this.props.dataBugs.map(dt => <RowBugs bugsText={dt.note} ctxMenu={this.contextMn}/>)
        const thereData = this.props.dataBugs.length

        return(
            <React.Fragment>
                {this.state.contextMn}
                {this.state.popDelete}
                <div style={{padding: "10px", height: heightMain+"px", overflowY: "scroll"}}>
                    <table style={{width: "85%"}}>
                        <thead>
                            <th colSpan="2" className="main-border-right bold second-font-color">Bugs name</th>
                            <th className="main-border-right bold second-font-color">Date</th>
                        </thead>
                        <tbody id="body-bugs-table">
                            {(thereData <= 0) ? <NoData/> : data}
                        </tbody>
                    </table>
                </div>
                <div id="footer-base-bugs" className="main-border-top" style={{height: "40px"}}>
                    <textarea rows="1" onChange={this.chBugs} value={this.state.bugsText} className='main-border-right' placeholder="new bugs" style={{float: "left", width: "420px", border: "none", outline: "none", resize: "none", fontSize: "12px", padding: "5px", marginTop: "10px", marginLeft: "10px", borderRight: "#dcdbdb 1px solid"}}></textarea>
                    <button onClick={this.commitBugs} style={{fontSize: "12px", marginLeft: "5px", marginTop: "15px", background: "none", color: "blue"}}>Kirim</button>
                </div>
            </React.Fragment>
        )
    }
}

export default bugs_module