import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import StoryCard from './StoryCard';

export default function FeaturedStories({ stories, onLike, likedStories, onCommentAdded }) {
  return (
    <div className="mb-20">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-10">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
          <Sparkles className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
        </motion.div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          Featured Stories
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}>
            <StoryCard
              story={story}
              onLike={onLike}
              isLiked={likedStories.includes(story.id)}
              onCommentAdded={onCommentAdded} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}