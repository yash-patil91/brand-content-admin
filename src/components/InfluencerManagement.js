import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Container,
    Skeleton,
    TableCell,
    TableRow,
    Table,
    TableHead,
    TableBody
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Sidebar from './Sidebar'; // Assume Sidebar component for navigation
import { api_url } from './constants';
import Topbar from './Topbar';

const InfluencerManagement = () => {
    const [influencers, setInfluencers] = useState([]);
    const [selectedInfluencer, setSelectedInfluencer] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedInfluencerId, setSelectedInfluencerId] = useState(null);
    const [activeSection, setActiveSection] = useState('influencers');
    const [loading, setLoading] = useState(true); // Loading state

    const fetchInfluencers = async () => {
        try {
            const response = await axios.get(`${api_url}/api/influencers`);
            setInfluencers(response.data);
            setLoading(false); // Set loading to false after fetching
        } catch (error) {
            console.error('Error fetching influencers:', error);
            setLoading(false); // In case of error, also stop loading
        }
    };

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
            <Topbar />

            <div className="flex">
                <Sidebar onSelect={handleSidebarSelect} />
                <Container>
                    <div className="my-6">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Influencer Management</h2>
                        <div className="mt-5 overflow-x-auto">
                            {
                                loading ? (
                                    // Show Skeletons if loading
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                {['First Name', 'Last Name', 'Email', 'Niche', 'Status', 'Actions'].map((header) => (
                                                    <TableCell key={header}>
                                                        <Skeleton animation="wave" height={40} />
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {[...Array(1)].map((_, index) => (
                                                <TableRow key={index}>
                                                    {Array(6).fill('').map((_, idx) => (
                                                        <TableCell key={idx}>
                                                            <Skeleton animation="wave" height={40} />
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    influencers.length > 0 ? (
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
                                    ) : (
                                        <div className='text-center py-2 bg-pink-100 mt-6 rounded-sm font-semibold text-black'>
                                            <h6>No Influencer Found</h6>
                                        </div>
                                    )
                                )
                            }
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
