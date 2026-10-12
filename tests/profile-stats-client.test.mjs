import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../src/lib/profileStats.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
const { baselineStats, mergeProfileResponse, loadSavedStats, saveStats } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);

function response(data, status = 'verified', verifiedAt = '2026-10-12T09:00:00Z') {
    return { version: 1, platforms: { leetcode: { data, status, verifiedAt } } };
}

test('new platform counts replace screenshot values and combined totals change', () => {
    const baseline = baselineStats();
    const next = mergeProfileResponse(baseline, response({ ...baseline.stats.leetcode, totalSolved: 257, mediumSolved: 126 }));
    assert.equal(next.stats.leetcode.totalSolved, 257);
    assert.equal(next.stats.leetcode.totalSolved + next.stats.gfg.problemsSolved, 500);
    assert.equal(next.sources.leetcode.status, 'verified');
    assert.equal(baseline.stats.leetcode.totalSolved, 256);
});
test('missing/malformed responses retain previous numbers and mark them stale', () => {
    const baseline = baselineStats();
    const good = mergeProfileResponse(baseline, response(baseline.stats.leetcode));
    const failed = mergeProfileResponse(good, response({ totalSolved: 0 }));
    assert.equal(failed.stats.leetcode.totalSolved, 256);
    assert.equal(failed.sources.leetcode.status, 'stale');
    assert.throws(() => mergeProfileResponse(baseline, '<html>404</html>'));
});
test('older cached data cannot overwrite newer verified data', () => {
    const baseline = baselineStats();
    const stale = mergeProfileResponse(baseline, response({ ...baseline.stats.leetcode, totalSolved: 254, mediumSolved: 123 }, 'stale', '2026-09-27T00:00:00Z'));
    assert.equal(stale.stats.leetcode.totalSolved, 256);
    assert.equal(stale.sources.leetcode.status, 'snapshot');
});
test('browser cache preserves fetched values across reloads without treating them as a new verification', () => {
    const original = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
    const storage = new Map();
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) } });
    try {
        const baseline = baselineStats();
        const next = mergeProfileResponse(baseline, response({ ...baseline.stats.leetcode, totalSolved: 257, mediumSolved: 126, privateInfo: 'must not persist' }));
        saveStats(next);
        const restored = loadSavedStats();
        assert.equal(restored.stats.leetcode.totalSolved, 257);
        assert.equal(restored.sources.leetcode.status, 'stale');
        assert.equal(Array.from(storage.values())[0].includes('privateInfo'), false);
        storage.set('raihan-profile-stats-v1', 'broken');
        assert.equal(loadSavedStats().stats.leetcode.totalSolved, 256);
    } finally {
        if (original) Object.defineProperty(globalThis, 'localStorage', original);
        else delete globalThis.localStorage;
    }
});
