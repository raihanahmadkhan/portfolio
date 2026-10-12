import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createStatsService, parseLeetCode, parseGfg, parseGitHub, parseCodeforces } from '../server/profile-stats.mjs';

function leetcode(total = 256, medium = 125) {
    return { data: { matchedUser: { username: 'raihanahmad', submitStatsGlobal: { acSubmissionNum: [{ difficulty: 'All', count: total }, { difficulty: 'Easy', count: 80 }, { difficulty: 'Medium', count: medium }, { difficulty: 'Hard', count: 51 }] } }, userContestRanking: { rating: 1413.589 } } };
}
function gfg(score = 991) {
    const record = ['$', '$L2c', null, { username: 'raihan', articleCount: { total_problems_solved: 243, score, institute_rank: 158, pod_correct_submissions_count: 127 } }];
    const flight = `6:${JSON.stringify(record)}\n`;
    const split = Math.floor(flight.length / 2);
    return `<script>self.__next_f.push(${JSON.stringify([1, flight.slice(0, split)])})</script><script>self.__next_f.push(${JSON.stringify([1, flight.slice(split)])})</script>`;
}
function github(total = 320) { return `<h2>\n ${total} <span>contributions</span>\n in the last year\n</h2>`; }
const codeforces = { status: 'OK', result: [{ handle: 'raihan_ahmad', rating: 1839, maxRating: 1839 }] };

test('LeetCode maps difficulty counts and rounds the actual contest rating', () => {
    assert.deepEqual(parseLeetCode(leetcode()), { totalSolved: 256, easySolved: 80, mediumSolved: 125, hardSolved: 51, contestRating: 1414 });
});
test('LeetCode rejects the wrong profile and inconsistent counts', () => {
    const wrong = leetcode(); wrong.data.matchedUser.username = 'another-user';
    assert.throws(() => parseLeetCode(wrong));
    assert.throws(() => parseLeetCode(leetcode(999)));
});
test('GFG decodes split JSON flight records and maps POTDs, not streaks', () => {
    assert.deepEqual(parseGfg(gfg()), { problemsSolved: 243, codingScore: 991, instituteRank: 158, potdsSolved: 127 });
});
test('GFG rejects changed formats and does not execute inline scripts', () => {
    assert.throws(() => parseGfg('<script>throw new Error("do not execute")</script>'));
});
test('GitHub reads the rolling-year count, including zero and comma grouping', () => {
    assert.equal(parseGitHub(github('1,321')).contributionsLastYear, 1321);
    assert.equal(parseGitHub(github(0)).contributionsLastYear, 0);
    assert.throws(() => parseGitHub('<h2>321 contributions in 2026</h2>'));
});
test('Codeforces rejects another account and supports unrated profiles', () => {
    assert.deepEqual(parseCodeforces(codeforces), { rating: 1839, maxRating: 1839 });
    assert.deepEqual(parseCodeforces({ status: 'OK', result: [{ handle: 'raihan_ahmad' }] }), { rating: null, maxRating: null });
    assert.throws(() => parseCodeforces({ status: 'OK', result: [{ handle: 'wrong' }] }));
});

function fixture() {
    let time = Date.parse('2026-10-12T08:00:00Z');
    let calls = 0;
    let total = 256;
    let failGithub = false;
    const fetchImpl = async (url, options) => {
        calls++;
        if (url.includes('leetcode')) {
            assert.equal(options.method, 'POST');
            return Response.json(leetcode(total, total - 131));
        }
        if (url.includes('geeksforgeeks')) return new Response(gfg());
        if (url.includes('github')) return failGithub ? new Response('Blocked', { status: 403 }) : new Response(github(total + 64));
        return Response.json(codeforces);
    };
    return { service: createStatsService({ fetchImpl, now: () => time }), calls: () => calls, advance: ms => { time += ms; }, solve: () => { total++; }, fail: () => { failGithub = true; } };
}
const request = () => new Request('https://portfolio.example/api/profile-stats');

test('cached requests deduplicate source traffic and new solves appear after expiry', async () => {
    const f = fixture();
    const [first, concurrent] = await Promise.all([f.service(request()), f.service(request())]);
    assert.equal((await first.json()).platforms.leetcode.data.totalSolved, 256);
    assert.equal((await concurrent.json()).platforms.github.data.contributionsLastYear, 320);
    assert.equal(f.calls(), 4);
    f.solve();
    await f.service(request());
    assert.equal(f.calls(), 4);
    f.advance(300001);
    const updated = await (await f.service(request())).json();
    assert.equal(updated.platforms.leetcode.data.totalSolved, 257);
    assert.equal(updated.platforms.github.data.contributionsLastYear, 321);
    assert.equal(f.calls(), 8);
});
test('source failure retains its previous value and timestamp without claiming a fresh verification', async () => {
    const f = fixture();
    const first = await (await f.service(request())).json();
    f.advance(300001); f.fail();
    const response = await f.service(request());
    const later = await response.json();
    assert.equal(later.platforms.github.status, 'stale');
    assert.equal(later.platforms.github.data.contributionsLastYear, 320);
    assert.equal(later.platforms.github.verifiedAt, first.platforms.github.verifiedAt);
    assert.equal(later.platforms.leetcode.status, 'verified');
    assert.equal(response.headers.get('cache-control'), 'no-store');
});
test('cold-start failures are unavailable, never invented zero counts', async () => {
    const service = createStatsService({ fetchImpl: async () => new Response('No', { status: 503 }) });
    const data = await (await service(request())).json();
    for (const entry of Object.values(data.platforms)) assert.deepEqual(entry, { data: null, verifiedAt: null, status: 'unavailable' });
});
test('endpoint accepts reads only', async () => {
    const f = fixture();
    const response = await f.service(new Request('https://portfolio.example/api/profile-stats', { method: 'POST' }));
    assert.equal(response.status, 405);
    assert.equal(f.calls(), 0);
});
