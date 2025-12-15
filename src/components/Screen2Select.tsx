import { Header } from './Header';
import { Footer } from './Footer';
import { Check } from 'lucide-react';

interface Screen2SelectProps {
  onSelect: () => void;
  onClaimClick: () => void;
  onReset: () => void;
}

export function Screen2Select({ onSelect, onClaimClick, onReset }: Screen2SelectProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onClaimClick={onClaimClick} />
      
      <main className="max-w-md mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-gray-900 mb-2">
            Choose Your Insurance Plan
          </h2>
          <p className="text-gray-600">
            Select the plan that best suits your needs
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={onSelect}
            className="w-full bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-200 hover:border-blue-500 text-left group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">01</span>
              </div>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                Popular
              </span>
            </div>
            
            <h3 className="text-gray-900 mb-2">
              Comprehensive Coverage
            </h3>
            <p className="text-gray-600 mb-4">
              Complete protection for your vehicle including third-party liability, own damage, and more.
            </p>
            
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-3 text-gray-700">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-blue-600" />
                </div>
                Third-party coverage
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-blue-600" />
                </div>
                Own damage protection
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-blue-600" />
                </div>
                Personal accident cover
              </li>
            </ul>

            <div className="text-blue-600 group-hover:text-blue-700 transition-colors">
              Select this plan →
            </div>
          </button>

          <button
            onClick={onSelect}
            className="w-full bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-200 hover:border-blue-500 text-left group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">02</span>
              </div>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                Premium
              </span>
            </div>
            
            <h3 className="text-gray-900 mb-2">
              Premium Plus Coverage
            </h3>
            <p className="text-gray-600 mb-4">
              Maximum protection with additional benefits and zero depreciation cover.
            </p>
            
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-3 text-gray-700">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-blue-600" />
                </div>
                All comprehensive benefits
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-blue-600" />
                </div>
                Zero depreciation cover
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-blue-600" />
                </div>
                24/7 roadside assistance
              </li>
            </ul>

            <div className="text-blue-600 group-hover:text-blue-700 transition-colors">
              Select this plan →
            </div>
          </button>
        </div>
      </main>
      <Footer onReset={onReset} />
    </div>
  );
}