import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GraduationCap, Heart, Building2, HandHeart, ArrowRight } from 'lucide-react';

const pathways = [
  {
    icon: GraduationCap,
    title: "Students",
    description: "Explore our programs, attend a workshop, or simply reach out when you need someone who understands.",
    cta: "Find Support",
    color: "bg-gradient-to-br from-blue-600 to-blue-500"
  },
  {
    icon: Heart,
    title: "Parents & Families",
    description: "Access resources designed to help you understand and support your teen's mental health journey.",
    cta: "Learn More",
    color: "bg-gradient-to-br from-sky-600 to-blue-500"
  },
  {
    icon: Building2,
    title: "Schools & Organizations",
    description: "Partner with us to bring mental health awareness and support programs to your students.",
    cta: "Partner With Us",
    color: "bg-gradient-to-br from-blue-700 to-blue-600"
  },
  {
    icon: HandHeart,
    title: "Supporters & Donors",
    description: "Your contribution helps us keep all programs free and accessible to every teen who needs them.",
    cta: "Support Our Work",
    color: "bg-gradient-to-br from-sky-500 to-cyan-400"
  }
];

export default function GetInvolved() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="get-involved" className="py-24 lg:py-32 bg-gradient-to-b from-white via-sky-100 to-teal-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-blue-600 font-medium text-sm tracking-wide uppercase">
            Get Involved
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight">
            There's a place for you here
          </h2>
          <p className="mt-6 text-lg text-slate-600">
            Whether you're a teen seeking support, a parent wanting to help, or 
            an organization ready to make a difference—you belong in this community.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pathways.map((pathway, index) => (
            <motion.div
              key={pathway.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full flex flex-col p-6 rounded-2xl bg-white border border-blue-100/40 hover:border-blue-300/50 hover:shadow-xl hover:shadow-blue-200/40 transition-all duration-300">
                <div className={`w-12 h-12 ${pathway.color} rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-blue-300/30`}>
                  <pathway.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {pathway.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                  {pathway.description}
                </p>

                <Button
                  variant="ghost"
                  onClick={scrollToContact}
                  className="w-full justify-between text-slate-700 hover:text-blue-600 hover:bg-blue-50 group-hover:translate-x-1 transition-all"
                >
                  {pathway.cta}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}