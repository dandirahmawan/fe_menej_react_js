import React from 'react'
import {connect} from 'react-redux'
import { getCookieUserId, getCookieSessionId } from '../../function/function'
import {setDataBugs, deleteDataBugs, updateDataModuleBugs, closeDataBugs, uncloseDataBugs, updateDataModuleBugsUnclose,updateDataModuleBugsClose} from '../../redux/action'
import RowBugs from './row_bugs'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBorderAll, faBorderNone, faFilter, faPlus} from '@fortawesome/free-solid-svg-icons'
import Detail from '../task/detail_task/detail'
import NewBugs from './new_bugs'
import PopupConfirmation from '../popup_confirmation'
import Filter from './filter'
import {Spinner} from '../spinner'
import EditBugs from './edit_bugs'
import {ApiFetch} from '../apiFetch'
import Fetch from '../../function/fetchApi'

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

        var header = new Headers()
        header.append("sessionId", getCookieSessionId())
        header.append("userId", getCookieUserId());

        let fetch = new Fetch()
        fetch.post("/bugs_project", form).then(result => {
            try{
                this.props.setDataBugs(result.bugs)
                this.setState({
                    isLoad: false
                })
            }catch{
                /*noting happen*/
            }
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

        var header = new Headers()
        header.append("sessionId", getCookieSessionId())
        header.append("userId", getCookieUserId());

        let fetch = new Fetch()
        fetch.post("/delete_bugs", form).then(result => {
            try {
                if(result == 200){
                    this.props.deleteDataBugs(this.state.bugsIdDelete)
                    this.props.updateDataModule(this.state.moduleId)
                    this.hidePopUp()
                }
            } catch (error) {
                console.log(error)
            }
        })
    }

    yesClose(){
        let form = new FormData()
        form.append("bugsId", this.state.bugsIdDelete)
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())

        var header = new Headers()
        header.append("sessionId", getCookieSessionId())
        header.append("userId", getCookieUserId());

        let fetch = new Fetch()
        fetch.post("/clode_bugs", form).then(result => {
            try {
                this.props.closeDataBugs(this.state.bugsIdDelete)
                this.props.updateDataModuleBugsClose(this.state.moduleId)
                this.hidePopUp()
            } catch (error) {
                console.log(error)
            }
        })
    }

    yesUnclose(){
        let form = new FormData()
        form.append("bugsId", this.state.bugsIdDelete)
        form.append("userId", getCookieUserId())
        form.append("sessionId", getCookieSessionId())

        var header = new Headers()
        header.append("sessionId", getCookieSessionId())
        header.append("userId", getCookieUserId());
        
        let fetch = new Fetch()
        fetch.post("/unclose_bugs", form).then(result => {
            try {
                this.props.uncloseDataBugs(this.state.bugsIdDelete)
                this.props.updateDataModuleBugsUnclose(this.state.moduleId)
                this.hidePopUp()
            } catch (error) {
                /*noting happen*/
            }
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
                                    bugStatus={dt.bugStatus}
                                    isPermition={this.state.isPermition}
                                    closeBugs={this.closeBusg}
                                    uncloseBugs={this.uncloseBugs}
                                    pic={dt.pic}
                                    editBugs={this.editBugs}
                                    userName={dt.userName}
                                    createdByName={dt.createdByName}
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
                                userName={dt.userName}
                                createdByName={dt.createdByName}
                            />
                } 
            }
            
        })

        return(
            <React.Fragment>
                {this.state.detailBase}
                {this.state.popUp}

                <div className="main-border-bottom bold" style={{paddingTop: "10px", paddingBottom: "10px", width: "90%"}}>
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
                <table style={{width: "90%"}}>
                    <thead ref={this.theadBugs}>
                        <tr>
                            <th className="bold second-font-color main-border-right" colSpan="2">Bugs</th>
                            <th className="bold second-font-color main-border-right">Module</th>
                            <th className="bold second-font-color main-border-right">Assigned</th>
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
                                        <td colSpan="6" className="font-second-color" style={{paddingTop: "20px",paddingBottom:"30px", fontSize: "14px", textAlign: "center", color: "#a2a2a2"}}>
                                            <div style={{marginTop: "10px", marginTop: "25px", marginBottom: "100px"}}>
                                                <span style={{fontSize: "16px"}}>
                                                    <i class="fa fa-exclamation-triangle" style={{fontSize: "30px"}}></i>
                                                </span>
                                                <div className="bold" style={{marginTop: "10px", fontSize: '14px'}}>No data to display</div>
                                                <div style={{fontSize: "12px"}}>there's no data bugs in this project<br/>click + Add for create a new bugs</div>
                                            </div>
                                        </td>
                                    </tr> 
                                :
                                    data
                        }
                        
                    </tbody>
                </table>
                {/* <div className="main-border-bottom main-border-top" style={{width: "90%", fontSize: "10px"}}>
                    <div style={{padding: "10px", textAlign: "right"}}>
                        Modified by : <span className="bold">Dandi rahmawan</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Modified date : <span className="bold">10 Jan 2020</span>
                    </div>
                </div> */}
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