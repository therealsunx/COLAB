/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    env: {
        API_KEY: process.env.API_KEY,
        AUTH_DOMAIN: process.env.AUTH_DOMAIN,
        PROJECT_ID: process.env.PROJECT_ID,
        STORAGE_BUCKET: process.env.STORAGE_BUCKET,
        STORAGE_BUCKET: process.env.STORAGE_BUCKET,
        APPID: process.env.APPID,
        MEASUREMENT_ID: process.env.MEASUREMENT_ID
    }
}

module.exports = nextConfig
