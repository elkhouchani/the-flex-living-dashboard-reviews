import React, { useState, useEffect } from 'react';
import { Star, Eye, EyeOff } from 'lucide-react';

const Dashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviews from our backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/reviews');
        const data = await response.json();
        setReviews(data.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
      setLoading(false);
    };

    fetchReviews();
  }, []);

  // Toggle approval status
  const toggleApproval = (reviewId) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, isApproved: !review.isApproved }
        : review
    ));
  };

  // Star rating component
  const StarRating = ({ rating }) => (
    <div className="star-rating">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`star ${i < Math.floor(rating) ? 'filled' : ''}`}
        />
      ))}
      <span className="rating-text">{rating}</span>
    </div>
  );

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading reviews...</p>
      </div>
    );
  }

  const totalReviews = reviews.length;
  const approvedReviews = reviews.filter(r => r.isApproved).length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : '0.0';

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="header">
        <h1>Reviews Dashboard</h1>
        <p>Flex Living Property Management</p>
      </div>

      <div className="container">
        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Reviews</h3>
            <div className="stat-value blue">{totalReviews}</div>
          </div>
          
          <div className="stat-card">
            <h3>Approved</h3>
            <div className="stat-value green">{approvedReviews}</div>
          </div>
          
          <div className="stat-card">
            <h3>Average Rating</h3>
            <div className="stat-value purple">{averageRating}</div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="reviews-section">
          <div className="reviews-header">
            <h2>Reviews ({totalReviews})</h2>
          </div>
          
          {reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <div className="review-info">
                  <div className="review-meta">
                    <StarRating rating={review.rating} />
                    <span className="badge channel">{review.channel}</span>
                    {review.isApproved && (
                      <span className="badge approved">Approved</span>
                    )}
                  </div>
                  
                  <h3 className="property-name">{review.listingName}</h3>
                  <p className="guest-info">
                    by {review.guestName} • {new Date(review.submittedAt).toLocaleDateString()}
                  </p>
                  
                  <p className="review-text">{review.review}</p>
                </div>
                
                <button
                  onClick={() => toggleApproval(review.id)}
                  className={`approve-btn ${review.isApproved ? 'approved' : 'pending'}`}
                >
                  {review.isApproved ? <Eye size={16} /> : <EyeOff size={16} />}
                  {review.isApproved ? 'Approved' : 'Approve'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;