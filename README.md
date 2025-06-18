# Stayll - Property Management Platform

Stayll is a comprehensive property management platform designed for landlords and property managers to efficiently manage their rental properties, generate listings, and track analytics.

## 🚀 Features

### Authentication & User Management
- **Secure Login/Registration**: JWT-based authentication with bcrypt password hashing
- **User Profiles**: View and edit personal information, contact details, and company information
- **User Types**: Support for landlords, property managers, and admin users
- **Session Management**: Automatic token refresh and secure logout

### Property Management
- **Add Properties**: Comprehensive property form with detailed information
  - Property details (title, type, address, bedrooms, bathrooms)
  - Financial information (rent, utilities, pet policies)
  - Amenities and features
  - Photo URLs and availability dates
- **Manage Properties**: View, edit, and delete existing properties
- **Property Types**: Support for apartments, houses, condos, townhouses, and studios

### Listing Generation
- **AI-Powered Listings**: Automatic generation of professional rental listings
- **Template-Based System**: Consistent, high-quality listing descriptions
- **Property Integration**: Seamless connection between properties and listings
- **Listing Management**: View and manage all generated listings

### Analytics Dashboard
- **Key Metrics**: Total properties, listings, average rent, and recent activity
- **Property Distribution**: Breakdown by property type
- **Revenue Overview**: Total monthly revenue and financial insights
- **Recent Activity**: Latest property additions and updates
- **Visual Charts**: Clean, modern dashboard with intuitive metrics

### User Interface
- **Modern Design**: Clean, responsive interface built with React and Tailwind CSS
- **Tabbed Navigation**: Easy switching between different features
- **Real-time Updates**: Instant feedback and data synchronization
- **Mobile Responsive**: Works seamlessly on all device sizes

## 🛠️ Technology Stack

### Backend
- **Node.js** with **Express.js** framework
- **TypeScript** for type safety and better development experience
- **Prisma ORM** with **SQLite** database
- **JWT** for authentication
- **bcrypt** for password hashing
- **Zod** for data validation

### Frontend
- **React 18** with **TypeScript**
- **Tailwind CSS** for styling
- **Axios** for API communication
- **Vite** for fast development and building

### Database
- **SQLite** for data persistence
- **Prisma Migrations** for database schema management
- **Automatic seeding** for development data

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup
```bash
# Install dependencies
npm install

# Set up environment variables
echo 'DATABASE_URL="file:./prisma/dev.db"' > .env
echo 'JWT_SECRET="your-very-secret-key"' >> .env

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database with test data
npm run db:seed

# Start the development server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Full Stack Development
```bash
# From the root directory, start both backend and frontend
npm run dev:full
```

## 🔧 Available Scripts

### Backend Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with test data
- `npm run db:studio` - Open Prisma Studio

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🗄️ Database Schema

### Users
- Authentication information (email, password)
- Personal details (name, phone, company)
- User type and status
- Timestamps for creation and updates

### Properties
- Property details (title, address, type)
- Specifications (bedrooms, bathrooms, square footage)
- Financial information (rent, utilities)
- Features and amenities
- Photo URLs and availability

### Listings
- Generated listing text
- Property associations
- User ownership
- Creation and update timestamps

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Listings
- `GET /api/listings` - Get all listings
- `GET /api/listings/:id` - Get listing by ID
- `POST /api/listings` - Create new listing
- `POST /api/listings/generate-listing` - Generate listing for property
- `DELETE /api/listings/:id` - Delete listing

## 🧪 Testing

### Test User Credentials
- **Email**: test@example.com
- **Password**: password123

### API Testing
```bash
# Test login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test health check
curl http://localhost:3001/health
```

## 🚀 Deployment

### Environment Variables
- `DATABASE_URL` - Database connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 3001)

### Production Build
```bash
# Backend
npm run build
npm start

# Frontend
cd frontend
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the GitHub repository.

---

**Stayll** - Making property management simple and efficient. 