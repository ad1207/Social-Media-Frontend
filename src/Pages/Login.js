import React,{ useRef, useContext } from 'react'
import { loginCall } from '../apiCalls'
import { Context } from '../context/Context'
import './Login.css'
import { CircularProgress } from '@material-ui/core'


export default function Login() {
    const email = useRef()
    const password = useRef()
    const {user, isFetching, error, dispatch} = useContext(Context)
    const handleSubmit = (e) => {
        e.preventDefault()
        loginCall({email:email.current.value,password:password.current.value},dispatch)
    }
  return (
    <div className='login'>
        <div className="login-wrapper">
            <div className="login-left">
                <h3 className="login-logo">Socail Media</h3>
                <span className='login-desc'>Connect with friends in Social Media</span>
            </div>
            <div className="login-right">
                <form className="login-box" onSubmit={(e) => handleSubmit(e)}>
                    <input placeholder='Email' type='email' ref={email} required className='login-input'/>
                    <input placeholder='Password' ref={password} required minLength={6} type='password' className='login-input'/>
                    <button className='login-button' type='submit' disabled={isFetching}>{isFetching?<CircularProgress color='white' size="20px"/> : "Log In"}</button>
                    <span className='login-forgot'>Forgot Password?</span>
                    <button disabled={isFetching} className='login-register-button'>
                        Create a New Account
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
