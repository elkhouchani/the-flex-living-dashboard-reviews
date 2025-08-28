import React, { useState, useEffect } from 'react';
import { Star, MapPin, Wifi, Car, Coffee, Users } from 'lucide-react';

const PropertyPage = () => {
  const [approvedReviews, setApprovedReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock property data
  const property = {
    name: "Shoreditch Heights Apartment",
    location: "Shoreditch, London",
    price: "£120",
    rating: 4.8,
    images: ["https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg", "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"],
    description: "Modern 2-bedroom apartment in the heart of Shoreditch. Perfect for business travelers or couples exploring London."
  };

  // Fetch only approved reviews
  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/reviews');
        const data = await response.json();
        // Filter only approved reviews
        const approved = data.data.filter(review => review.isApproved);
        setApprovedReviews(approved);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
      setLoading(false);
    };

    fetchApprovedReviews();
  }, []);

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

  return (
    <div className="property-page">
      {/* Property Images */}
      <div className="property-images">
        <img 
          src={property.images[0]} 
          alt={property.name}
          className="main-image"
        />
      </div>

      <div className="property-container">
        <div className="property-content">
          {/* Property Header */}
          <div className="property-header">
            <div className="property-title">
              <h1>{property.name}</h1>
              <div className="property-location">
                <MapPin size={16} />
                <span>{property.location}</span>
              </div>
            </div>
            <div className="property-rating">
              <StarRating rating={property.rating} />
              <span>({approvedReviews.length} reviews)</span>
            </div>
          </div>

          {/* Property Description */}
          <div className="property-section">
            <p>{property.description}</p>
          </div>

          {/* Amenities */}
          <div className="property-section">
            <h2>Amenities</h2>
            <div className="amenities-grid">
              <div className="amenity">
                <Wifi size={20} />
                <span>Free WiFi</span>
              </div>
              <div className="amenity">
                <Car size={20} />
                <span>Parking</span>
              </div>
              <div className="amenity">
                <Coffee size={20} />
                <span>Kitchen</span>
              </div>
              <div className="amenity">
                <Users size={20} />
                <span>2 Guests</span>
              </div>
            </div>
          </div>

          {/* Reviews Section - Only Approved Reviews */}
          <div className="property-section">
            <div className="reviews-section-header">
              <h2>Guest Reviews</h2>
              <div className="reviews-summary">
                <StarRating rating={property.rating} />
                <span>({approvedReviews.length} approved reviews)</span>
              </div>
            </div>

            {loading ? (
              <div className="loading-reviews">
                <div className="spinner"></div>
                <p>Loading reviews...</p>
              </div>
            ) : (
              <div className="approved-reviews">
                {approvedReviews.length > 0 ? (
                  approvedReviews.map((review) => (
                    <div key={review.id} className="approved-review-card">
                      <div className="review-card-header">
                        <div className="guest-avatar">
                          {review.guestName.charAt(0)}
                        </div>
                        <div className="guest-details">
                          <h4>{review.guestName}</h4>
                          <p>{new Date(review.submittedAt).toLocaleDateString()}</p>
                        </div>
                        <div className="review-rating">
                          <StarRating rating={review.rating} />
                          <span className="review-channel">{review.channel}</span>
                        </div>
                      </div>
                      <div className="review-content">
                        <p>"{review.review}"</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-reviews">
                    <p>No approved reviews to display yet.</p>
                    <p className="no-reviews-subtitle">Reviews are carefully curated by our team.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="booking-sidebar">
          <div className="booking-card">
            <div className="price-section">
              <span className="price">{property.price}</span>
              <span className="price-unit">per night</span>
            </div>

            <div className="booking-form">
              <div className="date-inputs">
                <div className="date-input">
                  <label>Check-in</label>
                  <input type="date" defaultValue="2024-09-01" />
                </div>
                <div className="date-input">
                  <label>Check-out</label>
                  <input type="date" defaultValue="2024-09-03" />
                </div>
              </div>

              <div className="guests-input">
                <label>Guests</label>
                <select>
                  <option>1 guest</option>
                  <option>2 guests</option>
                </select>
              </div>

              <button className="book-button">
                Check Availability
              </button>

              <div className="booking-note">
                <p>You won't be charged yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;