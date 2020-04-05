import React from 'react'
import {connect} from 'react-redux'
import { getCookieUserId, getCookieSessionId } from '../../function/function'
import {setDataBugs, deleteDataBugs, updateDataModuleBugs, closeDataBugs, uncloseDataBugs, updateDataModuleBugsUnclose,updateDataModuleBugsClose} from '../../redux/action'
import RowBugs from './row_bugs'
import { baseUrl } from '../../const/const'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBorderAll, faBorderNone, faFilter, faPlus} from '@fortawesome/free-solid-svg-icons'
import Detail from '../module/detail'
import NewBugs from './new_bugs'
import PopupConfirmation from '../popup_confirmation'
import Filter from './filter'
import {Spinner} from '../spinner'
import EditBugs from './edit_bugs'

class bugs extends React.Component{

    constructor(){
        super()
        this.showBorder = this.showBorder.bind(this)
        this.theadBugs = React.createRef()
        this.hideBorder = this.hideBorder.bind(this)
        this.moduleCLick = this.moduleCLick.bind(this)
        this.hidePopUp = this.hidePopUp.bind(this)
        this.newBugs = this.newBugs.bind(this)
        this.deleteBugs = this.deleteBugs.bind(this)
        this.yesDelete = this.yesDelete.bind(this)
        this.filter = this.filter.bind(this)
        this.unFilter = this.unFilter.bind(this)
        this.goFilter = this.goFilter.bind(this)
        this.closeBusg = this.closeBusg.bind(this)
        this.uncloseBugs = this.uncloseBugs.bind(this)
        this.yesClose = this.yesClose.bind(this)
        this.yesUnclose = this.yesUnclose.bind(this)
        this.editBugs = this.editBugs.bind(this)

        this.state = {
            isBorder: false,
            projectId:"",
            detailBase:"",
            popUp:"",
            bugsIdDelete: "",
            moduleId: "",
            filterBugs: "",
            moduleNameFilter: [],
            isPermition: false,
            isLoad: true
        }
    }

    componentDidMount(){
        var form = new FormData
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        form.append("projectId", this.props.projectId)
        fetch(baseUrl+"/bugs_project",{
            method: "POST",
            body: form
        }).then(res => res.json())
        .then(result => {          
            this.props.setDataBugs(result.bugs)
            this.setState({
                isLoad: false
            })
        })

        this.props.dataPermition.map(dt => {
            if(dt.permitionCode == 2 && dt.isChecked == 'Y'){
                this.setState({
                    isPermition: true
                })
            }
        })

        this.setState({
            projectId: this.props.projectId
        })
    }

    showBorder(){
        var c = document.getElementsByClassName("tb-border")
        for(var i = 0;i<c.length;i++){
            c[i].style.border = "#dcdbdb 1px solid"
        }

        var cr = this.theadBugs.current
        if(cr != null){
            cr.setAttribute("class", "second-background-grs main-border")
            cr.style.borderTop = "none"
        }

        this.setState({
            isBorder: true
        })
    }

    deleteBugs(bugsId, moduleId){
        this.setState({
            bugsIdDelete: bugsId,
            moduleId: moduleId,
            popUp: <PopupConfirmation 
                        hidePopUp={this.hidePopUp}
                        yesAction={this.yesDelete}
                        titleConfirmation="Delete bugs"
                        textPopup="Are you sure, you want delete this bugs ?"    
                    />
        })
    }

    yesDelete(){
        var form = new FormData
        form.append("bugsId", this.state.bugsIdDelete)
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())

        fetch(baseUrl+"/delete_bugs", {
            method: 'POST',
            body: form
        }).then(res => res.status)
        .then(result => {
            if(result == 200){
                this.props.deleteDataBugs(this.state.bugsIdDelete)
                this.props.updateDataModule(this.state.moduleId)
                this.hidePopUp()
            }
        })
    }

    yesClose(){
        let form = new FormData()
        form.append("bugsId", this.state.bugsIdDelete)
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        fetch(baseUrl+"/close_bugs", {
            method: "POST",
            body: form
        }).then(response => response.text())
            .then(result => {
                this.props.closeDataBugs(this.state.bugsIdDelete)
                this.props.updateDataModuleBugsClose(this.state.moduleId)
                this.hidePopUp()
            })
    }

    yesUnclose(){
        let form = new FormData()
        form.append("bugsId", this.state.bugsIdDelete)
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())
        fetch(baseUrl+"/unclose_bugs", {
            method: "POST",
            body: form
        }).then(response => response.text())
            .then(result => {
                this.props.uncloseDataBugs(this.state.bugsIdDelete)
                this.props.updateDataModuleBugsUnclose(this.state.moduleId)
                this.hidePopUp()
            })
    }

    closeBusg(bugsId, moduleId){
        this.setState({
            bugsIdDelete: bugsId,
            moduleId: moduleId,
            popUp: <PopupConfirmation
                hidePopUp={this.hidePopUp}
                yesAction={this.yesClose}
                titleConfirmation="Close bugs"
                textPopup="Are you sure, you want close bugs ?"
            />
        })
    }

    uncloseBugs(bugsId, moduleId){
        this.setState({
            bugsIdDelete: bugsId,
            moduleId: moduleId,
            popUp: <PopupConfirmation
                hidePopUp={this.hidePopUp}
                yesAction={this.yesUnclose}
                titleConfirmation="Unclose bugs"
                textPopup="Are you sure, you want unclose bugs ?"
            />
        })
    }

    hideBorder(){
        var c = document.getElementsByClassName("tb-border")
        for(var i = 0;i<c.length;i++){
            c[i].style.border = "none"
        }
        
        var cr = this.theadBugs.current
        if(cr != null){
            cr.setAttribute("class", "")
            cr.style.borderTop = "none"
        }

        this.setState({
            isBorder: false
        })
    }

    moduleCLick(moduleId){
        this.setState({
            detailBase: <Detail modulId={moduleId} projectId={this.props.projectId} close={this.hidePopUp}></Detail>
        })
    }

    hidePopUp(){
        this.setState({
            detailBase: "",
            popUp: ""
        })
    }

    filter(){
        this.setState({
            filterBugs:  <Filter 
                            unFilter={this.unFilter}
                            filterGo={this.goFilter}
                            />
        })
    }

    unFilter(){
        this.setState({
            filterBugs: ""
        })
    }

    goFilter(arrModuleName){
        this.setState({
            moduleNameFilter: arrModuleName,
            filterBugs:""
        })
    }

    newBugs(){
        this.setState({
            popUp: <NewBugs 
                        hide={this.hidePopUp}
                        projectId={this.state.projectId}
                    />
        })
    }

    editBugs(bugsId, moduleId, textBugs){
        this.setState({
            popUp: <EditBugs
                    bugsId={bugsId}
                    textBugs={textBugs}
                    cancel={this.hidePopUp}/>
        })
    }

    render(){
        const data = this.props.dataBugsRedux.map(dt => {
            if(dt.isDelete != 'Y'){
                if(this.state.moduleNameFilter.length > 0){
                    var idx = this.state.moduleNameFilter.indexOf(dt.modulName)
                    if(idx != -1){
                        return <RowBugs
                                    bugs={dt.note}
                                    bugsId={dt.bugsId}
                                    moduleName={dt.modulName}
                                    moduleId={dt.modulId}
                                    moduleCLick={this.moduleCLick}
                                    isBorder={this.state.isBorder}
                                    countNote={dt.countNote}
                                    deleteBugs={this.deleteBugs}
                                    createDate={dt.createDate}
                                    isPermition={this.state.isPermition}
                                    closeBugs={this.closeBusg}
                                    uncloseBugs={this.uncloseBugs}
                                    pic={dt.pic}
                                    editBugs={this.editBugs}
                                />
                    }
                }else{
                    return <RowBugs
                                bugs={dt.note}
                                bugsId={dt.bugsId}
                                moduleName={dt.modulName}
                                moduleId={dt.modulId}
                                moduleCLick={this.moduleCLick}
                                isBorder={this.state.isBorder}
                                countNote={dt.countNote}
                                deleteBugs={this.deleteBugs}
                                createDate={dt.createDate}
                                bugStatus={dt.bugStatus}
                                isPermition={this.state.isPermition}
                                closeBugs={this.closeBusg}
                                uncloseBugs={this.uncloseBugs}
                                pic={dt.pic}
                                editBugs={this.editBugs}
                            />
                } 
            }
            
        })

        return(
            <React.Fragment>
                {this.state.detailBase}
                {this.state.popUp}

                <div className="main-border-bottom bold" style={{paddingTop: "10px", paddingBottom: "10px", width: "80%"}}>
                    List Bugs
                    
                    <div style={{float: "right", marginTop: "2px"}}>
                        {
                            (this.state.isBorder)
                            ?
                                <button onClick={this.hideBorder} className="bold main-font-color" onClick={this.hideBorder} style={{float: "right", background: "none", fontSize: "12px"}}>
                                    <FontAwesomeIcon icon={faBorderNone}/> Hide border
                                </button>
                            :
                                <button onClick={this.showBorder} className="bold main-font-color" onClick={this.showBorder} style={{float: "right", background: "none", fontSize: "12px"}}>
                                <FontAwesomeIcon icon={faBorderAll}/> Show border</button>
                        }
                        {
                            (this.state.isPermition || getCookieUserId() == this.props.pic)
                            ?
                                <button onClick={this.newBugs} className="main-border-right" style={{float: "left", fontSize: "12px", background: "none"}}>
                                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Add
                                </button>
                            :
                                ""
                        }
                        <div style={{float: "left"}}>
                            <button onClick={this.filter} className="main-border-right" style={{float: "right", fontSize: "12px", background: "none"}}>
                                <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon> Module
                            </button>
                            {this.state.filterBugs}
                        </div>
                    </div>
                </div>
                <table style={{width: "80%"}}>
                    <thead ref={this.theadBugs}>
                        <tr>
                            <th className="bold second-font-color main-border-right" colSpan="2">Bugs</th>
                            <th className="bold second-font-color main-border-right">Module</th>
                            <th className="bold second-font-color main-border-right">Created By</th>
                            <th className="bold second-font-color" colSpan="2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (this.state.isLoad)
                            ? 
                                <tr>
                                    <td colSpan="5" className="bold font-second-color" style={{paddingTop: "20px",paddingBottom:"30px", fontSize: "14px", textAlign: "center", color: "#a2a2a2"}}>
                                        <Spinner size="25px" textLoader="load data.."/>
                                    </td>
                                </tr>
                            :
                                (data == "")
                                ?
                                    <tr>
                                        <td colSpan="5" className="bold font-second-color" style={{paddingTop: "20px",paddingBottom:"30px", fontSize: "14px", textAlign: "center", color: "#a2a2a2"}}><span style={{fontSize: "16px"}}>
                                            <i class="fa fa-exclamation-triangle"></i></span><br></br>No data
                                        </td>
                                    </tr>
                                :
                                    data
                        }
                        
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        dataBugsRedux: state.dataBugs
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setDataBugs: (jsonData) => dispatch(setDataBugs(jsonData)),
        deleteDataBugs: (bugsId) => dispatch(deleteDataBugs(bugsId)),
        updateDataModule: (moduleId) => dispatch(updateDataModuleBugs(moduleId, "remove")),
        closeDataBugs: (bugsId) => dispatch(closeDataBugs(bugsId)),
        uncloseDataBugs: (bugsId) => dispatch(uncloseDataBugs(bugsId)),
        updateDataModuleBugsClose: (moduleId) => dispatch(updateDataModuleBugsClose(moduleId)),
        updateDataModuleBugsUnclose: (moduleId) => dispatch(updateDataModuleBugsUnclose(moduleId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(bugs)