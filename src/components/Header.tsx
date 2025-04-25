import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, onLogoClick }) => {
  return (
    <header className="bg-red-900 text-white py-4 px-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md hover:bg-red-800 transition duration-200"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        
        <button
          onClick={onLogoClick}
          className="text-3xl font-bold tracking-tight hover:text-red-100 transition duration-200 flex items-center gap-2"
        >
          <img 
            src="https://cdn-icons-png.flaticon.com/512/3132/3132693.png" 
            alt="Pizza icon" 
            className="w-10 h-10"
          />
          <span>PizzaMaps</span>
        </button>
        
        <div className="w-10">
          {/* Placeholder to maintain centered logo */}
        </div>
      </div>
    </header>
  );
};