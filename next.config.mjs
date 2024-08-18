/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'travel-journal-api-bootcamp.do.dibimbing.id',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
