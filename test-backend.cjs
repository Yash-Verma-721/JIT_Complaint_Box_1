const http = require('http');

console.log('Testing connection to http://localhost:5000/health...');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/health',
  method: 'GET',
  timeout: 3000
};

const req = http.request(options, (res) => {
  console.log('✅ Connected! Status:', res.statusCode);
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log('Response:', data);
    process.exit(0);
  });
});

req.on('error', (err) => {
  console.log('❌ Error:', err.code, '-', err.message);
  process.exit(1);
});

req.on('timeout', () => {
  console.log('❌ Timeout: Connection timed out');
  process.exit(1);
});

req.end();
