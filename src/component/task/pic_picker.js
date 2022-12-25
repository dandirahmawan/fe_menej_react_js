import React, {Component} from 'react'
import UserItemList from '../item_user_list'

class pic_picker extends Component{

    constructor(){
        super()
        this.basePicPicker = React.createRef()
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.select = this.select.bind(this)
    }

    componentDidMount(){
        console.log(this.props.dataTeam)
        document.addEventListener("click", this.handleClickOutside)
    }

    handleClickOutside(event) {
        if (this.basePicPicker.current && !this.basePicPicker.current.contains(event.target)) {
            this.props.hidePicPicker()
        }
    }

    select(userId){
        this.props.hidePicPicker()
        this.props.select(userId)
    }

    render(){

        const data = this.props.dataTeam.map(dt => {
            return <a onClick={() => this.select(dt.userId)} style={{textDecoration: "none"}}>
                        <div className="tr-selectable" style={{padding: "10px"}}>
                            <UserItemList userName={dt.userName} 
                                        picProfile={dt.picProfile}
                                        emailUser={dt.emailUser}/>
                        </div>
                    </a>
        }) 

        return(
            <div ref={this.basePicPicker} className="main-border" style={{position: "fixed", width: "250px", maxHeight: "250px", background: "#FFF"}}>
                <div className="bold main-border-bottom" style={{fontSize: "11px", padding: "10px"}}>Select project manager</div>
                <div>
                    {data}
                </div>
            </div>
        )
    }
}

export default pic_picker