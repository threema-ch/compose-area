import * as wasm from "compose-area";

wasm.bind_to("wrapper");

const wrapper = document.getElementById("wrapper");
wrapper.addEventListener("keydown", (e) => {
    e.preventDefault();
    console.log('keydown:', e);
    const out = wasm.process_key(e.key);
    console.log(out);
});
