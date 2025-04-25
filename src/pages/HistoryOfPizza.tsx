import React from 'react';

export const HistoryOfPizza: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-red-900">The Epic Journey of Pizza</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-red-800">From Ancient Times to Your Plate</h2>
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Picture this: It's 997 AD in a bustling town called Gaeta in southern Italy, and someone writes down the word "pizza" for the first time. But the story of our favorite food goes way back before that! Ancient civilizations were already onto something, creating flatbreads topped with olive oil and spices. The Romans had their "panis focacius" (yeah, that's where focaccia comes from), and they were pretty proud of it.
        </p>
        <p className="text-lg leading-relaxed text-gray-700">
          But here's where it gets really interesting - pizza as we know it today was born in Naples, and it was actually considered poor people's food at first. When tomatoes arrived from the Americas in the late 1700s, Neapolitans were the brave souls who first put them on their flatbreads. Everyone else thought tomatoes were poisonous back then (plot twist: they weren't!).
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-red-800">The American Pizza Revolution</h2>
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Fast forward to the late 1800s, when Italian immigrants brought their pizza-making skills to the US. The first official American pizzeria? That would be G. Lombardi's, opening its doors in 1905 on Spring Street in Manhattan. They weren't just selling pizza - they were starting a revolution!
        </p>
        <p className="text-lg leading-relaxed text-gray-700">
          After World War II, returning soldiers who had been stationed in Italy came home with a serious pizza craving, and boom - pizza exploded across America. This is when the big names you know today - Pizza Hut, Domino's, Papa John's - started popping up. But they weren't just copying the Italian style; they were creating something uniquely American.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-red-800">Pizza Today: A Global Love Affair</h2>
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          These days, pizza is like the ultimate cultural chameleon. Every corner of the world has put its own spin on it. You've got Chicago's deep-dish pizza (basically a delicious casserole), New York's huge foldable slices, Detroit's square pan pizza with crispy edges, and countless other variations.
        </p>
        <p className="text-lg leading-relaxed text-gray-700">
          From wood-fired Neapolitan pizzas to creative artisanal pies topped with everything from kimchi to curry, pizza has become this amazing canvas for culinary creativity. It's not just food anymore - it's a way to bring people together, experiment with flavors, and keep a centuries-old tradition alive while constantly reinventing it. Pretty cool for what started as a simple flatbread, right?
        </p>
      </div>
    </div>
  );
};