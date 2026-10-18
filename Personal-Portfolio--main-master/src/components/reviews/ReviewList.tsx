import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { getAllReviews, getAverageRating } from '@/data/reviews';
import type { Review } from '@/data/reviews';
import { getSubmittedReviews } from '@/data/reviews';

function RatingBar({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`size-4 ${
            n <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-transparent text-black/20'
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initials = review.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div className="bg-white border border-black/10 rounded-xl p-6 flex flex-col h-full">
      <div className="flex items-start gap-4">
        <div className="size-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-light flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <RatingBar rating={review.rating} />
            <span className="text-xs font-light text-black/40">{review.date}</span>
          </div>
          <p className="text-sm md:text-base font-light text-black/70 leading-relaxed">
            "{review.text}"
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm font-light text-black">{review.name}</p>
        <p className="text-xs font-light text-black/50">{review.role}</p>
      </div>
    </div>
  );
}

export function ReviewStats() {
  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    const loadReviews = async () => {
      const all = await getAllReviews();
      setTotal(all.length);
      setAvg(all.length > 0 ? getAverageRating() : 0);
    };
    loadReviews();
  }, []);

  if (total === 0) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={`size-5 ${
              n <= Math.round(avg)
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-transparent text-black/30'
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-light text-black/60">
        {avg.toFixed(1)} ({total} reviews)
      </span>
    </div>
  );
}

export function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const loadReviews = async () => {
      const all = await getAllReviews();
      setReviews(all);
    };
    loadReviews();
  }, []);

  if (reviews.length === 0) {
    return (
      <p className="text-sm font-light text-black/50">
        No reviews yet — be the first to share your experience.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {reviews.map((review, i) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
        >
          <ReviewCard review={review} />
        </motion.div>
      ))}
    </div>
  );
}
