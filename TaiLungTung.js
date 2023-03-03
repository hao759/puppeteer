const puppeteer = require("puppeteer");
const download = require("image-downloader");
const XLSX = require("xlsx");
let imgElements;
const linkPage = "https://adoreyou.vn/anh-gai-xinh-de-thuong-cute/";
(async () => {
  const browser = await puppeteer.launch();
  console.log("Browser openned");
  const page = await browser.newPage();
  const url = linkPage;
  await page.goto(url);
  console.log("Page loaded");

  const imgLinks = await page.evaluate(() => {
    let tempimgElements = document.querySelectorAll("p > img");
    if (tempimgElements.length > 10)
      imgElements = Array.from(tempimgElements).slice(0, 10);
    else imgElements = tempimgElements;

    imgElements = [...imgElements];
    let imgLinks = imgElements.map((i) => i.getAttribute("src"));
    // const imgLinks1 = imgLinks.slice(0, 10);
    return imgLinks;
  });

  console.log(imgLinks);
  //   Tải các ảnh này về thư mục hiện tại
  await Promise.all(
    imgLinks.map((imgUrl) =>
      download.image({
        url: imgUrl,
        dest: __dirname + "/Image/Girls",
      })
    )
  );

  await browser.close();
})();
