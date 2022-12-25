import React from 'react'

export default class logout extends React.Component{

    componentDidMount(){
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            name = name.replace(" ", "")
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        window.location.reload()
    }

    render(){
        return(
            <div style={{textAlign: "center", padding: "20px"}}>
                Logout...
            </div>
        )
    }
}