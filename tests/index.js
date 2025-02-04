const assert = require("assert");
const loader = require("@assemblyscript/loader");
const fs = require("fs");
const path = require("path");

async function runTests() {
    // Test debug build
    console.log("Testing debug build...");
    const debugWasm = fs.readFileSync(path.join(__dirname, "../build/debug.wasm"));
    const debugInstance = await loader.instantiate(debugWasm);
    
    // Test add function
    assert.strictEqual(debugInstance.exports.add(1, 2), 3);
    assert.strictEqual(debugInstance.exports.add(-1, 1), 0);
    assert.strictEqual(debugInstance.exports.add(100, 200), 300);

    // Test fibonacci function
    assert.strictEqual(debugInstance.exports.fibonacci(0), 0);
    assert.strictEqual(debugInstance.exports.fibonacci(1), 1);
    assert.strictEqual(debugInstance.exports.fibonacci(10), 55);

    // Test release build
    console.log("Testing release build...");
    const releaseWasm = fs.readFileSync(path.join(__dirname, "../build/release.wasm"));
    const releaseInstance = await loader.instantiate(releaseWasm);
    
    // Verify release build results match debug build
    assert.strictEqual(releaseInstance.exports.fibonacci(10), 55);
    assert.strictEqual(releaseInstance.exports.add(1, 2), 3);

    console.log("All tests passed! 🎉");
}

runTests().catch(console.error);