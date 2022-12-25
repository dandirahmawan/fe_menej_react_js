import React from 'react'
import UserItem from './user_item'
import {connect} from 'react-redux'
import {baseUrl} from '../const/const'
import {setTitleHader} from '../redux/action'
import InviteIcon from '../images/inviting.png'

class user extends React.Component{

    constructor(){
        super()
        this.state = {
            data:[]
        }
    }

    componentDidMount(){
        fetch(baseUrl+"/user")
            .then(res => res.json())
            .then((result) => {
                // console.log(result)
                this.setState({
                    data: result
                })
            })
    }

    render(){

        const dataView = this.state.data.map(dt => <UserItem/>)
        
        const styleUserItem = {
            width: "140px", 
            height: '160px', 
            marginTop:"10px", 
            background: "#FFF", 
            borderRadius: "5px", 
            float: "left", 
            marginRight: "10px", 
            padding: "10px",
        }

        const stylePicProfileList = {width: "60px", height: "60px", margin: "auto", marginTop: "20px", textAlign: "center", padding: "20px", background: "#eaeaea", border: "1px solid #CCC", borderRadius: "10px"}
        return(
            <div id='main-base-data'>
                {/* {dataView} */}
                {/* <div style={styleUserItem}>
                    <a><div style={stylePicProfileList}>
                        <img src={InviteIcon} style={{width: "60px"}}></img>
                    </div></a>
                </div> */}
                <table style={{width: "80%", marginTop: "10px"}}>
                    <thead>
                        <th className="main-border-right second-font-color bold">Name</th>
                        <th className="main-border-right second-font-color bold">Project</th>
                        <th className="main-border-right second-font-color bold">Moduled</th>
                        <th className="main-border-right second-font-color bold">Bugs</th>
                    </thead>
                    <tbody className="bold">
                        <tr className="tr-selectable" style={{paddingTop: "5px", paddingBottom: "5px"}}>
                            <td>
                                <div style={{width:"30px", height: "30px", borderRadius: "15px", background: "#CCC"}}>
                                </div>
                                <div style={{marginLeft: "35px", marginTop: "-28px"}}>
                                    Dandi rahmawan<br/>
                                    <span className="second-font-color" style={{fontSize: "11px"}}>dandirahmawan95@gmail.com</span>
                                </div>
                            </td>
                            <td>10 Project</td>
                            <td>10 Module</td>
                            <td>10 Bugs</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        title : state.title
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setTitle : dispatch(setTitleHader("User"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (user)