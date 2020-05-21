import scsAlt from '../images/success_alt_inf.png'
import wrnAlt from '../images/warn_alert_inf.png'
import GifLoader from '../gif/Rolling-1s-45px.gif'

export function getCookieUserId(){
    var c = document.cookie.split(";")
    var userId = "";
    for(var a = 0;a<c.length;a++){
        var d = c[a].split("=")
        if(d[0] === 'userId'){
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
        if(d[0].replace(" ", "") === 'sessionId'){
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
    img.src = (type === 'success') ? scsAlt : wrnAlt
    img.style.width = "25px"

    var messageHtml = document.createElement("span")
    messageHtml.innerHTML = "<div class='bold' style='font-size: 11px;margin-top: 5px'>"+message+"</div>"

    var html = document.createElement("div")
    html.setAttribute("id", "alert")
    html.setAttribute("class", "alert main-border")
    html.style.textAlign = "center"
    html.style.padding = "15px"
    html.style.borderRadius = "5px"
    html.style.zIndex = "100000"
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
    return "http://localhost:8088"
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

export function popCenterPosition(idElement){
    var d = document.getElementById(idElement)
    var h = d.offsetHeight;
    var w = d.offsetWidth;
    var ww = window.innerWidth
    var wh = window.innerHeight

    var l = (ww - w) / 2
    var t = (wh - h) / 2
    d.style.top = t+"px"
    d.style.left = l+"px"
}

export function convertDate(date){
    var d = new Date(date)
    var dt = d.toLocaleDateString("id-ID");
    return dt
}

export function convertDate_dd_MMM_yyy(date){
    var dated = new Date(date)
    if(dated != "Invalid Date"){
        var month = parseInt(dated.getMonth()) + 1
        var monthName = ""
        
        if(month == 1) monthName = "January"
        if(month == 2) monthName = "February"
        if(month == 3) monthName = "March"
        if(month == 4) monthName = "April"
        if(month == 5) monthName = "May"
        if(month == 6) monthName = "June"
        if(month == 7) monthName = "July"
        if(month == 8) monthName = "August"
        if(month == 9) monthName = "September"
        if(month == 10) monthName = "October"
        if(month == 11) monthName = "November"
        if(month == 12) monthName = "December"
        return dated.getDate()+" "+monthName+" "+dated.getFullYear()
    }
}

export function tableHeaderRender(columJson, idElement, action, actionFilter){
    let elm = document.getElementById(idElement)
    let count = Object.keys(columJson).length;
    let thead0 = document.createElement("th")
    thead0.setAttribute("class", "th-tab bold second-font-color main-border-bottom second-background-grs")
    thead0.style.width = "20px"
    thead0.style.padding = "5px"
    thead0.paddingRight = "10px"
    thead0.style.textAlign = "left"
    thead0.style.marginLeft = "-1px"
    thead0.innerText = "No"
    elm.append(thead0)
    let wt = 20
    let w = 140
    let sumw = parseInt(140 * count) + (10 * parseInt(count + 1)) + 20

    for(let i = 0;i<count;i++){
        wt = parseInt(wt) + w
        let thead = document.createElement("th")
        thead.setAttribute("class", "th-tab bold second-font-color main-border-bottom second-background-grs")
        thead.style.width = w+"px"
        thead.style.padding = "5px"
        thead.style.textAlign = "left"
        thead.style.cursor = "pointer"
        thead.onmouseover = mouseOverTheadTab
        thead.onmouseleave = mouseLeaveTheadTab

        let elmBtn = document.createElement("a")
        elmBtn.onclick = () => action(thead, i)
        elmBtn.style.background = "none"
        elmBtn.style.height = "10px"
        elmBtn.style.float = "left"
        elmBtn.style.marginTop = "0px"
        elmBtn.setAttribute("class", "second-font-color")
        let fa = document.createElement("em")
        fa.setAttribute("class", "fa fa-arrows-h")

        let elmBtnFilter = document.createElement("a")
        elmBtnFilter.onclick = (e) => actionFilter(e, i)
        elmBtnFilter.style.background = "none"
        elmBtnFilter.style.height = "10px"
        elmBtnFilter.style.float = "left"
        elmBtnFilter.style.marginTop = "0px"
        elmBtnFilter.style.marginRight = "4px"
        elmBtnFilter.setAttribute("class", "second-font-color")
        let faFilter = document.createElement("em")
        faFilter.setAttribute("class", "fa fa-filter")

        elmBtn.append(fa)
        elmBtnFilter.append(faFilter)

        let divBaseBtn = document.createElement("div")
        divBaseBtn.style.float = "right"
        divBaseBtn.style.display = "none"
        divBaseBtn.append(elmBtnFilter)
        divBaseBtn.append(elmBtn)

        let divTitleColumn = document.createElement("div")
        divTitleColumn.style.marginRight = "26px"
        divTitleColumn.innerText = columJson[i]

        thead.append(divBaseBtn)
        thead.append(divTitleColumn)
        elm.append(thead)
    }
    elm.style.width = sumw+"px"
}

function mouseOverTheadTab(e){
    let child = e.target.children
    if(child[0] !== undefined) child[0].style.display = "block"
}

function mouseLeaveTheadTab(e){
    let child = e.target.children
    if(child[0] !== undefined) child[0].style.display = "none"
}