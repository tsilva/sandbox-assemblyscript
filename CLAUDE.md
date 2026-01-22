# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AssemblyScript sandbox project that demonstrates WebAssembly functionality with basic arithmetic operations. The project includes both Node.js tests and a browser-based performance comparison between JavaScript and WebAssembly implementations.

## Build System

AssemblyScript compilation generates two builds:
- **Debug build**: `build/debug.wasm` (with debugging info and `.wat` text format)
- **Release build**: `build/release.wasm` (optimized for production)

Configuration is in `asconfig.json`, which defines both targets and their output paths.

### Common Commands

**Build the project:**
```sh
npm run asbuild
```
This runs both debug and release builds sequentially.

**Build individual targets:**
```sh
npm run asbuild:debug    # Debug build only
npm run asbuild:release  # Release build only
```

**Run tests:**
```sh
npm test
```
Tests run against both debug and release builds to verify correctness.

**Serve the browser demo:**
```sh
npm run serve
```
Starts a local server to view `index.html` with the WebAssembly performance comparison.

## Architecture

### AssemblyScript Source (`assembly/index.ts`)
The main WebAssembly module exports functions that are callable from JavaScript:
- Functions use typed parameters (e.g., `i32` for 32-bit integers)
- All exported functions are compiled to both debug and release WASM builds

### Test Suite (`tests/index.js`)
- Uses `@assemblyscript/loader` to instantiate WASM modules
- Tests both debug and release builds to ensure optimization doesn't break functionality
- Loads WASM files synchronously using `fs.readFileSync`

### Browser Demo (`index.html`)
- Uses ES6 modules to import `@assemblyscript/loader`
- Loads only the release build via `fetch()`
- Implements parallel JavaScript versions of WASM functions for performance comparison
- Uses `performance.now()` for timing benchmarks

## Important Notes

- The project requires building before running tests or serving the browser demo
- The browser demo expects `node_modules/@assemblyscript/loader` to be accessible (may need a dev server that serves node_modules)
- README.md must be kept up to date with any significant project changes
