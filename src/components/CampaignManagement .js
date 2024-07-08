import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Container } from '@mui/material';
import { dummyCampaigns } from './constants';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

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
        <><div>
            <div className="bg-white shadow-sm w-full px-3 sm:px-4 md:px-8 lg:px-8 py-3 flex justify-between">
                <div>
                    <img
                        className="h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        required
                        className="block xs:w-full sm:w-96 md:w-96 lg:w-96 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none"
                    />
                    <div className="absolute top-1 right-2">
                        <SearchOutlinedIcon style={{ fontSize: "18px", color: "slategray" }} />
                    </div>
                </div>
                <div>
                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full border border-slate-300 cursor-pointer">
                        <span className="font-medium text-slate-500 ">JL</span>
                    </div>
                </div>
            </div>
        </div>
            <Container>
                <div className="my-6">
                    <h2 class="text-base font-semibold leading-7 text-gray-900">Campaign Management</h2>
                    <div className="space-y-4 mt-5">
                        {campaigns.map(campaign => (
                            <div key={campaign.id} className="border p-4 rounded shadow-sm flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-semibold">{campaign.campaignTitle}</h3>
                                    <p className="text-gray-600">{campaign.companyName}</p>
                                </div>
                                <div className="space-x-2">
                                    <button onClick={() => handleEdit(campaign)}
                                        className={` bg-blue-500 text-white rounded-md px-6 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                    >
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(campaign.id)}
                                        className={` bg-blue-500 text-white rounded-md px-6 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                    >
                                        Close
                                    </button>
                                    {/* <Button variant="contained" color="primary" onClick={() => handleEdit(campaign)}>Edit</Button> */}
                                    {/* <Button variant="contained" color="secondary" onClick={() => handleDelete(campaign.id)}>Delete</Button> */}
                                </div>
                            </div>
                        ))}
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
