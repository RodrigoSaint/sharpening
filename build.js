const esbuild = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");

esbuild.build({
  entryPoints: ["source/index.tsx"],
  bundle: true,
  format: "iife",
  minify: true,
  sourcemap: "external",
  jsxFactory: "jsx",
  platform: "browser",
  target: "chrome58",
  outfile: "build/index.js",
  plugins: [nodeExternalsPlugin()],
});
