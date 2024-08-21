import React, { useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios'; // Import axios for making API requests
import { api_url } from './constants';
import Topbar from './Topbar';

const AuthcodeManagement = () => {
    const [activeSection, setActiveSection] = useState('campaigns');
    const [email, setEmail] = useState(''); // Updated to capture email
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loader state

    const handleSidebarSelect = (section) => {
        setActiveSection(section);
    };

    const handleSubmit = async () => {
        setLoading(true); // Start loader
        try {
            const response = await axios.post(`${api_url}/api/influencers/assignAuthcode`, { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false); // Stop loader
        }
    };

    return (
        <>
          <Topbar/>

            <div className="flex">
                <Sidebar onSelect={handleSidebarSelect} />
                <div className="flex flex-grow justify-center ">
                    <div className="p-8 rounded-lg">
                        <input
                            type="email"
                            placeholder="Enter Influencer Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 p-3 w-64 mb-4 rounded-md"
                        />
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-500 ml-6 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
                            disabled={loading} 
                        >
                            {loading ? 'Loading...' : 'Submit'} {/* Show loader text */}
                        </button>
                        {message && (
                            <div className="mt-4 text-green-600">
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthcodeManagement;
