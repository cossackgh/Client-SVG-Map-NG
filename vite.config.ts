import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
    outDir: "dist",
    sourcemap: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ClientSVGMapNG',
      formats: ["cjs", "es"],
      // the proper extensions will be added
      fileName: 'client-svg-map-ng',
    },
    rollupOptions: {
      
      // make sure to externalize deps that shouldn't be bundled
      // into your library
     // external: ['vue'],
      output: {
        // entryFileNames: `[name].[hash].mjs`,
        // chunkFileNames: `[name].[hash].mjs`,
        // Provide global variables to use in the UMD build
        // for externalized deps
        /*         globals: {
          vue: 'Vue',
        }, */
      },
    },
    
  },
  plugins: [
      dts({
        insertTypesEntry: true,
      }),
    ],
  server: {
    port: 5175
  }
})