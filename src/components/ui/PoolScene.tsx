const round = (n: number) => Math.round(n * 10) / 10;

const frond = (cx: number, cy: number, angle: number, length: number) => {
    const rad = (angle * Math.PI) / 180;
    const tipX = cx + Math.cos(rad) * length;
    const tipY = cy - Math.sin(rad) * length * 0.55 + length * 0.34;
    const ctrlX = cx + Math.cos(rad) * length * 0.5;
    const ctrlY = cy - Math.sin(rad) * length * 0.6 - length * 0.3;
    const spine = (t: number) => [
        (1 - t) ** 2 * cx + 2 * (1 - t) * t * ctrlX + t ** 2 * tipX,
        (1 - t) ** 2 * cy + 2 * (1 - t) * t * ctrlY + t ** 2 * tipY,
    ];

    const steps = 10;
    const edges = [1, -1].map((side) => {
        let d = `M${cx} ${cy}`;
        for (let i = 0; i < steps; i++) {
            const t = (i + 0.5) / steps;
            const [x, y] = spine(t);
            let dx = 2 * (1 - t) * (ctrlX - cx) + 2 * t * (tipX - ctrlX);
            let dy = 2 * (1 - t) * (ctrlY - cy) + 2 * t * (tipY - ctrlY);
            const norm = Math.hypot(dx, dy) || 1;
            dx /= norm;
            dy /= norm;
            let vx = dx * 0.7 - dy * side;
            let vy = dy * 0.7 + dx * side + 0.6;
            const v = Math.hypot(vx, vy) || 1;
            vx /= v;
            vy /= v;
            const leaflet = length * 0.32 * Math.sin(Math.PI * (0.14 + 0.82 * t));
            const [nx, ny] = spine((i + 1) / steps);
            d += `L${round(x + vx * leaflet)} ${round(y + vy * leaflet)}L${round(nx)} ${round(ny)}`;
        }
        return `${d}Q${round(ctrlX)} ${round(ctrlY)} ${cx} ${cy}Z`;
    });

    const upper = Math.cos(rad) >= 0 ? 1 : 0;
    return { lit: edges[upper], shaded: edges[1 - upper] };
};

const palm = (cx: number, cy: number, length: number, angles: number[]) =>
    angles.map((angle, i) => frond(cx, cy, angle, length * (0.86 + ((i * 7) % 5) * 0.06)));

const tallPalm = palm(262, 132, 150, [-28, 8, 42, 76, 106, 138, 172, 206]);
const shortPalm = palm(170, 282, 118, [-22, 14, 50, 88, 122, 156, 198]);

const wave = (x: number, y: number, size: number, crests: number) =>
    `M${x} ${y}q${size} ${-size * 0.62} ${size * 2} 0${`t${size * 2} 0`.repeat(crests - 1)}`;

const ripples = [98, 126, 158, 194, 228].map((y, row) => {
    const size = 8 + row * 3;
    let d = '';
    for (let x = (row * 97) % 140, i = row; x < 3600; i++) {
        const crests = 2 + ((i * 5 + row) % 4);
        d += wave(x, y + ((i * 7) % 3) * 5 - 5, size, crests);
        x += size * 2 * crests + 70 + ((i * 53) % 5) * (26 + row * 9);
    }
    return { d, width: 2.4 + row * 0.5 };
});

const clouds: [number, number, number, number][][] = [
    [[560, 150, 150, 34], [640, 118, 86, 46], [720, 132, 96, 40]],
    [[1190, 148, 150, 40], [1270, 112, 84, 52], [1356, 86, 74, 58], [1436, 116, 86, 50], [1520, 146, 120, 36]],
    [[1740, 152, 90, 20], [1800, 140, 56, 22], [1872, 150, 80, 18]],
    [[2150, 148, 140, 38], [2236, 104, 88, 56], [2330, 78, 80, 62], [2420, 112, 90, 52], [2510, 146, 130, 36]],
    [[2960, 150, 150, 34], [3050, 122, 90, 44], [3130, 138, 96, 36]],
];

export const PoolScene = () => (
    <div className="pool-scene" aria-hidden="true">
        <svg className="pool-scene__clouds" viewBox="0 0 3600 160" preserveAspectRatio="xMidYMax slice">
            {clouds.map((cloud, i) => (
                <g key={i}>
                    {cloud.map(([cx, cy, rx, ry]) => (
                        <ellipse key={cx} cx={cx} cy={cy} rx={rx} ry={ry} fill="var(--scene-cloud)" />
                    ))}
                    {cloud.map(([cx, cy, rx, ry]) => (
                        <ellipse key={`shade-${cx}`} cx={cx + rx * 0.08} cy={cy + ry * 0.55} rx={rx * 0.86} ry={ry * 0.5} fill="var(--scene-cloud-shade)" opacity="0.55" />
                    ))}
                </g>
            ))}
        </svg>

        <svg className="pool-scene__villa hidden md:block [@media(max-height:32rem)]:hidden" viewBox="0 0 420 340">
            <rect x="0" y="96" width="290" height="244" fill="var(--scene-wall)" />
            <rect x="290" y="206" width="130" height="134" fill="var(--scene-wall)" />
            <polygon points="290,206 366,206 290,312" fill="var(--scene-wall-shade)" />
            <rect x="-10" y="80" width="322" height="18" fill="var(--scene-wall-bright)" />
            <rect x="0" y="98" width="290" height="22" fill="var(--scene-wall-shade)" />
            <rect x="284" y="194" width="146" height="13" fill="var(--scene-wall-bright)" />
            <rect x="34" y="158" width="212" height="74" fill="var(--scene-glass)" />
            <polygon points="34,158 128,158 70,232 34,232" fill="var(--scene-glass-glint)" />
            <path d="M104 158V232M176 158V232" stroke="var(--scene-wall)" strokeWidth="5" />
            <rect x="332" y="246" width="54" height="94" fill="var(--scene-glass)" />
            <polygon points="0,258 132,340 0,340" fill="var(--scene-wall-shade)" />
        </svg>

        <svg className="pool-scene__palms" viewBox="0 0 420 600">
            <g fill="none" strokeLinecap="round">
                <path d="M300 600Q322 366 262 132" stroke="var(--scene-trunk)" strokeWidth="13" />
                <path d="M296 600Q318 366 259 136" stroke="var(--scene-trunk-light)" strokeWidth="4" />
                <path d="M146 600Q126 436 170 282" stroke="var(--scene-trunk)" strokeWidth="11" />
                <path d="M143 600Q123 436 167 286" stroke="var(--scene-trunk-light)" strokeWidth="3.5" />
            </g>
            {[...tallPalm, ...shortPalm].map(({ lit, shaded }, i) => (
                <g key={i}>
                    <path d={shaded} fill="var(--scene-palm)" />
                    <path d={lit} fill="var(--scene-palm-light)" />
                </g>
            ))}
        </svg>

        <svg className="pool-scene__ground" viewBox="0 0 3600 240" preserveAspectRatio="xMidYMax slice">
            <rect width="3600" height="32" fill="var(--scene-sea)" />
            <path d="M0 9H3600M0 19H3600" stroke="var(--scene-sea-glint)" strokeWidth="1.5" strokeDasharray="70 130 24 210" opacity="0.6" />
            <rect y="30" width="3600" height="36" fill="var(--scene-deck)" />
            <polygon points="0,30 1420,30 1476,66 0,66" fill="var(--scene-deck-shade)" />
            <rect y="66" width="3600" height="174" fill="var(--pool)" />
            <rect y="66" width="3600" height="13" fill="var(--pool-deep)" />
            <g fill="none" stroke="var(--scene-ripple)" strokeLinecap="round">
                {ripples.map(({ d, width }) => (
                    <path key={width} d={d} strokeWidth={width} />
                ))}
            </g>
            <g fill="none" stroke="var(--scene-chrome)" strokeWidth="5" strokeLinecap="round">
                <path d="M1640 58V36a10 10 0 0 1 20 0V108M1690 58V36a10 10 0 0 1 20 0V108" />
                <path d="M1660 86H1710M1660 102H1710" strokeWidth="4" />
            </g>
        </svg>
    </div>
);
