import * as wasm from "compose-area";

const composeArea = wasm.bind_to("wrapper");

function getCaretPosition(rootNode) {
    if (rootNode.innerHTML.length < 1) {
        return [0, 0];
    }
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const start = getPosition(rootNode, range.startContainer, range.startOffset);
    const end = getPosition(rootNode, range.endContainer, range.endOffset);
    if (start === null || end === null ) {
        return null;
    }
    return [start, end];
}

function getOpeningTag(node) {
    return node.outerHTML.match(/^(<[^>]+>)/)[0];
}

function isTextNode(node) {
    return node.nodeType === node.TEXT_NODE;
}

function isElementNode(node) {
    return node.nodeType === node.ELEMENT_NODE;
}

function getPosition(mainRoot, node, offset) {
    function getOffsetFromStart(root, node, offset) {
        const textOffset = isTextNode(node) ? offset : 0;
        const nodeOffset = !isTextNode(node) ? offset : 0;
        let pos = 0;
        let nodeCount = 0;
        for (const childNode of root.childNodes) {
            if (node.isSameNode(root) && nodeCount >= nodeOffset) {
                // We have reached the node offset.
                return pos;
            } else if (childNode.isSameNode(node)) {
                // We reached our target node, simply add the offset to the position
                // Note: The offset means something different depending on whether the
                // node is a text node or an element node! If it's a text node, it's the
                // character offset from the start. If it's an element node, it is the
                // number of elements from the start.
                if (isTextNode(node)) {
                    return pos + textOffset;
                } else {
                    const openingTag = getOpeningTag(childNode).length;
                    return pos + openingTag;
                }
            } else if (childNode.contains(node)) {
                // We're at a parent node. Recurse.
                const recursed = getOffsetFromStart(childNode, node, offset);
                const openingTag = getOpeningTag(childNode).length;
                return pos + recursed + openingTag;
            }

            // We're at a node previous to the target node. Increase pos.
            if (isTextNode(childNode)) {
                pos += childNode.textContent.length;
            } else {
                pos += childNode.outerHTML.length;
            }
            nodeCount += 1;
        }
        return pos;
    }

    if (mainRoot.contains(node)) {
        return getOffsetFromStart(mainRoot, node, offset);
    } else {
        return null;
    }
}

const wrapper = document.getElementById("wrapper");

const updateCaretPosition = () => {
    const caretPos = getCaretPosition(wrapper);
    if (caretPos !== null) {
        composeArea.update_caret_position(caretPos[0], caretPos[1]);
    }
};

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
        updateCaretPosition();
    }
});
wrapper.addEventListener("mousedown", (e) => {
    console.log('mousedown', e);
});
wrapper.addEventListener("mouseup", (e) => {
    console.log('mouseup', e);
    updateCaretPosition();
});
