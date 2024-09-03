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
    TableBody,
    Switch
} from '@mui/material';
import Sidebar from './Sidebar'; // Assume Sidebar component for navigation
import { api_url } from './constants';
import Topbar from './Topbar';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const BrandsManagement = () => {
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);
    const [activeSection, setActiveSection] = useState('brands');
    const [loading, setLoading] = useState(true);

    const fetchBrands = async () => {
        try {
            const response = await axios.get(`${api_url}/api/brands`);
            setBrands(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching brands:', error);
            setLoading(false);
        }
    };

    const handleSidebarSelect = (section) => {
        setActiveSection(section);
    };


    useEffect(() => {
        fetchBrands();
    }, []);

    const handleRowClick = (brand) => {
        setSelectedBrand(brand);
        setOpenDetails(true);
    };

    const handleCloseDetails = () => {
        setOpenDetails(false);
        setSelectedBrand(null);
    };

    const handlePaymentUpdate = async (brandId, currentStatus) => {
        try {
            const response = await axios.put(`${api_url}/api/brands/${brandId}/payment`, {
                payment: !currentStatus
            });
            console.log('Payment status updated:', response.data);

            // Optionally, update the UI after a successful API call
            fetchBrands();
        } catch (error) {
            console.error('Error updating payment status:', error);
        }
    };
    console.log("brands", brands)
    return (
        <>
            <Topbar />

            <div className="flex">
                <Sidebar onSelect={handleSidebarSelect} />
                <Container>
                    <div className="my-6">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Brand Management</h2>
                        <div className="mt-5 overflow-x-auto">
                            {
                                loading ? (
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
                                    brands.length > 0 ? (
                                        <table className="w-full text-sm text-left text-gray-500">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 border">Name</th>
                                                    <th className="px-6 py-3 border">Phone</th>
                                                    <th className="px-6 py-3 border">Email</th>
                                                    <th className="px-6 py-3 border">Status</th>
                                                    <th className="px-6 py-3 border">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {brands.map((brand) => (
                                                    <tr
                                                        className="bg-white border cursor-pointer"
                                                        key={brand._id}
                                                        onClick={() => handleRowClick(brand)}
                                                    >
                                                        <td className="px-6 py-4 text-slate-500">{brand.fullName}</td>
                                                        <td className="px-6 py-4 text-slate-500">{brand.phone}</td>
                                                        <td className="px-6 py-4 text-slate-500">{brand.email}</td>
                                                        <td className="px-6 py-4 text-slate-500">{brand.Status}</td>
                                                        <td className="py-4 px-6 flex gap-2">
                                                            <Switch
                                                                {...label}
                                                                defaultChecked={brand.payment}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handlePaymentUpdate(brand._id, brand.payment);
                                                                }}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className='text-center py-2 bg-pink-100 mt-6 rounded-sm font-semibold text-black'>
                                            <h6>No Brand Found</h6>
                                        </div>
                                    )
                                )
                            }
                        </div>

                        {/* Brand Details Dialog */}
                        {selectedBrand && (
                            <Dialog open={openDetails} onClose={handleCloseDetails} fullWidth maxWidth="sm">
                                <DialogTitle>Brand Details</DialogTitle>
                                <DialogContent className="space-y-4">
                                    <div>
                                        <strong>Name:</strong> {selectedBrand.fullName}
                                    </div>
                                    <div>
                                        <strong>Company Name:</strong> {selectedBrand.companyName}
                                    </div>
                                    <div>
                                        <strong>Email:</strong> {selectedBrand.email}
                                    </div>
                                    <div>
                                        <strong>Phone Number:</strong> {selectedBrand.phone}
                                    </div>
                                    <div>
                                        <strong>Influencer Type :</strong> {selectedBrand.influencerType.join(', ')}
                                    </div>
                                    <div>
                                        <strong>Address:</strong> {selectedBrand.brandAddress}
                                    </div>

                                    <div>
                                        <strong>Status:</strong> {selectedBrand.Status}
                                    </div>
                                    <div>
                                        <strong>Collaboration Count:</strong> {selectedBrand.collaborationType.join(', ')}
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDetails}>Close</Button>
                                </DialogActions>
                            </Dialog>
                        )}
                    </div>
                </Container>
            </div>
        </>
    );
};

export default BrandsManagement;
