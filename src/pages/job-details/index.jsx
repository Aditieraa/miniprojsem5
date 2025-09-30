import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';

import QuickActionMenu from '../../components/ui/QuickActionMenu';
import JobHeader from './components/JobHeader';
import JobDescription from './components/JobDescription';
import CompanyProfile from './components/CompanyProfile';
import SkillsMatch from './components/SkillsMatch';
import SimilarJobs from './components/SimilarJobs';
import ApplicationModal from './components/ApplicationModal';
import SalaryInsights from './components/SalaryInsights';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { supabase } from '../../supabaseClient'; // Import supabase

const JobDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const jobId = searchParams?.get('id') || '1';

  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data - fetch from local storage for ID/Role
  const storedUser = JSON.parse(localStorage.getItem('prolink-user') || '{}');
  const currentUser = {
    id: storedUser.id || 'mock-user-id',
    name: storedUser.name || "Sarah Johnson",
    email: storedUser.email || "sarah.johnson@email.com",
    role: storedUser.role || "job_seeker",
    skills: [
      { name: "React", level: "advanced" },
      { name: "JavaScript", level: "expert" },
      { name: "Node.js", level: "intermediate" },
      { name: "TypeScript", level: "intermediate" },
      { name: "Python", level: "beginner" }
    ]
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: 'application',
      title: 'Application Status Update',
      message: 'Your application for Senior Frontend Developer at TechCorp has been reviewed',
      timestamp: new Date(Date.now() - 3600000),
      read: false
    },
    {
      id: 2,
      type: 'job_match',
      title: 'New Job Match',
      message: '5 new jobs match your profile',
      timestamp: new Date(Date.now() - 7200000),
      read: false
    },
    {
      id: 3,
      type: 'interview',
      title: 'Interview Scheduled',
      message: 'Interview scheduled for tomorrow at 2:00 PM',
      timestamp: new Date(Date.now() - 86400000),
      read: true
    }
  ];

  // Mock job data (simulating a fetch from a 'jobs' table)
  const mockJobs = { /* ... mock job data remains the same ... */ 
    '1': {
      id: '1',
      title: "Senior Frontend Developer",
      company: { /* ... */ },
      location: "San Francisco, CA (Remote friendly)",
      workType: "Hybrid",
      type: "full-time",
      urgency: "hot",
      salary: { min: 120000, max: 160000 },
      salaryBreakdown: { base: 140000, bonus: 15000, equity: "$50k-$100k" },
      postedDate: "2 days ago",
      applicantCount: 47,
      skills: ["React", "JavaScript", "TypeScript", "Node.js", "GraphQL", "AWS", "Docker", "Git"],
      description: `We are seeking a talented Senior Frontend Developer...`,
      responsibilities: [ /* ... */ ],
      requirements: [ /* ... */ ],
      preferredQualifications: [ /* ... */ ],
      benefits: [ /* ... */ ],
      applicationQuestions: [ /* ... */ ]
    }
  };

  // Mock similar jobs
  const mockSimilarJobs = [ /* ... mock similar jobs data remains the same ... */ ];

  // Mock market salary data
  const mockMarketData = { /* ... mock market data remains the same ... */ };

  // Check if the user has already applied/saved this job
  const checkJobStatus = async (jobId, userId) => {
    if (!userId || !jobId) return;

    // Check if applied
    const { data: appliedData, error: appliedError } = await supabase
      .from('applications')
      .select('id')
      .eq('user_id', userId)
      .eq('job_id', jobId)
      .limit(1);

    if (appliedError) console.error("Error checking applied status:", appliedError);
    setIsApplied(appliedData?.length > 0);

    // Check if saved (MOCKING for now as we don't have a 'saved_jobs' table)
    // setIsSaved(Math.random() > 0.7); 
  };


  useEffect(() => {
    const loadJobData = async () => {
      setIsLoading(true);
      
      // Simulate API call to fetch job details
      setTimeout(() => {
        const jobData = mockJobs?.[jobId];
        if (jobData) {
          setJob(jobData);
          setSimilarJobs(mockSimilarJobs);
        }
        setIsLoading(false);
      }, 1000);
      
      // Check application status if user is logged in
      checkJobStatus(jobId, currentUser.id);
    };

    loadJobData();
  }, [jobId, currentUser.id]);

  const handleApply = () => {
    if (isApplied) return;
    setIsApplicationModalOpen(true);
  };

  const handleSave = () => {
    // Placeholder for actual save/unsave logic against a 'saved_jobs' table
    setIsSaved(!isSaved);
    console.log(`Job ${jobId} ${!isSaved ? 'saved' : 'unsaved'} (DB operation mock)`);
  };

  const handleApplicationSubmit = async (applicationData) => {
    if (!currentUser.id || !job) {
        console.error("Cannot submit application: User or Job data missing.");
        return;
    }

    // 1. Insert new application record into the 'applications' table
    const { data, error } = await supabase
      .from('applications')
      .insert({
        user_id: currentUser.id,
        job_id: job.id,
        company: job.company.name,
        position: job.title,
        appliedDate: new Date().toISOString(),
        status: 'applied', // Initial status
        expected_salary: applicationData.expectedSalary,
        cover_letter: applicationData.customCoverLetter || applicationData.coverLetter,
        // Assuming other fields like resume/questions are in separate tables/columns
      })
      .select()
      .single();

    if (error) {
      console.error('Application submission failed:', error);
      throw new Error('Failed to submit application to database.');
    }
    
    setIsApplied(true);
    console.log('Application submitted successfully:', data);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'search-jobs': navigate('/job-search-results');
        break;
      case 'view-applications': navigate('/application-tracking');
        break;
      case 'update-profile': navigate('/profile');
        break;
      case 'saved-jobs': navigate('/saved-jobs');
        break;
      default:
        console.log('Quick action:', action);
    }
  };

  const handleNotificationAction = (notificationId) => {
    console.log('Mark notification as read:', notificationId);
  };

  const handleMarkAllNotificationsRead = () => {
    console.log('Mark all notifications as read');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  if (isLoading) { /* ... existing loading JSX ... */ }
  if (!job) { /* ... existing Not Found JSX ... */ }

  return (
    <div className="min-h-screen bg-background">
      <Header user={currentUser} onLogout={handleLogout} />
      {/* Main Content */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Back Navigation */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              iconName="ArrowLeft"
              iconPosition="left"
              className="text-muted-foreground hover:text-foreground"
            >
              Back to Search Results
            </Button>
          </div>

          {/* Job Header */}
          <div className="mb-8">
            <JobHeader
              job={job}
              onApply={handleApply}
              onSave={handleSave}
              isSaved={isSaved}
              isApplied={isApplied}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Job Details */}
            <div className="lg:col-span-2 space-y-8">
              <JobDescription job={job} />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              <CompanyProfile company={job?.company} />
              
              <SkillsMatch
                jobSkills={job?.skills}
                userSkills={currentUser?.skills}
                matchPercentage={Math.round((currentUser?.skills?.filter(userSkill => 
                  job?.skills?.some(jobSkill => jobSkill?.toLowerCase() === userSkill?.name?.toLowerCase())
                )?.length / job?.skills?.length) * 100)}
              />

              <SalaryInsights job={job} marketData={mockMarketData} />

              <SimilarJobs jobs={similarJobs} currentJobId={job?.id} />
            </div>
          </div>
        </div>
      </div>
      {/* Application Modal */}
      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        job={job}
        onSubmit={handleApplicationSubmit}
      />
      {/* Quick Action Menu */}
      <QuickActionMenu
        user={currentUser}
        onAction={handleQuickAction}
        variant="floating"
      />
      {/* Sticky Apply Button (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border z-40">
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handleSave}
            iconName={isSaved ? "BookmarkCheck" : "Bookmark"}
            className="flex-shrink-0"
          >
            <span className="sr-only">{isSaved ? "Unsave" : "Save"}</span>
          </Button>
          <Button
            variant={isApplied ? "outline" : "default"}
            fullWidth
            onClick={handleApply}
            disabled={isApplied}
            iconName={isApplied ? "Check" : "Send"}
            iconPosition="left"
          >
            {isApplied ? "Applied" : "Apply Now"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;