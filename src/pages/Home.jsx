import React from 'react';
import Hero from '@/components/home/Hero';
import Mission from '@/components/home/Mission';
import Problem from '@/components/home/Problem';
import CommunitySurvey from '@/components/home/CommunitySurvey';
import Impact from '@/components/home/Impact';
import Contact from '@/components/home/Contact';
import StorySection from '@/components/home/StorySection.jsx';
import Programs from '@/components/home/Programs';
import Partnerships from '@/components/home/Partnerships';
import GetInvolved from '@/components/home/GetInvolved';
import CommunityGallery from '@/components/home/CommunityGallery';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Mission />
      <Problem />
      <Programs />
      <StorySection />
      <Impact />
      <CommunityGallery />
      <GetInvolved />
      <Partnerships />
      <CommunitySurvey />
      <Contact />
    </div>
  );
}
