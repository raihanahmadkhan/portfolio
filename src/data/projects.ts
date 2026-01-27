export interface Project {
    slug: string;
    title: string;
    description: string;
    tech: string[];
    link: string;
    github?: string;
    problem: string;
    solution: string;
    features: string[];
    learnings: string;
    emoji: string;
    featured?: boolean;
    status?: 'active' | 'completed' | 'archived';
    category?: 'Full-Stack' | 'Frontend' | 'AI/ML' | 'Backend';
}


export const projects: Project[] = [
    {
        slug: "fintrak",
        title: "FinTrak - Expense Management Platform",
        description: "Web-based expense management platform for teams and businesses. Features role-based approval workflows, analytics dashboards, and secure authentication.",
        tech: ["React", "Material UI", "Spring Boot", "MySQL", "JWT", "OAuth2", "Chart.js"],
        link: "https://fntk.netlify.app/",
        emoji: "💼",
        featured: true,
        status: "active",
        category: "Full-Stack",
        problem: "Expense tracking for teams is fragmented across spreadsheets, email, and chat tools, making approvals slow and analytics difficult.",
        solution: "A centralized expense management platform with role-based workflows for employees, managers, and finance teams. Features real-time analytics and status tracking.",
        features: [
            "Expense management with status tracking (Pending / Approved)",
            "Role-based approval workflows for managers and finance teams",
            "Analytics dashboards and filterable spending views",
            "Authenticated routes and role-based authorization using JWT and OAuth2"
        ],
        learnings: "Led front-end development building intuitive React components with Material UI. Assisted in developing secure REST APIs using Spring Boot with MySQL. Integrated real-time analytics dashboards using Chart.js."
    },
    {
        slug: "stress-detector",
        title: "AI-Powered Student Stress Detector",
        description: "Full-stack stress analysis system implementing a Mamdani Fuzzy Inference Model. Features real-time visualizations with Chart.js and client-side inference fallback.",
        tech: ["React", "FastAPI", "Chart.js", "Python"],
        link: "https://stressdetect.netlify.app/",
        emoji: "🧠",
        featured: true,
        status: "completed",
        category: "AI/ML",
        problem: "Student stress is a growing concern, but quantifying it in real-time is difficult. Traditional surveys are static and retrospect, lacking immediate feedback mechanisms.",
        solution: "A real-time analysis system that uses a Mamdani Fuzzy Inference System to process inputs and determine stress levels. It provides immediate visual feedback and actionable insights.",
        features: [
            "Mamdani Fuzzy Inference Model with 21 rules",
            "Real-time stress gauges and membership degree charts",
            "Client-side inference fallback for offline use",
            "JSON report export and history tracking"
        ],
        learnings: "Deepened understanding of Fuzzy Logic systems and how to implement mathematical models in a web context. Learned to optimize heavy client-side calculations."
    },
    {
        slug: "unibazaar",
        title: "UniBazaar - Campus Marketplace",
        description: "A secure platform for listing and managing campus items. Implemented Firebase Authentication and Cloudinary for media handling.",
        tech: ["React", "Node.js", "MongoDB", "Firebase"],
        link: "https://unibazaar.netlify.app/",
        emoji: "🏪",
        status: "completed",
        category: "Full-Stack",
        problem: "University campuses lack a dedicated, secure platform for students to buy and sell textbooks and dorm essentials, often relying on fragmented social media groups.",
        solution: "A centralized marketplace application with verified student accounts (via Firebase Auth) and categorized listings. Includes secure image uploading via Cloudinary.",
        features: [
            "Secure student authentication with Firebase",
            "Image optimization and hosting with Cloudinary",
            "Categorized listings (Books, Electronics, etc.)",
            "Real-time search and filtering"
        ],
        learnings: "Mastered the integration of third-party services (Firebase, Cloudinary) into a MERN stack application. Improved skills in handling complex forms and file uploads."
    },
    {
        slug: "nile-ecommerce",
        title: "Nile - E-commerce Website",
        description: "Responsive shopping interface with optimized DOM handling. Features product filters, cart functionality, and mobile-first design.",
        tech: ["HTML", "CSS", "JavaScript"],
        link: "https://raihanahmadkhan.github.io/Nile/nile.html",
        emoji: "🛍️",
        status: "completed",
        category: "Frontend",
        problem: "Many e-commerce templates are bloated and slow. The goal was to build a highly performant shopping interface using only vanilla web technologies.",
        solution: "A lightweight, mobile-first e-commerce interface built without frameworks. capable of handling complex state (cart, filters) with raw DOM manipulation.",
        features: [
            "Mobile-first responsive design",
            "Dynamic product filtering and sorting",
            "Local storage-based shopping cart",
            "Optimized DOM manipulation for performance"
        ],
        learnings: "Solidified core web fundamentals (DOM, Event Bubbling) and learned to build complex UI interactions without relying on heavy frameworks."
    }
];
