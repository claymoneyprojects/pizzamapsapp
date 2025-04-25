import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { SideMenu } from './SideMenu';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onMenuClick={toggleMenu} 
        onLogoClick={() => handleNavigate('/')} 
      />
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={toggleMenu} 
        onNavigate={handleNavigate}
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};