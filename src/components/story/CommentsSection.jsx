import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2 } from 'lucide-react';

export default function CommentsSection({ storyId, commentsCount }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !authorName.trim()) return;

    setIsSubmitting(true);
    // Simulate a brief delay for UX
    await new Promise((r) => setTimeout(r, 500));

    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        author_name: authorName.trim(),
        content: newComment.trim(),
      },
    ]);
    setNewComment('');
    setAuthorName('');
    setIsSubmitting(false);
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
        <p className="text-xs text-gray-500">Comments are visible to you during this session</p>
      </div>

      {/* Comments */}
      {comments.length > 0 ? (
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
