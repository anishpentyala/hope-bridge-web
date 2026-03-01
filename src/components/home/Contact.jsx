import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Phone, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mkgbbjkb';


const submitViaNativeForm = (data) => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = FORMSPREE_ENDPOINT;
  form.style.display = 'none';

  const entries = {
    name: data.name,
    email: data.email,
    type: data.type,
    organization: data.organization || '',
    message: data.message,
    _subject: `Hope Bridge contact from ${data.name}`,
  };

  Object.entries(entries).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = String(value ?? '');
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    organization: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitToFormspree = async (data) => {
    const payload = new FormData();
    payload.append('name', data.name);
    payload.append('email', data.email);
    payload.append('type', data.type);
    payload.append('organization', data.organization || '');
    payload.append('message', data.message);
    payload.append('_subject', `Hope Bridge contact from ${data.name}`);

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: payload
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      const details = errorBody?.errors?.map((e) => e.message).join(', ') || 'Unable to submit form.';
      throw new Error(details);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitToFormspree(formData);
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('type', formData.type);
      payload.append('organization', formData.organization || '');
      payload.append('message', formData.message);
      payload.append('_subject', `Hope Bridge contact from ${formData.name}`);

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: payload
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const details = errorBody?.errors?.map((e) => e.message).join(', ') || 'Unable to submit form.';
        throw new Error(details);
      }

      let submissionSaved = false;
      let messageForwarded = false;

      try {
        await base44.entities.ContactSubmission.create({
          ...formData,
          status: 'new'
        });
        submissionSaved = true;
      } catch (saveError) {
        console.error('Contact submission save failed:', saveError);
      }

      try {
        await base44.functions.invoke('forwardContactSubmission', {
          data: {
            ...formData,
            status: 'new'
          }
        });
        messageForwarded = true;
      } catch (forwardError) {
        console.error('Primary email forwarding failed:', forwardError);
      }

      if (!messageForwarded) {
        try {
          await base44.functions.invoke('sendContactEmail', formData);
          messageForwarded = true;
        } catch (fallbackError) {
          console.error('Fallback email sending failed:', fallbackError);
        }
      }

      if (!submissionSaved && !messageForwarded) {
        throw new Error('No contact submission path succeeded');
      }

      setIsSubmitted(true);
      toast.success('Message sent successfully!');
    } catch (error) {
      console.error('Failed to send message to Formspree fetch, trying native submit fallback:', error);
      try {
        submitViaNativeForm(formData);
        return;
      } catch (fallbackError) {
        console.error('Native Formspree submit fallback failed:', fallbackError);
        toast.error('Failed to send message. Please try again or email us directly.');
      }
      console.error('Failed to send message:', error);
      toast.error('Failed to send message. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-24 lg:py-32 bg-gradient-to-br from-blue-800 via-slate-900 to-blue-900 text-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-blue-50 rounded-3xl p-12 border border-blue-200">

            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">
              Thank you for reaching out
            </h3>
            <p className="text-slate-600 leading-relaxed">
              We've received your message and will get back to you within 2-3 business days. 
              If this is urgent, please reach out directly at{' '}
              <a href="mailto:hopebridgecommunityservices@gmail.com" className="text-blue-600 hover:underline">
                hopebridgecommunityservices@gmail.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>);

  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-gradient-to-br from-blue-800 via-slate-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>

            <span className="text-cyan-300 font-medium text-sm tracking-wide uppercase">
              Contact Us
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-white leading-tight">
              Let's start a conversation
            </h2>
            
            <p className="mt-6 text-lg text-blue-100 leading-relaxed">Whether you're a teen seeking support, a parent looking for resources, a school interested in partnership, or someone who wants to contribute we'd love to hear from you.


            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-cyan-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Email</h4>
                  <a href="mailto:hopebridgecommunityservices@gmail.com" className="text-blue-200 hover:text-cyan-300 transition-colors">
                    hopebridgecommunityservices@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-cyan-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Phone</h4>
                  <a href="tel:425-610-7760" className="text-blue-200 hover:text-cyan-300 transition-colors">
                    425-610-7760
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-cyan-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Location</h4>
                  <p className="text-blue-200">Sammamish, Washington</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/20">
              <h4 className="font-semibold text-white mb-4">Follow Our Journey</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/hopebridgecommunityservices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
                  aria-label="Instagram">

                  <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@hopebridgecommunity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
                  aria-label="TikTok">

                  <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/share/175JyM5Wym/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
                  aria-label="Facebook">

                  <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}>

            <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-white/30 shadow-xl shadow-black/30">
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-700">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                      className="bg-white border-slate-200 focus:border-blue-600 focus:ring-blue-600/20 text-black" />

                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      required
                      className="bg-white border-slate-200 focus:border-blue-600 focus:ring-blue-600/20 text-black" />

                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700">I am a...</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}>

                    <SelectTrigger className="bg-white border-slate-200 text-black">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="parent">Parent / Family Member</SelectItem>
                      <SelectItem value="school">School Administrator / Counselor</SelectItem>
                      <SelectItem value="donor">Potential Donor / Supporter</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(formData.type === 'school' || formData.type === 'donor') &&
                <div className="space-y-2">
                    <Label htmlFor="organization" className="text-slate-700">Organization (optional)</Label>
                    <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="School or organization name"
                    className="bg-white border-slate-200 focus:border-blue-600 focus:ring-blue-600/20" />

                  </div>
                }

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-slate-700">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help?"
                    rows={5}
                    required
                    className="bg-white border-slate-200 focus:border-blue-600 focus:ring-blue-600/20 resize-none text-black" />

                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-6 rounded-xl shadow-lg shadow-blue-500/30">

                  {isSubmitting ?
                  <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </> :

                  <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  }
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>);

}
