import { createStory, inferTags, summarize } from './_localBackend.ts';
import { moderateStoryText } from './_contentModeration.ts';

const toDataUrl = async (file: File) => {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  const base64 = btoa(binary);
  return `data:${file.type || 'application/octet-stream'};base64,${base64}`;
};

Deno.serve(async (req) => {
  try {
    const formData = await req.formData();

    const title = String(formData.get('title') || '').trim();
    const author_name = String(formData.get('author_name') || '').trim();
    const content = String(formData.get('content') || '').trim();
    const topic = String(formData.get('topic') || '').trim();
    const mediaFiles = formData.getAll('media');

    if (!title || !author_name || !content || !topic) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const moderation = await moderateStoryText(`${title}\n\n${content}`);
    if (!moderation.isClean) {
      return Response.json({
        error: 'Your story could not be posted because it contains inappropriate language.',
        moderation: { reason: moderation.reason, source: moderation.source }
      }, { status: 400 });
    }

    const media_urls: string[] = [];

    for (const file of mediaFiles) {
      if (file instanceof File) {
        media_urls.push(await toDataUrl(file));
      }
    }

    const story = createStory({
      title,
      author_name,
      content,
      topic,
      status: 'approved',
      media_urls,
      audio_url: null,
      summary: summarize(content),
      tags: inferTags(content, topic),
      comments_count: 0,
      likes: 0
    });

    return Response.json({ success: true, story });
  } catch (error) {
    console.error('Error submitting story with media:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
