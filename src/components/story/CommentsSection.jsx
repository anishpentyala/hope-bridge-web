import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2 } from 'lucide-react';
import { createStoryComment, listStoryComments } from '@/lib/localStories';

export default function CommentsSection({ storyId, onCommentAdded }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadComments = async () => {
      setIsLoading(true);
      setError('');
      const data = await listStoryComments(storyId);
      if (!isMounted) return;
      setComments(data);
      setIsLoading(false);
    };

    loadComments();

    return () => {
      isMounted = false;
    };
  }, [storyId]);

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !authorName.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      const created = await createStoryComment({
        storyId,
        author_name: authorName,
        content: newComment
      });

      if (created) {
        setComments((prev) => [...prev, created]);
        onCommentAdded?.(storyId);
      }

      setNewComment('');
      setAuthorName('');
    } catch (err) {
      setError(err?.message || 'Failed to post comment. Please try again.');
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
      <div className="space-y-2">
        <Input
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Your name"
          maxLength={50}
          className="text-gray-900 rounded-lg bg-white border-blue-200"
        />
        <div className="flex gap-2">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            maxLength={300}
            className="text-gray-900 rounded-lg bg-white border-blue-200"
          />
          <Button
            onClick={handleSubmitComment}
            disabled={isSubmitting || !newComment.trim() || !authorName.trim()}
            size="icon"
            className="bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50">
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
        {error ? <p className="text-xs text-red-600">{error}</p> : null}
      </div>

      {/* Comments */}
      {isLoading ? (
        <p className="text-xs text-gray-500">Loading comments...</p>
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
                  {comment.author_name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-700 break-words">{comment.author_name}</p>
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
