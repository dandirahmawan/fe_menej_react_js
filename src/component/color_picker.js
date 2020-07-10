import React from 'react'
import {CompactPicker} from 'react-color'

class color_picker extends React.Component{

    // state = {
    //     background: null,
    // };

    handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
        this.props.select(color.hex)
    };

    render(){
        return(
            <div style={{position: "absolute"}}>
                <CompactPicker onChangeComplete={ this.handleChangeComplete }/>
            </div>
        )
    }
}

export default color_picker