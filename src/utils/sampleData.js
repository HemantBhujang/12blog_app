export const SAMPLE_POSTS = [
    {
        $id: "demo-1",
        title: "Building Next-Gen Web Apps with React 19 & Tailwind CSS v4",
        content: "<p>The frontend ecosystem is evolving faster than ever. React 19 introduces Server Actions, compiler optimizations, and simplified state management. Combined with Tailwind CSS v4's high-performance engine, web developers now have unprecedented capability to build hyper-responsive, beautiful web applications.</p><h3>Key Features to Master:</h3><ul><li>Zero-config Vite setups</li><li>Tailwind CSS-first design tokens</li><li>Optimized bundle sizes and asset delivery</li></ul><p>By leveraging modern component design and dark mode aesthetic tokens, applications maintain high performance without sacrificing visual excellence.</p>",
        featuredImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80",
        $createdAt: "2026-07-25T10:00:00.000Z",
        status: "active",
        userId: "author-1",
        authorName: "Alex Vance",
        category: "Technology",
        readTime: "5 min read"
    },
    {
        $id: "demo-2",
        title: "Mastering Clean Architecture & State Management",
        content: "<p>Managing complex state in large-scale React applications requires discipline and architectural clarity. Redux Toolkit provides powerful primitives like <code>createSlice</code> and RTK Query to streamline async workflows while keeping UI components purely declarative.</p><p>Always isolate side effects to service layers and keep component trees clean and modular.</p>",
        featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
        $createdAt: "2026-07-22T14:30:00.000Z",
        status: "active",
        userId: "author-2",
        authorName: "Sophia Chen",
        category: "Architecture",
        readTime: "7 min read"
    },
    {
        $id: "demo-3",
        title: "Design Systems & Glassmorphic UI Aesthetics",
        content: "<p>Visual design isn't just about pretty colors; it's about micro-interactions, layout harmony, and accessible contrast ratios. Modern glassmorphism and subtle ambient glows create immersive digital experiences that captivate readers.</p><p>Implement consistent spacing scale, typography hierarchies, and interactive states to bring your user interfaces to life.</p>",
        featuredImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
        $createdAt: "2026-07-20T09:15:00.000Z",
        status: "active",
        userId: "author-3",
        authorName: "Marcus Sterling",
        category: "UI/UX Design",
        readTime: "4 min read"
    },
    {
        $id: "demo-4",
        title: "The Developer's Guide to Cloud Backends with Appwrite",
        content: "<p>Appwrite is an open-source backend-as-a-service (BaaS) providing developers with core APIs for authentication, databases, file storage, and serverless cloud functions. Learn how to deploy scalable backends in minutes.</p>",
        featuredImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        $createdAt: "2026-07-18T16:45:00.000Z",
        status: "active",
        userId: "author-1",
        authorName: "Alex Vance",
        category: "Cloud",
        readTime: "6 min read"
    }
];

export function formatDate(dateString) {
    if (!dateString) return "Recently published";
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    } catch {
        return "Recently published";
    }
}

export function estimateReadTime(content) {
    if (!content) return "3 min read";
    const plainText = content.replace(/<[^>]+>/g, '');
    const words = plainText.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
}
