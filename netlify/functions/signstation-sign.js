const fetch = require("node-fetch");
const FormData = require("form-data");

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
    const { pdfBase64, documentName, signatureCoordinates } = requestBody;

    if (!pdfBase64 || !documentName || !signatureCoordinates) {
      return {
        statusCode: 400,
        headers: corsHeader,
        body: JSON.stringify({
          error: "Missing required fields: pdfBase64, documentName, signatureCoordinates",
        }),
      };
    }

    // Get credentials from environment variables
    const departmentId = process.env.SIGNSTATION_DEPARTMENT_ID;
    const certificateId = process.env.SIGNSTATION_CERTIFICATE_ID;

    if (!departmentId || !certificateId) {
      return {
        statusCode: 500,
        headers: corsHeader,
        body: JSON.stringify({ error: "SignStation department/certificate IDs are missing." }),
      };
    }

    console.log("Signing document:", documentName);

    // Convert base64 to buffer
    const pdfBuffer = Buffer.from(pdfBase64, "base64");

    // Create FormData
    const formData = new FormData();
    formData.append("name", documentName);
    formData.append("file", pdfBuffer, {
      filename: `${documentName}.pdf`,
      contentType: "application/pdf",
    });
    formData.append("departmentId", departmentId);
    formData.append("certificateId", certificateId);

    // Add signature coordinates
    signatureCoordinates.forEach((coord, index) => {
      formData.append(`signatureCoordinates[${index}].xcoordinate`, coord.xcoordinate);
      formData.append(`signatureCoordinates[${index}].ycoordinate`, coord.ycoordinate);
      formData.append(`signatureCoordinates[${index}].pageNumber`, coord.pageNumber);
      formData.append(`signatureCoordinates[${index}].width`, coord.width);
      formData.append(`signatureCoordinates[${index}].height`, coord.height);
    });

    formData.append("location", "India");
    formData.append("reason", "Policy Document Signing");

    // Call SignStation API
    const response = await fetch(
      "https://sign-station.theleegality.com/api/v1/documents/sign",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: "*/*",
          ...formData.getHeaders(),
        },
        body: formData,
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Document signing failed:", responseData);
      return {
        statusCode: response.status,
        headers: corsHeader,
        body: JSON.stringify({
          error: "Document signing failed",
          details: responseData,
        }),
      };
    }

    console.log("Document signed successfully");

    return {
      statusCode: 200,
      headers: corsHeader,
      body: JSON.stringify(responseData),
    };
  } catch (error) {
    console.error("Document signing error:", error);
    return {
      statusCode: 500,
      headers: corsHeader,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
