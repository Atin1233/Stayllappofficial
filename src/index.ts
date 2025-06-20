import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import propertyRoutes from './routes/property.routes';
import listingRoutes from './routes/listing.routes';
import analyticsRoutes from './routes/analytics.routes';
import { checkDatabaseConnection, initializeDatabase } from './services/database.service';

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error handling middleware
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

async function startServer() {
  try {
    console.log('Starting server...');
    
    // Initialize database connection
    const dbConnected = await checkDatabaseConnection();
    if (!dbConnected) {
      console.error('❌ Database connection failed. Please check your DATABASE_URL in .env');
      process.exit(1);
    }
    
    await initializeDatabase();
    console.log('Database connection established');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`API base: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
