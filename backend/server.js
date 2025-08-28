const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

//const fetch = require('node-fetch');

app.use(cors());
app.use(express.json());

// Mock review data - you'll replace this later with real data
const mockReviews = [
  {
    id: 123,
    listingName: "27 Rockefeller Drive - Paris",
    guestName: "Kenza Alami",
    rating: 4.8,
    review: "Amazing property in Paris! Clean, modern, and perfectly located.",
    submittedAt: "2024-08-15T14:30:00",
    channel: "Airbnb",
    isApproved: false
  },
  {
    id: 456,
    listingName: "507 Weeping Birch Terrace", 
    guestName: "Rami Jalal",
    rating: 3.2,
    review: "Property was okay but had some issues with WiFi. Location is great though.",
    submittedAt: "2024-08-10T09:15:00",
    channel: "Booking.com",
    isApproved: false
  },
  {
    id: 789,
    listingName: "2B N1 A - 29 Shoreditch Heights",
    guestName: "Kali David", 
    rating: 4.9,
    review: "Exceptional stay! Everything was perfect from check-in to check-out.",
    submittedAt: "2024-08-20T16:45:00",
    channel: "Airbnb",
    isApproved: true
  },
  {
    id: 147,
    listingName: "3 Heath Hill",
    guestName: "Ulla Freeman", 
    rating: 3,
    review: "These done fit well and look great. I love the smoothness of the edges and the extra",
    submittedAt: "2024-08-20T16:45:00",
    channel: "Airbnb",
    isApproved: true
  },
  {
    id: 759,
    listingName: "2B N1 A - 29 Shoreditch Heights",
    guestName: "Khalil Radi", 
    rating: 5,
    review: "Very nice set. Good quality. We have had the set for two months now and have not been",
    submittedAt: "2024-08-20T16:45:00",
    channel: "Airbnb",
    isApproved: true
  },
  {
    id: 124,
    listingName: "2B N1 A - 29 Shoreditch Heights",
    guestName: "Kali David", 
    rating: 1.0,
    review: "Awful experience.",
    submittedAt: "2024-08-20T16:45:00",
    channel: "Booking.com",
    isApproved: true
  }
];

// API route to get all reviews (mock data for now)
app.get('/api/reviews', (req, res) => {
  res.json({
    status: 'success',
    data: mockReviews
  });
});

// API route specifically for Hostaway (as required)
app.get('/api/reviews/hostaway', (req, res) => {
  res.json({
    status: 'success',
    data: mockReviews,
    message: 'Mock data - use /api/reviews/hostaway/real for actual API call'
  });
});


// Real Hostaway API Integration
app.get('/api/reviews/hostaway/real', async (req, res) => {
  try {
    const HOSTAWAY_API_KEY = 'f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152';
    const ACCOUNT_ID = '61148';

    // Note: Using dynamic import for fetch in Node.js
    const fetch = (await import('node-fetch')).default;
    console.log('Attempting to connect to Hostaway API...');

    
    const response = await fetch(`https://api.hostaway.com/v1/reviews?accountId=${ACCOUNT_ID}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${HOSTAWAY_API_KEY}`,
        'Content-Type': 'application/json',
        'Cache-control': 'no-cache'

      }
    });
    console.log('Hostaway API Response Status:', response.status);

    
    if (!response.ok) {
      throw new Error(`Hostaway API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Hostaway API Response:', JSON.stringify(data, null, 2));
    
    // Check if sandbox has reviews: If the sandbox is empty, fall back to mock data
    if (!data.result || data.result.length === 0) {
      console.log('No reviews from Hostaway, using mock data');
      return res.json({
        status: 'success',
        data: mockReviews,
        message: 'Using mock data - Hostaway sandbox appears to be empty',
        hostawayResponse: data
      });
    }
    
    // Normalize Hostaway data if available
    const normalizedReviews = data.result.map(review => ({
      id: review.id,
      listingName: review.listingName || 'Unknown Property',
      guestName: review.guestName || 'Anonymous Guest',
      rating: review.rating || calculateAverageRating(review.reviewCategory),
      review: review.publicReview || 'No review text provided',
      submittedAt: review.submittedAt,
      channel: determineChannel(review),
      isApproved: false
    }));
    
    res.json({
      status: 'success',
      data: normalizedReviews,
      message: 'Data from Hostaway API'
    });
    
  } catch (error) {
    console.error('Hostaway API Error:', error.message);
    
    // Fallback to mock data on error
    res.json({
      status: 'success',
      data: mockReviews,
      message: `API Error: ${error.message}. Using mock data as fallback.`,
      error: error.message
    });
  }
});


// Helper function to calculate average rating from categories
function calculateAverageRating(categories) {
  if (!categories || categories.length === 0) return 4.0;
  
  const sum = categories.reduce((acc, cat) => acc + (cat.rating || 0), 0);
  return sum / categories.length;
}

// Helper function to determine channel
function determineChannel(review) {
  if (review.type && review.type.includes('airbnb')) return 'Airbnb';
  if (review.type && review.type.includes('booking')) return 'Booking.com';
  return 'Hostaway';
}

// Update review approval status
app.patch('/api/reviews/:id/approve', (req, res) => {
  const { id } = req.params;
  const { isApproved } = req.body;
  
  // In a real application, you'd update the database here
  console.log(`Review ${id} ${isApproved ? 'approved' : 'unapproved'} for public display`);
  
  res.json({
    status: 'success',
    message: `Review ${id} ${isApproved ? 'approved' : 'unapproved'} for public display`
  });
});

// Analytics endpoint
app.get('/api/analytics', (req, res) => {
  const totalReviews = mockReviews.length;
  const approvedReviews = mockReviews.filter(r => r.isApproved).length;
  const averageRating = mockReviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews;
  
  res.json({
    status: 'success',
    data: {
      totalReviews,
      approvedReviews,
      averageRating: averageRating.toFixed(1),
      channelBreakdown: {
        'Airbnb': mockReviews.filter(r => r.channel === 'Airbnb').length,
        'Booking.com': mockReviews.filter(r => r.channel === 'Booking.com').length,
        'Hostaway': mockReviews.filter(r => r.channel === 'Hostaway').length
      }
    }
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    status: 'success',
    message: 'Reviews Dashboard API is working!',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Reviews Dashboard API running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- GET /api/reviews (mock data)');
  console.log('- GET /api/reviews/hostaway (mock data)');
  console.log('- GET /api/reviews/hostaway/real (real Hostaway API)');
  console.log('- GET /api/analytics');
  console.log('- GET /api/test');
});