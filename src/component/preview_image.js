import React from 'react'
import {baseUrl} from '../const/const'
import {Spinner} from './spinner'

class preview_image extends React.Component{

    constructor(){
        super()
        this.spinner = React.createRef()
    }
    
    componentDidMount(){
        let scope = this
        var img = document.getElementById("img-preview")
        if(img.offsetHeight <= 0){
            var itvImg = setInterval(function(){
                var w = img.offsetWidth
                var wdw = window.innerWidth;
                var maxH = window.innerHeight - 100;
                img.style.maxHeight = maxH+"px"
                img.style.top = (window.innerHeight - img.offsetHeight) / 2+"px"
                img.style.left = (wdw - img.offsetWidth) / 2+"px"
                
                img.style.border = "2px solid #909090"
                img.style.borderRadius = "5px"
                if(w > 4){
                    scope.spinner.current.style.display = "none"
                    img.style.opacity = 1
                    window.clearInterval(itvImg)
                }
            }, 10);
        }else{
            var wdw = window.innerWidth;
            var maxH = window.innerHeight - 100;
            img.style.maxHeight = maxH+"px"
            img.style.top = (window.innerHeight - img.offsetHeight) / 2+"px"
            img.style.left = (wdw - img.offsetWidth) / 2+"px"
            img.style.opacity = 1
            img.style.border = "2px solid #909090"
            img.style.borderRadius = "5px"
        }
    }
    
    render(){

        // const urlImage = baseUrl+"/file/"+this.props.url
        const urlImage = this.props.url

        return(
            <React.Fragment>
                <div className="block-image" onClick={this.props.hideImage}></div>
                <div ref={this.spinner} style={{position: "fixed", zIndex: "10002", top: "45%", left: "50%"}}>
                    <Spinner size="20px"/>
                </div>
                <img id="img-preview"
                     style={{zIndex: "10002", position: "fixed", opacity: "0", background: '#919191'}}
                     src={urlImage}>
                </img>
            </React.Fragment>
        )
    }
}

export default preview_image