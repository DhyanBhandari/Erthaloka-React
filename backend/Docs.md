# 1. Navigate to backend directory
cd backend

# 2. Install new dependencies
npm install fs-extra cron

# 3. Create upload directories
mkdir -p uploads/{images,documents,profiles}

# 4. Copy environment file
cp .env.example .env

# 5. Run database migrations
npm run migrate up

# 6. Start development server
npm run dev