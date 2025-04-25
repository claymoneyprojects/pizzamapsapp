import React from 'react';
import { Pizza } from 'lucide-react';

export const PizzaFacts: React.FC = () => {
  const facts = [
    {
      title: "The World's Most Expensive Pizza",
      content: "The Louis XIII pizza in Italy costs $12,000! It's topped with three types of caviar, lobster from Norway, and seven types of cheese. Talk about a fancy slice! 🤑"
    },
    {
      title: "Pizza in Space",
      content: "In 2001, Pizza Hut became the first company to deliver pizza to outer space! They sent a salami pizza to the International Space Station. Space pizza, anyone? 🚀"
    },
    {
      title: "The Pizza Effect",
      content: "Here's a mind-bender: Pizza as we know it today was actually perfected by Italian-Americans, then influenced pizza-making back in Italy. It's called 'The Pizza Effect' by cultural anthropologists! 🤯"
    },
    {
      title: "Pizza Insurance",
      content: "Some pizza companies actually offer 'pizza insurance' - if something happens to your pizza on the way home, they'll replace it for free. Now that's peace of mind! 🛡️"
    },
    {
      title: "The Pizza Principle",
      content: "In NYC, there's something called the 'Pizza Principle' - since the 1960s, the price of a slice of pizza has roughly matched the cost of a subway ride. Economics, baby! 🚇"
    },
    {
      title: "Hawaii's Not to Blame",
      content: "Contrary to popular belief, Hawaiian pizza wasn't invented in Hawaii - it was created in Canada in 1962 by Sam Panopoulos. Sorry, Hawaii! 🍍"
    },
    {
      title: "Pizza Consumption Stats",
      content: "Americans eat approximately 350 slices of pizza every second. That's about 100 acres of pizza per day! Now that's a lot of pizza! 🍕"
    },
    {
      title: "The Longest Pizza",
      content: "The longest pizza ever made was 6,333 feet long! It was created in Los Angeles in 2017. That's more than a mile of pizza! 📏"
    },
    {
      title: "Saturday Night Pizza",
      content: "Saturday night is the most popular night for eating pizza. About 36% of all pizza orders come in on Saturday! 📅"
    },
    {
      title: "Super Bowl Sunday",
      content: "Super Bowl Sunday is the biggest pizza delivery day of the year. Delivery drivers handle about 2 million pizzas on game day! 🏈"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-red-900">🍕 Fun Pizza Facts</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {facts.map((fact, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-700 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4">
              <Pizza className="text-red-700 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{fact.title}</h2>
                <p className="text-gray-600">{fact.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};