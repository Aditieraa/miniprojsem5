import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import ApplicationFilters from './components/ApplicationFilters';
import ApplicationTable from './components/ApplicationTable';
import ApplicationAnalytics from './components/ApplicationAnalytics';
import InterviewScheduler from './components/InterviewScheduler';
import DocumentManager from './components/DocumentManager';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ApplicationTracking = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('applications');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState({ field: 'appliedDate', direction: 'desc' });
  const [filteredApplications, setFilteredApplications] = useState([]);

  // Mock user data
  const user = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    role: "job-seeker",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
  };

  // Mock applications data
  const applications = [
    {
      id: 1,
      company: "TechCorp Solutions",
      position: "Senior Frontend Developer",
      department: "Engineering",
      location: "San Francisco, CA",
      appliedDate: "2025-01-05",
      status: "interview-scheduled",
      interviewDate: "2025-01-15T14:00:00Z",
      interviewType: "video",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      salary: "$120,000 - $150,000",
      jobType: "full-time"
    },
    {
      id: 2,
      company: "InnovateLabs",
      position: "React Developer",
      department: "Product Development",
      location: "Remote",
      appliedDate: "2025-01-03",
      status: "shortlisted",
      salary: "$90,000 - $110,000",
      jobType: "full-time"
    },
    {
      id: 3,
      company: "StartupXYZ",
      position: "Full Stack Engineer",
      department: "Engineering",
      location: "Austin, TX",
      appliedDate: "2025-01-01",
      status: "under-review",
      salary: "$100,000 - $130,000",
      jobType: "full-time"
    },
    {
      id: 4,
      company: "MegaCorp Inc",
      position: "UI/UX Developer",
      department: "Design",
      location: "New York, NY",
      appliedDate: "2024-12-28",
      status: "offer-received",
      offerAmount: "$125,000",
      offerDeadline: "2025-01-20",
      salary: "$115,000 - $135,000",
      jobType: "full-time"
    },
    {
      id: 5,
      company: "CloudTech Systems",
      position: "Frontend Specialist",
      department: "Engineering",
      location: "Seattle, WA",
      appliedDate: "2024-12-25",
      status: "rejected",
      rejectionReason: "Position filled internally",
      salary: "$95,000 - $115,000",
      jobType: "full-time"
    },
    {
      id: 6,
      company: "DataDriven Co",
      position: "JavaScript Developer",
      department: "Technology",
      location: "Chicago, IL",
      appliedDate: "2024-12-20",
      status: "applied",
      salary: "$85,000 - $105,000",
      jobType: "contract"
    }
  ];

  // Mock documents data
  const documents = [
    {
      id: 1,
      name: "Senior Frontend Developer Resume",
      type: "resume",
      size: 245760,
      uploadDate: "2025-01-01",
      applicationId: 1,
      url: "/documents/resume-v3.pdf",
      downloadUrl: "/documents/resume-v3.pdf"
    },
    {
      id: 2,
      name: "TechCorp Cover Letter",
      type: "cover-letter",
      size: 89600,
      uploadDate: "2025-01-05",
      applicationId: 1,
      url: "/documents/cover-letter-techcorp.pdf",
      downloadUrl: "/documents/cover-letter-techcorp.pdf"
    },
    {
      id: 3,
      name: "Portfolio Website",
      type: "portfolio",
      size: 1024000,
      uploadDate: "2024-12-15",
      applicationId: null,
      url: "/documents/portfolio.pdf",
      downloadUrl: "/documents/portfolio.pdf"
    },
    {
      id: 4,
      name: "React Certification",
      type: "certificate",
      size: 156800,
      uploadDate: "2024-11-20",
      applicationId: null,
      url: "/documents/react-cert.pdf",
      downloadUrl: "/documents/react-cert.pdf"
    }
  ];

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'interview',
      title: 'Interview Reminder',
      message: 'You have an interview with TechCorp Solutions tomorrow at 2:00 PM',
      timestamp: new Date(Date.now() - 3600000),
      read: false
    },
    {
      id: 2,
      type: 'application',
      title: 'Application Status Update',
      message: 'Your application for React Developer at InnovateLabs has been shortlisted',
      timestamp: new Date(Date.now() - 7200000),
      read: false
    },
    {
      id: 3,
      type: 'job_match',
      title: 'New Job Match',
      message: '5 new jobs match your profile and preferences',
      timestamp: new Date(Date.now() - 86400000),
      read: true
    }
  ];

  // Filter applications based on current filters
  useEffect(() => {
    let filtered = [...applications];

    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(app =>
        app?.company?.toLowerCase()?.includes(searchTerm) ||
        app?.position?.toLowerCase()?.includes(searchTerm) ||
        app?.department?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Apply status filter
    if (filters?.status) {
      filtered = filtered?.filter(app => app?.status === filters?.status);
    }

    // Apply company filter
    if (filters?.company) {
      const companyTerm = filters?.company?.toLowerCase();
      filtered = filtered?.filter(app =>
        app?.company?.toLowerCase()?.includes(companyTerm)
      );
    }

    // Apply position type filter
    if (filters?.positionType) {
      filtered = filtered?.filter(app => app?.jobType === filters?.positionType);
    }

    // Apply date range filter
    if (filters?.dateRange) {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters?.dateRange) {
        case 'last-week':
          filterDate?.setDate(now?.getDate() - 7);
          break;
        case 'last-month':
          filterDate?.setMonth(now?.getMonth() - 1);
          break;
        case 'last-3-months':
          filterDate?.setMonth(now?.getMonth() - 3);
          break;
        case 'last-6-months':
          filterDate?.setMonth(now?.getMonth() - 6);
          break;
        default:
          filterDate?.setFullYear(2000); // Show all
      }
      
      filtered = filtered?.filter(app => new Date(app.appliedDate) >= filterDate);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue = a?.[sortBy?.field];
      let bValue = b?.[sortBy?.field];

      // Handle date sorting
      if (sortBy?.field === 'appliedDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      // Handle string sorting
      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (sortBy?.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredApplications(filtered);
  }, [filters, sortBy]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  const handleViewDetails = (applicationId) => {
    navigate(`/job-details?application=${applicationId}`);
  };

  const handleScheduleFollowup = (applicationId) => {
    setActiveTab('interviews');
  };

  const handleViewCommunication = (applicationId) => {
    // Mock communication view
    console.log('View communication for application:', applicationId);
  };

  const handleScheduleInterview = (interviewData) => {
    console.log('Schedule interview:', interviewData);
    // Mock interview scheduling
  };

  const handleJoinInterview = (applicationId) => {
    const application = applications?.find(app => app?.id === applicationId);
    if (application?.meetingLink) {
      window.open(application?.meetingLink, '_blank');
    }
  };

  const handleUploadDocument = async (documentData) => {
    console.log('Upload document:', documentData);
    // Mock document upload
  };

  const handleDeleteDocument = (documentId) => {
    console.log('Delete document:', documentId);
    // Mock document deletion
  };

  const handleUpdateDocument = (documentId, updates) => {
    console.log('Update document:', documentId, updates);
    // Mock document update
  };

  const handleMarkAsRead = (notificationId) => {
    console.log('Mark notification as read:', notificationId);
  };

  const handleMarkAllAsRead = () => {
    console.log('Mark all notifications as read');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const tabs = [
    { id: 'applications', label: 'Applications', icon: 'FileText', count: applications?.length },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'interviews', label: 'Interviews', icon: 'Calendar', count: applications?.filter(app => app?.status === 'interview-scheduled')?.length },
    { id: 'documents', label: 'Documents', icon: 'FolderOpen', count: documents?.length }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Application Tracking</h1>
              <p className="text-muted-foreground">
                Monitor and manage your job application pipeline
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <NotificationIndicator
                user={user}
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
              />
              
              <Button onClick={() => navigate('/job-search-results')}>
                <Icon name="Plus" size={16} />
                <span className="ml-2">Apply to Jobs</span>
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center space-x-1 mb-8 border-b border-border">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
                {tab?.count !== undefined && (
                  <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-xs">
                    {tab?.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'applications' && (
              <>
                <ApplicationFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                />
                
                <ApplicationTable
                  applications={filteredApplications}
                  onViewDetails={handleViewDetails}
                  onScheduleFollowup={handleScheduleFollowup}
                  onViewCommunication={handleViewCommunication}
                  sortBy={sortBy}
                  onSortChange={handleSortChange}
                />
              </>
            )}

            {activeTab === 'analytics' && (
              <ApplicationAnalytics applications={applications} />
            )}

            {activeTab === 'interviews' && (
              <InterviewScheduler
                applications={applications}
                onScheduleInterview={handleScheduleInterview}
                onJoinInterview={handleJoinInterview}
              />
            )}

            {activeTab === 'documents' && (
              <DocumentManager
                applications={applications}
                documents={documents}
                onUploadDocument={handleUploadDocument}
                onDeleteDocument={handleDeleteDocument}
                onUpdateDocument={handleUpdateDocument}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationTracking;