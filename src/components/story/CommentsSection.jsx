import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2 } from 'lucide-react';

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/+$/, '');
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const supaFetch = async (path, options = {}) => {
  const { method = 'GET', body } = options;
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    method,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      ...(method === 'POST' ? { Prefer: 'return=representation' } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const text = await res.text();
  return text ? JSON.parse(text) : null;
};

export default function CommentsSection({ storyId, commentsCount }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load comments from Supabase on mount
  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await supaFetch(
          `/story_comments?story_id=eq.${storyId}&order=created_date.asc`
        );
        if (Array.isArray(data)) {
          setComments(data);
        }
      } catch (err) {
        console.error('Failed to load comments:', err);
      } finally {
        setIsLoading(false);
      }
    };
    if (storyId) loadComments();
  }, [storyId]);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    setIsSubmitting(true);
    try {
      const data = await supaFetch('/story_comments', {
        method: 'POST',
        body: {
          story_id: storyId,
          author_name: 'Anonymous',
          content: newComment.trim(),
        },
      });
      if (Array.isArray(data) && data.length > 0) {
        setComments((prev) => [...prev, data[0]]);
      }
      setNewComment('');
    } catch (err) {
      console.error('Failed to post comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="px-6 py-4 bg-gray-50 border-t border-blue-100 space-y-4">

      {/* Comment Input */}
      <div className="flex gap-2">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts anonymously..."
          maxLength={300}
          className="text-gray-900 rounded-lg bg-white border-blue-200"
        />
        <Button
          onClick={handleSubmitComment}
          disabled={isSubmitting || !newComment.trim()}
          size="icon"
          className="bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50">
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </div>

      {/* Comments */}
      {isLoading ? (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading comments...
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-3 mt-4">
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-white rounded-lg border border-blue-100">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  A
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-700 break-words">Anonymous</p>
                  <p className="text-sm text-gray-700 mt-1 break-words">{comment.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-500">No comments yet. Be the first!</p>
      )}
    </motion.div>
  );
}
