import React, { useState, useEffect } from 'react';
import Navbar from './navbars/Navbar';
import UserSpecificDetails from './UserSpecificDetails';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const AdminUserView = ({setIsLoggedIn}) => {

    const navigate = useNavigate()
    const [UserDetails, setUserDetails] = useState([]);
    const [matchedUsers, setMatchedUsers] = useState([]);
    const [showDeleteButton, setShowDeleteButton] = useState(false);

    const [formData, setFormData] = useState({
        userId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
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

    async function runScripts() {
        try {
          const pythonResponse = await fetch('http://localhost:3001/execute-python-script', {
            method: 'POST',
          });
          if (!pythonResponse.ok) {
            throw new Error('Failed to execute Python script');
          }
          console.log('Python retrieval executed successfully');
    
          // Snow
          const pythonResponseSnow = await fetch('http://localhost:3001/execute-snow-python-script', {
            method: 'POST',
          });
          if (!pythonResponseSnow.ok) {
            throw new Error('Failed to execute Snow Python script');
          }
          console.log('Snow Python retrieval executed successfully');
      
          // Execute DBT
          const dbtResponse = await fetch('/rundbt', { method: 'GET' });
          if (!dbtResponse.ok) {
            throw new Error('DBT execution failed');
          }
      
          console.log('DBT executed successfully');
        } catch (error) {
          console.error('Error:', error.message);
          alert('Failed to execute Python script or DBT');
        }
      }

    async function handleDelete (e) {
        e.preventDefault()
        // Assuming you have an endpoint to delete a user by ID or email
        // Make sure to replace 'DELETE_USER_ENDPOINT' with your actual endpoint
        fetch("http://localhost:3001/deleteUser", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput: formData.userId }),
        })
            .then(response => {
                if (response.ok) {
                    // Update UI or take any necessary action after successful deletion
                    toast.success('User deleted successfully');
                    setTimeout(() => {
                        window.location.reload();
                    }, 5000);
                } else {
                    throw new Error('Failed to delete user');
                }
            })
            .catch(error => {
                console.error('Error deleting user:', error);
                toast.error('Failed to delete user. Please try again !!');
            });
            // await runScripts()
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setMatchedUsers([''])
        const matchedUsers = UserDetails[0].allUserData.filter(user => user.userId == formData.userId || formData.userId == user.email);
        setMatchedUsers(matchedUsers);
        if(matchedUsers.length == 0) {
            toast.error('User not found. Please try again !!');
        } else {
            setShowDeleteButton(true); // Show delete button if users are found
        }
    };

    return (
        <>
            <Navbar setIsLoggedIn={setIsLoggedIn} />
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
                        className="form-control me-2 w-25 border border-2 border-black rounded"
                        type="search"
                        placeholder="Please enter the User Id or email"
                        aria-label="Search"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                    />
                    <button
                        className="btn btn-outline-success ms-1"
                        type="submit"
                    >
                        Search
                    </button>
                    {showDeleteButton && (
                    <button
                        className="btn btn-outline-danger ms-3"
                        type="button"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    )}
                </div>
            </form>

            {matchedUsers.length > 0 && <UserSpecificDetails matchedUsers={matchedUsers} />}

        </>
    );
};

export default AdminUserView;
