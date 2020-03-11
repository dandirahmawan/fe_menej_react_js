import React from 'react'
import { runInThisContext } from 'vm';

class rename_project extends React.Component{

    constructor(prop){
        super()
        this.state = {
            nameProject : ''
        }
        this.changeNameProject = this.changeNameProject.bind(this)
    }

    componentDidMount(){
        var d = document.getElementById("pop_rename_project")
        var h = d.offsetHeight;
        var w = d.offsetWidth;
        var ww = window.innerWidth
        var wh = window.innerHeight

        var l = (ww - w) / 2
        var t = (wh - h) / 2
        d.style.top = t+"px"
        d.style.left = l+"px"

        this.setState({
            nameProject : this.props.name
        })
    }

    changeNameProject(e){
        var v = e.target.value
        this.setState({
            nameProject : v
        })
    }

    render(){
        return(
            <React.Fragment>
                <div onClick={this.props.hide} className="block"></div>
                <div id='pop_rename_project' class='pop' style={{position: "fixed", height: "auto", width: "350px", borderRadius: '5px', overflow: 'hidden'}}>
                    <div className="header-second-background bold" style={{padding: '10px', fontSize: '16px'}}>
                        Rename project
                    </div>
                    <div style={{background: "#FFF", width: "330px", height: "auto", padding: '10px'}}>
                        <input type='text' value={this.state.nameProject} onChange={this.changeNameProject} style={{fontSize: '14px', padding: '7px', width: '200px'}}></input>
                    </div>
                    <div style={{padding: '10px', textAlign: 'right', background: '#FFF'}}>
                        <button onClick={() => this.props.commit(this.state.nameProject)} style={{fontSize: '12px', width: '30px'}} className='btn-primary'>Ok</button>
                        <button onClick={this.props.hide} style={{fontSize: '12px', background: 'none'}}>Cancel</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default rename_project