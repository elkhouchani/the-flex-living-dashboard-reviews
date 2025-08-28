const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

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

// API route to get all reviews
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
    data: mockReviews
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});