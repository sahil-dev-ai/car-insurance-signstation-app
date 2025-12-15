import { RotateCcw, Phone } from 'lucide-react';

interface FooterProps {
  onReset: () => void;
}

export function Footer({ onReset }: FooterProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={onReset}
        className="text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        Reset App
      </button>
      <a
        href="https://www.leegality.com/contact-us"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center gap-2"
      >
        <Phone className="w-4 h-4" />
        Contact Us
      </a>
    </div>
  );
}
