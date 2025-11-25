import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

function IndexPage() {
  
  const userData = JSON.parse(localStorage.getItem("user"))
  const username = userData?.firstName

  const [task, setTask] = useState([])
  const [activeBtn, setActiveBtn] = useState("");
  const [totalTask, setTotalTask] = useState(0);
  const [taskComp, setComp] = useState(0);
  const [pendTask, setPendTask] = useState(0);
  const navigate = useNavigate()


  const fetchTask = async ()=>{

      try {
        const res = await api.get("/api/user/gettask")
        setTask(res.data)
        console.log(res.data)
      } catch (error) {
        console.error(error)
      }

    }

  useEffect(()=>{

    
    fetchTask()

  },[])

  const taskCompleted = async (id)=>{

    
    try {
      const res = await api.put(`/api/user/task-completed?id=${id}`)
      
      setTask(prevTasks=>
        prevTasks.map(task=>
          task.id === id ? {...task, status: "completed"} : task
        )
      )

      alert("Hurray you successfully completed that task ")
      console.log(res.data);
    } catch (error) {
      console.error(error)
      fetchTask()
    }
    

  }

  const deleteTask = async (id)=>{

    try {
      const res = await api.delete(`/api/user/task-deleted?id=${id}`)
      console.log(res.data)
      alert("Task deleted successfully")
      fetchTask()
    } catch (error) {
      console.error(error)
      alert("sorry there is an problem in our end")
    }

  }

  const pendingTask = async (status)=>{
    try {
      const res = await api.get(`/api/user/pending-task?status=${status}`)
      console.log(res.data)
      setTask(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const completedTask = async (status)=>{
    try {
      const res = await api.get(`/api/user/get-completed-task?status=${status}`)
      console.log(res.data)
      setTask(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const countTotalTask = async ()=>{
    try {
      const res = await api.get("/api/user/count-total-task")
      setTotalTask(res.data)
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const countCompTask = async (status)=>{
    try {
      const res = await api.get(`/api/user/count-completed-task?status=${status}`)
      setComp(res.data)
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const countPendTask = async (status)=>{
    try {
      const res = await api.get(`/api/user/count-pending-task?status=${status}`)
      setPendTask(res.data)
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    countTotalTask()
    
  },[])

  useEffect(()=>{
    countCompTask("completed")
  },[])

  useEffect(()=>{
    countPendTask("pending")
  },[])

   const handleLogOut = ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
   }



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-4 px-4 sm:py-8 sm:px-6">
      {/* Main Container - Responsive width */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-6 md:p-8 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Task Manager</h1>
              <p className="text-indigo-100 mt-1 sm:mt-2 text-sm sm:text-base">Stay organized and productive</p>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6 w-full sm:w-auto justify-between sm:justify-normal">
              {/* <button className="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </button> */}
              <div className="flex items-center space-x-3 sm:space-x-4">

                {/* Right side text (optional info) */}
                <div className="text-right hidden sm:block">
                  <p className="font-semibold text-sm sm:text-base">Welcome</p>
                  <p className="text-gray-300 text-xs sm:text-sm font-medium">
                    {username}
                  </p>
                </div>

                {/* Username bubble */}
                <div className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center bg-gray-800 rounded-full">
                  <span className="font-bold text-sm sm:text-lg text-white">
                    {username?.charAt(0).toUpperCase()}
                  </span>
                </div>

                {/* Logout button */}
                <div className="flex items-center justify-center">
                  <button onClick={handleLogOut}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg sm:rounded-xl transition-colors font-medium text-sm sm:text-base"
                  >
                    Logout
                  </button>
                </div>

              </div>

            </div>
          </div>
          
          {/* Date and Quick Stats */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center text-base sm:text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Today, {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex space-x-4 sm:space-x-6 w-full sm:w-auto justify-between sm:justify-normal">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold">{totalTask}</div>
                <div className="text-indigo-200 text-xs sm:text-sm">Total</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold">{taskComp}</div>
                <div className="text-indigo-200 text-xs sm:text-sm">Done</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold">{pendTask}</div>
                <div className="text-indigo-200 text-xs sm:text-sm">Pending</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar - Hidden on mobile, visible on lg screens */}
          <div className=" hidden lg:block w-full lg:w-80 bg-gray-50 border-r border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Categories</h2>
            <div className="space-y-2">

              {/* ALL TASKS */}
              <button
                onClick={() => {
                  setActiveBtn("all");
                  fetchTask();
                }}
                className={`w-full flex items-center p-3 rounded-lg 
                  ${activeBtn === "all" ? "bg-indigo-600 text-white" : "bg-white text-indigo-600"}
                `}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                All Tasks
              </button>

              {/* PENDING */}
              <button
                onClick={() => {
                  setActiveBtn("pending");
                  pendingTask("pending");
                }}
                className={`w-full flex items-center p-3 rounded-lg 
                  ${activeBtn === "pending" ? "bg-indigo-600 text-white" : "bg-white text-indigo-600"}
                `}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Pending
              </button>

              {/* COMPLETED */}
              <button
                onClick={() => {
                  setActiveBtn("completed");
                  completedTask("completed"); // if you have this function
                }}
                className={`w-full flex items-center p-3 rounded-lg 
                  ${activeBtn === "completed" ? "bg-indigo-600 text-white" : "bg-white text-indigo-600"}
                `}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Completed
              </button>

            </div>
            
          </div>
          
          {/* Task Content */}
          <div className="flex-1 p-4 sm:p-6 md:p-8">
            {/* Add Task Section */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Here You can see all your todos</h2>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="hidden lg:block flex-1">

                </div>
                <a href='addtaskform' className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-colors font-medium text-base sm:text-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Task
                </a>
              </div>
            </div>
            
            {/* Mobile Filters - Only show on small screens */}
            <div className="lg:hidden mb-4 overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                <button onClick={()=>{
                  fetchTask()
                  setActiveBtn("all")
                }} className={`px-4 py-2 ${ activeBtn ==="all" ? "bg-indigo-600 text-white ": "bg-white text-indigo-600"} rounded-full text-sm font-medium whitespace-nowrap`}>
                  All Tasks
                </button>
                <button onClick={()=>{
                  pendingTask("pending")
                  setActiveBtn("pending")
                }} className={`px-4 py-2 ${ activeBtn ==="pending" ? "bg-indigo-600 text-white ": "bg-white text-indigo-600"} rounded-full text-sm font-medium whitespace-nowrap`}>
                  Pending
                </button>
                <button onClick={()=>{
                  completedTask("completed")
                  setActiveBtn("completed")
                }} className={`px-4 py-2 ${ activeBtn ==="completed" ? "bg-indigo-600 text-white ": "bg-white text-indigo-600"} rounded-full text-sm font-medium whitespace-nowrap`}>
                  Completed
                </button>

              </div>
            </div>
            
            {/* Task Filters for desktop */}
            {/* <div className="hidden lg:flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Today's Tasks</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium">
                  All
                </button>
                <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm font-medium transition-colors">
                  {task.priority}
                </button>
                <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm font-medium transition-colors">
                  Due Today
                </button>
              </div>
            </div> */}
            
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
  {task.map((t, index) => (
    <div
      key={index}
      className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md"
    >
      <label className="flex items-start cursor-pointer gap-4">
        
        {/* Custom Radio Button */}
        <input
          type="radio"
          name="taskSelect"
          value={t.id}
          checked={t.status === "completed"}
          onChange={() => taskCompleted(t.id)}
          disabled={t.status === "completed"}
          className="peer hidden"
        />

        {/* Custom Radio Visual */}
        <div
          className={`
            h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 transition-all mt-1
            flex items-center justify-center
            ${t.status === "completed" 
              ? 'bg-green-500 border-green-500' 
              : 'border-green-500 hover:border-green-600'
            }
          `}
        >
          {t.status === "completed" ? (
            <i className="fa-solid fa-check"></i>
          ) : (<i className="fa-regular fa-clock"></i>)}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-medium text-base sm:text-lg mb-2">
            {t.taskTitle}
          </h3>

          <p className="text-gray-500 text-sm sm:text-base mb-3 hidden sm:block">
            {t.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-gray-500">{t.time}</span>

            <span
              className="
                px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 
                rounded-full text-xs sm:text-sm font-medium
              "
            >
              {t.category}
            </span>
                      <div className='flex items-center justify-between"' >
              <button value={t.id} onClick={()=>deleteTask(t.id)} type='submit' >
                <i className="fa-solid fa-trash"></i>
              </button>
          </div>
          </div>

        </div>
      </label>
    </div>
  ))}
</div>


            

          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage