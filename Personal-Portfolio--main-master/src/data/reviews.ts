export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Ayesha Khan',
    role: 'Founder, Northstar Labs',
    rating: 5,
    text: 'Rukhsar translated a complex product into a clear, polished experience that our customers understood immediately. The AI integration she built for our recommendation engine was grounded, fast, and never broke on edge cases.',
    date: '2026-09-15',
  },
  {
    id: '2',
    name: 'Hamza Malik',
    role: 'Product Lead, Orbit Commerce',
    rating: 5,
    text: 'Thoughtful, fast and incredibly reliable. Every detail felt intentional, from the first wireframe to launch day. She shipped a full MERN store with a custom PC builder that actually validates part compatibility — something our old vendor never got right.',
    date: '2026-08-22',
  },
  {
    id: '3',
    name: 'Sara Ahmed',
    role: 'Director, Studio Sora',
    rating: 5,
    text: 'The rare developer who cares equally about the experience, the architecture and the result for the business. Her Figma-to-React workflow saved us weeks of iteration.',
    date: '2026-07-10',
  },
];

export const getFeaturedReviews = (limit = 6): Review[] =>
  reviews.sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, limit);

export const getAverageRating = (): number => {
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
};

export interface ReviewFormValues {
  name: string;
  role: string;
  rating: number;
  text: string;
}

const REVIEW_STORAGE_KEY = 'portfolio_reviews';

export const getSubmittedReviews = async (): Promise<Review[]> => {
  if (typeof window === 'undefined') return [];
  try {
    const response = await fetch('/api/reviews');
    if (response.ok) {
      const data = await response.json();
      return data.reviews || [];
    }
    return [];
  } catch {
    // Fallback to localStorage for development
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(REVIEW_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
    return [];
  }
};

export const saveReview = async (review: Review): Promise<void> => {
  if (typeof window === 'undefined') return;
  try {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });

    if (!response.ok) {
      // Fallback to localStorage
      const existing = await getSubmittedReviews();
      localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify([review, ...existing]));
    }
  } catch {
    // Fallback to localStorage
    if (typeof window !== 'undefined') {
      const existing = await getSubmittedReviews();
      localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify([review, ...existing]));
    }
  }
};

export const getAllReviews = async (): Promise<Review[]> => {
  const submitted = await getSubmittedReviews();
  return [...reviews, ...submitted];
};

export const getReviewStats = () => {
  const all = getAllReviews();
  const total = all.length;
  const avg = total > 0 ? all.reduce((sum, r) => sum + r.rating, 0) / total : 0;
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  all.forEach((r) => {
    distribution[r.rating] = (distribution[r.rating] || 0) + 1;
  });
  return { total, avg, distribution };
};
