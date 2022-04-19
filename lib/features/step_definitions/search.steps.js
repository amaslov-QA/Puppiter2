const puppeter = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement, getText } = require("./lib/commands.js");
const daysWeek = require("./pageTiming.js");
const plases = require("./pageChoiceOfLocation.js");

Before(async function () {
  const browser = await puppeter.launch({ headless: false, slowMo: 70 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});
BeforeAll(
  {
    timeout: 60 * 1000,
  },
  async function () {
    const browser = await puppeteer.launch({ headless: false, slowMo: 70 });
    const page = await browser.newPage();
    this.browser = browser;
    this.page = page;
    await this.page.goto("http://qamid.tmweb.ru/client/index.php", {
      setTimeout: 20000,
    });
    await clickElement(
      page,
      "nav > a:nth-child(2) > span.page-nav__day-number"
    );
    await clickElement(
      page,
      "main > section:nth-child(3) > div:nth-child(2) > ul > li > a"
    );
    await page.waitForSelector("h1", { visible: true });
    await clickElement(
      page,
      "main > section div:nth-child(4) > span:nth-child(4)"
    );
    await clickElement(page, "button");
    await page.waitForNavigation();
    await page.waitForSelector("h1", { timeout: 30 * 1000 });
    await clickElement(page, "button");
    await page.waitForSelector("h1");

    if (this.browser) {
      await this.browser.close();
    }
  }
);

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given(
  "user is on {string} page",
  {
    timeout: 30 * 1000,
  },
  async function (string) {
    return await this.page.goto(`http://qamid.tmweb.ru${string}`, {
      setTimeout: 20000,
    });
  }
);

When(
  "user chooses by {string}",
  {
    timeout: 60 * 1000,
  },
  async function (string) {
    await clickElement(this.page, string);
  }
);

When("user chooses movie {string}", async function (string) {
  return await clickElement(this.page, string);
});

When("user chooses seat {string}", async function (string) {
  return await clickElement(this.page, string);
});

When("user click {string}", async function (string) {
  return await clickElement(this.page, string);
});

Then("user sees text {string}", async function (string) {
  const actual = await getText(this.page, "h2");
  const expected = await string;
  expect(actual).contains(expected);
});

Then("user sees the reserved seat {string}", async function (string) {
  const actual = await getText(
    this.page,
    "main > section > div > p:nth-child(2) > span"
  );
  const expected = await string;
  expect(actual).contains(expected);
});

Then("user sees the header {string}", async function (string) {
  const actual = await getText(this.page, "h2");
  const expected = await string;
  expect(actual).contains(expected);
});

Then(
  "user sees {string} is gray",
  {
    timeout: 60 * 1000,
  },
  async function (string) {
    await clickElement(this.page, string);
    const disabledButton = await page.$("button[disabled]");
    const isDisabled = disabledButton !== null;
    await expect(isDisabled).to.not.be.null;
  }
);
