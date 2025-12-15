import { Header } from './Header';
import { Footer } from './Footer';
import { FileText, Upload, FileSignature } from 'lucide-react';

interface Screen7ClaimsProps {
  onGoBack: () => void;
  onClaimClick: () => void;
  onReset: () => void;
}

export function Screen7Claims({ onGoBack, onClaimClick, onReset }: Screen7ClaimsProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onClaimClick={onClaimClick} />
      
      <main className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <FileText className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-gray-900 mb-2">
              Claims Portal
            </h1>
            <p className="text-gray-600">
              Submit your insurance claim form with required details
            </p>
          </div>

          <form className="space-y-6">
            {/* Policy Information */}
            <div className="space-y-4">
              <h2 className="text-gray-900 border-b border-gray-200 pb-2">
                Policy Information
              </h2>
              
              <div>
                <label className="block text-gray-700 mb-2">
                  Policy Number
                </label>
                <input
                  type="text"
                  defaultValue="POL-2024-089456"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Insured Vehicle Number
                </label>
                <input
                  type="text"
                  defaultValue="MH 02 AB 1234"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  readOnly
                />
              </div>
            </div>

            {/* Claimant Details */}
            <div className="space-y-4">
              <h2 className="text-gray-900 border-b border-gray-200 pb-2">
                Claimant Details
              </h2>
              
              <div>
                <label className="block text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Rajesh Kumar Sharma"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="rajesh.sharma@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue="+91 98765 43210"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Incident Details */}
            <div className="space-y-4">
              <h2 className="text-gray-900 border-b border-gray-200 pb-2">
                Incident Details
              </h2>
              
              <div>
                <label className="block text-gray-700 mb-2">
                  Date of Incident
                </label>
                <input
                  type="date"
                  defaultValue="2024-12-08"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Location of Incident
                </label>
                <input
                  type="text"
                  defaultValue="M.G. Road, Pune, Maharashtra"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Incident Description
                </label>
                <textarea
                  rows={4}
                  defaultValue="Minor collision with another vehicle while parking. Damage to front bumper and left headlight. No injuries reported. Other party's vehicle had minor scratches."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Estimated Damage Cost
                </label>
                <input
                  type="text"
                  defaultValue="₹ 25,000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Document Upload */}
            <div className="space-y-4">
              <h2 className="text-gray-900 border-b border-gray-200 pb-2">
                Supporting Documents
              </h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-1">Click to upload or drag and drop</p>
                <p className="text-gray-500 text-xs">Photos of damage, FIR copy, repair estimates (Max 10MB each)</p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>Note:</strong> Please upload clear photos of the damaged vehicle, police FIR (if applicable), and repair cost estimates for faster claim processing.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="button"
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <FileSignature className="w-5 h-5" />
                eSign and Submit Claims Form
              </button>
              <p className="text-gray-500 text-center mt-3 text-xs">
                By submitting this form, you agree to the terms and conditions of the claims process
              </p>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onGoBack}
              className="text-blue-600 hover:text-blue-700 underline"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </main>
      <Footer onReset={onReset} />
    </div>
  );
}