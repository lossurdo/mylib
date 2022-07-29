import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import builtins from 'rollup-plugin-node-builtins';
import json from 'rollup-plugin-json'

export default {
  input: `src/mylib.ts`,
  output: [{ 
    file: `./dist/mylib.js`, 
    format: 'umd', 
    name: 'MyLib',
    sourcemap: true 
  }],
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    builtins(),
    json(),
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs(),
    resolve({ browser: true }),
    sourceMaps(),
  ],
}