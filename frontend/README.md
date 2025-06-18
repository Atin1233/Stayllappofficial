# Stayll Frontend

A React-based frontend for the Stayll property management system.

## Features

- **User Authentication**: Register and login with JWT tokens
- **Property Management**: Create and manage properties with detailed forms
- **AI-Generated Listings**: Automatic listing generation when properties are created
- **Copy/Paste Functionality**: Easy copying of listings to clipboard
- **Responsive Design**: Works on desktop and mobile devices

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## Usage

1. **Register/Login**: Create an account or sign in with existing credentials
2. **Add Properties**: Use the "Add Property" tab to create new properties
3. **View Listings**: Switch to "View Listings" to see AI-generated listings
4. **Copy Listings**: Click "Copy Listing" to copy the full listing text to your clipboard

## API Integration

The frontend communicates with the Stayll backend API running on `http://localhost:3000`. Make sure your backend server is running before using the frontend.

## Technologies Used

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Axios for API communication
- React Router for navigation

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
