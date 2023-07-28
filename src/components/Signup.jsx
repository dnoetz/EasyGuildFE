import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { signup } from './slices/authSlice'

function Signup() {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')

    const handleSignup = async (e) => {
        e.preventDefault()
        const userData = {
            user: {
                email: email,
                username: username,
                password: password
            }
        }
        console.log(userData)
        if (password === confirmedPassword) {
            await dispatch(signup(userData)).then(() => {
                window.location.href = '/login'
            })
        } else {
            alert("Passwords don't match.")
        }
    }

  return (
    <div id="signup">
        <h1>Don't have an account? Make one!</h1>
        <form onSubmit={handleSignup}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
            />
            <input type="submit" value="Sign Up" />
        </form>
    </div>
  )
}

export default Signup