import React from 'react'
import {connect} from 'react-redux'

class filter extends React.Component{
    
    constructor(){
        super()
        this.state = {
            dataFilter: [],
            dataFilterGo:[]
        }
    }

    componentDidMount(){
        var elmHd = document.getElementById("hd-filter").offsetHeight
        var elmFt = document.getElementById("ft-filter").offsetHeight
        var elmMn = document.getElementById("mn-filter")
        
        var arr = []

        var elmMnHg = 200 - elmHd - elmFt
        elmMn.style.height = elmMnHg+"px"

        this.props.dataBugs.map(dt => {
            var idx = arr.indexOf(dt.modulId)
            console.log(dt.isDelete)
            if(idx == -1 && dt.isDelete != "Y"){
                arr.push(dt.modulId)
                this.state.dataFilter.push(dt.modulName)
                this.setState({
                    dataFilter: this.state.dataFilter
                })
            }
        })
    }

    checkBox(data){
        this.state.dataFilterGo.push(data)
        this.setState({
            dataFilterGo: this.state.dataFilterGo
        })
    }

    render(){

        const data = this.state.dataFilter.map(dt => {
            return <tr className="tr-selectable" style={{borderBottom: "1px solid #f5f5f5"}}>
                        <td style={{width: "10px"}}>
                            <input onClick={() => this.checkBox(dt)} type="checkbox"/>
                        </td>
                        <td>{dt}</td>
                    </tr>
        })

        return(
            <div className="main-border" style={{background: "#FFF", height: "200px", width: "200px", position: "absolute", marginTop: "20px", borderRadius: "3px"}}>
                <div className="main-border-bottom" id="hd-filter" style={{padding: "5px", fontSize: "12px", background: "#f5f5f5"}}>
                    Filter
                </div>
                <div id="mn-filter" style={{overflowY: "scroll"}}>
                    <table className="regular-font" style={{width: "100%"}}>
                        <tbody>
                            {data}
                        </tbody>
                    </table>
                </div>
                <div id="ft-filter" className="main-border-top" style={{padding: "5px", textAlign: "right"}}>
                    <button onClick={() => this.props.filterGo(this.state.dataFilterGo)} className="btn-primary" style={{fontSize: "11px"}}>Go</button>
                    <button onClick={this.props.unFilter} className="btn-secondary" style={{fontSize: "11px", marginLeft: "10px"}}>Cancel</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        dataBugs : state.dataBugs
    }
}

export default connect(mapStateToProps) (filter)