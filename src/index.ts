import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import listingRoutes from './routes/listing.routes';
import propertyRoutes from './routes/property.routes';
import authRoutes from './routes/auth.routes';
import { checkDatabaseConnection, initializeDatabase } from './services/database.service';

const app = express();
const PORT = 3000;

// Enable CORS for frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'], // Multiple Vite dev server ports
  credentials: true
}));

app.use(bodyParser.json());

// Health check endpoint
app.get('/health', async (req, res) => {
  const dbConnected = await checkDatabaseConnection();
  
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: dbConnected ? 'connected' : 'disconnected',
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/listings', listingRoutes);

// Initialize database and start server
async function startServer() {
  try {
    // Check database connection
    const dbConnected = await checkDatabaseConnection();
    if (!dbConnected) {
      console.error('❌ Database connection failed. Please check your DATABASE_URL in .env');
      console.error('💡 For development, you can use: DATABASE_URL="postgresql://postgres:password@localhost:5432/stayll?schema=public"');
      process.exit(1);
    }

    // Initialize database (create tables if they don't exist)
    await initializeDatabase();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Stayll backend running on http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth`);
      console.log(`🏠 Property endpoints: http://localhost:${PORT}/api/properties`);
      console.log(`📝 Listing endpoints: http://localhost:${PORT}/api/listings`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
