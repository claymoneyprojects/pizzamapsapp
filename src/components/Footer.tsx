import React from 'react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-400">Discover</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => onNavigate('/')}
                  className="text-white hover:text-gray-300 transition-colors font-medium flex items-center gap-2"
                >
                  Pizza Near Me
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/3132/3132693.png" 
                    alt="Pizza icon" 
                    className="w-4 h-4"
                  />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/history')}
                  className="text-white hover:text-gray-300 transition-colors font-medium"
                >
                  Pizza History
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/pizzaquiz')}
                  className="text-white hover:text-gray-300 transition-colors font-medium"
                >
                  Pizza Quiz
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/pizzafacts')}
                  className="text-white hover:text-gray-300 transition-colors font-medium"
                >
                  Pizza Facts
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/faq')}
                  className="text-white hover:text-gray-300 transition-colors font-medium"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-400">Company</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => onNavigate('/about')}
                  className="text-white hover:text-gray-300 transition-colors font-medium"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/contact')}
                  className="text-white hover:text-gray-300 transition-colors font-medium"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-400">Legal</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => onNavigate('/privacy')}
                  className="text-white hover:text-gray-300 transition-colors font-medium"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/terms')}
                  className="text-white hover:text-gray-300 transition-colors font-medium"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-400">Connect</h3>
            <div className="space-y-3 text-white">
              <a href="mailto:pizzamapsapp@gmail.com" className="hover:text-gray-300 transition-colors">
                pizzamapsapp@gmail.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white font-medium">
            &copy; {new Date().getFullYear()} Pizza Maps. All rights reserved.
          </p>
          <p className="text-sm text-white font-medium">
            Made with 🍕 in Canada
          </p>
        </div>
      </div>
    </footer>
  );
};