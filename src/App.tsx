import { useState } from 'react';
import { Screen1Home } from './components/Screen1Home';
import { Screen2Select } from './components/Screen2Select';
import { Screen3Form } from './components/Screen3Form';
import { Screen4KYC } from './components/Screen4KYC';
import { Screen5KYCDone } from './components/Screen5KYCDone';
import { Screen6Proposal } from './components/Screen6Proposal';
import { Screen7Claims } from './components/Screen7Claims';
import { PlaceholderESign } from './components/PlaceholderESign';
import { ConsentSDKLoader } from './components/ConsentSDKLoader';

export type Screen = 'home' | 'select' | 'form' | 'kyc-done' | 'proposal' | 'kyc' | 'esign' | 'claims';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [carNumber, setCarNumber] = useState('');

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const resetApp = () => {
    setCurrentScreen('home');
    setCarNumber('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ConsentSDKLoader />
      {currentScreen === 'home' && (
        <Screen1Home 
          onGetQuote={(carNum) => {
            setCarNumber(carNum);
            navigateTo('select');
          }}
          onClaimClick={() => navigateTo('claims')}
          onReset={resetApp}
        />
      )}
      {currentScreen === 'select' && (
        <Screen2Select 
          onSelect={() => navigateTo('form')}
          onClaimClick={() => navigateTo('claims')}
          onReset={resetApp}
        />
      )}
      {currentScreen === 'form' && (
        <Screen3Form 
          onSubmit={() => navigateTo('kyc-done')}
          onClaimClick={() => navigateTo('claims')}
          onReset={resetApp}
        />
      )}
      {currentScreen === 'kyc' && (
        <Screen4KYC 
          onPayment={() => {}}
          onESign={() => navigateTo('esign')}
          onReset={resetApp}
          onClaimClick={() => navigateTo('claims')}
        />
      )}
      {currentScreen === 'esign' && (
        <PlaceholderESign onBack={() => navigateTo('kyc')} />
      )}
      {currentScreen === 'kyc-done' && (
        <Screen5KYCDone 
          onSeeProposal={() => navigateTo('proposal')}
          onClaimClick={() => navigateTo('claims')}
          onReset={resetApp}
        />
      )}
      {currentScreen === 'proposal' && (
        <Screen6Proposal 
          onGetCISPolicy={() => navigateTo('kyc')}
          onClaimClick={() => navigateTo('claims')}
          onReset={resetApp}
        />
      )}
      {currentScreen === 'claims' && (
        <Screen7Claims 
          onGoBack={() => navigateTo('home')}
          onClaimClick={() => navigateTo('claims')}
          onReset={resetApp}
        />
      )}
    </div>
  );
}

export default App;