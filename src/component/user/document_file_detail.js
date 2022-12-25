import React from 'react'
import RowDocFile from './row_doc_file_user_detail'
import PreviewImage from '../preview_image'

class document_file_detail extends React.Component{
    render(){
        
        const data = this.props.data.map(dt => <RowDocFile rowClickDocFile={this.props.rowClickDocFile}
                                                           fileName={dt.fileName}
                                                           fileSize={dt.fileSize}/>)

        return(
            <React.Fragment>
                <table style={{width: "100%", marginTop: "10px"}}>
                    <thead className="bold second-font-color">
                        <tr>
                            <th colSpan="2" className="main-border-right">Name</th>
                            <th className="main-border-right">Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

export default document_file_detail