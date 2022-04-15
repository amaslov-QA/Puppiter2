const { clickElement, getText } = require("./lib/commands.js");
const daysWeek = require("./pageTiming.js");

const plases = require("./pageChoiceOfLocation.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000);
});

afterEach(() => {
  page.close();
});

describe("Ticket booking", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php", {
      timeout: 60000,
    });
  });
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php", {
      timeout: 60000,
    });
    await clickElement(page, daysWeek.secondDay);
    await clickElement(page, daysWeek.movi3Day);
    await page.waitForSelector("h2");
    await clickElement(page, plases.row2Plase5);
    await clickElement(page, "button");
    await page.waitForSelector("h1");
    await clickElement(page, "button");
    await page.waitForSelector("h1");
  }, 60000);

  test("Booking one place", async () => {
    await clickElement(page, daysWeek.fifthDay);
    await clickElement(page, daysWeek.movi1Evening);
    await page.waitForSelector("h1");
    await clickElement(page, plases.row1PlaseVip);
    await clickElement(page, "button");
    await page.waitForSelector("h2");

    const actual = await getText(
      page,
      "main > section > div > p:nth-child(2) > span",
      (text) => text.textContent
    );
    const expected = "1/2";

    const actualPrise = await getText(
      page,
      "main > section > div > p:nth-child(6) > span",
      (text) => text.textContent
    );
    const expectedPrise = "350";

    expect(actual).toContain(expected);
    expect(actualPrise).toContain(expectedPrise);
  }, 60000);

  test("Booking two place", async () => {
    await clickElement(page, daysWeek.sixthDay);
    await clickElement(page, daysWeek.movi3Morning);
    await page.waitForSelector("h1");
    await clickElement(page, plases.row2Plase5);
    await clickElement(page, plases.row2Plase6);
    await clickElement(page, "button");
    await page.waitForSelector("h1");

    const actual = await getText(
      page,
      "main > section > div > p:nth-child(2) > span",
      (text) => text.textContent
    );
    const expected = "2/5, 2/6";

    const actualPrise = await getText(
      page,
      "main > section > div > p:nth-child(6) > span",
      (text) => text.textContent
    );
    const expectedPrise = "200";

    expect(actual).toContain(expected);
    expect(actualPrise).toContain(expectedPrise);
  }, 60000);

  test.skip("not booking", async () => {
    await clickElement(page, daysWeek.secondDay);
    await clickElement(page, daysWeek.movi3Day);
    await page.waitForSelector("h1");
    await clickElement(page, plases.row2Plase8);

    const actual = await getText(page, "h2", (text) => text.textContent);
    const expected = "Фильм 3";
    expect(actual).toContain(expected);
  }, 60000);

  (".buying-scheme__chair_taken");
});
