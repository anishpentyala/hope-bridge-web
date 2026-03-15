import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const teamMembers = [
  {
    name: 'Rishi Ravikumar',
    role: 'Operations Lead',
    email: 'rishirkumar@outlook.com',
    initials: 'RR',
    color: 'from-blue-700 to-blue-600',
    image: '/images/team/rishi-photo.svg',
    bio: 'Rishi is a freshman at Eastlake High School who loves connecting with his culture through music, food, and festivals. Through the Hope Bridge initiative, he hopes to shed light on the cultural gap that many teens face.',
  },
  {
    name: 'Arjun Kuchi',
    role: 'Administrative Lead',
    email: 'stingingnettle1024@gmail.com',
    initials: 'AK',
    color: 'from-blue-600 to-blue-500',
    image: '/images/team/arjun-photo.svg',
    bio: 'Arjun is a 14-year-old at Eastlake High School. An avid track runner and committed trombonist, he hopes to drive positive change within his community.',
  },
  {
    name: 'Anish Pentyala',
    role: 'Field Work Lead',
    email: 'Anish.n.pentyala@gmail.com',
    initials: 'AP',
    color: 'from-blue-500 to-blue-700',
    image: '/images/team/anish-photo.svg',
    bio: 'Anish is 14 years old and attends Eastlake High School. He enjoys playing video games and hopes to make an impact on this overlooked problem!',
  },
  {
    name: 'Ishaan Kejriwal',
    role: 'Software Development Lead',
    email: 'ishaankej@outlook.com',
    initials: 'IK',
    color: 'from-blue-600 to-blue-500',
    image: '/images/team/ishaan-photo.svg',
    bio: 'Ishaan is a freshman at Eastlake High School who loves helping his community in any way possible. As a passionate coder and track runner, he aims to support Asian American teens in navigating the unique challenges addressed by Hope Bridge.',
  },
  {
    name: 'Arnav Malhotra',
    role: 'Social Media Lead',
    email: 'reacharnavmalhotra@gmail.com',
    initials: 'AM',
    color: 'from-blue-500 to-blue-600',
    image: '/images/team/arnav-photo.svg',
    bio: 'Arnav is a 14-year-old student at Eastlake High School. He has a deep passion for soccer and aims to support other Asian American teens facing struggles similar to his own.',
  },
  {
    name: 'Samvid Prabhu',
    role: 'Research Lead',
    email: 'samvid.s.prabhu@gmail.com',
    initials: 'SP',
    color: 'from-blue-500 to-blue-600',
    image: '/images/team/samvid-photo.svg',
    bio: 'Samvid is a freshman at Kamiak HS who enjoys business, marketing, and playing guitar. With Indian-Konkani roots and experience living in both Finland and the US, he understands the struggles of dual identity.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="pt-20 pb-24 px-6 lg:px-8 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="text-blue-300 text-sm font-semibold uppercase tracking-widest mb-4">Sammamish, WA</p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight">
              About <span className="text-blue-200">HopeBridge</span>
            </h1>
            <p className="mt-6 text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Mental health support built by Asian teens, for Asian teens — because we have lived it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-20 px-6 lg:px-8 bg-blue-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-lg">Hope Bridge started with something simple: conversations.</p>
              <p className="text-lg">
                As Asian American teens, we noticed that many of us were dealing with the same things but rarely talking about them. The pressure to do well in school. The feeling of balancing two cultures. The gap that can sometimes exist between what teens are experiencing and what families understand.
              </p>
              <p className="text-lg">
                These pressures often come from good intentions. Many parents want stability and opportunity for their children, especially if they sacrificed a lot to get here. At the same time, teens are trying to figure out who they are, what success means to them, and how to handle the stress that comes with it.
              </p>
              <p className="text-lg">
                That&apos;s why we founded Hope Bridge — to open new experiences and conversations.
              </p>
              <p className="text-lg">
                We want to create spaces where Asian American teens feel comfortable sharing their stories, reflecting on identity, and thinking about success in healthier ways. We hope to encourage more understanding between teens and families so these conversations do not have to feel so difficult.
              </p>
              <p className="text-base text-gray-500">
                Hope Bridge is still growing, but the purpose is simple: no teen should feel alone in the pressures they face. Join us.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MEET THE TEAM */}
      <section className="py-20 px-6 lg:px-8 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-blue-900 mb-4">
              Meet the <span className="text-blue-600">Team</span>
            </h2>
            <p className="text-lg text-blue-700 max-w-2xl mx-auto">
              Six Asian teens from Sammamish, WA who decided to build the support system they wished they had.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TeamMemberCard({ member, index }) {
  const [showImage, setShowImage] = useState(Boolean(member.image));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group pt-8 pb-6 text-center border-t border-blue-200 flex flex-col items-center transition-all duration-300"
    >
      {showImage ? (
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          onError={() => setShowImage(false)}
          className="w-full max-w-[260px] aspect-[4/5] object-cover rounded-xl mx-auto mb-5 shadow-md border border-blue-200"
        />
      ) : (
        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.color} mx-auto mb-4 flex items-center justify-center`}>
          <span className="text-white font-black text-xl">{member.initials}</span>
        </div>
      )}

      <h3 className="text-lg font-bold text-blue-900">{member.name}</h3>
      <p className="text-blue-600 font-semibold text-sm mt-1">{member.role}</p>
      {member.bio && <p className="text-sm text-blue-700 mt-3 leading-relaxed">{member.bio}</p>}
      {member.email && (
        <a
          href={`mailto:${member.email}`}
          className="mt-3 inline-flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-700 transition-colors"
        >
          <Mail className="w-3 h-3" />
          {member.email}
        </a>
      )}
    </motion.div>
  );
}
