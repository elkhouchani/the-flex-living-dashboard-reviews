# Flex Living Reviews Dashboard
A comprehensive review management system for Flex Living properties, featuring a manager dashboard and public property display page.

## 🏗️ Architecture Overview
### Tech Stack

Frontend: React.js with functional components and hooks
Backend: Node.js with Express.js
API Integration: Hostaway Reviews API
Styling: Inline CSS with modern design principles
Icons: Lucide React
### Project Structure
```
flex-living-reviews-dashboard/
├── backend/
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── App.js          # Main application component
│   │   ├── Dashboard.js    # Manager dashboard
│   │   ├── PropertyPage.js # Public property display
│   │   ├── Navigation.js   # Navigation component
│   │   └── index.css       # Base styles
│   └── package.json        # Frontend dependencies
└── README.md
```

## 🚀 Getting Started
### Prerequisites

Node.js (v14 or higher)
npm or yarn package manager

1. Navigate to backend directory
  ```
  cd backend
  ```

2. Install dependencies
  ```
  npm install express cors node-fetch
  ```

3. Start the server
  ```
  node server.js
  ```

Frontend Setup

1. Navigate to frontend directory
  ```
  cd frontend
  ```

2. Install dependencies
  ```
  npm install react react-dom lucide-react
  ```

3. Start the development server
  ```
  npm start
  ```

## 📊 Features
### Manager Dashboard

- **Review Management:** View all reviews with filtering and sorting options
- **Approval System:** Approve/disapprove reviews for public display
- **Analytics:** View review statistics and performance metrics
- **Multi-Channel Support:** Handle reviews from Airbnb, Booking.com, etc.
- **Data Source Toggle:** Switch between mock data and live Hostaway API

### Dashboard Features:

- **Filter by channel** (Airbnb, Booking.com, etc.) (under development)
- **Filter by rating ranges** (5 stars, 4+ stars, 3-4 stars, below 3 stars) (under development)
- Sort by date, highest rating, or lowest rating
- **One-click** approval/disapproval system
- **Real-time statistics** display

### Property Display Page

- **Modern Property Layout:** Mimics professional property listing sites
- **Approved Reviews Only:** Shows only manager-approved reviews
- **Responsive Design:** Works on all device sizes
- **Booking Interface:** Includes booking form sidebar
- **Guest Avatars:** Dynamic guest initial avatars

### Hostaway API

- **Account ID:** 61148
- **API Endpoint:** https://api.hostaway.com/v1/reviews
- **Authentication:** Bearer token authentication
- **Fallback Strategy:** Automatic fallback to mock data if API fails

### Backend Endpoints:

- GET /api/reviews - **Mock review data**
- GET /api/reviews/hostaway/real - **Live Hostaway API data**
- GET /api/analytics - **Review analytics and statistics**
- PATCH /api/reviews/:id/approve - **Update review approval status**
- GET /api/test - **API health check**
- GET /health - **Server health status**


### User Experience

- **Intuitive Navigation:** Simple two-page navigation system
- **Visual Feedback:** Clear approval status indicators
- **Responsive Design:** Mobile-first approach
- **Loading States:** Proper loading indicators for API calls
- **Error Handling:** Graceful error handling with fallbacks

### Data Management

- **Normalization:** Consistent data structure across different sources
- **Fallback Strategy:** Mock data when API is unavailable
- **Real-time Updates:** Immediate UI updates on approval changes
- **Filtering & Sorting:** Advanced filtering options for managers

### Visual Design

- **Modern Aesthetics:** Clean, professional interface
- **Color Coding:** Intuitive color system for status indicators
- **Typography:** Readable font hierarchy
- **Spacing:** Consistent spacing throughout the application

### Hostaway Integration
The system implements a robust integration with the Hostaway Reviews API:

- **Authentication:** Uses Bearer token authentication
- **Error Handling:** Comprehensive error handling with detailed logging
- **Data Normalization:** Converts Hostaway data to consistent internal format
- **Fallback Mechanism:** Automatically uses mock data if API fails
- **Rate Limiting:** Respects API rate limits (though not implemented in sandbox)

### Data Processing

- **Reviews are normalized** to a consistent format regardless of source
- **Rating calculations** handle various rating formats
- **Channel detection** from review metadata
- **Timestamp standardization**



## 🔍 Google Reviews Integration
### Investigation Results
Google Reviews integration was explored through the Google Places API. Here are the findings:
### Challenges:

- **API Restrictions:** Google Places API has strict usage policies for review data
- **Rate Limits:** Limited number of requests per day
- **Data Access:** Only basic review data available (rating, text, author)
- **Authentication:** Requires Google Cloud Platform setup and billing

### Potential Implementation:
Example Google Places API integration
  ```
  const googleReviews = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
  );
  ```

### Recommendation:
For production implementation, consider:

- Google My Business API for more comprehensive access
- Third-party services like ReviewTrackers or Podium
- Direct integration with property management systems

## 📈 Performance Considerations
### Frontend Optimization

- Efficient state management with React hooks
- Conditional rendering for large datasets
- Debounced filtering to prevent excessive re-renders
- Lazy loading for images and components

### Backend Optimization

- Express.js middleware for request processing
- Proper error handling and logging
- CORS configuration for cross-origin requests
- Response caching for frequently accessed data

## 🚦 Testing
### Manual Testing Checklist

 - Dashboard loads with mock data
 - Hostaway API integration works (or fails gracefully)
 - Review approval/disapproval functions
 - Property page displays approved reviews only
 - Responsive design works on mobile devices
 - Error states display properly

### API Testing
Use tools like Postman or curl to test endpoints:
### Test mock reviews
```
curl http://localhost:3001/api/reviews
```

### Test Hostaway integration
```
curl http://localhost:3001
```





