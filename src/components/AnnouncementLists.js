import React, { useState, useEffect } from 'react';
import './AnnouncementLists.css';
import AnnouncementsForm from './AnnouncementsForm'; // Import the AnnouncementsForm component

const AnnouncementsList = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [userType, setUserType] = useState('');
    const [managerEmail, setManagerEmail] = useState('');
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');

    useEffect(() => {
        fetchUserType();
    }, []);

    const fetchAnnouncements = async (userEmail, managerEmail) => {
        try {
            const response = await fetch(`/announcements/tenant/${encodeURIComponent(userEmail)}/${encodeURIComponent(managerEmail)}`);
            if (response.ok) {
                const data = await response.json();
                setAnnouncements(data);
            } else {
                console.error('Failed to fetch announcements');
            }
        } catch (error) {
            console.error('Server error:', error);
        }
    };

    const fetchUserType = async () => {
        try {
            const response = await fetch(`/user-details/${encodeURIComponent(loggedInUserEmail)}`);
            if (response.ok) {
                const userData = await response.json();
                setUserType(userData.userType);
                setManagerEmail(userData.managerEmail || ''); // Assuming managerEmail is available in user data
                fetchAnnouncements(loggedInUserEmail, userData.managerEmail || '');
            } else {
                console.error('Failed to fetch user type');
            }
        } catch (error) {
            console.error('Error fetching user type:', error);
        }
    };

    // Define a function to handle announcement submission
    const handleAnnouncementSubmit = async (announcementData) => {
        try {
            const response = await fetch('/announcements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(announcementData)
            });
            if (response.ok) {
                console.log('Announcement created successfully');
                fetchAnnouncements(loggedInUserEmail, managerEmail); // Refresh announcements after submission
            } else {
                console.error('Failed to create announcement');
            }
        } catch (error) {
            console.error('Error creating announcement:', error);
        }
    };

    return (
        <div className="announcements-list-container">
            <h2>Announcements</h2>
            {userType === 'manager' && <AnnouncementsForm onAnnouncementSubmit={handleAnnouncementSubmit} />}
            {announcements.length === 0 ? (
                <p>No announcements available</p>
            ) : (
                <div>
                    {announcements.map((announcement, index) => (
                        <div key={index} className={`announcement ${announcement.manager === loggedInUserEmail ? 'announcement-right' : ''}`}>
                            <h3 className="announcement-title">{announcement.title}</h3>
                            <p className="announcement-message">{announcement.message}</p>
                            <p className="announcement-details">Posted by: {announcement.manager}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AnnouncementsList;
