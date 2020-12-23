import { faCog, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { baseUrl } from '../../const/const'

class item_user_list_member extends React.Component{

    state = {
        initial: null
    }

    componentDidMount(){
        let initial = ""
        let name = this.props.userName.split(" ")
        
        initial += name[0].substr(0, 1)
        initial += (name[1] != null && name[1] != "") ? name[1].substr(0, 1) : ""
        
        this.setState({
            initial: initial
        })
    }
    
    render(){
        return(
            <React.Fragment>
                <div className="main-color" style={{width: "30px", height: "30px", borderRadius: "100%", position: "relative"}}>
                    {
                        (this.props.picProfile != "" && this.props.picProfile !== undefined && this.props.picProfile != null)
                        ?
                            <div style={{background: "url("+baseUrl+"/pic_profile/"+this.props.picProfile+") no-repeat center", backgroundSize: "cover", width: "30px", height: "30px"}}/>
                        :
                            <div style={{textAlign: "center", color: "#FFF", marginTop: "8px", width: "30px", position: "absolute", fontSize: "12px"}}>
                                {this.state.initial}
                            </div> 
                    }
                </div>
                
                <div style={{marginLeft: "40px", marginTop: "-32px", display: "flex", alignItems: "center"}}>
                    <div style={{width: "100%"}}>
                        <span className="bold" style={{fontSize: "12px"}}>
                            {this.props.userName}
                        </span>
                        <div className="second-font-color" style={{fontSize: "11px"}}>
                            {this.props.emailUser}
                        </div>
                    </div>
                    <div className="bold" style={{fontSize: "10px", display: "flex", alignItems: "center"}}>
                        <a onClick={() => this.props.setPermition(this.props.userId)}><FontAwesomeIcon icon={faCog}/></a>
                        &nbsp;&nbsp;&nbsp;
                        <a onClick={() => this.props.deleteMember(this.props.userId, this.props.userName)}><FontAwesomeIcon icon={faTrashAlt}/></a>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default item_user_list_member