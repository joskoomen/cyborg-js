/* eslint-disable filenames/match-exported, sort-keys */
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import pkg from "./package.json";

const plugins = [
  resolve({
    customResolveOptions: {
      moduleDirectory: ["node_modules", "../../node_modules"]
    }
  }),
  commonjs()
];

const onwarn = (warning, warn) => {
  if (warning.code === "THIS_IS_UNDEFINED") {
    return;
  }
  warn(warning);
};

const config = [
  {
    input: "src/index.ts",
    onwarn,
    output: {
      sourcemap: true,
      name: pkg.name,
      file: pkg.main,
      format: "umd"
    },
    plugins: [...plugins, typescript()]
  }
];

export default config;
