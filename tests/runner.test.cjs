const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const { mkdtempSync, rmSync, writeFileSync } = require('node:fs');
const { tmpdir } = require('node:os');
const path = require('node:path');
const test = require('node:test');

function runFixture(hook) {
  const temporary = mkdtempSync(path.join(tmpdir(), 'assemblyscript-runner-'));
  try {
    const args = [];
    if (hook) {
      const fixture = path.join(temporary, 'fixture.cjs');
      writeFileSync(fixture, hook);
      args.push('--require', fixture);
    }
    args.push(path.join(__dirname, 'index.js'));
    return spawnSync(process.execPath, args, {
      cwd: path.join(__dirname, '..'),
      encoding: 'utf8',
      timeout: 10000,
      env: { PATH: process.env.PATH || '', HOME: temporary, TMPDIR: temporary },
    });
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
}

test('successful WASM assertions exit successfully', () => {
  const result = runFixture();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /All tests passed!/);
});

test('a failed assertion causes a failing test process', () => {
  const result = runFixture(`
    const assert = require('node:assert');
    const original = assert.strictEqual;
    assert.strictEqual = () => original(1, 2, 'deliberate runner regression');
  `);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /deliberate runner regression/);
});

test('a missing WASM input causes a failing test process', () => {
  const result = runFixture(`
    const fs = require('node:fs');
    const original = fs.readFileSync;
    fs.readFileSync = function(file, ...args) {
      if (String(file).endsWith('/build/debug.wasm')) {
        const error = new Error('deliberate missing WASM input');
        error.code = 'ENOENT';
        throw error;
      }
      return original.call(this, file, ...args);
    };
  `);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /deliberate missing WASM input/);
});
