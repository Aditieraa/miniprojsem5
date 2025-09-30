import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import { supabase, mapRoleToAppRole, createMockUserData } from '../../../supabaseClient';

const AuthContainer = ({ onLogin, isLoading }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Check Supabase session on initial load
  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // If a valid Supabase session exists, log them in locally
        const roleKey = user?.user_metadata?.user_role || 'candidate'; // Get role from metadata
        
        const { userName, gender } = createMockUserData(user.email, roleKey);

        const userData = {
            id: user.id,
            name: userName,
            email: user.email,
            role: mapRoleToAppRole(roleKey),
            avatar: `https://randomuser.me/api/portraits/${gender}/${Math.floor(Math.random() * 50) + 1}.jpg`
        };

        // This triggers the local user state update and redirect in LoginPage.jsx
        onLogin(userData); 
      }
    };
    checkSession();
  }, []);

  const handleSupabaseAuthCallback = async ({ user, roleKey }) => {
    if (!user) return; // Should not happen with successful auth call

    const finalAppRole = mapRoleToAppRole(roleKey);
    const { userName, gender } = createMockUserData(user.email, roleKey);
    
    const userData = {
        id: user.id,
        name: userName,
        email: user.email,
        role: finalAppRole,
        avatar: `https://randomuser.me/api/portraits/${gender}/${Math.floor(Math.random() * 50) + 1}.jpg`
    };
    
    // Proceed to login flow handler in LoginPage.jsx
    await onLogin(userData);
  };

  return (
    <div className="w-full max-w-md">
        {isLoginMode ? (
            <LoginForm 
                onLogin={handleSupabaseAuthCallback} 
                isLoading={isLoading} 
                onToggleMode={() => setIsLoginMode(false)}
            />
        ) : (
            <RegistrationForm 
                onRegister={handleSupabaseAuthCallback} 
                isLoading={isLoading} 
                onToggleMode={() => setIsLoginMode(true)}
            />
        )}
    </div>
  );
};

export default AuthContainer;
