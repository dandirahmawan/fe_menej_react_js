import React from 'react'
import {getCookieUserId} from "../../function/function";

class menu_tab extends React.Component{

    constructor(){
        super()
        this.setTabMenu = this.setTabMenu.bind(this)
    }

    componentDidMount(){
        // this.setTabMenu()
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.dataTab !== this.props.dataTab || nextProps.isRecreate){
            nextProps.resetDropDown()
            this.setTabMenu()
            nextProps.setRecreateMenuTabFalse()
        }
    }

    setTabMenu(){
        let scope = this
        let itv = setInterval(function(){
            let wWindow = window.innerWidth - 250
            let wMainMenu = document.getElementById("main-menu-module").offsetWidth
            let wInfo = document.getElementById("inf-project-module").offsetWidth
            let baseMenuTab = scope.props.baseMenuTab.current
            let w = wWindow - wMainMenu - wInfo

            //untuk keperluan dropdown menu tab
            let childMenu = baseMenuTab.children
            let dropdownMenuTab = childMenu[childMenu.length - 2]
            dropdownMenuTab.style.display = "none"

            let l = childMenu.length - 2
            let allWidth = 0
            for(let i = 0;i<l;i++){
                //button new tab
                let btnNewTab = childMenu[childMenu.length - 1]
                let widthbtnNewTab = btnNewTab.offsetWidth

                //set button block
                childMenu[i].style.display = "inline-block"
                let wEachMenu = childMenu[i].offsetWidth
                allWidth = parseInt(allWidth) + 20 + wEachMenu
                let allWidthMenu0 = parseInt(allWidth) + widthbtnNewTab + wMainMenu - wInfo
                // console.log(allWidth, allWidthMenu0, wEachMenu, w)

                if(allWidthMenu0 > w && i <= l){
                    childMenu[i].style.display = "none"
                    dropdownMenuTab.style.display = "inline-block"

                    scope.props.setDropDownData(scope.props.dataTab[i])
                }
            }
            clearInterval(itv)
        }, 100)
    }

    firstWord(userNameLogin){
        var a = userNameLogin.split(" ")
        var b = ""
        for(var i = 0;i<a.length;i++){
            b += a[i].substr(0, 1).toUpperCase()
        }
        return b
    }

    render(){

        const itemMenu = this.props.dataTab.map(dt => {
            let isYours = ""
            if (dt.userId != getCookieUserId()) {
                isYours = <div style={{
                    background: "#aeaeae",
                    padding: "3px",
                    fontSize: "8px",
                    borderRadius: "2px",
                    display: "inline-block",
                    color: "#FFF"
                }}>
                        {this.firstWord(dt.userName)}
                    </div>
            }

            return <a onClick={(e) => this.props.action(e, dt.tabId)}
                      className="bold main-menu-module second-font-color"
                      style={{
                          fontSize: "12px",
                          marginRight: "20px",
                          paddingBottom: "10px",
                          display: "none"
                      }}>
                {dt.tabName}&nbsp;{isYours}
            </a>
        })

        return(
            <React.Fragment>
                {itemMenu}
            </React.Fragment>
        )
    }
}

export default menu_tab