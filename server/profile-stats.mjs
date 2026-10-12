const FIVE_MINUTES = 5 * 60 * 1000;
const HEADERS = { 'User-Agent': 'RaihanPortfolio/1.0 (+https://ahmadraihan.netlify.app/)' };

function count(value) {
    if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0) {
        throw new Error('Invalid profile count');
    }
    return value;
}

function rating(value) {
    if (value == null) return null;
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
        throw new Error('Invalid profile rating');
    }
    return Math.round(value);
}

export function parseLeetCode(payload) {
    if (payload.errors?.length) throw new Error('LeetCode query failed');
    const user = payload.data?.matchedUser;
    if (user?.username !== 'raihanahmad') throw new Error('Unexpected LeetCode profile');
    const rows = user.submitStatsGlobal?.acSubmissionNum;
    if (!Array.isArray(rows)) throw new Error('Missing LeetCode counts');
    const get = difficulty => count(rows.find(row => row.difficulty === difficulty)?.count);
    const data = { totalSolved: get('All'), easySolved: get('Easy'), mediumSolved: get('Medium'), hardSolved: get('Hard'), contestRating: rating(payload.data.userContestRanking?.rating) };
    if (data.totalSolved !== data.easySolved + data.mediumSolved + data.hardSolved) {
        throw new Error('Inconsistent LeetCode counts');
    }
    return data;
}

export function parseGfg(html) {
    let stream = '';
    for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) {
        const push = match[1].trim().match(/^self\.__next_f\.push\(([\s\S]*)\);?$/);
        if (!push) continue;
        try {
            const chunk = JSON.parse(push[1]);
            if (chunk[0] === 1 && typeof chunk[1] === 'string') stream += chunk[1];
        } catch {
            continue;
        }
    }
    for (const line of stream.split('\n')) {
        const separator = line.indexOf(':');
        if (separator < 0) continue;
        let record;
        try { record = JSON.parse(line.slice(separator + 1)); } catch { continue; }
        const props = Array.isArray(record) ? record[3] : null;
        if (props?.username !== 'raihan' || !props.articleCount) continue;
        const data = props.articleCount;
        return { problemsSolved: count(data.total_problems_solved), codingScore: count(data.score), instituteRank: data.institute_rank == null ? null : count(data.institute_rank), potdsSolved: count(data.pod_correct_submissions_count) };
    }
    throw new Error('GFG public profile format changed');
}

export function parseGitHub(html) {
    for (const match of html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)) {
        const text = match[1].replace(/<[^>]*>/g, ' ').replace(/&nbsp;|&#160;/g, ' ');
        const total = text.match(/([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i);
        if (total) return { contributionsLastYear: count(Number(total[1].replaceAll(',', ''))) };
    }
    throw new Error('GitHub contribution heading unavailable');
}

export function parseCodeforces(payload) {
    const user = payload.status === 'OK' ? payload.result?.[0] : null;
    if (user?.handle?.toLowerCase() !== 'raihan_ahmad') throw new Error('Unexpected Codeforces profile');
    return { rating: rating(user.rating), maxRating: rating(user.maxRating) };
}

export function createStatsService({ fetchImpl = fetch, now = Date.now } = {}) {
    const cache = new Map();
    const pending = new Map();

    async function read(url, options = {}) {
        const response = await fetchImpl(url, { ...options, headers: { ...HEADERS, ...options.headers }, signal: AbortSignal.timeout(8000) });
        if (!response.ok) throw new Error('Profile source unavailable');
        return response;
    }

    const sources = {
        leetcode: async () => parseLeetCode(await (await read('https://leetcode.com/graphql', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: 'query { matchedUser(username: "raihanahmad") { username submitStatsGlobal { acSubmissionNum { difficulty count } } } userContestRanking(username: "raihanahmad") { rating } }' })
        })).json()),
        gfg: async () => parseGfg(await (await read('https://www.geeksforgeeks.org/profile/raihan')).text()),
        github: async () => parseGitHub(await (await read('https://github.com/users/raihanahmadkhan/contributions')).text()),
        codeforces: async () => parseCodeforces(await (await read('https://codeforces.com/api/user.info?handles=raihan_ahmad')).json())
    };

    async function getPlatform(platform) {
        const saved = cache.get(platform);
        if (saved && now() < saved.expiresAt) return { data: saved.data, verifiedAt: saved.verifiedAt, status: 'verified' };
        if (pending.has(platform)) return pending.get(platform);
        const request = (async () => {
            try {
                const data = await sources[platform]();
                const verifiedAt = new Date(now()).toISOString();
                cache.set(platform, { data, verifiedAt, expiresAt: now() + FIVE_MINUTES });
                return { data, verifiedAt, status: 'verified' };
            } catch {
                return saved ? { data: saved.data, verifiedAt: saved.verifiedAt, status: 'stale' } : { data: null, verifiedAt: null, status: 'unavailable' };
            } finally {
                pending.delete(platform);
            }
        })();
        pending.set(platform, request);
        return request;
    }

    return async request => {
        if (request.method !== 'GET') return new Response(null, { status: 405, headers: { Allow: 'GET', 'Cache-Control': 'no-store' } });
        const entries = await Promise.all(Object.keys(sources).map(async key => [key, await getPlatform(key)]));
        const platforms = Object.fromEntries(entries);
        const allVerified = entries.every(([, entry]) => entry.status === 'verified');
        const ttl = allVerified ? Math.max(0, Math.floor(Math.min(...Array.from(cache.values()).map(entry => entry.expiresAt - now())) / 1000)) : 0;
        return Response.json({ version: 1, checkedAt: new Date(now()).toISOString(), platforms }, {
            headers: { 'Cache-Control': allVerified ? `public, max-age=${Math.min(30, ttl)}, s-maxage=${ttl}` : 'no-store' }
        });
    };
}

const handler = createStatsService();
export default handler;

export async function profileStatsMiddleware(req, res, next) {
    if (req.url?.split('?')[0] !== '/api/profile-stats') return next();
    try {
        const response = await handler(new Request('http://localhost/api/profile-stats', { method: req.method }));
        res.statusCode = response.status;
        response.headers.forEach((value, key) => res.setHeader(key, value));
        res.end(await response.text());
    } catch {
        res.statusCode = 503;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        res.end(JSON.stringify({ error: 'Profile statistics unavailable' }));
    }
}
