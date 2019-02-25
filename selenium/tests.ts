// Selenium docs:
// https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/
import { expect } from 'chai';
import { By, Key, WebDriver } from 'selenium-webdriver';

interface CaretPosition {
  start: number;
  end: number;
}

// Type aliases
type Testfunc = (driver: WebDriver) => void;

// Shared selectors
const wrapper = By.css('#wrapper');
const emojiTongue = By.css('#tongue');
const emojiBeers = By.css('#beers');
const emojiFacepalm = By.css('#facepalm');

// Emoji unicode
const emojiStrTongue = '\ud83d\ude1c';
const emojiStrBeers = '\ud83c\udf7b';
const emojiStrFacepalm = '\ud83e\udd26\u200d\u2640\ufe0f';


async function getCaretPosition(driver: WebDriver): Promise<CaretPosition> {
    const [start, end] = await driver.executeScript(`
        const wrapper = document.getElementById("wrapper");
        const pos = window.wasm.get_caret_position(wrapper);
        return [pos.start, pos.end];
    `);
    return {
        start: start,
        end: end,
    };
}

async function extractText(driver: WebDriver): Promise<string> {
    const text: string = await driver.executeScript(`
        const text = window.wasm.extract_text(document.getElementById("wrapper"));
        console.warn('wrapper:', wrapper);
        console.warn('texxxt:', text);
        return text;
    `);
    return text;
}

/**
 * The wrapper element should be found on the test page.
 */
async function wrapperFound(driver: WebDriver) {
    const wrapperElement = await driver.findElement(wrapper);
    expect(wrapperElement).to.exist;
}

/**
 * Caret position on empty compose area.
 */
async function caretPositionEmpty(driver: WebDriver) {
    await driver.sleep(100); // Wait for compose area init
    const wrapperElement = await driver.findElement(wrapper);

    const pos1 = await getCaretPosition(driver);
    expect(pos1.start).to.equal(0);
    expect(pos1.end).to.equal(0);

    await wrapperElement.click();

    const pos2 = await getCaretPosition(driver);
    expect(pos2.start).to.equal(0);
    expect(pos2.end).to.equal(0);
}

/**
 * The emoji should be inserted in the proper order.
 */
async function insertThreeEmoji(driver: WebDriver) {
    await driver.sleep(100); // Wait for compose area init
    const wrapperElement = await driver.findElement(wrapper);
    const e1 = await driver.findElement(emojiTongue);
    const e2 = await driver.findElement(emojiBeers);
    const e3 = await driver.findElement(emojiFacepalm);

    await wrapperElement.click();

    await e1.click();
    await e2.click();
    await e3.click();

    const text = await extractText(driver);
    expect(text).to.equal(emojiStrTongue + emojiStrBeers + emojiStrFacepalm);
}

/**
 * Insert text between two emoji.
 */
async function insertTextBetweenEmoji(driver: WebDriver) {
    await driver.sleep(100); // Wait for compose area init
    const wrapperElement = await driver.findElement(wrapper);
    const e1 = await driver.findElement(emojiTongue);
    const e2 = await driver.findElement(emojiBeers);

    await wrapperElement.click();

    await e1.click();
    await e2.click();

    await wrapperElement.sendKeys(Key.ARROW_LEFT);
    await wrapperElement.sendKeys('X');

    const text = await extractText(driver);
    expect(text).to.equal(emojiStrTongue + 'X' + emojiStrBeers);
}

/**
 * Replace selected text.
 */
async function replaceSelectedText(driver: WebDriver) {
    await driver.sleep(100); // Wait for compose area init
    const wrapperElement = await driver.findElement(wrapper);

    await wrapperElement.click();

    await wrapperElement.sendKeys('abcde');
    await wrapperElement.sendKeys(Key.ARROW_LEFT);
    await wrapperElement.sendKeys(Key.SHIFT + Key.ARROW_LEFT);
    await wrapperElement.sendKeys(Key.SHIFT + Key.ARROW_LEFT);
    await wrapperElement.sendKeys(Key.SHIFT + Key.ARROW_LEFT);
    await wrapperElement.sendKeys('X');

    const text = await extractText(driver);
    expect(text).to.equal('aXe');
}

/**
 * Replace selected text and emoji.
 */
async function replaceSelectedTextAndEmoji(driver: WebDriver) {
    await driver.sleep(100); // Wait for compose area init

    const wrapperElement = await driver.findElement(wrapper);
    const emoji = await driver.findElement(emojiTongue);

    await wrapperElement.click();

    await wrapperElement.sendKeys('abc');
    emoji.click();
    await wrapperElement.sendKeys('de');
    await wrapperElement.sendKeys(Key.ARROW_LEFT);
    await wrapperElement.sendKeys(Key.SHIFT + Key.ARROW_LEFT);
    await wrapperElement.sendKeys(Key.SHIFT + Key.ARROW_LEFT);
    await wrapperElement.sendKeys(Key.SHIFT + Key.ARROW_LEFT);
    await wrapperElement.sendKeys('X');

    const text = await extractText(driver);
    expect(text).to.equal('abXe');
}

/**
 * Replace all text.
 */
async function replaceAllText(driver: WebDriver) {
    await driver.sleep(100); // Wait for compose area init
    const wrapperElement = await driver.findElement(wrapper);

    await wrapperElement.click();

    await wrapperElement.sendKeys('abcde');
    await wrapperElement.sendKeys(Key.CONTROL + 'a');
    await wrapperElement.sendKeys('X');

    const text = await extractText(driver);
    expect(text).to.equal('X');
}

export const TESTS: Array<[string, Testfunc]> = [
    ['Make sure that the wrapper element can be found', wrapperFound],
    ['Get caret position on empty compose area', caretPositionEmpty],
    ['Insert three emoji', insertThreeEmoji],
    ['Insert text between emoji', insertTextBetweenEmoji],
    ['Replace selected text', replaceSelectedText],
    ['Replace selected text and emoji', replaceSelectedTextAndEmoji],
    ['Replace all text', replaceAllText],
];

