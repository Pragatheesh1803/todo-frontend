import React, { useEffect, useState } from 'react'
import { data, useNavigate } from 'react-router-dom'
import api from '../api/axios.js'
import {jwtDecode} from 'jwt-decode'

function Login() {

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleChange = (e)=>{
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e)=>{

        e.preventDefault()

        try {
            const res = await api.post("/api/user/login", loginData)
            
            const {token, user} = res.data
            localStorage.setItem("token", token)
            
            const decode = jwtDecode(token)
            console.log("decoded:", decode)
            console.log("Logged in user details:", user)

            localStorage.setItem("user", JSON.stringify(user))

            console.log(res,data)
            alert("Login success")
            navigate("/")
        } catch (error) {
            console.error(error)
            alert("Register Success")
        }

    }

    useEffect(()=>{

        const token = localStorage.getItem("user")

        if(token) {
            navigate("/")
        }

    },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-4 px-4 sm:py-8 sm:px-6 flex items-center justify-center">
      {/* Main Container */}
      <div className="max-w-md w-full bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 sm:p-8 text-white text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-indigo-100 text-sm sm:text-base">Sign in to your account</p>
        </div>
        
        {/* Form Section */}
        <div className="p-6 sm:p-8">
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit} >
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                placeholder="john@example.com"
              />
            </div>
            
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                placeholder="••••••••"
              />
            </div>
            

            
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 sm:py-4 px-4 rounded-lg sm:rounded-xl transition-colors font-medium text-base sm:text-lg"
            >
              Sign In
            </button>
            

            
            {/* Register Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/register" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login