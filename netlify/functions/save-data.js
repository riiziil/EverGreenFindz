// netlify/functions/save-data.js
// NOTE: Netlify filesystem is READ-ONLY in production.
// This function cannot persist data. Use the export feature
// in admin.html to download and commit your data to GitHub instead.

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

  const secret = event.headers['x-admin-secret'];
  const expected = process.env.ADMIN_SECRET || 'changeme123';
  if (secret !== expected) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  // Netlify filesystem is read-only — return success so admin doesn't crash.
  // Data is saved to localStorage in the browser instead.
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ 
      success: true, 
      message: 'Saved to browser. Export and commit products-data.json to publish to live site.' 
    }),
  };
};