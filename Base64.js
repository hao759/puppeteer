const puppeteer = require("puppeteer");
const download = require("image-downloader");
const { Blob } = require("blob");
let imgElements;
const linkPage =
  "https://www.google.com/search?q=anhr+gais&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiBuLmQrr_9AhWA7TgGHSIeB_QQ_AUoAXoECAIQAw&biw=1280&bih=577&dpr=1.5";

(async () => {
  const browser = await puppeteer.launch();
  console.log("Browser openned");
  const page = await browser.newPage();
  const url = linkPage;
  await page.goto(url);
  console.log("Page loaded");

  const imgLinks = await page.evaluate(() => {
    let tempimgElements = document.querySelectorAll("div.islir img");
    if (tempimgElements.length > 10)
      imgElements = Array.from(tempimgElements).slice(0, 10);
    else imgElements = tempimgElements;

    imgElements = [...imgElements];
    let imgLinks = imgElements.map((i) => i.getAttribute("src"));
    // const imgLinks1 = imgLinks.slice(0, 10);
    return imgLinks;
  });

  // console.log(imgLinks);
  imgLinks.forEach(async (base64Data, i) => {
    const uint8Array = Uint8Array.from(atob(base64Data.split(",")[1]), (c) =>
      c.charCodeAt(0)
    );
    await page.evaluate(
      (url, data, i) => {
        const a = document.createElement("a");
        a.href = url;
        a.download = `image${i}.png`;
        a.style.display = "none";
        document.body.appendChild(a);
        const blob = new Blob([data], { type: "image/png" });
        a.href = URL.createObjectURL(blob);
        a.click();
        console.log("a");
        URL.revokeObjectURL(a.href);
        document.body.removeChild(a);
      },

      URL.createObjectURL(new Blob([uint8Array], { type: "image/png" })),
      uint8Array,
      i
    );
  });

  await browser.close();
})();
