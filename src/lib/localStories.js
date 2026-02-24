const LOCAL_STORIES_KEY = 'hopebridge_local_stories';

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/+$/, '');
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const safeJsonParse = (value, fallback) => {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const hasSupabaseConfig = () => Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

const mapSupabaseStory = (story = {}) => ({
  ...story,
  media_urls: Array.isArray(story.media_urls) ? story.media_urls : [],
  tags: Array.isArray(story.tags) ? story.tags : [],
  comments_count: Number(story.comments_count || 0),
  likes: Number(story.likes || 0),
  created_date: story.created_date || story.created_at || new Date().toISOString(),
  source: story.source || 'supabase'
});

const supabaseRequest = async (path, { method = 'GET', body } = {}) => {
  if (!hasSupabaseConfig()) {
    throw new Error('Supabase is not configured');
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    method,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      Prefer: method === 'POST' ? 'return=representation' : undefined
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {})
  });

  const text = await response.text();
  const payload = text ? safeJsonParse(text, text) : null;

  if (!response.ok) {
    const message = payload?.message || payload?.error || response.statusText || 'Supabase request failed';
    const error = new Error(message);
    error.status = response.status;
    error.data = payload;
    throw error;
  }

  return payload;
};

const readStories = () => {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(LOCAL_STORIES_KEY);
  if (!raw) return [];
  const parsed = safeJsonParse(raw, []);
  return Array.isArray(parsed) ? parsed : [];
};

const writeStories = (stories) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LOCAL_STORIES_KEY, JSON.stringify(stories));
};

const inferTags = (text = '', topic = '') => {
  const content = text.toLowerCase();
  const tags = new Set();
  if (topic) tags.add(topic);
  if (content.includes('family')) tags.add('family_expectations');
  if (content.includes('school') || content.includes('grade')) tags.add('school_pressure');
  if (content.includes('identity')) tags.add('identity');
  if (content.includes('stress') || content.includes('anx')) tags.add('mental_health');
  return Array.from(tags).slice(0, 5);
};

const summarize = (text = '') =>
  text.length > 180 ? `${text.slice(0, 177)}...` : text;

export const fileToDataUrl = async (file) => {
  if (!file) return null;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const listLocalStories = () => readStories();

export const listSupabaseStories = async () => {
  if (!hasSupabaseConfig()) return [];

  try {
    const data = await supabaseRequest('/stories?select=*&order=created_date.desc');
    if (!Array.isArray(data)) return [];
    return data.map(mapSupabaseStory);
  } catch (error) {
    console.error('Failed to load Supabase stories:', error);
    return [];
  }
};

const createSupabaseStory = async (story) => {
  const data = await supabaseRequest('/stories', {
    method: 'POST',
    body: {
      title: story.title,
      author_name: story.author_name,
      content: story.content,
      topic: story.topic,
      media_urls: story.media_urls,
      audio_url: story.audio_url,
      summary: story.summary,
      tags: story.tags,
      status: 'approved',
      comments_count: Number(story.comments_count || 0),
      likes: Number(story.likes || 0),
      featured: Boolean(story.featured),
      source: 'supabase',
      created_date: story.created_date
    }
  });

  const created = Array.isArray(data) ? data[0] : data;
  return created ? mapSupabaseStory(created) : null;
};

export const createLocalStory = async ({ title, author_name, content, topic, mediaFiles = [], audioFile = null }) => {
  const media_urls = [];
  for (const file of mediaFiles) {
    const dataUrl = await fileToDataUrl(file);
    if (dataUrl) media_urls.push(dataUrl);
  }

  const audio_url = audioFile ? await fileToDataUrl(audioFile) : null;

  const baseStory = {
    title,
    author_name,
    content,
    topic,
    media_urls,
    audio_url,
    summary: summarize(content),
    tags: inferTags(content, topic),
    status: 'approved',
    comments_count: 0,
    likes: 0,
    created_date: new Date().toISOString(),
    featured: false,
    source: 'local'
  };

  try {
    const supabaseStory = await createSupabaseStory(baseStory);
    if (supabaseStory) {
      const stories = readStories();
      const deduped = stories.filter((story) => story.id !== supabaseStory.id);
      deduped.unshift(supabaseStory);
      writeStories(deduped);
      return supabaseStory;
    }
  } catch (error) {
    console.error('Supabase create failed, falling back to local storage:', error);
  }

  const localStory = {
    ...baseStory,
    id: `local_story_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  };

  const stories = readStories();
  stories.unshift(localStory);
  writeStories(stories);
  return localStory;
};

export const updateLocalStoryLikes = (storyId, likes) => {
  const stories = readStories();
  const updated = stories.map((story) =>
    story.id === storyId ? { ...story, likes } : story
  );
  writeStories(updated);
};

export const updateSupabaseStoryLikes = async (storyId, likes) => {
  if (!hasSupabaseConfig()) return false;

  try {
    await supabaseRequest(`/stories?id=eq.${encodeURIComponent(storyId)}`, {
      method: 'PATCH',
      body: { likes }
    });
    return true;
  } catch (error) {
    console.error('Failed to update Supabase like:', error);
    return false;
  }
};

export const mergeStories = (remoteStories = [], localStories = []) => {
  const merged = [...localStories];
  const seen = new Set(localStories.map((story) => story.id));

  for (const story of remoteStories) {
    if (!seen.has(story.id)) {
      merged.push(story);
      seen.add(story.id);
    }
  }

  return merged.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
};

export const isSupabaseConfigured = hasSupabaseConfig;
