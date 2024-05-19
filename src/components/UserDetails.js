import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserDetails.css'; // Import UserDetails stylesheet

const UserDetails = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                // Retrieve email from local storage
                const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
                const response = await fetch(`/user-details/${encodeURIComponent(loggedInUserEmail)}`);
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    setError('User not found');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
                setError('Internal server error');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div className="user-details-container">
            <h2>User Details</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {user && (
                <div className="user-details">
                    <p><strong>First Name:</strong> {user.firstName}</p>
                    <p><strong>Last Name:</strong> {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    {user.userType === 'manager' && (
                        <Link to="/create-bill">
                            <button>Create Bill</button>
                        </Link>
                    )}
                    {/* Display other user details here */}
                </div>
            )}
        </div>
    );
};

export default UserDetails;
