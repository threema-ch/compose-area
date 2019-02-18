import { expect } from 'chai';
import { By, WebDriver } from 'selenium-webdriver';


// Type aliases
type Testfunc = (driver: WebDriver) => void;

// Shared selectors
const wrapper = By.css('#wrapper');


/**
 * The wrapper element should be found on the test page.
 */
async function wrapperFound(driver: WebDriver) {
    const wrapperElement = await driver.findElement(wrapper);
    expect(wrapperElement).to.exist;
}

export const TESTS: Array<[string, Testfunc]> = [
    ['Make sure that the wrapper element can be found', wrapperFound],
];

