import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitComplaint } from '../api/complaintApi';
import '../styles/StudentComplaintPage.css';

const StudentComplaintPage = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Other',
    studentName: '',
    isAnonymous: false,
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  /**
   * Handle input change
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | any
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Clear messages when user starts typing
    setErrorMessage('');
    setSuccessMessage('');
  };

  /**
   * Validate form
   */
  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setErrorMessage('Please enter a complaint title');
      return false;
    }

    if (!formData.description.trim()) {
      setErrorMessage('Please enter a detailed description');
      return false;
    }

    if (formData.title.trim().length < 5) {
      setErrorMessage('Title must be at least 5 characters');
      return false;
    }

    if (formData.description.trim().length < 20) {
      setErrorMessage('Description must be at least 20 characters');
      return false;
    }

    if (!formData.isAnonymous && !formData.studentName.trim()) {
      setErrorMessage('Please enter your name or submit anonymously');
      return false;
    }

    return true;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Prepare payload
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category as any,
        studentName: formData.isAnonymous ? undefined : formData.studentName.trim(),
        isAnonymous: formData.isAnonymous,
      };

      // Submit complaint
      const response = await submitComplaint(payload);

      if (response.success) {
        setSuccessMessage('Complaint submitted successfully! Thank you for your feedback.');
        // Redirect to thank you page after 1.5 seconds
        setTimeout(() => {
          navigate('/thanks');
        }, 1500);
      } else {
        setErrorMessage(response.message || 'Failed to submit complaint');
      }
    } catch (error: any) {
      console.error('Error submitting complaint:', error);
      setErrorMessage(
        error.message || 'An error occurred while submitting your complaint. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="complaint-container">
      <div className="complaint-card">
        <div className="complaint-header">
          <h1>JIT Complaint Box</h1>
          <p>Submit your complaint or feedback anonymously or with your name</p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="alert alert-success">
            <span className="alert-icon">✅</span>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="complaint-form">
          {/* Title Field */}
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Complaint Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Brief title of your complaint"
              className="form-input"
              disabled={isLoading}
              maxLength={100}
            />
            <small className="form-hint">
              {formData.title.length}/100 characters
            </small>
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Please provide detailed information about your complaint"
              className="form-textarea"
              rows={5}
              disabled={isLoading}
              maxLength={500}
            />
            <small className="form-hint">
              {formData.description.length}/500 characters
            </small>
          </div>

          {/* Category Field */}
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="form-select"
              disabled={isLoading}
            >
              <option value="Hostel">Hostel</option>
              <option value="Academics">Academics</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Administration">Administration</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Anonymous Checkbox */}
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="isAnonymous"
              name="isAnonymous"
              checked={formData.isAnonymous}
              onChange={handleInputChange}
              className="form-checkbox"
              disabled={isLoading}
            />
            <label htmlFor="isAnonymous" className="checkbox-label">
              Submit anonymously
            </label>
          </div>

          {/* Student Name Field */}
          {!formData.isAnonymous && (
            <div className="form-group">
              <label htmlFor="studentName" className="form-label">
                Your Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="form-input"
                disabled={isLoading}
                maxLength={50}
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Submitting...
              </>
            ) : (
              'Submit Complaint'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="complaint-footer">
          <p>Your complaint will be reviewed by our administration team.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentComplaintPage;
