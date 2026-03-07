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
    const dataPath = path.join(process.env.LAMBDA_TASK_ROOT || path.join(__dirname, '../..'), 'data/products.json');
    const raw = fs.readFileSync(dataPath, 'utf8');
    return {
      statusCode: 200,
      headers,
      body: raw,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Could not read data: ' + err.message }),
    };
  }
};