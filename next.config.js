const path = require('path')

module.exports = {
  images: {
    domains: ['upload.chalkboard.me']
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {
    optimizeFonts: true,
  },
  plugins: [
    require("autoprefixer"),
  ]
}
