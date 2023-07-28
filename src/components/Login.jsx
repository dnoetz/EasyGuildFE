import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login } from './slices/authSlice'
import { redirect } from 'react-router-dom'

function Login() {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const handleLogin = async (e) => {
        e.preventDefault()
        const userData = {
            user: {
                email: email,
                password: password
            }
        }
        await dispatch(login(userData)).then(() => {
            window.location.href = '/'
        })
    }
  return (
    <div id="login">
        <h1>Log in to your account</h1>
        <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" value="Log In" />
        </form>
    </div>
  )
}

export default Login