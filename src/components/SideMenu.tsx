import React from 'react';
import { X } from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Side Menu */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 bg-red-900 text-white">
          <h2 className="text-xl font-bold">Menu</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-md hover:bg-red-800 transition duration-200"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => onNavigate('/')}
                className="w-full text-left py-2 px-4 hover:bg-red-100 rounded-md transition duration-200"
              >
                Find Pizza Nearby
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('/history')}
                className="w-full text-left py-2 px-4 hover:bg-red-100 rounded-md transition duration-200"
              >
                History of Pizza
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('/pizzaquiz')}
                className="w-full text-left py-2 px-4 hover:bg-red-100 rounded-md transition duration-200"
              >
                Pizza Quiz
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('/pizzafacts')}
                className="w-full text-left py-2 px-4 hover:bg-red-100 rounded-md transition duration-200"
              >
                Pizza Facts
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('/about')}
                className="w-full text-left py-2 px-4 hover:bg-red-100 rounded-md transition duration-200"
              >
                About Us
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('/faq')}
                className="w-full text-left py-2 px-4 hover:bg-red-100 rounded-md transition duration-200"
              >
                FAQ
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('/contact')}
                className="w-full text-left py-2 px-4 hover:bg-red-100 rounded-md transition duration-200"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};