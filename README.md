# Stayll - AI-Powered Property Management System

Stayll is a comprehensive property management platform that combines a robust backend API with an intuitive frontend dashboard for landlords and property managers.

## 🚀 Features

### Backend (Phase 1-3 Complete)
- **AI-Powered Listing Generation**: Automatically creates compelling property listings using Hugging Face API
- **Property Management**: Full CRUD operations for properties with detailed information
- **User Authentication**: JWT-based authentication with user registration and login
- **Database Integration**: SQLite database with Prisma ORM for data persistence
- **RESTful API**: Clean, well-documented API endpoints

### Frontend (Phase 4 Complete)
- **User Authentication UI**: Beautiful login and registration forms
- **Property Creation Form**: Comprehensive form for adding new properties
- **Listings Dashboard**: View and manage AI-generated listings
- **Copy/Paste Functionality**: One-click copying of listings to clipboard
- **Responsive Design**: Works seamlessly on desktop and mobile

## 🛠️ Tech Stack

### Backend
- **Node.js** with **TypeScript**
- **Express.js** for API framework
- **Prisma ORM** with **SQLite** database
- **JWT** for authentication
- **Zod** for validation
- **bcrypt** for password hashing

### Frontend
- **React 18** with **TypeScript**
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Axios** for API communication

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Quick Start

1. **Clone and install all dependencies:**
```bash
git clone <repository-url>
cd Stayll
npm run install:all
```

2. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Initialize the database:**
```bash
npx prisma migrate dev
npx prisma generate
```

4. **Start both backend and frontend:**
```bash
npm run dev:full
```

### Manual Setup

#### Backend Only
```bash
npm install
npx prisma migrate dev
npx prisma generate
npm run dev
```

#### Frontend Only
```bash
cd frontend
npm install
npm run dev
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Properties
- `GET /api/properties` - Get all properties (authenticated)
- `POST /api/properties` - Create new property (authenticated)
- `GET /api/properties/:id` - Get property by ID
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Listings
- `GET /api/listings` - Get all listings (authenticated)
- `POST /api/listings/generate/:propertyId` - Generate AI listing for property
- `GET /api/listings/:id` - Get listing by ID
- `DELETE /api/listings/:id` - Delete listing

## 🎯 Usage

### For Landlords
1. **Register/Login** to your Stayll account
2. **Add Properties** using the comprehensive property form
3. **Generate Listings** automatically when properties are created
4. **Copy Listings** with one click for use on rental platforms
5. **Manage Properties** and listings from the dashboard

### API Integration
The backend provides a RESTful API that can be integrated with:
- Property management software
- Rental listing platforms
- CRM systems
- Custom applications

## 🔧 Development

### Backend Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npx prisma studio    # Open Prisma Studio for database management
```

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Database Management
```bash
npx prisma migrate dev    # Create and apply migrations
npx prisma generate       # Generate Prisma client
npx prisma studio         # Open database GUI
```

## 📁 Project Structure

```
Stayll/
├── src/                    # Backend source code
│   ├── controllers/        # API controllers
│   ├── middleware/         # Express middleware
│   ├── models/            # Data models and validation
│   ├── repositories/      # Database operations
│   ├── routes/            # API routes
│   └── services/          # Business logic
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   └── services/      # API service layer
│   └── public/            # Static assets
├── prisma/                # Database schema and migrations
└── package.json           # Backend dependencies
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET="your-secret-key-change-in-production"

# Hugging Face API (for AI listing generation)
HUGGING_FACE_API_KEY="your-hugging-face-api-key"
```

## 🚀 Deployment

### Backend Deployment
1. Build the TypeScript code: `npm run build`
2. Set up production environment variables
3. Deploy to your preferred hosting platform (Heroku, Vercel, etc.)

### Frontend Deployment
1. Build the React app: `cd frontend && npm run build`
2. Deploy the `dist` folder to your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please open an issue in the repository or contact the development team. 