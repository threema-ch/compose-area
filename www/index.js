import * as wasm from "compose-area";

const composeArea = wasm.bind_to("wrapper");

const wrapper = document.getElementById("wrapper");

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

wrapper.addEventListener("keydown", (e) => {
    console.log('keydown:', e);
    if (!e.ctrlKey && !e.altKey && !e.metaKey) {
        const preventDefault = composeArea.process_key(e.key);
        if (preventDefault) {
            e.preventDefault();
        }
    }
});
wrapper.addEventListener("keyup", (e) => {
    console.log('keyup:', e);
    if (isNavigationKey(e.key)) {
        composeArea.update_caret_position();
    }
});
wrapper.addEventListener("mousedown", (e) => {
    console.log('mousedown', e);
});
wrapper.addEventListener("mouseup", (e) => {
    console.log('mouseup', e);
    composeArea.update_caret_position();
});
