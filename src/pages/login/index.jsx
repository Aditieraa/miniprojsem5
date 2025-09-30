import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import AnimatedBackground from './components/AnimatedBackground';
import AccessibilityMenu from './components/AccessibilityMenu';
import LoadingSpinner from './components/LoadingSpinner';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('prolink-user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      
      // Redirect based on role
      switch (userData?.role) {
        case 'jobSeeker': navigate('/job-seeker-dashboard');
          break;
        case 'recruiter': navigate('/recruiter-dashboard');
          break;
        case 'admin': navigate('/recruiter-dashboard');
          break;
        default:
          navigate('/job-seeker-dashboard');
      }
    }
  }, [navigate]);

  const handleLogin = async (userData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save user data to localStorage
      localStorage.setItem('prolink-user', JSON.stringify(userData));
      setUser(userData);
      
      // Success feedback could be added here
      console.log('Login successful:', userData);
      
    } catch (error) {
      console.error('Login error:', error);
      // Error handling could be added here
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render login form if user is already authenticated
  if (user) {
    return <LoadingSpinner message="Redirecting to your dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Accessibility Menu */}
      <AccessibilityMenu />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {/* Glassmorphism Container */}
        <div className="w-full max-w-md">
          <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl shadow-prominent p-8">
            <LoginForm onLogin={handleLogin} isLoading={isLoading} />
          </div>
        </div>
      </div>
      
      {/* Loading Overlay */}
      {isLoading && <LoadingSpinner />}
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default LoginPage;