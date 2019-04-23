// benchmark.js
import _ from 'lodash';
import * as Benchmark from 'benchmark';

// compose-area
import {ComposeArea} from 'compose-area';

// Assign modules to window object for testing purposes.
window.Benchmark = Benchmark;

// Create benchmark suite
const suite = new Benchmark.Suite;

// Setup and teardown helpers
window.setupTest = function() {
    const rand = () => Math.random().toString(36).substring(7);
    const divId = 'test-' + rand() + rand();
    const baseWrapper = document.getElementById('wrapper');
    const testDiv = document.createElement('div');
    testDiv.id = divId;
    baseWrapper.appendChild(testDiv)
    const composeArea = ComposeArea.bind_to(testDiv);
    return {
        divId: divId,
        testDiv: testDiv,
        composeArea: composeArea,
    }
}
window.teardownTest = function(divId) {
    const baseWrapper = document.getElementById('wrapper');
    baseWrapper.removeChild(document.getElementById(divId));
}

// Add benchmark tests
suite.add('1. Insert text "hello world"', {
    setup: () => {
        const ctx = setupTest();
    },
    fn: () => {
        ctx.composeArea.insert_text('hello world');
    },
    teardown: () => {
        teardownTest(ctx.divId);
    },
});
suite.add('2. Insert image', {
    setup: () => {
        const ctx = setupTest();
    },
    fn: () => {
        ctx.composeArea.insert_image('emoji.png', 'smile', 'emoji');
    },
    teardown: () => {
        teardownTest(ctx.divId);
    },
    minSamples: 25,
});
suite.add('3. Extract text from compose area', {
    setup: () => {
        const ctx = setupTest();
        ctx.composeArea.insert_text('hello world ');
        ctx.composeArea.insert_image('emoji.png', ':smile:', 'emoji');
        ctx.testDiv.appendChild(document.createElement('br'));
        ctx.composeArea.insert_text('This is a new line and some emoji: ');
        ctx.composeArea.insert_image('emoji1.png', ':smile:', 'emoji');
        ctx.composeArea.insert_image('emoji2.png', ':smil:', 'emoji');
        ctx.composeArea.insert_image('emoji3.png', ':smi:', 'emoji');
        ctx.composeArea.insert_text(' end emoji');
    },
    fn: () => {
        window.lastText = ctx.composeArea.get_text();
    },
    teardown: () => {
        teardownTest(ctx.divId);
    },
});
suite.add('4. Fetch selection range', {
    setup: () => {
        const ctx = setupTest();
        ctx.composeArea.insert_text('hello world');
    },
    fn: () => {
        window.lastPos = ctx.composeArea.fetch_range();
    },
    teardown: () => {
        teardownTest(ctx.divId);
    },
});

// Add listeners
suite.on('start', function() {
    document.getElementById('results').innerHTML += 'Starting benchmark...<br><br>';
});
suite.on('cycle', function(e) {
    const t = e.target;
    const s = t.stats;
    const mean = (s.mean * 1000).toFixed(3);
    const rme = s.rme.toFixed(2);
    const samples = s.sample.length;
    const min = (Math.min(...s.sample) * 1000).toFixed(3);
    const max = (Math.max(...s.sample) * 1000).toFixed(3);
    document.getElementById('results').innerHTML +=
        `<strong>${t.name}</strong><br>mean ${mean} ms ±${rme}% (${samples} samples, min=${min} max=${max})<br>`;
});
suite.on('complete', function() {
    document.getElementById('results').innerHTML += '<br>Benchmark complete!<br>';
});
suite.on('error', function(e) {
    console.error('Benchmark error:', e.target.error);
});

// Add start button event listener
document.getElementById('start').addEventListener('click', (e) => {
    suite.run({async: true});
});
