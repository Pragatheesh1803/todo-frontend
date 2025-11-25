import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios.js'

function Register() {

    const [registerData, setRegisterData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const navigate = useNavigate()

    const handleChange = (e)=>{
        setRegisterData({...registerData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e)=>{

        e.preventDefault()

        try {
            const res = await api.post("/api/user/register", registerData)
            console.log(res.data)
            alert("Register Success 😍")
            navigate("/")
        } catch (error) {
            console.error(error)
            alert("Register Failed 🤐")
        }

    }


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-4 px-4 sm:py-8 sm:px-6 flex items-center justify-center">
      {/* Main Container */}
      <div className="max-w-md w-full bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 sm:p-8 text-white text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-indigo-100 text-sm sm:text-base">Join us and get organized</p>
        </div>
        
        {/* Form Section */}
        <div className="p-6 sm:p-8">
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit} >
            {/* Name Fields - Stack on mobile, side by side on larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={registerData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                  placeholder="to"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={registerData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                  placeholder="do"
                />
              </div>
            </div>
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                placeholder="todo@gmail.com"
              />
            </div>
            
            {/* Password Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  value={registerData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  Terms and Conditions
                </a>
              </label>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 sm:py-4 px-4 rounded-lg sm:rounded-xl transition-colors font-medium text-base sm:text-lg"
            >
              Create Account
            </button>
            
            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register