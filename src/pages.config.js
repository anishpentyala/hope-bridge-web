/**
 * pages.config.js - Page routing configuration
 *
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 *
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 */
import { lazy } from 'react';
import Home from './pages/Home';
import __Layout from './Layout.jsx';

// Lazy-loaded pages for better initial bundle size
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Donate = lazy(() => import('./pages/Donate'));
const GetInvolved = lazy(() => import('./pages/GetInvolved'));
const GetSupport = lazy(() => import('./pages/GetSupport'));
const Mission = lazy(() => import('./pages/Mission'));
const PhysicalStory = lazy(() => import('./pages/PhysicalStory'));
const Programs = lazy(() => import('./pages/Programs'));
const Resources = lazy(() => import('./pages/Resources'));
const Schools = lazy(() => import('./pages/Schools'));
const StoryProject = lazy(() => import('./pages/StoryProject'));
const StorySharing = lazy(() => import('./pages/StorySharing'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Volunteer = lazy(() => import('./pages/Volunteer'));
const Partnerships = lazy(() => import('./pages/Partnerships'));
const PastPrograms = lazy(() => import('./pages/PastPrograms'));


export const PAGES = {
    "About": About,
    "Contact": Contact,
    "Donate": Donate,
    "GetInvolved": GetInvolved,
    "GetSupport": GetSupport,
    "Home": Home,
    "Mission": Mission,
    "PhysicalStory": PhysicalStory,
    "Programs": Programs,
    "Resources": Resources,
    "Schools": Schools,
    "StoryProject": StoryProject,
    "StorySharing": StorySharing,
    "PrivacyPolicy": PrivacyPolicy,
    "Volunteer": Volunteer,
    "Partnerships": Partnerships,
    "PastPrograms": PastPrograms,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};
