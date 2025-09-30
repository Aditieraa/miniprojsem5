import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContainer from './components/AuthContainer';
import AnimatedBackground from './components/AnimatedBackground';
import AccessibilityMenu from './components/AccessibilityMenu';
import LoadingSpinner from './components/LoadingSpinner';
import { supabase } from '../../supabaseClient'; // Import supabase client

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in on initial load (e.g., after refresh)
    const savedUser = localStorage.getItem('prolink-user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      
      // Determine the correct dashboard based on the stored 'role' (app role: jobSeeker, recruiter, admin)
      let destinationPath;
      switch (userData?.role) {
        case 'jobSeeker':
          destinationPath = '/job-seeker-dashboard';
          break;
        case 'recruiter':
        case 'admin':
          // All hiring-side roles (Recruiter, Company, Interviewer, Admin) map to the recruiter dashboard
          destinationPath = '/recruiter-dashboard';
          break;
        default:
          destinationPath = '/job-seeker-dashboard';
      }

      // Redirect the authenticated user immediately, replacing the login entry in history
      navigate(destinationPath, { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (userData) => {
    setIsLoading(true);
    
    try {
      // Wait for a moment to simulate network latency
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Save user data to localStorage (Local copy for non-API components)
      localStorage.setItem('prolink-user', JSON.stringify(userData));
      setUser(userData);
      
      // Determine navigation path after successful form submission
      let destinationPath;
      switch (userData?.role) {
        case 'jobSeeker':
          destinationPath = '/job-seeker-dashboard';
          break;
        case 'recruiter':
        case 'admin':
          destinationPath = '/recruiter-dashboard';
          break;
        default:
          destinationPath = '/job-seeker-dashboard';
      }
      
      // Navigate after successful login
      navigate(destinationPath, { replace: true });

    } catch (error) {
      console.error('Login error:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // If user is logged in (meaning we are redirecting), show the spinner/loading state
  if (localStorage.getItem('prolink-user')) {
    return <LoadingSpinner message="Redirecting to your dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Accessibility Menu */}
      <AccessibilityMenu />
      
      {/* Main Content - Centered */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {/* Glassmorphism Container with Scale-In Animation (Aesthetic) */}
        <div className="bg-card/90 backdrop-blur-md border border-border/50 rounded-xl shadow-prominent p-8 w-full max-w-md animate-scale-in">
          {/* Using AuthContainer to switch between Login and Registration */}
          <AuthContainer onLogin={handleLogin} isLoading={isLoading} />
        </div>
      </div>
      
      {/* Loading Overlay */}
      {isLoading && <LoadingSpinner />}
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default LoginPage;
