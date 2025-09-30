import  { Suspense } from 'react';
import './App.scss';
import { Header, CTA} from './container';
import { Navbar, ScrollProgress, DownloadCV, GitHubStats, AdminButton } from './components';

// Lazy loading pour optimisation
import {
  LazyAbout,
  LazyWorks,
  LazySkills,
  LazyTestimonial,
  LazyFooter,
} from './utils/lazyLoad';

// Composant de chargement
const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
  </div>
);

function App() {
  return (
    <div className="app">
      <ScrollProgress />
      <Navbar />
      <Header />

      <Suspense fallback={<LoadingFallback />}>
        <LazyAbout />

        {/* Section GitHub Stats */}
        <section className="github-stats-section">
          <h2 className="head-text">
            Mes <span>Statistiques</span> GitHub
          </h2>
          <GitHubStats username="Gninho-silue" />
        </section>

        <LazyWorks />
        <LazySkills />
        <LazyTestimonial />

        {/* Section CTA avant le footer */}
        <CTA />

        <LazyFooter />
      </Suspense>

      <DownloadCV />
      <AdminButton />
    </div>
  );
}

export default App;