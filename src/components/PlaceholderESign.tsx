import { Header } from './Header';
import { FileSignature, ArrowLeft, CheckCircle, FileText } from 'lucide-react';

interface PlaceholderESignProps {
  onBack: () => void;
}

export function PlaceholderESign({ onBack }: PlaceholderESignProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-md mx-auto px-6 py-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <FileSignature className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-gray-900 mb-2">
              eSign Customer Information Sheet
            </h2>
            <p className="text-gray-600">
              Digitally sign your CIS document
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-6 mb-8 bg-gray-50">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-gray-600" />
              <h3 className="text-gray-900">
                Document Preview
              </h3>
            </div>
            <div className="bg-white rounded-lg p-8 mb-6 text-center border border-gray-200">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-1">[CIS Document Preview]</p>
              <p className="text-gray-500">Customer Information Sheet</p>
            </div>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between bg-white p-3 rounded-lg border border-gray-200">
                <span>Document Type:</span>
                <span>Customer Information Sheet</span>
              </div>
              <div className="flex justify-between bg-white p-3 rounded-lg border border-gray-200">
                <span>Policy Number:</span>
                <span>POL2024123456</span>
              </div>
              <div className="flex justify-between bg-white p-3 rounded-lg border border-gray-200">
                <span>Date:</span>
                <span>December 8, 2025</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-gray-700">I have read and understood the terms</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-gray-700">All information provided is accurate</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-gray-700">I consent to digital signature</span>
              </li>
            </ul>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <FileSignature className="w-5 h-5" />
            Sign Document
          </button>

          <p className="text-center text-gray-400 mt-6">
            [Placeholder: eSign integration would be implemented here]
          </p>
        </div>
      </main>
    </div>
  );
}