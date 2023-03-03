const puppeteer = require("puppeteer");
// const download = require("image-downloader");
// const XLSX = require("xlsx");

const linkPage = "http://daotao.hutech.edu.vn/";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  console.log("Browser openned");
  const page = await browser.newPage();
  const url = linkPage;
  await page.goto(url);
  console.log("Page loaded");

  await page.waitForSelector(
    "#ctl00_ContentPlaceHolder1_ctl00_ucDangNhap_txtTaiKhoa"
  );
  await page.type(
    "#ctl00_ContentPlaceHolder1_ctl00_ucDangNhap_txtTaiKhoa",
    `1911062419`
  );
  await page.waitForSelector(
    "#ctl00_ContentPlaceHolder1_ctl00_ucDangNhap_txtMatKhau"
  );
  await page.type(
    "#ctl00_ContentPlaceHolder1_ctl00_ucDangNhap_txtMatKhau",
    `PhaVoLinhKhi9`
  );
  await page.click("#ctl00_ContentPlaceHolder1_ctl00_ucDangNhap_btnDangNhap");
  // const articles = await page.evaluate(async () => {
  //   try {
  //     // document.querySelector(
  //     //   "#ctl00_ContentPlaceHolder1_ctl00_ucDangNhap_txtTaiKhoa"
  //     // ).value = "1911062419";

  //     // document.querySelector(
  //     //   "#content > div > div.col-xs-12.col-sm-12.col-md-5.col-lg-4 > div > form > fieldset > section:nth-child(2) > label.input > input"
  //     // ).value = "1911062419";

  await new Promise((r) => setTimeout(r, 8000));
  //     //   return zz;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });
  // console.log(articles);
  // await browser.close();
})();
