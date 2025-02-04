# sandbox-assemblyscript

A sandbox project for experimenting with AssemblyScript and WebAssembly. This project demonstrates basic arithmetic operations and includes performance comparisons between JavaScript and WebAssembly implementations.

## Available Functions

- `add(a: i32, b: i32)`: Adds two 32-bit integers
- `fibonacci(n: i32)`: Calculates the nth Fibonacci number
- `multiplyTimes(a: i32, b: i32)`: Multiplies by adding a number to itself b times (for performance comparison)

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```

2. Build the project:
   ```sh
   npm run asbuild
   ```

3. Run the project:
   ```sh
   npm start
   ```

4. Test the project:
   ```sh
   npm test
   ```
