import React,{ Component } from 'react';
import './Register.scss'
import Button from '../../../components/atoms/Button.';
import { registerUserAPI } from '../../../config/redux/action';
import { connect } from 'react-redux';

class Resgister extends Component{
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
    handleRegisterSubmit=async()=>{
        const {email,password}=this.state
        const {history} = this.props;
        const res = await this.props.registerAPI({email,password}).catch(err=>err)
        if(res){
            console.log("sukses");
            this.setState({
                email:'',
                password:'',
            })
            history.push('/login')
        }else{
            console.log("failed");
        }

    }
    render(){
        return(
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Register Page</p>
                    <input className="input" id="email" placeholder ="Email" type="text" onChange={this.handleChageText} value={this.state.email}/>
                    <input className="input" id="password"placeholder ="Password" type="password" onChange={this.handleChageText} value={this.state.password}/>
                    <Button onClick={this.handleRegisterSubmit}
                    title="REGISTER ini"
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
    registerAPI:(data)=>dispatch(registerUserAPI(data))
})
export default connect(reduxState,reduxDispatch)(Resgister);