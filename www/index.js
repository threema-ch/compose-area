import * as wasm from 'compose-area';

// Assign wasm module to window object for testing purposes.
window.wasm = wasm;

// Initialize compose area
const composeArea = wasm.bind_to('wrapper');

/**
 * Navigation keys according to https://www.w3.org/TR/uievents-key/
 */
function isNavigationKey(key) {
    switch (key) {
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'ArrowUp':
        case 'End':
        case 'Home':
        case 'PageDown':
        case 'PageUp':
            return true;
        default:
            return false;
    }
}

// Add wrapper event listeners

const wrapper = document.getElementById('wrapper');

/**
 * On keydown, process the key.
 */
wrapper.addEventListener('keydown', (e) => {
    console.log('keydown:', e);
    if (!e.ctrlKey && !e.altKey && !e.metaKey) {
        const preventDefault = composeArea.process_key(e.key);
        if (preventDefault) {
            e.preventDefault();
        }
    }
});

/**
 * On keyup, update the caret position.
 */
wrapper.addEventListener('keyup', (e) => {
    console.log('keyup:', e);
    if (isNavigationKey(e.key) || e.key === 'Control') {
        // Note: The `ctrlKey` check is there to handle things like 'ctrl+a'.
        composeArea.update_caret_position();
    }
});

/**
 * On mouseup, update the caret position.
 */
wrapper.addEventListener('mouseup', (e) => {
    console.log('mouseup', e);
    composeArea.update_caret_position();
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
    composeArea.update_caret_position();
}
document.getElementById('tongue').addEventListener('click', insertEmoji);
document.getElementById('beers').addEventListener('click', insertEmoji);
document.getElementById('facepalm').addEventListener('click', insertEmoji);
