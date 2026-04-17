# HopeBridge 🌉

A web platform for HopeBridge, a youth-led nonprofit supporting teen mental 
health in King County, WA. Built and maintained by high schoolers.

**Live site:** [hopebridgeservices.org](https://hopebridgeservices.vercel.app)

---

## what this is

HopeBridge runs mental health awareness booths, club drop-ins, and a Story 
Project where teens share anonymous experiences. This repo is the full frontend 
for that platform, including story submission, a community gallery, and program 
info.

## stack

React · Supabase · Vercel · Tailwind CSS

## features

- Story submission with media upload
- Community gallery with 18+ photos
- Comments section (Supabase-backed, persistent)
- Programs page with past + current initiatives
- Mobile responsive

## running locally

```bash
git clone https://github.com/anishpentyala/hopebridge
cd hopebridge
npm install
cp .env.example .env.local  # fill in your Supabase keys
npm run dev
```

## env variables
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

## about

Co-founded by Anish Pentyala,  Ishaan Kejriwal, Arnav Malhotra, Rishi Ravikumar, Arjun Kuchi, and Samvid Prabhu. HopeBridge started as a school booth series 
collecting community stories and has grown into a registered nonprofit with 
a live platform and multi-school outreach network.

[hopebridgeservices.org](https://hopebridgeservices.vercel.app) · 
[Instagram](https://instagram.com/hopebridge) · 
[Contact](mailto:hopebridge@email.com)
