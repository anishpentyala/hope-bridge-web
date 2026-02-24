import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, Heart, Loader2, CheckCircle2, AlertCircle, Image, Volume2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { base44 } from '@/api/client';
import BackgroundElements from '@/components/BackgroundElements';
import { createLocalStory } from '@/lib/localStories';
import { moderateStoryText } from '@/lib/contentModeration';

const topics = [
{
  value: 'family_pressures',
  label: 'Disconnect Between Teens & Families',
  icon: Heart,
  description: 'Share your experiences with family dynamics and healing relationships'
},
{
  value: 'academic_stress',
  label: 'Academic Pressure & Success',
  icon: BookOpen,
  description: 'Reflect on academic stress, peer and school pressures, and redefining success beyond grades'
},
{
  value: 'cultural_identity',
  label: 'Embracing Cultural Identity',
  icon: Lightbulb,
  description: 'Explore your cultural roots and identity journey'
}];


export default function StorySubmitForm() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    topic: ''
  });
  const [mediaFiles, setMediaFiles] = useState([]);
  const [audioFile, setAudioFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setFormData({ ...formData, topic: topic.value });
  };

  const handleMediaSelect = (e) => {
    const files = Array.from(e.target.files || []);
    setMediaFiles((prev) => [...prev, ...files]);
  };

  const handleAudioSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const removeMedia = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.content.trim() || !formData.topic) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.content.length < 50) {
      setError('Story must be at least 50 characters');
      return;
    }

    const moderation = moderateStoryText({
      title: formData.title,
      content: formData.content
    });

    if (!moderation.isClean) {
      setError(moderation.reason);
      return;
    }

    setIsSubmitting(true);
    try {
      const hasMedia = mediaFiles.length > 0 || Boolean(audioFile);

      const payload = {
        ...formData,
        title: formData.title.trim(),
        author_name: 'Anonymous',
        content: formData.content.trim(),
        media_urls: [],
        audio_url: null
      };

      let response;
      if (hasMedia) {
        const multipartFormData = new FormData();
        multipartFormData.append('title', payload.title);
        multipartFormData.append('author_name', payload.author_name);
        multipartFormData.append('content', payload.content);
        multipartFormData.append('topic', payload.topic);

        mediaFiles.forEach((file) => {
          multipartFormData.append('media', file);
        });

        if (audioFile) {
          multipartFormData.append('audio', audioFile);
        }

        try {
          response = await base44.request('/functions/submitStoryWithMedia', {
            method: 'POST',
            body: multipartFormData
          });
        } catch {
          try {
            response = await base44.request('/stories/submit-with-media', {
              method: 'POST',
              body: multipartFormData
            });
          } catch {
            const story = await createLocalStory({
              title: payload.title,
              author_name: payload.author_name,
              content: payload.content,
              topic: payload.topic,
              mediaFiles,
              audioFile
            });
            response = { success: true, story };
          }
        }
      } else {
        try {
          response = await base44.functions.invoke('submitStory', payload);
        } catch {
          try {
            response = await base44.request('/stories/submit', {
              method: 'POST',
              body: payload
            });
          } catch {
            const story = await createLocalStory({
              title: payload.title,
              author_name: payload.author_name,
              content: payload.content,
              topic: payload.topic
            });
            response = { success: true, story };
          }
        }
      }

      if (!response?.story && response?.success !== true) {
        throw new Error('Unexpected response from story submission endpoint.');
      }

      setIsSuccess(true);
    } catch (err) {
      const backendError = err?.data?.error || err?.data?.message || err?.message;
      setError(backendError || 'Failed to submit story. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-white flex items-center justify-center px-6 relative overflow-hidden">
        <BackgroundElements />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md">

          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Thank you for sharing!</h2>
          <p className="text-gray-600 mb-8">
            Your story has been submitted for review. It will appear on the Story Wall once approved.
          </p>
          <Button
            onClick={() => {
              setIsSuccess(false);
              setFormData({ title: '', content: '', topic: '' });
              setSelectedTopic(null);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">

            Submit Another Story
          </Button>
        </motion.div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-white relative overflow-hidden">
      <BackgroundElements />
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 lg:px-8 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 tracking-tight mt-4">
              Share Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Story
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Choose a topic that resonates with you and share your experience with our community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Topic Selection & Form */}
      <section className="relative py-24 px-6 lg:px-8 max-w-4xl mx-auto">
        {!selectedTopic ?
        // Topic Selection
        <div className="space-y-6">
            {topics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <motion.button
                key={topic.value}
                onClick={() => handleTopicSelect(topic)}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="w-full text-left p-8 lg:p-10 rounded-2xl bg-white border border-blue-200 hover:border-blue-400 transition-all shadow-lg hover:shadow-xl group">

                  <div className="flex items-start gap-6">
                    <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-md">

                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="min-w-0">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors break-words">
                        {topic.label}
                      </h3>
                      <p className="text-gray-600 text-base lg:text-lg leading-relaxed break-words">{topic.description}</p>
                    </div>
                  </div>
                </motion.button>);

          })}
          </div> :

        // Story Form
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}>

            <button
            onClick={() => setSelectedTopic(null)}
            className="text-blue-600 hover:text-blue-700 text-sm mb-6 transition-colors">

              ← Back to topics
            </button>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-200">
              {error &&
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-6">

                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </motion.div>
            }

              <h2 className="text-2xl font-bold text-gray-900 mb-6 break-words">{selectedTopic.label}</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                









                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Story Title *</label>
                  <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Give your story a title"
                  className="rounded-xl border-blue-200 text-gray-900" />

                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Your Name (or Anonymous) *</label>
                  <Input
                  value={formData.author_name}
                  onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                  placeholder="How should we display your name?"
                  className="rounded-xl border-blue-200 text-gray-900" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Your Story *</label>
                  <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Share your experience... (minimum 50 characters)"
                  rows={8}
                  className="rounded-xl border-blue-200 resize-none text-gray-900" />

                  <p className="text-xs text-gray-500 mt-2">{formData.content.length} characters</p>
                </div>

                {/* Media Uploads */}
                <div className="space-y-4 border-t pt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">Add Images (Optional)</label>
                    <label className="block">
                      <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleMediaSelect}
                      className="hidden" />

                      <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
                        <Image className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to add images</p>
                      </div>
                    </label>
                    {mediaFiles.length > 0 &&
                  <div className="flex flex-wrap gap-2 mt-3">
                        {mediaFiles.map((file, idx) =>
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="relative bg-blue-50 rounded px-3 py-1 text-xs text-gray-700 flex items-center gap-2">
                            {file.name}
                            <button
                        type="button"
                        onClick={() => removeMedia(idx)}
                        className="text-gray-500 hover:text-red-500">
                              <X className="w-3 h-3" />
                            </button>
                          </motion.div>
                    )}
                      </div>
                  }
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">Add Audio (Optional)</label>
                    <label className="block">
                      <input
                      type="file"
                      accept="audio/*"
                      onChange={handleAudioSelect}
                      className="hidden" />

                      <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
                        <Volume2 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to add audio</p>
                      </div>
                    </label>
                    {audioFile &&
                  <div className="bg-blue-50 rounded px-3 py-2 text-sm text-gray-700 mt-2 flex items-center justify-between">
                        {audioFile.name}
                        <button
                      type="button"
                      onClick={() => setAudioFile(null)}
                      className="text-gray-500 hover:text-red-500">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                  }
                  </div>
                </div>

                <div className="flex gap-3 border-t pt-6">
                  <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedTopic(null)}
                  className="rounded-full flex-1">

                    Back
                  </Button>
                  <Button
                  type="submit"
                  disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-full flex-1">

                    {isSubmitting ?
                  <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </> :

                  'Submit Story'
                  }
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        }
      </section>

      {/* Bottom Info */}
      {!selectedTopic &&
      <section className="relative py-20 px-6 lg:px-8 text-center bg-gray-50">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-2xl text-gray-900 font-semibold mb-2">Your story matters</p>
            <p className="text-gray-600 text-lg">Thank you for contributing to our community</p>
          </motion.div>
        </section>
      }
    </div>);

}
