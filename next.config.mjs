/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/backend-api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'}/:path*`,
      },
    ];
  },
  basePath:
    process.env.NEXT_PUBLIC_DEFAULT_PATHNAME === '/'
      ? ''
      : process.env.NEXT_PUBLIC_DEFAULT_PATHNAME,
};

export default nextConfig;
