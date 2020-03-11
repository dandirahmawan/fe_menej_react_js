import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBold, faItalic, faListOl, faListUl} from '@fortawesome/free-solid-svg-icons'

class rich_input_text extends React.Component{

    constructor(){
        super()
        this.keyUp = this.keyUp.bind(this)
        this.textArea = React.createRef()
    }

    keyUp(e){
        // let code = e.keyCode
        // let elmP = document.createElement("P")
        // elmP.append(elmBr)
        // if(code == 13){
        //     this.textArea.current.append(elmP)
        // }
    }

    render(){
        return(
            <div>
                <div className="second-background-grs main-border">
                    <button style={{background: "none", fontSize: "16px", width: "40px", padding: "5px"}}>
                        <FontAwesomeIcon icon={faBold}/>
                    </button>
                    <button style={{background: "none", fontSize: "16px", width: "40px", padding: "5px"}}>
                        <FontAwesomeIcon icon={faItalic}/>
                    </button>
                    <button style={{background: "none", fontSize: "16px", width: "40px", padding: "5px"}}>
                        <FontAwesomeIcon icon={faListOl}/>
                    </button>
                    <button style={{background: "none", fontSize: "16px", width: "40px", padding: "5px"}}>
                        <FontAwesomeIcon icon={faListUl}/>
                    </button>
                </div>
                <div ref={this.textArea}
                     className="main-border"
                     style={this.props.style}
                     onKeyUp={this.keyUp}
                     contentEditable="true">
                    <p>{this.props.placeholder}</p>
                </div>
            </div>
        )
    }
}

export default rich_input_text