import {ComposeArea} from 'compose-area';

// Elements
const wrapper = document.getElementById('wrapper');
const logDiv = document.querySelector('#log div');
const extractedDiv = document.querySelector('#extracted div');
const selectionDiv = document.querySelector('#selection div');
const rawDiv = document.querySelector('#raw div');

// Initialize compose area
const composeArea = ComposeArea.bind_to(wrapper);
window.composeArea = composeArea;

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

function updateSelectionRange(e) {
    log('⚙️ store_selection_range');
    let range_result = composeArea.store_selection_range();
    log('⚙️ ⤷ ' + range_result.to_string_compact());
    showState();
}

function showState() {
    // Extract text
    const text = composeArea.get_text();
    extractedDiv.innerText = text.replace(/\n/g, '↵\n');

    // Get range
    const range_result = composeArea.fetch_range();
    selectionDiv.innerText = range_result.to_string();

    // Get raw HTML
    rawDiv.innerText = wrapper.innerHTML;
}


// Add event listeners

wrapper.addEventListener('keydown', (e) => {
    log('⚡ keydown', e);
});
wrapper.addEventListener('keyup', (e) => {
    log('⚡ keyup', e);
});
wrapper.addEventListener('mouseup', (e) => {
    log('⚡ mouseup', e);
});
wrapper.addEventListener('paste', (e) => {
    log('⚡ paste', e);
    e.preventDefault();
    const clipboardData = e.clipboardData.getData('text/plain');
    if (clipboardData) {
        log('⚙️ insert_text');
        composeArea.insert_text(clipboardData);
    }
});

// Note: Unfortunately the selectionchange listener can only be set on document
// level, not on the wrapper itself.
document.addEventListener('selectionchange', (e) => {
    log('⚡ selectionchange', e);
    updateSelectionRange();
});

// Emoji handling

function insertEmoji(e) {
    const img = e.target.nodeName === 'IMG' ? e.target : e.target.children[0];
    log(`⚙️ insert_image`);
    const elem = composeArea.insert_image(img.src, img.alt, 'emoji');

    // Ensure that emoji cannot be dragged
    elem.draggable = false;
    elem.ondragstart = (e) => e.preventDefault();

    showState();
}
document.getElementById('tongue').addEventListener('click', insertEmoji);
document.getElementById('beers').addEventListener('click', insertEmoji);
document.getElementById('facepalm').addEventListener('click', insertEmoji);

// Other buttons
document.getElementById('clearselection').addEventListener('click', (e) => {
    const sel = getSelection();
    sel.removeAllRanges();
    showState();
});
document.getElementById('focus').addEventListener('click', (e) => composeArea.focus());
