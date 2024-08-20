import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Container
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Sidebar from './Sidebar'; // Assume Sidebar component for navigation
import { api_url } from './constants';

const InfluencerManagement = () => {
    const [influencers, setInfluencers] = useState([]);
    const [selectedInfluencer, setSelectedInfluencer] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedInfluencerId, setSelectedInfluencerId] = useState(null);
    const [activeSection, setActiveSection] = useState('influencers');

    const fetchInfluencers = async () => {
        try {
            const response = await axios.get(`${api_url}/api/influencers`);
            setInfluencers(response.data);
        } catch (error) {
            console.error('Error fetching influencers:', error);
        }
    };

    console.log("influencers",influencers)

    useEffect(() => {
        fetchInfluencers();
    }, []);

    const handleRowClick = (influencer) => {
        setSelectedInfluencer(influencer);
        setOpenDetails(true);
    };

    const handleCloseDetails = () => {
        setOpenDetails(false);
        setSelectedInfluencer(null);
    };

    const handleDeleteConfirmation = (id) => {
        setSelectedInfluencerId(id);
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
        setSelectedInfluencerId(null);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${api_url}/api/influencers/${selectedInfluencerId}`);
            fetchInfluencers(); // Refresh influencers after deletion
            handleCloseDelete();
        } catch (error) {
            console.error('Error deleting influencer:', error);
        }
    };

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
                    />
                </div>
            </div>
            <div className="flex">
                <Sidebar onSelect={handleSidebarSelect} />
                <Container>
                    <div className="my-6">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Influencer Management</h2>
                        <div className="mt-5 overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 border">First Name</th>
                                        <th className="px-6 py-3 border">Last Name</th>
                                        <th className="px-6 py-3 border">Email</th>
                                        <th className="px-6 py-3 border">Niche</th>
                                        <th className="px-6 py-3 border">Status</th>
                                        <th className="px-6 py-3 border">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {influencers.map((influencer) => (
                                        <tr
                                            className="bg-white border cursor-pointer"
                                            key={influencer._id}
                                            onClick={() => handleRowClick(influencer)}
                                        >
                                            <td className="px-6 py-4 text-slate-500">{influencer.firstName}</td>
                                            <td className="px-6 py-4 text-slate-500">{influencer.lastName}</td>
                                            <td className="px-6 py-4 text-slate-500">{influencer.email}</td>
                                            <td className="px-6 py-4 text-slate-500">{influencer.niche.join(', ')}</td>
                                            <td className="px-6 py-4 text-slate-500">{influencer.status}</td>
                                            <td className="py-4 px-6 flex gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteConfirmation(influencer._id);
                                                    }}
                                                    className="mr-2 flex gap-2 items-center"
                                                >
                                                    <DeleteOutlineOutlinedIcon style={{ fontSize: "16px" }} />
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Influencer Details Dialog */}
                        {selectedInfluencer && (
                            <Dialog open={openDetails} onClose={handleCloseDetails} fullWidth maxWidth="sm">
                                <DialogTitle>Influencer Details</DialogTitle>
                                <DialogContent className="space-y-4">
                                    <div>
                                        <strong>First Name:</strong> {selectedInfluencer.firstName}
                                    </div>
                                    <div>
                                        <strong>Last Name:</strong> {selectedInfluencer.lastName}
                                    </div>
                                    <div>
                                        <strong>Email:</strong> {selectedInfluencer.email}
                                    </div>
                                    <div>
                                        <strong>Phone Number:</strong> {selectedInfluencer.phoneNumber}
                                    </div>
                                    <div>
                                        <strong>Niche:</strong> {selectedInfluencer.niche.join(', ')}
                                    </div>
                                    <div>
                                        <strong>Bio:</strong> {selectedInfluencer.bio}
                                    </div>
                                    <div>
                                        <strong>Social Media Links:</strong>
                                        <ul>
                                            {selectedInfluencer.socialMediaLinks.map((link, index) => (
                                                <li key={index}>
                                                    <a href={link.link} target="_blank" rel="noopener noreferrer">
                                                        {link.link} - {link.followerCount} followers
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <strong>Status:</strong> {selectedInfluencer.status}
                                    </div>
                                    <div>
                                        <strong>Collaboration Count:</strong> {selectedInfluencer.collaborationCount}
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDetails}>Close</Button>
                                </DialogActions>
                            </Dialog>
                        )}

                        {/* Delete Confirmation Dialog */}
                        <Dialog open={openDelete} onClose={handleCloseDelete}>
                            <DialogTitle>Are you sure you want to delete this influencer?</DialogTitle>
                            <DialogActions>
                                <Button onClick={handleCloseDelete}>Cancel</Button>
                                <Button onClick={handleDelete} color="error">Delete</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default InfluencerManagement;
