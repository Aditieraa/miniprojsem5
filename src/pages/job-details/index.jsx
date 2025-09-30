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

  // Mock user data
  const currentUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    role: "job_seeker",
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

  // Mock job data
  const mockJobs = {
    '1': {
      id: '1',
      title: "Senior Frontend Developer",
      company: {
        name: "TechCorp Solutions",
        logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=64&h=64&fit=crop&crop=center",
        rating: 4.5,
        reviewCount: 127,
        tagline: "Building the future of technology",
        industry: "Technology",
        headquarters: "San Francisco, CA",
        employeeCount: 2500,
        founded: 2015,
        description: `TechCorp Solutions is a leading technology company specializing in innovative software solutions for enterprise clients. We're passionate about creating products that make a real difference in people's lives and businesses.\n\nOur team of talented engineers, designers, and product managers work collaboratively to deliver cutting-edge solutions that solve complex problems. We believe in fostering a culture of innovation, continuous learning, and work-life balance.`,
        culture: `At TechCorp, we believe that great products come from great teams. Our culture is built on collaboration, innovation, and respect for every team member.\n\nWe offer flexible working arrangements, encourage professional development, and maintain an inclusive environment where everyone can thrive. Our open office design promotes collaboration while providing quiet spaces for focused work.`,
        openJobs: 23,
        recentReviews: [
          {
            rating: 5,
            role: "Software Engineer",
            comment: "Amazing company culture and great opportunities for growth. The team is very supportive and the projects are challenging and interesting."
          },
          {
            rating: 4,
            role: "Product Manager",
            comment: "Good work-life balance and competitive compensation. Management is transparent and values employee feedback."
          }
        ]
      },
      location: "San Francisco, CA (Remote friendly)",
      workType: "Hybrid",
      type: "full-time",
      urgency: "hot",
      salary: {
        min: 120000,
        max: 160000
      },
      salaryBreakdown: {
        base: 140000,
        bonus: 15000,
        equity: "$50k-$100k"
      },
      postedDate: "2 days ago",
      applicantCount: 47,
      skills: ["React", "JavaScript", "TypeScript", "Node.js", "GraphQL", "AWS", "Docker", "Git"],
      description: `We are seeking a talented Senior Frontend Developer to join our growing engineering team. You'll be responsible for building and maintaining our web applications using modern technologies and best practices.\n\nAs a Senior Frontend Developer, you'll work closely with our design and product teams to create exceptional user experiences. You'll have the opportunity to mentor junior developers and contribute to architectural decisions that will shape the future of our platform.\n\nThis is an excellent opportunity for someone who is passionate about frontend development and wants to make a significant impact in a fast-growing company.`,
      responsibilities: [
        "Develop and maintain high-quality web applications using React and TypeScript",
        "Collaborate with designers and product managers to implement user-friendly interfaces",
        "Write clean, maintainable, and well-tested code",
        "Mentor junior developers and conduct code reviews",
        "Participate in architectural decisions and technical planning",
        "Optimize applications for maximum speed and scalability",
        "Stay up-to-date with the latest frontend technologies and best practices"
      ],
      requirements: [
        "5+ years of experience in frontend development",
        "Expert knowledge of React, JavaScript, and TypeScript",
        "Experience with modern build tools and workflows (Webpack, Vite, etc.)",
        "Strong understanding of HTML5, CSS3, and responsive design",
        "Experience with state management libraries (Redux, Zustand, etc.)",
        "Familiarity with testing frameworks (Jest, React Testing Library)",
        "Experience with version control systems (Git)",
        "Strong problem-solving skills and attention to detail"
      ],
      preferredQualifications: [
        "Experience with Node.js and backend development",
        "Knowledge of GraphQL and Apollo Client",
        "Experience with cloud platforms (AWS, GCP, Azure)",
        "Familiarity with containerization (Docker, Kubernetes)",
        "Experience with CI/CD pipelines",
        "Contributions to open-source projects",
        "Experience mentoring junior developers"
      ],
      benefits: [
        "Competitive salary and equity package",
        "Comprehensive health, dental, and vision insurance",
        "401(k) with company matching",
        "Flexible PTO and sabbatical options",
        "Remote work flexibility",
        "Professional development budget ($2,000/year)",
        "Home office setup allowance",
        "Catered meals and snacks",
        "Gym membership reimbursement",
        "Mental health and wellness programs"
      ],
      applicationQuestions: [
        {
          id: 'portfolio',question: 'Please provide a link to your portfolio or GitHub profile',type: 'text',placeholder: 'https://github.com/yourprofile',
          required: true
        },
        {
          id: 'experience',question: 'Describe your experience with React and TypeScript',type: 'textarea',placeholder: 'Tell us about your experience...',
          required: true
        },
        {
          id: 'remote',question: 'Are you comfortable working in a hybrid environment?',type: 'select',
          options: ['Yes, I prefer hybrid', 'Yes, but prefer remote', 'Yes, but prefer office', 'No, remote only'],
          required: true
        }
      ]
    }
  };

  // Mock similar jobs
  const mockSimilarJobs = [
    {
      id: '2',
      title: "Frontend Engineer",
      company: {
        name: "StartupXYZ",
        logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=64&h=64&fit=crop&crop=center"
      },
      location: "Remote",
      type: "full-time",
      salary: { min: 100000, max: 130000 },
      postedDate: "1 day ago",
      skills: ["React", "JavaScript", "CSS", "HTML"],
      matchScore: 92
    },
    {
      id: '3',
      title: "React Developer",
      company: {
        name: "WebTech Inc",
        logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=64&h=64&fit=crop&crop=center"
      },
      location: "New York, NY",
      type: "contract",
      salary: { min: 80000, max: 110000 },
      postedDate: "3 days ago",
      skills: ["React", "Redux", "JavaScript"],
      matchScore: 88
    },
    {
      id: '4',
      title: "Full Stack Developer",
      company: {
        name: "InnovateLab",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center"
      },
      location: "Austin, TX",
      type: "full-time",
      salary: { min: 110000, max: 140000 },
      postedDate: "5 days ago",
      skills: ["React", "Node.js", "MongoDB"],
      matchScore: 85
    }
  ];

  // Mock market salary data
  const mockMarketData = {
    average: 135000,
    percentile25: 115000,
    percentile75: 155000
  };

  useEffect(() => {
    const loadJobData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const jobData = mockJobs?.[jobId];
        if (jobData) {
          setJob(jobData);
          setSimilarJobs(mockSimilarJobs);
          
          // Check if job is saved/applied (mock data)
          setIsSaved(Math.random() > 0.7);
          setIsApplied(Math.random() > 0.8);
        }
        setIsLoading(false);
      }, 1000);
    };

    loadJobData();
  }, [jobId]);

  const handleApply = () => {
    if (isApplied) return;
    setIsApplicationModalOpen(true);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // Here you would typically make an API call to save/unsave the job
  };

  const handleApplicationSubmit = async (applicationData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsApplied(true);
    console.log('Application submitted:', applicationData);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={currentUser} onLogout={handleLogout} />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            <div className="animate-pulse space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-muted rounded-lg"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-8 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-96 bg-card border border-border rounded-lg"></div>
                </div>
                <div className="space-y-6">
                  <div className="h-64 bg-card border border-border rounded-lg"></div>
                  <div className="h-64 bg-card border border-border rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={currentUser} onLogout={handleLogout} />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            <div className="text-center py-12">
              <Icon name="AlertCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground mb-2">Job Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The job you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => navigate('/job-search-results')}>
                Browse All Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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