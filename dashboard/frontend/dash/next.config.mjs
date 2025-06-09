/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/main",
        permanent: true,
      },
    ]
  },
}

export default nextConfig;
