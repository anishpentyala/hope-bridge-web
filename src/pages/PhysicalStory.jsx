import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Loader2, CheckCircle2, AlertCircle, Sparkles, Heart, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
export default function PhysicalStory() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError('');
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Please select an image');
      return;
    }
    setIsAnalyzing(true);
    setError('');
    // Simulate processing delay then succeed
    await new Promise((r) => setTimeout(r, 1500));
    setIsAnalyzing(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6 pt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-6 border-2 border-cyan-500/50">
            <CheckCircle2 className="w-10 h-10 text-cyan-400" />
          </div>
          <h2 className="text-3xl font-semibold text-white mb-4">Story Added!</h2>
          <p className="text-gray-300 mb-8">
            Your physical story has been captured and added to our community wall.
          </p>
          <Button
            onClick={() => {
              setIsSuccess(false);
              setSelectedFile(null);
              setPreview(null);
            }}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-semibold rounded-full shadow-[0_0_30px_rgba(0,217,255,0.5)]">
            Upload Another Story
          </Button>
        </motion.div>
      </div>
    );
    }

  const stats = [
    { icon: Users, label: 'Stories Shared', value: '200+', color: 'from-blue-500 to-cyan-400' },
    { icon: Heart, label: 'Community Likes', value: '1000+', color: 'from-pink-500 to-blue-400' },
    { icon: Sparkles, label: 'Voices Heard', value: '500', color: 'from-purple-500 to-blue-400' },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-40">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,217,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-6xl mb-6 inline-block">
              📸
            </motion.div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight px-4">
              Turn Your{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Story Into Reality
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8 px-4 font-light">
              Capture your handwritten or printed story in a photo. Our AI instantly reads it and shares it with thousands of voices in our community.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-10 max-w-2xl mx-auto px-4">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`bg-gradient-to-br ${stat.color} p-0.5 rounded-lg`}>
                    <div className="bg-black/80 rounded-md p-2 sm:p-4">
                      <Icon className="w-4 h-4 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-blue-300" />
                      <p className="text-lg sm:text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-1">{stat.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-20 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-white mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { num: '1', title: 'Write Your Story', desc: 'Pen down your thoughts on paper', icon: '✍️' },
              { num: '2', title: 'Take a Photo', desc: 'Capture it with your camera', icon: '📷' },
              { num: '3', title: 'AI Reads It', desc: 'We extract the text instantly', icon: '🤖' },
              { num: '4', title: 'Share to World', desc: 'Join thousands in our community', icon: '🌍' },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative">
                <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/30 rounded-xl p-4 sm:p-6 h-full backdrop-blur-sm hover:border-blue-400/60 transition">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{step.icon}</div>
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-base sm:text-lg">
                    {step.num}
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <div className="text-2xl text-blue-500">→</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="relative py-24 px-6 lg:px-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-slate-900/50 to-blue-900/30 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/20 shadow-[0_0_50px_rgba(0,217,255,0.1)]">

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl mb-6 backdrop-blur-sm">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-red-300 text-sm">{error}</p>
            </motion.div>
          )}

          <h2 className="text-2xl font-bold text-white mb-6">Upload Story Photo</h2>

          {/* Image Preview */}
          {preview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6">
              <img src={preview} alt="Preview" className="w-full rounded-lg max-h-64 object-cover border border-cyan-500/30" />
            </motion.div>
          )}

          {/* File Input */}
          <label className="block mb-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isAnalyzing}
            />
            <div className="border-2 border-dashed border-cyan-500/30 rounded-xl p-8 text-center cursor-pointer hover:border-cyan-400/60 hover:bg-cyan-500/5 transition-all active:scale-95 backdrop-blur-sm">
              <Camera className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
              <p className="text-white font-medium">
                {selectedFile ? selectedFile.name : 'Take a photo or upload'}
              </p>
              <p className="text-sm text-gray-400 mt-1">Tap to capture or choose from gallery</p>
            </div>
          </label>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!selectedFile || isAnalyzing}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 text-black rounded-full py-3 font-semibold shadow-[0_0_30px_rgba(0,217,255,0.5)] hover:shadow-[0_0_40px_rgba(0,217,255,0.8)] transition-all">
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Image...
              </>
            ) : (
              'Add Story'
            )}
          </Button>

          <p className="text-xs text-gray-400 mt-4 text-center">
            The AI will automatically extract the story text from your photo and add it to our community wall.
          </p>
        </motion.div>
      </section>

      {/* Info Section */}
      <section className="relative py-24 px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-black">
        <div className="max-w-5xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-4 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Pro Tips for Perfect Captures
            </span>
          </motion.h3>
          <p className="text-center text-gray-400 mb-12 text-lg">Maximize AI accuracy with these simple guidelines</p>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-xl p-5 sm:p-8 border border-blue-500/30 hover:border-blue-400/60 transition">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">📝</div>
              <h4 className="text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3">Clear, Legible Text</h4>
              <p className="text-gray-300 text-sm sm:text-base">Use dark ink on light paper. Avoid cursive if possible. Make sure handwriting is clear and spaced out for perfect recognition.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-xl p-5 sm:p-8 border border-blue-500/30 hover:border-blue-400/60 transition">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">💡</div>
              <h4 className="text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3">Excellent Lighting</h4>
              <p className="text-gray-300 text-sm sm:text-base">Natural daylight is best. Avoid shadows and glare. Use a bright room or well-lit outdoor area for optimal photo quality.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-xl p-5 sm:p-8 border border-blue-500/30 hover:border-blue-400/60 transition">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">📐</div>
              <h4 className="text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3">Straight Alignment</h4>
              <p className="text-gray-300 text-sm sm:text-base">Hold the camera perpendicular to the paper. Avoid tilted or angled shots. Keep the entire page in frame and centered.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-xl p-5 sm:p-8 border border-blue-500/30 hover:border-blue-400/60 transition">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">📄</div>
              <h4 className="text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3">Complete Story</h4>
              <p className="text-gray-300 text-sm sm:text-base">Capture the full narrative in one or multiple clear photos. Include all pages if multi-page. Check before uploading.</p>
            </motion.div>
          </div>

          {/* Why Physical Stories Matter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-6 sm:p-12 text-center shadow-[0_0_50px_rgba(0,217,255,0.3)]">
            <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-black mx-auto mb-4" />
            <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4">Why Share Your Physical Story?</h3>
            <p className="text-black/90 text-base sm:text-lg leading-relaxed font-medium">
              Physical stories carry authenticity. When you write by hand, your voice becomes real. Our community values the genuine human connection in your words — the crossed-out passages, the emotional underlines, the real ink on real paper. By sharing your physical story, you're not just adding text to a wall; you're creating a bridge between hearts.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}