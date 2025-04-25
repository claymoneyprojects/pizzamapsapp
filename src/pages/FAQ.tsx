import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const faqItems: FAQItem[] = [
    {
      question: "So, how does Pizza Maps actually work?",
      answer: "It's super straightforward! Just drop your location (type it in or hit that 'Use My Location' button), and we'll show you all the awesome pizza spots within 10 miles. We'll put them on a map and give you the lowdown on each place - their ratings, contact info, and how to get there. Think of us as your personal pizza guide, helping you discover your next favorite slice!"
    },
    {
      question: "Is my location data safe with you folks?",
      answer: "Absolutely! We're big on privacy and treat your data like it's our secret pizza recipe. We only use your location to find nearby pizza places - that's it! We don't store it, sell it, or share it with anyone. Not comfortable sharing your exact location? No worries! You can always type in an address manually. Your privacy is as important to us as a perfectly crispy crust."
    },
    {
      question: "Why can't I find my favorite pizza joint on here?",
      answer: "We keep things local and focused, showing pizza places within 10 miles of your location. If your go-to spot isn't showing up, it might be just outside this range. Also, some places might be too new or might not be listed as a pizzeria in our database yet. But hey, that's where you come in! Let us know about any hidden gems we're missing, and we'll work on adding them to our pizza map family."
    },
    {
      question: "How up-to-date is your pizza place info?",
      answer: "We work hard to keep our info fresh (like your pizza should be!), but restaurants can change things up without telling us. While we do our best to stay current, it's always smart to give the place a quick call if you're making special plans. Think of our info as a helpful starting point for your pizza adventure!"
    },
    {
      question: "Can I order my pizza through Pizza Maps?",
      answer: "Right now, we're like your pizza-finding sidekick - we'll help you discover amazing local spots and connect you directly with them. While we don't handle orders ourselves, we make it super easy to call the restaurant directly. Just tap the 'Call Now' button, and you'll be chatting with your future pizza providers in seconds!"
    },
    {
      question: "Found an amazing pizzeria that's not on your map?",
      answer: "We love pizza tips from fellow enthusiasts! If you've discovered a fantastic pizza place that's not on our radar, hit us up through our Contact page. Share the details, and we'll check it out. After all, the pizza community is all about sharing the good stuff (though maybe not the last slice)!"
    }
  ];

  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter(item => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-red-900">Got Questions? We've Got Answers!</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
              <button
                className="flex justify-between items-center w-full text-left py-2 focus:outline-none"
                onClick={() => toggleItem(index)}
              >
                <h3 className="text-lg font-medium text-red-800">{item.question}</h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="text-red-700 flex-shrink-0" />
                ) : (
                  <ChevronDown className="text-red-700 flex-shrink-0" />
                )}
              </button>
              
              <div 
                className={`mt-2 text-gray-600 transition-all duration-300 overflow-hidden ${
                  openItems.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-lg leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};