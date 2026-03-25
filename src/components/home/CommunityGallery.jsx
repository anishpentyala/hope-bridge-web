import React from 'react';
import { motion } from 'framer-motion';

const photos = [
  { src: '/images/community/gallery-04.jpg', alt: 'Wide view of a HopeBridge classroom presentation' },
  { src: '/images/community/gallery-01.jpg', alt: 'Student pinning their story to the community wall' },
  { src: '/images/community/gallery-05.jpg', alt: 'Students seated in classroom during a drop-in session' },
  { src: '/images/community/gallery-02.jpg', alt: 'Students engaging with the story board' },
  { src: '/images/community/gallery-08.jpg', alt: 'Students at a table with HopeBridge materials' },
  { src: '/images/community/gallery-03.jpg', alt: 'Student reading stories on the community board' },
  { src: '/images/community/gallery-09.jpg', alt: 'Group of students participating in a HopeBridge activity' },
  { src: '/images/community/gallery-06.jpg', alt: 'Student writing their story at a desk' },
  { src: '/images/community/gallery-10.jpg', alt: 'Students gathered at a HopeBridge event' },
  { src: '/images/community/gallery-17.jpg', alt: 'Students collaborating at a workshop table' },
  { src: '/images/community/gallery-12.jpg', alt: 'Students around the booth reading stories' },
  { src: '/images/community/gallery-11.jpg', alt: 'Student pinning handwritten card to the story wall' },
  { src: '/images/community/gallery-14.jpg', alt: 'Student filling out a story card at their desk' },
  { src: '/images/community/gallery-15.jpg', alt: 'Students at a drop-in listening to the presentation' },
  { src: '/images/community/gallery-07.jpg', alt: 'Team member helping students at a drop-in' },
  { src: '/images/community/gallery-16.jpg', alt: 'Two HopeBridge members with completed story wall' },
  { src: '/images/community/gallery-13.jpg', alt: 'Student writing their personal story at the booth' },
  { src: '/images/community/gallery-18.jpg', alt: 'Signup table scene at a library drop-in event' },
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className="relative overflow-hidden rounded-2xl group aspect-[4/3] bg-blue-100"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
