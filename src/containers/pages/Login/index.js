import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {loginUserAPI} from '../../../config/redux/action'
import Button from '../../../components/atoms/Button.';

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
        }
    }
    
    handleChageText=(e)=>{
        // console.log(e.target.id);
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    handleLoginSubmit= async()=>{
        const {email,password}=this.state
        const {history} = this.props;
        const res = await this.props.loginAPI({email,password}).catch(err=>err)
        if(res){
            console.log('res :',res);
            localStorage.setItem('userData',JSON.stringify(res))
            this.setState({
                email:'',
                password:'',
            })
            history.push('/')
        }else{
            console.log("failed");
        }
    }
    render(){
        return(
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Login Page</p>
                    <input className="input" id="email" placeholder ="Email" type="text" onChange={this.handleChageText} value={this.state.email}/>
                    <input className="input" id="password"placeholder ="Password" type="password" onChange={this.handleChageText} value={this.state.password}/>
                    <Button onClick={this.handleLoginSubmit}
                    title="Login"
                    loading={this.props.loading}
                    />
                </div>
                {/* <button>Go to Dasboard</button> */}
            </div>
        )
    }
}

const reduxState = (state)=>({
    loading:state.isLoading
})

const reduxDispatch=(dispatch)=>({
    loginAPI:(data)=>dispatch(loginUserAPI(data))
})

export default connect(reduxState,reduxDispatch)(Login);