import React from 'react'
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Toaster } from "@/Components/Ui/Sonner";

// Function to get responsive styles based on window width
const getResponsiveStyles = () => {
  const width = window.innerWidth;
  const isMobile = width < 768; // Mobile breakpoint
  const isTablet = width >= 768 && width < 1024; // Tablet breakpoint

  return {
    container: {
      minHeight: '100vh',
      backgroundColor: '#EBDFD7',
      padding: isMobile ? '1rem' : '2rem',
    },
    header: {
      fontSize: isMobile ? '1.75rem' : isTablet ? '2rem' : '2.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'black',
      marginBottom: isMobile ? '1.5rem' : '2rem'
    },
    sectionTitle: {
      fontSize: isMobile ? '1.25rem' : '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'black',
    },
    formContainer: {
      backgroundColor: '#F2EAE5',
      borderRadius: '1rem',
      padding: isMobile ? '1rem' : '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginTop: isMobile ? '1rem' : '0',
      marginBottom: isMobile ? '1rem' : '0',
    },
    inputGroup: {
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      marginBottom: '0.5rem',
      color: '#374151',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '1.0rem',
      border: '2px solid #e5e7eb',
      outline: 'none',
      backgroundColor: '#F6F1EE',
      transition: 'all 0.2s',
    },
    button: {
      padding: '0.75rem 1.5rem',
      borderRadius: '3rem',
      fontWeight: '600',
      transition: 'transform 0.2s',
    },
    primaryButton: {
      backgroundColor: 'white',
      color: '#E65F2B',
      borderRadius: '3rem',
    },
    secondaryButton: {
      backgroundColor: '#DA3030',
      color: 'white',
      borderRadius: '3rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      gap: isMobile ? '1rem' : '1.5rem',
    },
    responsiveGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: isMobile ? '1rem' : '1.5rem',
    },
    buttonContainer: {
      display: 'flex',
      gap: isMobile ? '0.5rem' : '1rem', 
      justifyContent: 'flex-end',
      flexDirection: isMobile ? 'column' : 'row',
      marginTop: isMobile ? '1rem' : '0',
    },
    actionButton: {
      width: isMobile ? '100%' : 'auto',
    }
  };
};

// Initialize styles with responsive values
const styles = getResponsiveStyles();

function Feedback() {
  // Add state to track window resize for responsive styles
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  // Update window dimensions when resized
  React.useEffect(() => {
    // Function to update window dimensions
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      // Update the styles object with new responsive values
      Object.assign(styles, getResponsiveStyles());
    }
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away to update styles based on initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatDate = () => {
    const now = new Date();

    // Get parts individually
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();

    // Get time with AM/PM more safely
    let timeString;
    try {
      // Try to get time string directly without split/trim
      timeString = now.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).replace(/^.*(\d{1,2}:\d{2} [AP]M).*$/, '$1');
    } catch (e) {
      // Fallback to basic time format
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 || 12; // Convert 0 to 12 for 12 AM
      timeString = `${hour12}:${minutes} ${ampm}`;
    }

    // Combine in DD/MM/YYYY format with AM/PM time
    return `${day}/${month}/${year}, ${timeString}`;
  };

  // Basic candidate details
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    candidateExperience: '',
    candidateRole: '',
    candidateCompany: '',
    interviewerExperience: '',
    interviewerCompany: '',
    interviewDate: formatDate(),
  });

  // Technical evaluation
  const [skills, setSkills] = useState([
    { name: '', rating: 90 }
  ]);

  // Questions and answers
  const [questions, setQuestions] = useState([
    { question: '' }
  ]);

  // Soft skills evaluation
  const [evaluation, setEvaluation] = useState({
    communication: '',
    attitude: '',
    strength: '',
    improvementPoints: '',
    overallRemark: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'candidateExperience') {
      // Convert to number and ensure it's not negative
      const numValue = Math.max(0, Number(value));
      setFormData(prev => ({
        ...prev,
        [name]: numValue
      }));
      return;
    }
    // Validate phone input to ensure only numbers and max 10 digits
    if (name === 'candidatePhone') {
      // Allow only digits and limit to 10 characters
      if (!/^\d*$/.test(value) || value.length > 10) {
        return; // Don't update the state if invalid
      }
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSkill = () => {
    setSkills([...skills, { name: '', rating: 90 }]);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '' }]);
  };

  const navigate = useNavigate();    // Track submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Update your handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate candidate details fields
    if (!formData.candidateName.trim()) {
      toast.error('Please enter the candidate name');
      return;
    }
    if (!formData.candidateEmail.trim()) {
      toast.error('Please enter the candidate email');
      return;
    }
    if (!formData.candidatePhone.trim()) {
      toast.error('Please enter the candidate phone number');
      return;
    } else if (!/^\d{10}$/.test(formData.candidatePhone)) {
      toast.error('Phone number must be exactly 10 digits');
      return;
    }
    if (!formData.candidateExperience) {
      toast.error('Please enter the candidate experience');
      return;
    }
    if (!formData.candidateRole.trim()) {
      toast.error('Please enter the candidate current role');
      return;
    }
    if (!formData.candidateCompany.trim()) {
      toast.error('Please enter the candidate company');
      return;
    }
    
    // Validate interviewer details
    if (!formData.interviewerExperience) {
      toast.error('Please enter your experience');
      return;
    }
    if (!formData.interviewerCompany.trim()) {
      toast.error('Please enter your company');
      return;
    }

    // Validate at least one skill has a name
    const hasValidSkill = skills.some(skill => skill.name.trim() !== '');
    if (!hasValidSkill) {
      toast.error('Please add at least one skill with a name');
      return;
    }

    // Validate at least one question is filled
    const hasValidQuestion = questions.some(q => q.question.trim() !== '');
    if (!hasValidQuestion) {
      toast.error('Please add at least one interview question');
      return;
    }

    // Validate evaluation fields
    for (const key in evaluation) {
      if (!evaluation[key]) {
        const fieldMap = {
          communication: 'Communication Skills',
          attitude: 'Attitude & Personality',
          strength: 'Key Strengths',
          improvementPoints: 'Areas for Improvement',
          overallRemark: 'Overall Remarks'
        };
        toast.error(`Please complete the ${fieldMap[key]} section`);
        return;
      }
    }

    // Set submitting state to show loading
    setIsSubmitting(true);

    try {
      // Prepare data for submission
      const submissionData = {
        candidate: {
          name: formData.candidateName,
          email: formData.candidateEmail,
          phone: formData.candidatePhone,
          experience: formData.candidateExperience,
          currentRole: formData.candidateRole,
          currentCompany: formData.candidateCompany
        },
        interviewer: {
          experience: formData.interviewerExperience,
          company: formData.interviewerCompany
        },
        interviewDate: formData.interviewDate,
        technicalEvaluation: skills.filter(skill => skill.name.trim() !== ''),
        questions: questions.filter(q => q.question.trim() !== '').map(q => q.question),
        evaluation: evaluation
      };

      // Log data to console for debugging (remove in production)
      console.log('Submitting feedback:', submissionData);
      
      // Show submitting toast
      toast.loading('Submitting feedback...');
      
      // Here you would typically make an API call to save the data
      // await api.post('/feedback', submissionData);

      // Simulate API delay and then navigate
      setTimeout(() => {
        toast.success('Feedback submitted successfully!');
        setIsSubmitting(false);
        navigate("/interviewer/dashboard");
      }, 2000); // 2-second delay to show the loading state
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Update your handleCancel function
  const handleCancel = () => {
    toast.success('Form cancelled');
    navigate("/interviewer/dashboard");
  };

  return (
    <div style={styles.container}>
      <Toaster 
        position="bottom-right" 
        closeButton
        richColors
        theme="light"
        duration={3000}
        className="toast-container"
        toastOptions={{
          style: {
            background: '#FFFFFF',
            color: '#374151',
            border: '2px solid #e5e7eb',
            fontSize: windowSize.width < 768 ? '0.875rem' : '1rem',
            maxWidth: windowSize.width < 768 ? '90%' : 'auto',
          },
          success: {
            style: {
              border: '2px solid #E65F2B',
            },
          },
          error: {
            style: {
              border: '2px solid #EF4444',
            },
          },
        }}
      />
      <form onSubmit={handleSubmit} style={styles.formContainer} noValidate>
        <h1 style={styles.header}>Interview Feedback Form</h1>
        {/* Candidate Details Section */}
        <section style={styles.inputGroup}>
          <h2 style={styles.sectionTitle}>Candidate Details</h2>
          <div style={styles.grid}>
            <div>
              <label style={styles.label}>Candidate Name</label>
              <input
                type="text"
                name="candidateName"
                value={formData.candidateName}
                onChange={handleInputChange}
                style={styles.input}
                className="transition-all duration-200  text-gray-700 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B]"
                placeholder="Enter candidate's name"
              />
            </div>
            <div>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="candidateEmail"
                value={formData.candidateEmail}
                onChange={handleInputChange}
                style={styles.input}
                className="transition-all duration-200  text-gray-700 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B]"
                placeholder="Enter candidate's email"
              />
            </div>
            <div>
              <label style={styles.label}>Phone</label>
              <input
                type="tel"
                name="candidatePhone"
                value={formData.candidatePhone}
                onChange={handleInputChange}
                style={styles.input}
                className="transition-all duration-200  text-gray-700 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B]"
                placeholder="Enter 10-digit phone number"
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
              />
            </div>
            <div>
              <label style={styles.label}>Experience (Years)</label>
              <input
                type="number"
                name="candidateExperience"
                min="0"
                value={formData.candidateExperience}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === '-' || e.key === '+' || e.key === 'e') {
                    e.preventDefault();
                  }
                }}
                style={styles.input}
                className="transition-all duration-200  text-gray-700 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B]"
                placeholder="Enter candidate's experience in years"
              />
            </div>
            <div>
              <label style={styles.label}>Current Role</label>
              <input
                type="text"
                name="candidateRole"
                value={formData.candidateRole}
                onChange={handleInputChange}
                style={styles.input}
                className="transition-all duration-200  text-gray-700 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B]"
                placeholder="Enter candidate's current role"
              />
            </div>
            <div>
              <label style={styles.label}>Current Company</label>
              <input
                type="text"
                name="candidateCompany"
                value={formData.candidateCompany}
                onChange={handleInputChange}
                style={styles.input}
                className="transition-all duration-200  text-gray-700 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B]"
                placeholder="Enter candidate's current company"
              />
            </div>
          </div>
        </section>

        {/* Interviewer Details Section */}
        <section style={styles.inputGroup}>
          <h2 style={styles.sectionTitle}>Interviewer Details</h2>
          <div style={styles.grid}>
            <div>
              <label style={styles.label}>Experience (Years)</label>
              <input
                type="number"
                name="interviewerExperience"
                min="0"
                value={formData.interviewerExperience}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === '-' || e.key === '+' || e.key === 'e') {
                    e.preventDefault();
                  }
                }}
                style={styles.input}
                className="transition-all duration-200  text-gray-700 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B]"
                placeholder="Enter your experience in years"
              />
            </div>
            <div>
              <label style={styles.label}>Current Company</label>
              <input
                type="text"
                name="interviewerCompany"
                value={formData.interviewerCompany}
                onChange={handleInputChange}
                style={styles.input}
                className="transition-all duration-200  text-gray-700 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B]"
                placeholder="Enter your current company"
              />
            </div>
            <div>
              <label style={styles.label}>Interview Date & Time</label>
              <input
                type="text"
                name="interviewDate"
                value={formData.interviewDate}
                readOnly
                style={{ ...styles.input, cursor: 'default' }}
                className="transition-all duration-200 text-gray-700 bg-gray-100"
              />
            </div>
          </div>
        </section>

        {/* Technical Evaluation Section */}
        <section style={styles.inputGroup}>
          <h2 style={styles.sectionTitle}>Technical Evaluation</h2>
          <div style={styles.responsiveGrid}>
            {skills.map((skill, index) => (
              <div key={index} style={{ marginBottom: '1rem', position: 'relative' }}>
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem',
                  flexDirection: windowSize.width < 500 ? 'column' : 'row'
                }}>
                  <div style={{ flex: 1 }}>
                    <label style={styles.label}>Skill</label>
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => {
                        const newSkills = [...skills];
                        newSkills[index].name = e.target.value;
                        setSkills(newSkills);
                      }}
                      style={styles.input}
                      className="transition-all duration-200 text-gray-700 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B]"
                      placeholder="e.g., React, Python, etc."
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={styles.label}>Rating (0-100):
                      <span className='text-[18px]'> {skill.rating}%</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={skill.rating}
                      onChange={(e) => {
                        const newSkills = [...skills];
                        newSkills[index].rating = parseInt(e.target.value);
                        setSkills(newSkills);
                      }}
                      style={{ width: '100%' }}
                      className="transition-all duration-200 cursor-pointer mt-4"
                    />
                  </div>
                  {skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newSkills = skills.filter((_, i) => i !== index);
                        setSkills(newSkills);
                      }}
                      className="absolute -top-3 -right-3 w-8 h-8 rounded-full text-red-500 flex items-center justify-center hover:text-red-700 transition-colors duration-200 text-3xl"
                      style={{ border: 'none', cursor: 'pointer' }}
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddSkill}
            style={{ ...styles.button, ...styles.primaryButton, marginTop: '1rem' }}
          >
            Add Skill
          </button>
        </section>

        {/* Questions Section */}
        <section style={styles.inputGroup}>
          <h2 style={styles.sectionTitle}>Interview Questions</h2>
          <div style={styles.responsiveGrid}>
            {questions.map((qa, index) => (
              <div key={index} style={{ marginBottom: '1rem', position: 'relative' }}>
                <div>
                  <label style={styles.label}>Question {index + 1}</label>
                  <input
                    type="text"
                    value={qa.question}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[index].question = e.target.value;
                      setQuestions(newQuestions);
                    }}
                    style={styles.input}
                    className="transition-all duration-200 text-gray-700 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B]"
                    placeholder="Enter the question asked"
                  />
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newQuestions = questions.filter((_, i) => i !== index);
                        setQuestions(newQuestions);
                      }}
                      className="absolute -top-3 -right-3 w-8 h-8 rounded-full text-red-500 flex items-center justify-center hover:text-red-700 transition-colors duration-200 text-3xl"
                      style={{ border: 'none', cursor: 'pointer' }}
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddQuestion}
            style={{ ...styles.button, ...styles.primaryButton, marginTop: '1rem' }}
          >
            Add Question
          </button>
        </section>

        {/* Overall Evaluation Section */}
        <section style={styles.inputGroup}>
          <h2 style={styles.sectionTitle}>Overall Evaluation</h2>
          <div style={styles.responsiveGrid}>
            <div>
              <label style={styles.label}>Communication Skills</label>
              <textarea
                name="communication"
                value={evaluation.communication}
                onChange={(e) => setEvaluation({ ...evaluation, communication: e.target.value })}
                style={{ ...styles.input, minHeight: '80px' }}
                className="transition-all duration-200  text-gray-700 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B]"
                placeholder="Evaluate the candidate's communication skills"
              />
            </div>
            <div>
              <label style={styles.label}>Attitude & Personality</label>
              <textarea
                name="attitude"
                value={evaluation.attitude}
                onChange={(e) => setEvaluation({ ...evaluation, attitude: e.target.value })}
                style={{ ...styles.input, minHeight: '80px' }}
                className="transition-all duration-200  text-gray-700 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B]"
                placeholder="Comment on the candidate's attitude and personality"
              />
            </div>
            <div>
              <label style={styles.label}>Key Strengths</label>
              <textarea
                name="strength"
                value={evaluation.strength}
                onChange={(e) => setEvaluation({ ...evaluation, strength: e.target.value })}
                style={{ ...styles.input, minHeight: '80px' }}
                className="transition-all duration-200  text-gray-700 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B]"
                placeholder="List the candidate's key strengths"
              />
            </div>
            <div>
              <label style={styles.label}>Areas for Improvement</label>
              <textarea
                name="improvementPoints"
                value={evaluation.improvementPoints}
                onChange={(e) => setEvaluation({ ...evaluation, improvementPoints: e.target.value })}
                style={{ ...styles.input, minHeight: '80px' }}
                className="transition-all duration-200  text-gray-700 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B]"
                placeholder="Suggest areas where the candidate can improve"
              />
            </div>
            <div>
              <label style={styles.label}>Overall Remarks</label>
              <textarea
                name="overallRemark"
                value={evaluation.overallRemark}
                onChange={(e) => setEvaluation({ ...evaluation, overallRemark: e.target.value })}
                style={{ ...styles.input, minHeight: '100px' }}
                className="transition-all duration-200 text-gray-700 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B]"
                placeholder="Provide overall feedback and hiring recommendation"
              />
            </div>
          </div>
        </section>

        <div style={styles.buttonContainer}>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            style={{ 
              ...styles.button, 
              ...styles.secondaryButton, 
              ...styles.actionButton,
              opacity: isSubmitting ? '0.7' : '1',
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{ ...styles.button, ...styles.actionButton }}
            className={`bg-[#E65F2B] text-white transition-colors duration-200 flex items-center justify-center ${isSubmitting ? 'opacity-80 cursor-not-allowed' : 'hover:bg-[#D05425]'}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Feedback'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Feedback;