import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faUsers } from '@fortawesome/free-solid-svg-icons'
import { getCookieUserId } from '../../function/function'

class member_project extends React.Component{

    state = {
        isPermition: false
    }

    componentDidMount(){
        // console.log("---- member_project.js ----")
        this.props.dataPermition.map(dt => {
            if(dt.permitionCode === 4 && dt.isChecked === 'Y'){
                this.state.isPermition = true
            }
            return null
        })
    }

    render(){

        let countMember = 0
        const members = this.props.data.map(dt => {
            let initial = ""
            let name = dt.userName.split(" ")
            
            initial += name[0].substr(0, 1)
            initial += (name[1] != null && name[1] != "") ? name[1].substr(0, 1) : ""
            
            if(dt.isDelete != "Y")
            {
                countMember++
                return  <div className="bold"
                            style={{background: "rgb(95 165 185)",
                                color: "#FFF",
                                width: "30px", 
                                height: "30px", 
                                borderRadius: "100%", 
                                float: "left", 
                                marginRight: "3px", 
                                textAlign: "center", 
                                fontSize: "12px"}}><div style={{marginTop: "8px"}}>{initial}</div></div>
            }
        })

        return(
            <React.Fragment><div>
                <div className="second-font-color bold" style={{fontSize: "10px", padding: "5px", marginTop: "5px"}}>
                    Team project
                    {
                        (this.props.pic == getCookieUserId() || this.state.isPermition)
                        ?
                            <a onClick={this.props.manageMember} style={{float: "right"}}><FontAwesomeIcon icon={faCog}/> Manage</a>
                        : ""
                    }
                    
                </div>
                <div style={{overflow: "hidden", padding: "5px", paddingBottom: "10px"}}>
                    {
                        (countMember > 0) 
                        ?
                            members
                        :
                            <div className="second-font-color">
                                <div style={{float: "left", fontSize: "20px"}}><FontAwesomeIcon icon={faUsers}/></div>
                                <div style={{fontSize: "10px", float: "left", marginLeft: "10px"}}>
                                    No member in this project<br/>click manage to add member
                                </div>
                            </div>
                    }
                </div>
                </div>
            </React.Fragment>
        )
    }
}

export default member_project