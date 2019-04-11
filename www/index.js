import * as wasm from 'compose-area';

// Assign wasm module to window object for testing purposes.
window.wasm = wasm;

// Initialize compose area
const composeArea = wasm.bind_to('wrapper');
window.composeArea = composeArea;

// Elements
const wrapper = document.getElementById('wrapper');
const logDiv = document.querySelector('#log div');
const caretposDiv = document.querySelector('#caretpos div');
const extractedDiv = document.querySelector('#extracted div');

// Helper functions

let startTime = null;

function log() {
    if (startTime === null) {
        startTime = new Date();
    }
    console.log(...arguments);
    const ms = (new Date() - startTime).toString();
    const pad = '      ';
    const timestamp = `${pad.substring(0, pad.length - ms.length) + ms}`;
    logDiv.innerHTML += `${timestamp} ${arguments[0]}<br>`;
}

function updateCaretPosition(e) {
    log('⚙️ update_caret_position');
    composeArea.update_caret_position_from_dom();
    showState();
}

function showState() {
    // Extract text
    const text = composeArea.get_text();
    extractedDiv.innerText = text.replace(/\n/g, '↵\n');

    // Show caret pos
    const pos = composeArea.get_caret_position();
    caretposDiv.innerText = `{start: ${pos.start}, end: ${pos.end}, success: ${pos.success}}`;
}


// Add event listeners

wrapper.addEventListener('keydown', (e) => {
    log('⚡ keydown', e);
});
wrapper.addEventListener('keyup', (e) => {
    log('⚡ keyup', e);
    updateCaretPosition();
});
wrapper.addEventListener('mouseup', (e) => {
    log('⚡ mouseup', e);
    updateCaretPosition();
});

// Note: Unfortunately the selectionchange listener can only be set on document
// level, not on the wrapper itself.
document.addEventListener('selectionchange', (e) => {
    log('⚡ selectionchange', e);
    updateCaretPosition();
});

// Emoji handling

function insertEmoji(e) {
    const img = e.target.nodeName === 'IMG' ? e.target : e.target.children[0];
    const pos = composeArea.get_caret_position();
    log(`⚙️ insert_image at (${pos.start}, ${pos.end})`);
    composeArea.insert_image(img.src, img.alt, 'emoji');
    showState();
}
document.getElementById('tongue').addEventListener('click', insertEmoji);
document.getElementById('beers').addEventListener('click', insertEmoji);
document.getElementById('facepalm').addEventListener('click', insertEmoji);
