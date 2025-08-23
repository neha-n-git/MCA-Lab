const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const fs = require('fs');
const pool = require('./database'); 
const { sendEmail } = require('./emailService'); 
const rooms = require('./data.json');
const app = express();
const PORT = process.env.PORT || 3001;


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'booking-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// API Routes
app.get('/api/rooms', (req, res) => {
  let results = rooms.slice();
  const query = req.query;

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

// New booking endpoint with file upload and email confirmation
app.post('/api/bookings', upload.single('image'), async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    
    const { name, email, phone, check_in, check_out, room_type, guests, special_requests } = req.body;
    
    // Basic validation
    if (!name || !email || !phone || !check_in || !check_out || !room_type || !guests) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const imagePath = req.file ? req.file.filename : null;

    // Calculate total amount based on room price and stay duration
    const room = rooms.find(r => r.roomType === room_type);
    const roomPrice = room ? room.price : 100; // Default price if room not found
    
    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const total_amount = (nights * roomPrice).toFixed(2);

    // Insert into MySQL database
    const sql = `
      INSERT INTO bookings (name, email, phone, check_in, check_out, room_type, guests, special_requests, image_path, total_amount)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await connection.execute(
      sql, 
      [name, email, phone, check_in, check_out, room_type, guests, special_requests, imagePath, total_amount]
    );
    
    const bookingId = result.insertId;
    
    // Prepare data for email confirmation
    const bookingData = {
      bookingId,
      name,
      email,
      phone,
      check_in,
      check_out,
      room_type,
      guests,
      special_requests: special_requests || 'None',
      total_amount,
      hotel: room ? room.hotel : 'Our Hotel',
      nights,
      room_price: roomPrice
    };
    
    // Send confirmation email (async - don't wait for it to complete)
    sendEmail(email, 'bookingConfirmation', bookingData)
      .then(emailResult => {
        if (emailResult.success) {
          console.log(`Confirmation email sent to ${email}`);
        } else {
          console.warn(`Failed to send email to ${email}:`, emailResult.error);
        }
      })
      .catch(emailError => {
        console.error('Email sending error:', emailError);
      });
    
    res.json({ 
      message: 'Booking created successfully! Confirmation email sent.',
      bookingId: bookingId,
      total_amount: total_amount,
      imageUrl: imagePath ? `http://localhost:${PORT}/uploads/${imagePath}` : null
    });
  } catch (error) {
    console.error('Booking error:', error);
    
    // Clean up uploaded file if there was an error
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting uploaded file:', err);
      });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection) connection.release();
  }
});

// Get all bookings (for admin purposes)
app.get('/api/bookings', async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM bookings ORDER BY created_at DESC');
    
    // Add full image URLs to each booking
    const bookingsWithImageUrls = rows.map(booking => ({
      ...booking,
      image_url: booking.image_path ? `http://localhost:${PORT}/uploads/${booking.image_path}` : null
    }));
    
    res.json(bookingsWithImageUrls);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  } finally {
    if (connection) connection.release();
  }
});

// Get booking by ID
app.get('/api/bookings/:id', async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM bookings WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    const booking = rows[0];
    // Add image URL
    booking.image_url = booking.image_path ? `http://localhost:${PORT}/uploads/${booking.image_path}` : null;
    
    res.json(booking);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  } finally {
    if (connection) connection.release();
  }
});

// Serve uploaded images
app.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, 'uploads', filename);
  
  // Check if file exists
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).json({ error: 'Image not found' });
  }
});

// Test email configuration endpoint
app.get('/api/debug-email', async (req, res) => {
  try {
    const emailConfig = {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      user: process.env.EMAIL_USER,
      hasPassword: !!process.env.EMAIL_PASSWORD && process.env.EMAIL_PASSWORD !== 'your_app_password',
      from: process.env.EMAIL_FROM
    };

    console.log('🔍 Email configuration debug:');
    console.log('   EMAIL_HOST:', emailConfig.host);
    console.log('   EMAIL_USER:', emailConfig.user);
    console.log('   HAS_REAL_PASSWORD:', emailConfig.hasPassword);
    console.log('   EMAIL_FROM:', emailConfig.from);

    res.json({
      config: emailConfig,
      message: emailConfig.hasPassword ? 
        'Email appears to be configured correctly' : 
        'Email password not configured or using placeholder'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/admin/bookings - Get all bookings for admin
app.get('/api/admin/bookings', async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Fetching all bookings...');
    
    const [rows] = await connection.execute(`
      SELECT id, name, email, phone, room_type, status, check_in, check_out, guests, special_requests, created_at 
      FROM bookings 
      ORDER BY created_at DESC
    `);
    
    console.log(`Found ${rows.length} bookings`);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings: ' + error.message });
  } finally {
    if (connection) connection.release();
  }
});

// PUT /api/admin/bookings/:id - Update booking
app.put('/api/admin/bookings/:id', async (req, res) => {
  let connection;
  try {
    const { name, email, phone, room_type, status } = req.body;
    const bookingId = req.params.id;
    
    console.log('Updating booking:', bookingId, req.body);
    
    connection = await pool.getConnection();
    
    // Check if booking exists first
    const [existing] = await connection.execute(
      'SELECT id FROM bookings WHERE id = ?',
      [bookingId]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    const [result] = await connection.execute(
      'UPDATE bookings SET name = ?, email = ?, phone = ?, room_type = ?, status = ? WHERE id = ?',
      [name, email, phone, room_type, status, bookingId]
    );
    
    console.log('Update result:', result);
    res.json({ message: 'Booking updated successfully' });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Failed to update booking: ' + error.message });
  } finally {
    if (connection) connection.release();
  }
});

// DELETE /api/admin/bookings/:id - Delete booking
app.delete('/api/admin/bookings/:id', async (req, res) => {
  let connection;
  try {
    const bookingId = req.params.id;
    console.log('Deleting booking:', bookingId);
    
    connection = await pool.getConnection();
    
    const [result] = await connection.execute(
      'DELETE FROM bookings WHERE id = ?',
      [bookingId]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Failed to delete booking: ' + error.message });
  } finally {
    if (connection) connection.release();
  }
});
// Test endpoint to check all available routes
app.get('/api/debug', (req, res) => {
  res.json({
    message: 'API is working!',
    endpoints: [
      'GET /api/rooms',
      'POST /api/bookings',
      'GET /api/admin/bookings',
      'PUT /api/admin/bookings/:id',
      'DELETE /api/admin/bookings/:id'
    ]
  });
});
// Error handling middleware for multer
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    }
  }
  
  if (error.message === 'Only image files are allowed!') {
    return res.status(400).json({ error: error.message });
  }
  
  res.status(500).json({ error: 'Something went wrong!' });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Hotel Booking API Server', 
    endpoints: {
      rooms: 'GET /api/rooms',
      createBooking: 'POST /api/bookings',
      getBookings: 'GET /api/bookings',
      getBooking: 'GET /api/bookings/:id',
      uploads: 'GET /uploads/:filename'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`);
});