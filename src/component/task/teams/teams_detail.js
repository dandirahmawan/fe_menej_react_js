import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import Row from '../row_permition'
import Fetch from '../../../function/fetchApi'
import {popUpAlert} from '../../../function/function'
import {SpinnerButton} from "../../spinner";

const Teams_detail = (props) => {
    const [fetch, setFetch] = useState(true)
    const [dataPermition, setDataPermition] =  useState([])
    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState("")
    const [picProfile, setPicProfile] = useState("")
    const [permitionSelected, setPermitionSelected] = useState([])
    const [userEmail, setUserEmail] = useState()
    
    // constructor(){
    //     super()
    //     this.state = {
    //         dataPermition: [],
    //         userId:"",
    //         userName:"",
    //         userEmail:"",
    //         picProfile:"",
    //         permitionSelected: []
    //     }
    //     this.checkClick = this.checkClick.bind(this)
    //     this.commitPermition = this.commitPermition.bind(this)
    // }

    useEffect(() => {
        if(fetch){
            fetchData()
        }
    })

    const fetchData = () => {
        var w = window.innerWidth
        var h = window.innerHeight
        var left = (w - 300) / 2
        var top = (h - 300) / 2
        var base = document.getElementById("base-permition")
        base.style.left = left+"px"
        base.style.top = top+"px"

        var baseHeader  = document.getElementById("head-base-permition")
        var baseMain    = document.getElementById("main-base-permition")
        var baseFooter  = document.getElementById("footer-base-permition")
        var basePermition = document.getElementById("base-permition")

        var headerHeight = baseHeader.offsetHeight
        var footerHeight = baseFooter.offsetHeight
        var heightMain = basePermition.offsetHeight - 20 - (parseInt(headerHeight) + footerHeight)
        baseMain.style.height = heightMain+"px"

        var form = new FormData()
        form.append('userId', props.userId)
        form.append('projectId', props.projectId)

        let fetch = new Fetch()
        fetch.post("/permition_project", form).then(result => {
            for(var i = 0;i<result.dataPermition.length;i++){
                if(result.dataPermition[i]['isChecked'] == 'Y'){
                    permitionSelected.push(result.dataPermition[i]['permitionCode'])
                }   
            }
            
            setFetch(false)
            setDataPermition(result.dataPermition)
            setUserId(result.dataUser.userId)
            setUserName(result.dataUser.userName)
            setUserEmail(result.dataUser.emailUser)
            setPicProfile(result.dataUser.picProfile)
        })

        // ApiFetch("/permition_project",{
        //     method: "POST",
        //     body: form
        // }).then(res => res.json())
        // .then(result => {
            
        //     //set ready permition to state.permitionSelected
        //     for(var i = 0;i<result.dataPermition.length;i++){
        //         if(result.dataPermition[i]['isChecked'] == 'Y'){
        //             permitionSelected.push(result.dataPermition[i]['permitionCode'])
        //         }   
        //     }
            
        //     setFetch(false)
        //     setDataPermition(result.dataPermition)
        //     setUserId(result.dataUser.userId)
        //     setUserName(result.dataUser.userName)
        //     setUserEmail(result.dataUser.emailUser)
        //     setPicProfile(result.dataUser.picProfile)
            
        //     // this.setState({
        //     //     dataPermition: result.dataPermition,
        //     //     userId: result.dataUser.userId,
        //     //     userName: result.dataUser.userName,
        //     //     userEmail: result.dataUser.emailUser,
        //     //     picProfile: result.dataUser.picProfile
        //     // })
        // })
    }

    const checkClick = (e, permitionCode) => {
        var t = e.target

        const newData = dataPermition.map(dt => {
            if(dt.permitionCode == permitionCode){
                if(t.checked == true){
                    dt.isChecked = "Y"
                    var idx = permitionSelected.indexOf(permitionCode)
                    if(idx == -1){
                        permitionSelected.push(permitionCode)
                        // setPermitionSelected(permitionSelected)
                    }
                }else{
                    dt.isChecked = "N"
                    var idx = permitionSelected.indexOf(permitionCode)
                    permitionSelected.splice(idx, 1)
                    // setPermitionSelected(permitionSelected)
                }
            }
            return dt
        })
        setDataPermition(newData)
        // setDataPermition(data => {
        //     data.map(dt => {
        //         if(dt.permitionCode == permitionCode){
        //             if(t.checked == true){
        //                 dt.isChecked = "Y"
        //                 var idx = permitionSelected.indexOf(permitionCode)
        //                 if(idx == -1){
        //                     permitionSelected.push(permitionCode)
        //                     // setPermitionSelected(permitionSelected)
        //                 }
        //             }else{
        //                 dt.isChecked = "N"
        //                 var idx = permitionSelected.indexOf(permitionCode)
        //                 permitionSelected.splice(idx, 1)
        //                 // setPermitionSelected(permitionSelected)
        //             }
        //         }
        //         return dt
        //     })
        //     setPermitionSelected(permitionSelected)
        //     return data
        // })

        // console.log(permitionSelected)
        // this.setState(prev => {
        //     const newData = prev.dataPermition.map(dt => {
        //         if(dt.permitionCode == permitionCode){
        //             if(t.checked == true){
        //                 dt.isChecked = "Y"
        //                 var idx = permitionSelected.indexOf(permitionCode)
        //                 if(idx == -1){
        //                     permitionSelected.push(permitionCode)
        //                 }
        //             }else{
        //                 dt.isChecked = "N"
        //                 var idx = permitionSelected.indexOf(permitionCode)
        //                 permitionSelected.splice(idx, 1)
        //             }
        //         }
        //         return dt
        //     })

        //     setDataPermition(newData)
        //     setPermitionSelected(permitionSelected)
        //     // return{
        //     //     dataPermition: newData,
        //     //     permitionSelected: this.state.permitionSelected
        //     // }
        // })
    }

    const commitPermition = (e) => {
        let t = e.target
        t.style.opacity = 0.5
        ReactDom.render(<SpinnerButton size="15px"/>, t)

        var form = new FormData()
        form.append('permition_code', permitionSelected)
        form.append('project_id', props.projectId)
        form.append('user_id', props.userId)
        
        let fetch = new Fetch()
        fetch.post("/set_permition", form).then(result => {
            if(result == "success"){
                popUpAlert("Permition succesfully updated", "success")
                props.hide()
            }
        })
        // ApiFetch("/set_permition", {
        //     method: "POST",
        //     body: form
        // }).then(res => res.text()).then(result => {
        //     if(result == "success"){
        //         popUpAlert("Permition succesfully updated", "success")
        //         props.hide()
        //     }
        // })
    }

    // render(){
    //     const styleBase = {
    //         width: "300px",
    //         background: "#FFF",
    //         permition: "fixed",
    //         height: "300px",
    //         position: "fixed",
    //         borderRadius: "5px"
    //     }

    const data = dataPermition.map(dt => {
        // let isChecked = "N"
        // // let permitionParam = this.props.dataPermition
        // if(dt.isChecked == "Y"){
        //     isChecked = "Y"
        // }else{
        //     // let idx = this.props.dataPermition.indexOf(dt.permitionCode)
        //     // if(idx != -1) isChecked = "Y"
        // }
        return <Row
                    permitionName={dt.permitionName}
                    permitionDescription={dt.permitionDescription}
                    permitionCode={dt.permitionCode}
                    isChecked={dt.isChecked}
                    checkClick={checkClick}
                />
    })

    return(
        <React.Fragment>
            <div className="block"></div>
            <div id="base-permition" className="main-border pop" style={styleBase}>
                <div id="head-base-permition" className="bold main-border-bottom" style={{padding: "10px", fontSize: "14px"}}>
                    Permition
                </div>
                <div id="main-base-permition" style={{padding: "10px",  overflowY: "scroll"}}>
                    <div style={{width: "30px", height: "30px", borderRadius: "15px", background: "#CCC", overflow: "hidden"}}>
                        {/* <div style={{background: "url("+baseUrl+"/pic_profile/121288"+picProfile+".jpg) center / cover no-repeat",
                            height: "30px",
                            width: "30px"}}/> */}
                    </div>
                    <div style={{marginLeft: "40px", marginTop: "-31px"}}>
                        <span className="bold" style={{fontSize: "12px"}}>
                            {userName}
                        </span>
                        <div className="second-font-color" style={{fontSize: "11px"}}>
                            {userEmail}
                        </div>
                    </div>
                    <table style={{marginLeft:"30px", marginTop: "10px"}}>
                        <tbody>
                            {data}
                        </tbody>
                    </table>
                </div>
                <div id="footer-base-permition" className="main-border-top" style={{padding: "10px", textAlign: "right"}}>
                    <button onClick={commitPermition} className="btn-primary" style={{fontSize: "12px"}}>Save</button>
                    <button onClick={props.hide} style={{fontSize: "12px", background: "none"}}>Cancel</button>
                </div>
            </div>
        </React.Fragment>
    )
}

const styleBase = {
    width: "300px",
    background: "#FFF",
    permition: "fixed",
    height: "300px",
    position: "fixed",
    borderRadius: "5px"
}

export default Teams_detail