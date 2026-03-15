import React from 'react';
import { motion } from 'framer-motion';

const pillars = [
{
  title: "Embracing Cultural Identity",
  description: "Helping Asian teens navigate the beautiful complexity of their bicultural identity and celebrate both cultures."
},
{
  title: "Navigating Academic Pressures",
  description: "Supporting teens facing intense academic expectations while maintaining mental wellness and redefining success."
},
{
  title: "Healing Family Disconnect",
  description: "Building bridges between generations to foster understanding and open communication at home."
},
{
  title: "Breaking Stigma",
  description: "Normalizing mental health conversations in communities where they've been silenced."
}];


export default function Mission() {
  return (
    <section id="mission" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20">

          <span className="text-blue-600 font-medium text-sm tracking-widest uppercase">
            Our Mission
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Mental health support that{' '}
            <span className="text-blue-700">
              understands your experience
            </span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">Hope Bridge exists because too many Asian teens face pressure alone. We're building the support system we wish existed one that gets the unique challenges of balancing family expectations, cultural identity, and personal wellbeing.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) =>
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group">

              <div className="p-6 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 h-full flex flex-col">
                <div className="w-8 h-0.5 bg-blue-600 mb-5" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-grow">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}