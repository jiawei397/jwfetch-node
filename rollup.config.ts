import typescript from "@rollup/plugin-typescript";
// import clear from "rollup-plugin-clear"

export default {
  input: "./src/index.ts",
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
  plugins: [typescript()],
  watch: {
    exclude: "node_modules/**",
  },
}
