// Netlify Function to sign documents via SignStation
// This proxies the request to avoid CORS issues

import type { Handler, HandlerEvent } from "@netlify/functions";

export const handler: Handler = async (event: HandlerEvent) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const {
      token,
      documentName,
      pdfBase64,
      signerName,
      departmentId,
      certificateId,
      signatureCoordinates,
    } = body;

    // Convert base64 PDF back to blob
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');
    
    // Create FormData
    const FormData = require('form-data');
    const formData = new FormData();
    
    formData.append('name', documentName);
    formData.append('file', pdfBuffer, {
      filename: `${documentName}.pdf`,
      contentType: 'application/pdf',
    });
    formData.append('departmentId', departmentId);
    formData.append('certificateId', certificateId);
    formData.append('signerName', signerName);
    formData.append('location', 'India');
    formData.append('reason', 'Policy Document Signing');

    // Add signature coordinates
    signatureCoordinates.forEach((coord: any, index: number) => {
      formData.append(`signatureCoordinates[${index}].xcoordinate`, coord.xcoordinate);
      formData.append(`signatureCoordinates[${index}].ycoordinate`, coord.ycoordinate);
      formData.append(`signatureCoordinates[${index}].pageNumber`, coord.pageNumber);
      formData.append(`signatureCoordinates[${index}].width`, coord.width);
      formData.append(`signatureCoordinates[${index}].height`, coord.height);
    });

    const response = await fetch(
      'https://sign-station.theleegality.com/api/v1/documents/sign',
      {
        method: 'POST',
        headers: {
          ...formData.getHeaders(),
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const responseText = await response.text();
    let data;
    
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { rawResponse: responseText };
    }

    return {
      statusCode: response.ok ? 200 : response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error: any) {
    console.error('SignStation sign error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Failed to sign document', details: error.message }),
    };
  }
};