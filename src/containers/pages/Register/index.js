import React,{ Component } from 'react';
import './Register.scss'
import firebase from '../../../config/firebase'

class Resgister extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:''
        }
    }

    handleChageText=(e)=>{ 
        // console.log(e.target.id);
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleRegisterSubmit=()=>{
        const {email,password}=this.state
        console.log(email,password);
        firebase.auth().createUserWithEmailAndPassword(email,password).then(res=>{
            console.log('sukses',res);
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode);
            console.log(errorMessage)
        });

    }
    render(){
        return(
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Register Page</p>
                    <input className="input" id="email" placeholder ="Email" type="text" onChange={this.handleChageText}/>
                    <input className="input" id="password"placeholder ="Password" type="password" onChange={this.handleChageText}/>
                    <button className="btn" onClick={this.handleRegisterSubmit}>Resgister</button>
                </div>
                {/* <button>Go to Dasboard</button> */}
            </div>
        )
    }
}

export default Resgister;