import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/client';
import { Camera, Loader2, CheckCircle2, AlertCircle, Upload, Pen } from 'lucide-react';
import StoryFilters from '@/components/story/StoryFilters';
import StoryCard from '@/components/story/StoryCard';
import FeaturedStories from '@/components/story/FeaturedStories';
import StoryInsights from '@/components/story/StoryInsights';
import StorySearchFilters from '@/components/story/StorySearchFilters';
import BackgroundElements from '@/components/BackgroundElements';
import { createLocalStory, listLocalStories, listSupabaseStories, mergeStories, updateLocalStoryLikes, updateSupabaseStoryLikes } from '@/lib/localStories';

export default function StoryProject() {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [likedStories, setLikedStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadMode, setUploadMode] = useState(null); // 'photo' or null
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Load stories
  useEffect(() => {
    const loadStories = async () => {
      const localStories = listLocalStories();

      const [supabaseStories, base44Stories] = await Promise.all([
        listSupabaseStories(),
        base44.entities.Story.filter({ status: 'approved' }, '-created_date').catch((error) => {
          console.error('Failed to load Base44 stories:', error);
          return [];
        })
      ]);

      const remoteStories = [...supabaseStories, ...base44Stories];
      const allStories = mergeStories(remoteStories, localStories);
      setStories(allStories);
      setFilteredStories(allStories);
      setIsLoading(false);
    };
    loadStories();
  }, []);

  const reloadStories = async () => {
    const localStories = listLocalStories();
    const [supabaseStories, base44Stories] = await Promise.all([
      listSupabaseStories(),
      base44.entities.Story.filter({ status: 'approved' }, '-created_date').catch(() => [])
    ]);
    const allStories = mergeStories([...supabaseStories, ...base44Stories], localStories);
    setStories(allStories);
    setFilteredStories(allStories);
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadError('');
      
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle photo upload
  const handlePhotoSubmit = async () => {
    if (!selectedFile) {
      setUploadError('Please select an image');
      return;
    }

    setIsAnalyzing(true);
    setUploadError('');

    try {
      await createLocalStory({
        title: `Photo Story - ${new Date().toLocaleDateString()}`,
        author_name: 'Anonymous',
        content: 'Story shared via uploaded photo. Text extraction is not enabled in this mode yet.',
        topic: 'family_pressures',
        mediaFiles: [selectedFile]
      });

      setUploadSuccess(true);
      await reloadStories();

      setTimeout(() => {
        setUploadMode(null);
        setUploadSuccess(false);
        setSelectedFile(null);
        setPreview(null);
      }, 1500);
    } catch (err) {
      console.error('Photo upload error:', err);
      setUploadError('Failed to process image. Please try again with a clear photo of your story.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle like
  const handleLike = useCallback(async (storyId) => {
    const sessionId = localStorage.getItem('userSessionId') || Math.random().toString(36);
    if (!localStorage.getItem('userSessionId')) {
      localStorage.setItem('userSessionId', sessionId);
    }

    try {
      const story = stories.find((s) => s.id === storyId);
      if (!story) return;

      if (likedStories.includes(storyId)) {
        // Unlike
        const newLikes = Math.max(0, story.likes - 1);
        setLikedStories((prev) => prev.filter((id) => id !== storyId));
        
        // Update local state immediately
        setStories((prev) => prev.map((s) => s.id === storyId ? { ...s, likes: newLikes } : s));
        setFilteredStories((prev) => prev.map((s) => s.id === storyId ? { ...s, likes: newLikes } : s));
        
        // Persist like update
        updateLocalStoryLikes(storyId, newLikes);
        await updateSupabaseStoryLikes(storyId, newLikes);
        try {
          await base44.entities.Story.update(storyId, { likes: newLikes });
        } catch (error) {
          console.error('Failed to update backend like:', error);
        }
      } else {
        // Like
        const newLikes = story.likes + 1;
        setLikedStories((prev) => [...prev, storyId]);
        
        // Update local state immediately
        setStories((prev) => prev.map((s) => s.id === storyId ? { ...s, likes: newLikes } : s));
        setFilteredStories((prev) => prev.map((s) => s.id === storyId ? { ...s, likes: newLikes } : s));
        
        // Persist like update
        updateLocalStoryLikes(storyId, newLikes);
        await updateSupabaseStoryLikes(storyId, newLikes);
        try {
          await base44.entities.Story.update(storyId, { likes: newLikes });
        } catch (error) {
          console.error('Failed to update backend like:', error);
        }
      }
    } catch (error) {
      console.error('Failed to update like:', error);
    }
  }, [likedStories, stories]);

  const topicFilteredStories = selectedTopic ?
  filteredStories.filter((s) => s.topic === selectedTopic) :
  filteredStories;

  const featuredStories = stories.filter((s) => s.featured).slice(0, 2);
  const allOtherStories = topicFilteredStories.filter((s) => !s.featured);

  const topicCounts = stories.reduce((acc, story) => {
    const topic = story.topic || 'N/A';
    acc[topic] = (acc[topic] || 0) + 1;
    return acc;
  }, {});
  
  const topTopicEntry = Object.entries(topicCounts).sort(([, a], [, b]) => b - a)[0];
  
  const stats = {
    total: stories.length,
    topTopic: topTopicEntry ? topTopicEntry[0] : 'N/A',
    totalLikes: stories.reduce((sum, story) => sum + Number(story.likes || 0), 0),
    totalComments: stories.reduce((sum, story) => sum + Number(story.comments_count || 0), 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-white relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0 opacity-70"
        style={{
          backgroundColor: '#b7d7ef',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='120' viewBox='0 0 240 120'%3E%3Crect width='240' height='120' fill='%23b7d7ef'/%3E%3Crect x='4' y='4' width='112' height='52' rx='2' fill='%23f5f5f7'/%3E%3Crect x='124' y='4' width='112' height='52' rx='2' fill='%23f5f5f7'/%3E%3Crect x='-56' y='64' width='112' height='52' rx='2' fill='%23f5f5f7'/%3E%3Crect x='64' y='64' width='112' height='52' rx='2' fill='%23f5f5f7'/%3E%3Crect x='184' y='64' width='112' height='52' rx='2' fill='%23f5f5f7'/%3E%3C/svg%3E")`,
          backgroundSize: '240px 120px',
          backgroundRepeat: 'repeat'
        }}
      />
      <BackgroundElements />
      {/* Hero Section - ENHANCED */}
      <section className="relative pt-32 pb-28 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8">
              <span className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white text-base font-bold shadow-2xl border-2 border-blue-400">
                Community Story Wall
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-black text-gray-900 leading-[1.05] mb-10 tracking-tight">
              Your Voice,{' '}
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Your Story
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 text-2xl text-gray-800 leading-relaxed max-w-4xl mx-auto font-semibold">
              A vibrant space where Asian teens share authentic experiences with cultural identity, academic pressures, and family dynamics. Every story matters. Every voice counts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 flex flex-wrap gap-10 justify-center text-center">
              {[
                { num: '200+', label: 'Stories Shared', color: 'from-blue-600 to-blue-500' },
                { num: '100%', label: 'Anonymous & Safe', color: 'from-blue-700 to-blue-600' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  className={`px-10 py-6 rounded-3xl bg-gradient-to-br ${stat.color} border-2 border-blue-400 shadow-2xl`}>
                  <div className="text-5xl font-black text-white">{stat.num}</div>
                  <div className="text-base text-white/90 mt-2 font-bold">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Share Your Experience Section - ENHANCED */}
      <section className="relative py-28 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto relative z-10">
          {uploadMode === 'photo' ? (
            /* Photo Upload Form */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-blue-200 rounded-2xl p-8 shadow-lg">
              
              {uploadSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Story Added!</h3>
                  <p className="text-gray-300">Your story has been captured and shared with the community.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Upload Story Photo</h2>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setUploadMode(null);
                        setSelectedFile(null);
                        setPreview(null);
                        setUploadError('');
                      }}
                      className="text-gray-900">
                      Cancel
                    </Button>
                  </div>

                  {uploadError && (
                    <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl mb-6">
                      <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                      <p className="text-red-300 text-sm">{uploadError}</p>
                    </div>
                  )}

                  {preview && (
                    <div className="mb-6">
                      <img src={preview} alt="Preview" className="w-full rounded-lg max-h-64 object-cover border border-cyan-500/30" />
                    </div>
                  )}

                  <label className="block mb-6">
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/heic,image/heif,image/webp"
                      capture="environment"
                      onChange={handleFileSelect}
                      className="hidden"
                      disabled={isAnalyzing}
                    />
                    <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                      <Camera className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                      <p className="text-gray-900 font-medium">
                        {selectedFile ? selectedFile.name : 'Take a photo or upload'}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">Tap to capture or choose from gallery</p>
                    </div>
                  </label>

                  <Button
                    onClick={handlePhotoSubmit}
                    disabled={!selectedFile || isAnalyzing}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-full py-3 font-semibold">
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading Story...
                      </>
                    ) : (
                      'Add Story'
                    )}
                  </Button>

                  <p className="text-xs text-gray-600 mt-4 text-center">
                    Your photo will be posted as a story card. You can add full text using Write Story Online.
                  </p>
                </>
              )}
            </motion.div>
          ) : (
            /* Share Options - DRAMATICALLY ENHANCED */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-blue-400">
              
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-gray-900" />
              
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-10 right-10 w-52 h-52 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
              
              <div className="relative z-10 p-12 lg:p-20 text-center">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="mb-8">
                  <span className="inline-block px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white font-bold text-sm">
                    ✨ Share Your Experience
                  </span>
                </motion.div>
                
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl lg:text-7xl font-black text-white mb-8 leading-tight">
                  Your Story Matters
                </motion.h2>
                
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl text-white font-semibold leading-relaxed mb-12 max-w-3xl mx-auto">
                  Be heard. Be seen. Be part of something bigger. Share your experience and help others feel less alone.
                </motion.p>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button
                    onClick={() => setUploadMode('photo')}
                    className="bg-white text-blue-600 hover:bg-blue-50 font-black rounded-full px-12 py-8 text-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.5)] hover:scale-105 transition-all duration-300">
                    <Camera className="w-6 h-6 mr-3" />
                    Upload Photo Story
                  </Button>
                  <Link to={createPageUrl('StorySharing')}>
                    <Button className="bg-white/10 hover:bg-white/20 text-white border-4 border-white font-black rounded-full px-12 py-8 text-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.5)] hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                      <Pen className="w-6 h-6 mr-3" />
                      Write Story Online
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Community Story Wall Section - ENHANCED */}
      <section className="relative py-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Insights */}
          <StoryInsights stats={stats} />

          {/* Featured Stories */}
          {featuredStories.length > 0 &&
          <FeaturedStories
            stories={featuredStories}
            onLike={handleLike}
            likedStories={likedStories} />

          }

          {/* Filters and All Stories */}
           <div>
             <motion.h2
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="text-5xl lg:text-6xl font-black text-black mb-12">
               Explore <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Stories</span>
             </motion.h2>
            
            <StorySearchFilters stories={stories} onFiltersChange={setFilteredStories} />
            <StoryFilters selectedTopic={selectedTopic} onTopicChange={setSelectedTopic} />

            {isLoading ?
            <div className="text-center py-12">
                <p className="text-black font-semibold">Loading stories...</p>
              </div> :
            allOtherStories.length > 0 ?
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {allOtherStories.map((story) =>
              <StoryCard
                key={story.id}
                story={story}
                onLike={handleLike}
                isLiked={likedStories.includes(story.id)} />

              )}
              </div> :

            <div className="text-center py-12">
                <p className="text-black font-semibold">Your story project submissions will be showcased here in our story wall! Story Project launching January 20th!</p>
              </div>
            }
          </div>


          </div>
          </section>

          </div>);

          }
