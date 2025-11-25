import React from 'react'
import { Routes, Route } from 'react-router-dom'
import IndexPage from '../components/IndexPage'
import Register from '../pages/Register'
import Login from '../pages/Login'
import AddTaskForm from '../pages/AddTaskForm'

function AppRouter() {
  return (
    
    
        <Routes>
            <Route path='/index' element={<IndexPage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Login />} />
            <Route path='/addtaskform' element={<AddTaskForm />} />
        </Routes>
    
    
  )
}

export default AppRouter