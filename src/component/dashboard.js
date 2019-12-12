import React from 'react'
import {testFunction} from '../function/function'
import {connect} from 'react-redux'
import { setTitleHader } from '../redux/action'

class dashboard extends React.Component{

    // test(){
    //     testFunction(1)
    // }
    componentDidMount(){
        // var isLoad = this.props.location.load
        // if(isLoad !== undefined){
        //     alert("dand")
        // }
        this.props.setTitleHader()
    }

    render(){
        return(
            <div id='main-base-data'>
                <h1>Dandi rahmawan</h1>
                <button onClick={() => testFunction(1)}>test fucntion</button>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        titleHeader : state.title
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setTitleHader : () => dispatch(setTitleHader("Dashboard"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(dashboard)