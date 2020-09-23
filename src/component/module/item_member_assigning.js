import React, { createRef } from 'react'
import {baseUrl} from '../../const/const'

class item_member_assigning extends React.Component{

    checkBox = createRef()

    componentDidMount(){
        this.checkBox.current.checked = true
        if(this.props.isChecked){
            this.checkBox.current.checked = true;
        }else{
            this.checkBox.current.checked = false;
        }
    }

    render(){

        return(
            <a style={{color:"#000", textDecoration: "none"}}>
            <div className="list-item" style={{padding: "10px", overflow: "hidden"}}>
                <input type="checkbox" ref={this.checkBox} onClick={() => this.props.checkMember(this.props.userId)} style={{float: "left", marginTop: "6px", marginRight: "10px"}}></input> 

                <div style={{float: "left"}}>
                    <div style={{borderRadius: "100%", height: "30px", width: "30px", background: "#CCC", overflow: "hidden"}}>
                        {
                            (this.props.picProfile)
                            ?
                                <div style={{background: "url("+baseUrl+"/pic_profile/"+this.props.picProfile+") no-repeat center", backgroundSize: "cover", width: "30px", height: "30px"}}/>
                            :
                                ""
                        }
                    </div>
                    <div style={{marginLeft: "35px", marginTop: "-30px"}}>
                        <span className="bold" style={{fontSize: "12px"}}>{this.props.userName}</span>
                        <div className="reguler-font" style={{fontSize: "11px"}}>{this.props.userEmail}</div>
                    </div>
                </div>
            </div></a>
        )
    }
}

export default item_member_assigning