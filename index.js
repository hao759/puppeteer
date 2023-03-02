const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false }); //false để xem giao diện
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://www.leagueoflegends.com/vi-vn/news/game-updates/", {
    waitUntil: "networkidle2",
  });
  await page.screenshot({ path: "Image" });

  await browser.close();
})();
