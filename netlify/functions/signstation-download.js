const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  // Define allowed origins
  const allowedOrigins = [
    "https://leegality.webflow.io",
    "https://www.leegality.com",
    "https://consentin.webflow.io",
    "https://consent.in",
    "https://www.consent.in",
    "https://customer-onboarding-app.netlify.app",
    "https://5chdjf-5000.csb.app",
    "https://digital-lending-app.figma.site",
    "https://digital-lending.figma.site",
    "https://*.figma.site",
    "https://yournaukri-hr-demo.netlify.app",
    "https://car-insurance-app.figma.site",
    "https://szvwdt-5173.csb.app",
  ];

  const requestOrigin = event.headers.origin || "";

  // Handle preflight (OPTIONS) requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigins.includes(requestOrigin)
          ? requestOrigin
          : "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
      body: "",
    };
  }

  // Check if the request origin is allowed
  if (!allowedOrigins.includes(requestOrigin)) {
    return {
      statusCode: 403,
      headers: { "Access-Control-Allow-Origin": requestOrigin || "*" },
      body: JSON.stringify({ error: "Origin not allowed" }),
    };
  }

  // Set the CORS header
  const corsHeader = {
    "Access-Control-Allow-Origin": requestOrigin,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  try {
    // Get the access token from the request header
    const authHeader = event.headers.authorization;
    if (!authHeader) {
      return {
        statusCode: 401,
        headers: corsHeader,
        body: JSON.stringify({ error: "Authorization header missing" }),
      };
    }

    const accessToken = authHeader.replace("Bearer ", "");

    // Parse the request body
    const requestBody = JSON.parse(event.body);
    const { documentId } = requestBody;

    if (!documentId) {
      return {
        statusCode: 400,
        headers: corsHeader,
        body: JSON.stringify({ error: "Missing required field: documentId" }),
      };
    }

    console.log("Getting download URL for document:", documentId);

    // Call SignStation API
    const response = await fetch(
      `https://sign-station.theleegality.com/api/v1/documents/${documentId}/document-download-url`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Failed to get download URL:", responseData);
      return {
        statusCode: response.status,
        headers: corsHeader,
        body: JSON.stringify({
          error: "Failed to get download URL",
          details: responseData,
        }),
      };
    }

    console.log("Download URL retrieved successfully");

    return {
      statusCode: 200,
      headers: corsHeader,
      body: JSON.stringify(responseData),
    };
  } catch (error) {
    console.error("Download URL error:", error);
    return {
      statusCode: 500,
      headers: corsHeader,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
