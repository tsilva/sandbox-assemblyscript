<div align="center">
  <img src="logo.png" alt="sandbox-assemblyscript" width="512"/>

  **⚡ Sandbox for experimenting with AssemblyScript and WebAssembly**

</div>

## Overview

An AssemblyScript sandbox demonstrating WebAssembly functionality with basic arithmetic operations. Includes Node.js tests and a browser-based performance comparison between JavaScript and WebAssembly implementations.

## Features

- **Dual builds** - Debug (with `.wat` text format) and optimized release builds
- **Node.js tests** - Verify both debug and release builds
- **Browser demo** - Performance comparison JS vs WASM
- **Benchmarking** - Uses `performance.now()` for accurate timing

## Quick Start

```bash
# Clone and setup
git clone https://github.com/tsilva/sandbox-assemblyscript.git
cd sandbox-assemblyscript
npm install

# Build WebAssembly modules
npm run asbuild

# Run tests
npm test

# Serve browser demo
npm run serve
```

## Build Commands

| Command | Description |
|---------|-------------|
| `npm run asbuild` | Build both debug and release |
| `npm run asbuild:debug` | Debug build only |
| `npm run asbuild:release` | Release build only |
| `npm test` | Run tests against both builds |
| `npm run serve` | Start local server for browser demo |

## Project Structure

```
sandbox-assemblyscript/
├── assembly/
│   └── index.ts          # AssemblyScript source
├── build/
│   ├── debug.wasm        # Debug build output
│   └── release.wasm      # Release build output
├── tests/
│   └── index.js          # Node.js test suite
├── index.html            # Browser performance demo
├── asconfig.json         # AssemblyScript config
└── package.json
```

## Requirements

- Node.js
- npm

## License

MIT
