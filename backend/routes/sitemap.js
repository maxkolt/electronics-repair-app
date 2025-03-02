const express = require("express");
const router = express.Router();

router.get("/sitemap.xml", (req, res) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
        <loc>https://onorrem.ru/</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <priority>1.0</priority>
     </url>
     <url>
        <loc>https://onorrem.ru/services</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <priority>0.8</priority>
     </url>
     <url>
        <loc>https://onorrem.ru/contact</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <priority>0.8</priority>
     </url>
  </urlset>`;

  res.header("Content-Type", "application/xml");
  res.send(sitemap);
});

module.exports = router;
