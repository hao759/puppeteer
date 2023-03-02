const puppeteer = require("puppeteer");
const linkPage =
  "https://www.thegioididong.com/game-app/lol-la-gi-co-nghia-gi-trong-tieng-anh-va-cong-dong-game-thu-1336429";
(async () => {
  // Mở trình duyệt mới và tới trang của kenh14
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(linkPage);

  // Chạy đoạn JavaScript trong hàm này, đưa kết quả vào biến article
  const articles = await page.evaluate(() => {
    let titleLinks = document.querySelectorAll("h3.knswli-title > a");
    titleLinks = [...titleLinks];
    let articles = titleLinks.map((link) => ({
      title: link.getAttribute("title"),
      url: link.getAttribute("href"),
    }));
    return articles;
  });

  // In ra kết quả và đóng trình duyệt
  console.log(articles);
  await browser.close();
})();
