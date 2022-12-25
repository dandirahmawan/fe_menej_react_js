import React from 'react'
import { Spinner } from './spinner'

class email extends React.Component{
    render(){
        return(
            <div style={{background: "rgb(218 216 216)", padding: "20px"}}>
                <div style={{maxWidth: "280px", padding: "10px", margin: "auto", border: "1px solid #CCC", borderRadius: "5px", background: "#FFF"}}>
                    <table>
                        <tr> 
                            <td><img src="https://lh3.googleusercontent.com/36p-BqawKO7RQeOiKA3k559HIs73V7_Xgl8frdUwX9f4iZRA8_UqGJUnpysr98fukL9EekjeX5cJsnCLX3o9_8nZg0R-AyVqEyLETJtASmzZzUYL4Evh0q841YxEwoMbs-ZMe4_GyiS8WROr7CcZCuYMsE5ARvA1nyVIXThQCFfcbdy55aQkAMUA_T8xUcrS4tYQX1tWOLki0UV8BSw4UWpCCIqN9dfqn_bm1SzTUxAEUPqjSIgyBmhVkYyBgU4AeAxT_v1jlYptjVmX7W4vw4_zAl42kVZgzR4x_TE_ILc9bebh_1d0_lKlhW3_5XIVFhYyqgAbJIyyfAXIlqAPWMjv3Wf_7yLDf5_Wu9yFeCJr1h6qJ4kuUmDpkzoVLO_kdILBsvQhQDsQk80drF_R7QgVsPL4bx7ohxg-6JGRrDa9EnILQXkIh_5PcO1yXyHqvjms5tuJk2uJO3mu2ZpMP6SxT8t3T2eHkS82FtGY5wTu9xxCji4i07vnL6UvtyUA7tGSQDZEFJ-_t4ziPTRVIjxqkV0dPr0Dt-RN52zZaIrTeWxSRQcaAmuUb1scsk6Q4shiln4N9H2wpZQwJihrH1NcHsvxm73PgBHCDBUV5maLW-mLwUPvX7FnUQ7S9nRaHwTa4f6gf7uiKk65Epuis57H5y3JF-zF0aRcR0_DthfPtHJwoIIihcHj9TJ2Y-R8zIzepA=w1366-h656-ft"/></td>
                        </tr>
                        <tr> 
                            <td>
                                <div style={{fontSize: "20px"}}><strong>Invitation</strong></div>
                                <div style={{color: "rgb(156 156 156)"}}>By : Dandi rahmawan</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong style={{fontSize: "14px"}}>Hi, im Dandi rahmawan</strong><br/>
                                <div style={{fontSize:"11px"}}>
                                    I want invite you to colaborating in menej for project <strong>Menej development</strong><br/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td> 
                                <a href="http://localhost:3000/invitation?conf=+codeConfirm+">
                                    <button style={{padding: "7px",border:"none",background: "#386384",color: "#FFF",borderRadius: "3px", fontSize: "11px"}}>
                                        Accept
                                    </button>
                                </a>
                            </td>
                        </tr> 
                        <tr>
                            <td> 
                                <div style={{borderTop: "1px solid #CCC",color: "#a0a0a0",paddingTop: "10px",fontSize: "11px",marginTop: "10px"}}>
                                    This is email confirmation by menej for<br/>
                                    This email will expired in 24 hours.
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}

export default email