import { createClient } from '@supabase/supabase-js';

// Load Supabase configuration from environment variables
// VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be defined in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase configuration missing. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.");
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Helper function to map Supabase user metadata or form roles 
 * to the simplified application roles used for routing.
 * @param {string} roleKey - The role provided during registration (e.g., 'recruiter', 'candidate').
 * @returns {string} The application role ('jobSeeker', 'recruiter', or 'admin').
 */
export const mapRoleToAppRole = (roleKey) => {
    switch (roleKey) {
        case 'candidate':
            return 'jobSeeker'; 
        case 'recruiter':
        case 'company':
        case 'interviewer':
            // All hiring-side roles map to the recruiter dashboard
            return 'recruiter'; 
        case 'admin':
            return 'admin';
        default:
            return 'jobSeeker';
    }
};

/**
 * Creates a display name based on the email and role for the mock profile data.
 * @param {string} email - User email.
 * @param {string} roleKey - User's detailed role (e.g., 'candidate', 'recruiter').
 * @returns {object} { userName, gender }
 */
export const createMockUserData = (email, roleKey) => {
    const finalAppRole = mapRoleToAppRole(roleKey);
    const nameSuffix = roleKey.charAt(0).toUpperCase() + roleKey.slice(1);
    const namePart = email.split('@')[0];
    
    let userName;
    let gender;
    
    if (finalAppRole === 'recruiter' || finalAppRole === 'admin') {
        // Use Aditi for fixed recruiter/admin accounts, or the first part of the email
        userName = namePart === 'admin' || namePart === 'recruiter' ? `Aditi (${nameSuffix})` : `${namePart.charAt(0).toUpperCase() + namePart.slice(1)} (${nameSuffix})`;
        gender = 'women';
    } else if (finalAppRole === 'jobSeeker') {
        userName = namePart === 'candidate' ? `User (${nameSuffix})` : `${namePart.charAt(0).toUpperCase() + namePart.slice(1)} (${nameSuffix})`;
        gender = 'men';
    } else {
        userName = `${namePart.charAt(0).toUpperCase() + namePart.slice(1)} (${nameSuffix})`;
        gender = 'men';
    }
    
    return { userName, gender };
};
