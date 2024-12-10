import { useState } from 'react';
import { Search, Cake, Heart, Gift, Sparkles, Music, Utensils, GraduationCap } from 'lucide-react';
import Navbar from '../../components/user/navbar/navbar';
import { Helmet } from "react-helmet";

const occasions = [
  { id: 1, title: 'Birthdays', Icon: Cake },
  { id: 2, title: 'Weddings', Icon: Heart },
  { id: 3, title: 'Holidays', Icon: Gift },
  { id: 4, title: 'Anniversaries', Icon: Sparkles },
  { id: 5, title: 'Parties', Icon: Music },
  { id: 6, title: 'Dinner Events', Icon: Utensils },
  { id: 7, title: 'Graduations', Icon: GraduationCap },
  { id: 8, title: 'Other Occasions', Icon: Gift },
];

export default function OccasionsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOccasions = occasions.filter((occasion) =>
    occasion.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Occasions | Mera Bestie</title>
      </Helmet>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-8 md:py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6 md:mb-8 animate-bounceIn">
            Shop by Occasion
          </h1>

          <div className="flex justify-center mb-6 md:mb-8">
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredOccasions.map((occasion) => (
              <OccasionCard
                key={occasion.id}
                title={occasion.title}
                Icon={occasion.Icon}
                className="transform transition-all duration-300 hover:scale-102 hover:shadow-xl"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function SearchInput({ value, onChange }) {
  return (
    <div className="relative w-full max-w-md mx-auto animate-slideDown">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:outline-none transition-all duration-200"
        placeholder="Search occasions..."
      />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    </div>
  );
}

function OccasionCard({ title, Icon, className }) {
  return (
    <div
      className={`bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-xl text-center transition-all duration-300 group ${className}`}
    >
      <div className="relative overflow-hidden">
        <Icon className="w-10 h-10 md:w-12 md:h-12 text-pink-500 mx-auto mb-3 md:mb-4 transform group-hover:scale-110 transition-transform duration-300" />
      </div>
      <h3 className="text-base md:text-lg font-semibold text-gray-700 group-hover:text-pink-600 transition-colors duration-300">
        {title}
      </h3>
    </div>
  );
}
