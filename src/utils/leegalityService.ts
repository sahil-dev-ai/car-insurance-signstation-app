// Leegality Consent Collection Service
// This file handles all consent-related API calls and popup logic

// Cache for the access token to avoid repeated fetches
let cachedToken: { token: string; expiry: number } | null = null;

/**
 * Pre-fetch the access token to speed up consent collection
 */
export async function prefetchToken(): Promise<void> {
  try {
    // Only fetch if we don't have a cached token or it's expired
    const now = Date.now();
    if (cachedToken && cachedToken.expiry > now) {
      console.log('✅ Using cached token');
      return;
    }

    console.log('🔄 Pre-fetching access token...');
    const res = await fetch("https://consent-token-fetch.netlify.app/.netlify/functions/getToken");
    const data = await res.json();
    
    if (data.access_token) {
      // Cache token for 50 minutes (tokens usually expire in 60 minutes)
      cachedToken = {
        token: data.access_token,
        expiry: now + (50 * 60 * 1000)
      };
      console.log('✅ Token pre-fetched and cached');
    }
  } catch (err) {
    console.error("⚠️ Token pre-fetch failed (will retry when needed):", err);
  }
}

/**
 * Get access token (from cache or fetch new one)
 */
async function getAccessToken(): Promise<string> {
  const now = Date.now();
  
  // Check if we have a valid cached token
  if (cachedToken && cachedToken.expiry > now) {
    console.log('✅ Using cached token (fast path)');
    return cachedToken.token;
  }

  // Fetch new token
  console.log('📡 Fetching fresh access token...');
  const res = await fetch("https://consent-token-fetch.netlify.app/.netlify/functions/getToken");
  const data = await res.json();
  
  if (!data.access_token) {
    throw new Error("Failed to retrieve access token");
  }
  
  // Cache the new token
  cachedToken = {
    token: data.access_token,
    expiry: now + (50 * 60 * 1000)
  };
  
  console.log('✅ Fresh token received and cached');
  return data.access_token;
}

/**
 * Main function to collect consent from user
 * This follows the exact flow from the working implementation
 */
export async function collectConsent(
  name: string,
  email: string,
  phone: string,
  onSuccess: () => void,
  onError: () => void
) {
  try {
    // Step 1: Get access token (cached or fresh)
    const token = await getAccessToken();
    
    // Step 2: Trigger consent with the token
    await triggerConsent(token, name, email, phone, onSuccess, onError);
  } catch (err) {
    console.error("❌ Token fetch failed:", err);
    onError();
  }
}

/**
 * Registers consent with Leegality API and opens the consent collector
 */
async function triggerConsent(
  token: string,
  name: string,
  email: string,
  phone: string,
  onSuccess: () => void,
  onError: () => void
) {
  const currentCpid = `${email}-${Date.now()}`;

  try {
    console.log('📝 Registering consent...');
    
    // Step 3: Register consent with Leegality API
    const response = await fetch(
      "https://sandbox-gateway.leegality.com/consent-runner/api/v1/consents/client/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          consentProfileId: "976aad88-d8ac-4749-af09-dbe1bd000375",
          consentProfileVersion: 1,
          principal: { 
            id: currentCpid, 
            email: email, 
            name: name, 
            phone: phone 
          },
          publicUrlExpiry: 60,
          sessionExpiry: 60
        })
      }
    );

    const registerData = await response.json();
    const consentUrl = registerData?.data?.consentCollectUrl;

    if (!consentUrl) {
      throw new Error("Could not retrieve consent URL.");
    }

    console.log("✅ Consent URL retrieved:", consentUrl);

    // Step 4: Wait for SDK to load and open consent collector (faster polling)
    let attempts = 0;
    const checkSDK = setInterval(() => {
      attempts++;
      if (window.LeegalityConsentCollector) {
        clearInterval(checkSDK);
        console.log(`✅ SDK loaded after ${attempts} attempts`);
        openConsentCollector(consentUrl, onSuccess, onError);
      } else if (attempts > 50) {
        // 50 attempts * 100ms = 5 seconds max wait
        clearInterval(checkSDK);
        console.error("❌ SDK failed to load after 50 attempts (5 seconds)");
        onError();
      }
    }, 100); // Reduced from 200ms to 100ms for faster response
    
  } catch (err: any) {
    console.error("❌ Consent registration failed:", err);
    onError();
  }
}

/**
 * Opens the Leegality consent collector popup
 */
function openConsentCollector(
  consentUrl: string,
  onSuccess: () => void,
  onError: () => void
) {
  try {
    console.log('🚀 Opening consent collector...');
    
    // Step 5: Initialize and open the consent collector popup
    const collector = new window.LeegalityConsentCollector({ url: consentUrl });
    
    collector.on("response", (resp: any) => {
      console.log("📬 Consent SDK response:", resp);
      
      if (resp?.type === "consentCollect.success") {
        console.log("✅ Consent accepted, proceeding");
        onSuccess();
      } else {
        console.log("❌ Consent rejected/cancelled");
        onError();
      }
    });

    // Small delay before opening to ensure collector is ready
    setTimeout(() => {
      collector.open();
    }, 100);
    
  } catch (err: any) {
    console.error("❌ Failed to open consent collector:", err);
    onError();
  }
}