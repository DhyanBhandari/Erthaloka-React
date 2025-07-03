# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



# ErthaLoka - Sustainable Living Platform

A comprehensive platform for regenerative communities featuring authentication, subscription management, and sustainable living spaces.

## 🌿 Features

### Authentication & Security
- **Google OAuth 2.0** integration
- **Phone number verification** with OTP
- **Email/Password authentication**
- **JWT-based** session management
- **Multi-factor authentication** support

### Subscription Management
- **Three-tier subscription model**:
  - 🌱 **EcoVerse Resident** (₹999/month)
  - ⭐ **EcoVerse Ambassador** (₹1,999/month) 
  - 👑 **EcoVerse Warrior** (₹4,999/month)
- **Razorpay payment integration**
- **Automated billing and renewals**
- **Subscription analytics and reporting**

### Core Functionality
- **Space booking system** for Lokations locations
- **Community networking** through ErthaCANnect
- **Sustainable marketplace** via ErthaBazaar
- **Event management** with Sustainable Circle
- **User dashboard** with comprehensive analytics

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm 8+
- PostgreSQL 12+
- Redis 6+ (optional, for session storage)
- Docker & Docker Compose (for containerized deployment)

### Environment Setup

1. **Clone the repository**:
```bash
git clone https://github.com/erthaloka/platform.git
cd erthaloka-platform
```

2. **Set up environment variables**:
```bash
# Backend
cp backend/.env.example backend/.env
# Frontend  
cp frontend/.env.example frontend/.env
```

3. **Configure your environment variables** in the `.env` files:

#### Backend Environment Variables
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=erthaloka_db
DB_USER=postgres
DB_PASSWORD=your_secure_password

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
SESSION_SECRET=your-session-secret

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Razorpay
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email & SMS
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
```

#### Frontend Environment Variables
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RAZORPAY_KEY_ID=rzp_test_your_key_id
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
```

### Development Setup

#### Option 1: Local Development

1. **Setup Database**:
```bash
# Create PostgreSQL database
createdb erthaloka_db

# Run migrations
cd backend
npm install
npm run migrate up

# Seed with sample data
npm run seed
```

2. **Start Backend**:
```bash
cd backend
npm install
npm run dev
```

3. **Start Frontend**:
```bash
cd frontend
npm install
npm start
```

4. **Access the application**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Documentation: http://localhost:5000/api-docs

#### Option 2: Docker Development

1. **Start all services**:
```bash
docker-compose up -d
```

2. **Run database migrations**:
```bash
docker-compose exec backend npm run migrate up
docker-compose exec backend npm run seed
```

3. **Access the application**:
- Frontend: http://localhost:80
- Backend API: http://localhost:5000

## 📁 Project Structure
'''
erthaloka-project/
├── frontend/                          # React TypeScript Frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── logo4.png
│   │   ├── bg.jpeg
│   │   ├── logo2.png
│   │   └── atal-incubation.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutErthaLokaSection.tsx
│   │   │   ├── WhatWeDo.tsx
│   │   │   ├── ErthalokaEcosystemSection.tsx
│   │   │   ├── SustainableTechInnovations.tsx
│   │   │   ├── SubscriptionTeaserSection.tsx
│   │   │   ├── UpcomingSection.tsx
│   │   │   ├── GetInvolvedSection.tsx
│   │   │   ├── GetInTouch.tsx
│   │   │   ├── TeamSection.tsx
│   │   │   ├── AuthModal.tsx
│   │   │   ├── OTPVerification.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── UserDashboard.tsx
│   │   │   ├── AdminPanel.tsx              # 🆕 NEW
│   │   │   └── CarbonCoinDisplay.tsx       # 🆕 NEW
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx
│   │   ├── hooks/
│   │   │   └── useCarbonCoins.ts           # 🆕 NEW
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── LokationsPage.tsx
│   │   │   ├── ErthaCANnectPage.tsx
│   │   │   ├── ErthaBazaarPage.tsx
│   │   │   ├── SustainableCirclePage.tsx
│   │   │   └── SubscriptionPlansPage.tsx
│   │   ├── services/
│   │   │   └── analytics.ts               # 🆕 NEW
│   │   ├── App.tsx                        # ✏️ UPDATED
│   │   ├── index.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/                           # Node.js Express Backend
│   ├── config/
│   │   ├── database.js
│   │   └── passport.js
│   ├── middleware/
│   │   └── adminAuth.js               # 🆕 NEW
│   ├── routes/
│   │   ├── auth.js
│   │   ├── subscription.js
│   │   ├── users.js
│   │   └── admin.js                   # 🆕 NEW
│   ├── services/
│   │   ├── emailService.js
│   │   ├── fileService.js
│   │   ├── smsService.js
│   │   └── carbonCoinService.js       # 🆕 NEW
│   ├── scripts/
│   │   ├── migrate.js
│   │   ├── seed.js
│   │   ├── cleanup-files.js
│   │   └── carbon-coins-migration.js  # 🆕 NEW
│   ├── utils/
│   │   └── index.js
│   ├── uploads/                       # File upload directory
│   │   ├── images/
│   │   ├── documents/
│   │   └── profiles/
│   ├── .env                          # ✏️ UPDATED
│   ├── .env.example                  # ✏️ UPDATED
│   ├── package.json
│   ├── server.js                     # ✏️ UPDATED
│   ├── healthcheck.js
│   └── Docs.md
│
└── deployment/                       # Deployment configs
    ├── docker-compose.yml
    ├── Dockerfile.frontend
    ├── Dockerfile.backend
    └── nginx.conf
    '''

## 🔧 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com", 
  "password": "securepassword"
}
```

#### Phone OTP Login
```http
POST /api/auth/send-otp
Content-Type: application/json

{
  "phone": "+919876543210"
}

POST /api/auth/verify-otp
Content-Type: application/json

{
  "phone": "+919876543210",
  "otp": "123456"
}
```

#### Google OAuth
```http
GET /api/auth/google
# Redirects to Google OAuth consent screen

GET /api/auth/google/callback
# Handles Google OAuth callback
```

### Subscription Endpoints

#### Get Plans
```http
GET /api/subscriptions/plans
```

#### Create Subscription Order
```http
POST /api/subscriptions/create-order
Authorization: Bearer <token>
Content-Type: application/json

{
  "planId": "ambassador"
}
```

#### Verify Payment
```http
POST /api/subscriptions/verify-payment
Authorization: Bearer <token>
Content-Type: application/json

{
  "razorpay_payment_id": "pay_xxxxx",
  "razorpay_order_id": "order_xxxxx", 
  "razorpay_signature": "signature_xxxxx",
  "planId": "ambassador"
}
```

### User Management Endpoints

#### Get User Dashboard
```http
GET /api/users/dashboard
Authorization: Bearer <token>
```

#### Create Booking
```http
POST /api/users/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "spaceType": "Private Room",
  "spaceLocation": "Bengaluru",
  "checkInDate": "2025-07-15", 
  "checkOutDate": "2025-07-20",
  "guestCount": 2
}
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test                    # Run all tests
npm run test:unit          # Unit tests only
npm run test:integration   # Integration tests only
npm run test:coverage      # Test coverage report
```

### Frontend Testing
```bash
cd frontend
npm test                   # Run React tests
npm run test:coverage     # Test coverage report
```

### API Testing with Postman
Import the Postman collection from `/docs/postman/` to test all API endpoints.

## 🚀 Production Deployment

### Environment Setup
1. **Set production environment variables**
2. **Configure SSL certificates**
3. **Set up monitoring and logging**
4. **Configure backup strategies**

### Docker Production Deployment
```bash
# Build production images
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

# Deploy with production profile
docker-compose --profile production up -d

# Run database migrations
docker-compose exec backend npm run migrate up
```

### Manual Deployment
```bash
# Backend deployment
cd backend
npm ci --only=production
npm run migrate up
pm2 start server.js --name erthaloka-api

# Frontend deployment  
cd frontend
npm ci
npm run build
# Deploy build/ directory to web server
```

## 📊 Monitoring & Analytics

### Application Monitoring
- **Health checks** for all services
- **Performance metrics** with Prometheus  
- **Visualization** with Grafana dashboards
- **Error tracking** with integrated logging

### Business Analytics  
- **User registration and retention** metrics
- **Subscription conversion** rates
- **Booking patterns** and revenue tracking
- **Community engagement** statistics

## 🔒 Security Features

### Data Protection
- **Password hashing** with bcrypt
- **JWT token expiration** and refresh
- **Rate limiting** on sensitive endpoints
- **Input validation** and sanitization
- **CORS protection** for cross-origin requests

### Privacy & Compliance
- **GDPR compliant** data handling
- **User data anonymization** options
- **Secure payment processing** via Razorpay
- **Audit logging** for sensitive operations

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow **TypeScript best practices**
- Write **comprehensive tests** for new features
- Update **documentation** for API changes
- Follow **conventional commit** messages
- Ensure **code passes all linting** checks

## 📞 Support & Contact

- **Website**: https://erthaloka.com
- **Email**: support@erthaloka.com
- **Phone**: +91 78297 78299
- **WhatsApp Community**: [Join here](https://chat.whatsapp.com/LUlrfRH2c17A2PmHAUaajl)

### Technical Support
- **Documentation**: Check our comprehensive docs
- **Issues**: Report bugs via GitHub issues
- **Community**: Join our developer Slack channel
- **Enterprise**: Contact enterprise@erthaloka.com

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **React** and **TypeScript** communities
- **Node.js** and **Express** ecosystems  
- **PostgreSQL** database team
- **Razorpay** for payment processing
- **Google** for OAuth services
- All contributors and supporters of **regenerative living**

---

**Built with ❤️ for a sustainable future by the ErthaLoka team**