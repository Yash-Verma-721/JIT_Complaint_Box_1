import { useNavigate } from 'react-router-dom';
import '../styles/ThankYouPage.css';

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleBackToForm = () => {
    navigate('/');
  };

  return (
    <div className="thankyou-container">
      <div className="thankyou-card">
        <div className="thankyou-icon">✅</div>
        
        <h1 className="thankyou-title">Thank You!</h1>
        
        <p className="thankyou-message">
          Your complaint has been submitted successfully.
        </p>
        
        <p className="thankyou-subtitle">
          Our administration team will review your complaint and take appropriate action.
        </p>

        <div className="thankyou-details">
          <p className="detail-item">
            <span className="detail-icon">📋</span>
            Keep track of your complaint status
          </p>
          <p className="detail-item">
            <span className="detail-icon">⏱️</span>
            You will receive updates via email
          </p>
          <p className="detail-item">
            <span className="detail-icon">🔒</span>
            Your privacy is protected
          </p>
        </div>

        <button className="back-btn" onClick={handleBackToForm}>
          Submit Another Complaint
        </button>

        <p className="thankyou-footer">
          Need immediate help? Contact the administration office.
        </p>
      </div>
    </div>
  );
};

export default ThankYouPage;
