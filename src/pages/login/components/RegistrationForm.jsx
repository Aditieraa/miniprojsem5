import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationForm = ({ onRegister, isLoading, onToggleMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'candidate', // Default role
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});

  const roleOptions = [
    { value: 'candidate', label: 'Job Seeker/Candidate' },
    { value: 'recruiter', label: 'Recruiter' },
    { value: 'company', label: 'Company/Hiring Team' },
    { value: 'interviewer', label: 'Interviewer' },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRoleChange = (value) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (password.length < minLength) {
        return `Password must be at least ${minLength} characters long`;
    }
    if (!hasUppercase) {
        return 'Password must include at least one uppercase letter';
    }
    if (!hasLowercase) {
        return 'Password must include at least one lowercase letter';
    }
    if (!hasNumber) {
        return 'Password must include at least one number';
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }
    
    if (!formData.role) {
        newErrors.role = 'Role is required';
    }

    if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Call registration handler from parent
    await onRegister(formData);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center">
          <Icon name="UserPlus" size={32} color="white" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Create Your Account</h1>
        <p className="text-muted-foreground">Sign up to get started with ProLink</p>
      </div>
      {errors.general && (
        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-error mb-1">Registration Failed</p>
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
          placeholder="Create a password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          required
        />
        
        <div className="text-xs text-muted-foreground -mt-4 mb-2 p-1">
            Min 8 chars, 1 uppercase, 1 lowercase, 1 number.
        </div>

        <Select
            label="Your Role"
            options={roleOptions}
            value={formData.role}
            onChange={handleRoleChange}
            placeholder="Select your role"
            error={errors.role}
            required
        />

        <Checkbox
            label="I accept the Terms of Service and Privacy Policy"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleInputChange}
            error={errors.acceptTerms}
            required
        />

        <Button
          type="submit"
          fullWidth
          loading={isLoading}
          className="h-12"
        >
          {isLoading ? 'Creating account...' : 'Sign up'}
        </Button>
      </form>
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            type="button"
            className="text-primary hover:text-primary/80 font-medium transition-smooth"
            onClick={onToggleMode}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
