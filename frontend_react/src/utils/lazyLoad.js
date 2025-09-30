import { lazy } from 'react';

// Lazy loading des composants lourds
export const LazyAbout = lazy(() => import('../container/About/About'));
export const LazyWorks = lazy(() => import('../container/Works/Works'));
export const LazySkills = lazy(() => import('../container/Skills/Skills'));
export const LazyTestimonial = lazy(() => import('../container/Testimonial/Testimonial'));
export const LazyFooter = lazy(() => import('../container/Footer/Footer'));
export const LazyCTA = lazy(() => import('../container/CTA/CTA'));