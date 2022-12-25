import React from 'react'
import Row from './row_bugs_user_detail'

class bugs_detail extends React.Component{
    render(){

        const data = this.props.data.map(dt => <Row note={dt.note} date={dt.createDate}/>)

        return(
            <table style={{width: "100%", marginTop: "10px"}}>
                <thead className="bold second-font-color">
                    <th colSpan="2" className="main-border-right">Bugs</th>
                    <th className="main-border-right">Date</th>
                </thead>
                <tbody>
                    {data}
                </tbody>
            </table>
        )
    }
}

export default bugs_detail