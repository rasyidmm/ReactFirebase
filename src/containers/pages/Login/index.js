import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {actionUserName} from '../../../config/redux/action'

class Login extends Component{
    changeUser=()=>{
        this.props.changeUsername()
    }
    render(){
        return(
            <div>
                <p>Login Page {this.props.username}</p>
                <button onClick={this.changeUser}>change User Name</button>
                <button>Go to Dasboard</button>
            </div>
        )
    }
}

const reduxState = (state)=>({
    popupProp:state.popup,
    username:state.user
})

const reduxDispatch=(dispatch)=>({
    changeUsername:()=>dispatch(actionUserName(actionUserName))
})

export default connect(reduxState,reduxDispatch)(Login);