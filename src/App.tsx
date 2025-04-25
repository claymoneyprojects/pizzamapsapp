import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { HistoryOfPizza } from './pages/HistoryOfPizza';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { AboutUs } from './pages/AboutUs';
import { PizzaQuiz } from './pages/PizzaQuiz';
import { PizzaFacts } from './pages/PizzaFacts';

declare global {
  interface Window {
    clicky?: {
      log: (pageUrl: string, pageTitle: string) => void;
    };
  }
}

const AppContent = () => {
  const location = useLocation();

  React.useEffect(() => {
    // Update meta description based on current route
    const descriptions: Record<string, string> = {
      '/': "Find the best local pizza places near you with Pizza Maps. Search by location, get directions, and discover delicious pizzerias in your area.",
      '/history': "Explore the fascinating history of pizza from its ancient origins to modern times. Learn about pizza's evolution and cultural significance.",
      '/privacy': "Read our Privacy Policy to understand how Pizza Maps handles your data and protects your privacy.",
      '/terms': "Review our Terms of Service to understand the rules and guidelines for using Pizza Maps.",
      '/about': "Learn about Pizza Maps and our mission to help you find the best local pizzerias in your area.",
      '/faq': "Find answers to frequently asked questions about using Pizza Maps to find local pizza places.",
      '/contact': "Get in touch with Pizza Maps. We're here to help you with any questions or concerns.",
      '/pizzaquiz': "Test your pizza knowledge with our fun pizza quiz! Learn interesting facts about pizza while having fun.",
      '/pizzafacts': "Discover fascinating and fun facts about pizza - from world records to surprising historical tidbits!"
    };

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptions[location.pathname] || descriptions['/']);
    }

    // Track page view with Clicky
    if (window.clicky) {
      const pageTitles: Record<string, string> = {
        '/': "Home - Pizza Maps",
        '/history': "History of Pizza - Pizza Maps",
        '/privacy': "Privacy Policy - Pizza Maps",
        '/terms': "Terms of Service - Pizza Maps",
        '/about': "About Us - Pizza Maps",
        '/faq': "FAQ - Pizza Maps",
        '/contact': "Contact Us - Pizza Maps",
        '/pizzaquiz': "Pizza Quiz - Pizza Maps",
        '/pizzafacts': "Pizza Facts - Pizza Maps"
      };

      window.clicky.log(
        location.pathname,
        pageTitles[location.pathname] || pageTitles['/']
      );
    }
  }, [location]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<HistoryOfPizza />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pizzaquiz" element={<PizzaQuiz />} />
        <Route path="/pizzafacts" element={<PizzaFacts />} />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;