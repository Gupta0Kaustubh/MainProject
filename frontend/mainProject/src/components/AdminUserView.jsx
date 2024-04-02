import React, { useState, useEffect } from 'react';
import Navbar from './navbars/Navbar';
import UserSpecificDetails from './UserSpecificDetails';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AdminUserView = () => {

    const [UserDetails, setUserDetails] = useState([]);
    const [matchedUsers, setMatchedUsers] = useState([]);

    const [formData, setFormData] = useState({
        userId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (value.trim() === '') {
            window.location.reload();
        }
    };

    useEffect(() => {
        // Getting UserData
        fetch("http://localhost:3001/getAllAdminUserData")
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(function (data) {
                // Convert data to array if it's not already an array
                const userDetailsArray = Array.isArray(data) ? data : [data];
                setUserDetails(userDetailsArray);
            })
            .catch(function (error) {
                console.error("Error fetching user data:", error);
            });
    }, []);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const matchedUsers = UserDetails[0].allUserData.filter(user => user.userId == formData.userId || formData.userId == user.email);
        setMatchedUsers(matchedUsers);
        if(matchedUsers.length == 0) {
            toast.error('User not found. Please try again !!');
        }
    };

    return (
        <>
            <Navbar />
            {/* ToastContainer for displaying notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
            <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center mt-4">
                    <input
                        className="form-control me-2 w-25"
                        type="search"
                        placeholder="Please enter the User Id or email"
                        aria-label="Search"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                    />
                    <button
                        className="btn btn-outline-success"
                        type="submit"
                    >
                        Search
                    </button>
                </div>
            </form>

            {matchedUsers.length > 0 && <UserSpecificDetails matchedUsers={matchedUsers} />}

        </>
    );
};

export default AdminUserView;
