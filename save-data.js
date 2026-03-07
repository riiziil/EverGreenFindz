// netlify/functions/save-data.js
// Receives full JSON payload and writes it back to products.json
// Protected by a simple ADMIN_SECRET env variable

const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, x-admin-secret',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  // ── Auth check ──
  const secret = event.headers['x-admin-secret'];
  const expected = process.env.ADMIN_SECRET || 'changeme123';
  if (secret !== expected) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  try {
    const payload = JSON.parse(event.body);

    // Basic validation
    if (!Array.isArray(payload.products) || !Array.isArray(payload.categories)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid payload structure' }) };
    }

    const dataPath = path.join(__dirname, '../../data/products.json');
    fs.writeFileSync(dataPath, JSON.stringify(payload, null, 2), 'utf8');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Data saved successfully' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Could not save data: ' + err.message }),
    };
  }
};
