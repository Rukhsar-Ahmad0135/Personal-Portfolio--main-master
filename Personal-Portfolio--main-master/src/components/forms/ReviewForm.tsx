import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, Star } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { saveReview } from '@/data/reviews';
import type { ReviewFormValues } from '@/data/reviews';

const reviewSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  role: z.string().trim().min(2, 'Please tell us what you do').max(100),
  rating: z.number().min(1, 'Please select a rating').max(5),
  text: z
    .string()
    .trim()
    .min(20, 'Review must be at least 20 characters')
    .max(1000, 'Review must be under 1000 characters'),
});

const StarRow = ({ rating, setRating }: { rating: number; setRating: (n: number) => void }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => setRating(n)}
          className="p-1"
          aria-label={`Rate ${n} out of 5`}
        >
          <Star
            className={`size-6 transition-colors ${
              n <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-transparent text-black/30'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export function ReviewForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { name: '', role: '', rating: 0, text: '' },
  });

  const rating = form.watch('rating');

  const onSubmit = async (data: ReviewFormValues) => {
    setIsSubmitting(true);
    try {
      const review = {
        id: `submitted-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: data.name,
        role: data.role,
        rating: data.rating,
        text: data.text,
        date: new Date().toISOString().split('T')[0],
      };

      // Save via API
      await saveReview(review);

      setIsSuccess(true);
      form.reset();
      setTimeout(() => setIsSuccess(false), 6000);
    } catch {
      form.setError('root', {
        message: 'Failed to submit review. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        className="bg-accent border border-border rounded-xl p-8 text-center space-y-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
        >
          <CheckCircle2 className="size-16 mx-auto text-emerald-600" />
        </motion.div>
        <h3 className="text-2xl font-light tracking-wide">Review submitted!</h3>
        <p className="text-sm font-light text-black/55 leading-relaxed">
          Thank you for the feedback. It has been added to the portfolio.
        </p>
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-light tracking-wide">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your full name"
                    className="font-light text-black bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs font-light" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-light tracking-wide">Role</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Product Lead at Acme"
                    className="font-light text-black bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs font-light" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-light tracking-wide">Rating</FormLabel>
              <FormControl>
                <StarRow
                  rating={field.value || 0}
                  setRating={(n) => field.onChange(n)}
                />
              </FormControl>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-light tracking-wide">Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What did we work on together? What stood out?"
                  className="min-h-32 font-light resize-none text-black bg-white"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <div className="text-sm text-destructive font-light">
            {form.formState.errors.root.message}
          </div>
        )}

        <Button type="submit" className="w-full py-6 text-base font-light tracking-wide" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-5 animate-spin" />
              Submitting…
            </>
          ) : (
            'Submit Review'
          )}
        </Button>
      </form>
    </Form>
  );
}