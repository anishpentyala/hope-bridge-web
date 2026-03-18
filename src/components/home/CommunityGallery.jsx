import React from 'react';
import { motion } from 'framer-motion';

const photos = [
  {
    src: '/images/community/community-poster-1.jpg',
    alt: 'HopeBridge team members presenting their research on a tri-fold poster board filled with handwritten notes from teens',
    span: 'row-span-2',
  },
  {
    src: '/images/community/community-brochures.jpg',
    alt: 'Students holding HopeBridge brochures on Asian teen mental health awareness in the classroom',
    span: '',
    objectPosition: 'top',
  },
  {
    src: '/images/community/community-workshop.jpg',
    alt: 'Teens participating in a Your Words Are the Work writing workshop around a table',
    span: '',
  },
  {
    src: '/images/community/community-classroom.jpg',
    alt: 'A full classroom of students engaged in a HopeBridge community awareness session',
    span: 'col-span-2',
  },
  {
    src: '/images/community/community-poster-2.jpg',
    alt: 'Three HopeBridge team members standing proudly with their community project display board',
    span: '',
  },
];

export default function CommunityGallery() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-blue-900 leading-tight">
            Our community{' '}
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              in action
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl leading-relaxed">
            From classroom workshops to story-sharing sessions, here's what building bridges looks like.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[240px]">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`relative overflow-hidden rounded-2xl group ${photo.span}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
