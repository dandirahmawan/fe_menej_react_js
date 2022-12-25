import React from 'react'
import PermitionItem from './permitionItem'

class permitionList extends React.Component{
    render(){

        const dataPermitionCodeRow  = this.props.permitionCode.map(dt => {
            return <PermitionItem
                        permitionName = {dt.permitionName}
                        permitionCode = {dt.permitionCode}
                        permitionDescription = {dt.permitionDescription}
                        listPermittion = {this.props.permitionList}
                        pic = {this.props.pic}
                    />
        })

        return(
            <div style={{float: "left", marginTop: "10px"}}>
                <div style={{borderLeft: "#dcdbdb 2px solid", paddingLeft: "10px"}}>
                    <em className="fa fa-folder main-font-color">&nbsp;&nbsp;</em>
                    <span className="bold main-font-color" style={{fontSize: "16px"}}>
                        {this.props.projectName}
                        <div style={{fontSize: "12px", marginTop: "5px"}}>
                        <i class="fa fa-user">&nbsp;</i>{this.props.picName}
                        </div>
                    </span>
                </div>
                
                <div style={{padding: "10px", overflow: "hidden", width: "80%", marginBottom: "20px"}}>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="2" className="bold second-font-color">Name</th>
                                <th className="bold second-font-color">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataPermitionCodeRow}
                        </tbody>
                    </table>
                </div> 
            </div>
        )
    }
}

export default permitionList