import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";

export default defineConfig(({ mode }) => ({
  build: {
    sourcemap: mode === "development" ? "inline" : true,
    minify: false,
    plugins: [wasm()],
    css: { devSourcemap: mode === "development" },

    // Matches webpack prod optimization (Rollup handles most of these natively)
    // - sideEffects, usedExports, concatenateModules => handled by Rollup tree-shaking
    // - emitOnErrors: false => matches Vite default (build fails on error)
    // - splitChunks (minSize 30000, maxAsyncRequests 5, maxInitialRequests 3)
    //   => partially covered below, but see notes
    ...(mode === "development"
      ? {}
      : {
          chunkSizeWarningLimit: 500, // rough equivalent of performance.hints: 'warning'
        }),
  },
}));
