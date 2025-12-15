import { useCallback } from 'react';
import { collectConsent } from '../utils/leegalityService';

export function useConsentCollector() {
  const openConsentCollector = useCallback((
    name: string,
    email: string,
    phone: string,
    onSuccess: () => void,
    onError: () => void
  ) => {
    console.log('📞 Opening consent collector for:', { name, email, phone });
    collectConsent(name, email, phone, onSuccess, onError);
  }, []);

  return {
    openConsentCollector
  };
}