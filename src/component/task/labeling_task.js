import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Fragment } from 'react'
import { connect } from 'react-redux'
import { deleteLabel, setDataLabel } from '../../redux/action'
import { ApiFetch } from '../apiFetch'
import {square_light as SquareLight} from '../icon/icon'
import NewLabel from './new_label'

class labeling_task extends React.Component {

    state = {
        labelSelected: [],
        dataLabel: [],
        popup: ""
    }

    /*binding function*/
    setSelectedLabel    = this.setSelectedLabel.bind(this)
    select              = this.select.bind(this)
    ok                  = this.ok.bind(this)
    isChecked           = this.isChecked.bind(this)
    addLabel            = this.addLabel.bind(this)

    componentDidMount(){
        this.setSelectedLabel(this.props.labelSelected)
    }

    setSelectedLabel(){
        /*set module id for each data label*/
        const dataLabel = this.props.dataLabel.map(dt => {
            dt.moduleId = this.props.moduleId
            return dt
        })

        this.setState({
            labelSelected: this.props.labelSelected,
            dataLabel: dataLabel
        })
    }

    select(data){
        let nmLabel = data.label
        let newSelected = [...this.state.labelSelected]
        let idx = null
        let i = -1;

        newSelected.map(dt => {
            i++
            if(dt.label == nmLabel){
                idx = i
            }
        })

        if(idx != null){
            newSelected.splice(idx, 1)
        }else{
            /*set module id to label*/
            data.moduleId = this.props.moduleId
            newSelected.push(data)
        }

        this.setState({
            labelSelected: newSelected
        })
    }

    ok(){
        console.log(this.state.labelSelected)
        this.props.okLabel(this.state.labelSelected)
    }

    isChecked(label){
        // console.log("set is checked")
        let isChecked = false
        let data = this.state.labelSelected
        for(let i = 0;i<data.length;i++){
            let dt = data[i]
            if(dt.label == label){
                isChecked = true
                break
            }
        }

        return isChecked
    }

    addLabel(){
        this.setState({
            popup: <NewLabel projectId={this.props.projectId} 
                            cancel={() => this.setState({popup: ""})}/>
        })
    }

    deleteLabel = (label) => {
        // let i = 0
        // let ii = 0
        // let data = [...this.props.dataLabel]
        // data.map(dt => {
        //     /*delete json key*/
        //     delete dt["moduleId"]
        //     if(dt.label == label){
        //         ii = i
        //     }
        //     i++
        // })

        let form = new FormData()
        form.append("projectId", this.props.projectId)
        form.append("label", label)
        
        ApiFetch("/delete_label", {
            method: "POST",
            body: form
        }).then(res => res.json()).then(result => {
            let dataLabel = result.label
            this.props.setDataLabel(dataLabel)
            this.props.deleteLabel(label)
        })
    }

    render(){
        const data = this.props.dataLabel.map(dt => {
            let isChecked = this.isChecked(dt.label)
            
            return <div style={styles.labelBaseItem}>
                        {
                            (isChecked)
                            ?
                                <i onClick={() => this.select(dt)} className="fa fa-check-square ck-box-fa-checked" style={{cursor: "pointer"}} />
                            :
                                <a onClick={() => this.select(dt)}><SquareLight style={{fontSize: "15px"}}/></a>
                                // <i onClick={() => this.select(dt.label)} className="far fa-square" style={{fontSize: "14px", cursor: "pointer"}}/>
                        }
                        <div style={{...styles.labelItem, background: dt.color}}>
                            {dt.label}
                            <a onClick={() => this.deleteLabel(dt.label)}>
                                <FontAwesomeIcon style={{color: "#FFF"}} icon={faTrashAlt}/>
                            </a>
                        </div>
                    </div>
        })

        return(
            <Fragment>
                {this.state.popup}
                <div id="lt-bs-2xsr" className="main-border shadow" style={styles.baseLabeling}>
                    <div className="main-border-bottom" style={{padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <div className="bold">Set Label</div>
                        <a onClick={this.addLabel}>
                            <FontAwesomeIcon style={{fontSize: "14px"}} icon={faPlusCircle}/>
                        </a>
                    </div>
                    <div id="bs-dt-lbl" style={{padding: "10px", overflowY: "scroll", height: "140px"}}>
                        {
                            (this.props.dataLabel.length > 0)
                            ?
                                data
                            :
                                <div style={{textAlign: "center", marginTop: "20px"}}>
                                    <span style={{fontSize: "12px"}}>No data label</span><br/>
                                    <div className="regular-font" style={{marginTop: "3px"}}>
                                        please click <a onClick={this.addLabel}>
                                                    <FontAwesomeIcon style={{fontSize: "14px", color: "#CCC"}} icon={faPlusCircle}/>
                                                </a> icon<br/>to add new label
                                    </div>
                                </div>
                        }
                    </div>
                    <div className="main-border-top" style={{padding: "10px", textAlign: "right"}}>
                        <button onClick={this.ok} className="btn-primary" style={{fontSize: '11px'}}>Ok</button>
                        &nbsp;&nbsp;
                        <button onClick={() => this.props.cancel(true)} className="btn-secondary" style={{fontSize: '11px'}}>Cancel</button>
                    </div>
                </div>   
            </Fragment>
        )
    }
}

const styles = {
    baseLabeling : {
        width: "200px",
        height: "238px",
        position: "absolute",
        background: "#FFF",
        right: "-2px",
        top: "25px",
        zIndex: 1,
        borderRadius: "4px"
    },
    labelBaseItem:{
        display: "flex", 
        alignItems: "center",
        marginBottom: "3px"
    },
    labelItem: {
        color: "#FFF", 
        width: "100%", 
        marginLeft: "5px", 
        marginRight: "5px", 
        padding: "5px",
        borderRadius: "3px",
        display: "flex",
        justifyContent: "space-between"
    }
}

const mapStateToProps = state => {
    return{
        dataLabel: state.dataLabels
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setDataLabel : (data) => dispatch(setDataLabel(data)),
        deleteLabel : (labelName) => dispatch(deleteLabel(labelName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (labeling_task)
