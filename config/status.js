module.exports = {
  title: 'World Animals API',
  path: '/network',
  healthChecks: [
    {
      protocol: 'http',
      host: 'localhost',
      path: '/',
      port: '3333',
    },
    {
      protocol: 'http',
      host: 'localhost',
      path: '/admin',
      port: '3333',
    },
  ],
};
