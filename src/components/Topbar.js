import React from 'react'
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';



const Topbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/'); 
    };

  return (
    <div className="bg-white shadow-sm w-full px-3 sm:px-4 md:px-8 lg:px-8 flex justify-between items-center">
    <div>
        <img
            className="h-24 cursor-pointer"
            src={require("../assets/images/Logo.png")}
            alt="Your Company"
        />
    </div>
    <button
        onClick={handleLogout}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
    >
        {/* <span className="text-sm font-semibold">Logout</span> */}
       <LogoutIcon/>
    </button>
</div>
  )
}

export default Topbar