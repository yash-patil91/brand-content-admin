import React, { useState } from 'react'
import Sidebar from './Sidebar'

const AuthcodeManagement = () => {
    const [activeSection, setActiveSection] = useState('campaigns');
    const handleSidebarSelect = (section) => {
        setActiveSection(section);
    };
    return (
        <>
            <div className="bg-white shadow-sm w-full px-3 sm:px-4 md:px-8 lg:px-8 flex justify-between items-center">
                <div>
                    <img
                        className="h-24 cursor-pointer"
                        src={require("../assets/images/Logo.png")}
                        alt="Your Company"
                    // onClick={() => navigate('/')}
                    />
                </div>


            </div>
            <div className="flex">
                <Sidebar onSelect={handleSidebarSelect} />
            </div>
        </>
    )
}

export default AuthcodeManagement
