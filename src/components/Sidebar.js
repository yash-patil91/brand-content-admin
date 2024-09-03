import React from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onSelect }) => {
    const navigate = useNavigate(); // Initialize the navigate function

    const items = [
        { name: 'Campaign Management', value: 'campaigns', navigateTo: "/campaignmanagement" },
        { name: 'Influencer Management', value: 'influencer', navigateTo: "/influencermanagement" },
        { name: 'Brand Management', value: 'influencer', navigateTo: "/brandmanagement" },
        { name: 'Auth Code Generation', value: 'authcode', navigateTo: "/authcodemanagement" },
        // Add more sidebar items here
    ];


    return (
        <div className="w-64 h-screen bg-slate-100 p-4 flex flex-col justify-between">
            <List>
                {items.map((item, index) => (
                    <ListItem 
                        button 
                        key={index} 
                        onClick={() => {
                            onSelect(item.value); // Pass the value to the parent component
                            navigate(item.navigateTo); // Navigate to the specified route
                        }}
                    >
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
            
        </div>
    );
};

export default Sidebar;
