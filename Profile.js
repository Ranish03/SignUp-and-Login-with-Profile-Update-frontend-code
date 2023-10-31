import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './FormStyles.css';

function Profile({ setLoggedIn }) {
  const [profileData, setProfileData] = useState({
    age: '',
    gender: '',
    // Add other profile fields here
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Extract the JWT token from a secure location (e.g., local storage)
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Authentication token not found. Please log in again.');
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    fetch('/api/profile', {
      method: 'PUT',
      headers,
      body: JSON.stringify(profileData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Profile updated successfully') {
          alert('Profile updated successfully!');
        } else {
          alert('Profile update failed. Please check your data.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="age"
          placeholder="Age"
          value={profileData.age}
          onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={profileData.gender}
          onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
        />
        {/* Add other profile fields here */}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

Profile.propTypes = {
  setLoggedIn: PropTypes.func.isRequired,
};

export default Profile;
