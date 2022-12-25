import React from 'react'
import DeleteImg from '../images/del_rc.png'
import EditImg from '../images/edit_rc.png'
import HandoverImg from '../images/ppl_rc.png'
import DismissImg from '../images/min_rc.png'
import InfoImg from '../images/info_dtl.png'

class contextMenuProject extends React.Component{
    render(){
        return(
            <div className="main-border" style={{background: "#FFF", height: "auto", width: "200px", position: "fixed", left: this.props.xp,top: this.props.yp, borderRadius: '3px',padding: '5px', zIndex: "1"}}>
                <div className='list-menu bold' style={{fontSize: '14px'}}>
                    <img src={InfoImg} style={{height: '18px', width: '18px', float: 'left', marginRight: '10px'}}/>
                    <a onClick={this.props.clickInfo} style={{color: "#8c8c8c"}}>Info</a>
                </div>

                {
                    (this.props.isKey == 'key') 
                    ?
                        <div>
                            <div className='list-menu bold' style={{fontSize: '14px'}}>
                                <img src={EditImg} style={{height: '18px', width: '18px', float: 'left', marginRight: '10px'}}/>
                                <a onClick={this.props.clickRename} style={{color: "#8c8c8c"}}>Rename</a>
                            </div>
                            <div className='list-menu bold' style={{fontSize: '14px'}}>
                                <img src={HandoverImg} style={{height: '18px', width: '18px', float: 'left', marginRight: '10px'}}/>    
                                <a onClick={this.props.clickHandover} style={{color: "#8c8c8c"}}>Handover</a>
                            </div>
                            <div className='list-menu bold' style={{fontSize: '14px'}}>
                                <img src={DeleteImg} style={{height: '18px', width: '18px', float: 'left', marginRight: '10px'}}/>
                                <a onClick={this.props.clickDelete} style={{color: "#8c8c8c"}}>Delete</a>
                            </div>
                        </div>
                    :
                        ""
                }

                
                <div className='list-menu bold' style={{fontSize: '14px'}}>
                    <img src={DismissImg} style={{height: '18px', width: '18px', float: 'left', marginRight: '10px'}}/>
                    <a  onClick={this.props.clickAction} style={{color: "#8c8c8c"}}>Dismiss</a>
                </div>
            </div>
        )
    }
}

export default contextMenuProject