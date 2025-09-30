import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import QuickActionMenu from '../../components/ui/QuickActionMenu';
import ApplicationStatusCard from './components/ApplicationStatusCard';
import JobRecommendationCard from './components/JobRecommendationCard';
import ProfileCompletionCard from './components/ProfileCompletionCard';
import InterviewScheduleCard from './components/InterviewScheduleCard';
import SkillAnalysisCard from './components/SkillAnalysisCard';
import JobAlertsCard from './components/JobAlertsCard';
import ApplicationMetricsChart from './components/ApplicationMetricsChart';
import QuickActionsPanel from './components/QuickActionsPanel';
import Icon from '../../components/AppIcon';


const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Aditi Talekar",
    email: "adititalekar2005@gmail.com",
    role: "job_seeker",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    profileCompletion: 75,
    memberSince: "2024-01-15"
  };

  // Mock applications data
  const mockApplications = [
    {
      id: 1,
      position: "Senior Frontend Developer",
      company: "TechCorp Inc",
      status: "Interview",
      appliedDate: "2024-12-08",
      hasUpdate: true
    },
    {
      id: 2,
      position: "React Developer",
      company: "StartupXYZ",
      status: "Shortlisted",
      appliedDate: "2024-12-06",
      hasUpdate: false
    },
    {
      id: 3,
      position: "Full Stack Engineer",
      company: "InnovateLabs",
      status: "Applied",
      appliedDate: "2024-12-05",
      hasUpdate: false
    },
    {
      id: 4,
      position: "JavaScript Developer",
      company: "WebSolutions",
      status: "Rejected",
      appliedDate: "2024-12-03",
      hasUpdate: false
    }
  ];

  // Mock job recommendations
  const mockRecommendations = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "Microsoft",
      location: "Seattle, WA",
      salaryMin: 120000,
      salaryMax: 160000,
      matchScore: 95,
      tags: ["React", "TypeScript", "Node.js"],
      postedDate: "2024-12-10"
    },
    {
      id: 2,
      title: "Frontend Engineer",
      company: "Google",
      location: "Mountain View, CA",
      salaryMin: 130000,
      salaryMax: 180000,
      matchScore: 88,
      tags: ["JavaScript", "Vue.js", "CSS"],
      postedDate: "2024-12-09"
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Amazon",
      location: "Remote",
      salaryMin: 110000,
      salaryMax: 150000,
      matchScore: 82,
      tags: ["React", "AWS", "Python"],
      postedDate: "2024-12-08"
    }
  ];

  // Mock interviews
  const mockInterviews = [
    {
      id: 1,
      position: "Senior Frontend Developer",
      company: "TechCorp Inc",
      interviewer: "John Smith, Engineering Manager",
      scheduledAt: "2024-12-12T14:00:00Z",
      type: "video",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      notes: "Technical interview focusing on React and system design"
    },
    {
      id: 2,
      position: "React Developer",
      company: "StartupXYZ",
      interviewer: "Emily Davis, CTO",
      scheduledAt: "2024-12-13T10:30:00Z",
      type: "phone",
      notes: "Initial screening call"
    }
  ];

  // Mock skill gaps
  const mockSkillGaps = [
    {
      id: 1,
      name: "TypeScript",
      category: "programming",
      currentLevel: 40,
      marketDemand: 85,
      jobsRequiring: 1250
    },
    {
      id: 2,
      name: "AWS",
      category: "cloud",
      currentLevel: 25,
      marketDemand: 90,
      jobsRequiring: 980
    },
    {
      id: 3,
      name: "Docker",
      category: "devops",
      currentLevel: 30,
      marketDemand: 75,
      jobsRequiring: 750
    }
  ];

  // Mock learning recommendations
  const mockLearningRecommendations = [
    {
      id: 1,
      title: "Complete TypeScript Course",
      provider: "Udemy",
      duration: "12 hours",
      rating: 4.8,
      price: 89,
      level: "intermediate"
    },
    {
      id: 2,
      title: "AWS Fundamentals",
      provider: "AWS Training",
      duration: "8 hours",
      rating: 4.9,
      price: 0,
      level: "beginner"
    }
  ];

  // Mock job alerts
  const mockJobAlerts = [
    {
      id: 1,
      title: "React Developer Jobs",
      query: "React Developer in San Francisco",
      frequency: "daily",
      lastTriggered: "2024-12-10",
      hasNewJobs: true,
      newJobsCount: 5
    },
    {
      id: 2,
      title: "Remote Frontend Jobs",
      query: "Frontend Developer Remote $100k+",
      frequency: "weekly",
      lastTriggered: "2024-12-08",
      hasNewJobs: false,
      newJobsCount: 0
    }
  ];

  // Mock saved searches
  const mockSavedSearches = [
    {
      id: 1,
      title: "Senior Developer Positions",
      query: "Senior Developer JavaScript",
      resultCount: 234,
      savedAt: "2024-12-05"
    },
    {
      id: 2,
      title: "Startup Jobs",
      query: "Developer Startup Series A",
      resultCount: 89,
      savedAt: "2024-12-03"
    }
  ];

  // Mock profile completion data
  const mockProfileData = {
    completionScore: 75,
    missingItems: [
      {
        id: 1,
        type: "portfolio",
        title: "Add Portfolio",
        description: "Showcase your projects",
        points: 15
      },
      {
        id: 2,
        type: "skills",
        title: "Add More Skills",
        description: "List your technical skills",
        points: 10
      }
    ],
    achievements: [
      {
        id: 1,
        name: "Profile Complete",
        type: "profile_complete"
      },
      {
        id: 2,
        name: "First Application",
        type: "first_application"
      }
    ]
  };

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      type: "interview",
      title: "Interview Scheduled",
      message: "Your interview with TechCorp Inc is scheduled for tomorrow at 2:00 PM",
      timestamp: new Date(Date.now() - 3600000),
      read: false
    },
    {
      id: 2,
      type: "application",
      title: "Application Update",
      message: "Your application for React Developer at StartupXYZ has been shortlisted",
      timestamp: new Date(Date.now() - 7200000),
      read: false
    },
    {
      id: 3,
      type: "job_match",
      title: "New Job Match",
      message: "5 new jobs match your preferences",
      timestamp: new Date(Date.now() - 10800000),
      read: true
    }
  ];

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      setUser(mockUser);
      setNotifications(mockNotifications);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    // Clear persistent storage and redirect to login
    localStorage.removeItem('prolink-user');
    setUser(null);
    navigate('/login');
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'search-jobs': navigate('/job-search-results');
        break;
      case 'update-profile': case'update-resume': case'profile-settings':
        // Navigate to profile page (not implemented)
        console.log('Navigate to profile');
        break;
      case 'view-applications': navigate('/application-tracking');
        break;
      case 'saved-jobs': case'job-alerts':
        // Navigate to respective pages (not implemented)
        console.log(`Maps to ${actionId}`);
        break;
      default:
        console.log(`Action: ${actionId}`);
    }
  };

  const handleSearch = (query, filters) => {
    navigate('/job-search-results', { 
      state: { searchQuery: query, filters } 
    });
  };

  const handleViewAllApplications = () => {
    navigate('/application-tracking');
  };

  const handleQuickApply = (jobId) => {
    navigate('/job-details', { state: { jobId } });
  };

  const handleViewCalendar = () => {
    console.log('View calendar');
  };

  const handleJoinInterview = (interviewId) => {
    console.log('Join interview:', interviewId);
  };

  const handleUpdateProfile = () => {
    console.log('Update profile');
  };

  const handleViewCourses = () => {
    console.log('View courses');
  };

  const handleStartLearning = (skillId) => {
    console.log('Start learning:', skillId);
  };

  const handleCreateAlert = () => {
    console.log('Create alert');
  };

  const handleViewAlert = (alertId) => {
    console.log('View alert:', alertId);
  };

  const handleViewAnalytics = () => {
    console.log('View analytics');
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev => 
      prev?.map(notif => 
        notif?.id === notificationId 
          ? { ...notif, read: true }
          : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev?.map(notif => ({ ...notif, read: true }))
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} onLogout={handleLogout} />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Icon name="Loader2" size={32} className="animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, {user?.name?.split(' ')?.[0]}! 👋
                </h1>
                <p className="text-muted-foreground">
                  Here's what's happening with your job search today.
                </p>
              </div>
              
              <div className="hidden lg:flex items-center space-x-4">
                <NotificationIndicator
                  user={user}
                  notifications={notifications}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAllAsRead={handleMarkAllAsRead}
                />
                <QuickActionMenu
                  user={user}
                  onAction={handleQuickAction}
                  variant="dropdown"
                />
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Primary Content */}
            <div className="lg:col-span-8 space-y-6">
              {/* Job Recommendations */}
              <JobRecommendationCard
                recommendations={mockRecommendations}
                onSearch={handleSearch}
                onApplyQuick={handleQuickApply}
              />

              {/* Application Status */}
              <ApplicationStatusCard
                applications={mockApplications}
                onViewAll={handleViewAllApplications}
              />

              {/* Analytics Chart */}
              <ApplicationMetricsChart
                applicationData={mockApplications}
                successRate={12}
                totalApplications={83}
                onViewAnalytics={handleViewAnalytics}
              />

              {/* Job Alerts */}
              <JobAlertsCard
                alerts={mockJobAlerts}
                savedSearches={mockSavedSearches}
                onCreateAlert={handleCreateAlert}
                onViewAlert={handleViewAlert}
                onQuickApply={handleQuickApply}
              />
            </div>

            {/* Right Column - Secondary Content */}
            <div className="lg:col-span-4 space-y-6">
              {/* Profile Completion */}
              <ProfileCompletionCard
                completionScore={mockProfileData?.completionScore}
                missingItems={mockProfileData?.missingItems}
                achievements={mockProfileData?.achievements}
                onUpdateProfile={handleUpdateProfile}
              />

              {/* Interview Schedule */}
              <InterviewScheduleCard
                interviews={mockInterviews}
                onViewCalendar={handleViewCalendar}
                onJoinInterview={handleJoinInterview}
              />

              {/* Skill Analysis */}
              <SkillAnalysisCard
                skillGaps={mockSkillGaps}
                recommendations={mockLearningRecommendations}
                onViewCourses={handleViewCourses}
                onStartLearning={handleStartLearning}
              />

              {/* Quick Actions Panel */}
              <QuickActionsPanel
                user={user}
                onAction={handleQuickAction}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Mobile Quick Action Menu */}
      <QuickActionMenu
        user={user}
        onAction={handleQuickAction}
        variant="floating"
        className="lg:hidden"
      />
    </div>
  );
};

export default JobSeekerDashboard;
