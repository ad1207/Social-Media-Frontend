import axios from 'axios'
import React,{useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'

export default function Register() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match!")
        }
        else{
            const user = {
                username : username.current.value,
                email: email.current.value,
                password: <password className="current value"></password>
            }
            try{
                await axios.post("https://social-media-api--nodejs.herokuapp.com/api/auth/register",user)
                navigate('/login')
            }catch(err){
                console.log(err)
            }
        }


    }

    return (
    <div className='login'>
        <div className="login-wrapper">
            <div className="login-left">
                <h3 className="login-logo">Socail Media</h3>
                <span className='login-desc'>Connect with friends in Social Media</span>
            </div>
            <div className="login-right">
                <form className="register-box" onSubmit={(e) => handleSubmit(e)}>
                    <input placeholder='Username' required ref={username} type='text' className='login-input'/>
                    <input placeholder='Email' required ref={email} type='email' className='login-input'/>
                    <input placeholder='Password' required ref={password} type='password' minLength={6} className='login-input'/>
                    <input placeholder='Confirm Password' required ref={passwordAgain} minLength={6} className='login-input'/>
                    <button className='login-button' type='submit'>Sign Up</button>
                    <button className='login-register-button'>
                        Already have an account
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
