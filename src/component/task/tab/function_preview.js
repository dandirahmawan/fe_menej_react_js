import React from 'react'
import FcImage from '../../../images/function_15.png'

class function_preview extends React.Component{
    
    constructor(){
        super()
        this.baseFunction = React.createRef()
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.itemSelect = this.itemSelect.bind(this)
    }

    componentDidMount(){
        document.addEventListener('mouseup', this.handleClickOutside);
        
        let top = parseInt(this.props.x) + 25
        let left = parseInt(this.props.y) + 15
        this.baseFunction.current.style.marginTop = top+"px"
        this.baseFunction.current.style.marginLeft = left+"px"
    }

    handleClickOutside(event) {
        if (this.baseFunction.current && !this.baseFunction.current.contains(event.target)) {
            this.props.hidePopUp()
        }
    }

    itemSelect(val){
        this.props.target.value = "="+val+"()"
        this.props.select(this.props.target, this.props.x, this.props.y, val)
    }

    render(){
        const data = dataFunction.map(dt => {
            return <div onClick={() => this.itemSelect(dt.functionName)} className="tr-selectable" style={{padding: "5px", paddingLeft: "10px", paddingRight: "10px", cursor: "pointer"}}>
                        <div className="second-font-color bold" style={{fontSize: "13px"}}>
                            <img style={{width: "15px"}} src={FcImage}/> {dt.functionName}
                        </div>
                        <div className="second-font-color" style={{fontSize: "11px"}}>
                            {dt.description}
                        </div>
                    </div>
        })

        return(
            <div ref={this.baseFunction} className="main-border" style={style.styleBase}>
                {/* <div className="bold main-border-bottom" style={{padding: "5px", fontSize: "12px"}}>Function</div> */}
                {data}
            </div>
        )
    }
}

const style = {
    styleBase : {
        width: "250px",
        background: "#FFF", 
        position: "absolute", 
        zIndex: "10002", 
        borderRadius: "3px",
    }
}

const dataFunction = [
    {
        functionName: "URL",
        description: "for add url in your data"
    },
    {
        functionName: "MOD",
        description: "for create module relation data"
    },
    {
        functionName: "DOC",
        description: "for create document file relation data"
    }
]

export default function_preview