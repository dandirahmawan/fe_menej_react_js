import React from 'react'
import Row from './row_module_detail'

class module_detail extends React.Component{

    render(){

        const data = this.props.data.map(dt => <Row rowClick={this.props.rowModuleClick} 
                                                    moduleName={dt.modulName} 
                                                    dueDate={dt.endDate}
                                                    moduleId={dt.modulId}
                                                />)

        return(
            <table style={{width: "100%", marginTop: "10px"}}>
                <thead className="bold second-font-color">
                    <tr>
                        <th colSpan="2" className="main-border-right">Name</th>
                        <th className="main-border-right">Due date</th>
                    </tr>
                </thead>
                <tbody>
                    {data}
                </tbody>
            </table>
        )
    }
}

export default module_detail