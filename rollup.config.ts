import typescript from "@rollup/plugin-typescript";
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: "./src/index.ts",
  external: ['md5-es'],
  output: [
    {
      file: "dist/index.js",
      format: "commonjs"
    },
    {
      file: "dist/index.mjs",
      format: "esm",
    },
  ],
  plugins: [typescript(), commonjs()],
  watch: {
    exclude: "node_modules/**",
  },
}
