/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  env: {
    AMAZON_BOOK_URL: "https://www.amazon.com/Be-Highlight-Small-Actions-Impact-ebook/dp/B0FB9FTCZ9/ref=sr_1_1?crid=IYLLSGMFJ51K&dib=eyJ2IjoiMSJ9.9dL2W8y93t23U7Qbk6cUXyC1iNshFD2T0BIQ2SPR43QRLemhFFOn13LIqfD3NPgXDV0VQhbWhGqtoN7TrzFzeZ6kc75VNIZas8xtPRxI-Eoo0G-ne9qAqy0hb8XG9VtF4NiUuS4O3X1FF2foag7fam1mDGheFeQHe-d78tcWzAKz8MMRvMt8g1a-spFeTeSzox0BsmyroGMqCzSUXhoq2MKyUEndW0yA08a_Rpep76M.CiXYRlN9f2FixNTt8932vPUdBzQJz9xW23649iID8AY&dib_tag=se&keywords=be+the+highlight+book&qid=1751502283&sprefix=be+the+highlight+boo%2Caps%2C134&sr=8-1"
  }
}

module.exports = nextConfig
