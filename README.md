# Startup Benefits Platform

A web application where startups can find and claim exclusive deals on SaaS tools.

## What does it do?

This platform helps early-stage startups save money by providing access to deals on tools like AWS, Notion, HubSpot, etc. Some deals are public, and some are locked for verified users.

## Tech Stack

**Frontend:**
- Next.js (App Router)
- TypeScript
- Tailwind CSS for styling

**Backend:**
- Node.js with Express
- MongoDB database
- JWT for authentication

## How to Run

### Prerequisites
You need to have these installed:
- Node.js (I used v18)
- MongoDB running locally

### Backend Setup

1. Go to the server folder:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running (I used `mongod` in terminal)

4. Seed the database with sample deals:
```bash
npm run seed
```

5. Start the server:
```bash
npm run dev
```

Server should be running on port 8000.

### Frontend Setup

1. Open another terminal and go to client folder:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend:
```bash
npm run dev
```

Frontend should open on http://localhost:3000

## How it Works

1. **Browse Deals** - You can see all deals on the deals page
2. **Register** - Create an account to unlock deals
3. **Claim Deals** - Click on a deal and claim it
4. **Dashboard** - See all your claimed deals with redemption codes

## Project Structure

```
server/
  src/
    controllers/ - Handle API logic
    models/ - Database schemas
    routes/ - API endpoints
    middleware/ - Auth middleware
    
client/
  src/
    app/ - Next.js pages
    components/ - Reusable components
    context/ - Auth context
    lib/ - Utilities
```

## Features

- User authentication (register/login)
- Browse deals with search and category filter
- Locked vs unlocked deals
- Claim system
- User dashboard to track claims

## Known Issues / TODO

- Mobile menu is not implemented (desktop only for now)
- Email verification is not actually implemented
- Admin panel for managing deals would be nice
- Better error messages

## Notes

The backend uses JWT tokens stored in localStorage. In production, this should probably use httpOnly cookies for better security.

The database is just running locally, so you need MongoDB installed. The connection string is in the .env file.

## Environment Variables

Create a `.env` file in the server folder:

```
PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/prime-station
JWT_SECRET=your_secret_here
```

You can change the JWT_SECRET to anything you want.
# Perkstack
