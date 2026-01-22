<div align="center">
  <img src="logo.png" alt="sandbox-assemblyscript" width="512"/>

  [![AssemblyScript](https://img.shields.io/badge/AssemblyScript-0.27.5-007ACC?style=flat&logo=assemblyscript)](https://www.assemblyscript.org/)
  [![WebAssembly](https://img.shields.io/badge/WebAssembly-654FF0?style=flat&logo=webassembly&logoColor=white)](https://webassembly.org/)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
  [![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)

  **A hands-on sandbox for exploring WebAssembly through AssemblyScript with side-by-side JavaScript performance comparisons**

  [AssemblyScript Docs](https://www.assemblyscript.org/introduction.html) · [WebAssembly](https://webassembly.org/)
</div>

## Overview

This project provides a practical environment for experimenting with AssemblyScript and WebAssembly. It includes basic arithmetic functions compiled to WASM, a Node.js test suite, and a browser-based demo that benchmarks WebAssembly against equivalent JavaScript implementations.

## Features

- **Dual Build Targets** - Debug builds with source maps and optimized release builds
- **Browser Performance Demo** - Compare WASM vs JavaScript execution times in real-time
- **Node.js Test Suite** - Validates both debug and release builds for correctness
- **Simple Architecture** - Clean, minimal setup for learning WebAssembly fundamentals

## Quick Start

```bash
npm install
npm run asbuild
npm test
```

## Installation

```bash
# Clone the repository
git clone https://github.com/tsilva/sandbox-assemblyscript.git
cd sandbox-assemblyscript

# Install dependencies
npm install

# Build WebAssembly modules
npm run asbuild
```

## Usage

### Running Tests

```bash
npm test
```

Tests run against both debug and release builds to ensure optimization doesn't break functionality.

### Browser Demo

```bash
npm run serve
```

Open your browser to view the performance comparison between JavaScript and WebAssembly implementations.

### Available Functions

The WASM module exports these functions:

| Function | Signature | Description |
|----------|-----------|-------------|
| `add` | `(a: i32, b: i32) → i32` | Adds two 32-bit integers |
| `fibonacci` | `(n: i32) → i32` | Calculates the nth Fibonacci number |
| `multiplyTimes` | `(a: i32, b: i32) → i32` | Multiplies by repeated addition (for benchmarking) |

### Example Usage

**Node.js:**
```javascript
const loader = require("@assemblyscript/loader");
const fs = require("fs");

const wasmBuffer = fs.readFileSync("build/release.wasm");
const { exports } = await loader.instantiate(wasmBuffer);

console.log(exports.add(5, 3));        // 8
console.log(exports.fibonacci(10));   // 55
```

**Browser:**
```javascript
import loader from "@assemblyscript/loader";

const { exports } = await loader.instantiate(fetch("build/release.wasm"));
console.log(exports.add(5, 3));  // 8
```

## Build Commands

| Command | Description |
|---------|-------------|
| `npm run asbuild` | Build both debug and release WASM modules |
| `npm run asbuild:debug` | Build debug WASM with source maps |
| `npm run asbuild:release` | Build optimized release WASM |
| `npm test` | Run test suite against both builds |
| `npm run serve` | Start local server for browser demo |

## Project Structure

```
sandbox-assemblyscript/
├── assembly/
│   └── index.ts          # AssemblyScript source code
├── build/
│   ├── debug.wasm        # Debug build output
│   ├── debug.wat         # Debug WAT text format
│   ├── release.wasm      # Optimized release build
│   └── release.wat       # Release WAT text format
├── tests/
│   └── index.js          # Node.js test suite
├── index.html            # Browser performance demo
├── asconfig.json         # AssemblyScript compiler config
└── package.json
```

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

MIT
