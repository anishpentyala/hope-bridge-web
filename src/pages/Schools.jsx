import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, BookOpen, Heart, CheckCircle, Send, ArrowRight } from 'lucide-react';

const benefits = [
  "Culturally responsive mental health programming",
  "Professional development for staff and counselors",
  "Peer mentor training and support",
  "Student workshops on stress, identity, and wellness",
  "Parent education sessions in multiple languages",
  "Ongoing consultation and resources"
];

const processSteps = [
  {
    step: "01",
    title: "Reach Out",
    desc: "Complete the partnership inquiry form below. We'll respond within 2 business days."
  },
  {
    step: "02",
    title: "Discovery Call",
    desc: "A short 30-minute call to understand your school's needs and student population."
  },
  {
    step: "03",
    title: "Program Design",
    desc: "We tailor programming to your school's schedule, culture, and student demographics."
  },
  {
    step: "04",
    title: "Launch",
    desc: "Programs roll out with ongoing check-ins to ensure student benefit and school fit."
  }
];

const initialForm = {
  contactName: '',
  role: '',
  schoolName: '',
  district: '',
  email: '',
  phone: '',
  asianStudentCount: '',
  goals: '',
  preferredContact: 'email'
};

export default function Schools() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!formData.contactName.trim()) e.contactName = 'Your name is required';
    if (!formData.role) e.role = 'Please select your role';
    if (!formData.schoolName.trim()) e.schoolName = 'School name is required';
    if (!formData.district.trim()) e.district = 'District is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email';
    if (!formData.goals.trim()) e.goals = 'Please share what you hope to achieve';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('https://formspree.io/f/mldgebll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `School Partnership Inquiry — ${formData.schoolName}`,
          ...formData
        })
      });
      if (res.ok) {
        setIsSuccess(true);
        setFormData(initialForm);
        setErrors({});
      } else {
        throw new Error('Server error');
      }
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again or email us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
      errors[field]
        ? 'border-red-300 bg-red-50'
        : 'border-slate-200 bg-white hover:border-blue-300'
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-blue-50 to-sky-50">

      {/* Hero */}
      <section className="pt-16 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              School Partnerships
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 leading-tight">
              Bring culturally informed mental health support to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                your school
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Partner with HopeBridge to provide your Asian American students with the culturally
              responsive mental health support they need to thrive — completely free.
            </p>
            <a
              href="#partnership-form"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium text-sm transition-colors"
            >
              Apply to Partner <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Benefits & How It Works */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold text-slate-900 mb-6">
                What Your School Gets
              </h2>
              <div className="space-y-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
            >
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Always Free for Students
              </h3>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  HopeBridge brings culturally informed mental health programming directly to schools,
                  making support accessible to Asian American students where they spend their days.
                </p>
                <p>
                  Our programs address the unique pressures these students face—from academic expectations
                  to identity struggles—in ways traditional counseling often can't.
                </p>
                <p>
                  All programming is completely free for schools and students, removing financial barriers
                  to mental health support.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">
              How Partnership Works
            </h2>
            <p className="text-slate-600 text-lg max-w-xl mx-auto">
              From first contact to launch, we make the process simple for busy school administrators.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Serving King County */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">
              Serving Schools Across King County
            </h2>
            <p className="text-slate-600 text-lg">
              We're proud to work with schools throughout Sammamish and the greater Eastside,
              bringing culturally informed mental health support to Asian American students where they are.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Intake Form */}
      <section id="partnership-form" className="py-20 px-6 lg:px-8 bg-white scroll-mt-20">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <Heart className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                Start a Partnership
              </h2>
              <p className="text-slate-600">
                Fill out the form below and we'll reach out within 2 business days to set up a discovery call.
              </p>
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 px-8 bg-blue-50 rounded-2xl border border-blue-100"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">Application Received!</h3>
                <p className="text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Thank you for reaching out. We'll review your inquiry and be in touch within 2 business days
                  to schedule a discovery call.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-6"
              >
                {/* Contact Info */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Your Information</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="contactName"
                        type="text"
                        value={formData.contactName}
                        onChange={handleChange}
                        placeholder="Dr. Jane Kim"
                        className={inputClass('contactName')}
                      />
                      {errors.contactName && <p className="mt-1 text-xs text-red-600">{errors.contactName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Your Role <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className={inputClass('role')}
                      >
                        <option value="">Select your role</option>
                        <option value="counselor">School Counselor</option>
                        <option value="principal">Principal / Vice Principal</option>
                        <option value="teacher">Teacher</option>
                        <option value="district_admin">District Administrator</option>
                        <option value="parent">Parent / PTA</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role}</p>}
                    </div>
                  </div>
                </div>

                {/* School Info */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">School Information</h3>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          School Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="schoolName"
                          type="text"
                          value={formData.schoolName}
                          onChange={handleChange}
                          placeholder="Eastlake High School"
                          className={inputClass('schoolName')}
                        />
                        {errors.schoolName && <p className="mt-1 text-xs text-red-600">{errors.schoolName}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          School District <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="district"
                          type="text"
                          value={formData.district}
                          onChange={handleChange}
                          placeholder="Lake Washington School District"
                          className={inputClass('district')}
                        />
                        {errors.district && <p className="mt-1 text-xs text-red-600">{errors.district}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Approximate number of Asian American students
                      </label>
                      <select
                        name="asianStudentCount"
                        value={formData.asianStudentCount}
                        onChange={handleChange}
                        className={inputClass('asianStudentCount')}
                      >
                        <option value="">Select a range</option>
                        <option value="under_50">Under 50</option>
                        <option value="50_150">50–150</option>
                        <option value="150_300">150–300</option>
                        <option value="300_500">300–500</option>
                        <option value="over_500">Over 500</option>
                        <option value="unsure">Not sure</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Contact Details</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jkim@lwsd.org"
                        className={inputClass('email')}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Phone <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(425) 555-0100"
                        className={inputClass('phone')}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Preferred contact method</label>
                    <div className="flex gap-4">
                      {['email', 'phone'].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="preferredContact"
                            value={opt}
                            checked={formData.preferredContact === opt}
                            onChange={handleChange}
                            className="text-blue-600"
                          />
                          <span className="text-sm text-slate-700 capitalize">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Goals */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    What are you hoping to achieve through this partnership? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your students' needs, any existing programs, and what success looks like for you..."
                    className={`${inputClass('goals')} resize-none`}
                  />
                  {errors.goals && <p className="mt-1 text-xs text-red-600">{errors.goals}</p>}
                </div>

                {errors.submit && (
                  <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">{errors.submit}</p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Partnership Inquiry
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-slate-400">
                  We typically respond within 2 business days. All information is kept confidential.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
