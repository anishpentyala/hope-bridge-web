import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MapPin, Phone, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
// NOTE: BackgroundElements removed — it was causing severe lag (animated blobs with blur-[80-90px])

const MAX_MESSAGE_LENGTH = 1000;
const MAX_NAME_LENGTH = 100;
const MAX_ORG_LENGTH = 150;
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mkgbbjkb';

const buildFormspreePayload = (data) => {
  const payload = new FormData();
  payload.append('name', data.name);
  payload.append('email', data.email);
  payload.append('type', data.type);
  payload.append('organization', data.organization || '');
  payload.append('message', data.message);
  payload.append('_subject', `HopeBridge contact from ${data.name}`);
  return payload;
};

const submitViaNativeForm = (data) => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = FORMSPREE_ENDPOINT;
  form.style.display = 'none';
  const entries = {
    name: data.name, email: data.email, type: data.type,
    organization: data.organization || '', message: data.message,
    _subject: `HopeBridge contact from ${data.name}`,
  };
  Object.entries(entries).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden'; input.name = key; input.value = String(value ?? '');
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', type: '', organization: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    switch (name) {
      case 'name':
        if (!value.trim()) newErrors.name = 'Name is required';
        else if (value.length < 2) newErrors.name = 'Name must be at least 2 characters';
        else delete newErrors.name;
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) newErrors.email = 'Email is required';
        else if (!emailRegex.test(value)) newErrors.email = 'Please enter a valid email address';
        else delete newErrors.email;
        break;
      case 'type':
        if (!value) newErrors.type = 'Please select a category';
        else delete newErrors.type;
        break;
      case 'message':
        if (!value.trim()) newErrors.message = 'Message is required';
        else if (value.length < 10) newErrors.message = 'Message must be at least 10 characters';
        else delete newErrors.message;
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (touched[field]) validateField(field, value);
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field, formData[field]);
  };

  const submitToFormspree = async (data) => {
    const payload = buildFormspreePayload(data);
    const response = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: payload });
    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      const details = errorBody?.errors?.map((e) => e.message).join(', ') || 'Unable to submit form.';
      throw new Error(details);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    const isNameValid = validateField('name', formData.name);
    const isEmailValid = validateField('email', formData.email);
    const isTypeValid = validateField('type', formData.type);
    const isMessageValid = validateField('message', formData.message);
    if (!isNameValid || !isEmailValid || !isTypeValid || !isMessageValid) return;
    setIsSubmitting(true);
    try {
      await submitToFormspree(formData);
      setIsSuccess(true);
      setFormData({ name: '', email: '', type: '', organization: '', message: '' });
      setTouched({});
    } catch (error) {
      try {
        submitViaNativeForm(formData);
        return;
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
      }
      setSubmitError('Failed to send. Please email hopebridgecommunityservices@gmail.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank you for reaching out!</h2>
          <p className="text-gray-600 mb-8">We'll get back to you within 24–48 hours.</p>
          <Button onClick={() => setIsSuccess(false)} className="rounded-full bg-blue-600 hover:bg-blue-700 text-white">
            Send Another Message
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 relative overflow-hidden">
      {/* Lightweight static background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-blue-100/50 rounded-full blur-2xl" />
        <div className="absolute top-1/2 -right-16 w-64 h-64 bg-blue-200/30 rounded-full blur-2xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #3B82F6 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
      </div>

      {/* ── HERO ── */}
      <section className="pt-16 pb-16 px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-sm font-semibold mb-6">
              <Mail className="w-4 h-4" />
              We'd love to hear from you
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
              Let's{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">connect</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Whether you're seeking support, want to partner with us, or have questions about
              our programs — we'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="py-16 px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-10 shadow-2xl border border-blue-100"
          >
            {submitError && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-6">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-red-700 text-sm">{submitError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <Label htmlFor="name">Name *</Label>
                    <span className="text-xs text-gray-400">{formData.name.length}/{MAX_NAME_LENGTH}</span>
                  </div>
                  <Input
                    id="name"
                    maxLength={MAX_NAME_LENGTH}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    className={`mt-2 rounded-xl text-black ${errors.name && touched.name ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="Your full name"
                  />
                  {errors.name && touched.name && (
                    <p className="text-red-600 text-xs mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`mt-2 rounded-xl text-black ${errors.email && touched.email ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-600 text-xs mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="type">I am a... *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger className={`mt-2 rounded-xl text-black ${errors.type && touched.type ? 'border-red-500' : 'border-gray-200'}`}>
                      <SelectValue placeholder="Select one" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-black">
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="school">School Representative</SelectItem>
                      <SelectItem value="donor">Potential Donor/Partner</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && touched.type && (
                    <p className="text-red-600 text-xs mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.type}</p>
                  )}
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <Label htmlFor="organization">School/Organization (optional)</Label>
                    <span className="text-xs text-gray-400">{formData.organization.length}/{MAX_ORG_LENGTH}</span>
                  </div>
                  <Input
                    id="organization"
                    maxLength={MAX_ORG_LENGTH}
                    value={formData.organization}
                    onChange={(e) => handleInputChange('organization', e.target.value)}
                    className="mt-2 rounded-xl border-gray-200 text-black"
                    placeholder="e.g., Eastlake High School"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <Label htmlFor="message">Message *</Label>
                  <span className={`text-xs ${formData.message.length > MAX_MESSAGE_LENGTH * 0.9 ? 'text-orange-600' : 'text-gray-400'}`}>
                    {formData.message.length}/{MAX_MESSAGE_LENGTH}
                  </span>
                </div>
                <Textarea
                  id="message"
                  maxLength={MAX_MESSAGE_LENGTH}
                  rows={6}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  className={`mt-2 rounded-xl resize-none text-black ${errors.message && touched.message ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="Tell us how we can help..."
                />
                {errors.message && touched.message && (
                  <p className="text-red-600 text-xs mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || Object.keys(errors).length > 0}
                className="glow-hover w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl py-6 text-lg font-bold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Sending...</>
                ) : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT INFO ── */}
      <section className="py-20 px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-gray-900 text-center mb-12"
          >
            Get in <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Touch</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Mail,   title: 'Email Us',  content: 'hopebridgecommunityservices@gmail.com', href: 'mailto:hopebridgecommunityservices@gmail.com', bg: 'bg-blue-50', border: 'border-blue-200', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
              { icon: Phone,  title: 'Call Us',   content: '425-610-7760',                           href: 'tel:425-610-7760',                             bg: 'bg-indigo-50', border: 'border-indigo-200', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' },
              { icon: MapPin, title: 'Location',  content: 'Sammamish, WA',                          sub: 'Serving King County',                           bg: 'bg-sky-50', border: 'border-sky-200', iconBg: 'bg-sky-100', iconColor: 'text-sky-600' },
            ].map(({ icon: Icon, title, content, href, sub, bg, border, iconBg, iconColor }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${bg} glow-hover border ${border} rounded-2xl px-6 py-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-14 h-14 rounded-full ${iconBg} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-7 h-7 ${iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                {href ? (
                  <a href={href} className="text-blue-600 hover:text-blue-700 text-sm break-words hover:underline transition-colors">{content}</a>
                ) : (
                  <>
                    <p className="text-gray-700 font-medium">{content}</p>
                    {sub && <p className="text-gray-500 text-sm">{sub}</p>}
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
