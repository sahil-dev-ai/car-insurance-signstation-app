import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { FileText, Car, Shield, Calendar, CreditCard, CheckCircle } from 'lucide-react';
import { Loader } from './Loader';
import { signAndDownloadPolicy, downloadFile } from '../utils/leegalitySignStation';

interface Screen6ProposalProps {
  onGetCISPolicy: () => void;
  onClaimClick: () => void;
  onReset: () => void;
}

export function Screen6Proposal({ onGetCISPolicy, onClaimClick, onReset }: Screen6ProposalProps) {
  const [isSigningPolicy, setIsSigningPolicy] = useState(false);
  const [signingProgress, setSigningProgress] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleViewPolicy = async () => {
    setIsSigningPolicy(true);
    setError(null);
    setSigningProgress('Initializing...');

    try {
      // Sign and get the download URL
      const downloadUrl = await signAndDownloadPolicy(
        'Policy Holder', // In production, use actual user name
        (progress) => setSigningProgress(progress)
      );

      // Download the signed document
      setSigningProgress('Opening signed policy...');
      
      // Open in new tab instead of downloading
      window.open(downloadUrl, '_blank');
      
      setIsSigningPolicy(false);
      setSigningProgress('');
    } catch (err) {
      console.error('Policy signing failed:', err);
      setError('Failed to sign and download policy. Please try again.');
      setIsSigningPolicy(false);
      setSigningProgress('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isSigningPolicy && <Loader message={signingProgress} />}
      <Header onClaimClick={onClaimClick} />
      
      <main className="max-w-md mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <div className="mb-6">
            <h1 className="text-gray-900 mb-2">
              View and eSign the insurance proposal
            </h1>
            <p className="text-gray-600">
              Review your policy details before signing
            </p>
          </div>

          {/* Policy Summary Card */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-900">Proposal Number</p>
                <p className="text-gray-600">PROP2024120001</p>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors relative">
              eSign Proposal
              <span className="absolute -top-8 -right-12 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-3 py-1.5 rounded-lg shadow-lg text-xs whitespace-nowrap pointer-events-none">
                Click button to eSign Proposal
                <span className="absolute bottom-0 left-8 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-amber-500 transform translate-y-full"></span>
              </span>
            </button>
            <a 
              href="#" 
              className="block text-center text-blue-600 hover:text-blue-700 underline mt-2 text-xs"
            >
              Why you need to eSign proposal?
            </a>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* CTA Button - Updated to trigger SignStation workflow */}
          <button
            onClick={handleViewPolicy}
            disabled={isSigningPolicy}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mb-6 disabled:opacity-50 disabled:cursor-not-allowed relative"
          >
            {isSigningPolicy ? 'Processing...' : 'View Policy'}
            <span className="absolute -top-8 -right-12 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-3 py-1.5 rounded-lg shadow-lg text-xs whitespace-nowrap pointer-events-none">
              Click to view and sign policy
              <span className="absolute bottom-0 left-8 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-amber-500 transform translate-y-full"></span>
            </span>
          </button>

          {/* Vehicle Details */}
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3 flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-600" />
              Vehicle Details
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Registration No.</span>
                <span className="text-gray-900">DL-01-AB-1234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Make & Model</span>
                <span className="text-gray-900">Maruti Suzuki Swift</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Year</span>
                <span className="text-gray-900">2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">IDV</span>
                <span className="text-gray-900">₹6,50,000</span>
              </div>
            </div>
          </div>

          {/* Coverage Details */}
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Coverage Details
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900">Own Damage Cover</p>
                  <p className="text-gray-600">Up to ₹6,50,000</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900">Third Party Liability</p>
                  <p className="text-gray-600">Unlimited</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900">Personal Accident Cover</p>
                  <p className="text-gray-600">₹15,00,000</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900">Zero Depreciation</p>
                  <p className="text-gray-600">Included</p>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Period */}
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Policy Period
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Start Date</span>
                <span className="text-gray-900">12 Dec 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">End Date</span>
                <span className="text-gray-900">11 Dec 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="text-gray-900">1 Year</span>
              </div>
            </div>
          </div>

          {/* Premium Breakdown */}
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              Premium Breakdown
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Basic Premium</span>
                <span className="text-gray-900">₹8,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Add-ons</span>
                <span className="text-gray-900">₹2,300</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%)</span>
                <span className="text-gray-900">₹1,944</span>
              </div>
              <div className="border-t border-gray-300 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">Total Premium</span>
                  <span className="text-gray-900">₹12,744</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer onReset={onReset} />
    </div>
  );
}