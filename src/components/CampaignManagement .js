import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Container,
    TableHead,
    TableRow,
    TableCell,
    Skeleton,
    TableBody,
    Table
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Sidebar from './Sidebar'; // Assume Sidebar component for navigation
import { api_url } from './constants';
import Topbar from './Topbar';

const CampaignManagement = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedCampaignId, setSelectedCampaignId] = useState(null);
    const [activeSection, setActiveSection] = useState('campaigns');
    const [loading, setLoading] = useState(false);



    const fetchCampaigns = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${api_url}/api/campaign`);
            setCampaigns(response.data);
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCampaigns();
    }, []);

    const handleEdit = (campaign) => {
        setSelectedCampaign(campaign);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        setSelectedCampaign(null);
    };

    const handleChange = (e) => {
        setSelectedCampaign({
            ...selectedCampaign,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveEdit = async () => {
        try {
            await axios.put(`${api_url}/api/campaign/${selectedCampaign._id}`, selectedCampaign);
            fetchCampaigns();
            handleCloseEdit();
        } catch (error) {
            console.error('Error updating campaign:', error);
        }
    };

    const handleDeleteConfirmation = (id) => {
        setSelectedCampaignId(id);
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
        setSelectedCampaignId(null);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${api_url}/api/campaign/${selectedCampaignId}`);
            fetchCampaigns(); // Refresh campaigns after deletion
            handleCloseDelete();
        } catch (error) {
            console.error('Error deleting campaign:', error);
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
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Campaign Management</h2>
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

                                    <>
                                        {
                                            campaigns?.length > 0 ?
                                                <>
                                                    <table className="w-full text-sm text-left text-gray-500">
                                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                                            <tr>
                                                                <th className="px-6 py-3 border">Company Name</th>
                                                                <th className="px-6 py-3 border">Campaign Title</th>
                                                                <th className="px-4 py-2 border">Description</th>
                                                                {/* <th className="px-4 py-2 border">Requirements</th> */}
                                                                <th className="px-4 py-2 border">Brand</th>
                                                                <th className="px-4 py-2 border">Deadlines</th>
                                                                <th className="px-4 py-2 border">Actions</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {campaigns.map((campaign) => (
                                                                <tr className="bg-white border" key={campaign.id}>
                                                                    <td className="px-6 py-4 text-slate-500">{campaign.companyName}</td>
                                                                    <td className="px-6 py-4 text-slate-500">{campaign.campaignTitle}</td>
                                                                    <td className="px-4 py-2 border">{campaign.campaignDescription}</td>
                                                                    {/* <td className="px-4 py-2 border">{campaign.requirements}</td> */}
                                                                    <td className="px-4 py-2 border">{campaign.brand}</td>
                                                                    <td className="px-4 py-2 border">{campaign.deadlines}</td>
                                                                    <td className="py-4 px-6 flex gap-2">
                                                                        <button onClick={() => handleEdit(campaign)} className="mr-2 flex gap-2 items-center">
                                                                            <EditOutlinedIcon style={{ fontSize: "16px" }} />
                                                                            Edit
                                                                        </button>
                                                                        <button onClick={() => handleDeleteConfirmation(campaign._id)} className="mr-2 flex gap-2 items-center">
                                                                            <DeleteOutlineOutlinedIcon style={{ fontSize: "16px" }} />
                                                                            Delete
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </>
                                                : <>
                                                    <div className='text-center py-2 bg-pink-100 mt-6 rounded-sm font-semibold text-black'>
                                                        <h6>No Campaign Found</h6>
                                                    </div>
                                                </>
                                        }
                                    </>

                                )}

                        </div>

                        {/* Edit Campaign Dialog */}
                        {selectedCampaign && (
                            <Dialog open={openEdit} onClose={handleCloseEdit} fullWidth maxWidth="sm">
                                <DialogTitle>Edit Campaign</DialogTitle>
                                <DialogContent className="space-y-4">
                                    <div>
                                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            id="companyName"
                                            name="companyName"
                                            value={selectedCampaign.companyName}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="campaignTitle" className="block text-sm font-medium text-gray-700">
                                            Campaign Title
                                        </label>
                                        <input
                                            type="text"
                                            id="campaignTitle"
                                            name="campaignTitle"
                                            value={selectedCampaign.campaignTitle}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="campaignDescription" className="block text-sm font-medium text-gray-700">
                                            Campaign Description
                                        </label>
                                        <input
                                            type="text"
                                            id="campaignDescription"
                                            name="campaignDescription"
                                            value={selectedCampaign.campaignDescription}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                                            Requirements
                                        </label>
                                        <input
                                            type="text"
                                            id="requirements"
                                            name="requirements"
                                            value={selectedCampaign.requirements}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                                            Brand
                                        </label>
                                        <input
                                            type="text"
                                            id="brand"
                                            name="brand"
                                            value={selectedCampaign.brand}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="deadlines" className="block text-sm font-medium text-gray-700">
                                            Deadlines
                                        </label>
                                        <input
                                            type="text"
                                            id="deadlines"
                                            name="deadlines"
                                            value={selectedCampaign.deadlines}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="compensation" className="block text-sm font-medium text-gray-700">
                                            Compensation
                                        </label>
                                        <input
                                            type="text"
                                            id="compensation"
                                            name="compensation"
                                            value={selectedCampaign.compensation}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="deliverables" className="block text-sm font-medium text-gray-700">
                                            Deliverables
                                        </label>
                                        <input
                                            type="text"
                                            id="deliverables"
                                            name="deliverables"
                                            value={selectedCampaign.deliverables}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="social_media" className="block text-sm font-medium text-gray-700">
                                            Social Media
                                        </label>
                                        <input
                                            type="text"
                                            id="social_media"
                                            name="social_media"
                                            value={selectedCampaign.social_media}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 shadow-sm"
                                        />
                                    </div>
                                    {/* Add more fields with labels here */}
                                </DialogContent>

                                <DialogActions>
                                    <Button onClick={handleCloseEdit}>Cancel</Button>
                                    <Button onClick={handleSaveEdit}>Save</Button>
                                </DialogActions>
                            </Dialog>
                        )}

                        {/* Delete Confirmation Dialog */}
                        <Dialog open={openDelete} onClose={handleCloseDelete}>
                            <DialogTitle>Are you sure you want to delete this campaign?</DialogTitle>
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

export default CampaignManagement;
