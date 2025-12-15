import { useEffect } from 'react';

/**
 * Component that loads consent SDK scripts into the document
 * This component doesn't render anything, it just handles script loading
 */
export function ConsentSDKLoader() {
  useEffect(() => {
    // Load Leegality Consent SDKs
    const consentScript1 = document.createElement('script');
    consentScript1.src = 'https://sdk.consent.in/consent-collect-sdk.min.js';
    consentScript1.async = true;
    document.head.appendChild(consentScript1);

    const consentScript2 = document.createElement('script');
    consentScript2.src = 'https://web-sdk.leegality.com/v1/consent/consent-sdk.js';
    consentScript2.async = true;
    document.head.appendChild(consentScript2);

    return () => {
      // Cleanup on unmount
      if (consentScript1.parentNode) consentScript1.parentNode.removeChild(consentScript1);
      if (consentScript2.parentNode) consentScript2.parentNode.removeChild(consentScript2);
    };
  }, []);

  return null; // This component doesn't render anything
}