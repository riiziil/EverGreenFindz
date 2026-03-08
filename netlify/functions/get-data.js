// netlify/functions/get-data.js
// Netlify filesystem is read-only — data lives alongside this function file.

const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // products-data.json lives in the same folder as this function
    const dataPath = path.join(__dirname, 'products-data.json');
    const raw = fs.readFileSync(dataPath, 'utf8');
    return { statusCode: 200, headers, body: raw };
  } catch (err) {
    // Return empty data structure if file not found
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ categories: [], products: [] }),
    };
  }
};