// Just start the backend - src/index.ts handles all server startup

require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs'
  }
});

// Import and start the server
require('./src/index.ts');

// Keep process alive - index.ts starts the server
console.log('[start.js] Backend loaded, keeping process alive...');

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⚠️  Shutting down...');
  setTimeout(() => process.exit(0), 1000);
});
