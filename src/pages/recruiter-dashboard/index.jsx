import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import QuickActionMenu from '../../components/ui/QuickActionMenu';
import JobPostingCard from './components/JobPostingCard';
import PipelineOverview from './components/PipelineOverview';
import ActivityFeed from './components/ActivityFeed';
import QuickActionsPanel from './components/QuickActionsPanel';
import AnalyticsPanel from './components/AnalyticsPanel';
import InterviewScheduler from './components/InterviewScheduler';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Mock user data
  useEffect(() => {
    const mockUser = {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@techcorp.com",
      role: "recruiter",
      company: "TechCorp Solutions",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    };
    setUser(mockUser);

    // Mock notifications
    const mockNotifications = [
      {
        id: 1,
        type: 'application',
        title: 'New Application Received',
        message: 'Michael Chen applied for Senior Frontend Developer position',
        timestamp: new Date(Date.now() - 300000),
        read: false
      },
      {
        id: 2,
        type: 'interview',
        title: 'Interview Completed',
        message: 'Technical interview with Emma Wilson has been completed',
        timestamp: new Date(Date.now() - 1800000),
        read: false
      },
      {
        id: 3,
        type: 'message',
        title: 'New Message',
        message: 'Candidate Alex Rodriguez sent a follow-up message',
        timestamp: new Date(Date.now() - 3600000),
        read: true
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  // Mock job postings data
  const jobPostings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "San Francisco, CA",
      status: "active",
      urgency: "hot",
      postedDate: "3 days ago",
      expiryDate: "Dec 15, 2024",
      totalApplications: 47,
      shortlisted: 12,
      interviewed: 5,
      qualityScore: 85,
      views: 234
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      status: "active",
      urgency: "featured",
      postedDate: "1 week ago",
      expiryDate: "Dec 20, 2024",
      totalApplications: 89,
      shortlisted: 23,
      interviewed: 8,
      qualityScore: 92,
      views: 456
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      location: "New York, NY",
      status: "paused",
      urgency: null,
      postedDate: "2 weeks ago",
      expiryDate: "Dec 25, 2024",
      totalApplications: 34,
      shortlisted: 8,
      interviewed: 3,
      qualityScore: 78,
      views: 167
    }
  ];

  // Mock pipeline data
  const pipelineData = {
    applied: [
      {
        id: 1,
        name: "Michael Chen",
        position: "Senior Frontend Developer",
        experience: "5+ years",
        matchScore: 92,
        priority: "high",
        stage: "applied",
        lastActivity: "2 hours ago"
      },
      {
        id: 2,
        name: "Sarah Williams",
        position: "Product Manager",
        experience: "7+ years",
        matchScore: 88,
        priority: "medium",
        stage: "applied",
        lastActivity: "1 day ago"
      }
    ],
    screening: [
      {
        id: 3,
        name: "David Rodriguez",
        position: "UX Designer",
        experience: "4+ years",
        matchScore: 85,
        priority: "medium",
        stage: "screening",
        lastActivity: "3 hours ago"
      }
    ],
    interview: [
      {
        id: 4,
        name: "Emma Wilson",
        position: "Senior Frontend Developer",
        experience: "6+ years",
        matchScore: 94,
        priority: "high",
        stage: "interview",
        lastActivity: "5 hours ago"
      }
    ],
    offer: [
      {
        id: 5,
        name: "Alex Thompson",
        position: "Product Manager",
        experience: "8+ years",
        matchScore: 96,
        priority: "high",
        stage: "offer",
        lastActivity: "1 day ago"
      }
    ],
    hired: [],
    rejected: []
  };

  // Mock activity data
  const activities = [
    {
      id: 1,
      type: 'application',
      title: 'New Application',
      description: 'Michael Chen applied for Senior Frontend Developer',
      timestamp: new Date(Date.now() - 300000),
      read: false,
      priority: 'high',
      candidate: {
        name: 'Michael Chen',
        position: 'Senior Frontend Developer'
      },
      actions: [
        { type: 'view', label: 'View Profile', icon: 'Eye' },
        { type: 'shortlist', label: 'Shortlist', icon: 'Plus' }
      ]
    },
    {
      id: 2,
      type: 'interview',
      title: 'Interview Completed',
      description: 'Technical interview with Emma Wilson finished',
      timestamp: new Date(Date.now() - 1800000),
      read: false,
      priority: 'medium',
      candidate: {
        name: 'Emma Wilson',
        position: 'Senior Frontend Developer'
      },
      actions: [
        { type: 'feedback', label: 'Add Feedback', icon: 'MessageSquare' },
        { type: 'next-round', label: 'Next Round', icon: 'ArrowRight' }
      ]
    },
    {
      id: 3,
      type: 'status_change',
      title: 'Candidate Status Updated',
      description: 'Alex Thompson moved to Offer stage',
      timestamp: new Date(Date.now() - 3600000),
      read: true,
      priority: 'low',
      candidate: {
        name: 'Alex Thompson',
        position: 'Product Manager'
      }
    }
  ];

  // Mock upcoming interviews
  const upcomingInterviews = [
    {
      id: 1,
      candidate: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      },
      position: 'Senior Frontend Developer',
      type: 'video',
      dateTime: new Date(Date.now() + 7200000), // 2 hours from now
      duration: '1 hour',
      interviewer: 'John Smith',
      status: 'confirmed',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      notes: 'Technical interview focusing on React and system design'
    },
    {
      id: 2,
      candidate: {
        name: 'David Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      position: 'UX Designer',
      type: 'phone',
      dateTime: new Date(Date.now() + 14400000), // 4 hours from now
      duration: '45 minutes',
      interviewer: 'Lisa Chen',
      status: 'pending',
      notes: 'Initial screening call to discuss experience and portfolio'
    }
  ];

  // Mock analytics data
  const analyticsData = {
    totalApplications: 1247,
    timeToFill: 26,
    costPerHire: 3240,
    offerAcceptance: 78.3
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const handleNotificationMarkAsRead = (notificationId) => {
    setNotifications(prev =>
      prev?.map(notification =>
        notification?.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleNotificationMarkAllAsRead = () => {
    setNotifications(prev =>
      prev?.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'post-job': console.log('Navigate to job posting form');
        break;
      case 'search-candidates': console.log('Navigate to candidate search');
        break;
      case 'schedule-interview': console.log('Open interview scheduler');
        break;
      case 'team-collaboration': console.log('Navigate to team management');
        break;
      case 'recent-applications': setActiveTab('pipeline');
        break;
      case 'pending-interviews': setActiveTab('interviews');
        break;
      case 'analytics': setActiveTab('analytics');
        break;
      default:
        console.log(`Action: ${action}`);
    }
  };

  const handleJobAction = (action, jobId) => {
    switch (action) {
      case 'view-details':
        navigate(`/job-details/${jobId}`);
        break;
      case 'edit-job':
        console.log(`Edit job ${jobId}`);
        break;
      case 'view-candidates':
        console.log(`View candidates for job ${jobId}`);
        break;
      default:
        console.log(`Job action: ${action} for job ${jobId}`);
    }
  };

  const handlePipelineStageChange = (candidateId, newStage) => {
    console.log(`Move candidate ${candidateId} to ${newStage}`);
  };

  const handlePipelineBulkAction = (action, candidateIds) => {
    console.log(`Bulk action: ${action} for candidates:`, candidateIds);
  };

  const handleActivityAction = (activityId, actionType) => {
    console.log(`Activity action: ${actionType} for activity ${activityId}`);
  };

  const handleInterviewAction = (action, interviewId = null) => {
    switch (action) {
      case 'schedule': console.log('Open interview scheduling form');
        break;
      case 'reschedule':
        console.log(`Reschedule interview ${interviewId}`);
        break;
      case 'cancel':
        console.log(`Cancel interview ${interviewId}`);
        break;
      default:
        console.log(`Interview action: ${action}`);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'jobs', label: 'Job Postings', icon: 'Briefcase' },
    { id: 'pipeline', label: 'Pipeline', icon: 'Users' },
    { id: 'interviews', label: 'Interviews', icon: 'Calendar' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <div className="pt-16">
        <div className="flex">
          {/* Sidebar Navigation */}
          <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:pt-16">
            <div className="flex-1 flex flex-col min-h-0 bg-card border-r border-border">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <nav className="mt-5 flex-1 px-2 space-y-1">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full transition-smooth ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={20} className="mr-3" />
                      {tab?.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:pl-64 flex flex-col flex-1">
            <main className="flex-1">
              <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Page Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">
                        {tabs?.find(tab => tab?.id === activeTab)?.label || 'Dashboard'}
                      </h1>
                      <p className="text-muted-foreground">
                        Welcome back, {user?.name}. Here's what's happening with your hiring.
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <NotificationIndicator
                        user={user}
                        notifications={notifications}
                        onMarkAsRead={handleNotificationMarkAsRead}
                        onMarkAllAsRead={handleNotificationMarkAllAsRead}
                      />
                      <QuickActionMenu
                        user={user}
                        onAction={handleQuickAction}
                        variant="dropdown"
                      />
                    </div>
                  </div>

                  {/* Mobile Tab Navigation */}
                  <div className="lg:hidden mb-6">
                    <div className="flex space-x-1 bg-muted p-1 rounded-lg overflow-x-auto">
                      {tabs?.map((tab) => (
                        <button
                          key={tab?.id}
                          onClick={() => setActiveTab(tab?.id)}
                          className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-smooth ${
                            activeTab === tab?.id
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <Icon name={tab?.icon} size={16} />
                          <span>{tab?.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tab Content */}
                  {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-6">
                        {/* Recent Job Postings */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-foreground">Active Job Postings</h2>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setActiveTab('jobs')}
                            >
                              View All
                            </Button>
                          </div>
                          <div className="space-y-4">
                            {jobPostings?.slice(0, 2)?.map((job) => (
                              <JobPostingCard
                                key={job?.id}
                                job={job}
                                onViewDetails={(id) => handleJobAction('view-details', id)}
                                onEditJob={(id) => handleJobAction('edit-job', id)}
                                onViewCandidates={(id) => handleJobAction('view-candidates', id)}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Activity Feed */}
                        <ActivityFeed
                          activities={activities?.slice(0, 5)}
                          onViewActivity={handleActivityAction}
                          onMarkAsRead={handleNotificationMarkAsRead}
                        />
                      </div>

                      <div className="space-y-6">
                        <QuickActionsPanel onAction={handleQuickAction} />
                      </div>
                    </div>
                  )}

                  {activeTab === 'jobs' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-xl font-semibold text-foreground">Job Postings</h2>
                          <p className="text-muted-foreground">Manage your active and draft job postings</p>
                        </div>
                        <Button onClick={() => handleQuickAction('post-job')}>
                          <Icon name="Plus" size={16} />
                          <span className="ml-2">Post New Job</span>
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 gap-6">
                        {jobPostings?.map((job) => (
                          <JobPostingCard
                            key={job?.id}
                            job={job}
                            onViewDetails={(id) => handleJobAction('view-details', id)}
                            onEditJob={(id) => handleJobAction('edit-job', id)}
                            onViewCandidates={(id) => handleJobAction('view-candidates', id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'pipeline' && (
                    <div className="space-y-6">
                      <PipelineOverview
                        pipelineData={pipelineData}
                        onStageChange={handlePipelineStageChange}
                        onBulkAction={handlePipelineBulkAction}
                      />
                    </div>
                  )}

                  {activeTab === 'interviews' && (
                    <div className="space-y-6">
                      <InterviewScheduler
                        upcomingInterviews={upcomingInterviews}
                        onScheduleInterview={() => handleInterviewAction('schedule')}
                        onRescheduleInterview={(id) => handleInterviewAction('reschedule', id)}
                        onCancelInterview={(id) => handleInterviewAction('cancel', id)}
                      />
                    </div>
                  )}

                  {activeTab === 'analytics' && (
                    <div className="space-y-6">
                      <AnalyticsPanel analyticsData={analyticsData} />
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      {/* Floating Action Menu for Mobile */}
      <QuickActionMenu
        user={user}
        onAction={handleQuickAction}
        variant="floating"
        className="lg:hidden"
      />
    </div>
  );
};

export default RecruiterDashboard;