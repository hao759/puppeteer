const puppeteer = require("puppeteer");
const download = require("image-downloader");
const linkPage =
  "https://www.leagueoflegends.com/vi-vn/news/game-updates/patch-12-22-notes/";
(async () => {
  const browser = await puppeteer.launch();
  console.log("Browser openned");
  const page = await browser.newPage();
  const url = linkPage;
  await page.goto(url);
  console.log("Page loaded");

  const imgLinks = await page.evaluate(() => {
    let imgElements = document.querySelectorAll("a.skins.cboxElement > img");
    imgElements = [...imgElements];
    let imgLinks = imgElements.map((i) => i.getAttribute("src"));
    return imgLinks;
  });
  console.log(imgLinks);

  // Tải các ảnh này về thư mục hiện tại
  await Promise.all(
    imgLinks.map((imgUrl) =>
      download.image({
        url: imgUrl,
        dest: __dirname + "/Image/CapNhatLol",
      })
    )
  );

  await browser.close();
})();
