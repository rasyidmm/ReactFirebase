import React,{ Component,Fragment } from 'react';
import './Dashboard.scss'
import { connect } from 'react-redux';
import { addDataToAPI,getDataFromAPI ,updateDataAPI,deleteDataAPI} from '../../../config/redux/action';

class Dasboard extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            content:'',
            date:'',
            textButton:'SIMPAN',
            noteId:''
        }
    }
    componentDidMount(){
        const userData = JSON.parse(localStorage.getItem('userData'))
        this.props.getNotes(userData.uid)
    }
    handleChageText=(e,type)=>{
        // console.log(e.target.id);
        this.setState({
            [type]:e.target.value
        })
    }
    hadleSaveNotes = ()=>{
        const{title,content,textButton,noteId}= this.state
        const{saveNotes,updateNote} = this.props
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            title:title,
            content:content,
            date: new Date().getTime(),
            userId:userData.uid
        }
        if (textButton==='SIMPAN') {
            saveNotes(data)
        }else{
            data.noteId= noteId
            updateNote(data)
        }
        console.log(
            data
        );
    }

    updateNotes=(note)=>{
        console.log("updateNote",note);
        this.setState({
            title:note.data.title,
            content:note.data.content,
            date:note.data.date,
            textButton:'UPDATE',
            noteId:note.id
        })
    }
    cancelUpdate=()=>{
        this.setState({
            title:"",
            content:"",
            date:"",
            textButton:'SIMPAN'
        })
    }
    deleteNote=(e,note)=>{
        e.stopPropagation()
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            userId:userData.uid,
            noteId:
            note.id
        }
        this.props.deleteNote(data)
    }

    render(){
        const {title,content,textButton} = this.state
        const{notes}=this.props
        console.log("notes",notes);
        return(
            <div className="container">
                <div className="input-form">
                    <input placeholder="title" className="input-title" value={title} onChange={(e)=>this.handleChageText(e,'title')}></input>
                    <textarea   placeholder="content" className="input-content" value={content} onChange={(e)=>this.handleChageText(e,'content')}>
                    </textarea>
                    <div className="action-wrapper">
                        {
                            textButton==='UPDATE' ? (
                                <button className="save-btn cancel" onClick={this.cancelUpdate}> Cancel</button>
                            ):<div/>
                        }
                        <button className="save-btn" onClick={this.hadleSaveNotes}> {textButton}</button>
                    </div>
                </div>
                <hr/>
                {
                    notes.length >0  ?(
                        <Fragment>
                            {
                                notes.map(note=>{
                                    return(
                                        <div className="card-content"key={note.id} onClick={()=>this.updateNotes(note)}>
                                            <p className="title">{note.data.title}</p>
                                            <p className="date">{note.data.date}</p>
                                            <p className="content">{note.data.content}</p>
                                            <div className="delete-btn" onClick={(e)=>this.deleteNote(e,note)}>X</div>
                                        </div>
                                    )
                                })
                            }
                        </Fragment>
                    ):null
                }
            </div>
        )
    }
}
const reduxState = (state)=>({
    userData:state.user,
    notes:state.notes
})

const reduxDispatch=(dispatch)=>({
    saveNotes:(data)=>dispatch(addDataToAPI(data)),
    getNotes:(data)=>dispatch(getDataFromAPI(data)),
    updateNote :(data)=>dispatch(updateDataAPI(data)),
    deleteNote:(data)=>dispatch(deleteDataAPI(data))
})
export default connect(reduxState,reduxDispatch) (Dasboard);