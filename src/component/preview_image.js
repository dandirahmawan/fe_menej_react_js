import React from 'react'
import {baseUrl} from '../const/const'

class preview_image extends React.Component{
    
    componentDidMount(){
        var img = document.getElementById("img-preview")
        if(img.offsetHeight <= 0){
            var itvImg = setInterval(function(){
                var w = img.offsetWidth
                var wdw = window.innerWidth;
                var maxH = window.innerHeight - 100;
                img.style.maxHeight = maxH+"px"
                img.style.top = (window.innerHeight - img.offsetHeight) / 2+"px"
                img.style.left = (wdw - img.offsetWidth) / 2+"px"
                img.style.opacity = 1
                if(w > 0) window.clearInterval(itvImg)
            }, 10);
        }else{
            var w = img.offsetWidth
            var wdw = window.innerWidth;
            var maxH = window.innerHeight - 100;
            img.style.maxHeight = maxH+"px"
            img.style.top = (window.innerHeight - img.offsetHeight) / 2+"px"
            img.style.left = (wdw - img.offsetWidth) / 2+"px"
            img.style.opacity = 1
        }
    }
    
    render(){

        const urlImage = baseUrl+"/file/"+this.props.image

        return(
            <React.Fragment>
                <div className="block-image" onClick={this.props.hideImage}></div>
                <img id="img-preview" style={{zIndex: "10002", position: "fixed", opacity: "0"}} src={urlImage}></img>
            </React.Fragment>
        )
    }
}

export default preview_image