import typescript from "@rollup/plugin-typescript";
// import clear from "rollup-plugin-clear"

export default {
  input: "./src/index.ts",
  output: [
    {
      file: "dist/umd.js",
      format: "umd",
      name: "jwfetch-node",
    },
    {
      file: "dist/index.js",
      format: "esm",
    },
  ],
  plugins: [typescript()],
  // watch: {
  //   exclude: "node_modules/**",
  // },
}
