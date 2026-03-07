import StorySubmitForm from '@/components/story/StorySubmitForm';
import SEOHead from '@/components/SEOHead';

export default function StorySharing() {
  return (
    <>
      <SEOHead
        title="Share Your Story"
        description="Submit your mental health story to the HopeBridge community. Anonymous sharing is welcome. Your experience can help other Asian American teens feel less alone."
        path="/StorySharing"
      />
      <StorySubmitForm />
    </>
  );
}