import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

function AddTaskForm() {
    
    const [taskForm, setTaskForm] = useState({
        taskTitle: "",
        description: "",
        category: "",
        priority: "",
        date: "",
        time: ""
    })

    const navigate = useNavigate()

    const handleChange = (e)=>{
        setTaskForm({...taskForm, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e)=>{

        e.preventDefault()

        try {
            const res = await api.post("/api/user/addtask", taskForm)
            console.log(res.data)
            alert("Task added successfully")
            navigate("/index")
        } catch (error) {
            console.error(error)
            alert("Sorry we have an issue in our server..try again later ")
        }

    }

    

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-4 px-4 sm:py-8 sm:px-6">
      {/* Main Container */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 sm:p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Add New Task</h1>
              <p className="text-indigo-100 mt-2 text-sm sm:text-base">Create and organize your tasks efficiently</p>
            </div>
            <a href='/index' className="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                x
            </a>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6 sm:p-8">
          <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit} >
            {/* Task Name */}
            <div>
              <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                Task Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="taskTitle"
                value={taskForm.taskTitle}
                onChange={handleChange}
                className="w-full px-4 py-3 sm:py-4 bg-gray-100 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors text-base sm:text-lg"
                placeholder="Enter task name..."
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                value={taskForm.description}
                onChange={handleChange}
                className="w-full px-4 py-3 sm:py-4 bg-gray-100 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors text-base sm:text-lg resize-none"
                placeholder="Add detailed description about the task..."
              />
            </div>

            {/* Category and Status - Side by side on larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={taskForm.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 sm:py-4 bg-gray-100 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors text-base sm:text-lg"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="health">Health & Fitness</option>
                  <option value="shopping">Shopping</option>
                  <option value="education">Education</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                  Priority Level <span className="text-red-500">*</span>
                </label>
                <select
                  name="priority"
                  value={taskForm.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 sm:py-4 bg-gray-100 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors text-base sm:text-lg"
                  required
                >
                  <option value="">Select priority</option>
                  <option value="pending">low</option>
                  <option value="in-progress">medium</option>
                  <option value="completed">high</option>
                </select>
              </div>
            </div>

            {/* Date and Time - Side by side on larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Date Picker */}
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                  Due Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={taskForm.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-4 bg-gray-100 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors text-base sm:text-lg"
                  />

                </div>
              </div>

              {/* Time Picker */}
              <div>
                <label htmlFor="dueTime" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                  Due Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    name="time"
                    value={taskForm.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-4 bg-gray-100 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors text-base sm:text-lg"
                  />

                </div>
              </div>
            </div>

            {/* Priority Level */}




            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 sm:py-4 px-6 rounded-lg sm:rounded-xl transition-colors font-medium text-base sm:text-lg flex items-center justify-center"
              >

                Create Task
              </button>
              
              <a href='/index'
                className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 sm:py-4 px-6 rounded-lg sm:rounded-xl transition-colors font-medium text-center text-base sm:text-lg"
              >
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddTaskForm