import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFilter, faLessThan, faCoins} from '@fortawesome/free-solid-svg-icons'
import Row from './row_filter_table_tab'
import { popUpAlert } from '../../../function/function'

class filter_table_tab extends React.Component{

    constructor() {
        super()
        this.state = {
            dataFilter: [],
            filterSelected: [],
            filterSearch: "",
            selectAll: false,
            btnFilter: null,
            inputRefs: [],
            filterValLength: 0
        }
        this.selectAllButton = React.createRef()
        this.setWrapperRef = React.createRef()

        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.hidePopUp = this.hidePopUp.bind(this)
        this.submitFilter = this.submitFilter.bind(this)
        this.search = this.search.bind(this)
        this.selectAll = this.selectAll.bind(this)
        this.setRef = this.setRef.bind(this)
        this.chooseFilter = this.chooseFilter.bind(this)
    }

    componentDidMount() {
        let btn = (this.props.btnFilter.tagName == "EM")
            ? this.props.btnFilter.parentElement : this.props.btnFilter
        
        document.addEventListener('mouseup', this.handleClickOutside);
        
        var listFilter  = []
        var selected    = []
        this.props.data.map(dt => {
            if(dt != "") {
                let value = dt
                if(value != 0){
                    let idx = listFilter.indexOf(value)
                    if (idx == -1) listFilter.push(value)

                    let idx1 = selected.indexOf(value)
                    if (idx1 == -1) selected.push(value)
                }
            }
        })
        
        this.setState({
            dataFilter      : listFilter,
            filterSelected  : (this.props.dataFiltered.length == 0) ? selected : this.props.dataFiltered,
            btnFilter       : btn
        })
    }

    handleClickOutside(event) {
        if (this.setWrapperRef.current && !this.setWrapperRef.current.contains(event.target)) {
            this.hidePopUp()
        }
    }

    hidePopUp(){
        this.props.cancel()
    }

    submitFilter(){
        let dataFilter = this.state.dataFilter
        let selected = this.state.filterSelected 
        let isAll = false

        if (this.state.filterSelected.length == 0){
            popUpAlert("No data selected")
        }else{
            if(selected.length >= dataFilter.length){
                isAll = true
                var currentClass = this.state.btnFilter.getAttribute("class")
                let setClass = currentClass.replace(" force-block", "")
                this.state.btnFilter.setAttribute("class", setClass)
            }else{
                let currentClass = this.state.btnFilter.getAttribute("class")
                this.state.btnFilter.setAttribute("class", currentClass+" force-block")
            }
            
            this.props.filter(this.state.filterSelected, this.props.column, isAll)
            this.props.cancel()
        }
    }

    chooseFilter(val){
        let selected = this.state.filterSelected
        let idx =  selected.indexOf(val)
        if(idx == "-1"){
            this.state.filterSelected.push(val)
        }else{
            this.state.filterSelected.splice(idx, 1)
        }

        this.setState({
            filterSelected: this.state.filterSelected
        })
    }

    search(e){
        let seletctAll = this.selectAllButton.current
        if(seletctAll.checked){
            seletctAll.click()
        }

        let val = e.target.value
        this.setState({
            filterSearch : val,
            filterValLength : 0
        })
    }

    selectAll(e){
        let isChecked = e.target.checked
        for(let i = 0;i<this.state.inputRefs.length;i++){
            let isCheckedItem = this.state.inputRefs[i].checked
            if(isChecked){
                if(!isCheckedItem) this.state.inputRefs[i].click()
            }else{
                if(isCheckedItem) this.state.inputRefs[i].click()
            }
        }
    }

    setRef(ref){
        let idx = this.state.inputRefs.indexOf(ref)
        if(idx == -1){
            this.state.inputRefs.push(ref)
        }
    }

    render(){
        const filterVal = this.state.dataFilter.map(dt => {
            let srcData = this.state.filterSearch.replace(/\\/g, "\\\\");
            if(dt.match(srcData)){
                this.state.filterValLength++
                if(this.state.filterSelected.indexOf(dt) == -1){
                    return <Row
                                isChecked={false}
                                refCheck={this.setRef}
                                data={dt} 
                                chooseFilter={this.chooseFilter}/>
                }else{
                    return <Row
                                isChecked={true}
                                refCheck={this.setRef}
                                data={dt} 
                                chooseFilter={this.chooseFilter}/>
                }
            }
        })

        return(
            <div ref={this.setWrapperRef} className="main-border"
                 style={{position: "absolute", zIndex: "1000", left: this.props.left+"px", top: this.props.top+"px", width: "230px", background: "#FFF"}}>
                <div className="bold main-border-bottom" style={{fontSize: "12px", padding: "5px"}}>
                    <FontAwesomeIcon icon={faFilter}/> filter
                </div>
                <div className="main-border-bottom" style={{padding: "5px"}}>
                    <input type="text"
                        onChange={this.search}
                        placeholder="search" 
                        id="txt-src-filter" 
                        style={{paddingLeft: "5px", paddingRight: "10px", fontSize: "12px", border: "none", width: "100%", boxSizing: "border-box"}}
                    />
                </div>
                <div style={{minHeight: "100px", maxHeight: "250px", overflowY: "scroll"}}>
                    <div className="tr-selectable main-border-bottom" style={{padding: "5px", cursor: "default"}}>
                        <div style={{width: "25px", height: "25px"}}>
                            <input type="checkbox"
                                defaultChecked 
                                ref={this.selectAllButton}
                                onClick={this.selectAll} 
                                style={{cursor: "pointer"}}/>
                        </div>
                        <div style={{marginLeft: "30px", marginTop: "-23px", fontSize: "12px"}}>
                            -- Select all --
                        </div>
                    </div>
                    {
                        (this.state.filterValLength > 0)
                        ?
                            filterVal
                        :
                            <div className="second-font-color bold" 
                                style={{fontSize: '12px', padding: "10px", textAlign: "center", marginTop: "20px"}}>Data not found</div>
                    }
                </div>
                <div className="main-border-top" style={{textAlign: "right", padding: "5px"}}>
                    <button onClick={this.submitFilter} className="btn-primary" style={{fontSize: "11px"}}>Ok</button>&nbsp;
                    <button onClick={this.hidePopUp} className="btn-secondary" style={{fontSize: "11px"}}>Cancel</button>
                </div>
            </div>
        )
    }
}

export default filter_table_tab



