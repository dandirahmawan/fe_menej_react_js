import React from 'react'
import axios from 'axios'
import Logo from '../images/menej_285e8e.png'
const baseGolang = "http://localhost:8888"

class fetchApi {
    post = (url, param) => axios.post(url, param)
        .then(response => {
            let data = response.data
            return data
        }).catch(error => {
            let resp = error.response
            if(resp.status){
                if(resp.status == 401) this.expPage()
                if(resp.status == 404) this.notFoundApiPage()
            }

            return null
        })
    
    postGolang = (url, param) => axios.post(baseGolang+url, param)
        .then(response => {
            let data = response.data
            return data
        }).catch(error => {
            let resp = error.response
            if(resp.status){
                if(resp.status == 401) this.expPage()
                if(resp.status == 404) this.notFoundApiPage()
            }

            return null
        })

    get = (url, param) => axios.get(url, param)
        .then(response => {
            let data = response.data
            return data
        }).catch(error => {
            let resp = error.response
            if(resp.status){
                if(resp.status == 401) this.expPage()
                if(resp.status == 404) this.notFoundApiPage()
            }

            return null
        })

    getGolang = (url) => axios.get(baseGolang+url)
        .then(response => {
            let data = response.data
            return data
        }).catch(error => {
            let resp = error.response
            if(resp.status){
                if(resp.status == 401) this.expPage()
                if(resp.status == 404) this.notFoundApiPage()
            }

            return null
        })

    put = (url, param) => axios.put(url, param)
        .then(response => {
            let data = response.data
            return data;
        }).catch(error => {
            let resp = error.response
            if(resp.status){
                if(resp.status == 401) this.expPage()
                if(resp.status == 404) this.notFoundApiPage()
            }

            return null
        })

    putGolang = (url, param) => axios.put(baseGolang+url, param)
        .then(response => {
            let data = response.data
            return data
        }).catch(error => {
            let resp = error.response
            if(resp.status){
                if(resp.status == 401) this.expPage()
                if(resp.status == 404) this.notFoundApiPage()
            }

            return null
        })
        
    deleteGolang = (url, body) => axios.delete(baseGolang+url)
        .then(response => {
            let data = response.data
            return data
        }).catch(error => {
            let resp = error.response
            if(resp.status){
                if(resp.status == 401) this.expPage()
                if(resp.status == 404) this.notFoundApiPage()
            }

            return null
        })

    expPage = () => {
        let wrp = document.createElement("div")
        wrp.style.display = "flex"
        wrp.style.alignItems = "center"
        wrp.style.justifyContent = "center"
        wrp.style.position = "absolute"
        wrp.style.flexDirection = "column"
        wrp.style.width = "100%"
        wrp.style.height = "100%"
        wrp.style.background = "rgb(239, 239, 239)"

        let img = document.createElement("img")
        img.src = Logo
        img.style.marginBottom = "10px"
        img.style.width = "70px"

        let h1 = document.createElement("div")
        h1.innerText = "Seession is expired"
        h1.style.fontSize = "18px"
        h1.setAttribute("class", "bold")

        let h2 = document.createElement("div")
        h2.innerText = "Your session is expired, please click login button to login again"
        h2.style.fontSize = "12px"
        h2.style.marginTop = "5px"
        h2.setAttribute("class", "second-font-color")

        let containerButton = document.createElement("div")
        containerButton.setAttribute("class", "main-border-top")
        containerButton.style.marginTop = "10px"
        containerButton.style.paddingTop = "15px"
        
        let button = document.createElement("button")
        button.innerText = "Login"
        button.style.fontSize = "12px"
        button.style.width = "100px"
        button.setAttribute("class", "btn-primary")

        let link = document.createElement("a")
        link.href = "/logout"
        link.appendChild(button)
        containerButton.appendChild(link)

        let container = document.createElement("div")
        container.setAttribute("id", "ctr-exp-mn")
        container.setAttribute("class", "main-border")
        container.style.width = "200px"
        container.style.height = "200px"
        container.style.background = "#FFF"
        container.style.textAlign = "center"
        container.style.height = "auto"
        container.style.padding = "20px"
        
        container.appendChild(img)
        container.appendChild(h1)
        container.appendChild(h2)
        container.appendChild(containerButton)
        wrp.appendChild(container)

        let elm = document.getElementById("root")
        elm.innerHTML = "" /*set blank root*/
        elm.appendChild(wrp)
    }

    hideNotFoundApiPage = () => {
        let elm = document.getElementById("blck-404-pge-9kklo9") 
        elm.remove()
    }

    notFoundApiPage = () => {
        let wrp = document.createElement("div")
        wrp.setAttribute("id", "blck-404-pge-9kklo9")
        wrp.style.display = "flex"
        wrp.style.alignItems = "center"
        wrp.style.justifyContent = "center"
        wrp.style.position = "fixed"
        wrp.style.top = 0
        wrp.style.flexDirection = "column"
        wrp.style.width = "100%"
        wrp.style.height = "100%"
        wrp.style.background = "rgba(0, 0, 0, 0.5)"
        wrp.style.zIndex = 1000000000

        let img = document.createElement("img")
        img.src = Logo
        img.style.marginBottom = "10px"
        img.style.width = "70px"

        let h1 = document.createElement("div")
        h1.innerText = "Something Wrong"
        h1.style.fontSize = "18px"
        h1.setAttribute("class", "bold")

        let h2 = document.createElement("div")
        h2.innerText = "The system cannot processing your request"
        h2.style.fontSize = "12px"
        h2.style.marginTop = "5px"
        h2.setAttribute("class", "second-font-color")

        let containerButton = document.createElement("div")
        containerButton.setAttribute("class", "main-border-top")
        containerButton.style.marginTop = "10px"
        containerButton.style.paddingTop = "15px"
        
        let button = document.createElement("button")
        button.innerText = "Close"
        button.style.fontSize = "12px"
        button.style.width = "100px"
        button.setAttribute("class", "btn-primary")

        let link = document.createElement("a")
        link.onclick = this.hideNotFoundApiPage

        link.appendChild(button)
        containerButton.appendChild(link)

        let container = document.createElement("div")
        container.setAttribute("id", "ctr-exp-mn")
        container.setAttribute("class", "main-border")
        container.style.width = "200px"
        container.style.height = "200px"
        container.style.background = "#FFF"
        container.style.textAlign = "center"
        container.style.height = "auto"
        container.style.padding = "20px"
        
        container.appendChild(img)
        container.appendChild(h1)
        container.appendChild(h2)
        container.appendChild(containerButton)
        wrp.appendChild(container)

        let elm = document.getElementById("root")
        // elm.innerHTML = "" /*set blank root*/
        elm.appendChild(wrp)
    }
}

export default fetchApi
