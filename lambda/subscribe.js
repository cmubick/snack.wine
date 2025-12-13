import https from 'https';

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const MAILCHIMP_SERVER = process.env.MAILCHIMP_SERVER; // e.g., 'us1'

export const handler = async (event) => {
  // Enable CORS
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle CORS preflight
  if (event.requestContext?.http?.method === 'OPTIONS' || event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'OK' }),
    };
  }

  try {
    console.log('Full Event:', JSON.stringify(event, null, 2));
    
    // Handle both HTTP API and REST API formats
    let body = event.body || event.rawBody;
    
    if (!body) {
      console.error('No body in event!');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Request body is empty' }),
      };
    }
    
    // Handle case where body might be base64 encoded
    if (event.isBase64Encoded) {
      body = Buffer.from(body, 'base64').toString('utf-8');
      console.log('Decoded body:', body);
    }
    
    const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
    console.log('Parsed body:', JSON.stringify(parsedBody));
    
    const { email } = parsedBody;
    console.log('Extracted email:', email);

    if (!email || !email.trim?.()) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email is required' }),
      };
    }

    // Subscribe to MailChimp
    const result = await subscribeToMailchimp(email.trim());

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Subscribed successfully' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to subscribe', details: error.message }),
    };
  }
};

function subscribeToMailchimp(email) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      email_address: email,
      status: 'pending',
    });

    const options = {
      hostname: `${MAILCHIMP_SERVER}.api.mailchimp.com`,
      path: `/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
      },
    };

    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        console.log('MailChimp response status:', res.statusCode);
        console.log('MailChimp response body:', body);
        console.log('MailChimp request options:', JSON.stringify({
          hostname: options.hostname,
          path: options.path,
          method: options.method,
        }));
        
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve(JSON.parse(body));
        } else if (res.statusCode === 400) {
          // Check if it's a duplicate email error
          const errorData = JSON.parse(body);
          if (errorData.title === 'Member Exists') {
            console.log('Member already exists in MailChimp');
            resolve({ message: 'Already subscribed' });
          } else {
            reject(new Error(`MailChimp validation error: ${errorData.detail}`));
          }
        } else {
          reject(new Error(`MailChimp API error: ${res.statusCode} - ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}
