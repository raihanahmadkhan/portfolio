# Raihan Ahmad — Portfolio

Personal portfolio of Raihan Ahmad, a final-year B.Tech Computer Science and Engineering student at BIT Mesra (2023–2027) and Software Developer Intern at SkyGrid LLC. Live at [ahmadraihan.netlify.app](https://ahmadraihan.netlify.app/).

## Tech Stack

- **React 19 + TypeScript** for the interface, with React Router for the home page, project pages and a 404 page.
- **Tailwind CSS v4** with theme tokens defined in `src/index.css`. Motion is limited to short CSS transitions, with no animation library.
- **Vite** for development and production builds.
- **Netlify** for hosting, with one serverless function for live profile statistics.

## Features

- **Retro city-pop design**: a poolside palette inspired by Hiroshi Nagai, with turquoise water, cobalt skies, cream-white surfaces and crisp geometric shadows. The toggle in the navigation bar switches to a dusk theme and remembers the choice.
- **Six project case studies** with real screenshots, problem and solution summaries, features and links to live demos or source.
- **Live competitive-programming statistics** from LeetCode, Codeforces, GeeksforGeeks and GitHub.
- **Accessible navigation**: skip link, keyboard-reachable cards, focus management on navigation, section deep links (`/#projects`) and scroll positions restored on back, forward and reload.
- **Stable rendering**: no work while idle, no layout shift while scrolling or when web fonts load, and reduced-motion preferences respected.
- **Responsive layout** from 320px phones to wide desktops.

## Project Structure

```
src/
  components/     page sections, navigation and footer
  components/ui/  shared building blocks (Button, Section, Timeline, icons, hero scene)
  data/           projects and site-wide links
  hooks/          theme, active section, scroll offset, document title, profile statistics
  lib/            profile statistics state and caching
  pages/          Home, ProjectDetail, NotFound
server/           profile statistics handler shared by Vite and Netlify
netlify/          Netlify function entry point
tests/            node:test suites for the statistics parsers and client state
```

To add a project, add an entry to `src/data/projects.ts` and a matching URL to `public/sitemap.xml`.

## Getting Started

```bash
git clone https://github.com/raihanahmadkhan/portfolio.git
cd portfolio
npm install
npm run dev
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run the statistics test suites |

## Automatic profile statistics

LeetCode, GFG, Codeforces and GitHub statistics are read directly from their public profiles through `/api/profile-stats`. Codolio remains a combined-profile link; its login-triggered sync is not a dependency.

The browser checks on page load, every five minutes while visible, and when returning to the tab (with a one-minute minimum between attempts). A five-minute server cache limits source traffic. Each platform shows its last successful verification time. Failures retain previously verified values, or the explicitly dated owner-supplied screenshot fallback, and show an availability message. Saved values are not presented as a successful live refresh.

No platform credentials are required. The Node handler runs as a Netlify Function after deployment, with the same handler mounted by Vite for `npm run dev` and `npm run preview`. A static `dist` upload without the Netlify Function cannot supply live statistics. New solves, ratings and contributions do not require a rebuild or redeployment after this integration is deployed.

`npm test` exercises parsers, changed counts, cache expiry, failures and client cache/state handling. GFG and GitHub use public page data, so a future upstream markup change may require an adapter update; changes fail visibly rather than fabricating counts.
