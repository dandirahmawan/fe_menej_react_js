import { faPlus, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { connect } from 'react-redux'
import AddMember from '../add_member'
import TeamDetail from './teams_detail'

const Teams = (props) => {
    
    const [addMemberBse, setAddMemberBase] = useState(null)
    const refBase = React.createRef()

    useEffect(() => {
        // console.log(refBase.current)
        document.addEventListener("click", handleClickOutside)
    })

    const handleClickOutside = (event) => {
        if (refBase.current && !refBase.current.contains(event.target)) {
            props.hidePopUp()
        }
    }

    const add = () => {
        setAddMemberBase(<AddMember dataTeam={props.dataTeam} hide={hideAddMember}/>)
    }
    
    const hideAddMember = () => {
        setAddMemberBase("")
    }

    const selectUser = (userId, projectId) => {
        setAddMemberBase(<TeamDetail userId={userId} projectId={projectId} hide={hideDetail}/>)
    }

    const hideDetail = () => {
        setAddMemberBase("")
    }

    const dataTeam = props.dataTeam.map(dt => {
        return <a style={{textDecoration: "none"}} onClick={() => selectUser(dt.userId, dt.projectId)}>
                    <div className="main-border-bottom mn-tsk-main" style={{display: "flex", cursor: "pointer", padding: "15px", paddingTop: "10px", paddingBottom: "10px"}}>
                        <div style={{width: "30px", height: "30px", background: "#CCC", borderRadius: "100%"}}></div>
                        <div style={{marginLeft: "7px"}}>
                            <div className="bold">{dt.userName}</div>
                            <div className="second-font-color" style={{fontSize: "11px"}}>
                                {dt.emailUser}
                            </div>
                        </div>
                    </div>
                </a>
    })

    return(
        <Fragment>
            <div ref={refBase} className="main-border shadow" style={styles.bsTeams}>
                {addMemberBse}
                <div className="main-border-bottom" 
                    style={{background: "rgb(245, 245, 245)", 
                            padding: "15px", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "space-between"}}>
                    <div>
                        <FontAwesomeIcon icon={faUsers}/>&nbsp;<span className="bold">Teams</span>
                    </div>
                    <button onClick={add} className="btn-primary" style={{padding: "2px", minWidth: "20px"}}>
                        <FontAwesomeIcon style={{width: "8px"}} icon={faPlus}/>
                    </button>
                </div>
                <div style={{maxHeight: "350px", overflowY: "scroll"}}>
                    {dataTeam}
                </div>
            </div>
        </Fragment>
    )
}

const styles = {
    bsTeams: {
        background: "#FFF",
        position: "absolute",
        width: "280px",
        marginLeft: "-95px",
        marginTop: "5px"
    }
}

const mapStateToProps = state => {
    return{
        dataTeam : state.dataTeam
    }
}

export default connect(mapStateToProps) (Teams)