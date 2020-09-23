import React from 'react'
import {baseUrl} from '../const/const'
import {Spinner} from './spinner'
import {checkBuffering} from '../function/function'

class preview_video extends React.Component{

    constructor(){
        super()
        this.spinner = React.createRef()
    }
    
    componentDidMount(){
        var vid = document.getElementById("video-preview")
        var vidb = document.getElementById("video-preview-base")
        // var startW = vid.offsetWidth
        var itvImg = setInterval(function(){
            let isBuffering = checkBuffering(vid)

            // var w = vid.offsetWidth
            var wdw = window.innerWidth;
            var maxH = window.innerHeight - 100;
            vid.style.maxHeight = maxH+"px"
            vid.style.top = (window.innerHeight - vid.offsetHeight) / 2+"px"
            vid.style.left = (wdw - vid.offsetWidth) / 2+"px"
            // vid.style.border = "2px solid #909090"
            
            vidb.style.maxHeight = maxH+"px"
            vidb.style.top = (window.innerHeight - vid.offsetHeight) / 2+"px"
            vidb.style.left = (wdw - vid.offsetWidth) / 2+"px"
            vidb.style.border = "1px solid #909090"
            vidb.style.borderBottom = "none"

            if(isBuffering){
                vidb.style.opacity = 1
                window.clearInterval(itvImg)
            }
        }, 10);
    }
    
    render(){

        const urlVideo = baseUrl+"/file/"+this.props.url

        return(
            <React.Fragment>
                <div className="block-image" onClick={this.props.hideVideo}></div>
                <div ref={this.spinner} style={{position: "fixed", zIndex: "10002", top: "45%", left: "50%"}}>
                    <Spinner size="20px"/>
                </div>
                <div id="video-preview-base" style={{zIndex: "10002", position: "fixed", opacity: "0"}}>
                    <div className="second-font-color" 
                        style={{background: "#FFF", 
                                padding: "10px", 
                                fontSize: "14px", 
                                marginTop: "-35px", 
                                marginLeft: "-1px",
                                marginRight: "-1px",
                                border: "1px solid #909090"}}>
                        <i className="fa fa-play-circle" style={{color: "red"}}/>&nbsp;&nbsp;
                        <span style={{fontSize: "12px"}}>{this.props.video}</span>
                    </div>
                    <video id="video-preview" autoPlay controls
                        src={urlVideo}>
                    </video>
                </div>
                
            </React.Fragment>
        )
    }
}

export default preview_video