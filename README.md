# Football Match Prediction

A simple Next.js application that allows users to predict football match outcomes.

## Features

- View upcoming football fixtures
- Create match predictions
- Get points based on your predictions
- User authentication

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: Prisma with SQLite
- **Authentication**: Kinde Auth

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   ```bash
   npx prisma migrate dev
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/prisma` - Database schema and migrations
- `/src/actions` - Server actions
- `/src/app` - Next.js app router pages
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions and libraries
