import React from 'react'

class item_base_select_user_privacy extends React.Component{

    constructor(){
        super()
        this.checkBox = React.createRef()
    }

    componentDidMount(){
        if(this.props.isSelected) {
            this.checkBox.current.checked = true
        }
    }

    render(){
        return(
            <div style={{padding: "10px", borderBottom: "1px solid #eaeaea"}}>
                <input ref={this.checkBox} type="checkbox" onClick={() => this.props.select(this.props.userId)}/>
                <div style={{fontSize: "12px", marginLeft: "25px", marginTop: "-20px"}}>
                    {this.props.userName}
                    <div className="bold second-font-color" style={{fontSize: "10px"}}>
                        {this.props.emailUser}
                    </div>
                </div>
            </div>
        )
    }
}

export default item_base_select_user_privacy