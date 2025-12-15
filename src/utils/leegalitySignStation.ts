// Leegality SignStation Service
// Handles authentication, document signing, and document download via Netlify Functions

// Configuration - Use Netlify Functions as proxy
const SIGN_STATION_CONFIG = {
  // These are Netlify function endpoints
  authUrl: '/.netlify/functions/signstation-auth',
  signUrl: '/.netlify/functions/signstation-sign',
  downloadUrl: '/.netlify/functions/signstation-download',
};

// Signature coordinates for the policy document (3 pages)
const POLICY_SIGNATURE_COORDINATES = [
  {
    xcoordinate: '484.78228782287823',
    ycoordinate: '30.15498154981526',
    pageNumber: '1',
    width: '112.91512915129151',
    height: '45.16605166051662',
  },
  {
    xcoordinate: '481.77121771217713',
    ycoordinate: '32.41328413284111',
    pageNumber: '2',
    width: '112.91512915129151',
    height: '45.16605166051662',
  },
  {
    xcoordinate: '141.52029520295204',
    ycoordinate: '120.48708487084855',
    pageNumber: '3',
    width: '112.91512915129151',
    height: '45.16605166051662',
  },
];

// Cache for the access token
let cachedToken: { token: string; expiry: number } | null = null;

/**
 * Get authentication token from SignStation API via Netlify Function
 */
async function getAuthToken(): Promise<string> {
  const now = Date.now();

  // Check if we have a valid cached token
  if (cachedToken && cachedToken.expiry > now) {
    console.log('✅ Using cached SignStation token');
    return cachedToken.token;
  }

  console.log('🔐 Fetching new SignStation auth token via Netlify Function...');

  try {
    const response = await fetch(SIGN_STATION_CONFIG.authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Auth failed:', errorText);
      throw new Error(`Auth failed: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Auth response received');

    // Response format: { code, message, data: { accessToken, tokenType, expiresIn } }
    if (!result.data || !result.data.accessToken) {
      throw new Error('No access token received from auth endpoint');
    }

    // Cache token
    const expiresInMs = (result.data.expiresIn || 1800) * 1000;
    cachedToken = {
      token: result.data.accessToken,
      expiry: now + expiresInMs - 5 * 60 * 1000, // Refresh 5 min before expiry
    };

    console.log('✅ SignStation auth token cached');
    return result.data.accessToken;
  } catch (error) {
    console.error('❌ SignStation auth failed:', error);
    throw error;
  }
}

/**
 * Sign a document using SignStation API via Netlify Function
 */
async function signDocument(
  pdfBlob: Blob,
  documentName: string,
  signerName: string
): Promise<string> {
  console.log('📝 Signing document:', documentName);

  const token = await getAuthToken();

  try {
    // Convert blob to base64 for transmission
    const pdfBase64 = await blobToBase64(pdfBlob);

    console.log('Sending sign request with', POLICY_SIGNATURE_COORDINATES.length, 'signature coordinates');

    const response = await fetch(SIGN_STATION_CONFIG.signUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        pdfBase64: pdfBase64,
        documentName: documentName,
        signatureCoordinates: POLICY_SIGNATURE_COORDINATES,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Sign response error:', errorText);
      throw new Error(`Document signing failed: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Sign response:', result);

    // Extract document ID from response
    const documentId = result.data?.id || result.data?.documentId || result.id;

    if (!documentId) {
      console.error('Unexpected response format:', result);
      throw new Error('No document ID received after signing');
    }

    console.log('✅ Document signed successfully, ID:', documentId);
    return documentId;
  } catch (error) {
    console.error('❌ Document signing failed:', error);
    throw error;
  }
}

/**
 * Get signed document download URL via Netlify Function
 */
async function getDocumentDownloadUrl(documentId: string): Promise<string> {
  console.log('📥 Getting download URL for document:', documentId);

  const token = await getAuthToken();

  try {
    const response = await fetch(SIGN_STATION_CONFIG.downloadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        documentId: documentId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Download response error:', errorText);
      throw new Error(`Failed to get download URL: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Download URL response:', result);

    // Response format: { code, message, data: "url_string" }
    const downloadUrl = result.data;

    if (!downloadUrl || typeof downloadUrl !== 'string') {
      console.error('Unexpected response format:', result);
      throw new Error('No download URL in response');
    }

    console.log('✅ Download URL received');
    return downloadUrl;
  } catch (error) {
    console.error('❌ Failed to get download URL:', error);
    throw error;
  }
}

/**
 * Complete workflow: Sign document and return download URL
 */
export async function signAndDownloadPolicy(
  userName: string,
  onProgress?: (step: string) => void
): Promise<string> {
  try {
    // Step 1: Create a policy PDF
    onProgress?.('Generating your policy document...');
    const policyPdf = await generateMockPolicyPdf(userName);

    // Step 2: Sign the document
    onProgress?.('Digitally signing your policy...');
    const documentId = await signDocument(policyPdf, `Policy_${userName}`, userName);

    // Small delay to ensure document is processed
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Step 3: Get download URL
    onProgress?.('Preparing download...');
    const downloadUrl = await getDocumentDownloadUrl(documentId);

    onProgress?.('Complete!');
    return downloadUrl;
  } catch (error) {
    console.error('❌ Sign and download workflow failed:', error);
    throw error;
  }
}

/**
 * Helper: Convert Blob to Base64
 */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:application/pdf;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Generate a mock policy PDF for demo purposes
 */
async function generateMockPolicyPdf(userName: string): Promise<Blob> {
  const pdfContent = `
%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R 4 0 R 5 0 R]
/Count 3
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 6 0 R
>>
endobj
4 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 7 0 R
>>
endobj
5 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 8 0 R
>>
endobj
6 0 obj
<<
/Length 200
>>
stream
BT
/F1 24 Tf
100 700 Td
(Car Insurance Policy - Page 1) Tj
/F1 14 Tf
0 -30 Td
(Policy Holder: ${userName}) Tj
0 -30 Td
(Policy Number: POL-2024-${Date.now()}) Tj
0 -30 Td
(Coverage: Comprehensive) Tj
0 -30 Td
(Premium: Rs. 12,000/-) Tj
ET
endstream
endobj
7 0 obj
<<
/Length 150
>>
stream
BT
/F1 24 Tf
100 700 Td
(Car Insurance Policy - Page 2) Tj
/F1 14 Tf
0 -30 Td
(Terms and Conditions) Tj
0 -30 Td
(1. Coverage Details) Tj
0 -30 Td
(2. Exclusions) Tj
0 -30 Td
(3. Claim Process) Tj
ET
endstream
endobj
8 0 obj
<<
/Length 150
>>
stream
BT
/F1 24 Tf
100 700 Td
(Car Insurance Policy - Page 3) Tj
/F1 14 Tf
0 -30 Td
(Declaration and Signature) Tj
0 -30 Td
(I agree to the terms mentioned above.) Tj
0 -30 Td
(Signature: ________________) Tj
0 -30 Td
(Date: ${new Date().toLocaleDateString()}) Tj
ET
endstream
endobj
xref
0 9
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000214 00000 n 
0000000313 00000 n 
0000000412 00000 n 
0000000662 00000 n 
0000000862 00000 n 
trailer
<<
/Size 9
/Root 1 0 R
>>
startxref
1062
%%EOF
  `.trim();

  return new Blob([pdfContent], { type: 'application/pdf' });
}

/**
 * Download a file from a URL
 */
export function downloadFile(url: string, filename: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
