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
const wrapper = By.id('wrapper');
const emojiTongue = By.id('tongue');
const emojiBeers = By.id('beers');
const emojiFacepalm = By.id('facepalm');
const headline = By.css('h2');

// Emoji unicode
const emojiStrTongue = '\ud83d\ude1c';
const emojiStrBeers = '\ud83c\udf7b';
const emojiStrFacepalm = '\ud83e\udd26\u200d\u2640\ufe0f';


async function extractText(driver: WebDriver): Promise<string> {
    const text: string = await driver.executeScript(`
        return window.composeArea.get_text();
    `);
    return text;
}

async function clearSelectionRange(driver: WebDriver): Promise<void> {
    const clearBtn = await driver.findElement(By.id('clearselection'));
    await clearBtn.click();
}

async function skipInBrowser(driver: WebDriver, browser: string): Promise<boolean> {
    const cap = await driver.getCapabilities()
    if (cap.get('browserName') === browser) {
        // Test skipped due to buggy webdriver behavior in Chrome.
        console.warn(`Warning: Skipping test in ${browser}`);
        return true;
    }
    return false;
}

/**
 * The wrapper element should be found on the test page.
 */
async function wrapperFound(driver: WebDriver) {
    const wrapperElement = await driver.findElement(wrapper);
    expect(wrapperElement).to.exist;
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

    await wrapperElement.sendKeys(Key.ARROW_LEFT, 'X');

    const text = await extractText(driver);
    expect(text).to.equal(emojiStrTongue + 'X' + emojiStrBeers);
}

/**
 * Replace selected text with text.
 */
async function replaceSelectedTextWithText(driver: WebDriver) {
    if (await skipInBrowser(driver, 'chrome')) { return; }

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
 * Replace selected text with emoji.
 */
async function replaceSelectedTextWithEmoji(driver: WebDriver) {
    if (await skipInBrowser(driver, 'chrome')) { return; }

    await driver.sleep(100); // Wait for compose area init
    const wrapperElement = await driver.findElement(wrapper);
    const emoji = await driver.findElement(emojiTongue);

    await wrapperElement.click();

    await wrapperElement.sendKeys('abcde');
    await wrapperElement.sendKeys(Key.ARROW_LEFT);
    await wrapperElement.sendKeys(Key.SHIFT + Key.ARROW_LEFT);
    await wrapperElement.sendKeys(Key.SHIFT + Key.ARROW_LEFT);
    await wrapperElement.sendKeys(Key.SHIFT + Key.ARROW_LEFT);
    await emoji.click();

    const text = await extractText(driver);
    expect(text).to.equal('a' + emojiStrTongue + 'e');
}

/**
 * Replace selected text and emoji.
 */
async function replaceSelectedTextAndEmoji(driver: WebDriver) {
    if (await skipInBrowser(driver, 'chrome')) { return; }

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
 * Cursor position after replacing emoji.
 */
async function replaceEmojiWithText(driver: WebDriver) {
    await driver.sleep(100); // Wait for compose area init

    const wrapperElement = await driver.findElement(wrapper);
    const emoji = await driver.findElement(emojiTongue);

    await wrapperElement.click();

    await wrapperElement.sendKeys('a');
    emoji.click();
    await wrapperElement.sendKeys(
        'b',
        Key.ARROW_LEFT,
        Key.SHIFT + Key.ARROW_LEFT,
        'A',
        'B',
    );

    const text = await extractText(driver);
    expect(text).to.equal('aABb');
}

/**
 * Replace all text.
 */
async function replaceAllText(driver: WebDriver) {
    // Doesn't work in Firefox. Disabled until
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1529540 is resolved.
    if (await skipInBrowser(driver, 'firefox')) { return; }

    // Doesn't work in Chrome because every `sendKeys` call resets the focus.
    if (await skipInBrowser(driver, 'chrome')) { return; }

    await driver.sleep(100); // Wait for compose area init
    const wrapperElement = await driver.findElement(wrapper);

    await wrapperElement.click();

    await wrapperElement.sendKeys('abcde');
    await wrapperElement.sendKeys(Key.CONTROL + 'a');
    await wrapperElement.sendKeys('X');

    const text = await extractText(driver);
    expect(text).to.equal('X');
}

/**
 * Using the delete key.
 */
async function deleteKey(driver: WebDriver) {
    await driver.sleep(100); // Wait for compose area init
    const wrapperElement = await driver.findElement(wrapper);
    const emoji = await driver.findElement(emojiTongue);

    await wrapperElement.click();

    await wrapperElement.sendKeys('abcd', Key.ENTER);
    await emoji.click();

    expect(await extractText(driver)).to.equal('abcd\n' + emojiStrTongue);

    await wrapperElement.sendKeys(
        Key.ARROW_LEFT,
        Key.ARROW_LEFT,
        Key.ARROW_LEFT,  // Between c and d
        Key.DELETE,
        Key.DELETE,
        'x',
    );

    expect(await extractText(driver)).to.equal('abcx' + emojiStrTongue);
}

/**
 * Cutting and pasting
 */
async function cutAndPaste(driver: WebDriver) {
    if (await skipInBrowser(driver, 'chrome')) { return; }

    await driver.sleep(100); // Wait for compose area init
    const wrapperElement = await driver.findElement(wrapper);
    const emoji = await driver.findElement(emojiTongue);

    await wrapperElement.click();

    // Add text
    await wrapperElement.sendKeys('1234');

    // Highlight "23"
    await wrapperElement.sendKeys(Key.ARROW_LEFT);
    await wrapperElement.sendKeys(Key.SHIFT, Key.ARROW_LEFT);
    await wrapperElement.sendKeys(Key.SHIFT, Key.ARROW_LEFT);

    // Cut
    await wrapperElement.sendKeys(Key.CONTROL, 'x');

    // Paste at end
    await wrapperElement.sendKeys(Key.ARROW_RIGHT);
    await wrapperElement.sendKeys(Key.CONTROL, 'v');

    expect(await extractText(driver)).to.equal('1423');
}

/**
 * No contents should be inserted outside the wrapper (e.g. if the selection is
 * outside).
 */
async function noInsertOutsideWrapper(driver: WebDriver) {
    await driver.sleep(100); // Wait for compose area init
    const wrapperElement = await driver.findElement(wrapper);
    const headlineElement = await driver.findElement(headline);
    const e = await driver.findElement(emojiBeers);

    await headlineElement.click();
    await e.click();
    await wrapperElement.sendKeys(' yeah');

    const text = await extractText(driver);
    expect(text).to.equal(`${emojiStrBeers} yeah`);
}

/**
 * When no selection range is present, insert at end. If a selection range is
 * outside the compose area, use the last known range.
 */
async function handleSelectionChanges(driver: WebDriver) {
    await driver.sleep(100); // Wait for compose area init
    const wrapperElement = await driver.findElement(wrapper);
    const headlineElement = await driver.findElement(headline);
    const e1 = await driver.findElement(emojiBeers);
    const e2 = await driver.findElement(emojiTongue);
    const e3 = await driver.findElement(emojiFacepalm);

    // Add initial text
    await wrapperElement.click();
    await wrapperElement.sendKeys('1234');
    expect(await extractText(driver)).to.equal(`1234`);

    // Insert emoji
    await wrapperElement.sendKeys(Key.ARROW_LEFT, Key.ARROW_LEFT);
    await e1.click();
    expect(await extractText(driver)).to.equal(
        `12${emojiStrBeers}34`
    );

    // Clear selection range and insert emoji
    await clearSelectionRange(driver);
    await e2.click();
    expect(await extractText(driver)).to.equal(
        `12${emojiStrBeers}34${emojiStrTongue}`
    );

    // Change selection range
    await wrapperElement.click();
    await wrapperElement.sendKeys(Key.ARROW_LEFT, Key.ARROW_LEFT);

    // Click outside wrapper, then insert another emoji
    await headlineElement.click();
    await e3.click();
    expect(await extractText(driver)).to.equal(
        `12${emojiStrBeers}3${emojiStrFacepalm}4${emojiStrTongue}`
    );
}

/**
 * When inserting an empty line, the newlines should not be duplicated.
 * Regression test for https://github.com/threema-ch/compose-area/issues/72.
 */
async function noDuplicatedNewlines(driver: WebDriver) {
    await driver.sleep(100); // Wait for compose area init
    const wrapperElement = await driver.findElement(wrapper);

    await wrapperElement.click();

    await wrapperElement.sendKeys('Hello');
    await wrapperElement.sendKeys(Key.ENTER);
    await wrapperElement.sendKeys(Key.ENTER);
    await wrapperElement.sendKeys('World');

    const text = await extractText(driver);
    expect(text).to.equal('Hello\n\nWorld');
}

export const TESTS: Array<[string, Testfunc]> = [
    ['Make sure that the wrapper element can be found', wrapperFound],
    ['Insert three emoji', insertThreeEmoji],
    ['Insert text between emoji', insertTextBetweenEmoji],
    ['Replace selected text with text', replaceSelectedTextWithText],
    ['Replace selected text with emoji', replaceSelectedTextWithEmoji],
    ['Replace selected text and emoji', replaceSelectedTextAndEmoji],
    ['Replace emoji with text', replaceEmojiWithText],
    ['Replace all text', replaceAllText],
    ['Use the delete key', deleteKey],
    ['Cut and paste', cutAndPaste],
    ['Don\'t insert outside wrapper', noInsertOutsideWrapper],
    ['Handle selection changes', handleSelectionChanges],
    ['Ensure that empty lines are not duplicated', noDuplicatedNewlines],
];
