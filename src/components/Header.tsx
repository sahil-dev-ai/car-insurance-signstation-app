import { Shield } from 'lucide-react';

interface HeaderProps {
  showNav?: boolean;
  onClaimClick?: () => void;
}

export function Header({ showNav = true, onClaimClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-900">CarInsure</span>
          </div>
        
          {showNav && (
            <nav className="flex items-center gap-8 text-gray-700">
              <button 
                onClick={onClaimClick}
                className="hover:text-blue-600 transition-colors"
              >
                Apply for a claim
              </button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}