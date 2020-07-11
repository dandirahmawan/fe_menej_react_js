import React from 'react'

function row_filter_table_tab(props){
    return(
        <div className="tr-selectable bs-filter-item" style={{padding: "5px", cursor: "default"}}>
            <div style={{width: "25px", height: "25px"}}>
                {
                    (props.isChecked)
                    ?
                        <input ref={props.refCheck} type="checkbox" defaultChecked onChange={() => props.chooseFilter(props.data)} style={{cursor: "pointer"}}/>
                    :
                        <input ref={props.refCheck} type="checkbox" onChange={() => props.chooseFilter(props.data)} style={{cursor: "pointer"}}/>
                }
            </div>
            <div className="bs-val-filter" style={{marginLeft: "30px", marginTop: "-23px", fontSize: "12px"}}>
                {props.data}
            </div>
        </div>
    )
}

export default row_filter_table_tab