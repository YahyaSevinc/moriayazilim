const axios = require('axios');

module.exports = {
  siteUrl: 'https://moriayazilim.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,

  additionalPaths: async () => {
    try {
      const res = await axios.get('https://moriayazilim.com/api/get-blog');
      const posts = res.data;
      console.log('Blog post sayısı:', posts.length);

      return posts.map(post => ({
        loc: `/blog/${post.id}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date(post.updatedAt).toISOString(),
      }));
    } catch (error) {
      console.error('Sitemap için blog verisi alınamadı:', error);
      return [];
    }
  },
};
