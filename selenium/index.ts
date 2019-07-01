import * as process from 'process';
import { Builder } from 'selenium-webdriver';
import * as TermColor from 'term-color';

import { TESTS } from './tests';


// Configuration
const TEST_URL = 'http://localhost:8080/';

// Ensure that unhandled rejections result in aborting
process.on('unhandledRejection', (up) => { throw up });

// Script arguments
const browser = process.argv[2];
const filterQuery = process.argv[3];
if (browser === undefined) {
    console.error('Error: Missing browser argument');
    process.exit(1);
}


// Test runner function
async function main() {
    const driver = await new Builder().forBrowser(browser).build();
    let i = 0;
    let success = 0;
    let failed = 0;
    let skipped = 0;
    console.info('\n====== COMPOSE AREA SELENIUM TESTS ======\n');
    if (filterQuery !== undefined) {
        console.info(`Filter query: "${filterQuery}"\n`);
    }
    try {
        for (const [name, testfunc] of TESTS) {
            try {
                if (filterQuery === undefined || name.toLowerCase().indexOf(filterQuery.toLowerCase()) !== -1) {
                    i++;
                    console.info(TermColor.blue(`» ${i}: Running test: ${name}`));
                    await driver.get(TEST_URL);
                    await testfunc(driver);
                    success++;
                } else {
                    skipped++;
                }
            } catch (e) {
                console.error(TermColor.red(`\nTest failed:`));
                console.error(e);
                failed++;
            }
        }
    } finally {
        await driver.quit();
    }
    const colorFunc = failed > 0 ? TermColor.red : TermColor.green;
    console.info(colorFunc(`\nSummary: ${i} tests run, ${success} succeeded, ${failed} failed, ${skipped} skipped`));
    process.exit(failed > 0 ? 1 : 0);
}


// Run!
main();
