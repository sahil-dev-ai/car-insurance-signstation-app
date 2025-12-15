import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Upload, ArrowRight, Info } from 'lucide-react';
import { Loader } from './Loader';
import { useConsentCollector } from '../hooks/useConsentCollector';
import { prefetchToken } from '../utils/leegalityService';

interface Screen3FormProps {
  onSubmit: () => void;
  onClaimClick: () => void;
  onReset: () => void;
}

export function Screen3Form({ onSubmit, onClaimClick, onReset }: Screen3FormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
  });

  const [files, setFiles] = useState({
    aadhaar: null as File | null,
    pan: null as File | null,
    carPhoto: null as File | null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { openConsentCollector } = useConsentCollector();

  // Pre-fetch token when user has filled required fields
  useEffect(() => {
    if (formData.name && formData.email && formData.mobile && /^[0-9]{10}$/.test(formData.mobile)) {
      // User has filled all required fields - pre-fetch token for faster consent collection
      prefetchToken();
    }
  }, [formData.name, formData.email, formData.mobile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'aadhaar' | 'pan' | 'carPhoto') => {
    if (e.target.files && e.target.files[0]) {
      setFiles({
        ...files,
        [fieldName]: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.mobile) {
      setError('Please enter Name, Email, and Mobile Number before giving consent.');
      return;
    }

    // Validate mobile number (10 digits)
    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsLoading(true);

    // Open consent collector with user details
    openConsentCollector(
      formData.name,
      formData.email,
      formData.mobile,
      () => {
        // Success callback
        setIsLoading(false);
        console.log('✅ Consent collected successfully');
        onSubmit();
      },
      () => {
        // Error callback
        setIsLoading(false);
        setError('Consent collection is mandatory to proceed. Please complete the consent process to continue.');
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading && <Loader />}
      <Header onClaimClick={onClaimClick} />
      
      <main className="max-w-md mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-gray-900 mb-2">
            Insurance Application Form
          </h2>
          <p className="text-gray-600">
            Please fill in your details to proceed
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 space-y-5">
          <div>
            <label htmlFor="name" className="block text-gray-900 mb-2 flex items-center gap-2">
              Policy Holder&apos;s Name <span className="text-red-600">*</span>
              <div className="relative group">
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                <div className="absolute left-6 top-0 hidden group-hover:block bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-20 shadow-lg">
                  You have to enter these details to execute CIS and Proposal
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-900"></div>
                </div>
              </div>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-900 mb-2 flex items-center gap-2">
              Policy Holder&apos;s Email <span className="text-red-600">*</span>
              <div className="relative group">
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                <div className="absolute left-6 top-0 hidden group-hover:block bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-20 shadow-lg">
                  You have to enter these details to execute CIS and Proposal
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-900"></div>
                </div>
              </div>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="mobile" className="block text-gray-900 mb-2 flex items-center gap-2">
              Policy Holder&apos;s Mobile <span className="text-red-600">*</span>
              <div className="relative group">
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                <div className="absolute left-6 top-0 hidden group-hover:block bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-20 shadow-lg">
                  You have to enter these details to execute CIS and Proposal
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-900"></div>
                </div>
              </div>
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="10-digit mobile number"
              pattern="[0-9]{10}"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-gray-900 mb-2">
              Policy Holder&apos;s Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your complete address"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-gray-900 placeholder-gray-400"
            />
          </div>

          <div>
            <label htmlFor="aadhaar" className="block text-gray-900 mb-2">
              Aadhaar Card Upload
            </label>
            <div className="relative">
              <input
                type="file"
                id="aadhaar"
                onChange={(e) => handleFileChange(e, 'aadhaar')}
                accept="image/*,.pdf"
                className="hidden"
              />
              <label
                htmlFor="aadhaar"
                className="flex items-center justify-center gap-2 w-full px-4 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <Upload className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">
                  {files.aadhaar ? files.aadhaar.name : 'Choose file'}
                </span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="pan" className="block text-gray-900 mb-2">
              PAN Card Upload
            </label>
            <div className="relative">
              <input
                type="file"
                id="pan"
                onChange={(e) => handleFileChange(e, 'pan')}
                accept="image/*,.pdf"
                className="hidden"
              />
              <label
                htmlFor="pan"
                className="flex items-center justify-center gap-2 w-full px-4 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <Upload className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">
                  {files.pan ? files.pan.name : 'Choose file'}
                </span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="carPhoto" className="block text-gray-900 mb-2">
              Photo of the Car Upload
            </label>
            <div className="relative">
              <input
                type="file"
                id="carPhoto"
                onChange={(e) => handleFileChange(e, 'carPhoto')}
                accept="image/*"
                className="hidden"
              />
              <label
                htmlFor="carPhoto"
                className="flex items-center justify-center gap-2 w-full px-4 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <Upload className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">
                  {files.carPhoto ? files.carPhoto.name : 'Choose file'}
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 relative"
          >
            Give Consent and do KYC
            <ArrowRight className="w-5 h-5" />
            <span className="absolute -top-8 -right-12 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-3 py-1.5 rounded-lg shadow-lg text-xs whitespace-nowrap pointer-events-none">
              Consent now mandatory for DPDP compliance
              <span className="absolute bottom-0 left-8 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-amber-500 transform translate-y-full"></span>
            </span>
          </button>
        </form>
      </main>
      <Footer onReset={onReset} />
    </div>
  );
}