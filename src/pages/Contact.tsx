import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:pizzamapsapp@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-red-900">Let's Chat About Pizza!</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-red-800">Drop Us a Line</h2>
          
          <div className="mb-6">
            <p className="text-lg text-gray-600 mb-6">
              Got a pizza place we should know about? Found a bug? Just want to talk pizza? We're all ears! Whether you're a pizza enthusiast, restaurant owner, or just someone with great taste in food, we'd love to hear from you.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail size={24} className="text-red-700 mr-3" />
                <a href="mailto:pizzamapsapp@gmail.com" className="text-lg text-gray-700 hover:text-red-700 transition-colors">
                  pizzamapsapp@gmail.com
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-xl mb-2 text-red-700">When We're Around</h3>
            <p className="text-lg text-gray-700">Monday - Friday: 9AM - 5PM EST</p>
            <p className="text-lg text-gray-700">Saturday - Sunday: Closed (We're out trying new pizzas!)</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-red-800">Send Us Your Thoughts</h2>
          
          {submitted ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Thanks for reaching out!</h3>
              <p className="text-gray-600">Your email client should be opening to send us a message.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2 text-lg">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-lg"
                  placeholder="Pizza Lover"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-lg">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-lg"
                  placeholder="you@example.com"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2 text-lg">
                  What's This About?
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-lg"
                >
                  <option value="">Choose a topic...</option>
                  <option value="Suggest a Pizza Place">Suggest a Pizza Place</option>
                  <option value="Report Missing Pizzeria">Report Missing Pizzeria</option>
                  <option value="Update Restaurant Info">Update Restaurant Info</option>
                  <option value="Share Your Feedback">Share Your Feedback</option>
                  <option value="Something Else">Something Else</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2 text-lg">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-lg"
                  placeholder="Tell us what's on your mind..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 px-6 bg-red-700 text-white rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors flex items-center justify-center text-lg font-medium"
                disabled={isSubmitting}
              >
                <Send size={22} className="mr-2" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};