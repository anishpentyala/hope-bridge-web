import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Users, Calendar, BookOpen, Loader2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import PageBackground from '../components/PageBackground';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgolbkbp';

const roles = [
  { icon: Users,    label: 'Peer Mentor',         desc: 'Support fellow teens through 1-on-1 conversations and group sessions',      accent: 'from-blue-500 to-indigo-500',   ring: 'border-blue-400',   bg: 'bg-blue-50' },
  { icon: Calendar, label: 'Event Helper',         desc: 'Help plan and run workshops, community events, and outreach activities',     accent: 'from-cyan-500 to-blue-500',     ring: 'border-cyan-400',   bg: 'bg-cyan-50' },
  { icon: BookOpen, label: 'Workshop Facilitator', desc: 'Lead or co-lead workshops on stress, identity, and wellness topics',         accent: 'from-indigo-500 to-purple-500', ring: 'border-indigo-400', bg: 'bg-indigo-50' },
  { icon: Heart,    label: 'Content & Outreach',   desc: 'Help with social media, writing, design, or community outreach',             accent: 'from-pink-500 to-rose-500',     ring: 'border-pink-400',   bg: 'bg-pink-50' },
];

export default function Volunteer() {
  const [formData, setFormData] = useState({
    name: '', email: '', age: '', school: '', role: '', availability: '', why: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Valid email is required';
    if (!formData.age) e.age = 'Please select your age range';
    if (!formData.role) e.role = 'Please select a role';
    if (!formData.why.trim() || formData.why.trim().length < 20) e.why = 'Please tell us why you want to volunteer (at least 20 characters)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setSubmitError('');
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append('_subject', `HopeBridge Volunteer Application: ${formData.name}`);
      Object.entries(formData).forEach(([k, v]) => payload.append(k, v));
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST', headers: { Accept: 'application/json' }, body: payload
      });
      if (!res.ok) throw new Error('Submission failed');
      setIsSuccess(true);
    } catch {
      setSubmitError('Something went wrong. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white flex items-center justify-center px-6 relative overflow-hidden">
        <PageBackground />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md relative z-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Received!</h2>
          <p className="text-gray-600 mb-2">Thank you for wanting to volunteer with HopeBridge.</p>
          <p className="text-gray-500 text-sm">We will review your application and get back to you within 3-5 business days with next steps.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/30 to-white relative overflow-hidden">
      <PageBackground />

      {/* Hero */}
      <section className="pt-16 pb-14 px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Volunteer with us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-4">
              Make a real{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">difference</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Join a team of passionate students working to break the stigma around mental health in
              Asian American communities. No experience needed — just empathy and commitment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Role selector */}
      <section className="pb-10 px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-500 text-sm font-medium mb-6 uppercase tracking-wider">Choose a role</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {roles.map((r, i) => {
              const selected = formData.role === r.label;
              return (
                <motion.div
                  key={r.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => { setFormData(prev => ({ ...prev, role: r.label })); setErrors(prev => { const e = {...prev}; delete e.role; return e; }); }}
                  className={`relative rounded-2xl border-2 cursor-pointer transition-all duration-300 overflow-hidden ${
                    selected
                      ? `${r.ring} shadow-lg shadow-blue-100 scale-[1.01]`
                      : 'border-blue-100 bg-white/70 hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  {/* Gradient top bar */}
                  <div className={`h-1 bg-gradient-to-r ${r.accent}`} />
                  <div className={`p-5 ${selected ? r.bg : 'bg-white/70'} backdrop-blur-sm`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${r.accent} shadow-sm`}>
                        <r.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className={`font-bold text-sm mb-1 ${selected ? 'text-gray-900' : 'text-gray-800'}`}>{r.label}</h3>
                        <p className="text-gray-500 text-xs leading-relaxed">{r.desc}</p>
                      </div>
                      {selected && (
                        <div className="ml-auto flex-shrink-0">
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${r.accent} flex items-center justify-center`}>
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          {errors.role && <p className="text-red-600 text-xs flex items-center gap-1 mt-3"><AlertCircle className="w-3 h-3" />{errors.role}</p>}
        </div>
      </section>

      {/* Application form */}
      <section className="pb-20 px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-blue-100/40 border border-blue-100 space-y-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-sm">
                <Users className="w-4.5 h-4.5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Your Information</h2>
            </div>

            {submitError && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-red-700 text-sm">{submitError}</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vol-name">Full Name *</Label>
                <Input id="vol-name" value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} className={`mt-1.5 rounded-lg text-black ${errors.name ? 'border-red-500' : 'border-blue-100 focus:border-blue-400'}`} placeholder="Your name" />
                {errors.name && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="vol-email">Email *</Label>
                <Input id="vol-email" type="email" value={formData.email} onChange={e => setFormData(p => ({...p, email: e.target.value}))} className={`mt-1.5 rounded-lg text-black ${errors.email ? 'border-red-500' : 'border-blue-100 focus:border-blue-400'}`} placeholder="you@email.com" />
                {errors.email && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Age Range *</Label>
                <Select value={formData.age} onValueChange={v => setFormData(p => ({...p, age: v}))}>
                  <SelectTrigger className={`mt-1.5 rounded-lg text-black ${errors.age ? 'border-red-500' : 'border-blue-100'}`}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-black">
                    <SelectItem value="14-15">14-15</SelectItem>
                    <SelectItem value="16-17">16-17</SelectItem>
                    <SelectItem value="18+">18+</SelectItem>
                  </SelectContent>
                </Select>
                {errors.age && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.age}</p>}
              </div>
              <div>
                <Label htmlFor="vol-school">School (optional)</Label>
                <Input id="vol-school" value={formData.school} onChange={e => setFormData(p => ({...p, school: e.target.value}))} className="mt-1.5 rounded-lg border-blue-100 text-black" placeholder="e.g., Eastlake High School" />
              </div>
            </div>

            <div>
              <Label htmlFor="vol-avail">Availability (optional)</Label>
              <Input id="vol-avail" value={formData.availability} onChange={e => setFormData(p => ({...p, availability: e.target.value}))} className="mt-1.5 rounded-lg border-blue-100 text-black" placeholder="e.g., Weekends, 2-3 hours/week" />
            </div>

            <div>
              <Label htmlFor="vol-why">Why do you want to volunteer with HopeBridge? *</Label>
              <Textarea id="vol-why" rows={4} maxLength={500} value={formData.why} onChange={e => setFormData(p => ({...p, why: e.target.value}))} className={`mt-1.5 rounded-lg resize-none text-black ${errors.why ? 'border-red-500' : 'border-blue-100 focus:border-blue-400'}`} placeholder="Tell us what draws you to this work and what you hope to contribute..." />
              <div className="flex items-center justify-between mt-1">
                {errors.why && <p className="text-red-600 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.why}</p>}
                <span className="text-xs text-gray-400 ml-auto">{formData.why.length}/500</span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white rounded-xl py-5 text-base font-bold shadow-md shadow-blue-200 hover:shadow-lg transition-all duration-200"
            >
              {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting...</> : 'Submit Application'}
            </Button>

            <p className="text-xs text-gray-400 text-center">
              By submitting, you agree to our <a href="/PrivacyPolicy" className="underline hover:text-blue-600 transition-colors">Privacy Policy</a>. We will only use your information to process your volunteer application.
            </p>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
