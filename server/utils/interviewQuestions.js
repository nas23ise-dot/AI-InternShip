// Comprehensive Interview Questions Database
// Covers HR, Technical, and Behavioral questions for various roles

const interviewQuestions = {
    "Visual Designer": {
        hr: [
            {
                question: "Tell me about yourself and your design journey.",
                answer: "Focus on your passion for design, highlight relevant projects, mention design tools you're proficient in (Figma, Adobe XD, etc.), and explain how you solve user problems through design.",
                difficulty: "Easy",
                round: "HR Round"
            },
            {
                question: "Why do you want to work at our company?",
                answer: "Research the company's design philosophy, mention specific products/campaigns you admire, align your values with theirs, and show enthusiasm for their design culture.",
                difficulty: "Easy",
                round: "HR Round"
            },
            {
                question: "Where do you see yourself in 5 years?",
                answer: "Express goals to grow as a designer (e.g., Senior Designer, Lead UX), mention continuing education, and show commitment to the field.",
                difficulty: "Easy",
                round: "HR Round"
            },
            {
                question: "What are your salary expectations?",
                answer: "Research market rates for your role and location. Provide a range (e.g., $50k-$65k for entry-level), be flexible but know your value.",
                difficulty: "Medium",
                round: "HR Round"
            }
        ],
        behavioral: [
            {
                question: "What inspired you to become a Visual Designer?",
                answer: "Showcase your passion for design and creativity. Mention specific moments or projects that sparked your interest. Example: 'I've always been drawn to visual storytelling. In college, I redesigned our university's newsletter and saw how good design could improve communication and engagement.'",
                difficulty: "Easy",
                round: "Behavioral"
            },
            {
                question: "How do you stay updated with the latest design trends?",
                answer: "Mention design blogs (Dribbble, Behance), podcasts (Design Details), social media (Designer Twitter, Instagram), courses, and conferences you follow. Show continuous learning mindset.",
                difficulty: "Medium",
                round: "Behavioral"
            },
            {
                question: "Describe a time when a client or stakeholder rejected your design. How did you handle it?",
                answer: "Use STAR method: Describe the Situation, Task, Action, and Result. Show professionalism, openness to feedback, and problem-solving. Example: 'A client wanted comic sans for a corporate website. I listened to their preferences, understood they wanted approachability, and presented modern alternatives with similar warmth but better readability.'",
                difficulty: "Hard",
                round: "Behavioral"
            },
            {
                question: "Can you walk us through your design process when approaching a new project?",
                answer: "Outline your process: Research → Conceptualization → Iteration → Feedback → Refinement. Emphasize user research, mood boards, sketches, prototyping, and testing.",
                difficulty: "Hard",
                round: "Technical Round 1"
            }
        ],
        technical: [
            {
                question: "What design tools are you proficient in?",
                answer: "List tools with proficiency levels: Figma (Expert), Adobe Illustrator (Intermediate), Photoshop (Advanced), etc. Mention any new tools you're learning.",
                difficulty: "Easy",
                round: "Technical Round 1"
            },
            {
                question: "Explain the difference between UI and UX design.",
                answer: "UI (User Interface) focuses on visual elements - buttons, typography, colors. UX (User Experience) focuses on overall feel, user journey, and problem-solving. Both work together for great products.",
                difficulty: "Easy",
                round: "Technical Round 1"
            },
            {
                question: "What is the golden ratio and how do you use it in design?",
                answer: "The golden ratio (1:1.618) is a mathematical proportion found in nature. Used in design for visually pleasing layouts, spacing, and compositions. Example: Dividing a canvas into sections using 1:1.618 creates balanced hierarchy.",
                difficulty: "Medium",
                round: "Technical Round 2"
            },
            {
                question: "How do you ensure your designs are accessible?",
                answer: "Follow WCAG guidelines: Adequate color contrast (4.5:1 for text), keyboard navigation, alt text for images, scalable fonts, and test with screen readers. Design for diverse users including those with disabilities.",
                difficulty: "Medium",
                round: "Technical Round 2"
            },
            {
                question: "Explain your understanding of design systems.",
                answer: "Design systems are comprehensive guides containing reusable components, patterns, and guidelines. They ensure consistency, improve collaboration, and speed up design process. Examples: Material Design, Apple HIG.",
                difficulty: "Hard",
                round: "Technical Round 3"
            },
            {
                question: "How do you approach designing for mobile vs desktop?",
                answer: "Mobile-first approach: Consider touch targets (min 44px), thumb zones, limited screen space, and vertical scrolling. Desktop allows more complexity, hover states, and multi-column layouts. Responsive design adapts between them.",
                difficulty: "Hard",
                round: "Technical Round 3"
            },
            {
                question: "Walk me through how you would redesign our company's website/app.",
                answer: "Start with user research, analyze current pain points, review analytics, conduct competitor analysis. Present sketches/wireframes showing improvements to navigation, visual hierarchy, and user flow. Focus on solving real problems, not just visual changes.",
                difficulty: "Hard",
                round: "Final Round"
            }
        ]
    },

    "Full Stack Developer": {
        hr: [
            {
                question: "Tell me about yourself.",
                answer: "Highlight your technical background, key projects (mention tech stack: MERN, MEAN, etc.), problem-solving ability, and passion for building full applications.",
                difficulty: "Easy",
                round: "HR Round"
            },
            {
                question: "Why did you choose software development?",
                answer: "Share your passion for creating solutions, building things from scratch, continuous learning in tech, and impact of software on society.",
                difficulty: "Easy",
                round: "HR Round"
            },
            {
                question: "What's your preferred work environment?",
                answer: "Mention collaborative team, agile methodology, learning opportunities, and balance between independent and team work.",
                difficulty: "Easy",
                round: "HR Round"
            }
        ],
        behavioral: [
            {
                question: "Describe a challenging bug you fixed recently.",
                answer: "Use STAR method. Explain the bug, your debugging approach (console logs, breakpoints, stack trace analysis), solution, and what you learned. Show systematic problem-solving.",
                difficulty: "Medium",
                round: "Behavioral"
            },
            {
                question: "Tell me about a time you disagreed with a team member on technical approach.",
                answer: "Show healthy conflict resolution: Present both viewpoints objectively, mention data/benchmarks used to decide, emphasize collaboration and team goals over ego.",
                difficulty: "Hard",
                round: "Behavioral"
            },
            {
                question: "How do you prioritize tasks when working on multiple features?",
                answer: "Mention frameworks like MoSCoW (Must, Should, Could, Won't), urgency vs importance matrix, stakeholder communication, and breaking large tasks into manageable chunks.",
                difficulty: "Medium",
                round: "Behavioral"
            }
        ],
        technical: [
            {
                question: "Explain the difference between frontend and backend.",
                answer: "Frontend: Client-side, what users see (HTML, CSS, JavaScript, React). Backend: Server-side, business logic, databases (Node.js, Express, MongoDB). They communicate via APIs.",
                difficulty: "Easy",
                round: "Technical Round 1"
            },
            {
                question: "What is REST API?",
                answer: "REST (Representational State Transfer) is an architectural style for APIs. Uses HTTP methods (GET, POST, PUT, DELETE), stateless communication, and resource-based URLs (e.g., /api/users).",
                difficulty: "Easy",
                round: "Technical Round 1"
            },
            {
                question: "Explain async/await vs Promises.",
                answer: "Both handle asynchronous operations. Promises use .then() chains, can get nested (callback hell). Async/await is syntactic sugar over Promises, makes code look synchronous and more readable. Example: const data = await fetch(url);",
                difficulty: "Medium",
                round: "Technical Round 2"
            },
            {
                question: "What is middleware in Express.js?",
                answer: "Functions that have access to request, response objects and next() function. Used for authentication, logging, parsing, error handling. Executes in sequence. Example: app.use(express.json()) parses JSON bodies.",
                difficulty: "Medium",
                round: "Technical Round 2"
            },
            {
                question: "Explain database indexing and when to use it.",
                answer: "Indexes improve query performance by creating data structures (B-trees) for faster lookups. Use on frequently queried fields, foreign keys, and fields in WHERE clauses. Trade-off: Faster reads vs slower writes and more storage.",
                difficulty: "Hard",
                round: "Technical Round 3"
            },
            {
                question: "How would you optimize a slow application?",
                answer: "Frontend: Code splitting, lazy loading, image optimization, caching. Backend: Database indexing, query optimization, caching (Redis), load balancing, CDN. Profile first, then optimize bottlenecks.",
                difficulty: "Hard",
                round: "Technical Round 3"
            },
            {
                question: "Design a URL shortener like bit.ly. Explain architecture and database schema.",
                answer: "Architecture: Frontend (React), Backend (Node/Express), Database (MongoDB/PostgreSQL). Schema: URLs table (id, original_url, short_code, created_at, clicks). Generate unique short codes using base62 encoding of auto-increment ID. Add analytics for tracking clicks.",
                difficulty: "Hard",
                round: "Final Round"
            }
        ]
    },

    "Frontend Developer": {
        hr: [
            {
                question: "Why do you want to be a Frontend Developer?",
                answer: "Express passion for creating user interfaces, visual design meeting code, immediate visual feedback, and impact on user experience.",
                difficulty: "Easy",
                round: "HR Round"
            },
            {
                question: "What motivates you in your work?",
                answer: "Mention solving user problems, creating delightful experiences, learning new technologies, and seeing your work used by real people.",
                difficulty: "Easy",
                round: "HR Round"
            }
        ],
        behavioral: [
            {
                question: "Describe a project where you improved website performance.",
                answer: "Use metrics: 'Reduced load time from 5s to 2s by implementing lazy loading, optimizing images (WebP format), code splitting with React.lazy(), and implementing service workers for caching.'",
                difficulty: "Medium",
                round: "Behavioral"
            },
            {
                question: "How do you ensure your websites work across different browsers?",
                answer: "Use feature detection (not browser detection), testing tools (BrowserStack, Chrome DevTools), polyfills for older browsers, CSS vendor prefixes, and follow web standards.",
                difficulty: "Medium",
                round: "Behavioral"
            }
        ],
        technical: [
            {
                question: "Explain the box model in CSS.",
                answer: "Consists of content, padding, border, and margin. box-sizing: border-box includes padding and border in width/height. box-sizing: content-box (default) adds them outside.",
                difficulty: "Easy",
                round: "Technical Round 1"
            },
            {
                question: "What is Virtual DOM in React?",
                answer: "Lightweight copy of actual DOM. React compares Virtual DOM with real DOM (diffing), calculates minimum changes needed (reconciliation), and updates only changed parts. Makes React fast.",
                difficulty: "Medium",
                round: "Technical Round 2"
            },
            {
                question: "Explain hoisting in JavaScript.",
                answer: "JavaScript moves variable and function declarations to top of scope before execution. var declarations are hoisted but initialized as undefined. let/const are hoisted but in temporal dead zone. Functions are fully hoisted.",
                difficulty: "Medium",
                round: "Technical Round 2"
            },
            {
                question: "What are React Hooks? Explain useState and useEffect.",
                answer: "Hooks let you use state and lifecycle in functional components. useState: Manages component state. useEffect: Handles side effects (API calls, subscriptions). Example: const [count, setCount] = useState(0);",
                difficulty: "Hard",
                round: "Technical Round 3"
            },
            {
                question: "How do you handle state management in large React apps?",
                answer: "Options: Context API (medium apps), Redux (large apps with complex state), Zustand (simpler alternative), or React Query (server state). Choose based on complexity and team familiarity.",
                difficulty: "Hard",
                round: "Technical Round 3"
            }
        ]
    },

    "Backend Developer": {
        hr: [
            {
                question: "What interests you about backend development?",
                answer: "Passion for data structures, algorithms, system architecture, scalability challenges, and building the 'engine' that powers applications.",
                difficulty: "Easy",
                round: "HR Round"
            }
        ],
        behavioral: [
            {
                question: "Describe a time when your code caused a production issue. How did you handle it?",
                answer: "Show accountability: Immediately acknowledged the issue, rolled back changes, investigated root cause, fixed bug, added tests, and implemented monitoring to prevent recurrence. Focus on learning and improvement.",
                difficulty: "Hard",
                round: "Behavioral"
            }
        ],
        technical: [
            {
                question: "Explain ACID properties in databases.",
                answer: "Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent transactions don't interfere), Durability (committed data persists). Critical for transaction reliability.",
                difficulty: "Medium",
                round: "Technical Round 2"
            },
            {
                question: "What is JWT and how does it work?",
                answer: "JSON Web Token for authentication. Three parts: Header (algorithm), Payload (user data), Signature (verification). Server signs token, client stores it, sends with requests. Stateless authentication.",
                difficulty: "Medium",
                round: "Technical Round 2"
            },
            {
                question: "Explain SQL vs NoSQL databases.",
                answer: "SQL: Structured, ACID compliant, relationships (PostgreSQL, MySQL). NoSQL: Flexible schema, horizontal scaling, eventual consistency (MongoDB, Redis). Choose based on data structure and scale needs.",
                difficulty: "Medium",
                round: "Technical Round 2"
            },
            {
                question: "How do you prevent SQL injection?",
                answer: "Use parameterized queries/prepared statements, ORM frameworks (Sequelize, Mongoose), input validation, and least privilege principle for database users. Never concatenate user input into queries.",
                difficulty: "Hard",
                round: "Technical Round 3"
            },
            {
                question: "Design a rate limiter for an API.",
                answer: "Algorithms: Token Bucket, Sliding Window. Implementation: Use Redis for distributed systems. Store request count per user/IP with expiry. Return 429 (Too Many Requests) when limit exceeded. Consider different limits for different endpoints.",
                difficulty: "Hard",
                round: "Final Round"
            }
        ]
    },

    "Data Scientist": {
        hr: [
            {
                question: "Why data science?",
                answer: "Passion for finding insights from data, solving real-world problems, combination of statistics, programming, and business impact.",
                difficulty: "Easy",
                round: "HR Round"
            }
        ],
        behavioral: [
            {
                question: "Explain a data science project you worked on.",
                answer: "Structure: Problem statement, data collection, exploratory analysis, model selection, evaluation metrics, results, and business impact. Be specific with numbers and tools used.",
                difficulty: "Medium",
                round: "Behavioral"
            }
        ],
        technical: [
            {
                question: "Explain the difference between supervised and unsupervised learning.",
                answer: "Supervised: Has labeled data, learns input→output mapping (classification, regression). Examples: Predicting house prices, spam detection. Unsupervised: No labels, finds patterns (clustering, dimensionality reduction). Examples: Customer segmentation, anomaly detection.",
                difficulty: "Easy",
                round: "Technical Round 1"
            },
            {
                question: "What is overfitting and how do you prevent it?",
                answer: "Model learns training data too well, poor on new data. Prevention: Cross-validation, regularization (L1/L2), more training data, simpler models, dropout (neural networks), early stopping.",
                difficulty: "Medium",
                round: "Technical Round 2"
            },
            {
                question: "Explain precision vs recall.",
                answer: "Precision: Of predicted positives, how many are actually positive. Recall: Of actual positives, how many we predicted. Trade-off: High precision (few false positives) vs high recall (few false negatives). Use F1-score for balance.",
                difficulty: "Medium",
                round: "Technical Round 2"
            },
            {
                question: "How would you handle imbalanced datasets?",
                answer: "Techniques: Resampling (SMOTE for upsampling, random undersampling), class weights, ensemble methods, different metrics (F1, AUC-ROC instead of accuracy), anomaly detection algorithms.",
                difficulty: "Hard",
                round: "Technical Round 3"
            }
        ]
    },

    "Product Manager": {
        hr: [
            {
                question: "Why do you want to be a Product Manager?",
                answer: "Passion for building products that solve user problems, cross-functional collaboration, strategic thinking, and business impact.",
                difficulty: "Easy",
                round: "HR Round"
            }
        ],
        behavioral: [
            {
                question: "Describe a time when you had to make a decision without complete information.",
                answer: "Show decision-making framework: Gathered available data, identified assumptions, consulted stakeholders, made informed decision, and monitored results for course correction.",
                difficulty: "Hard",
                round: "Behavioral"
            },
            {
                question: "How do you prioritize features in a product roadmap?",
                answer: "Use frameworks: RICE (Reach, Impact, Confidence, Effort), MoSCoW, Value vs Effort matrix. Consider user feedback, business goals, technical feasibility, and market trends. Communicate transparently with stakeholders.",
                difficulty: "Hard",
                round: "Behavioral"
            }
        ],
        technical: [
            {
                question: "How would you improve [popular product]?",
                answer: "Structure: Clarify goals (engagement, retention, revenue), identify user pain points, analyze competitors, propose solutions with metrics, prioritize based on impact. Example: 'To improve Instagram engagement, I'd add...'",
                difficulty: "Hard",
                round: "Technical Round 2"
            },
            {
                question: "How do you measure product success?",
                answer: "Define metrics: North Star Metric (key value), user engagement (DAU, retention), business metrics (revenue, conversion), product health (NPS, churn). Align with business objectives.",
                difficulty: "Medium",
                round: "Technical Round 2"
            }
        ]
    }
};

// Helper function to get questions for a specific role
function getQuestionsForRole(role) {
    const normalizedRole = role.trim();

    // Direct match
    if (interviewQuestions[normalizedRole]) {
        return interviewQuestions[normalizedRole];
    }

    // Fuzzy match
    const lowerRole = normalizedRole.toLowerCase();
    for (const [key, value] of Object.entries(interviewQuestions)) {
        if (key.toLowerCase().includes(lowerRole) || lowerRole.includes(key.toLowerCase())) {
            return value;
        }
    }

    // Default fallback
    return interviewQuestions["Full Stack Developer"];
}

// Get all questions for a role organized by round
function getQuestionsByRound(role) {
    const questions = getQuestionsForRole(role);
    const organized = {
        "HR Round": [],
        "Behavioral": [],
        "Technical Round 1": [],
        "Technical Round 2": [],
        "Technical Round 3": [],
        "Final Round": []
    };

    // Organize all types
    ['hr', 'behavioral', 'technical'].forEach(type => {
        if (questions[type]) {
            questions[type].forEach(q => {
                const round = q.round || "General";
                if (!organized[round]) organized[round] = [];
                organized[round].push({ ...q, type });
            });
        }
    });

    // Remove empty rounds
    Object.keys(organized).forEach(round => {
        if (organized[round].length === 0) delete organized[round];
    });

    return organized;
}

module.exports = {
    interviewQuestions,
    getQuestionsForRole,
    getQuestionsByRound
};
