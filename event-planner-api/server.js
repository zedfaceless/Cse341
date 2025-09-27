// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Routes
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/auth');      // Google OAuth (browser flow)
const authApiRoutes = require('./routes/authApi'); // local login (JWT)

// Error handler
const errorHandler = require('./middleware/errorHandler');

// Initialize passport strategies
require('./passport-setup');

// --------------------
// Middleware
// --------------------
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboardcat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// --------------------
// Swagger Docs
// --------------------
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --------------------
// Routes
// --------------------
app.use('/auth', authRoutes);        // Google OAuth routes (browser)
app.use('/api/auth', authApiRoutes); // POST /api/auth/login (local)
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);

// --------------------
// Error Handling Middleware
// --------------------
app.use(errorHandler);

// --------------------
// Connect MongoDB & Start Server
// --------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error(' MongoDB connection error:', err);
  });
