import image_10be3ee06117d7eb0cd4db06069aa5ed98f72bad from 'figma:asset/10be3ee06117d7eb0cd4db06069aa5ed98f72bad.png';
import image_122fcec975c29a8fda45a5052691d167f124d541 from 'figma:asset/122fcec975c29a8fda45a5052691d167f124d541.png';
import image_73b09e7c3d7b5b6dadfb280df62d3c7109a35cb0 from 'figma:asset/73b09e7c3d7b5b6dadfb280df62d3c7109a35cb0.png';
import image_0c939ded8774d1ea15248cd2aa8d210c0e0254da from 'figma:asset/0c939ded8774d1ea15248cd2aa8d210c0e0254da.png';
import image_4959c7de23621b82087e19bb99fa93d3c5e9d1b7 from 'figma:asset/4959c7de23621b82087e19bb99fa93d3c5e9d1b7.png';
import heroBackground from 'figma:asset/0a707ce3e404fb1a972628ed14f7fe302e8f2586.png';
import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ArrowRight, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Screen1HomeProps {
  onGetQuote: (carNumber: string) => void;
  onClaimClick: () => void;
  onReset: () => void;
}

export function Screen1Home({ onGetQuote, onClaimClick, onReset }: Screen1HomeProps) {
  const [carNumber, setCarNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (carNumber.trim()) {
      onGetQuote(carNumber);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onClaimClick={onClaimClick} />
      
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-0 items-center flex-1 max-h-[calc(100vh-80px)] relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: '100% auto',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Left Column - Content */}
        <main className="max-w-md ml-20 pl-6 py-4 relative z-10">
          {/* Hero Section */}
          <div>
            <h1 className="text-gray-900 mb-3 text-4xl font-bold">
              Get <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">car insurance</span> for your peace of mind
            </h1>
            <p className="text-gray-600 mb-4">
              Get up to 70% on car insurance
            </p>

            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">99.99% On-time Claim Settlements</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">24x7 Support</span>
              </div>
            </div>

            {/* Main Card */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-5 border border-gray-200">
              <div className="mb-4">
                <label htmlFor="carNumber" className="block text-gray-900 mb-2">
                  Enter car number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="carNumber"
                    value={carNumber}
                    onChange={(e) => setCarNumber(e.target.value)}
                    placeholder="e.g., MH 01 AB 1234"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                  />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-900 rounded-lg whitespace-nowrap z-10 shadow-lg animate-bounce">
                    Enter a dummy car number to get started
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-yellow-400"></div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                Get a Quote
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

        </main>

        {/* Right Column - Image */}
        <div className="hidden lg:flex items-center justify-center relative h-full z-10">
        </div>
      </div>
      <Footer onReset={onReset} />
    </div>
  );
}