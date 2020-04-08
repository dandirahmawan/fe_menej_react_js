import React from 'react'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFolder, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
import RichInput from '../rich_input_text'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'react-trumbowyg/dist/trumbowyg.min.css'
import Trumbowyg from 'react-trumbowyg'
import { setTitleHader } from '../../redux/action'

class dashboard extends React.Component{

    constructor(){
        super()
        this.state = {
            noteText : ""
        }

        this.someCallback = this.someCallback.bind(this)
        this.submitNote = this.submitNote.bind(this)
    }

    componentDidMount(){
        this.props.setTitleHader()
        // var elmP = document.createElement("P")
        // elmP.innerHTML = "<br/>"
        // var elm = document.getElementById("react-trumbowyg")
        // elm.append(elmP)
        // elm.style.fontSize = "12px"
        // elm.style.padding = "10px"
        // elm.style.paddingLeft = "10px"
        // elm.style.paddingRight = "10px"

        // var elmClass = document.getElementsByClassName("trumbowyg-del-button ")
        // elmClass[0].remove()
    }

    someCallback(e){
        this.setState({
            noteText: e.target.innerHTML
        })
    }

    submitNote(){
        console.log(this.state.noteText)
    }

    render(){
        return(
            <div id='main-base-data'>
                <div className="flex-container" style={{marginTop: "10px"}}>
                    <div className="main-border">
                        <div className="bold" style={{padding: "10px"}}>Project</div>
                        <div className="bold second-font-color" valign="top" style={{paddingLeft: "10px"}}>
                            <div style={{float: "left", paddingTop: "10px"}}>
                                <FontAwesomeIcon style={{fontSize: "20px", color: "#d4ae2b"}} icon={faFolder}/>
                            </div>
                            <div style={{fontSize: "50px", float: "left", marginLeft: "10px"}}>9</div>
                        </div>
                    </div>
                    <div className="main-border">
                        <div className="bold" style={{padding: "10px"}}>Module</div>
                        <div className="bold second-font-color" style={{paddingLeft: "10px"}}>
                            <div style={{overflow:"hidden"}}>
                                <div style={{float: "left", paddingTop: "10px"}}>
                                    <i className="fa fa-clipboard" style={{fontSize: "20px", color: "#d4ae2b"}}></i>
                                </div>
                                <div style={{fontSize: "50px", float: "left", marginLeft: "10px"}}>29</div>
                            </div>
                        </div>
                    </div>
                    <div className="main-border">
                        <div className="bold" style={{padding: "10px"}}>Bugs</div>
                        <div className="bold second-font-color" style={{paddingLeft: "10px"}}>
                            <div style={{float: "left", paddingTop: "10px"}}>
                                <FontAwesomeIcon style={{fontSize: "20px", color: "red"}} icon={faExclamationTriangle}/>
                            </div>
                            <div style={{fontSize: "50px", float: "left", marginLeft: "10px"}}>121</div>
                        </div>
                    </div>
                    <div className="main-border">
                        <div className="bold" style={{padding: "10px"}}>Doc & File</div>
                        <div className="bold second-font-color" style={{paddingLeft: "10px"}}>
                            <div style={{float: "left", paddingTop: "10px"}}>
                                <i className="fa fa-file" style={{fontSize: "20px", color: "rgb(212, 174, 43)"}}></i>
                            </div>
                            <div style={{fontSize: "50px", float: "left", marginLeft: "10px"}}>121</div>
                        </div>
                    </div>
                </div>
                {/*<div style={{width: "300px", marginTop: "50px", minHeight: "200px"}}>*/}
                    {/*<RichInput placeholder="type note here" style={{fontSize: "12px", paddingLeft: "5px", paddingRight: "5px"}}/>*/}
                {/*</div>*/}
                {/*<div style={{fontSize: "12px", width: "500px"}}>*/}
                    {/*<CKEditor*/}
                        {/*editor={ ClassicEditor }*/}
                        {/*data="<p>Hello from CKEditor 5!</p>"*/}
                        {/*onInit={ editor => {*/}
                            {/*// You can store the "editor" and use when it is needed.*/}
                            {/*console.log( 'Editor is ready to use!', editor );*/}
                        {/*} }*/}
                        {/*onChange={ ( event, editor ) => {*/}
                            {/*const data = editor.getData();*/}
                            {/*console.log( { event, editor, data } );*/}
                        {/*} }*/}
                        {/*onBlur={ ( event, editor ) => {*/}
                            {/*console.log( 'Blur.', editor );*/}
                        {/*} }*/}
                        {/*onFocus={ ( event, editor ) => {*/}
                            {/*console.log( 'Focus.', editor );*/}
                        {/*} }*/}
                    {/*/>*/}
                {/*</div>*/}
                {/*<div style={{width: "350px", display: "none"}}>*/}
                    {/*<Trumbowyg id='react-trumbowyg'*/}
                           {/*buttons={*/}
                               {/*[*/}
                                   {/*// ['viewHTML'],*/}
                                   {/*['formatting'],*/}
                                   {/*'btnGrp-semantic',*/}
                                   {/*['link'],*/}
                                   {/*// ['insertImage'],*/}
                                   {/*// 'btnGrp-justify',*/}
                                   {/*'btnGrp-lists',*/}
                                   {/*['table'], // I ADDED THIS FOR THE TABLE PLUGIN BUTTON*/}
                                   {/*['fullscreen']*/}
                               {/*]*/}
                           {/*}*/}
                           {/*style={{fontSize: "12px"}}*/}
                           {/*data={this.props.someData}*/}
                           {/*placeholder='Type your text!'*/}
                           {/*onChange={this.someCallback}*/}
                           {/*ref="trumbowyg"*/}
                    {/*/>*/}
                    {/*<button onClick={this.submitNote} className="btn-primary">Submit</button>*/}
                {/*</div>*/}
                {/*<div style={{fontSize: "12px", width: "300px"}} dangerouslySetInnerHTML={{ __html: this.state.noteText }}/>*/}
                {/*<div>*/}
                    {/*<RichTextInput source="body" validation={{ required: true }} />*/}
                {/*</div>*/}
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