import * as wasm from 'compose-area';

// Assign wasm module to window object for testing purposes.
window.wasm = wasm;

// Initialize compose area
const composeArea = wasm.bind_to('wrapper');
window.composeArea = composeArea;

// Add event listeners

const wrapper = document.getElementById('wrapper');
const logDiv = document.getElementById('log');

function log() {
    console.log(...arguments);
    let text = '';
    for (const arg of arguments) {
        text += arg;
    }
    logDiv.innerHTML += `${text}<br>`;
}

/**
 * When the selection changes, update the caret position.
 *
 * Note: Unfortunately this can only be set on document level, not on the
 * wrapper itself.
 */
document.addEventListener('selectionchange', (e) => {
    log('selectionchange', e);
    log('--update_caret_position');
    composeArea.update_caret_position();
});

// Composition state
const compositionState = {
    composing: false,
};

/**
 * On keydown, process the key.
 */
wrapper.addEventListener('compositionstart', (e) => {
    log('compositionstart:', e);
    compositionState.composing = true;
});
wrapper.addEventListener('compositionupdate', (e) => {
    log('compositionupdate:', e);
});
wrapper.addEventListener('compositionend', (e) => {
    log('compositionend:', e);
    compositionState.composing = false;
    log('--reload_from_dom');
    composeArea.reload_from_dom();
});
wrapper.addEventListener('change', (e) => {
    log('change:', e);
});
wrapper.addEventListener('keydown', (e) => {
    log('keydown:', e);
    if (compositionState.composing) {
        // Ignore key events while composing
        e.preventDefault();
        return;
    } else if (!e.ctrlKey && !e.altKey && !e.metaKey && e.key !== 'Unidentified') {
        log('--process_key: ' + e.key);
        const preventDefault = composeArea.process_key(e.key);
        if (preventDefault) {
            e.preventDefault();
        }
    }
});
wrapper.addEventListener('keyup', (e) => {
    log('keyup:', e);
});
wrapper.addEventListener('keypress', (e) => {
    log('keypress:', e);
});

/**
 * This event is fired when an edit event takes place for which we cannot
 * capture the input event.
 *
 * When this happens, reload the internal state from DOM.
 */
wrapper.addEventListener('input', (e) => {
    log('input:', e.inputType, e);
    if (!compositionState.composing) {
        log('--reload_from_dom');
        composeArea.reload_from_dom();
    }
});

/**
 * On cut, remove the current selection from the internal state.
 *
 * This event is fired before the DOM is modified, before the text-to-be-cut is
 * removed from the input field.
 */
wrapper.addEventListener('cut', (e) => {
    log('cut', e);
    log('--remove_selection');
    composeArea.remove_selection(false);
});

/**
 * On paste, override the default paste handler.
 *
 * Instead, insert the clipboard contents into the compose area at the current
 * selection and update the DOM.
 */
wrapper.addEventListener('paste', (e) => {
    log('paste', e);
    const clipboardData = e.clipboardData.getData('text/plain');
    if (clipboardData) {
        log('--insert_text: ' + clipboardData);
        composeArea.insert_text(clipboardData);
        e.preventDefault();
    }
});

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
