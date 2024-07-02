module.exports = {
  webpack: {
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: {
          host: '0.0.0.0',
          protocol: 'http:',
          port: 9091,
        },
      },
    },
  },
};
