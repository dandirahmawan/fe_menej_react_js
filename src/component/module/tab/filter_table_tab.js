import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFilter} from '@fortawesome/free-solid-svg-icons'

class filter_table_tab extends React.Component{

    constructor() {
        super()
        this.state = {
            filterData: [],
            filterSelected: []
        }
        this.setWrapperRef = React.createRef()
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.hidePopUp = this.hidePopUp.bind(this)
        this.submitFiler = this.submitFiler.bind(this)
    }

    componentDidMount() {
        document.addEventListener('mouseup', this.handleClickOutside);
        let scope = this
        let listFilter = []
        scope.props.data.map(dt => {
            if(dt != "") {
                let value = dt[scope.props.column]
                if(value != 0){
                    let idx = listFilter.indexOf(value)
                    if (idx == -1) listFilter.push(value)
                }
            }
        })

        scope.setState({
            filterData: listFilter
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

    submitFiler(){
        this.props.filter(this.state.filterSelected, this.props.column)
        this.props.cancel()
    }

    chooseFilter(val){
        let data = this.state.filterSelected
        let idx = data.indexOf(val)
        if(idx == "-1"){
            data.push(val)
        }else{
            data.splice(idx, 1)
        }
    }

    render(){

        const filterVal = this.state.filterData.map(dt => {
            return <div className="tr-selectable" style={{padding: "5px", cursor: "default"}}>
                        <div style={{width: "25px", height: "25px"}}>
                            <input type="checkbox" onClick={() => this.chooseFilter(dt)} style={{cursor: "pointer"}}/>
                        </div>
                        <div style={{marginLeft: "30px", marginTop: "-23px", fontSize: "12px"}}>
                            {dt}
                        </div>
                    </div>
        })

        return(
            <div ref={this.setWrapperRef} className="main-border"
                 style={{position: "absolute", zIndex: "1000", left: this.props.left+"px", top: this.props.top+"px", width: "200px", background: "#FFF"}}>
                <div className="bold main-border-bottom" style={{fontSize: "12px", padding: "5px"}}>
                    <FontAwesomeIcon icon={faFilter}/> filter
                </div>
                <div style={{minHeight: "100px", maxHeight: "250px", overflowY: "scroll"}}>
                    {filterVal}
                </div>
                <div className="main-border-top" style={{textAlign: "right", padding: "5px"}}>
                    <button onClick={this.submitFiler} className="btn-primary" style={{fontSize: "11px"}}>Ok</button>&nbsp;
                    <button onClick={this.hidePopUp} className="btn-secondary" style={{fontSize: "11px"}}>Cancel</button>
                </div>
            </div>
        )
    }
}

export default filter_table_tab



