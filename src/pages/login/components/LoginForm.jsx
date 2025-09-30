import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = ({ onLogin, isLoading, onToggleMode }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  // Built-in fixed mock credentials
  const fixedCredentials = {
candidate: { email: 'adititalekar2005@gmail.com', password: 'aditi123' },
    recruiter: { email: 'arya2005@gmail.com', password: 'arya123' },
    company: { email: 'diksha2006@gmail.com', password: 'arya123' },
    interviewer: { email: 'vaibhav2005@gmail.com', password: 'vaibhav123' },
    admin: { email: 'admin@gmail.com', password: 'admin123' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Using a simple check here, as strict validation is for registration
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const { email, password } = formData;
    let userRoleKey = null;
    
    // 1. Check Fixed Mock Credentials
    for (const [roleKey, creds] of Object.entries(fixedCredentials)) {
      if (creds.email === email && creds.password === password) {
        userRoleKey = roleKey;
        break;
      }
    }

    // 2. Check Dynamically Registered Users
    if (!userRoleKey) {
        // Load custom users from local storage
        const customUsers = JSON.parse(localStorage.getItem('prolink-mock-users') || '{}');
        const customUser = customUsers[email];
        if (customUser && customUser.password === password) {
            userRoleKey = customUser.roleKey;
        }
    }
    
    if (!userRoleKey) {
      setErrors({ 
        general: `Invalid credentials. Please check your email/password. You can use any registered email or a fixed mock account.` 
      });
      return;
    }

    // --- Role Mapping and User Data Construction ---
    let finalAppRole;
    let userName;
    let gender;
    let nameSuffix = userRoleKey.charAt(0).toUpperCase() + userRoleKey.slice(1);

    switch (userRoleKey) {
      case 'candidate':
        finalAppRole = 'jobSeeker';
        userName = `User (${nameSuffix})`;
        gender = 'men';
        break;
      case 'recruiter':
        finalAppRole = 'recruiter';
        userName = `Aditi (${nameSuffix})`;
        gender = 'women';
        break;
      case 'company':
        finalAppRole = 'recruiter';
        userName = `TechCorp Inc. (${nameSuffix})`;
        gender = 'men';
        break;
      case 'interviewer':
        finalAppRole = 'recruiter';
        userName = `User (${nameSuffix})`;
        gender = 'men';
        break;
      case 'admin':
        finalAppRole = 'admin';
        userName = `Admin User (Aditi)`;
        gender = 'women';
        break;
      default:
        // Handle dynamically registered users
        finalAppRole = ['recruiter', 'company', 'interviewer', 'admin'].includes(userRoleKey) ? 'recruiter' : 'jobSeeker';
        
        // Use Aditi for recruiter side, User for job seeker side for dynamic accounts
        if (finalAppRole === 'recruiter') {
             userName = `Aditi (${nameSuffix})`;
             gender = 'women';
        } else {
             userName = `User (${nameSuffix})`;
             gender = 'men';
        }
    }

    const userData = {
      id: Date.now(),
      name: userName,
      email: email,
      role: finalAppRole, 
      avatar: `https://randomuser.me/api/portraits/${gender}/${Math.floor(Math.random() * 50) + 1}.jpg`
    };
    
    // Call the onLogin prop to handle saving the user and navigating.
    await onLogin(userData);
  };

  const handleSocialLogin = async (provider) => {
    const userData = {
      id: Date.now(),
      name: provider === 'google' ? 'Google User' : 'LinkedIn User',
      email: `${provider}user@example.com`,
      role: 'jobSeeker',
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50) + 1}.jpg`
    };
    
    await onLogin(userData);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center">
          <Icon name="Zap" size={32} color="white" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
        <p className="text-muted-foreground">Sign in to your ProLink account</p>
      </div>
      {errors.general && (
        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-error mb-1">Authentication Failed</p>
              <p className="text-xs text-error/80">{errors.general}</p>
            </div>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          required
        />

        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 transition-smooth"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          fullWidth
          loading={isLoading}
          className="h-12"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-card/90 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
            className="h-12"
          >
            <Icon name="Chrome" size={20} className="mr-2" />
            Google
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialLogin('linkedin')}
            disabled={isLoading}
            className="h-12"
          >
            <Icon name="Linkedin" size={20} className="mr-2" />
            LinkedIn
          </Button>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button
            type="button"
            className="text-primary hover:text-primary/80 font-medium transition-smooth"
            onClick={onToggleMode}
          >
            Sign up for free
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
