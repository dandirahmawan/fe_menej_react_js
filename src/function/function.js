import scsAlt from '../images/success_alt_inf.png'
import wrnAlt from '../images/warn_alert_inf.png'
import GifLoader from '../gif/Rolling-1s-45px.gif'

export function testFunction(a){
    alert(a * 100);
}

export function getCookieUserId(){
    var c = document.cookie.split(";")
    var userId = "";
    for(var a = 0;a<c.length;a++){
        var d = c[a].split("=")
        if(d[0] == 'userId'){
            userId = d[1]
        }
    }
    return userId
}

export function getCookieSessionId(){
    var c = document.cookie.split(";")
    var sessionId = "";
    for(var a = 0;a<c.length;a++){
        var d = c[a].split("=")
        if(d[0].replace(" ", "") == 'sessionId'){
            sessionId = d[1]
        }
    }
    return sessionId
}

export function popUpAlert(message, type){
    var elm = document.getElementById("alert")
    if(elm != null){
        elm.remove()
    }

    var img = new Image()
    img.src = (type == 'success') ? scsAlt : wrnAlt
    img.style.width = "25px"

    var messageHtml = document.createElement("span")
    messageHtml.innerHTML = "<div class='bold' style='font-size: 11px;margin-top: 5px'>"+message+"</div>"

    var html = document.createElement("div")
    html.setAttribute("id", "alert")
    html.setAttribute("class", "alert main-border")
    html.style.textAlign = "center"
    html.style.padding = "15px"
    html.style.borderRadius = "5px"
    html.style.zIndex = "10000"
    html.append(img)
    html.append(messageHtml)
    document.body.append(html)

    var w = html.offsetWidth
    var l = (window.innerWidth - w) / 2

    elm = document.getElementById("alert")
    elm.style.left = l+"px"
    elm.style.top = "0px"
    var top = 0;
    var si = setInterval(
        function frame(){
            top++
            var top2 = top * 2
            elm.style.top = top2+"px"
            if(top > 25){
                clearInterval(si)
            }
        },
        1 
    )

    setTimeout(function(){
        elm.remove()
    }, 1500)
}

export function backHistory(){
    window.history.back();
}

export function getBaseUrl(){
    return "http://localhost:8081"
}

export function getLoaderImage(){
    var img = new Image
    img.src = GifLoader
    img.style.width = "25px"

    var l = document.createElement("div")
    l.setAttribute("class", "bold")
    l.innerText = "Load data.."
    l.style.color = "#a2a2a2"
    l.style.fontSize = "11px"

    var elm = document.createElement("div")
    elm.setAttribute("id", "loader-base")
    elm.style.marginTop = "30px"
    elm.style.textAlign = "center"
    elm.append(img)
    elm.append(l)

    return elm
}