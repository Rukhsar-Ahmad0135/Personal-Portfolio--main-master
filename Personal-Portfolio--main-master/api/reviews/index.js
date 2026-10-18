// Backend API for handling reviews
// Supports both local development and production deployment

import fs from 'fs';
import path from 'path';

// Path to data file - works for both local and Vercel deployments
const DATA_PATH = path.join(process.cwd(), 'reviews.json');

// Helper function to read data
function readData() {
  try {
    if (fs.existsSync(DATA_PATH)) {
      const data = fs.readFileSync(DATA_PATH, 'utf8');
      return JSON.parse(data);
    }
    return { reviews: [], submitted: [] };
  } catch (error) {
    console.error('Error reading data:', error);
    return { reviews: [], submitted: [] };
  }
}

// Helper function to write data
function writeData(data) {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data:', error);
    // For Vercel deployment, we'll log the error but not crash the app
  }
}

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const data = readData();

    if (req.method === 'GET') {
      // Return all reviews (both initial and submitted)
      const allReviews = [...data.reviews, ...data.submitted];
      const averageRating = allReviews.length > 0
        ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
        : 0;

      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({
        reviews: allReviews,
        stats: {
          averageRating: Number(averageRating.toFixed(1)),
          totalReviews: allReviews.length
        }
      });
    } else if (req.method === 'POST') {
      // Validate request body
      if (!req.body || !req.body.name || !req.body.role || !req.body.rating || !req.body.text) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Create new review
      const newReview = {
        id: `submitted-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: String(req.body.name).trim(),
        role: String(req.body.role).trim(),
        rating: Number(req.body.rating),
        text: String(req.body.text).trim(),
        date: new Date().toISOString().split('T')[0]
      };

      // Save to data
      const updatedData = {
        ...data,
        submitted: [...data.submitted, newReview]
      };
      writeData(updatedData);

      res.setHeader('Content-Type', 'application/json');
      res.status(201).json(newReview);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}