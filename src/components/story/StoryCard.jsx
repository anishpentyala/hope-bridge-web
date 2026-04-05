import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Calendar, Sparkles, X, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import CommentsSection from './CommentsSection';
import StoryMediaViewer from './StoryMediaViewer';

const topicColors = {
  cultural_identity: 'bg-blue-100 text-blue-800',
  academic_stress: 'bg-blue-100 text-blue-800',
  family_pressures: 'bg-gray-100 text-gray-800'
};

const topicLabels = {
  cultural_identity: 'Cultural Identity',
  academic_stress: 'Academic Stress',
  family_pressures: 'Family Pressures'
};

export default function StoryCard({ story, onLike, isLiked }) {
  const [showComments, setShowComments] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  const topicGradients = {
    cultural_identity: 'from-blue-600 to-blue-500',
    academic_stress: 'from-blue-500 to-gray-600',
    family_pressures: 'from-blue-600 to-gray-600'
  };

  const topicBg = {
    cultural_identity: 'bg-white',
    academic_stress: 'bg-white',
    family_pressures: 'bg-white'
  };

  const safeTopic = topicLabels[story.topic] ? story.topic : 'family_pressures';
  const authorName = 'Anonymous';
  const createdDate = story.created_date ? new Date(story.created_date) : new Date();
  const displayDate = Number.isNaN(createdDate.getTime()) ? new Date() : createdDate;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl border transition-all ${topicBg[safeTopic]} ${isHovered ? 'border-blue-400 shadow-xl' : 'border-blue-200'}`}>

      {/* Header */}
      <div className="relative p-6 border-b border-blue-100">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight break-words">{story.title}</h3>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-sm">
                {authorName.charAt(0).toUpperCase()}
              </div>
              <p className="text-sm text-gray-600 truncate">{authorName}</p>
            </div>
          </div>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${topicGradients[safeTopic]} text-white shadow-md whitespace-nowrap ml-2`}>
            {topicLabels[safeTopic]}
          </motion.span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
          <Calendar className="w-3 h-3" />
          {format(displayDate, 'MMM d, yyyy')}
        </div>
      </div>

      {/* Content */}
      <div className="relative px-6 py-5 space-y-4">


        <div>
          <p className="text-gray-700 leading-relaxed line-clamp-4 break-words mb-2">{story.content}</p>
          <button
            onClick={() => setShowFullText(true)}
            className="bg-white hover:bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg text-xs text-blue-600 font-semibold transition-all flex items-center gap-1 shadow-sm">
            <Maximize2 className="w-3 h-3" />
            View Full Story
          </button>
        </div>

        {/* AI Tags */}
        {story.tags && story.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="bg-blue-50 border-blue-200 text-blue-600 text-xs">
                #{tag.replace(/_/g, ' ')}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Media */}
      {(story.media_urls?.length > 0 || story.audio_url) && (
        <div className="relative px-6 py-4 border-t border-blue-100">
          <StoryMediaViewer media_urls={story.media_urls} audio_url={story.audio_url} />
        </div>
      )}

      {/* Actions */}
      <div className="relative px-6 py-4 border-t border-blue-100 flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onLike(story.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
            isLiked 
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}>
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
          <span className="text-sm font-semibold">{story.likes}</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all">
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm font-semibold">{story.comments_count}</span>
        </motion.button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <CommentsSection storyId={story.id} commentsCount={story.comments_count} />
      )}

      {/* Full Text Modal */}
      <AnimatePresence>
        {showFullText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFullText(false)}
            className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4 cursor-pointer">
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto cursor-auto shadow-2xl">
              
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-blue-100 p-6 relative">
                <button
                  onClick={() => setShowFullText(false)}
                  className="absolute top-4 right-4 z-50 bg-gray-900 hover:bg-black text-white p-2 rounded-full transition-all shadow-xl">
                  <X className="w-5 h-5" />
                </button>
                <div className="flex-1 min-w-0 pr-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 break-words">{story.title}</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold">
                      {authorName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{authorName}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {format(displayDate, 'MMM d, yyyy')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">


                {/* Full Story Text */}
                <div className="prose prose-blue max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words text-base">
                    {story.content}
                  </p>
                </div>

                {/* AI Tags */}
                {story.tags && story.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                    {story.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="bg-blue-50 border-blue-200 text-blue-600 text-xs">
                        #{tag.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Topic Badge */}
                <div className="flex justify-center pt-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${topicGradients[safeTopic]} text-white shadow-md`}>
                    {topicLabels[safeTopic]}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}