const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    process.env.REACT_APP_ENV === 'LOCALHOST' ?
        app.use(
            '/api',
            createProxyMiddleware({
                target: 'http://localhost:3001/',
                changeOrigin: true
            })
        )
        :
        app.use(
            '/api',
            createProxyMiddleware({
                target: 'http://form.api.jiangtao.website/',
                changeOrigin: true
            })
        )
}
