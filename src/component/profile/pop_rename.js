import React from 'react'
import {getCookieSessionId, getCookieUserId, popCenterPosition, popUpAlert} from '../../function/function'
import {SpinnerButton} from '../spinner'
import {ApiFetch} from "../apiFetch"
import {EXIF} from 'exif-js'

class pop_rename extends React.Component{
    constructor(){
        super()
        this.state = {
            name: "",
            txtBtnSubmit: "submit",
            ort:"",
            srcImage: ""
        }
        this.refBtnSubmit = React.createRef()
        this.refInputFile = React.createRef()
        this.changeNameHandler = this.changeNameHandler.bind(this)
        this.submitRename = this.submitRename.bind(this)
        this.cpp = this.cpp.bind(this)
        this.changeImage = this.changeImage.bind(this)
    }

    componentDidMount(){
        popCenterPosition("pop_base_rename")
        this.setState({
            name: this.props.name
        })
    }

    changeNameHandler(e){
        let val = e.target.value
        this.setState({
            name: val
        })

        if(val === ""){
            this.refBtnSubmit.current.setAttribute("disable", "true")
            this.refBtnSubmit.current.style.opacity = 0.5
        }else{
            this.refBtnSubmit.current.setAttribute("disable", "false")
            this.refBtnSubmit.current.style.opacity = 1
        }
    }

    cpp(){
        this.refInputFile.current.click()
    }

    changeImage(e){
        let imgData = e.target.files[0]
        const scope = this
        EXIF.getData(imgData, function() {
            var allMetaData = EXIF.getAllTags(this)

            let reader = new FileReader()
            reader.readAsDataURL(imgData)
            reader.onload = function(e){
                let elm = document.getElementById("pic_profile_base")
                scope.setState({
                    ort : allMetaData.Orientation,
                    srcImage: e.target.result
                })

                elm.style.background = "url("+e.target.result+") no-repeat center"
                elm.style.backgroundSize = "cover"
                let ort = scope.state.ort
                if(ort == 6){
                    elm.style.transform = "rotate(90deg)"
                }else if(ort == 8){
                    elm.style.transform = "rotate(-90deg)"
                }else if(ort == 1){
                    elm.style.transform = "rotate(0deg)"
                }else if(ort === undefined){
                    elm.style.transform = "rotate(0deg)"
                }else{
                    elm.style.transform = "rotate(180deg)"
                }

                var img = new Image()
                img.src = e.target.result
                img.setAttribute("id", "img-to-cvs")
                img.style.display = "none"
                let baseImgCvs = document.getElementById("base-img-cvs")
                baseImgCvs.append(img)
            }
        })

        this.refBtnSubmit.current.setAttribute("disable", "false")
        this.refBtnSubmit.current.style.opacity = 1
    }

    submitRename(){
        let imgToCvs = document.getElementById("img-to-cvs")
        if(imgToCvs != null){
            var hi = imgToCvs.height
            var wi = imgToCvs.width

            var h1 = 100
            var h2 = 100 / (imgToCvs.width / imgToCvs.height)
            var w1 = 100
            var w2 = 100 / (imgToCvs.height / imgToCvs.width)
            var h =  (imgToCvs.height > imgToCvs.width) ? h1 : h2
            var w = (imgToCvs.width > imgToCvs.height) ? w1 : w2

            var h1Detail = 200
            var h2Detail = 200 / (imgToCvs.width / imgToCvs.height)
            var w1Detail = 200
            var w2Detail = 200 / (imgToCvs.height / imgToCvs.width)
            var hDetail =  (imgToCvs.height > imgToCvs.width) ? h1Detail : h2Detail
            var wDetail = (imgToCvs.width > imgToCvs.height) ? w1Detail : w2Detail

            var canvas = document.getElementById("pic_canvas")
            canvas.setAttribute("width", w+"px")
            canvas.setAttribute("height", h+"px")

            var ctx = canvas.getContext("2d");
            ctx.drawImage(imgToCvs, 0, 0, wi, hi, 0, 0, w, h)
            var dataurl = canvas.toDataURL('image/jpeg',90);

            //canvas for user detail
            var canvasDetail = document.getElementById("pic_canvas_detail")
            canvasDetail.setAttribute("width", wDetail+"px")
            canvasDetail.setAttribute("height", hDetail+"px")

            var ctx = canvasDetail.getContext("2d");
            ctx.drawImage(imgToCvs, 0, 0, wi, hi, 0, 0, wDetail, hDetail)
            var dataurlDetail = canvasDetail.toDataURL('image/jpeg',90);
        }else{
            var dataurlDetail = ""
            var dataurl = ""
        }


        let refBtn = this.refBtnSubmit.current
        let disable = refBtn.getAttribute("disable")
        let orientation = (this.state.ort !== "" && this.state.ort !== undefined) ? this.state.ort : 0
        if(disable === "false") {
            refBtn.style.opacity = "0.5"
            this.setState({
                txtBtnSubmit: <SpinnerButton size="15px"/>
            })

            let form = new FormData()
            form.append("userId", getCookieUserId())
            form.append("sessionId", getCookieSessionId())
            form.append("name", this.state.name)
            form.append("ort", orientation)
            form.append("base64", dataurl)
            form.append("base64Detail", dataurlDetail)
            ApiFetch("/rename_profile", {
                method: "POST",
                body: form
            }).then(res => res.text())
                .then(result => {
                    this.refBtnSubmit.current.style.opacity = 1
                    this.setState({
                        txtBtnSubmit: "Submit"
                    })

                    let jsonObject = JSON.parse(result)
                    this.props.submit(jsonObject)
                })
        }
    }

    render(){
        return(
            <React.Fragment>
                <div className="block"/>
                <div className="pop" id="pop_base_rename" style={{background: "#FFF", width: "400px", minHeight: "200px"}}>
                    <div className="main-border-bottom bold" style={{padding: "10px"}}>
                        Rename profile
                    </div>
                    <div style={{padding: "10px", paddingTop: "15px"}}>
                        <table>
                            <tbody>
                                <tr>
                                    <td/>
                                    <td>
                                        <div style={{minHeight: "60px"}}>
                                            <canvas id="pic_canvas" style={{display: "none"}}/>
                                            <canvas id="pic_canvas_detail" style={{display: "none"}}/>
                                            <div id="base-img-cvs"/>
                                            <div id="pic_profile_base" style={{background: "#CCC", height: "60px", width: "60px", borderRadius: "3px"}}></div>
                                            <div style={{marginLeft: "70px", marginTop: "-45px"}}>
                                                <div className="bold" style={{fontSize: "14px"}}>Dandi Rahmawan</div>
                                                <a onClick={this.cpp} className="bold" style={{fontSize: "11px"}}>Change pic profile</a>
                                                <div><input ref={this.refInputFile} onChange={this.changeImage} style={{display: "none"}} type="file"/></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="bold" style={{marginRight: "10px", fontSize: "12px"}}>Name</span>
                                    </td>
                                    <td>
                                        <input type="text" placeholder="name" onChange={this.changeNameHandler} value={this.state.name} className="bold" style={{padding: "10px", width: "200px", fontSize: "12px"}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td/>
                                    <td>
                                        <button ref={this.refBtnSubmit} onClick={this.submitRename} className="btn-primary" disable="true" style={{fontSize: "12px", minWidth: "40px", opacity: "0.5"}}>
                                        {this.state.txtBtnSubmit}
                                        </button>
                                        <button onClick={this.props.cancel} className="btn-secondary" style={{fontSize: "12px", marginLeft: "10px"}}>Cancel</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default pop_rename