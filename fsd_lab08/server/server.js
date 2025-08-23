const express = require('express');
const cors = require('cors');
const rooms = require('./data.json');

const app = express();
const PORT = 3001; 

// Basic middleware
app.use(cors());
app.use(express.json());

// Test route to check if server is working
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// API Routes - simplified version
app.get('/api/rooms', (req, res) => {
  console.log('API rooms endpoint hit');
  
  let results = rooms.slice();
  const query = req.query;

  // Simple filtering without complex logic
  if (query.city) {
    results = results.filter(r => 
      r.city.toLowerCase().includes(query.city.toLowerCase())
    );
  }
  
  if (query.roomType) {
    results = results.filter(r => 
      r.roomType.toLowerCase().includes(query.roomType.toLowerCase())
    );
  }
  
  if (query.available) {
    const wantAvailable = query.available.toLowerCase() === 'true';
    results = results.filter(r => r.available === wantAvailable);
  }

  res.json(results);
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Hotel Booking API Server', 
    endpoints: {
      test: '/test',
      rooms: '/api/rooms'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/test`);
  console.log(`Rooms API: http://localhost:${PORT}/api/rooms`);
});