// netlify/functions/get-data.js
// Reads products.json and returns it as JSON API response

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
    // __dirname is /var/task on Netlify, data folder lives at /var/task/data/
    const dataPath = path.join(__dirname, 'data', 'products.json');
    const raw = fs.readFileSync(dataPath, 'utf8');
    return { statusCode: 200, headers, body: raw };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Could not read data: ' + err.message,
        tried: path.join(__dirname, 'data', 'products.json'),
      }),
    };
  }
};