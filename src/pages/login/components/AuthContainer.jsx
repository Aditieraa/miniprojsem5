import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

// Helper function to map detailed mock role keys to simplified application roles
const mapRoleToAppRole = (roleKey) => {
    switch (roleKey) {
        case 'candidate':
            return 'jobSeeker'; 
        case 'recruiter':
        case 'company':
        case 'interviewer':
        case 'admin':
            return 'recruiter'; // All hiring-side roles map to recruiter dashboard for navigation
        default:
            return 'jobSeeker';
    }
};

const AuthContainer = ({ onLogin, isLoading }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authError, setAuthError] = useState('');

  const handleRegistration = async (formData) => {
    setAuthError('');
    
    // 1. Mock Registration: Save new user credentials (email/password/role) to local storage
    const newMockUser = {
        email: formData.email,
        password: formData.password,
        roleKey: formData.role, // Store the specific role key
    };
    
    // Retrieve existing mock users or initialize an empty object
    const existingUsers = JSON.parse(localStorage.getItem('prolink-mock-users') || '{}');
    const fixedEmails = [
        'candidate@prolink.com', 'recruiter@prolink.com', 'company@prolink.com', 
        'interviewer@prolink.com', 'admin@prolink.com'
    ];

    // Check if user already exists (fixed accounts or dynamic accounts)
    if (existingUsers[formData.email] || fixedEmails.includes(formData.email)) {
        setAuthError('Registration failed: A user with this email already exists.');
        return;
    }

    // Save the new user
    localStorage.setItem('prolink-mock-users', JSON.stringify({
        ...existingUsers,
        [formData.email]: newMockUser
    }));

    // 2. Automatically Log In after successful registration
    const finalAppRole = mapRoleToAppRole(formData.role);
    const nameSuffix = formData.role.charAt(0).toUpperCase() + formData.role.slice(1);
    
    let userName;
    let gender;
    
    if (finalAppRole === 'recruiter') {
        userName = `Aditi (${nameSuffix})`;
        gender = 'women';
    } else {
        userName = `User (${nameSuffix})`;
        gender = 'men';
    }
    
    const userData = {
        id: Date.now(),
        name: userName,
        email: formData.email,
        role: finalAppRole,
        avatar: `https://randomuser.me/api/portraits/${gender}/${Math.floor(Math.random() * 50) + 1}.jpg`
    };

    // Use a small delay to simulate network latency for registration
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await onLogin(userData); // Proceed to login flow
  };

  return (
    <div className="w-full max-w-md">
        {/* Display general authentication errors above the forms if necessary */}
        {authError && (
             <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg">
                <p className="text-sm text-error">{authError}</p>
            </div>
        )}
        
        {isLoginMode ? (
            <LoginForm 
                onLogin={onLogin} 
                isLoading={isLoading} 
                onToggleMode={() => {
                    setIsLoginMode(false);
                    setAuthError('');
                }}
            />
        ) : (
            <RegistrationForm 
                onRegister={handleRegistration} 
                isLoading={isLoading} 
                onToggleMode={() => {
                    setIsLoginMode(true);
                    setAuthError('');
                }}
            />
        )}
    </div>
  );
};

export default AuthContainer;
