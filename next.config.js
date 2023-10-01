/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images:{
    domains:['avatars.githubusercontent.com','lh3.googleusercontent.com','firebasestorage.googleapis.com']
  }
}

module.exports = nextConfig
