import { Header } from './Header';
import { Footer } from './Footer';
import { CheckCircle } from 'lucide-react';

interface Screen5KYCDoneProps {
  onSeeProposal: () => void;
  onClaimClick: () => void;
  onReset: () => void;
}

export function Screen5KYCDone({ onSeeProposal, onClaimClick, onReset }: Screen5KYCDoneProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onClaimClick={onClaimClick} />
      
      <main className="max-w-md mx-auto px-6 py-20">
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            
            <h1 className="text-gray-900 mb-8">
              KYC Done
            </h1>
            
            <button
              onClick={onSeeProposal}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              See Proposal
            </button>
          </div>
        </div>
      </main>
      
      <Footer onReset={onReset} />
    </div>
  );
}