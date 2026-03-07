import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEOHead';
import {
  GraduationCap, Building2, HeartHandshake, Stethoscope,
  Send, ArrowRight
} from 'lucide-react';
import PageBackground from '../components/PageBackground';

const partnerTypes = [
  {
    icon: GraduationCap,
    title: "Schools",
    description: "Bring culturally informed mental health workshops, student programming, and counselor support directly to your campus.",
    gradient: "from-blue-600 to-blue-500",
    bg: "bg-white",
    border: "border-blue-100",
    tag: "King County",
    tagColor: "bg-blue-100 text-blue-700"
  },
  {
    icon: Building2,
    title: "Local Businesses",
    description: "Partner with us to sponsor events, provide venues, or fund programming that directly supports Asian American teens in your community.",
    gradient: "from-blue-600 to-blue-500",
    bg: "bg-white",
    border: "border-blue-100",
    tag: "Sponsor",
    tagColor: "bg-blue-100 text-blue-700"
  },
  {
    icon: Building2,
    title: "Nonprofits & Community Orgs",
    description: "Co-create programming, share resources, and multiply our collective impact for Asian American youth across the Eastside.",
    gradient: "from-blue-600 to-blue-500",
    bg: "bg-white",
    border: "border-blue-100",
    tag: "Coalition",
    tagColor: "bg-blue-100 text-blue-700"
  },
  {
    icon: Stethoscope,
    title: "Therapists & Mental Health Pros",
    description: "Join our referral network to serve teens who need professional support beyond peer programming.",
    gradient: "from-blue-600 to-blue-500",
    bg: "bg-white",
    border: "border-blue-100",
    tag: "Referral Network",
    tagColor: "bg-blue-100 text-blue-700"
  },
  {
    icon: HeartHandshake,
    title: "Faith & Cultural Organizations",
    description: "Work together to reach teens within trusted community spaces like temples, churches, cultural centers, and beyond.",
    gradient: "from-blue-600 to-blue-500",
    bg: "bg-white",
    border: "border-blue-100",
    tag: "Community",
    tagColor: "bg-blue-100 text-blue-700"
  }
];

const processSteps = [
  {
    step: "01",
    title: "Reach Out",
    desc: "Submit the inquiry form below. We respond within 2 business days."
  },
  {
    step: "02",
    title: "Discovery Call",
    desc: "A 30-minute conversation to understand your community's needs."
  },
  {
    step: "03",
    title: "Program Design",
    desc: "We tailor programming to your schedule, culture, and demographics."
  },
  {
    step: "04",
    title: "Launch",
    desc: "Programs roll out with ongoing check-ins to ensure real impact."
  }
];

const initialForm = {
  contactName: '',
  role: '',
  orgName: '',
  orgType: '',
  district: '',
  email: '',
  phone: '',
  asianStudentCount: '',
  goals: '',
  preferredContact: 'email'
};

export default function Partnerships() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.contactName.trim()) e.contactName = 'Your name is required';
    if (!formData.orgName.trim()) e.orgName = 'Organization name is required';
    if (!formData.orgType) e.orgType = 'Please select an organization type';
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

  const handleSubmit = (e) => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      e.preventDefault();
      setErrors(errs);
      return;
    }

    setErrors({});
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
      errors[field]
        ? 'border-red-300 bg-red-50'
        : 'border-slate-200 bg-white hover:border-blue-300'
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 relative overflow-hidden">
      <SEOHead
        title="Partner With Us"
        description="HopeBridge welcomes partnerships with schools, healthcare providers, and community organizations to expand culturally informed mental health support for Asian American teens."
        path="/Partnerships"
      />
      <PageBackground />

      {/* Hero */}
      <section className="pt-16 pb-20 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-10 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -right-10 w-72 h-72 bg-indigo-100/30 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
              Partner with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                HopeBridge
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
              Whether you are a school, nonprofit, mental health provider, or community organization,
              we want to work alongside you to support Asian American teens across King County.
            </p>
            <a
              href="#partnership-form"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-base transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              Start a Partnership
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Who We Partner With
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              We work across sectors to reach teens wherever they are.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {partnerTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative ${type.bg} rounded-2xl p-6 border ${type.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${type.gradient}`} />
                <div className="mb-4">
                  <h3 className="text-lg font-black text-gray-900">{type.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* How It Works */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-blue-200 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-black text-white mb-3">
              How Partnership Works
            </h2>
            <p className="text-blue-100 text-lg max-w-xl mx-auto">
              We make the process simple for busy administrators and coordinators.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {processSteps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white font-black text-sm mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-black text-white mb-2">{s.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Inquiry Form */}
      <section id="partnership-form" className="py-20 px-6 lg:px-8 bg-white scroll-mt-20">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-gray-900 mb-3">
                Start a Partnership
              </h2>
              <p className="text-gray-600">
                Fill out the form and we will reach out within 2 business days to set up a discovery call.
              </p>
            </div>

            <form
                action="https://formspree.io/f/mojnzdry"
                method="POST"
                onSubmit={handleSubmit}
                noValidate
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-6"
              >
                <input type="hidden" name="_subject" value={`Partnership Inquiry, ${formData.orgName || 'HopeBridge'}`} />
                {/* Contact Info */}
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Your Information</h3>
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
                        Your Role
                      </label>
                      <input
                        name="role"
                        type="text"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="School Counselor, Director, etc."
                        className={inputClass('role')}
                      />
                    </div>
                  </div>
                </div>

                {/* Organization Info */}
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Organization</h3>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Organization Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="orgName"
                          type="text"
                          value={formData.orgName}
                          onChange={handleChange}
                          placeholder="Eastlake High School"
                          className={inputClass('orgName')}
                        />
                        {errors.orgName && <p className="mt-1 text-xs text-red-600">{errors.orgName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Organization Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="orgType"
                          value={formData.orgType}
                          onChange={handleChange}
                          className={inputClass('orgType')}
                        >
                          <option value="">Select type</option>
                          <option value="school">School / School District</option>
                          <option value="local_business">Local Business</option>
                          <option value="nonprofit">Nonprofit Organization</option>
                          <option value="mental_health">Mental Health Practice</option>
                          <option value="faith">Faith / Cultural Organization</option>
                          <option value="community">Community Center</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.orgType && <p className="mt-1 text-xs text-red-600">{errors.orgType}</p>}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          City / District
                        </label>
                        <input
                          name="district"
                          type="text"
                          value={formData.district}
                          onChange={handleChange}
                          placeholder="Sammamish / Lake Washington SD"
                          className={inputClass('district')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Approx. Asian American youth served
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
                </div>

                {/* Contact Details */}
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Contact Details</h3>
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
                    What are you hoping to achieve? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about the teens you serve, any existing programs, and what a successful partnership looks like for you..."
                    className={`${inputClass('goals')} resize-none`}
                  />
                  {errors.goals && <p className="mt-1 text-xs text-red-600">{errors.goals}</p>}
                </div>

                {errors.submit && (
                  <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">{errors.submit}</p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Partnership Inquiry
                </Button>

                <p className="text-xs text-center text-slate-400">
                  We typically respond within 2 business days. All information is kept confidential.
                </p>
              </form>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
