import React from 'react';
import SEOHead from '@/components/SEOHead';
import Hero from '@/components/home/Hero';
import Mission from '@/components/home/Mission';
import Problem from '@/components/home/Problem';
import CommunitySurvey from '@/components/home/CommunitySurvey';
import Impact from '@/components/home/Impact';
import Contact from '@/components/home/Contact';
import StorySection from '@/components/home/StorySection.jsx';
import BackgroundElements from '@/components/BackgroundElements';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-white relative overflow-hidden">
      <SEOHead
        path="/"
        description="HopeBridge is a youth-led nonprofit creating culturally informed mental health support for Asian American teens. Free programs, peer mentorship, and school partnerships in the greater Seattle area."
      />
      <BackgroundElements />
      <Hero />
      <Mission />
      <Problem />
      <StorySection />
      <CommunitySurvey />
      <Contact />
    </div>
  );
}