import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Container } from '@mui/material';
import { dummyCampaigns } from './constants';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const CampaignManagement = () => {
    const [campaigns, setCampaigns] = useState(dummyCampaigns);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [open, setOpen] = useState(false);

    const handleEdit = (campaign) => {
        setSelectedCampaign(campaign);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedCampaign(null);
    };

    const handleChange = (e) => {
        setSelectedCampaign({
            ...selectedCampaign,
            [e.target.name]: e.target.value
        });
    };

    const handleDelete = (id) => {
        setCampaigns(campaigns.filter(campaign => campaign.id !== id));
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
            {/* <div className="relative">
                <input
                    type="text"
                    placeholder="Search..."
                    required
                    className="block w-full sm:w-96 md:w-96 lg:w-96 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none"
                />
                <div className="absolute top-1 right-2">
                    <SearchOutlinedIcon style={{ fontSize: "18px", color: "slategray" }} />
                </div>
            </div> */}
            <div>
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full border border-slate-300 cursor-pointer">
                    <span className="font-medium text-slate-500">JL</span>
                </div>
            </div>
        </div>
        <Container>
            <div className="my-6">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Campaign Management</h2>
                <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Company Name</th>
                                <th scope="col" className="px-6 py-3">Campaign Title</th>
                                <th scope="col" className="px-6 py-3">Campaign Description</th>
                                <th scope="col" className="px-6 py-3">Requirements</th>
                                <th scope="col" className="px-6 py-3">Deliverables</th>
                                <th scope="col" className="px-6 py-3">Deadlines</th>
                                <th scope="col" className="px-6 py-3">Compensation</th>
                                {/* <th scope="col" className="px-6 py-3">Created DateTime</th> */}
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.map(campaign => (
                                <tr className="bg-white border-b" key={campaign.id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-slate-500 whitespace-nowrap">
                                        {campaign.companyName}
                                    </th>
                                    <td className="px-6 py-4 text-slate-500">{campaign.campaignTitle}</td>
                                    <td className="px-6 py-4 text-slate-500">{campaign.campaignDescription}</td>
                                    <td className="px-6 py-4 text-slate-500">{campaign.requirements}</td>
                                    <td className="px-6 py-4 text-slate-500">{campaign.deliverables}</td>
                                    <td className="px-6 py-4 text-slate-500">{campaign.deadlines}</td>
                                    <td className="px-6 py-4 text-slate-500">{campaign.compensation}</td>
                                    {/* <td className="px-6 py-4 text-slate-500">{campaign.createdDateTime}</td> */}
                                    <td className="py-4 px-6 text-slate-500 flex gap-2">
                                        <button onClick={() => handleEdit(campaign)} className="mr-2 flex gap-2 items-center">
                                            <EditOutlinedIcon style={{ fontSize: "16px" }} />
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(campaign.id)} className="mr-2 flex gap-2 items-center">
                                            <DeleteOutlineOutlinedIcon style={{ fontSize: "16px" }} />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedCampaign && (
                    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                        <DialogTitle>Edit Campaign</DialogTitle>
                        <DialogContent className="space-y-4">
                            <div className="sm:col-span-3">
                                <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">Company Name</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="companyName"
                                        id="companyName"
                                        value={selectedCampaign.companyName}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6 px-2"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="campaignTitle" className="block text-sm font-medium leading-6 text-gray-900">Campaign Title</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="campaignTitle"
                                        id="campaignTitle"
                                        value={selectedCampaign.campaignTitle}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6 px-2"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="campaignDescription" className="block text-sm font-medium leading-6 text-gray-900">Campaign Description</label>
                                <div className="mt-2">
                                    <textarea
                                        name="campaignDescription"
                                        id="campaignDescription"
                                        rows="3"
                                        value={selectedCampaign.campaignDescription}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6 px-2"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="requirements" className="block text-sm font-medium leading-6 text-gray-900">Requirements</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="requirements"
                                        id="requirements"
                                        value={selectedCampaign.requirements}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6 px-2"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="deliverables" className="block text-sm font-medium leading-6 text-gray-900">Deliverables</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="deliverables"
                                        id="deliverables"
                                        value={selectedCampaign.deliverables}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6 px-2"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="deadlines" className="block text-sm font-medium leading-6 text-gray-900">Deadlines</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="deadlines"
                                        id="deadlines"
                                        value={selectedCampaign.deadlines}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6 px-2"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="compensation" className="block text-sm font-medium leading-6 text-gray-900">Compensation</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="compensation"
                                        id="compensation"
                                        value={selectedCampaign.compensation}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6 px-2"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="createdDateTime" className="block text-sm font-medium leading-6 text-gray-900">Created DateTime</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="createdDateTime"
                                        id="createdDateTime"
                                        value={selectedCampaign.createdDateTime}
                                        disabled
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6 px-2"
                                    />
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                            <Button onClick={handleClose} color="primary">Save</Button>
                        </DialogActions>
                    </Dialog>
                )}
            </div>
        </Container>
        </>
    );
};

export default CampaignManagement;
