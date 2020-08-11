import React from 'react'
import {CompactPicker} from 'react-color'

class color_picker extends React.Component{
    constructor(){
        super()
        this.base = React.createRef()
        this.handleClickOutside = this.handleClickOutside.bind(this)
    }

    componentDidMount(){
        document.addEventListener('mouseup', this.handleClickOutside);
        this.base.current.style.top = this.props.top
        this.base.current.style.left = this.props.left
    }

    componentWillReceiveProps(nextProps){
        if(this.position != nextProps){
            this.base.current.style.top = nextProps.top
            this.base.current.style.left = nextProps.left
        }
    }

    handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
        this.props.select(color.hex)
    }

    handleClickOutside(event) {
        if (this.base.current && !this.base.current.contains(event.target)) {
            this.props.hidePopUp()
        }
    }

    render(){
        return(
            <div ref={this.base} style={{position: "fixed", width: this.props.width}}>
                <CompactPicker onChangeComplete={ this.handleChangeComplete }/>
            </div>
        )
    }
}

export default color_picker