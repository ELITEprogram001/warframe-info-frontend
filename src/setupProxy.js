const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  
  app.use(
    '/imgs',
    createProxyMiddleware({
      target: 'http://localhost:5055',
      changeOrigin: true,
    })
  );
  
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5055',
      changeOrigin: true,
    })
  );
};