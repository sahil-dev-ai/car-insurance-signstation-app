import { Header } from './Header';
import { Footer } from './Footer';
import { CheckCircle, FileSignature, CreditCard, RotateCcw, Phone } from 'lucide-react';

interface Screen4KYCProps {
  onPayment: () => void;
  onESign: () => void;
  onReset: () => void;
  onClaimClick: () => void;
}

export function Screen4KYC({ onPayment, onESign, onReset, onClaimClick }: Screen4KYCProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onClaimClick={onClaimClick} />
      
      <main className="max-w-md mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-gray-900">
              Congratulations, you are 2 steps away from getting your policy
            </h2>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex gap-4 items-start bg-blue-50 p-5 rounded-xl border border-blue-100">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-1">
                  Pay for the policy and eSign the proposal
                </h3>
                <p className="text-gray-600">
                  Complete payment and digitally sign your insurance proposal
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start bg-blue-50 p-5 rounded-xl border border-blue-100">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-1">
                  eSign the CIS
                </h3>
                <p className="text-gray-600">
                  Digitally sign the Customer Information Sheet
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <FileSignature className="w-5 h-5" />
              eSign the CIS
            </button>
            <a 
              href="#" 
              className="block text-center text-blue-600 hover:text-blue-700 underline mt-2 mb-4 pb-4 border-b border-gray-200 text-xs"
            >
              Why CIS needs to be eSigned
            </a>

            <div className="relative">
              <button
                onClick={onPayment}
                className="w-full bg-white text-blue-600 border border-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                View Policy
              </button>
              <div className="absolute -top-3 -right-16 bg-amber-400 text-amber-900 px-2 py-1 rounded text-xs whitespace-nowrap animate-bounce shadow-md">
                Automatically eSigned via SignStation
              </div>
            </div>
            <a 
              href="#" 
              className="block text-center text-blue-600 hover:text-blue-700 underline mt-2 text-xs"
            >
              Why you need to eSign Policies
            </a>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
            <p className="text-gray-700">
              You will receive both the eSigned proposal and CIS on your email, SMS and WhatsApp.
            </p>
          </div>
        </div>
      </main>
      <Footer onReset={onReset} />
    </div>
  );
}