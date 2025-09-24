const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Routes
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');

// Error handler
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// --------------------
// Middleware
// --------------------
app.use(cors({ origin: '*' })); // Allow all origins
app.use(express.json());

// --------------------
// Swagger Docs
// --------------------
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --------------------
// Routes
// --------------------
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
    console.error('❌ MongoDB connection error:', err);
  });
