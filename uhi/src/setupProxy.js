const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = app => {
	app.use(
		createProxyMiddleware('/branch',
			{
				target: 'http://rudrajit.c.traveltech.dotw.com/dotw/dw/v3/api/v3',
				changeOrigin: true,
			})
	);
	app.use(
		createProxyMiddleware('/getimage',
			{
				target: 'http://rudrajit.c.traveltech.dotw.com/dotw/dw/v3/api/v3',
				changeOrigin: true
			})
	);
}