/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  resolve: {
    // ...
    fallback: {
      "fs": false,
      "os": false,
      "path": false,
      "net":false,
    }
  }
}


module.exports = nextConfig
