import React from 'react'
import { connect } from 'react-redux'
import {square_light as SquareLight} from '../icon/icon'

class labeling_task extends React.Component {

    state = {
        labelSelected: [],
        dataLabel: []
    }

    /*binding function*/
    setSelectedLabel    = this.setSelectedLabel.bind(this)
    select              = this.select.bind(this)
    ok                  = this.ok.bind(this)
    isChecked           = this.isChecked.bind(this)

    componentDidMount(){
        this.setSelectedLabel(this.props.labelSelected)
    }

    setSelectedLabel(){
        // let arr = []
        // this.props.labelSelected.map(dt => {
        //     arr.push(dt.label)
        // })
        
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
            newSelected.push(data)
        }

        this.setState({
            labelSelected: newSelected
        })
    }

    ok(){
        this.props.okLabel(this.state.labelSelected)
    }

    isChecked(label){
        console.log("set is checked")
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
                        </div>
                    </div>
        })

        return(
            <div className="main-border" style={styles.baseLabeling}>
                <div className="bold main-border-bottom" style={{padding: "10px"}}>
                    Set Label
                </div>
                <div style={{padding: "10px", overflowY: "scroll", height: "140px"}}>
                    {data}
                </div>
                <div className="main-border-top" style={{padding: "10px", textAlign: "right"}}>
                    <button onClick={this.ok} className="btn-primary" style={{fontSize: '11px'}}>Ok</button>
                    &nbsp;&nbsp;
                    <button onClick={() => this.props.cancel(true)} className="btn-secondary" style={{fontSize: '11px'}}>Cancel</button>
                </div>
            </div>   
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
        borderRadius: "4px",
        boxShadow: "-3px 3px 2px #e1e0ff, -2px -1px 0px #e1e0ff"
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
        borderRadius: "3px"
    }
}

const mapStateToProps = state => {
    return{
        dataLabel: state.dataLabels
    }
}

export default connect(mapStateToProps) (labeling_task)
