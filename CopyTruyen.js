const puppeteer = require("puppeteer");
const download = require("image-downloader");
const XLSX = require("xlsx");
let imgElements;
const linkPage =
  "https://animesouls.com/top-7-wood-style-users-in-naruto/?fbclid=IwAR3ClAp0c_vjrQINxB4mK8bGy_kkupL7JFsH4cyj_XiceqEmojs43WiwSmM";
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
        dest: __dirname + "/Image/Truyen",
      })
    )
  );

  await browser.close();
})();
