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
        "Access-Control-Allow-Headers": "Content-Type",
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
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  try {
    // Read your credentials from environment variables
    const clientId = process.env.SIGNSTATION_CLIENT_ID;
    const clientSecret = process.env.SIGNSTATION_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return {
        statusCode: 500,
        headers: corsHeader,
        body: JSON.stringify({ error: "SignStation credentials are missing." }),
      };
    }

    console.log("Requesting SignStation auth token...");

    const response = await fetch(
      "https://sign-station.theleegality.com/api/v1/auth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: clientId,
          clientSecret: clientSecret,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Auth failed:", responseData);
      return {
        statusCode: response.status,
        headers: corsHeader,
        body: JSON.stringify({
          error: "SignStation auth failed",
          details: responseData,
        }),
      };
    }

    if (!responseData.data || !responseData.data.accessToken) {
      return {
        statusCode: 500,
        headers: corsHeader,
        body: JSON.stringify({
          error: "No access token returned",
          details: responseData,
        }),
      };
    }

    console.log("SignStation auth successful");

    return {
      statusCode: 200,
      headers: corsHeader,
      body: JSON.stringify(responseData),
    };
  } catch (error) {
    console.error("SignStation auth error:", error);
    return {
      statusCode: 500,
      headers: corsHeader,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
