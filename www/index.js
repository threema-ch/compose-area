import * as wasm from 'compose-area';

// Assign wasm module to window object for testing purposes.
window.wasm = wasm;

// Initialize compose area
const composeArea = wasm.bind_to('wrapper');

// Add event listeners

const wrapper = document.getElementById('wrapper');

/**
 * When the selection changes, update the caret position.
 *
 * Note: Unfortunately this can only be set on document level, not on the
 * wrapper itself.
 */
document.addEventListener('selectionchange', (e) => {
    console.log('selectionchange', e);
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
    console.log('compositionstart:', e);
    compositionState.composing = true;
});
wrapper.addEventListener('compositionupdate', (e) => {
    console.log('compositionupdate:', e);
});
wrapper.addEventListener('compositionend', (e) => {
    console.log('compositionend:', e);
    compositionState.composing = false;

    composeArea.insert_text(e.data);
});
wrapper.addEventListener('change', (e) => {
    console.log('change:', e);
});
wrapper.addEventListener('keydown', (e) => {
    console.log('keydown:', e);
    if (compositionState.composing) {
        // Ignore key events while composing
        e.preventDefault();
        return;
    } else if (!e.ctrlKey && !e.altKey && !e.metaKey) {
        const preventDefault = composeArea.process_key(e.key);
        if (preventDefault) {
            e.preventDefault();
        }
    }
});
wrapper.addEventListener('keyup', (e) => {
    console.log('keyup:', e);
});
wrapper.addEventListener('keypress', (e) => {
    console.log('keypress:', e);
});

/**
 * On cut, remove the current selection from the internal state.
 *
 * This event is fired before the DOM is modified, before the text-to-be-cut is
 * removed from the input field.
 */
wrapper.addEventListener('cut', (e) => {
    console.log('cut', e);
    composeArea.remove_selection(false);
});

/**
 * On paste, override the default paste handler.
 *
 * Instead, insert the clipboard contents into the compose area at the current
 * selection and update the DOM.
 */
wrapper.addEventListener('paste', (e) => {
    console.log('paste', e);
    const clipboardData = e.clipboardData.getData('text/plain');
    if (clipboardData) {
        composeArea.insert_text(clipboardData);
        e.preventDefault();
    }
});

// Emoji handling

function insertEmoji(e) {
    const img = e.target.nodeName === 'IMG' ? e.target : e.target.children[0];
    composeArea.insert_image(img.src, img.alt, 'emoji');
}
document.getElementById('tongue').addEventListener('click', insertEmoji);
document.getElementById('beers').addEventListener('click', insertEmoji);
document.getElementById('facepalm').addEventListener('click', insertEmoji);
