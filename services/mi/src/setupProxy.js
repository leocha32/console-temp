const { createProxyMiddleware } = require('http-proxy-middleware');

// dev: https://mi-console-api-v2-dev-dkptan5aba-du.a.run.app
// main: https://mi-console-api-v2-prod-dkptan5aba-du.a.run.app
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/', {
      pathRewrite: 'https://mi-console-api-v2-dev-dkptan5aba-du.a.run.app',
      target: 'https://mi-console-api-v2-dev-dkptan5aba-du.a.run.app',
      changeOrigin: true,
      secure: false,
    }),
  );
};
