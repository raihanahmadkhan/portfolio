import fintrak from '../images/fintrak-live.jpg';
import foodhubConsole from '../images/foodhub-console.jpg';
import foodhubStorefront from '../images/foodhub-storefront.jpg';
import nile from '../images/nile-live.jpg';
import routelab from '../images/routelab-live.jpg';
import stressDetector from '../images/stress-detector-live.jpg';
import unibazaar from '../images/unibazaar-live.jpg';

interface Screenshot {
    src: string;
    alt: string;
    caption?: string;
    focus?: 'top' | 'center';
}

export interface Project {
    slug: string;
    name: string;
    tagline: string;
    period?: string;
    description: string;
    tech: string[];
    link?: string;
    github?: string;
    image: Screenshot;
    gallery?: Screenshot[];
    problem: string;
    solution: string;
    features: string[];
    learnings: string;
}

export const projects: Project[] = [
    {
        slug: 'foodhub',
        name: 'FoodHub',
        tagline: 'Agent-Native Food Ordering Platform',
        period: 'Jul–Sep 2026',
        description: 'FastAPI food-ordering service with 5 discoverable agent capabilities for Gemini tool calling, server-side authorization, approval workflows, spending limits and audit logging.',
        tech: ['FastAPI', 'Python', 'Gemini tool calling', 'React', 'TypeScript', 'SQLAlchemy', 'SQLite', 'Playwright', 'pytest'],
        github: 'https://github.com/raihanahmadkhan/agent-native-platform',
        image: { src: foodhubConsole, alt: 'FoodHub operator console comparing the browser interface with the agent-native interface', caption: 'Operator console' },
        gallery: [{ src: foodhubStorefront, alt: 'FoodHub storefront with city and cuisine search', caption: 'Storefront' }],
        problem: 'Browser agents must repeatedly load restaurant pages and inspect their DOM to answer constrained food-ordering requests. Actions also need explicit authorization, spending safeguards and a traceable decision history.',
        solution: 'A discoverable capability manifest lets Gemini call 5 server-side tools directly. A shared FastAPI service powers the agent interface, operator console and human storefront, with policy decisions that allow, hold for approval or deny actions.',
        features: [
            '5 discoverable capabilities: search restaurants, search items, create orders, track orders and cancel orders',
            'Policy-based authorization, record-level ownership checks and approval workflows',
            'Per-order and rolling daily spending limits with audit logging',
            '680 automated tests across the Python service, agent, storefront and TypeScript console suites',
            'Recorded benchmark: approximately 20x fewer tokens per completed agent-API trial than the Playwright browser-agent path, across 24 scheduled trials (6 fixtures × 2 paths × 2 repetitions)',
            'Benchmark caveats: a small sample, 4 browser trials lost to quota, and measurements taken before the storefront redesign',
        ],
        learnings: 'Built explicit capability contracts and server-enforced safeguards for agent actions. Kept the token benchmark separate from the console’s deterministic interface comparison, and retained raw results and limitations for reproducibility.',
    },
    {
        slug: 'route-optimizer',
        name: 'RouteLab',
        tagline: 'Delivery Routing & Optimization',
        period: 'Mar–Apr 2026',
        description: 'FastAPI and React/TypeScript routing platform with 5 optimization solvers, supporting up to 100 customers and 25 vehicles under capacity, time-window and shift constraints.',
        tech: ['React', 'TypeScript', 'FastAPI', 'Python', 'OSRM', 'SQLite'],
        link: 'https://droptimizer.netlify.app/',
        github: 'https://github.com/raihanahmadkhan/delivery-backend',
        image: { src: routelab, alt: 'RouteLab plan view showing three vehicle routes radiating from a depot', focus: 'center' },
        problem: 'Delivery planning must assign customers to vehicles while respecting capacity, customer time windows, driver shifts and route limits. A shorter route is useful only when its schedule is feasible.',
        solution: 'A constraint-aware routing engine combines selectable solvers, independently checked schedules, OSRM road-distance data and durable background jobs. The React/TypeScript interface visualizes vehicle assignments and optimization results.',
        features: [
            '5 solvers: cheapest insertion, insertion with local search, adaptive large neighborhood search (ALNS), exact reference and optional OR-Tools',
            'Up to 100 customers and 25 vehicles; exact reference is limited to 8 customers',
            'Capacity, time-window, shift and maximum-distance constraints with independent schedule validation',
            'OSRM road snapshots and offline schematic scenarios',
            'Durable background execution, route visualization, vehicle schedules and search replay',
        ],
        learnings: 'Separated optimization from feasibility checking and background-job lifecycle management. Used reference solvers and reproducible scenarios to inspect route quality without claiming unsupported percentage improvements.',
    },
    {
        slug: 'stress-detector',
        name: 'Student Stress Detector',
        tagline: 'Fuzzy Inference System',
        period: 'Nov–Dec 2025',
        description: 'Full-stack routine-based student stress assessment with FastAPI, React/TypeScript and PostgreSQL, using a deterministic 3-component, 27-rule fuzzy inference engine with explainable results.',
        tech: ['React', 'TypeScript', 'FastAPI', 'Python', 'PostgreSQL', 'SQLAlchemy', 'Alembic'],
        link: 'https://stressdetect.netlify.app/',
        github: 'https://github.com/raihanahmadkhan/studentStressDetector',
        image: { src: stressDetector, alt: 'Student Stress Detector landing page with a sample stress snapshot' },
        problem: 'A single stress score does not explain how sleep, academic workload, deadlines, commitments and recovery contribute to a student’s routine. Personal check-ins also need private, longitudinal records.',
        solution: 'A deterministic product-sum fuzzy system computes academic pressure, recovery deficit and contextual pressure from 27 authored rules. Contributor-based explanations accompany each estimate, while self-reported strain remains separate.',
        features: [
            '3 explainable components with 9 rules each: 27 authored fuzzy rules',
            'Independent-oracle coverage of 1,375 supported component input pairs',
            'Private daily check-ins, longitudinal history and revision tracking',
            'Isolated what-if analysis that does not overwrite saved observations',
            'PostgreSQL persistence and authenticated ownership checks',
            'Routine-based estimates, not a clinical diagnosis or a trained predictive model',
        ],
        learnings: 'Built deterministic and explainable inference, tested component calculations against an independent rational oracle, and preserved user history while keeping hypothetical scenarios isolated.',
    },
    {
        slug: 'fintrak',
        name: 'FinTrak',
        tagline: 'Expense Management Platform',
        description: 'Expense management platform for teams, with role-based approval workflows, analytics dashboards and JWT authentication.',
        tech: ['React', 'Material UI', 'Spring Boot', 'MySQL', 'JWT', 'Chart.js'],
        link: 'https://fntk.netlify.app/',
        image: { src: fintrak, alt: 'FinTrak landing page with an expense dashboard preview' },
        problem: 'Team expenses are tracked across spreadsheets, email and chat tools, which slows approvals and makes spending hard to analyze.',
        solution: 'A single platform with role-based workflows for employees, managers and finance teams, with status tracking and analytics dashboards.',
        features: [
            'Expense management with status tracking (Pending / Approved)',
            'Role-based approval workflows for managers and finance teams',
            'Analytics dashboards and filterable spending views',
            'Authenticated routes and role-based authorization using JWT',
        ],
        learnings: 'Led frontend development with React and Material UI, contributed to the Spring Boot and MySQL REST APIs, and built the analytics dashboards with Chart.js.',
    },
    {
        slug: 'unibazaar',
        name: 'UniBazaar',
        tagline: 'Campus Marketplace',
        description: 'Marketplace for students to list and manage items for sale on campus, with Firebase Authentication and Cloudinary image hosting.',
        tech: ['React', 'Node.js', 'MongoDB', 'Firebase'],
        link: 'https://unibazaar.netlify.app/',
        image: { src: unibazaar, alt: 'UniBazaar home page with search and category browsing' },
        problem: 'Students buy and sell textbooks and dorm essentials through scattered social media groups, with no dedicated platform for campus listings.',
        solution: 'A marketplace with student accounts through Firebase Authentication, categorized listings and image uploads handled by Cloudinary.',
        features: [
            'Student authentication with Firebase',
            'Image optimization and hosting with Cloudinary',
            'Categorized listings such as books and electronics',
            'Search and filtering',
        ],
        learnings: 'Integrated third-party services (Firebase, Cloudinary) into a MERN application and handled complex forms and file uploads.',
    },
    {
        slug: 'nile-ecommerce',
        name: 'Nile',
        tagline: 'E-commerce Website',
        description: 'Framework-free shopping interface with product filters, a cart stored in local storage and a mobile-first layout.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        link: 'https://raihanahmadkhan.github.io/Nile/nile.html',
        image: { src: nile, alt: 'Nile storefront showing a product grid with ratings and add-to-cart buttons' },
        problem: 'E-commerce templates often load heavy frameworks for simple pages. The goal was a fast shopping interface built with only HTML, CSS and JavaScript.',
        solution: 'A mobile-first storefront built without frameworks, managing cart and filter state through direct DOM updates.',
        features: [
            'Mobile-first responsive design',
            'Product filtering and sorting',
            'Shopping cart stored in local storage',
            'Direct DOM updates without a framework',
        ],
        learnings: 'Practiced core web fundamentals (the DOM, event bubbling) and built interactive UI without a framework.',
    },
];
