import * as wasm from 'compose-area';

// Assign wasm module to window object for testing purposes.
window.wasm = wasm;

// Initialize compose area
const composeArea = wasm.bind_to('wrapper');
window.composeArea = composeArea;

// Elements
const wrapper = document.getElementById('wrapper');
const logDiv = document.getElementById('log');

// Helper functions

function log() {
    console.log(...arguments);
    let text = '';
    for (const arg of arguments) {
        text += arg;
    }
    logDiv.innerHTML += `${text}<br>`;
}

// Add event listeners

function onKeyDown(e) {
    log('keydown', e);
}

function onKeyUp(e) {
    log('keyup', e);
}

function updateCaretPosition(e) {
    log('updateCaretPosition()', e);
    log('--update_caret_position');
    composeArea.update_caret_position();
}

wrapper.addEventListener('keydown', onKeyDown);
wrapper.addEventListener('keyup', onKeyUp);
wrapper.addEventListener('keyup', updateCaretPosition);
wrapper.addEventListener('mouseup', updateCaretPosition);

// Note: Unfortunately the selectionchange listener can only be set on document
// level, not on the wrapper itself.
document.addEventListener('selectionchange', updateCaretPosition);

// Emoji handling

function insertEmoji(e) {
    log('insertEmoji');
    const img = e.target.nodeName === 'IMG' ? e.target : e.target.children[0];
    log('--insert_image');
    composeArea.insert_image(img.src, img.alt, 'emoji');
}
document.getElementById('tongue').addEventListener('click', insertEmoji);
document.getElementById('beers').addEventListener('click', insertEmoji);
document.getElementById('facepalm').addEventListener('click', insertEmoji);
