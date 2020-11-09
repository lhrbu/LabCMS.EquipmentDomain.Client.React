const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            // target: 'http://10.99.159.149/',
            target:'http://localhost:5050/',
            changeOrigin: true,
            secure:false
        })
    );
};