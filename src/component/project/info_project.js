import React from 'react'

class info_project extends React.Component{

    componentDidMount(){
        var d = document.getElementById("pop_info_project")
        var h = d.offsetHeight;
        var w = d.offsetWidth;
        var ww = window.innerWidth
        var wh = window.innerHeight

        var l = (ww - w) / 2
        var t = (wh - h) / 2
        d.style.top = t+"px"
        d.style.left = l+"px"
    }

    render(){
        return(
            <React.Fragment>
                <div onClick={this.props.hide} className="block"></div>
                <div id='pop_info_project' class='pop' style={{position: "fixed", height: "auto", width: "350px", borderRadius: '5px', overflow: 'hidden'}}>
                    <div className="header-second-background bold" style={{padding: '10px', fontSize: '16px'}}>
                        Project info
                    </div>
                    <div style={{background: "#FFF", width: "330px", height: "auto", padding: '10px'}}>
                        <table>
                            <tr>
                                <td style={{width: "100px"}}>
                                    <span className='bold' style={{fontSize: '12px'}}>Name</span>
                                </td>
                                <td>
                                    <span style={{fontSize: '12px'}}>
                                        {this.props.name}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span className='bold' style={{fontSize: '12px'}}>PIC</span>
                                </td>
                                <td><span style={{fontSize: '12px'}}>{this.props.pic}</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <span className='bold' style={{fontSize: '12px'}}>Created By</span>
                                </td>
                                <td><span style={{fontSize: '12px'}}>{this.props.createdBy}</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <span className='bold' style={{fontSize: '12px'}}>Create Date</span>
                                </td>
                                <td><span style={{fontSize: '12px'}}>{this.props.createdDate}</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <span className='bold' style={{fontSize: '12px'}}>Module</span>
                                </td>
                                <td><span style={{fontSize: '12px'}}>{this.props.countModule} Module</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <span className='bold' style={{fontSize: '12px'}}>Member</span>
                                </td>
                                <td><span style={{fontSize: '12px'}}>{this.props.countTeam} Member</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <span className='bold' style={{fontSize: '12px'}}>Bugs</span>
                                </td>
                                <td><span style={{fontSize: '12px'}}>{this.props.countBugs} bugs</span></td>
                            </tr>
                        </table>
                    </div>
                    <div className="header-second-background bold" style={{padding: '10px', textAlign: 'right'}}>
                        <button onClick={this.props.hide} style={{fontSize: '12px', width: '30px'}} className='btn-primary'>Ok</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default info_project